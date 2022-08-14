# Création du fichier docker-compose.yml et installation de Symfony

Exemple de création du fichier docker-compose.yml

1) Créer manuellement le du fichier docker-compose.yml à la racine de votre projet

2) Pour savoir dans quel format doit-on écrire le docker-compose.yml, vérifiez la version de Docker disponible sur votre poste.

    > docker -v

ou 

    > docker --version

Ce site montre les différente version : https://docs.docker.com/compose/compose-file/compose-file-v3/

Dans `docker-compose.yml`

    version: "3.8"
    services:

##  Spécifier nos services dans `docker-compose.yml`

### REMARQUE : L'indentaion est importante

### Conteneur MySQL

Dans `docker-compose.yml`

    version: "3.8"
    services:
        db:
            image: mysql
            container_name: wallky_mysql
            restart: always
            volumes:
                - db-data:/var/lib/mysql
            environment:
                MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
            networks:
                - dev

    networks:
        dev:
    volumes:
        db-data:


 - `version:` = Indique la version de Docker Compose que nous utilisons, Docker fournira les fonctionnalités appropriées.

 - `services:` = Définit tous les différents containers que nous allons créer

 - `db:` = Le nom de notre service

 - `image:` = Si nous n'avons pas de Dockerfile et que nous voulons exécuter un service à l'aide d'une image déjà existant, on le met ici

 - `container_name:` = On donne un nom a notre container

 - `restart:` = On dit à notre service de toujours redémarré quoi qu'il arrive

 - `volumes:` = On lui spécifie un volume dans lequel il va devoir persister des données

 - `environment:` = configurer une ou des variables d'environnement dans le conteneur pour ce connecté au service

 - `networks:` = Ici, on indique le nom du réseau qu'il va devoir utiliser 




### Conteneur phpMyAdmin

    phpmyadmin:
            image: phpmyadmin
            container_name: wallky_phpmyadmin
            restart: always
            depends_on:
                - db
            ports:
                - 8080:80
            environment:
                PMA_HOST: db
            networks:
                - dev

 - `depends_on:` ça veut dire que le service `phpmyadmin` va attendre que le service `db` soit disponible avant de démarré, car il dépend de lui

 - `ports:` Le port sous lequel on veut affiché l'interface de notre service

 - `PMA_HOST:` On dit au service `phpmyadmin` que sa base de données sera `db:`

### Essaie

A ce stade  le fichier `docker-compose.yml` devrait être comme ça :

    version: "3.8"
    services:
        db:
            image: mysql
            container_name: wallky_mysql
            restart: always
            volumes:
                - db-data:/var/lib/mysql
            environment:
                MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
            networks:
                - dev

        phpmyadmin:
            image: phpmyadmin
            container_name: wallky_phpmyadmin
            restart: always
            depends_on:
                - db
            ports:
                - 8080:80
            environment:
                PMA_HOST: db
            networks:
                - dev

    networks:
        dev:
    volumes:
        db-data:

Si on fait la commande en CLI ci-dessous, on devrais pouvoir accéder à phpMyAdmin aux adresses suivante `127.0.0.1:8080` ou `localhost:8080`

    > docker-compose up



### Conteneur Apache et Php

On va construire nous même notre image à l’aide d’un Dockerfile

1) On crée un dossier php à la racine du projet

2) On crée un fichier Dockerfile dans le dossier php

3) Dans le fichier Dockerfile, on va commencé partir d'une image déjà existant de php 7.4

    - FROM php:7.4-apache

4) on ajoute différent librairie (exemple git) et outils (exemple composer) 

Dans `php/Dockerfile`

    FROM php:7.4-apache

    RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

    RUN apt-get update \
        && apt-get install -y --no-install-recommends locales apt-utils git libicu-dev g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev;

    RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
        echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen && \
        locale-gen

    RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls && \
    mv composer.phar /usr/local/bin/composer

    RUN docker-php-ext-configure intl
    RUN docker-php-ext-install pdo pdo_mysql gd opcache intl zip unzip calendar dom mbstring zip gd xsl
    RUN pecl install apcu && docker-php-ext-enable apcu

    WORKDIR /var/www/


5) On rajoute dans le fichier `docker-compose.yml` un service qu'on appellera `www`

dans `docker-compose.yml`

    www:
        build: php
        container_name: wallky_www
        ports:
            - "8741:80"
        volumes:
            - ./php/vhosts:/etc/apache2/sites-enabled
            - ./:/var/www
        user: '1000:1000' 
        restart: always
        networks:
            - dev

`build:` = Le répertoire dans lequel on va chercher notre Dockerfile, ici c'est la répertoire php

`./php/vhosts:/etc/apache2/sites-enabled` = Passer la configuration des virtual host, à l'intérieur du container

6) On crée le répertoire vhost dans le dossier php

7) Dans le dossier vhost, on crée un fichier vhost.conf

8) Dans le fichier vhost.conf, on va mettre coller la préconisation prévu par symfony pour les virtual host

site symfony : https://symfony.com/doc/current/setup/web_server_configuration.html

Dans `vhost.conf`

    <VirtualHost *:80>
        ServerName localhost

        DocumentRoot /var/www/api/public
        DirectoryIndex /index.php

        <Directory /var/www/api/public>
            AllowOverride None
            Order Allow,Deny
            Allow from All

            FallbackResource /index.php
        </Directory>

        # uncomment the following lines if you install assets as symlinks
        # or run into problems when compiling LESS/Sass/CoffeeScript assets
        # <Directory /var/www/api>
        #     Options FollowSymlinks
        # </Directory>

        # optionally disable the fallback resource for the asset directories
        # which will allow Apache to return a 404 error when files are
        # not found instead of passing the request to Symfony
        <Directory /var/www/api/public/bundles>
            FallbackResource disabled
        </Directory>
        ErrorLog /var/log/apache2/api_error.log
        CustomLog /var/log/apache2/api_access.log combined

        # optionally set the value of the environment variables used in the application
        #SetEnv APP_ENV prod
        #SetEnv APP_SECRET <app-secret-id>
        #SetEnv DATABASE_URL "mysql://db_user:db_pass@host:3306/db_name"
    </VirtualHost>

Dans le paramètre DocumentRoot et les balise Directory, il faut mettre le chemin et le nom de l'application lorsqu'on va le créer avec symfony

explication du chemin `/var/www/api/public`

`/var/www/` car c'est ce qu'on a mis à la fin du fichier php/Dockerfile `WORKDIR /var/www/`

`api` car c'est la nom que j'ai donné à mon application lorsque je l'ai créer avec symfony

`public` dossier existant dans une application symfony

Si on fait la commande ci-dessous et qu'on ce rend a cette addresse `127.0.0.1:8741`, le serveur va bien fonctionné et va nous répondre qu'il n'a rien trouvé car on a pas créer de projet symfony pour l'instant

    > docker-compose up

A ce stade  le fichier `docker-compose.yml` devrait être comme ça :

    version: "3.8"

    services:
        db:
            image: mysql
            container_name: wallky_mysql
            restart: always
            volumes:
                - db-data:/var/lib/mysql
            environment:
                MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
            networks:
                - dev
        phpmyadmin:
            image: phpmyadmin
            container_name: wallky_phpmyadmin
            restart: always
            depends_on:
                - db
            ports:
                - 8080:80
            environment:
                PMA_HOST: db
            networks:
                - dev
        www:
            build: php
            container_name: wallky_www
            ports:
                - "8741:80"
            volumes:
                - ./php/vhosts:/etc/apache2/sites-enabled
                - ./:/var/www
            user: '1000:1000' 
            restart: always
            networks:
                - dev

    networks:
        dev:
    volumes:
        db-data:

## Céer un projet Symfony via Docker

    > docker exec <nom_du_container_qui_est_dans_service_www> composer create-project symfony/skeleton <my_project_name>

    > docker exec wallky_www composer create-project symfony/skeleton api

    > docker exec wallky_www composer create-project symfony/skeleton:"^4.4" api

Pour les OS linux, il faudra rajouter la commande ci-dessous pour avoir tous les droit

    > sudo chown -R $USER ./

Maintenant on peut voir qu'a cette addresse `127.0.0.1:8741`, symfony est présent

Entrer dans la cli de git bash du projet, 

    > docker exec -it <nom_du_container_du_projet> bash

    > docker exec -it wallky_www bash

Puis cd `api`, afin de pouvoir executer des commandes symfony (php bin/console), pour travailler sur Symfony

Bravo !!!