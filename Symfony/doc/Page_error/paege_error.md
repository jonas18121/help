# Créer une page d'erreur personnaliser

- [Symfony 4.4](https://symfony.com/doc/4.4/controller/error_pages.html)

### 1) Installer le Bundle symfony/twig-pack

```ps
composer require symfony/twig-pack
```

### 2) Creer les templates qui vont remplacer le modèle par défaut

- Dans le dossier `templates` créer les dossiers `bundles` puis `TwigBundle` puis `Exception` 
- Dans le dossier `Exception` créer les fichier d'erreurs que vous voulez remplacer

```ps
templates/
└─ bundles/
   └─ TwigBundle/
      └─ Exception/
         ├─ error404.html.twig
         ├─ error403.html.twig
         └─ error.html.twig      # All other HTML errors (including 500)
```

### 3) Exemple de modèle d'erreur 404

- `base.html.twig` est celui qui est à la racine du répertoire `templates`
- On prend notre image `error404_2.jpeg` qui est dans les dossiers `public/uploads/default/error`

```twig
{% extends 'base.html.twig' %}

{% block body %}
<div 
    class="container error_page" 
    style="
        background: url('{{ asset('uploads/default/error/error404_2.jpeg') }}')  center center fixed;
        background-size: cover;
    "
>
    <div class="">
        <h1>Page non trouvé</h1>
    </div>
</div>
{% endblock %}
```

### 4) Test des pages d'erreur pendant le développement

Pour tester en developpement

- http://localhost/_error/{statusCode}pour HTML
- http://localhost/_error/{statusCode}.{format}pour tout autre format

Exemple : 

http://127.0.0.1:8888/_error/404

http://127.0.0.1:8888/_error/500

http://127.0.0.1:8888/_error/403