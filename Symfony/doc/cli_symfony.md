# Créer une application Symfony

## Style de début de commande

On peut utiliser 2 styles de début de commande soit symfony console ... ou php bin/console ..

```ps
symfony console make:controller
```
Ou 

```ps
php bin/console make:controller
```

## Créer une application Symfony avec la commande symfony

pour avoir la dernière version complète avec toutes les dépendances

    - symfony new my_project_name --webapp

pour avoir la dernière version en mode microservice, API

    - symfony new my_project_name


## Créer une application Symfony avec la commande composer

pour avoir la dernière version complète avec toutes les dépendances

    - composer create-project symfony/website-skeleton my_project_name

pour avoir la dernière version en mode microservice, API

    - composer create-project symfony/skeleton my_project_name

## Créer une application Symfony 4 avec une version précis avec la commande symfony

pour avoir la dernière version complète avec toutes les dépendances

    - symfony new my_project_name --version=4.4 --webapp

pour avoir la dernière version en mode microservice, API

    - symfony new my_project_name --version=4.4


## Créer une application Symfony 4 avec une version précis avec la commande composer

pour avoir la dernière version complète avec toutes les dépendances

    - composer create-project symfony/website-skeleton:"^4.4" my_project_name

pour avoir la dernière version en mode microservice, API

    - composer create-project symfony/skeleton:"^4.4" my_project_name

`S'il y a des problème lors de la creation de l'application , faire la même opération dans la CMD de git bash`

## Créer une application Symfony 5 avec une version précis avec la commande symfony

pour avoir la dernière version complète avec toutes les dépendances

    - symfony new my_project_directory --version=5.4 --webapp

pour avoir la dernière version en mode microservice, API

    - symfony new my_project_directory --version=5.4


## Créer une application Symfony 5 avec une version précis avec la commande composer

pour avoir la dernière version complète avec toutes les dépendances

```ps
    composer create-project symfony/skeleton:"^5.4" my_project_directory
```

```ps
    cd my_project_directory
```

```ps
    composer require webapp
```

pour avoir la dernière version en mode microservice, API
```ps
 composer create-project symfony/skeleton:"^5.4" my_project_directory
```
`S'il y a des problème lors de la creation de l'application , faire la même opération dans la CMD de git bash`


## Faire tourner notre application avec la commande symfony

    - symfony server:start

## Faire tourner notre application avec la commande symfony en arrière plan

    - symfony server:start -d

## Faire tourner notre application avec la commande symfony en arrière plan
```ps
symfony serve -d
```

### Ouvrir l'application dans notre navigateur local
```ps
symfony open:local
```
## Voir les log de l'application qui tourne en arrière plan

    - symfony server:log

## Stopper notre application qui tourne en arrière plan

    - symfony server:stop

## Faire tourner notre application avec la commande composer

On telecharge un serveur personnalisé via composer, qu'on utilise seulement lorsqu'on sera en mode développement

    - composer require server --dev

puis on tape la commande

    - php bin/console server:run

## Faire tourner notre application avec Symfony 5 et supérieur

A partir de Symfony 5, la commande `php bin/console server:run` n'est plus prise en compte.
Symfony 5 n'implémente pas le bundle `symfony/web-server-bundle` et on ne peut pas l'installer dessus.

Dans le passé, `les projets Symfony` étaient crées avec `Composer` qui est un gestionnaire de dépendance pour les applications PHP.
Cependant, la recommandation actuelle est d'utiliser l'installateur de `Symfony` qui doit être lui-même installé avant de créer votre projet.

A la place on peut utiliser cette commande :

    > php -S 127.0.0.1:8000 -t public

Ou utiliser directement la commande `Symfony` pour lancer son server

    > Symfony serve

## Faire tourner notre application avec Symfony avec HTTPS

Installer l'autorité de certification locale

    > symfony server:ca:install

Faire tourner Symfony avec HTTPS

    > symfony serve

## Supprimer un bundle à partir de symfony 4

    - composer remove <nom_du_bundle>
    
    ou

    - composer rem <nom_du_bundle>

## Installer la toolbar ( la barre d'outils )

La toolbar, la barre d'outils qui contient les bundles

`symfony/debug-bundle: *`

`symfony/monolog-bundle: ^3.0`

`symfony/profiler-pack: *`

`symfony/var-dumper: *`

    - composer require symfony/debug-pack --dev

## Installer le moteur de templating Twig

    - composer require symfony/twig-bundle

## Créer un Controlleur avec la CLI

Symfony Maker vous aide à créer des commandes vides, des contrôleurs, 
des classes de formulaire, des tests et plus encore afin que vous puissiez oublier l'écriture de code standard.

telecharger maker-bundle

    - composer require symfony/maker-bundle --dev

ou

    - composer require make --dev

si on veut voir la liste de commande que propose maker-bundle une fois installer

    - php bin/console list make

voici la liste :

        make:auth                   Creates a Guard authenticator of different flavors
        make:command                Creates a new console command class
        make:controller             Creates a new controller class
        make:crud                   Creates CRUD for Doctrine entity class
        make:docker:database        Adds a database container to your docker-compose.yaml file
        make:entity                 Creates or updates a Doctrine entity class, and optionally an API Platform resource
        make:fixtures               Creates a new class to load Doctrine fixtures
        make:form                   Creates a new form class
        make:functional-test        Creates a new functional test class
        make:message                Creates a new message and handler
        make:messenger-middleware   Creates a new messenger middleware
        make:migration              Creates a new migration based on database changes
        make:registration-form      Creates a new registration form system
        make:reset-password         Create controller, entity, and repositories for use with symfonycasts/reset-password-bundle   
        make:serializer:normalizer  Creates a new serializer normalizer class
        make:subscriber             Creates a new event subscriber class
        make:twig-extension         Creates a new Twig extension class
        make:unit-test              Creates a new unit test class
        make:user                   Creates a new security user class
        make:validator              Creates a new validator and constraint class
        make:voter                  Creates a new security voter class

installer les annotaions de doctrine

    - composer require doctrine/annotations

Créer le controlleur

    - php bin/console make:controller

puis répondre on question qui seront poser.


## ORM de Symfony : Doctrine

on installe le symfony/orm-pack qui contient :

`composer/package-versions-deprecated: *`

`doctrine/doctrine-bundle: *`

`doctrine/doctrine-migrations-bundle: *`

`doctrine/orm: *`

`symfony/proxy-manager-bridge: *`

    - composer require symfony/orm-pack

La liste de commande doctrine :

    doctrine:cache:clear-collection-region     
    doctrine:cache:clear-entity-region
    doctrine:cache:clear-metadata
    doctrine:cache:clear-query
    doctrine:cache:clear-query-region
    doctrine:cache:clear-result
    doctrine:database:create
    doctrine:database:drop
    doctrine:database:import
    doctrine:ensure-production-settings        
    doctrine:mapping:convert
    doctrine:mapping:import
    doctrine:mapping:info
    doctrine:migrations:current
    doctrine:migrations:diff
    doctrine:migrations:dump-schema
    doctrine:migrations:execute
    doctrine:migrations:generate
    doctrine:migrations:latest
    doctrine:migrations:list
    doctrine:migrations:migrate
    doctrine:migrations:rollup
    doctrine:migrations:status
    doctrine:migrations:sync-metadata-storage  
    doctrine:migrations:up-to-date
    doctrine:migrations:version
    doctrine:query:dql
    doctrine:query:sql
    doctrine:schema:create
    doctrine:schema:drop
    doctrine:schema:update
    doctrine:schema:validate

puis dans le fichier `.env` on modifie la variable d'environnement DATABASE_URL

(`DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7"`) , 

qui va renseigner à Symfony oû ce trouve notre base de données

`Il faudra modifier le : db_user, db_password, db_name`

voici ma bdd : `DATABASE_URL="mysql://root:@127.0.0.1:3306/listing_bulletin_symfony?serverVersion=5.7"`

Après avoir modifier la variable d'environnement DATABASE_URL, on dit a Symfony de créer la base de données

    - php bin/console doctrine:database:create

### Créer une Entité

Dans Symfony avec doctrine une Classe entity représentera une table en base de données

    - php bin/console make:entity

puis répondre aux question poser
ça nous créer une entité et une repository

exemple : 

    created: src/Entity/Eleve.php
    created: src/Repository/EleveRepository.php

### Faire une migration

La migration va permettre a doctrine d'annalysé mon code, il va faire la différence entre la base de données et les entités 
et s'il y a des différence entre eux , il va créer un scrpit SQL versionné en fonction des modification apporter dans les fichiers entity

    - php bin/console make:migration

on lance les script de migrations afin de mettre à jour la base de données

    - php bin/console doctrine:migrations:migrate

répondre `yes` à la question pour mettre a jour la base de données

### Les Fixtures

Les fixtures vont servir à avoir un jeux de fausses données
on installe le composant doctrine/doctrine-fixtures-bundle

    - composer require doctrine/doctrine-fixtures-bundle --dev

ou

    - composer require orm-fixtures --dev

puis on créer une fixture

    - php bin/console make:fixtures

ça créera un dossier DataFixtures dans lequel , il y aura notre fichier fixtures

et pour executé notre fixtures 

    - php bin/console doctrine:fixtures:load

## fzaninotto/faker

    > composer require fzaninotto/faker --dev

## ParamConverter

pour pouvoir utiliser le ParmConverter, il faut s'assuré d'avoir le bundle sensio/framework-extra-bundle

    - composer require sensio/framework-extra-bundle

puis mettre ce fichier dans le controlleur

    - use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

on peut mettre ça aussi

    - use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

on peut aussi utilser juste ce namespace a la place de Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

    - use Symfony\Component\Routing\Annotation\Route;


## Theme bootstrap 

    # config/packages/twig.yaml
    twig:
        form_themes: ['bootstrap_4_layout.html.twig']

et mettre la commande si dessus dans nos fichier twig

    {% form_theme variable_de_mon_formulaire 'bootstrap_4_layout.html.twig' %}


## Les formulaires avec CLI

`comment customiser un formulaire` : https://symfony.com/doc/current/form/form_customization.html

pour créer un formulaire installé : 

    -  composer require symfony/form

puis créer une classe FromType :

    - php bin/console make:form


Exécutez la commande suivante pour vérifier que le type de formulaire a été correctement enregistré dans l'application:

    - php bin/console debug:form



## Les validations 

https://symfony.com/doc/4.4/validation.html

pour créer un validator installé :

    - composer require symfony/validator doctrine/annotations

pour débuger un validator :

    - php bin/console debug:validator namespace_de_class


## Supprimer les caches

    - php bin/console cache:clear

## Securité ( authentification user )

https://symfony.com/doc/4.4/security.html

installer le bundle symfony/security-bundle

```ps
composer require symfony/security-bundle
```

### Créer une classe User
```ps
php bin/console make:user

    The name of the security user class (e.g. User) [User]:
    > User

    Do you want to store user data in the database (via Doctrine)? (yes/no) [yes]:
    > yes

    Enter a property name that will be the unique "display" name for the user (e.g.
    email, username, uuid [email]
    > email

    Does this app need to hash/check user passwords? (yes/no) [yes]:
    > yes

    created: src/Entity/User.php
    created: src/Repository/UserRepository.php
    updated: src/Entity/User.php
    updated: config/packages/security.yaml
```

Si on veut rajouter des champs dans src/Entity/User 
```ps
php bin/console make:entity User

# puis faire la migration 
    
php bin/console make:migration

php bin/console doctrine:migrations:migrate
```

### Créer un formulaire de connexion 

puis créer un formulaire de connexion https://symfony.com/doc/4.4/security/form_login_setup.html

```ps
php bin/console make:auth

    What style of authentication do you want? [Empty authenticator]:
        [0] Empty authenticator
        [1] Login form authenticator
    > 1

    The class name of the authenticator to create (e.g.AppCustomAuthenticator):
    > LoginFormAuthenticator

    Choose a name for the controller class (e.g. SecurityController) [SecurityController]:
    > SecurityController

    Do you want to generate a '/logout' URL? (yes/no) [yes]:
    > yes

    created: src/Security/LoginFormAuthenticator.php
    updated: config/packages/security.yaml
    created: src/Controller/SecurityController.php
    created: templates/security/login.html.twig
```

## Voir les détail d'une dépendance

```ps
composer show <la_dépendance>
```

Exemple :

```ps
composer show symfony/flex
```

## Voir l'ensemble des routes du projet
```ps
symfony console debug:router

# ou

php bin/console debug:router
```
## Voir l'ensemble des sevices du projet
```ps
symfony console debug:autowiring

# ou

php bin/console debug:autowiring
```


## Filtrée et voir un ensemble sevice qui concerne la session dans le projet
```ps
symfony console debug:autowiring session

# ou

php bin/console debug:autowiring session
```
## Upload un fichier (dont une image, Upload image)


on installe VichUploaderBundle 
https://github.com/dustin10/VichUploaderBundle/blob/master/docs/installation.md

```ps
composer require vich/uploader-bundle
```
puis on choissie avec quel base de donnés ( orm ou mongodb ou phpcr ) on veut agir dans un fichier config/packages/vich_uploader.yaml ou app/config/config.yml

```yaml
    vich_uploader:
        db_driver: orm 


    inject_on_load: false
    delete_on_update: true
    delete_on_remove: true
```


### Avec cette vidéo 

A partir de la 25 èmes min : https://www.youtube.com/watch?v=iB4gvCsjVXQ

Pour configurer VichUploaderBundle, on va dans les fichiers :

- vich_uploader.yaml 
et
- services.yaml

puis on va dans les entités qui pourrons avoir des images 

#### Dans services.yaml

```yaml
parameters:
    app.path.images: /uploads/images
```

##### Definition:
app.path.images est une constante qui contiendra le chemin, dans lequel les images seront stocké


#### Dans vich_uploader.yaml 

##### Definition:
dans ce fichier on utilise des mappings, 
un mappings c'est dire à vich_uploader, ce qu'il doit faire avec les images/fichiers, 
on lui dit , ou il doit stocké les images/fichiers, comment les nommées 

- uri_prefix: c'est le chemin dans lequel on veut aller, on a mis la constantes app.path.images qu'on a créer dans services.yaml.

- upload_destination: c'est l'endroit ou on va stockée les images/fichiers 

la constante %kernel.project_dir% , permet d'accéder à la racine du projet

- namer: Vich\UploaderBundler\Naming\UniqidNamer, sert à renommer les images/fichiers de façon unique




## EasyAdmin version 3.x

Site [Symfony](https://symfony.com/bundles/EasyAdminBundle/current/index.html), Faire attention à la version utiliser

EasyAdmin crée de superbes backends d'administration pour vos applications Symfony. C'est gratuit, rapide et entièrement documenté.

### Installation 

```ps
composer require easycorp/easyadmin-bundle

# ou
 
composer require admin
```

### Créer un Dashboard

on crée notre dashboard représenté sous forme de controlleur

```ps
symfony console make:admin:dashboard

# ou
 
php bin/console make:admin:dashboard
```

puis configurer le DashboardController.php,
en ajoutant un ou plusieurs entité, grace a yield MenuItem::linkToCrud();

Exemple yield MenuItem::linkToCrud('Espace de stokage', 'fas fa-list', StorageSpace::class);

ps : il y aura une erreur, car il faudra créer le controlleur associer a l'entité StorageSpace,
le controlleur aura pour nom StorageSpaceCrudController par exemple

### Créer les controlleurs assiocée aux entités à manager

```ps
symfony console make:admin:crud

# ou
 
php bin/console make:admin:crud
```

Voir exemple d'un fichier [crud](https://github.com/jonas18121/help/blob/master/Symfony/doc/easyadmin.md)

## API Plateform

```ps
composer require api
```

## une version précise de API plateform

```ps
composer require api-platform/core:v2.5 --with-all-dependencies 
```

### Si on execute la commande ci-dessous, on verra les différentes commandes pour exporter un fichier

```ps
php bin/console api
```

### Si on execute la commande ci-dessous, on verra des données en format JSON qui contient la définition de notre API

```ps
php bin/console api:openapi:export
```

### Si on execute la commande ci-dessous, on verra des données en format yaml qui contient la définition de notre API

```ps
php bin/console api:openapi:export --yaml
```

## lexik/jwt-authentication-bundle

```ps
composer require lexik/jwt-authentication-bundle
```

### Généré des clés SSL (SSL keys) privées et public

```ps
php bin/console lexik:jwt:generate-keypair
```

Options disponibles:

`--skip-if-exists` = ne fera rien en silence si les clés existent déjà.

`--overwrite` = écrasera vos clés si elles existent déjà.

Sinon, une erreur sera levée pour vous empêcher d'écraser vos clés accidentellement.

## test unitaire

### phpunit/phpunit

```ps
composer require phpunit/phpunit --dev
```

### test 

```ps
composer require test --dev
```

### Créer une base de données dans un environnement de test

```ps
php bin/console doctrine:database:create --env=test
```

### Créer la structure des tables dans la base de données qui est dans un environnement de test

```ps
php bin/console doctrine:schema:update --env=test --force
```

### Envoyer des fixtures dans la base de données qui est dans un environnement de test

```ps
php bin/console doctrine:fixtures:load --env=test
```

## Créer une commande personnalisé

```ps
php bin/console make:command
```

Le site de Symfony, créer une commande : https://symfony.com/doc/current/console.html

Le site de Symfony, Console Input (Arguments & Options) : https://symfony.com/doc/current/console/input.html

Le site de Symfony, ajoute de style pour le rendu : https://symfony.com/doc/current/console/style.html

Le terminale proposera de donner un nom à la commande personnalisé

    Choose a command name (e.g. app:orange-kangaroo):
    > <nom_de_la_commande>

Exemple

    Choose a command name (e.g. app:orange-kangaroo):
    > create:category

Puis Symfony va créer un dossier `command` avec la classe `CreateCategoryCommand` qui est le nom de la commmande `create:category`

### Désinstaller la symfony-cli (linux)

Voir les droits
```ps
ls -al /usr/local/bin/symfony
```
si c'est là

supprimer

```ps
rm -rf /usr/local/bin/symfony
```

### Installer Webpack Encore dans Symfony

```ps
composer require symfony/webpack-encore-bundle

# puis

yarn install

# ou

npm install
```

Run webpack

```ps
# compiler les actifs et recompiler automatiquement lorsque les fichiers changent
yarn watch

# ou

npm run watch

# Ou, exécutez dev-sever qui peut parfois mettre à jour votre code sans actualiser la page
yarn dev-server

# ou

npm run dev-server

# compiler les actifs une fois
yarn dev

# ou

npm run dev

# Lors du déploiement, créer une version de production
yarn build

# ou

npm run build
```

### Installer PHPSTAN

Voir aussi ce [lien](https://github.com/jonas18121/help/blob/master/Devops/doc/yodev/5_projet/2_php_stan.md)

C'est un analyseur statique de code PHP

- [PHPSTAN](https://phpstan.org/user-guide/getting-started)
- [Les règles](https://phpstan.org/user-guide/rule-levels)
- [Templates génériques](https://phpstan.org/writing-php-code/phpdocs-basics#generics)
- [Video Grafikart](https://www.youtube.com/watch?v=NkbuFsgHB_c)
- [Ignorer certaines erreurs](https://phpstan.org/user-guide/ignoring-errors)
- [Résolution de l'erreur PHPStan « Aucun type de valeur spécifié dans le type itérable »](https://phpstan.org/blog/solving-phpstan-no-value-type-specified-in-iterable-type)

```ps
composer require --dev phpstan/phpstan
```
#### Première exécution

par exemple, si vous avez vos classes dans des répertoires src et tests, vous pouvez exécuter PHPStan comme ceci :

```ps
vendor/bin/phpstan analyse src tests
```

Il y a 8 niveaux, le niveau par défaut est 0. Si on veut tester au niveau 8 faire la commande ci-dessous : 

```ps
vendor/bin/phpstan analyse src tests --level 8 --memory-limit=2G

# ou

vendor/bin/phpstan analyse src tests -l 8 --memory-limit=2G

# ou

vendor/bin/phpstan analyse src tests --level=max -c phpstan.dist.neon --memory-limit=2G
```

On peut aussi configurer le fichier `phpstan.dist.neon` ce qui permet d'utiliser juste la commande `vendor/bin/phpstan analyse`

```ps
# phpstan.dist.neon

parameters:
    level: 8
    paths:
        - public/
        - src/
        - tests/
    ignoreErrors:
        -
          message: '#Property [a-zA-Z0-9\\_]+::\$id is never written, only read.#'
          path: src/Entity/*
    checkGenericClassInNonGenericObjectType: false
```

```ps
vendor/bin/phpstan analyse --memory-limit=2G
```
### Installer PHP CS FIXER

Voir ce [lien](https://github.com/jonas18121/help/blob/master/Devops/doc/yodev/5_projet/1_php_cs_fixer.md)