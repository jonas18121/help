# Exemple de filtre de recherche

### 1) SearchData.php

On crée une classe `SearchData`

```php
namespace App\Classe;

class SearchData
{
    private int $page = 1;

    private string $query = '';

    public function getQuery(): string
    {
        return $this->query;
    }

    public function setQuery(string $query): self
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

use App\Classe\SearchData;
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

Dans la méthode `index`
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

    /**
     * @Route("/produits", name="app_products")
     */
    public function index(Request $request): Response
    {
        $productRepository = $this->em->getRepository(Product::class);

        $searchData = new SearchData();
        $formSearch = $this->createForm(SearchType::class, $searchData);

        $formSearch->handleRequest($request);

        if($formSearch->isSubmitted() && $formSearch->isValid()){
            $productSearch = $productRepository->findWithSearch($search);
        }
        else {
            $products = $productRepository->findAll();
        }

        return $this->render('product/index.html.twig', [
            'products' => $productSearch ?? $products,
            'formSearch' => $formSearch->createView()
        ]);
    }
}
```

### 4) component/_search_data.html.twig

On fait la structure de la barre de recherche

```twig
<div class="search">
    {{ form_start(formSearch, { 'attr' : { 'class' : '' }} ) }}
        <div class="search_container">
            <p class="search_title">
                Cherchez par ville ou code postal
            </p>
            {{ form_widget(formSearch.query, { 'attr' : { 'class' : 'search_input' }} ) }}
        </div>
    {{ form_end(formSearch) }}
</div>
```

### 5) product/index.html.twig

On include `component/_search_data.html.twig` dans `product/index.html.twig` en lui passant `formSearch`, 
`only` pour utiliser uniquement le formulaire

```twig
<div class="row">
    <div class="col-md-3">
        <h3>Recherche</h3>
        {% include 'components/_search_data.html.twig' with {
            formSearch: formSearch
        } only %}
    </div>
    <div class="col-md-9">
        <h3>Nos produits</h3>

        <div class="row">
            {% for product in products %}
                <div class="col-md-4">
                    <div class="product-item text-center">
                        <img src="/uploads/images/{{ product.illustration }}" alt="{{ product.name }}" class="img-fluid"> 
                        <h4>{{ product.name }}</h4>
                        <span class="product-subtitle">{{ product.subtitle }}</span>
                        <span class="product-price">{{ (product.price / 100)|number_format(2, ',', '.') }}€<span>
                    </div>
                </div>
            {% endfor %}
        </div>
    </div>
</div>
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

On prépare `findWithSearch` pour chercher et trouver les recherche de l'user
```php
namespace App\Repository;

use App\Classe\SearchData;
use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

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
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * Cherche des produits en fonction de la recherche de l'user
     *
     * @param SearchData $searchData
     * @return Product[]|null
     */
    public function findWithSearch(SearchData $searchData)
    {
        $query = $this->createQueryBuilder('p') // le mapping est fait sur la table Product
            ->select('c', 'p')
            ->join('p.category', 'c')
            ->addOrderBy('s.created_at', 'DESC');

        
        if (!empty($searchData->getQuery())) {
            $query = $query

            // Si l'user a écrit le nom d'un produit depuis l'input, on l'affiche
            ->orWhere('p.name LIKE :searchName')
            ->setParameter('searchName', "%{$searchData->getQuery()}%") // La recherche est partielle donc, 
            //si on ecrit "bon", on va afficher tous les produits qui contiennent "bon"

            // Si l'user a écrit le prix d'un produit depuis l'input, on l'affiche
            ->orWhere('p.price LIKE :searchPrice')
            ->setParameter('searchPrice', "%{$searchData->getQuery()}%");
        }

        /** @var array<int, product> */
        return $query
            ->getQuery()
            ->getResult();
    }
}
```

### Product.php

Ici on peut voir les propriété que l'on a utilisé pour faire les requêtes DQL
- `p.name LIKE :searchName`
- `p.price LIKE :searchPrice`
```php
namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $illustration;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $subtitle;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="float")
     */
    private $price;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="products")
     * @ORM\JoinColumn(nullable=false)
     */
    private $category;

    #Code ....#
}
```


