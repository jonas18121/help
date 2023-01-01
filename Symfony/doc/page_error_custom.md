# Page d'erreur personnaliser

Site de Symfony : [Comment personnaliser les pages d'erreur](https://symfony.com/doc/5.4/controller/error_pages.html)

## Pour créer notre page d'erreur personnaliser, il faut isntaller symfony/twig-pack

```ps
composer require symfony/twig-pack
```

## Remplacer le template de base

Pour remplacer le template de base de symfony, il faut placer les templates d'erreur personnaliser dans le répertoire `templates/bundles/TwigBundle/Exception/`

Exemple :

```
templates/
└─ bundles/
   └─ TwigBundle/
      └─ Exception/
         ├─ error404.html.twig
         ├─ error403.html.twig
         └─ error.html.twig      # All other HTML errors (including 500)
```

### Exemple de modèle d'erreur 404

Pour remplacer le `modèle d'erreur 404` pour les pages HTML, créez un nouveau modèle `error404.html.twig`  situé à `templates/bundles/TwigBundle/Exception/` :

```twig
{# templates/bundles/TwigBundle/Exception/error404.html.twig #}

{% extends 'base.html.twig' %}

{% block body %}
    <h1>Page not found</h1>

    <p>
        The requested page couldn't be located. Checkout for any URL
        misspelling or <a href="{{ path('homepage') }}">return to the homepage</a>.
    </p>
{% endblock %}
```
## Puis 2 solutions pour afficher la page d'erreur personnaliser

## Soit

### 1. Changer la variable dans .env

Changer la variable `APP_ENV=dev` en `APP_ENV=prod` dans le fichier `.env` 

Puis pour afficher l'erreur dans le navigateur en local, il faut ce rendre sur un lien qui génère l'erreur.

Exemple pour l'erreur 404 :

Le lien `http://127.0.0.1:8000/hsbchbckizbc` génère une erreur 404

A chaque fois que l'on va modifier le code de la page d'erreur personnaliser, vider le cache pour que cela s'affiche bien.

```ps
symfony console cache:clear

// ou

php bin/console cache:clear
```

## OU 

### 2. Test des pages d'erreur pendant le développement

Vérifier que le code ci-dessous est présent dans le fichier `config/routes/framework.yaml`.

S'il n'est pas présent, il faudra l'ajouter.

```yaml
# config/routes/framework.yaml

when@dev:
    _errors:
        resource: '@FrameworkBundle/Resources/config/routing/errors.xml'
        prefix:   /_error
```

Puis pour afficher l'erreur dans le navigateur en local, il faut ce rendre sur un lien qui génère l'erreur.

Le lien devra être de ce type : `http://localhost/_error/{statusCode}`

```html
<!-- pour HTML -->
http://localhost/_error/{statusCode} 

<!-- pour tout autre format -->
http://localhost/_error/{statusCode}.{format} 
```

Exemple pour l'erreur 404 :

Le lien `http://127.0.0.1:8000/_error/404` génère une erreur 404