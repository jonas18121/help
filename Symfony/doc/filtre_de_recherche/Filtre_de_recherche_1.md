# Exemple de filtre de recherche

### Search.php
```php
namespace App\Classe;

use App\Entity\Category;

Class Search 
{   
    /**
     * Name's product that user search
     * 
     * @var string|null
     */
    private $string = '';

    /**
     * List categories
     * 
     * The user select one category
     * 
     * @var Category[]|null
     */
    private  $categories = [];

    /**
     * Get name's product that user search
     *
     * @return  string|null
     */ 
    public function getString()
    {
        return $this->string;
    }

    /**
     * Set name's product that user search
     *
     * @param  string|null  $string  Name's product that user search
     *
     * @return  self
     */ 
    public function setString($string)
    {
        $this->string = $string;

        return $this;
    }

    /**
     * Get the user select one category
     *
     * @return Category[]|null
     */ 
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * Set the user select one category
     *
     * @param  Category[]|null  $categories  The user select one category
     *
     * @return  self
     */ 
    public function setCategories($categories)
    {
        $this->categories = $categories;

        return $this;
    }
}
```

### SearchType.php
```php
namespace App\Form;

use App\Classe\Search;
use App\Entity\Category;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SearchType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('string', TextType::class, [
                'label' => false,
                'required' => false,
                'attr' => [
                    'placeholder' => 'Votre recherche ...',
                    'class' => 'form-control-sm'
                ]
            ])
            ->add('categories', EntityType::class, [
                'label' => false,
                'class' => Category::class,
                'required' => false,
                'multiple' => true,
                'expanded' => true
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Filtrer',
                'attr' => [
                    'class' => 'btn-block btn-info'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Search::class,
            'method' => 'GET', // permet a un user de copier/coller le lien puis de la partager
            'crsf_protection' => false, // enlever la protection, puisque c'est que pour de la recherche
        ]);
    }

    /**
     * Prefix avec le nom de la classe dans l'url
     *
     * @return void
     */
    public function getBlockPrefix()
    {
        return ''; // on ne veut pas de prefix
    }
}
```

### ProductRepository.php
```php
namespace App\Repository;

use App\Classe\Search;
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
     * @param Search $search
     * @return Product[]|null
     */
    public function findWithSearch(Search $search)
    {
        $query = $this->createQueryBuilder('p') // le mapping est fait sur la table Product
            ->select('c', 'p')
            ->join('p.category', 'c');

        // Si l'user a choisi une ou plusieurs catégorie depuis la checkbox, on l'affiche
        if (!empty($search->getCategories())) {
            $query = $query
            ->andWhere('c.id IN (:searchCategories)')
            ->setParameter('searchCategories', $search->getCategories());
        }

        
        if (!empty($search->getString())) {
            // Si l'utilisateur a écrit la valeur d'un de ces colonnes de la BDD depuis l'input, on l'affiche
            $query 
                ->andWhere('
                    p.name LIKE :search
                    OR p.price LIKE :search
                ')
                ->setParameter('search', "%{$search->getString()}%")
            ;
        }

        return $query->getQuery()->getResult();
    }
}
```

### Product.php
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

### ProductController.php
```php
namespace App\Controller;

use App\Classe\Search;
use App\Entity\Product;
use App\Form\SearchType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{

    private $em;

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

        $search = new Search;
        $form = $this->createForm(SearchType::class, $search);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $productSearch = $productRepository->findWithSearch($search);
        }
        else {
            $products = $productRepository->findAll();
        }

        return $this->render('product/index.html.twig', [
            'products' => $productSearch ?? $products,
            'form' => $form->createView()
        ]);
    }
}
```

### product/index.html.twig
```twig
<div class="row">
    <div class="col-md-3">
        <h3>Flitrer</h3>
        {{ form(form) }}
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