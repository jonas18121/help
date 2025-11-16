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


### Exemple du contenu du fichier gitlab-ci pour le deploiement
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
  # - curl -sS https://get.symfony.com/cli/installer | bash 
  
  - docker-php-ext-install zip # on install extension php zip
  - composer install # execution de composer install 


stages:
  # - security # étape
  - quality
  - tests
  - deploy

# check_vulnerabilities: # nom de job
#   stage: security # ce job s'execute a l'étape security 
#   script:
#     - symfony check:security # On check la vunérabilité des dépandances

php_cs_fixer:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - composer require friendsofphp/php-cs-fixer # On install php-cs-fixer
    - ./vendor/bin/php-cs-fixer fix --dry-run # On execute la commande
  allow_failure: false # or true

php_stan:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - composer require phpstan/phpstan ^1.9
    - composer require phpstan/extension-installer
    - composer require phpstan/phpstan-symfony
    - ./vendor/bin/phpstan analyse --memory-limit 1G
  allow_failure: false # or true

lint:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - ./bin/console lint:yaml config --parse-tags
    - ./bin/console lint:twig templates --env=prod
    - ./bin/console lint:container --no-debug
    - ./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction
  allow_failure: false # or true
    
    
php_unit:
  stage: tests
  except:
    - staging
    - preproduction
    - production
  script:
    - ./bin/phpunit --log-junit report.xml
  artifacts:
    when: always
    reports:
      junit: report.xml
  allow_failure: false # or true

# # **Exemple de test avec MSQL**
# phpunit:
#     stage: UnitTests
#     services:
#         - name: mysql:5.7
#           alias: mysql
#     variables:
#       MYSQL_ROOT_PASSWORD: pass_test
#       MYSQL_DATABASE: myapptest
#       MYSQL_USER: myapptest
#       MYSQL_PASSWORD: myapptest
#       DATABASE_URL: 'mysql://myapptest:myapptest@mysql:3306/myapptest'
#       before_script:
#         - php bin/console doctrine:database:create --env=test
#         - php bin/console doctrine:migration:migrate --env=test --no-interaction
#         - php bin/console doctrine:fixtures:load --no-interaction --append --env=test
#     script:
#         - php bin/phpunit  --log-junit report.xml
#     artifacts:
#       when: always
#       reports:
#           junit: report.xml
#     allow_failure: false

production:
  stage: deploy
  only:
    - production
  script:
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client git -y )'
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - eval $(ssh-agent -s)
    - bash -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'
    - | 
      ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << EOF
      cd var/www/symfony-giltab
      git pull
      EOF
```

**Explication des commande qui sont dans la clé script**
- **'which ssh-agent || ( apt-get update -y && apt-get install openssh-client git -y )'** :
    - Cette ligne de commande vérifie si un processus appelé "ssh-agent" est en cours d'exécution sur le système. Si ce n'est pas le cas, la commande effectue les actions suivantes :
        - Mettre à jour la liste des paquets disponibles à partir des dépôts du système.
        - Installer les paquets "openssh-client" et "git".
    La commande "apt-get update" actualise la liste des paquets disponibles, tandis que "apt-get install" installe les paquets spécifiés.<br>
    Les options "y" sont utilisées pour répondre automatiquement "oui" à toutes les questions posées par le système pendant l'installation des paquets.

- **mkdir -p ~/.ssh** :
    - crée un répertoire nommé ".ssh", L'option "-p" permet de créer les répertoires parent nécessaires s'ils n'existent pas.

- **chmod 700 ~/.ssh**
    - Changer les permissions du dossier .ssh

- **eval $(ssh-agent -s)** :
    - Cette commande démarre un processus appelé "ssh-agent" et exporte les variables d'environnement nécessaires pour interagir avec ce processus. <br>
    L'option "-s" démarre le processus "ssh-agent" en tant que daemon (processus en arrière-plan), ce qui permet de maintenir les clés SSH en mémoire entre les sessions de terminal.<br><br>
    L'expression "eval" exécute le résultat de la commande "ssh-agent -s" en tant que commande shell. <br>
    Les variables d'environnement exportées par "ssh-agent" peuvent alors être utilisées par d'autres commandes pour interagir avec ce processus.<br><br>
    Le processus "ssh-agent" est souvent utilisé pour gérer les clés SSH et effectuer des opérations de cryptage / décryptage nécessaires pour établir des connexions SSH sécurisées.

- **bash -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'** : 
    - Cette commande ajoute une clé privée SSH à l'agent SSH en cours d'exécution.<br><br>
    L'option "-c" permet d'exécuter la commande spécifiée en tant que commande shell dans un nouveau processus de shell.<br><br>
    L'expression "$SSH_PRIVATE_KEY" réfère à une variable d'environnement contenant la clé privée SSH à ajouter. <br>
    La syntaxe "<(commande)" est une redirection process, qui permet de traiter la sortie d'une commande comme un fichier. <br>
    Dans ce cas, la sortie de la commande "echo "$SSH_PRIVATE_KEY"" est utilisée comme entrée pour la commande "ssh-add".<br><br>
    L'ajout d'une clé privée SSH à l'agent SSH permet de ne pas devoir entrer la passphrase de la clé à chaque fois que la clé est utilisée pour établir une connexion SSH. <br>L'agent SSH se chargera d'effectuer toutes les opérations de cryptage / décryptage nécessaires en utilisant la clé privée.

- **'[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'** :
    - Cette commande vérifie si le fichier "/ .dockerenv" existe et, si c'est le cas, ajoute des entrées au fichier de configuration SSH "~ / .ssh / config".<br><br>

    L'expression "[[ -f /.dockerenv ]]" vérifie si le fichier "/ .dockerenv" existe. Si c'est le cas, la condition est considérée comme vraie et les instructions dans les accolades sont exécutées.<br><br>

    L'instruction "echo -e" affiche une chaîne de caractères sur la sortie standard. La chaîne de caractères spécifiée inclut des entrées pour configurer le comportement des connexions SSH.<br><br>

    Les entrées "Host *" et "StrictHostKeyChecking no" sont utilisées pour désactiver la vérification de la clé hôte pour tous les hôtes. Cela signifie que les avertissements sur les clés hôte non fiables ne seront plus affichés lors de la connexion à un nouvel hôte via SSH.

- **ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << EOF** :
    - Cette commande établit une connexion SSH à un hôte en utilisant des informations spécifiées dans des variables d'environnement.<br>
    Une fois la connexion SSH établie, l'utilisateur peut exécuter des commandes sur l'hôte distant et afficher leur sortie sur la sortie standard locale. Les entrées de l'utilisateur seront transmises à l'hôte distant pour être exécutées. La connexion peut être fermée en saisissant "exit" ou en appuyant sur Ctrl + D.

- **cd var/www/symfony-giltab** : 
    - Cette commande change le répertoire de travail actuel du shell vers "var / www / symfony-giltab".<br>
    "cd" est un raccourci pour "change directory" (changer de répertoire) et peut être utilisé pour naviguer dans le système de fichiers.

- **git pull** :
    - Récupérer les modifications qui sont sur la branch sur gitlab pour le mettre dans le serveur distant

- **EOF** :
    - "EOF" est une marque utilisée pour déterminer la fin d'un bloc de commandes lors de l'utilisation d'une redirection de bloc de commandes.<br><br>
    Dans ce cas, "EOF" est utilisé pour déterminer la fin d'un bloc de commandes exécuté sur un hôte distant via une connexion SSH. <br>
    Toutes les commandes entre "ssh -p $SSH_PORT $SSH_USER@$SSH_HOST << EOF" et "EOF" seront exécutées sur l'hôte distant lors de l'établissement de la connexion SSH.<br><br>
    Une fois que toutes les commandes du bloc ont été exécutées, la connexion SSH sera fermée et le terminal local retournera à son état précédent.<br>