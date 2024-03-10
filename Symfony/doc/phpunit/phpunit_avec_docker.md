# Utilisation de PHPUnit dans Docker

#### Dans php/Dockerfile

- Pour l'installation de xdebug
    - Installation de l'extention amqp
    - Puis installation de xdebug selon la version de PHP utiliser

```Dockerfile
# php/Dockerfile

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

# Pour l'installation de xdebug
## Installation de l'extention amqp
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions amqp
## For PHP 7.4
RUN pecl install xdebug-3.1.6 
RUN docker-php-ext-enable apcu intl amqp xdebug
## For PHP 8
# RUN pecl install xdebug-3.2.0 
# RUN docker-php-ext-enable apcu intl amqp xdebug

# Configuration de sudo pour permettre aux utilisateurs de l'utiliser sans mot de passe (optionnel, à des fins de démonstration uniquement)
RUN echo 'ALL ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

WORKDIR /var/www/app
```

#### Dans phpunit.xml.dist

- Utilisation des balises filter et whitelist
- Puis utilisation des balises logging et log pour le gitlab ci
```xml
<!-- phpunit.xml.dist -->

<?xml version="1.0" encoding="UTF-8"?>

<!-- https://phpunit.readthedocs.io/en/latest/configuration.html -->
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         backupGlobals="false"
         colors="true"
         bootstrap="tests/bootstrap.php"
         convertDeprecationsToExceptions="false"
>
    <php>
        <ini name="display_errors" value="1" />
        <ini name="error_reporting" value="-1" />
        <server name="APP_ENV" value="test" force="true" />
        <server name="SHELL_VERBOSITY" value="-1" />
        <server name="SYMFONY_PHPUNIT_REMOVE" value="" />
        <server name="SYMFONY_PHPUNIT_VERSION" value="9.5" />
    </php>

    <testsuites>
        <testsuite name="Project Test Suite">
            <directory>tests</directory>
        </testsuite>
    </testsuites>

    <filter> 
        <whitelist processUncoveredFilesFromWhitelist="true"> 
            <directory suffix=".php">./src</directory> 
        </whitelist> 
    </filter >

    <!-- <coverage processUncoveredFiles="true">
        <include>
            <directory suffix=".php">src</directory>
        </include>
    </coverage> -->

    <logging>
        <log type="coverage-html" target="public/tests-report" charset="UTF-8" yui="true" highlight="true" lowUpperBound="50" highLowerBound="80"/>
        <!-- <log type="coverage-text" target="home/jonas/builds/glrt-1So/0/Jonas18121/homeStockGitlab/app/public/tests-report/test-coverage/phpunit-coverage.xml"/> -->
        <log type="coverage-text" target="public/tests-report/phpunit-coverage.xml"/>
        <!-- ... d'autres options de configuration ... -->
    </logging>

    <listeners>
        <listener class="Symfony\Bridge\PhpUnit\SymfonyTestsListener" />
    </listeners>

    <!-- Run `composer require symfony/panther` before enabling this extension -->
    <!--
    <extensions>
        <extension class="Symfony\Component\Panther\ServerExtension" />
    </extensions>
    -->
</phpunit>
```

#### Dans app/makefile

On a les commandes pour executer les tests Unit/Func et pour le coverage 
```makefile
# app/makefile

phpunit-test: ## Run unit tests (app)
# $(BIN_PHP) vendor/bin/simple-phpunit --testdox --testdox-html public/tests-report/test-testdox.html
# @echo -e '\nReport : \e]8;;$(URL_TEST)/tests-report/test-testdox.html\ahttps://app.$(DOMAIN)/tests-report/test-testdox.html\e]8;;\a'
# $(BIN_PHP) vendor/bin/simple-phpunit --testdox --testdox-html public/tests-report/test-testdox.html
	@echo -e '\nReport : \e]8;;YourNameDomain/tests-report/test-testdox.html\ahttps://YourNameDomain/tests-report/test-testdox.html\e]8;;\a'
	$(BIN_PHP) vendor/bin/simple-phpunit --testdox --testdox-html public/tests-report/test-testdox.html

phpunit-test-coverage: ## Run unit tests with coverage (app)
# @echo -e '\nReport : \e]8;;https://app.$(DOMAIN)/tests-report/test-coverage/index.html\ahttps://app.$(DOMAIN)/tests-report/test-coverage/index.html\e]8;;\a'
# $(BIN_PHP) vendor/bin/simple-phpunit --coverage-text --coverage-html public/tests-report/test-coverage
	@echo -e '\nReport : \e]8;;https://YourNameDomain/tests-report/test-coverage/index.html\ahttps://YourNameDomain/tests-report/test-coverage/index.html\e]8;;\a'
	XDEBUG_MODE=coverage $(BIN_PHP) vendor/bin/simple-phpunit --coverage-text --coverage-html public/tests-report/test-coverage
```

#### Voir dans le navigateur

**tests-report :** https://YourNameDomain/tests-report/test-testdox.html

**test-coverage :** https://YourNameDomain/tests-report/test-coverage/index.html