# Faire une pagination avec KNP Paginator avec la logique dans le repository

- [KNP Paginator](https://github.com/KnpLabs/KnpPaginatorBundle)

### 1) Installer le bundle knp-paginator-bundle

```ps
composer require knplabs/knp-paginator-bundle
```

### 2) Creer un knp_paginator.yaml

- Avec les information de base qui est dans la doc du bundle, comme ci-dessous

- On peut changer de template ici :
        - **pagination:** [Additional pagination templates](https://github.com/KnpLabs/KnpPaginatorBundle#additional-pagination-templates)
        - **sortable:** [Additional sortable templates](https://github.com/KnpLabs/KnpPaginatorBundle?tab=readme-ov-file#additional-sortable-templates)
        - **filtration:** [Additional filtration templates](https://github.com/KnpLabs/KnpPaginatorBundle?tab=readme-ov-file#additional-filtration-templates)
        - Si on a changer de template, il faut faire `php bin/console cache:clear`

```yaml
# config/packages/knp_paginator.yaml 

knp_paginator:
    page_range: 5                       # number of links shown in the pagination menu (e.g: you have 10 pages, a page_range of 3, on the 5th page you'll see links to page 4, 5, 6)
    default_options:
        page_name: page                 # page query parameter name
        sort_field_name: sort           # sort field query parameter name
        sort_direction_name: direction  # sort direction query parameter name
        distinct: true                  # ensure distinct results, useful when ORM queries are using GROUP BY statements
        filter_field_name: filterField  # filter field query parameter name
        filter_value_name: filterValue  # filter value query parameter name
    template:
        pagination: '@KnpPaginator/Pagination/sliding.html.twig'     # sliding pagination controls template
        sortable: '@KnpPaginator/Pagination/sortable_link.html.twig' # sort link template
        filtration: '@KnpPaginator/Pagination/filtration.html.twig'  # filters template
```

### 4) La logique dans le repository

- Injection de dépendance de PaginatorInterface dans le constructeur
- Dans `findAllProduct` On appel `$this->paginationInterface->paginate(` en lui passant :
    - `$data` : le tableau de produit
    - `$page` qui prendra `$request->query->getInt('page', 1)` depuis le controller : le nombre de page sur lequel aller en premier
    - `10` : Le nombre d'article à afficher au maximum par pages
    - `sortFieldAllowList` : Par sécurité on utilise sortFieldAllowList pour dire sur quel champs on autorise de faire des tries.

```php
namespace App\Repository;

use App\Classe\SearchData;
use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StorageSpaceRepository extends ServiceEntityRepository
{
    private PaginatorInterface $paginationInterface;

    public function __construct(
        ManagerRegistry $registry,
        PaginatorInterface $paginationInterface
    ) {
        parent::__construct($registry, Product::class);

        $this->paginationInterface = $paginationInterface;
    }

    public function findAllProduct(int $page): SlidingPagination
    {
        /** @var array<int, Product> */
        $data = $this->createQueryBuilder('p')
            ->select('p', 'c')
            ->leftJoin('p.category', 'c')
            ->getQuery();

        $limit = 10;

        /** @var SlidingPagination */
        $pagination = $this->paginationInterface->paginate(
            $data, 
            $page, 
            $limit,
            [
                'distinct' => false,
                'sortFieldAllowList' => ['r.id', 'r.title', 'c.name']
            ]
        );

        if ($pagination instanceof SlidingPagination) {
            return $pagination;
        }
    }
}
```

### 4) La logique dans le controller

- `$products->getTotalItemCount()` permet de compter le nombre d'item de produit dans la BDD

```php
class ProductController extends AbstractController
{
    /**
     * @Route("/product", name="app_product")
     */
    public function getAllStorageSpace(
        Request $request,
        ProductRepository $productRepository,
    ): Response {
        /** @var int $page */
        $page = $request->query->getInt('page', 1);

        $products = $productRepository->findAllProduct($page);
        $maxPage = ceil($products->getTotalItemCount() / $limitItemByPage);

        return $this->render('product/get_all_product.html.twig', [
            'products' => $products,
            'maxPage' => $maxPage,
            'page' => $page
        ]);
    }
```

### 5) Dans le fichier Twig

Dans le fichier twig qui recoit la liste de produits avec la pagination dans `products`

- On a créer manuellement les boutons `Page suivante` et `Page précedente`

- Ce fichier twig représente un tableau qui liste les produits
    - `{{ knp_pagination_sortable(recipes, 'ID', 'r.id') }}` on utilise knp_pagination_sortable pour trier les produit selon l'ID, on peut le faire pour les autre champs du tbleau aussi
    - `{{ knp_pagination_sortable(recipes, 'Catégorie', 'c.name') }}` On a accès à la catégorie comme il est dans la Jointure de la requête DQL 

- knp_pagination_sortable génère une erreur, alors peut être que la version de `doctrine/orm` n'est pas compatible dans le compose.yaml, dans ce cas on peut rétrograder de version de `doctrine/orm` et mettre la version : `2.18.0` et ensuite `composer update`

```twig
{% extends 'base.html.twig' %}

{% block title %}Tout les produits{% endblock %}

{% block body %}
    <p>
        <a class="btn btn-primary btn-sm" href="{{ path('app_admin_product_create') }}">Creer un nouveau produit</a>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>{{ knp_pagination_sortable(recipes, 'ID', 'r.id') }}</th>
                <th>{{ knp_pagination_sortable(recipes, 'Titre', 'r.title') }}</th>
                <th>{{ knp_pagination_sortable(recipes, 'Catégorie', 'c.name') }}</th> {# On a accès à la catégorie comme il est dans la Jointure de la requête DQL #}
                <th style="width: 200px">Actions</th>
            </tr>
        </thead>
        <tbody>
            {% for product in products %}
            <tr>
                <td>
                    <p>{{ recipe.id }}</p>
                </td>
                <td>
                    <a href="{{ url('app_product_show', {id: product.id, slug: product.slug}) }}">{{ product.title }}</a>
                </td>
                <td>
                    <p>{{ product.category.name }}</p>
                </td>
                <td>
                    <div class="d-flex gap-1">
                        <a class="btn btn-primary btn-sm" href="{{ path('app_product_edit', {id: product.id}) }}">Modifier</a>
                        
                        <form action="{{ path('app_product_delete', {id: product.id}) }}" method="post">
                            <input type="hidden" name="_method" value="DELETE"> {# Simuler une requête de type delete #}
                            <button type="submit" class="btn btn-danger btn-sm">Supprimer</button>
                        </form>
                    </div>
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>

    <div class="d-flex">
        {% if page > 1 %}
            <a href="{{ path('app_product', {page: page - 1}) }}" class="btn btn-secondary me-1">Page précédente</a>
        {% endif %}

        {% if page < maxPage %}
            <a href="{{ path('app_product', {page: page + 1}) }}" class="btn btn-secondary">Page suivante</a>
        {% endif %}
    </div>

    {# display navigation #}
    {# <div class="navigation">
        {{ knp_pagination_render(products) }}
    </div> #}
{% endblock %}
```