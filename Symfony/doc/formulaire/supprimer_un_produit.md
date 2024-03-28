# Bonnes pratiques pour supprimer correctement un produit


### Dans le controller

- Utilisez `methods: ['DELETE']` pour autoriser uniquement des requêtes de type `DELETE` dans cette URL

```php
#[Route('/recettes/{id}/delete', name: 'app_recipe_delete', methods: ['DELETE'])]
public function delete(
    EntityManagerInterface $entityManager,
    Recipe $recipe
): Response
{
    $entityManager->remove($recipe);
    $entityManager->flush();

    $this->addFlash('success', 'La recette a bien été supprimée');
    return $this->redirectToRoute('app_recipe_index');
}
```

### Dans le Twig

- Simuler une requête de type delete
    1. Utilisez `method="post"` dans la balise `form` car le HTML autorise uniquement des méthodes post et get
    2. Utilisez un input cacher qui a comme nom `_method` et qui a comme valeur `DELETE` : `<input type="hidden" name="_method" value="DELETE">`

```twig
{# index.html.twig #}

{% extends 'base.html.twig' %}

{% block title %}Toutes les Recettes{% endblock %}

{% block body %}
    <p>
        <a class="btn btn-primary btn-sm" href="{{ path('app_recipe_create') }}">Creer une nouvelle recette</a>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Titre</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {% for recipe in recipes %}
            <tr>
                <td>
                    <a href="{{ url('app_recipe_show', {id: recipe.id, slug: recipe.slug}) }}">{{ recipe.title }}</a>
                </td>
                <td>
                    <div class="d-flex gap-1">
                        <a class="btn btn-primary btn-sm" href="{{ path('app_recipe_edit', {id: recipe.id}) }}">Modifier</a>
                        
                        <form action="{{ path('app_recipe_delete', {id: recipe.id}) }}" method="post">
                            <input type="hidden" name="_method" value="DELETE"> {# Simuler une requête de type delete #}
                            <button type="submit" class="btn btn-danger btn-sm">Supprimer</button>
                        </form>
                    </div>
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
{% endblock %}
```

### Dans framework.yaml

- Ajouter `http_method_override: true` pour une methode grace à un champ cacher. Exemple changer la methode POST du formulaire en DELETE grace au champ cacher

```yaml
# projet/app/config/packages/framework.yaml

# see https://symfony.com/doc/current/reference/configuration/framework.html
framework:
    secret: '%env(APP_SECRET)%'
    #csrf_protection: true

    # Note that the session will be started ONLY if you read or write from it.
    session: true

    #esi: true
    #fragments: true
    http_method_override: true # On peut modifier une methode grace à un champ cacher

```