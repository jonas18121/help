# Créer une API sans utiliser APIPlateForme de Symfony 7

- [components/serializer](https://symfony.com/doc/current/components/serializer.html)

### Sérializer les données

### Controller 

Dans le Controller RecipesController

- On met ce controller dans le répertoire `src\Controller\Api` et son namespace sera `App\Controller\Api`
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

class RecipesController extends AbstractController
{
    #[Route("/api/recipes")]
    public function index(RecipeRepository $recipeRepository)
    {
        $recipes = $recipeRepository->findAll();
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