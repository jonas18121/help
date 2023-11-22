# Faire une pagination avec KNP Paginator avec la logique dans le repository

- [KNP Paginator](https://github.com/KnpLabs/KnpPaginatorBundle)

### 1) Installer le bundle knp-paginator-bundle

```ps
composer require knplabs/knp-paginator-bundle
```

### 2) Creer un knp_paginator.yaml

- Avec les information de base qui est dans la doc du bundle, comme ci-dessous

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
            ->select('p')
            ->getQuery()
            ->getResult();

        /** @var SlidingPagination */
        $pagination = $this->paginationInterface->paginate($data, $page, 10);

        if ($pagination instanceof SlidingPagination) {
            return $pagination;
        }
    }
}
```

### 4) La logique dans le controller

- On appel `findAllProduct` en lui passant :
    - `$request->query->getInt('page', 1)` : le nombre de page sur lequel aller en premier

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
        return $this->render('product/get_all_product.html.twig', [
            'pagination' => $productRepository->findAllProduct($request->query->getInt('page', 1)),
        ]);
    }
```

### 5) Dans le fichier Twig

Dans le fichier twig qui recoit la liste de produits avec la pagination dans `products`

On va utiliser `{{ knp_pagination_render(products) }}` en bas de page pour afficher le nombre de page total et sur quel page on est

```twig
<section class="get_all_product">
    {% for product in pagination %}
        {% if product.available == true %}
            <article class="card">
                {% if product.images %}
                    <img class="" src="{{ asset('/uploads/images/' ~ product.images) }}" alt="{{ product.title }}" > 
                {% else %}
                    <img class="" src="{{ asset('/uploads/default/default.jpg') }}" alt="Garage" > 
                {% endif %}
                
                <div class="card-content">
                    <h2>
                        {{ product.title }}
                    </h2>

                    <ul>
                        <li>Categorie : {{ product.category.name }}</li>
                        <li>
                            <span>{{ product.adresse }}</span> 
                            <span>{{ product.postalCode }}</span> 
                            <span>{{ product.city }}</span>
                        </li>
                        <li>{{ product.space }} m2</li>
                        <li>{{ product.priceByDays / 100 | number_format(2, '.', ' ') }} € / jours</li>
                        <li>{{ product.priceByMonth / 100 | number_format(2, '.', ' ') }} € / mois</li>
                    </ul>

                    <a href="{{ path('product_one', { 'id' : product.id } ) }}" class="button">
                        Voir le détail 
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        {% endif %}
    {% endfor %}

</section>

{# display navigation #}
<div class="navigation">
    {{ knp_pagination_render(pagination) }}
</div>
```