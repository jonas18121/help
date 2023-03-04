# Comment installer PHP 7.4 sur Ubuntu 20.04 / Ubuntu 18.04 / Ubuntu 16.04


### Veuillez vous connecter en SSH (avec putty ou autre), et mettez à jour votre distribution :

```sh
sudo apt update
sudo apt upgrade
```

### Ajout du dépôt :
```sh
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

## Installation de PHP 7.4

### Installation de la dernière version de PHP 7.4 sur Ubuntu :
```sh
sudo apt update
sudo apt install php7.4
```

### Installation des modules pour PHP 7.4 :
```sh
sudo apt install php7.4-cli php7.4-common php7.4-curl php7.4-mbstring php7.4-mysql php7.4-xml
```

# Comment installer différentes versions de PHP (5.6, 7.0 et 7.1) dans Ubuntu


Dans cet article, nous expliquerons comment installer toutes les versions prises en charge de PHP dans Ubuntu et ses dérivés avec les extensions PHP les plus demandées pour les deux Apache et Nginx serveurs Web utilisant un Ondřej Surý PPA. Nous expliquerons également comment définir la version par défaut de PHP à utiliser sur le système Ubuntu.

Notez que PHP 7.x est la version stable prise en charge dans les référentiels de logiciels Ubuntu, vous pouvez le confirmer en exécutant le commande apt au dessous de.

### Afficher les informations de version de PHP

    > sudo apt show php
    
    ou
    
    > sudo apt show php -a

### Pour installer la version PHP par défaut à partir des référentiels de logiciels Ubuntu, utilisez la commande ci-dessous.

    > sudo apt install php

## Installez PHP (5.6, 7.x, 8.0) sur Ubuntu en utilisant PPA

### 1) Commencez par ajouter Ondřej Surý PPA pour installer différentes versions de PHP – PHP 5.6, PHP 7.x, et PHP 8.0 sur le système Ubuntu.

    > sudo apt install python-software-properties

    puis

    > sudo add-apt-repository ppa:ondrej/php

### 2) Ensuite, mettez à jour le système comme suit.

    > sudo apt-get update

### 3) Installez maintenant différentes versions prises en charge de PHP comme suit

#### Pour Apache Web Server

    > sudo apt install php7.0   [PHP 7.0]
    > sudo apt install php7.1   [PHP 7.1]
    > sudo apt install php5.6   [PHP 5.6]
    > sudo apt install php7.2   [PHP 7.2]
    > sudo apt install php7.3   [PHP 7.3]
    > sudo apt install php7.4   [PHP 7.4]
    > sudo apt install php8.0   [PHP 8.0]

#### Pour Nginx Web Server

    > sudo apt install php5.6-fpm   [PHP 5.6]
    > sudo apt install php7.0-fpm   [PHP 7.0]
    > sudo apt install php7.1-fpm   [PHP 7.1]
    > sudo apt install php7.2-fpm   [PHP 7.2]
    > sudo apt install php7.3-fpm   [PHP 7.3]
    > sudo apt install php7.4-fpm   [PHP 7.4]
    > sudo apt install php8.0-fpm   [PHP 8.0]

### 4) Pour installer des modules PHP, spécifiez simplement la version PHP et utilisez la fonctionnalité d’auto-complétion pour afficher tous les modules comme suit.

    press Tab key for auto-completion

    > sudo apt install php5.6 
    > sudo apt install php7.0 
    > sudo apt install php7.1
    > sudo apt install php7.2
    > sudo apt install php7.3 
    > sudo apt install php7.4
    > sudo apt install php8.0

### 5) Vous pouvez maintenant installer la plupart des modules PHP requis dans la liste.

    ------------ Install PHP Modules ------------
    > sudo apt install php5.6-cli php5.6-xml php5.6-mysql 
    > sudo apt install php7.0-cli php7.0-xml php7.0-mysql 
    > sudo apt install php7.1-cli php7.1-xml php7.1-mysql
    > sudo apt install php7.2-cli php7.2-xml php7.2-mysql 
    > sudo apt install php7.3-cli php7.3-xml php7.3-mysql 
    > sudo apt install php7.4-cli php7.4-xml php7.4-mysql  
    > sudo apt install php8.0-cli php8.0-xml php8.0-mysql

```sh
sudo apt install php8.1-cli php8.1-xml php8.1-mysql php8.1-sqlite

# ou

sudo apt install php8.1-cli php8.1-common php8.1-curl php8.1-mbstring php8.1-mysql php8.1-xml
```

```sh
sudo apt update && sudo apt upgrade && sudo apt install php-curl

sudo apt install php-mbstring 

# OU

sudo apt-get update && sudo apt-get upgrade && sudo apt-get install php-curl

sudo apt-get install php-mbstring 
```
### 6) Enfin, vérifiez votre version PHP par défaut utilisée sur votre système comme ceci.

    > php -v

### 7) Afficher les modules PHP actuellement disponibles
```sh
php -m
```

### Définir la version PHP par défaut dans Ubuntu

### 7) Vous pouvez définir la version PHP par défaut à utiliser sur le système avec le alternatives de mise à jour commande, après l’avoir définie, vérifiez la version PHP pour confirmer comme suit.

    ------------ Set Default PHP Version 5.6 ------------
    > sudo update-alternatives --set php /usr/bin/php5.6

    ------------ Set Default PHP Version 7.0 ------------
    > sudo update-alternatives --set php /usr/bin/php7.0

    ------------ Set Default PHP Version 7.1 ------------
    > sudo update-alternatives --set php /usr/bin/php7.1

    ------------ Set Default PHP Version 7.4 ------------
    > sudo update-alternatives --set php /usr/bin/php7.4

    ------------ Set Default PHP Version 8.0 ------------
    > sudo update-alternatives --set php /usr/bin/php8.0

#### Accéder à PHP.ini d'une version précise
```ps
cat /etc/php/7.4/cli/php.ini

sudo nano /etc/php/7.4/cli/php.ini
```
### 8) Pour définir la version PHP qui fonctionnera avec le Apache serveur Web, utilisez les commandes ci-dessous. Tout d’abord, désactivez la version actuelle avec le a2dismod puis activez celle que vous souhaitez avec la a2enmod commander.

    ----------- Disable PHP Version ----------- 
            > sudo a2dismod php5.6
            > sudo a2dismod php7.0
            > sudo a2dismod php7.1
            > sudo a2dismod php7.2
            > sudo a2dismod php7.3
            > sudo a2dismod php7.4
            > sudo a2dismod php8.0

    ----------- Enable PHP Version ----------- 
            > sudo a2enmod php5.6
            > sudo a2enmod php7.0
            > sudo a2enmod php7.1
            > sudo a2enmod php7.2
            > sudo a2enmod php7.3
            > sudo a2enmod php7.4
            > sudo a2enmod php8.0

    ----------- Restart Apache Server ----------- 
            > sudo systemctl restart apache2

### 9) Après être passé d’une version à une autre, vous pouvez retrouver votre fichier de configuration PHP, en exécutant la commande ci-dessous.

    ------------ For PHP 5.6 ------------
    > sudo update-alternatives --set php /usr/bin/php5.6
    > php -i | grep "Loaded Configuration File"

    ------------ For PHP 7.0 ------------
    > sudo update-alternatives --set php /usr/bin/php7.0
    > php -i | grep "Loaded Configuration File"

    ------------ For PHP 7.1 ------------
    > sudo update-alternatives --set php /usr/bin/php7.1
    > php -i | grep "Loaded Configuration File"

    ------------ For PHP 7.2 ------------
    > sudo update-alternatives --set php /usr/bin/php7.2
    > php -i | grep "Loaded Configuration File"

    ------------ For PHP 7.3 ------------
    > sudo update-alternatives --set php /usr/bin/php7.3
    > php -i | grep "Loaded Configuration File"

    ------------ For PHP 7.4 ------------
    > sudo update-alternatives --set php /usr/bin/php7.4
    > php -i | grep "Loaded Configuration File"

    ------------ For PHP 8.0 ------------
    > sudo update-alternatives --set php /usr/bin/php8.0
    > php -i | grep "Loaded Configuration File"


# Désinstaller PHP

### Supprimer php-common de tout les version PHP qui sont installer 

```ps
sudo apt update

sudo apt-get remove --purge php-common
```
**Exemple de retour**
```ps
Lecture des listes de paquets... Fait
Construction de l'arbre des dépendances       
Lecture des informations d'état... Fait
Les paquets suivants ont été installés automatiquement et ne sont plus nécessaires :
  apache2-bin libapr1 libaprutil1 libaprutil1-dbd-sqlite3 libaprutil1-ldap
  libc-client2007e libmcrypt4 libpcre16-3 libpcre2-16-0 libpcre2-32-0
  libpcre2-dev libpcre2-posix3 libpcre3-dev libpcre32-3 libpcrecpp0v5 libpq5
  libssl-dev libxmlrpc-epi0 libzip4 linux-hwe-5.4-headers-5.4.0-131
  linux-hwe-5.4-headers-5.4.0-132 linux-hwe-5.4-headers-5.4.0-135
  linux-hwe-5.4-headers-5.4.0-136 mlock pslib1 shtool
Veuillez utiliser « sudo apt autoremove » pour les supprimer.
Les paquets suivants seront ENLEVÉS :
  libapache2-mod-php* libapache2-mod-php5.6* libapache2-mod-php7.0*
  libapache2-mod-php7.4* libapache2-mod-php8.1* php* php-cli* php-common*
  php-curl* php-gd* php-gettext* php-imagick* php-intl* php-json*
  php-mbstring* php-mysql* php-pear* php-php-gettext* php-sqlite3* php-xml*
  php-zip* php5.6* php5.6-cli* php5.6-common* php5.6-json* php5.6-mbstring*
  php5.6-mysql* php5.6-opcache* php5.6-readline* php5.6-xml* php7.0*
  php7.0-cli* php7.0-common* php7.0-curl* php7.0-dev* php7.0-fpm* php7.0-gd*
  php7.0-json* php7.0-mbstring* php7.0-mcrypt* php7.0-mysql* php7.0-opcache*
  php7.0-ps* php7.0-readline* php7.0-xml* php7.0-xsl* php7.1-common*
  php7.1-mbstring* php7.1-mcrypt* php7.3-cli* php7.3-common* php7.3-json*
  php7.3-mbstring* php7.3-opcache* php7.3-readline* php7.4* php7.4-cli*
  php7.4-common* php7.4-curl* php7.4-fpm* php7.4-gd* php7.4-imagick*
  php7.4-imap* php7.4-intl* php7.4-json* php7.4-mbstring* php7.4-mysql*
  php7.4-opcache* php7.4-readline* php7.4-soap* php7.4-sqlite3* php7.4-xml*
  php7.4-xmlrpc* php7.4-zip* php8.0-cli* php8.0-common* php8.0-mbstring*
  php8.0-mysql* php8.0-opcache* php8.0-readline* php8.0-xml* php8.1*
  php8.1-cgi* php8.1-cli* php8.1-common* php8.1-curl* php8.1-dev* php8.1-fpm*
  php8.1-gd* php8.1-imagick* php8.1-intl* php8.1-mbstring* php8.1-mysql*
  php8.1-opcache* php8.1-pgsql* php8.1-readline* php8.1-sqlite3* php8.1-xml*
  php8.1-zip* php8.2-cgi* php8.2-cli* php8.2-common* php8.2-curl* php8.2-dev*
  php8.2-fpm* php8.2-intl* php8.2-mbstring* php8.2-mysql* php8.2-opcache*
  php8.2-pgsql* php8.2-readline* php8.2-sqlite3* php8.2-xml* php8.2-zip*
  pkg-php-tools*
0 mis à jour, 0 nouvellement installés, 115 à enlever et 30 non mis à jour.
Après cette opération, 193 Mo d'espace disque seront libérés.
Souhaitez-vous continuer ? [O/n]
```

```ps
sudo apt update

sudo apt autoremove 
```

### Vérifier si il reste d'autres fichiers à supprimer et les supprimer si on veut

**Vérifier si il reste d'autres fichiers à supprimer**
```sh
whereis php
```

**Retourne**
```sh
php: /usr/lib/php /etc/php /usr/share/php /opt/lampp/bin/php
```

**Supprimer chacun de ces dossiers/fichiers**
```sh
sudo rm -rf /usr/lib/php

sudo rm -rf /etc/php

sudo rm -rf /usr/share/php

sudo rm -rf /opt/lampp/bin/php
```

ext-curl

ext-mbstring

### Supprimer les modules en général
```ps
sudo apt update

sudo apt remove --purge php-common

sudo apt remove --purge php-cli 

sudo apt remove --purge php-xml 

sudo apt remove --purge php-mysql 

sudo apt remove --purge php-sqlite

sudo apt remove --purge php-imagick

sudo apt remove --purge php-fpm

sudo apt update

sudo apt autoremove 
```

```ps
sudo apt-get update

sudo apt-get remove --purge php-common

sudo apt-get remove --purge php-cli 

sudo apt-get remove --purge php-xml 

sudo apt-get remove --purge php-mysql 

sudo apt-get remove --purge php-sqlite

sudo apt-get remove --purge php-imagick

sudo apt-get remove --purge php-fpm

sudo apt-get update

sudo apt-get autoremove 
```

### Vérifier si il reste d'autres fichiers à supprimer et les supprimer si on veut

**Vérifier si il reste d'autres fichiers à supprimer**
```sh
whereis php
```

**Retourne**
```sh
php: /usr/lib/php /etc/php /usr/share/php /opt/lampp/bin/php
```

**Supprimer chacun de ces dossiers/fichiers**
```sh
sudo rm -rf /usr/lib/php

sudo rm -rf /etc/php

sudo rm -rf /usr/share/php

sudo rm -rf /opt/lampp/bin/php
```

### Supprimer les modules de chaque version exemple pour la version 7.4 :
```ps
sudo apt update

sudo apt remove --purge php7.4-common

sudo apt remove --purge php7.4-cli 

sudo apt remove --purge php7.4-xml 

sudo apt remove --purge php7.4-mysql 

sudo apt remove --purge php7.4-sqlite

sudo apt remove --purge php7.4-common

sudo apt remove --purge php7.4-imagick

sudo apt remove --purge php7.4-fpm

sudo apt update

sudo apt autoremove 
```

```ps
sudo apt-get update

sudo apt-get remove --purge php7.4-cli 

sudo apt-get remove --purge php7.4-xml 

sudo apt-get remove --purge php7.4-mysql 

sudo apt-get remove --purge php7.4-sqlite

sudo apt-get remove --purge php7.4-common

sudo apt-get remove --purge php7.4-imagick

sudo apt-get remove --purge php7.4-fpm

sudo apt-get update

sudo apt-get autoremove 
```

### Vérifier si il reste d'autres fichiers à supprimer et les supprimer si on veut

**Vérifier si il reste d'autres fichiers à supprimer**
```sh
whereis php
```

**Retourne**
```sh
php: /usr/lib/php /etc/php /usr/share/php /opt/lampp/bin/php
```

**Supprimer chacun de ces dossiers/fichiers**
```sh
sudo rm -rf /usr/lib/php

sudo rm -rf /etc/php

sudo rm -rf /usr/share/php

sudo rm -rf /opt/lampp/bin/php
```