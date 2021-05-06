# FROM php:7.4-apache

# RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# RUN apt-get update && apt-get install -y --no-install-recommends locales apt-utils git libicu-dev g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev 

# RUN  echo "en_US.UTF-8 UTF-8" > /etc/locale.gen  \
#     &&  echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen \
#     &&  locale-gen 

# RUN curl -sSk https://getcomposer.org/installer | php -- --dissable-tls \
#     &&  mv composer.phar /usr/local/bin/composer

# RUN docker-php-ext-configure intl 
# RUN docker-php-ext-install pdo pdo_mysql opcache intl zip calendar dom mbstring gd xsl 
# RUN pecl install apcu && docker-php-ext-enable apcu

# WORKDIR /var/www/

FROM php:7.2-fpm

RUN docker-php-ext-install pdo_mysql

RUN pecl install apcu

RUN apt-get update && \
apt-get install -y \
zlib1g-dev \
gnupg2 \
sudo

RUN docker-php-ext-install zip
RUN docker-php-ext-enable apcu

COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

COPY --from=composer:1.6 /usr/bin/composer /usr/bin/composer
# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER 1
# Create composer cache directory
RUN mkdir -p /var/www/.composer && chown -R www-data /var/www/.composer

COPY ./app /var/www/app

WORKDIR /var/www/app
