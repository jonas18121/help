# Le fichier .gitlab-ci.yaml

## Exemple

- **image** : c'est l'image docker que l'on va utiliser, 
    -   ici c'est l'image officiel de php qu'on va utiliser en version 8.1 [voir sur hub.docker.com](https://hub.docker.com/layers/library/php/8.1/images/sha256-ddd07efedb9511e549ccf923a3e4178c53c5b248a013a9943ed4ae929e4afa14?context=explore)
    - Créer un runner de type docker va nous permettre d'executer l'image php sous docker
- **cache** : Mettre des dossiers/fichiers en cache
- **before_script** : exécuter ce script avant les autres
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
    - docker-php-ext-install pdo_mysql
stages:
    - Foo
bar:
    stage: foo
    script:
        - /bin/console lint:twig templates --env=prod
```