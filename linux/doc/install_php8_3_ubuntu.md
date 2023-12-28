# Comment installer PHP 8.3 sur Ubuntu 22.04


## Installation

Assurez-vous que votre serveur Ubuntu dispose des derniers paquets en exécutant la commande suivante:

```bash
sudo apt update
sudo apt upgrade
```
Cela mettra à jour l'index des paquets et mettra à jour les paquets installés vers la dernière version.


### Étape 1 — Ajoutez le dépôt de sources PHP

Nous allons ajouter le dépôt ppa:ondrej/php qui contient les derniers paquets de PHP aux sources PPA de notre système.

```bash
sudo dpkg -l | grep php | tee packages.txt

sudo add-apt-repository ppa:ondrej/php

# Press [ENTER] to continue or Ctrl-c to cancel adding it.
```

```bash
sudo apt-get update

# Confirmer l'installation et faites la mise à jour des paquets.
```

### Étape 2 — Installez PHP 8.3 et ses packages sur Ubuntu

```bash
sudo apt install php8.3 php8.3-cli php8.3-{bz2,curl,mbstring,intl}
```

### Étape 3 — Installez FPM OR Apache module

```bash
# Install FPM OR Apache module
sudo apt install php8.3-fpm
# OR
# sudo apt install libapache2-mod-php8.2

# On Apache: Enable PHP 8.3 FPM
sudo a2enconf php8.3-fpm
# When upgrading from an older PHP version:
sudo a2disconf php8.2-fpm
```

### Étape 4 — Vérifier si PHP 8.3 est bien installez sur Ubuntu

```bash
php -v

## retour

PHP 8.3.1 (cli) (built: Dec 21 2023 20:12:13) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.3.1, Copyright (c) Zend Technologies
    with Zend OPcache v8.3.1, Copyright (c), by Zend Technologies
```
    
### Étape 5 — Vous pouvez ensuite lister les modules PHP avec la commande:
```bash
php -m

## retour

[PHP Modules]
bz2
calendar
Core
ctype
curl
date
exif
FFI
fileinfo
filter
ftp
gettext
hash
iconv
intl
json
libxml
mbstring
openssl
pcntl
pcre
PDO
Phar
posix
random
readline
Reflection
session
shmop
sockets
sodium
SPL
standard
sysvmsg
sysvsem
sysvshm
tokenizer
Zend OPcache
zlib

[Zend Modules]
Zend OPcache
```
Puis
```bash
sudo apt update
```
### Étape 5 — Supprimez une anciene vresion de php

Ex : php8.2
```bash
sudo apt purge php8.2*
```