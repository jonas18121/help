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

```ps
sudo apt install php8.1-cli php8.1-xml php8.1-mysql php8.1-sqlite
```
### 6) Enfin, vérifiez votre version PHP par défaut utilisée sur votre système comme ceci.

    > php -v

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