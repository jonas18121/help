# Comment surcharger un fichier twig d'un bundle

Source :
- [Comment surcharger n'importe quelle partie d'un bundle](https://symfony.com/doc/current/bundles/override.html)
- [Comment surcharger les templates provenant de bundles tiers](https://symfony.com/doc/3.x/templating/overriding.html)

### Contexte 

Nous avons un bundle personnalisé (ou pas) mais on ne doit pas le modifier. <br>
Nous avons besoin de le surcharger pour apporter quelques modifications a un fichier twig qu'il contient pour rajouter `|raw` à `{{ message }}`.

Voici un exemple de chemin du fichier `flashes.html.twig` qu'on ne doit pas modifier directement dans son bundle, avec son code : 

```twig
{# projet\vendor\team\my-bundle\src\Resources\views\partials\flashes.html.twig #}

{% for type, messages in app.session.flashbag.all() %}
    <div class="bm-messages">
        {% for message in messages %}
            <div class="bm-messages-{{ type }}" style="padding: 10px;text-align: center;">
                <p class="bm-message bm-{{ type }}" style="margin: 0px">
                    {{ message }}
                </p>
            </div>
        {% endfor %}
    </div>
{% endfor %}
```

Pour surcharger ce template dans notre projet sans toucher au vendor, il faut créer un fichier dans le dossier de templates en respectant la structure du bundle.

### 1. Identifier le nom du bundle

Dans le chemin, le bundle se trouve ici :

```bash
projet\vendor\team\my-bundle\src\Resources\views\partials\flashes.html.twig 
```

Le nom de bundle (déclaré dans la classe du bundle) est probablement MyBundle. On le trouve ici :

```bash
projet\vendor\team\my-bundle\MyBundle.php
```

### 2. Créer le fichier de surcharge

On crée le fichier suivant dans l'application (en respectant la structure d'override de Symfony) :

- Après le répertoire `projet\template\bundles\` de notre projet

    - On veut le nom du Bundle en CamelCase (donc on ne garde pas le répertoire `team` pour notre surcharge)
    - On ne garde pas `src\Resources\views` et on passe directement au repertoire `partials`

```bash
projet\template\bundles\my-bundle\partials\flashes.html.twig 
```

### 3. Copier et modifier le contenu

- On recopie le contenu d'origine dans ce fichier et modifie la ligne affichant le message pour utiliser le filtre `|raw`. Par exemple :

```twig
{# projet\template\bundles\my-bundle\partials\flashes.html.twig  #}

{% for type, messages in app.session.flashbag.all() %}
    <div class="bm-messages">
        {% for message in messages %}
            <div class="bm-messages-{{ type }}" style="padding: 10px;text-align: center;">
                <p class="bm-message bm-{{ type }}" style="margin: 0px">
                    {{ message|raw` }}
                </p>
            </div>
        {% endfor %}
    </div>
{% endfor %}
```

### 4. Vider le cache

- Après avoir créé et modifié le fichier, on vide le cache :

```bash
php bin/console cache:clear
```

En suivant ces étapes, Symfony utilisera notre fichier personnalisé à la place de celui fourni par le bundle, et les flash messages afficheront correctement les balises `<a>` grâce au filtre `|raw`.