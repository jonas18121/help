# Comment installer PHP 7.4 sur Ubuntu 18.04


## Installation

Assurez-vous que votre serveur Ubuntu dispose des derniers paquets en exécutant la commande suivante:

    > $ sudo apt update
    > $ sudo apt upgrade

Cela mettra à jour l'index des paquets et mettra à jour les paquets installés vers la dernière version.


### Étape 1 — Ajoutez le dépôt de sources PHP

Nous allons ajouter le dépôt ppa:ondrej/php qui contient les derniers paquets de PHP aux sources PPA de notre système.

    > $ sudo add-apt-repository ppa:ondrej/php

    Press [ENTER] to continue or Ctrl-c to cancel adding it.

    > $ sudo apt-get update

    Confirmer l'installation et faites la mise à jour des paquets.


### Étape 2 — Installez PHP 7.4 sur Ubuntu

    > $ sudo apt -y install php7.4

    Une fois l'installation terminée, vous pouvez confirmer l'installation à l'aide de la commande suivante.

    > $ php -v

        PHP 7.4.15 (cli) (built: Feb  7 2021 12:21:51) ( NTS )
        Copyright (c) The PHP Group
        Zend Engine v3.4.0, Copyright (c) Zend Technologies
        with Zend OPcache v7.4.15, Copyright (c), by Zend Technologies
    
### Étape 3 — Installation des modules et extensions PHP

Maintenant, installez quelques extensions PHP couramment utilisées avec la commande suivante:

    > $ sudo apt install php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-dev php7.4-imap php7.4-mbstring php7.4-opcache php7.4-soap php7.4-zip php7.4-intl -y

Vous pouvez ensuite lister les modules PHP avec la commande:

    > $ php -m