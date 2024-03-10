# Installer PHP 7.1 sur un serveur Debian 11 et désintaller tout les versions de PHP

## Pour installer PHP 7.1 sur un serveur Debian 11, vous pouvez suivre les étapes ci-dessous :

1. Mettez à jour les paquets disponibles sur votre serveur Debian 11 en exécutant la commande suivante :
```sh
sudo apt update
```

2. Installez le dépôt surdreparis de Debian, qui contient les versions antérieures de PHP, en exécutant les commandes suivantes :
```sh
sudo apt install apt-transport-https ca-certificates
```
```sh
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
```
```sh
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
```

3. Mettez à jour les paquets après avoir ajouté le dépôt :
```sh
sudo apt update
```

4. Installez PHP 7.1 en exécutant la commande suivante :
```sh
sudo apt install php7.1
```

5. Vous pouvez également installer les modules PHP nécessaires en ajoutant les noms des modules souhaités à la commande précédente. 

Par exemple, pour installer les modules les plus couramment utilisés, vous pouvez exécuter la commande suivante :

```sh
sudo apt install php7.1 php7.1-cli php7.1-common php7.1-curl php7.1-mbstring php7.1-mysql php7.1-gd php7.1-xml php7.1-zip
```

6. Vous pouvez ensuite lister les modules PHP avec la commande:
```sh
php -m
```

7. Une fois l'installation terminée, vous pouvez vérifier la version de PHP en exécutant la commande suivante :
```sh
php -v
```

Assurez-vous de configurer correctement votre serveur web (Apache ou Nginx) pour utiliser PHP 7.1. Vous devrez peut-être redémarrer le serveur web pour que les modifications prennent effet.

8. Puisque nous venons de modifier la configuration d'Apache, il faut redémarrer le service :
```ps
sudo systemctl restart apache2
```

Veuillez noter que PHP 7.1 n'est plus pris en charge et ne reçoit plus de mises à jour de sécurité. Il est recommandé d'utiliser une version plus récente de PHP pour garantir la sécurité de votre serveur.

## Pour désintaller tout les versions de PHP

1. La commande suivante supprimera toutes les versions de php7, que ce soit php 7.0 ou php 7.1 etc.

```bash
sudo apt-get purge php7.*
```

2. Nettoie les paquets deb obsolètes

```bash
sudo apt-get autoclean
```

3. Supprime du système les paquets orphelins qui ne sont plus nécessaires, mais ne les purge pas, utilisez l'option `--purge` avec la commande correspondante. 

```bash
sudo apt-get autoremove
```

4. Localiser les endroits ou sont placer les différents fichiers de php

```bash
whereis php
```

**Exemple de retour**

```bash
php: /usr/bin/php /usr/bin/php7.4 /usr/lib/php /etc/php /usr/share/php7.4-opcache /usr/share/php7.4-xml /usr/share/php7.4-curl /usr/share/php7.4-readline /usr/share/php /usr/share/php7.4-common /usr/share/php7.4-mbstring /usr/share/php7.4-mysql /usr/share/php7.4-json /opt/lampp/bin/php /usr/share/man/man1/php.1.gz
```


5. Supprimer chacun de ces dossiers/fichiers si necessaire

Ici on supprime tous ce qui est lié a php7.4

```bash
sudo rm -rf /usr/bin/php7.4

sudo rm -rf /usr/share/php7.4-opcache

sudo rm -rf /usr/share/php7.4-xml

sudo rm -rf /usr/share/php7.4-curl 

sudo rm -rf /usr/share/php7.4-readline

sudo rm -rf /usr/share/php7.4-common

sudo rm -rf /usr/share/php7.4-mbstring

sudo rm -rf /usr/share/php7.4-mysql

sudo rm -rf /usr/share/php7.4-json
```bash