# Création du fichier docker-compose.yml et installation de Symfony

Exemple de création du fichier docker-compose.yml

1) Créer manuellement le du fichier docker-compose.yml à la racine de votre projet

2) Pour savoir dans quel format doit-on écrire le docker-compose.yml, vérifiez la version de Docker disponible sur votre poste.

    > docker -v

ou 

    > docker --version

Ce site montre les différente version : https://docs.docker.com/compose/compose-file/compose-file-v3/

Dans `docker-compose.yml`

```yml
    version: "3.8"
    services:
```

##  Spécifier nos services dans `docker-compose.yml`

### REMARQUE : L'indentaion est importante

### Conteneur MySQL

Dans `docker-compose.yml`

```yml
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
```

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
```yml
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
```

 - `depends_on:` ça veut dire que le service `phpmyadmin` va attendre que le service `db` soit disponible avant de démarré, car il dépend de lui

 - `ports:` Le port sous lequel on veut affiché l'interface de notre service

 - `PMA_HOST:` On dit au service `phpmyadmin` que sa base de données sera `db:`

### Essaie

A ce stade  le fichier `docker-compose.yml` devrait être comme ça :

```yml
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
```

Si on fait la commande en CLI ci-dessous, on devrais pouvoir accéder à phpMyAdmin aux adresses suivante `127.0.0.1:8080` ou `localhost:8080`

    > docker-compose up

Ne pas oubliez de mettre le nom du conteneur mysql (wallky_mysql) dans la definition du `DATABASE_URL`

```make
DATABASE_URL="mysql://root:@wallky_mysql:3306/home_stock_gitlab?serverVersion=5.7"
```



### Conteneur Apache et Php

On va construire nous même notre image à l’aide d’un Dockerfile

1) On crée un dossier php à la racine du projet

2) On crée un fichier Dockerfile dans le dossier php

3) Dans le fichier Dockerfile, on va commencé partir d'une image déjà existant de php 7.4

    - FROM php:7.4-apache

4) on ajoute différent librairie (exemple git) et outils (exemple composer) 

Dans `php/Dockerfile`

```Dockerfile
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
```

Autre exemple :

```Dockerfile
FROM php:7.4-apache

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN apt-get update \
    && apt-get install -y --no-install-recommends locales apt-utils git libicu-dev g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev sudo;

RUN set -xe \
    && docker-php-ext-configure \
		intl \
    && docker-php-ext-install \
		intl \
		zip \
		pdo \
		pdo_mysql \
		gd \
		bcmath \
		xml

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen

# Composer
COPY --from=composer:2.5.4 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN mkdir -p /var/www/.composer && chown -R www-data:www-data /var/www/.composer && chmod 777 -R /var/www/.composer


RUN docker-php-ext-configure intl
RUN docker-php-ext-install pdo pdo_mysql gd opcache intl zip calendar dom mbstring zip gd xsl
RUN pecl install apcu && docker-php-ext-enable apcu

# COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

RUN usermod -u 1000 www-data

# Installation de Docker Compose
RUN apt-get install -y docker-compose

# Configuration de sudo pour permettre aux utilisateurs de l'utiliser sans mot de passe (optionnel, à des fins de démonstration uniquement)
RUN echo 'ALL ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

WORKDIR /var/www/app
```

5) On rajoute dans le fichier `docker-compose.yml` un service qu'on appellera `www`

dans `docker-compose.yml`
```yml
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
```

`build:` = Le répertoire dans lequel on va chercher notre Dockerfile, ici c'est la répertoire php

`./php/vhosts:/etc/apache2/sites-enabled` = Passer la configuration des virtual host, à l'intérieur du container

6) On crée le répertoire vhost dans le dossier php

7) Dans le dossier vhost, on crée un fichier vhost.conf

8) Dans le fichier vhost.conf, on va mettre coller la préconisation prévu par symfony pour les virtual host

site symfony : https://symfony.com/doc/current/setup/web_server_configuration.html

Dans `vhost.conf`
```bash
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
```

Dans le paramètre DocumentRoot et les balise Directory, il faut mettre le chemin et le nom de l'application lorsqu'on va le créer avec symfony

explication du chemin `/var/www/api/public`

`/var/www/` car c'est ce qu'on a mis à la fin du fichier php/Dockerfile `WORKDIR /var/www/`

`api` car c'est la nom que j'ai donné à mon application lorsque je l'ai créer avec symfony

`public` dossier existant dans une application symfony

Si on fait la commande ci-dessous et qu'on ce rend a cette addresse `127.0.0.1:8741`, le serveur va bien fonctionné et va nous répondre qu'il n'a rien trouvé car on a pas créer de projet symfony pour l'instant

    > docker-compose up

A ce stade  le fichier `docker-compose.yml` devrait être comme ça :
```yml
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
```

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

### Conteneur Node avec son dockerfile

Dans  docker-compose.yml
```yml
  # NODE
  node:
    container_name: ${APP_NAME}_node
    build:
      context: .
      dockerfile: docker/node/Dockerfile
    volumes:
      - './app:/var/www/app'
```

Dans `node/Dockerfile`
```Dockerfile
FROM node:19.0.0

RUN apt-get -qq update \
	&& apt-get install apt-utils --assume-yes

RUN apt-get install zip --assume-yes

RUN apt-get install curl --assume-yes

RUN apt-get install ruby-dev --assume-yes \
	&& apt-get install rubygems --assume-yes \
	&& gem update \
	&& gem install compass \
	&& gem install dpl

RUN npm -g install typings --silent

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

RUN apt-get install yarn --assume-yes

WORKDIR /var/www/app

CMD ["node"]
```

Ce Dockerfile décrit les étapes pour construire une image Docker qui servira probablement d'environnement de développement ou d'exécution pour une application Node.js. 

Voici une explication détaillée de chaque instruction :

1. `FROM node:19.0.0`: Cette ligne indique que l'image Docker sera basée sur l'image officielle de Node.js version 19.0.0. Cela signifie que votre conteneur sera construit à partir de cette base.

2. `RUN apt-get -qq update && apt-get install apt-utils --assume-yes`: Ces deux commandes sont utilisées pour mettre à jour les références des paquets du système d'exploitation (via apt-get update) et installer apt-utils. --assume-yes est utilisé pour répondre automatiquement "oui" à toutes les questions d'installation. L'installation d'apt-utils est généralement faite en premier pour éviter d'éventuels problèmes lors de l'installation d'autres paquets.

3. `RUN apt-get install zip --assume-yes`: Cette commande installe le paquet zip, qui est un utilitaire de compression de fichiers.

4. `RUN apt-get install curl --assume-yes`: Cette commande installe le paquet curl, un outil permettant d'effectuer des requêtes HTTP depuis la ligne de commande.

5. `RUN apt-get install ruby-dev --assume-yes`: Cette commande installe le paquet ruby-dev, qui contient les en-têtes de développement Ruby nécessaires pour compiler des gemmes (packages Ruby).

6. `&& apt-get install rubygems --assume-yes`: Cette commande installe le paquet rubygems, qui est le gestionnaire de packages Ruby.

7. `&& gem update`: Une fois RubyGems installé, cette commande met à jour RubyGems lui-même pour s'assurer qu'il est à jour.

8. `&& gem install compass`: Cette commande installe la gemme (package) Ruby appelée compass. compass est un framework CSS.

9. `&& gem install dpl`: Cette commande installe la gemme dpl, qui est un outil permettant le déploiement continu (Continuous Deployment).

10. `RUN npm -g install typings --silent`: Cette commande utilise npm pour installer globalement le package typings. L'option --silent est utilisée pour supprimer la sortie verbale, ce qui permet d'installer le package silencieusement.

11. `RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`: Cette commande télécharge et exécute un script d'installation de NVM (Node Version Manager) depuis GitHub. NVM est utilisé pour gérer différentes versions de Node.js sur votre système.

12. `RUN apt-get install yarn --assume-yes`: Cette commande installe le paquet yarn, qui est un gestionnaire de packages JavaScript alternatif à npm, très apprécié pour sa performance et sa facilité d'utilisation.

13. `WORKDIR /var/www/app`: Cette instruction définit le répertoire de travail par défaut dans le conteneur à /var/www/app. Cela signifie que toutes les commandes ultérieures seront exécutées à partir de ce répertoire.

14. `CMD ["node"]`: Enfin, cette instruction définit la commande par défaut à exécuter lorsque le conteneur est lancé. Dans ce cas, il s'agit de node, ce qui signifie que le conteneur exécutera Node.js en tant qu'application par défaut lorsqu'il sera démarré.

En résumé, ce Dockerfile configure un environnement de développement ou d'exécution Node.js avec plusieurs outils et dépendances utiles pour le développement web. Vous pouvez personnaliser ce Dockerfile en fonction des besoins spécifiques de votre application Node.js.