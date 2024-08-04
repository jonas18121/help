# Créer une API sans utiliser APIPlateForme de Symfony 7 - Normalizer custom et pagination

- [components/serializer](https://symfony.com/doc/current/components/serializer.html)
- [Fonction fléchée](https://www.php.net/manual/fr/functions.arrow.php)

## Sérializer les données

### Repository

Dans `RecipeRepository`

- On a notre méthode `paginateRecipes` qui retourne la liste des recipes avec une pagination

```php
namespace App\Repository;

use App\Entity\Recipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\Pagination\PaginationInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * @extends ServiceEntityRepository<Recipe>
 *
 * @method Recipe|null find($id, $lockMode = null, $lockVersion = null)
 * @method Recipe|null findOneBy(array $criteria, array $orderBy = null)
 * @method Recipe[]    findAll()
 * @method Recipe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecipeRepository extends ServiceEntityRepository
{
    public function __construct(
        ManagerRegistry $registry,
        private PaginatorInterface $paginatorInterface
    )
    {
        parent::__construct($registry, Recipe::class);
    }

    public function paginateRecipes(int $page): PaginationInterface
    {
        $limit = 2;

        $data = $this->createQueryBuilder('r')
            ->select('r', 'c')
            ->leftJoin('r.category', 'c')
            ->getQuery()
        ;

        return $this->paginatorInterface->paginate(
            $data,
            $page,
            $limit,
            [
                'distinct' => false,
                'sortFieldAllowList' => ['r.id', 'r.title', 'c.name' ]
            ]
        );
    }

    # code...
```

### Controller 

Dans le Controller RecipesController

- On met ce controller dans le répertoire `src\Controller\Api` et son namespace sera `App\Controller\Api`
- On utilise `paginateRecipes` pour la pagination
- On Utilise la méthode `json` pour serialiser les données
- Dans la méthode `json` on va mettre en 3èmes argument, le groupe afin d'éviter les bug de circulaire (Recipe appel Category, Category appel Recipe, ainsi de suite)
- Dans la méthode `index` ce sera le groupe `recipes:index`
- Dans la méthode `show` ce sera le groupe `recipes:index` et `recipes:show` (Il va utiliser les 2 groupes)
- On mettra dans le groupe `recipes:show` les propriétés qu'on n'a pas utiliser dans la méthode `recipes:index`

```php
namespace App\Controller\Api;

use App\Repository\RecipeRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class RecipesController extends AbstractController
{
    #[Route("/api/recipes")]
    public function index(RecipeRepository $recipeRepository, Request $request)
    {
        $recipes = $recipeRepository->paginateRecipes($request->query->getInt('page', 1));
        return $this->json($recipes, 200, [], [
            'groups' => ['recipes:index']
        ]);
    }


    #[Route("/api/recipes/{id}")]
    public function show(Recipe $recipe)
    {
        return $this->json($recipe, 200, [], [
            'groups' => ['recipes:index', 'recipes:show']
        ]);
    }
}
```

La méthode `json` ce trouve dans `AbstractController`

```php
/**
 * Returns a JsonResponse that uses the serializer component if enabled, or json_encode.
 *
 * @param int $status The HTTP status code (200 "OK" by default)
 */
protected function json(mixed $data, int $status = 200, array $headers = [], array $context = []): JsonResponse
{
    if ($this->container->has('serializer')) {
        $json = $this->container->get('serializer')->serialize($data, 'json', array_merge([
            'json_encode_options' => JsonResponse::DEFAULT_ENCODING_OPTIONS,
        ], $context));

        return new JsonResponse($json, $status, $headers, true);
    }

    return new JsonResponse($data, $status, $headers);
}
```

### Normalizer 

Pour sérialiser la pagination, on va créer un normalizer personnaliser nommé `PaginationNormalizer` dans le répertoire `src/Normalizer`

- Dans `config/sevices.yaml` il y a `autoconfigure: true` donc notre normalizer sera bien pris en compte comme normalizer

Dans `PaginationNormalizer`

- On va mettre les 3 méthodes obligatoire depuis `NormalizerInterface` qui sont `getSupportedTypes()`, `supportsNormalization()` et `normalize()`
- `getSupportedTypes()` permet de savoir à que types de classe ce normalizer doit s'activer, ici ce sera de type `PaginationInterface`
- `supportsNormalization()` permet de savoir si il peut agir sur cette object selon la condition
- `normalize()` permet d'expliquer la manier dont on va normalizer les éléments
- Il faut normalizer `$object->getItems()`
- Dans `__construct` on va faire une injection de dépendance de `NormalizerInterface`
- Injecter le service `serializer.normalizer.object` avec l'attribut `Autowire` directement dans la propriété `$normalizer` en utilisant  `__construct`
- Utilisation de `array_map` pour `serializer` chaque éléments du tableau les uns après les autres
- On passe à `array_map` un callable avec une fonction fléchée `fn` et premier argument et en deuxièmes argument la liste des recipes `$object->getItems()` depuis la pagination

```php

namespace App\Normalizer;

use App\Entity\Recipe;
use Knp\Component\Pager\Pagination\PaginationInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PaginationNormalizer implements NormalizerInterface
{
    public function  __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private readonly NormalizerInterface $normalizer
    )
    {

    }

    # OU

    // private readonly NormalizerInterface $normalizer;

    // public function  __construct(
    //     #[Autowire(service: 'serializer.normalizer.object')]
    //     NormalizerInterface $normalizer
    // )
    // {
    //     $this->normalizer = $normalizer;
    // }

    public function normalize(mixed $object, ?string $format = null, array $context = []): array|string|int|float|bool|\ArrayObject|null
    {
        if(false === ($object instanceof PaginationInterface)){
            throw new \RuntimeException();
        }

        return [
            'items' => array_map(fn(Recipe $recipe) => $this->normalizer->normalize($recipe, $format, $context), $object->getItems()),
            'total' => $object->getTotalItemCount(), # Affiche le total des items dans la pagination
            'page' => $object->getCurrentPageNumber(), # Affiche le numéro de page courant
            'lastPage' => ceil($object->getTotalItemCount() / $object->getItemNumberPerPage()) # Affiche le numéro de la dernière page
        ];
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof PaginationInterface && $format === 'json';
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            PaginationInterface::class => true
        ];
    }
}
```

### Entity

Dans l'entity `Recipe`

- On va utliser le nom de groupe `recipes:index` sur les propriété pour appeler ceux dont on a besoin dans la méthode `index` du controller `RecipesController`
- On mettra dans le groupe `recipes:show` les propriétés qu'on n'a pas utiliser dans la méthode `recipes:index`
- On mettra dans le groupe `recipes:show` la propriété `category` pour accéder aux propriétés de l'objet `category`

```php
namespace App\Entity;

use App\Validator\BanWord;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\RecipeRepository;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Vich\UploaderBundle\Entity\File as EmbeddedFile;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
#[UniqueEntity('title')]
#[UniqueEntity('slug')]
#[Vich\Uploadable]
class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('recipes:index')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 5)]
    #[BanWord()]
    #[Groups('recipes:index')]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Assert\Sequentially([
        new Assert\Length(min: 5),
        new Assert\Regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', message: "Ce slug n'est pas valide")
    ])]
    #[Groups('recipes:index')]
    private ?string $slug = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\Length(min: 5)]
    #[Groups('recipes:show')]
    private ?string $text = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(nullable: true)]
    #[Assert\Positive()]
    #[Assert\NotBlank()]
    #[Assert\LessThan(value: 1440)]
    #[Groups('recipes:index')]
    private ?int $duration = null;

    #[ORM\ManyToOne(inversedBy: 'recipes', cascade: ['persist'])]
    #[Groups('recipes:show')]
    private ?Category $category = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $thumbnail = null;

    #[Vich\UploadableField(mapping: 'recipes', fileNameProperty: 'thumbnail')]
    #[Assert\Image()]
    private ?File $thumbnailFile = null;
```

Dans l'entity `Category`

- On mettra dans le groupe `recipes:show` juste la propriété `name`, car c'est lui seulement que l'on veut

```php
namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validator\BanWord;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[UniqueEntity('name')]
#[UniqueEntity('slug')]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 5)]
    #[BanWord()]
    #[Groups('recipes:show')]
    private string $name = '';

    #[ORM\Column(length: 255)]
    #[Assert\Sequentially([
        new Assert\Length(min: 5),
        new Assert\Regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', message: "Ce slug n'est pas valide")
    ])]
    private string $slug = '';

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\OneToMany(targetEntity: Recipe::class, cascade: ['remove'], mappedBy: 'category')]
    private Collection $recipes;
```