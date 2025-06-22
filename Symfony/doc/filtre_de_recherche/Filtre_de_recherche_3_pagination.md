# Exemple de filtre de recherche avec pagination

### 1) SearchData.php

On crée une classe `SearchData`

```php
namespace App\DTO;

class SearchData
{
    private int $page = 1;

    private ?string $query = '';

    public function getQuery(): ?string
    {
        return $this->query;
    }

    public function setQuery(?string $query): self
    {
        $this->query = $query;

        return $this;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function setPage(int $page): self
    {
        $this->page = $page;

        return $this;
    }
}
```

### 2) SearchType.php

On cree un ficher SearchType

```php
namespace App\Form;

use App\DTO\SearchData;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SearchType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('query', TextType::class, [
                'attr' => [
                    'placeholder' => 'Recherche ',
                ],
                'required' => false
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => SearchData::class,
            'method' => 'GET',
            'crsf_protection' => false, // enlever la protection, puisque c'est que pour de la recherche
        ]);
    }
}
```


### 3) ProductController.php

Dans la méthode `list`
- On instancie `SearchData`
- On appel `SearchType` dans `createForm`
```php
namespace App\Controller;

use App\Classe\SearchData;
use App\Entity\Product;
use App\Form\SearchType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route(
        'products', 
        name: 'app_product_list'
    )]
    public function list(Request $request): Response
    {
        /** @var User|null $user */
        $user = $this->getUser();

        if (!$user) {
            return $this->redirectToRoute('app_home_page');
        }

        $productRepository = $this->em->getRepository(Product::class);

        $searchData = new SearchData();
        /** @var Form $formSearch */
        $formSearch = $this->createForm(SearchType::class, $searchData);

        // Retourne 2 variables $count et $pagination
        [$count, $pagination] = $userService->getListAndCount($formSearch, $searchData, $request);  

        return $this->render('product/product_list.html.twig', [
            'pagination' => $pagination,
            'count' => $count,
            'formSearch' => $formSearch->createView()
        ]);
    }
}
```

### 4) component/_search_data.html.twig

On fait la structure de la barre de recherche

```twig
<div class="search">
    {{ form_start(formSearch, { 'attr' : { 'class' : 'search_form' }} ) }}
        <div class="search_container">
            <p class="search_title">
               
            </p>
            {{ form_widget(formSearch.query, { 'attr' : { 'class' : 'search_input' }} ) }}
        </div>
    {{ form_end(formSearch) }}
</div>
```

### 5) product/product_list.html.twig

- On include `component/_search_data.html.twig` dans `product/product_list.html.twig` en lui passant `formSearch`, 
`only` pour utiliser uniquement le formulaire
- On passe la pagination

```twig
{% extends 'general/base.html.twig' %}

{% block title %}Ajouter un Produits{% endblock %}

{% block stylesheets %}
    {{ parent() }}
    <link href="/css/components/pagination/index.css" rel="stylesheet" />
    <link href="/css/components/searchbar/index.css" rel="stylesheet" />
{% endblock %}

{% block javascripts %}
    {{ parent() }}
    <script type="module" src="/js/shared/table/table.js"></script>
{% endblock %}

{% block body %}
    <section class="container">
        <div class="container_add_search">
            <p class="add"><a href="{{ path('app_product_create' ) }}">Ajouter un produit</a></p>

            {% include 'components/_searchbar.html.twig' with {
                formSearch: formSearch
            } only %}
        </div>

        {% if pagination is defined and pagination is not empty  %}
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Créé par</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Date de création</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {% for product in pagination %}
                        <tr>
                            <th scope="row">{{ product.id }}</th>
                            <td>
                                <a href="{{ path('app_product_detail', { id: product.id }) }}">
                                    {{ product.title }}
                                </a>
                            </td>
                            <td>{{ product.user.firstName }} - {{ product.user.lastName }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.category.name }}</td>
                            <td>{{ product.createdAt | date('d/m/Y H:i') }}</td>
                            <td class="action">
                                <span class='update'>
                                    <a href="{{ path('app_backend_product_update', { id: product.id }) }}">Modifier</a>
                                </span>

                                <span class='delete'>
                                    <form method="POST" action="{{ path('app_product_delete', { 'id' : product.id }) }}" class="middle" onsubmit="return confirm('Etes-vous sur de vouloir supprimer cette élément ?')">
                                        <input type="hidden" name="_method" value="DELETE">
                                        <input type="hidden" name="_token" value="{{ csrf_token('delete') }}">
                                        <button class='btn_delete'>Supprimer</button>
                                    </form>
                                </span>
                            </td>
                        </tr>
                    {% endfor %}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row">Totals</th>
                        <td colspan="6">{{ count['countTotalElementFiltered'] }} produit(s) trouvé(s)</td>
                    </tr>
                </tfoot>
            </table>
        {% else %}
            <p>Aucun produit n'est créée</p>
        {% endif %}

        {% if pagination is defined and pagination is not empty %}
            {# display navigation #}
            <div class="navigation">
                {{ knp_pagination_render(pagination) }}
            </div>
        {% endif %}
    </section>
{% endblock %}
```

### 6) CSS

On fait le CSS en mobile first

```css
/* mobille.css */

.search {
    margin: 3vw 6vw;
}
.search_container {
    /* padding-top: 64px; */
}
    
.search_title {
    font-size: 5vw;
    font-weight: 900;
    text-align: center;
    color: var(--main-color-old);
    margin-bottom: 3vw;
}
    
.search_input {
    width: 100%;
    padding: 12px 24px;

    background-color: transparent;
    transition: transform 250ms ease-in-out;
    font-size: 14px;
    line-height: 18px;
    
    color: #575756;
    background-color: transparent;
/*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */

    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
    border-radius: 50px;
    border: 1px solid #575756;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}
        
.search_input::placeholder {
    color: color(#575756 a(0.8));
    text-transform: uppercase;
    letter-spacing: 1.5px;
}
        
.search_input:hover,
.search_input:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
}
```

```css
/* tablet.css */

@media only screen and (min-width: 600px)  
{
    .search {
        margin: 3vw 14vw;
    }
        
    .search_title {
        font-size: 3vw;
    }
}
```

```css
/* desktop.css */

@media only screen and (min-width: 1025px) 
{
    .search {
        margin: 3vw 25vw;
    }
        
    .search_title {
        font-size: 2vw;
    }
}
```

### ProductRepository.php

On prépare `findBySearch` pour chercher et trouver les recherche de l'user
```php
namespace App\Repository;

use App\DTO\SearchData;
use App\Entity\Product;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\Traits\PaginationTrait;
use Knp\Component\Pager\PaginatorInterface;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Product>
 *
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    use PaginationTrait;

    public function __construct(
        ManagerRegistry $registry,
        private PaginatorInterface $paginationInterface
    )
    {
        parent::__construct($registry, Product::class);
    }

    public function findBySearch(SearchData $searchData): ?SlidingPagination
    {
        /** @var array<int,Product> $data */
        $data = $this->requestPreparedElementList($searchData)
            ->getQuery()
            ->getResult()
        ;

        /** @var SlidingPagination $pagination */
        $pagination = $this->paginationInterface->paginate($data, $searchData->getPage(), 2);

        if ($pagination instanceof SlidingPagination) {
            return $pagination;
        }

        return null;
    }

    /**
     * Compte le nombre total d'éléments
     * Soit depuis la recherche ou soit depuis la liste complète
     * Retourne 0 (Zero) si pas de éléments
     */
    public function countTotalAndFilteredElements(SearchData $searchData): int
    {
        $queryBuilder = $this->createQueryBuilder('p')
            ->select('COUNT(p.id)')
            ->Join('p.user', 'u')
            ->Join('p.category', 'c')
            ->addOrderBy('p.created_at', 'DESC')
        ;

        if (!empty($searchData->getQuery())) {
            $queryBuilder = $this->requestPreparedToSearch($queryBuilder, $searchData);
        }

        return $queryBuilder->getQuery()->getSingleScalarResult();
    }

    /**
     * Requête préparer pour retourner une liste d'éléments
     */
    public function requestPreparedElementList(SearchData $searchData): QueryBuilder
    {
        /** @var QueryBuilder $queryBuilder */
        $queryBuilder = $this->createQueryBuilder('p')
            ->select('p')
            ->Join('p.user', 'u')
            ->Join('p.category', 'c')
            ->addOrderBy('u.created_at', 'DESC');

        if (!empty($searchData->getQuery())) {
            $queryBuilder = $this->requestPreparedToSearch($queryBuilder, $searchData);
        }

        return $queryBuilder;
    }

    /**
     * Requête préparer pour retourner la valeur d'un de ces colonnes de la BDD depuis l'input search   
     */
    public function requestPreparedToSearch(QueryBuilder $queryBuilder, SearchData $searchData): QueryBuilder
    {
        return $queryBuilder
            ->andWhere('
                c.name LIKE :search
                OR u.firstName LIKE :search
                OR u.lastName LIKE :search
                OR p.price LIKE :search
                OR p.created_at LIKE :search
                OR p.title LIKE :search
            ')
            ->setParameter('search', "%{$searchData->getQuery()}%")
        ;
    }
}
```

### PaginationTrait.php

```php

declare(strict_types=1);

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Repository\Traits;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Knp\Component\Pager\PaginatorInterface;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;

trait PaginationTrait
{
    public function __construct(
        private PaginatorInterface $paginationInterface
    )
    {}

    public function findPaginationList(int $page, string $name, int $limit): ?SlidingPagination
    {
        /** @var array */
        $data = $this->createQueryBuilder($name)
            ->select($name)
            ->getQuery()
            ->getResult();

        /** @var SlidingPagination */
        $pagination = $this->paginationInterface->paginate($data, $page, $limit);

        if ($pagination instanceof SlidingPagination) {
            return $pagination;
        }

        return null;
    }
}
```

### Product.php

Ici on peut voir un exemple des propriété que l'on a utilisé pour faire les requêtes DQL
- `p.title LIKE :search`
- `p.price LIKE :search`

```php
namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\DateTimeTrait;
use App\Repository\ProductRepository;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    use DateTimeTrait;
    
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    private ?User $user = null;

    #[ORM\Column(type: 'json')]
    private ?array $images = [];

    #Code ....#
}
```

### ProductManager.php


```php

declare(strict_types=1);

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Manager;

use App\Entity\User;
use App\DTO\SearchData;
use App\Entity\Product;
use App\Manager\FileManager;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\Translation\TranslatorInterface;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Product - Manager.
 */
class ProductManager extends BaseManager
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ValidatorInterface $validator,
        private TranslatorInterface $translator,
        private ParameterBagInterface $parameters,
        private RequestStack $requestStack,
        private TokenStorageInterface $tokenStorage,
        private UrlGeneratorInterface $urlGenerator,
        private ProductRepository $productRepository,
        private FileManager $fileManager
    ) 
    {
        parent::__construct(
            $entityManager,
            $validator,
            $translator,
            $parameters,
            $requestStack,
            $tokenStorage,
            $urlGenerator,
        );
    }

    public function create(Product $product, User $user): Product
    {
        $product->setCreatedAt(new \DateTimeImmutable())
            ->setUser($user)
        ;

        return $this->save($product);
    }

    public function update(Product $product): Product
    {
        $product->setUpdatedAt(new \DateTimeImmutable());

        return $this->save($product);
    }

    public function save(Product $product): Product
    {
        $em = $this->em();
        $em->persist($product);
        $em->flush();

        return $product;
    }

    public function delete(
        Product $product,
        bool $disable = false
    ): void {
        if ($disable) {
            $product->setDeletedAt((new \DateTime('now'))->setTimezone(new \DateTimeZone('UTC')));
            $this->save($product);
        } else {
            $em = $this->em();
            $em->remove($product);
            $em->flush();
        }
    }

    public function list(
        int $page, 
        string $name, 
        int $limit
    ): ?SlidingPagination
    {
        return $this->productRepository->findPaginationList($page, $name, $limit);
    }

    public function createOrUpdateWithUploadImage(
        Product $product, 
        Array $files, 
        string $relatifPathImage,
        string $methode
    ): Product
    {
        if (!empty($files)) {
            $newFilenames = $this->fileManager->uploadMultipleFile($files, $relatifPathImage);
            $product->setImages($newFilenames);
        }

        switch ($methode) {
            case 'create':
                return $this->create($product, $this->getCurrentUser());
                break;
            case 'update':
                return $this->update($product);
                break;
            default :
                throw new Exception("Aucune méthode valide n'a été indiquer pour télécharger des images.");
        }
    }

    public function search(
        SearchData $searchData
    ): ?SlidingPagination
    {
        return $this->productRepository->findBySearch($searchData);
    }

    public function countList(
        SearchData $searchData
    ): array
    {
        $count = [
            "countTotalElementFiltered" => $this->productRepository->countTotalAndFilteredElements($searchData)
        ];

        return $count;
    }
}
```

### ProductService.php

```php

declare(strict_types=1);

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Service;

use App\DTO\SearchData;
use App\Manager\ProductManager;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Knp\Bundle\PaginatorBundle\Pagination\SlidingPagination;

/**
 * Product - Service.
 */
class ProductService
{
    public function __construct(
        private ProductManager $productManager
    ) 
    {
    }

    /** 
     * Retourne le(s) produit(s) qui sont rechercher via la barre de recherche 
     * Sinon par défaut, retourne tous les produits
    */
    public function getList(
        Form $formSearch, 
        SearchData $searchData, 
        Request $request
    ): ?SlidingPagination
    {
        $formSearch->handleRequest($request);

        // Searchbar
        if($formSearch->isSubmitted() && $formSearch->isValid()){
            $searchData->setPage($request->query->getInt('page', 1));
            return $this->productManager->search($searchData);
        }
        
        // Par défaut
        return $this->productManager->list($request->query->getInt('page', 1), 'product', 3);
    }

    /** 
     * Retourne le(s) produit(s) qui sont rechercher via la barre de recherche 
     * Sinon par défaut, retourne tous les produits
     * Retourne aussi le nombre de produits trouver
    */
    public function getListAndCount(
        Form $formSearch, 
        SearchData $searchData, 
        Request $request
    ): array
    {
        $formSearch->handleRequest($request);

        // Searchbar
        if($formSearch->isSubmitted() && $formSearch->isValid()){
            $searchData->setPage($request->query->getInt('page', 1));
            $productList = $this->productManager->search($searchData);
            $count = $this->productManager->countList($searchData);
            return [$count, $productList];
        }

        $count = $this->productManager->countList($searchData);
        $productList = $this->productManager->list($request->query->getInt('page', 1), 'product', 3);

        // Par défaut
        return [$count, $productList];
    }
}
```