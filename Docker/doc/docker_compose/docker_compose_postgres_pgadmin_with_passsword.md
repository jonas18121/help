# Créer docker-compose pour PostgreSql/PgAdmin avec mot de passe

### projet/app/.env

```bash
# In all environments, the following files are loaded if they exist,
# the latter taking precedence over the former:
#
#  * .env                contains default values for the environment variables needed by the app
#  * .env.local          uncommitted file with local overrides
#  * .env.$APP_ENV       committed environment-specific defaults
#  * .env.$APP_ENV.local uncommitted environment-specific overrides
#
# Real environment variables win over .env files.
#
# DO NOT DEFINE PRODUCTION SECRETS IN THIS FILE NOR IN ANY OTHER COMMITTED FILES.
# https://symfony.com/doc/current/configuration/secrets.html
#
# Run "composer dump-env prod" to compile .env files for production use (requires symfony/flex >=1.2).
# https://symfony.com/doc/current/best_practices.html#use-environment-variables-for-infrastructure-configuration

###> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=6aeb1db233ec852fc29ded0639cb73da
###< symfony/framework-bundle ###

###> doctrine/doctrine-bundle ###
# Format described at https://www.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/configuration.html#connecting-using-a-url
# IMPORTANT: You MUST configure your server version, either here or in config/packages/doctrine.yaml
#
# DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
# DATABASE_URL="mysql://user:user@name_container_mysql:3306/name_database?serverVersion=8.0.32&charset=utf8mb4"
# DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3306/app?serverVersion=10.11.2-MariaDB&charset=utf8mb4"
# DATABASE_URL="postgresql://app:!ChangeMe!@127.0.0.1:5432/app?serverVersion=16&charset=utf8"
DATABASE_URL="postgresql://user:user@name_container_postgres:5432/name_database?serverVersion=16&charset=utf8"
###< doctrine/doctrine-bundle ###

###> symfony/messenger ###
# Choose one of the transports below
# MESSENGER_TRANSPORT_DSN=amqp://guest:guest@localhost:5672/%2f/messages
# MESSENGER_TRANSPORT_DSN=redis://localhost:6379/messages
MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0
###< symfony/messenger ###

###> symfony/mailer ###
MAILER_DSN=smtp://maildev:1025
# https://github.com/Guichard-Gael/Tuto_mail_Symfony
# https://symfony.com/doc/current/mailer.html
# MAILER_DSN=contact@demo.fr:@smtp-relay.com:587?encryption:tls
###< symfony/mailer ###
```

### projet/.env

```bash
## APP ##

### Only value to change by develop normally ###
APP_NAME=name_project
# DOMAIN=${APP_NAME}.fr
DOMAIN='http://127.0.0.1:8971'

### USER ### 
# LOCAL_USER=1000:1000

### GITLAB ### 
# GITLAB_TOKEN=xxxxxxx

### DOCKER ###

# Docker Host IP
# DOCKER_HOST_IP=10.0.75.1

### DRIVERS ###

# All volumes driver
# VOLUMES_DRIVER=local

# All Networks driver
#NETWORKS_DRIVER=bridge

### SERVICES ###

### Postgres ####
DB_DATABASE=name_database
DB_USER=user
DB_PASSWORD=user
```

### docker-compose.yaml

```yaml
version: "3.8"

services:

    # PostgreSQL
    db:
        image: postgres:12.3-alpine
        container_name: graf_symfony_7_postgres
        restart: always
        environment:
            POSTGRES_DB: ${DB_DATABASE}
            POSTGRES_USER: ${DB_USER}
            POSTGRES_PASSWORD: ${DB_PASSWORD}
        ports:
            - "5432:5432"
        volumes:
            - postgres:/var/lib/postgresql/data 
        networks:
            - dev

    # PgAdmin
    pgadmin:
        image: dpage/pgadmin4:4.23
        container_name: graf_symfony_7_pgadmin
        restart: always
        depends_on:
            - db
        environment:
            PGADMIN_DEFAULT_EMAIL: ${DB_USER}@admin.com
            PGADMIN_DEFAULT_PASSWORD: ${DB_PASSWORD}
            PGADMIN_PASSWORD: ${DB_PASSWORD}
            PGADMIN_CONFIG_SERVER_MODE: 'False'
            PGADMIN_LISTEN_PORT: 80
        volumes:
            - pgadmin:/var/lib/pgadmin
        ports:
            - 5050:80
        networks:
            - dev

    # APPLICATION (PHP : Symfony App)
    www_app:
        build: php
        container_name: name_container_www
        ports:
            - "8971:80"
        volumes:
            - ./php/vhosts:/etc/apache2/sites-enabled
            - ./:/var/www
        user: '1000:1000' 
        restart: always
        networks:
            - dev
        environment:
            MAILER_DSN: smtp://maildev:1025

    # NODE
    node_app:
        container_name: name_container_node
        build:
            context: .
            dockerfile: node/Dockerfile
        volumes:
            - './app:/var/www/app'
        user: '1000:1000' 
        restart: always
        networks:
            - dev

    # maildev
    maildev:
        container_name: name_container_maildev
        image: maildev/maildev
        restart: always
        environment:
            - TZ=Asia/Shanghai
            - MAILDEV_WEB_PORT=1080
            - MAILDEV_SMTP_PORT=1025
        ports:
            - "8081:1080"
            - "8025:1025"
        logging:
            driver: "json-file"
            options:
                max-size: "1m"
        networks:
            - dev

networks:
    dev:
volumes:
    postgres:
    pgadmin:
```

### php/Dockerfile

- Dans le Dockerfile pour PHP avec PostgreSQL, ajouter les extentions ci-dessous

```dockerfile
# Mettre à jour les paquets et installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libxslt1-dev \
    libmariadb-dev-compat \
    libmariadb-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo pdo_pgsql 
```

### CLI pour tester si postgres fonctionne correctement

```bash
# une fois le conteneur en marche : Accéder au conteneur de postgres
docker exec -it name_container_postgres bash

# Se connecter à postgres 
psql -U name_user -d name_database

# Voir la liste des bases de données
\l

# Quitter postgres
\q
```