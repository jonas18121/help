

Site : (digitalocean)[https://www.digitalocean.com/community/tutorials/comment-installer-la-pile-linux-apache-mysql-php-lamp-sur-un-serveur-ubuntu-18-04-fr]

## Étape 1 — Installer Apache et mettre à jour le pare-feu.

Le serveur Apache est parmi les serveurs web les plus populaires au monde. Il est bien documenté et a été utilisé abondamment pour la majeure partie de l’histoire de l’internet, ce qui en fait un bon choix par défaut pour héberger un site internet.

Installer Apache à l’aide du gestionnaire de paquets d’Ubuntu, apt:

```bash
sudo apt update
sudo apt install apache2
```

Puisqu’il s’agit d’une commande sudo, ces opérations sont exécutées avec les privilèges root. On vous demandera votre mot de passe d’utilisateur régulier afin de connaître vos intentions.

Dès que vous aurez entré votre mot de passe, apt vous dira quels paquets il prévoit installer et combien d’espace il prendra sur votre disque dur. Entrez la touche Y et appuyer sur ENTER afin de continuer, et l’installation poursuivra.

### Ajuster votre pare-feu afin d’autoriser le trafic web.

Ensuite, en présumant que vous avez suivi les instructions de configuration initiale du serveur et autorisé le pare-feu UFW, assurez-vous que votre pare-feu autorise le trafic HTTP et HTTPS. Vous pouvez vérifier que UFW possède un profil d’application pour Apache de la manière suivante 

```bash
sudo ufw app list

---------SortieOutput-------------
Available applications:
  Apache
  Apache Full
  Apache Secure
  OpenSSH
```

Si vous regardez sur le profil Apache Full, il devrait y être indiqué qu’il permet le trafic aux ports 80 et 443 :

```bash
sudo ufw app info "Apache Full"

------------SortieOutput--------------
Profile: Apache Full
Title: Web Server (HTTP,HTTPS)
Description: Apache v2 is the next generation of the omnipresent Apache web
server.

Ports:
  80,443/tcp
```

Autoriser le trafic HTTP et HTTPS entrant pour ce profil :

```bash
sudo ufw allow in "Apache Full"
```

Vous pouvez immédiatement effectuer une vérification afin de valider que tout se soit déroulé comme prévu en visitant l’adresse IP de votre serveur public sur votre navigateur web (voir la note sous la rubrique suivante afin de voir quel est votre adresse IP, si vous ne disposez pas déjà de cette information) :

http://your_server_ip

Vous allez voir la page web par défaut du serveur Ubuntu 18.04 Apache qui s’affiche à titre d’information et à des fins d’essai. La page devrait ressembler à ceci :

## Étape 2 — Installer MySQL

Maintenant que votre serveur web est opérationnel, il est temps d’installer MySQL. MySQL est un système de gestion de base de données. Il sert essentiellement à organiser et donner l’accès aux bases de données au sein desquelles votre site pourra emmagasiner de l’information.

Encore une fois, utiliser apt pour obtenir et installer ce logiciel.

```bash
sudo apt install mysql-server
```

Cette commande affichera également une liste des paquets qui seront installés, de même que l’espace qu’ils occuperont sur votre disque dur. Entrez la touche Y pour continuer.

Lorsque l’installation est complétée, exécuter un script de sécurité simple qui est préinstallé avec MySQL et qui permettra de supprimer des défaillances dangereuses et puis de verrouiller l’accès à votre système de base de données. Démarrer le script interactif en exécutant la commande :

```bash
sudo mysql_secure_installation
```

On vous demandera si vous désirez configurer le VALIDATE PASSWORD PLUGIN.

Répondre Y pour oui, ou n’importe quelle autre commande pour continuer sans l’activer.

Si vous répondez “oui”, on vous demandera de choisir un niveau de validation de mot de passe. Gardez à l’esprit que si vous choisissez 2, pour le niveau le plus élevé, vous recevrez des messages d’erreur lorsque vous tenterez de définir un mot de passe qui ne contient pas de chiffre, de majuscule et de minuscule, de caractères spéciaux, ou qui s’inspire de mots communs du dictionnaire.

Indépendamment de votre décision de configurer ou non le VALIDATE PASSWORD PLUGIN, votre serveur vous demandera de choisir et de confirmer un mot de passe pour l’utilisateur root MySQL. Il s’agit d’un compte administratif au sein de MySQL qui possède des privilèges accrus. Voyez-le comme étant similaire au compte root pour le serveur lui-même (bien que celui que vous êtes en train de configurer est un compte spécifique au sein de MySQL). Assurez-vous que vous de détenir un mot de passe robuste, unique, et de ne pas laisser l’espace vide.

Si vous activez la validation du mot de passe, on vous indiquera la robustesse du mot de passe root que vous venez d’inscrire et votre serveur vous demandera si vous voulez le modifier. Si vous êtes satisfait de votre mot de passe, entrez N pour « non » au moment de faire le choix :


Pour le reste des questions, entrez la touche Y et appuyer sur le bouton ENTER au moment de faire le choix. Cela supprimera certains utilisateurs anonymes ainsi que la base de données d’essai, désactivera les identifications root à distance et chargera les nouvelles règles afin que MySQL applique automatiquement les changements que vous venez d’apporter.

Veuillez noter que pour les systèmes Ubuntu fonctionnant avec MySQL 5.7 (et les versions ultérieures), l’utilisateur root MySQL est configuré par défaut pour authentifier en utilisant le plugin auth_socket, plutôt qu’avec un mot de passe. Cela permet d’avoir une meilleure sécurité et ergonomie dans de nombreux cas, mais il peut également compliquer les choses lorsque vous devez autoriser l’ouverture d’un programme externe (ex : phpMyAdmin) afin d’accéder au serveur.

Si vous préférez utiliser un mot de passe lorsque vous vous connectez au MySQL en tant que root, vous aurez besoin de changer le mode d’authentification de auth_socket à mysql_native_password. Pour y parvenir, ouvrez le prompt MySQL à partir de votre terminal :

```bash
sudo mysql
```

## Étape 3 — Installer PHP

PHP est le composant de votre configuration qui sert de code de traitement pour afficher le contenu dynamique. Il peut exécuter des scripts, se connecter à vos bases de données MySQL afin d’obtenir de l’information et acheminer le contenu traité vers votre serveur web pour affichage.

Encore une fois, utiliser le système apt pour installer PHP. De plus, inclure des paquets d’assistance cette fois-ci afin de permettre au code PHP de s’exécuter sous le serveur Apache et communiquer avec votre base de données MySQL :

```bash
sudo apt install php libapache2-mod-php php-mysql
```

Cela devrait permettre d’installer PHP sans problème. Nous le mettrons à l’essai dans un moment.

Dans la plupart des cas, vous allez vouloir modifier la façon dont Apache dessert les fichiers lorsqu’un répertoire est demandé. Actuellement, si un utilisateur demande un répertoire du serveur, Apache recherchera d’abord pour un fichier nommé index.html. Nous voulons dire au serveur web de donner priorité aux fichiers PHP, ainsi il faut exiger à Apache de regarder pour un fichier index.php en premier.

Afin d’effectuer cela, entrez cette commande pour ouvrir le fichier dir.conf dans un éditeur de texte avec des privilèges root :

```bash
sudo nano /etc/apache2/mods-enabled/dir.conf
```

Cela va ressembler à cela :

/etc/apache2/mods-enabled/dir.conf

```bash
<IfModule mod_dir.c>
    DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
</IfModule>
```

Déplacer le fichier d’index PHP (surligner ci-dessous) à la première position après la spécification DirectoryIndex, de la manière suivante :

```bash
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```

Lorsque vous avez terminé, sauvegarder et fermer le fichier en appuyant sur CTRL+X. Confirmer la sauvegarde en entrant la touche Y et en appuyant sur ENTER afin de vérifier la localisation du fichier de sauvegarde.

Ensuite, redémarrer le serveur web Apache afin que vos modifications prennent effet. Cela s’effectuera en inscrivant ceci :

```bash
sudo systemctl restart apache2
```

Vous pouvez également vérifier le statut du service apache2 en utilisant la commande systemctl :

```bash
sudo systemctl status apache2

------------Sample SortieOutput--------------------------------------------
● apache2.service - LSB: Apache2 web server
   Loaded: loaded (/etc/init.d/apache2; bad; vendor preset: enabled)
  Drop-In: /lib/systemd/system/apache2.service.d
           └─apache2-systemd.conf
   Active: active (running) since Tue 2018-04-23 14:28:43 EDT; 45s ago
     Docs: man:systemd-sysv-generator(8)
  Process: 13581 ExecStop=/etc/init.d/apache2 stop (code=exited, status=0/SUCCESS)
  Process: 13605 ExecStart=/etc/init.d/apache2 start (code=exited, status=0/SUCCESS)
    Tasks: 6 (limit: 512)
   CGroup: /system.slice/apache2.service
           ├─13623 /usr/sbin/apache2 -k start
           ├─13626 /usr/sbin/apache2 -k start
           ├─13627 /usr/sbin/apache2 -k start
           ├─13628 /usr/sbin/apache2 -k start
           ├─13629 /usr/sbin/apache2 -k start
           └─13630 /usr/sbin/apache2 -k start
```

Afin d’améliorer le fonctionnement de PHP, vous avez l’option d’installer de modules supplémentaires. Pour voir les options disponibles de modules PHP et de bibliothèques, mener les résultats de apt search vers less, un récepteur qui vous laissera défiler à travers les résultats d’autres commandes :