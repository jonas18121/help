# Le fichier .gitlab-ci.yaml

## Exemple

- **image** : c'est l'image docker que l'on va utiliser, 
    -   ici c'est l'image officiel de php qu'on va utiliser en version 8.1 [voir sur hub.docker.com](https://hub.docker.com/layers/library/php/8.1/images/sha256-ddd07efedb9511e549ccf923a3e4178c53c5b248a013a9943ed4ae929e4afa14?context=explore)
    - Créer un runner de type docker va nous permettre d'executer l'image php sous docker
- **cache** : Mettre des dossiers/fichiers en cache pour ne pas avoir a les retélécharger
- **before_script** : exécuter ce script avant les autres, par exemple si c'est un script qui va ce répéter dans plusieurs JOB différents
- **stages** : Ici, on défini les différentes étapes dans lequel le pipeline va passer.
- **bar**: C'est le nom du JOB 
    - **stage** : Le JOB **bar** va s'exécuter à l'étape foo
    - **script** : Représent le script qui va s'exécuter dans ce JOB


```yml
image: php:8.1
cache:
    paths:
        - vendor/
before_script:
    - apt-get update && apt-get install -y git libzip-dev # on install git libzip-dev

    # on télécharg et install composer puis le déplacer dans /usr/local/bin/composer
    - curl -sSk https://getcomposer.org/installer | php -- --disable-tls && mv composer.phar /usr/local/bin/composer 
    
    # Installer la cli Symfony puis le déplacer dans /usr/local/bin/composer
    - curl -sS https://get.symfony.com/cli/installer | bash && mv /root/.symfony/bin/symfony /usr/local/bin/symfony
    
    - docker-php-ext-install zip # on install extension php zip
    - composer install # execution de composer install

stages:
    - Foo
    - security # étape
    - quality

bar:
    stage: foo
    script:
        - /bin/console lint:twig templates --env=prod  

check_vulnerabilities: # nom de job
    stage: security # ce job s'execute a l'étape security 
    script:
        - symfony check:security # On check la vunérabilité des dépandances

php_cs_fixer:
    stage: quality
    script:
        - composer require friendsofphp/php-cs-fixer # On install php-cs-fixer
        - ./vendor/bin/php-cs-fixer fix --dry-run # On execute la commande
    allow_failure: false # or true

php_stan:
    stage: quality
    script: # executer dans le terminal : composer config --no-plugins allow-plugins.phpstan/extension-installer true, puis envoyer sur gitlab
        - composer require phpstan/phpstan ^1.9
        - composer require phpstan/extension-installer
        - composer require phpstan/phpstan-symfony
        - ./vendor/bin/phpstan analyse --memory-limit 1G
    allow_failure: false # or true

lint:
    stage: quality
    script:
        - ./bin/console lint:yaml config --parse-tags
        - ./bin/console lint:twig templates --env=prod
        - ./bin/console lint:container --no-debug
        - ./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction
    allow_failure: false # or true

php_unit:
    stage: tests
    script:
        - ./bin/phpunit --log-junit report.xml
    artifacts:
        when: always
        reports:
        junit: report.xml
    allow_failure: false # or true
```

### php_cs_fixer

Le JOB vérifie la qualité du code PHP en utilisant php-cs-fixer. <br>
L'outil php-cs-fixer est une interface de ligne de commande qui analyse et corrige les normes de codage pour le code PHP. <br>
Le JOB effectue les actions suivantes :

- Installe php-cs-fixer en exécutant composer require friendsofphp/php-cs-fixer.
- Exécute php-cs-fixer en exécutant ./vendor/bin/php-cs-fixer fix --dry-run. <br>
    L'option --dry-run fait que php-cs-fixer affiche les modifications qu'il apporterait au code, sans les appliquer réellement.

### php_stan

Le JOB vérifie la qualité du code PHP en utilisant phpstan. <br>
phpstan est un outil de vérification statique du code PHP qui peut détecter des bugs potentiels dans votre code avant même qu'ils ne se produisent. <br>
Le JOB effectue les actions suivantes:

- Installe phpstan et ses extensions en utilisant composer.
- Configure phpstan pour analyser le code avec la commande **./vendor/bin/phpstan analyse --memory-limit 1G**. <br>
    La limite de mémoire de 1G est définie pour éviter les épuisements de mémoire pendant l'analyse.

L'analyse de phpstan fournira un rapport sur tout problème potentiel trouvé dans le code.


### Lint

Le script effectue une vérification de la qualité du code pour une application Symfony. Les commandes suivantes sont exécutées :

- **./bin/console lint:yaml config --parse-tags** vérifie la syntaxe des fichiers de configuration YAML.
- **./bin/console lint:twig templates --env=prod** vérifie la syntaxe des modèles Twig pour l'environnement de production.
- **./bin/console lint:container --no-debug** vérifie la syntaxe du fichier de configuration du conteneur.
- **./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction** valide la syntaxe du schéma Doctrine.

Ces commandes aideront à détecter des erreurs et des problèmes dans le code et les fichiers de configuration avant le déploiement.


### Tests

Le script effectue des tests unitaires pour une application PHP en utilisant PHPUnit. La commande suivante est exécutée :

- **./bin/phpunit** exécute les tests unitaires définis pour l'application.

Cette étape vérifie si le code fonctionne correctement en exécutant des tests automatisés. <br>
Les échecs des tests peuvent être utilisés pour identifier les problèmes avec le code avant le déploiement.

Les résultats de ces tests sont enregistrés dans un fichier "report.xml" au format JUnit, qui est ensuite marqué comme un artifact pour être collecté et enregistré pour une consultation ultérieure. La section "reports" définit le format de rapport pour ce fichier artifact.

**Exemple de test avec MSQL**

```yml
phpunit:
    stage: UnitTests
    services:
        - name: mysql:5.7
          alias: mysql
    variables:
      MYSQL_ROOT_PASSWORD: pass_test
      MYSQL_DATABASE: myapptest
      MYSQL_USER: myapptest
      MYSQL_PASSWORD: myapptest
      DATABASE_URL: 'mysql://myapptest:myapptest@mysql:3306/myapptest'
    script:
        - php bin/phpunit --log-junit report.xml
    artifacts:
        when: always
        reports:
        junit: report.xml
    allow_failure: false
```

### allow_failure: false # or true

**allow_failure: false** signifie que la tâche en question ne doit pas échouer. Si la tâche échoue, le processus global sera considéré comme ayant échoué également.

**allow_failure: true** signifie que la tâche peut échouer sans que cela n'affecte le processus global. Si la tâche échoue, le processus global continuera sans être affecté.<br>
allow_failure sur false, ce qui signifie que l'échec des tests interrompra le processus global. <br>
Si les tests sont moins critiques, vous pouvez les définir sur true, ce qui signifie que l'échec des tests n'affectera pas le processus global.