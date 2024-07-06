# Faire une pagination avec Paginator de doctrine sans utiliser de Bundles pour gérer cela

### Repository

- Utilisation des paramètres : 
    - `$page` pour savoir sur quel page nous sommes
    - `$limit` pour définir le nombre d'items qu'on veut afficher par pages
- `->setHint(Paginator::HINT_ENABLE_DISTINCT, false)` : Preciser à doctrine qu'il ne doit pas utiliser DISTINCT dans la requête qu'il va générer

```php
namespace App\Repository;

use App\Entity\Recipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;
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
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Recipe::class);
    }

    public function paginateRecipes(int $page, int $limit): Paginator
    {
        return new Paginator(
            $this->createQueryBuilder('r')
                ->setFirstResult(($page - 1) * $limit) # Permet de commencer par la première itération en fonction de la limit d'items par page
                ->setMaxResults($limit)
                ->getQuery()
                ->setHint(Paginator::HINT_ENABLE_DISTINCT, false), # Preciser à doctrine qu'il ne doit pas utiliser DISTINCT dans la requête qu'il va générer
                false
        );
    }
}
```

### Controller

- `$request->query->getInt('page', 1);` conaitre sur quel page nous sommes
- `limitItemByPage` pour définir le nombre d'items qu'on veut afficher par pages
- `$maxPage = ceil($recipes->count() / $limitItemByPage);` obtenir le nombre total de page que nous avons besoin pour le nombre total d'items

```php
namespace App\Controller\Admin;

use App\Entity\Recipe;
use DateTimeImmutable;
use App\Form\RecipeType;
use App\Repository\RecipeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

#[IsGranted('ROLE_ADMIN')]
class RecipeController extends AbstractController
{
    #[Route('/admin/recettes', name: 'app_admin_recipe_index')]
    public function index(
        RecipeRepository $recipeRepository,
        Request $request
    ): Response
    {
        /** @var int $page */
        $page = $request->query->getInt('page', 1);

        $limitItemByPage = 2;
        $recipes = $recipeRepository->paginateRecipes($page, $limitItemByPage);
        $maxPage = ceil($recipes->count() / $limitItemByPage);

        return $this->render('admin/recipe/index.html.twig', [
            'recipes' => $recipes,
            'maxPage' => $maxPage,
            'page' => $page
        ]);
    }
}
```

### Twig

- Lien pour la Page précédente et la Page suivante

```php
{% extends 'admin/admin_base.html.twig' %}

{% block title %}Toutes les Recettes{% endblock %}

{% block body %}
    <p>
        <a class="btn btn-primary btn-sm" href="{{ path('app_admin_recipe_create') }}">Creer une nouvelle recette</a>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th style="width: 200px">Actions</th>
            </tr>
        </thead>
        <tbody>
            {% for recipe in recipes %}
            <tr>
                <td>
                    <a href="{{ url('app_recipe_show', {id: recipe.id, slug: recipe.slug}) }}">{{ recipe.title }}</a>
                </td>
                <td>
                    <p>{{ recipe.category.name }}</p>
                </td>
                <td>
                    <div class="d-flex gap-1">
                        <a class="btn btn-primary btn-sm" href="{{ path('app_admin_recipe_edit', {id: recipe.id}) }}">Modifier</a>
                        
                        <form action="{{ path('app_admin_recipe_delete', {id: recipe.id}) }}" method="post">
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
            <a href="{{ path('app_admin_recipe_index', {page: page - 1}) }}" class="btn btn-secondary me-1">Page précédente</a>
        {% endif %}

        {% if page < maxPage %}
            <a href="{{ path('app_admin_recipe_index', {page: page + 1}) }}" class="btn btn-secondary">Page suivante</a>
        {% endif %}
    </div>
{% endblock %}
```