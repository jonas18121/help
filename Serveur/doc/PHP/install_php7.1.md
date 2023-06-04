# Installer PHP 7.1 sur un serveur Debian 11

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