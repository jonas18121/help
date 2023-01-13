

### Installer net-tools

Le package net-toolspeut ne pas être installé sur votre système par défaut, vous devez donc l'installer manuellement.

Le forfait comprend également utilisties supplémentaires comme une arp, ifconfig, netstat, rarp, nameifet route.

    > sudo apt-get install net-tools

### Mettre du code en commentaire

    > ctrl + shift + touche A

        <!--  -->
        /** */

    > ctrl + shift + touche /

        <!--  -->
        //
    
### Mettre des règles de droits dans des fichiers et dossiers

#### La première parcours tous les dossiers du projet et leur mets 0775 

    > sudo find . -type d -exec chmod 0775 {} \;

#### La deuxième parcours tous les fichiers du projet et leur mets 0664

    > sudo find . -type f -exec chmod 0664 {} \;

#### La troisième ajout de droit "exécutable" sur le fichier bin/console (car le 0664 a enlever le droit exécutable)
    
    > sudo  chmod +x bin/console

### Supprimer les fichiers temporaires des fichiers d'installation

site doc Ubuntu : https://doc.ubuntu-fr.org/nettoyer_ubuntu

Supprimez les paquets .deb pour gagner de la place, car après plusieurs installations les paquets téléchargés s'accumulent et utilisent beaucoup d'espace. Ces paquets d'installation sont sauvegardés dans le dossier /var/cache/apt/archives/

Précision: Les paquets téléchargés ne servent à rien si vous avez Internet. Il vous permettront uniquement de réinstaller des applications en mode hors ligne. Leur suppression n'engendre pas la suppression des applications déjà installées grâce à ces paquets.
Depuis un terminal en saisissant les commandes suivantes:

- Supprimer le cache des paquets périmés

    > sudo apt autoclean

- Supprimer tout le cache 

    > sudo apt clean

- Supprimer les paquets installés automatiquement comme dépendances et devenus inutiles

    > sudo apt autoremove

les fichiers dans .cache ou .thumbnails dans home/NOM/ peuvent prendre beaucoup de place
par exemple home/NOM/.cache/VMWARE/drag_and_drop (plusieurs Go)

le logiciel "Représentation graphique du disque" permet de trouver les éléments de grande taille
à vous de les supprimer (à bon escient) ensuite !




## Installer filezilla

> sudo apt-get install filezilla

## Installer ZIP

Site [malekal](https://www.malekal.com/utiliser-la-commande-zip-pour-compresser-des-fichiers-sur-linux/)

### Installer zip sur Ubuntu et Debian

    > sudo apt install zip

### Compresser un fichier Zip

Par exemple pour compresser les fichiers fichier1, fichier2, fichier3 dans l’archive zip nom_archive.zip :

    > zip nom_archive.zip fichier1 fichier2 fichier3

### Compresser un répertoire en récursif

    > zip -r zip_repertoire.zip repertoire

### Compresser un répertoire en récursif en excluant un ou des sous-répertoire(s)

Lorsque l’on zip toute une arborescence, soit un répertoire en récurif, on peut vouloir exclure des sous-répertoire.
Pour cela on utilise l’option -x avec la syntaxe suivante :

    > zip -r zip_repertoire.zip repertoire -x repertoire/sous-repertoire/*

Par exemple pour exclure le répertoire /tmp/superdossier :

    > zip -r zip_repertoire.zip /tmp/ -x tmp/superdossier/*

Bien entendu, il est aussi possible de spécifier plusieurs sous-répertoire à exclure comme ceci :

    > zip -r zip_repertoire.zip repertoire -x repertoire/sous-repertoire/* repertoire/sous-repertoire2/* repertoire/sous-repertoire3/*

## Netoyer ubuntu

### Supprimer le cache des paquets périmés :
```bash
sudo apt autoclean
```

### Supprimer tout le cache :
```bash
sudo apt clean
```

### Supprimer les paquets installés automatiquement comme dépendances et devenus inutiles :
```bash
sudo apt autoremove
```

## Intall Symfony Cli dans linux

Site [Symfony](https://symfony.com/download)

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | sudo -E bash
```

```bash
sudo apt install symfony-cli
```

### Le compte root

Le compte root existe sous Ubuntu, mais il est désactivé (pas de mot de passe).

La commande suivante permet quand même de se connecter quand même sur le compte root :

``bash
sudo su -
``

Mais on peut aller plus loin et donner un mot de passe au compte root avec la commande :

``bash
sudo passwd
``

Ensuite, la commande suivante devrait fonctionner directement :
``bash
su -
``

Cela ne suit évidemment pas les standards choisis par Canonical...



Bouger un dossier projet
``bash
mv aecale-preprod_2.edgco.fr /var/www/save/aecale-preprod_2.edgco.fr
``


Copier un dossier projet

```bash
cp -r aecale-preprod.edgco.fr save/aecale-save/aecale-preprod_2.edgco.fr
```


lier node à nodejs
``bash
sudo ln -s /home/ubuntu/.nvm/versions/node/v14.18.1/bin/node /usr/bin/nodejs
``

ln =
Cela se remplace lnpar un lien symbolique vers un shell (ou tout autre exécutable) qui doit être exécuté en tant que root, utile dans le cas où une sudorègle autorise uniquement l'exécution lnpar chemin. Attention, ceci est une action destructrice.


### Installer Adminer dans un projet sur un serveur

- Aller sur [Adminer](https://www.adminer.org/), 
- Click sur le bouton Download 
- Puis télécharger le fichier nommée [Adminer 4.8.1 for MySQL](https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1-mysql.php)(ou le télécharger ici directement)
- Renommer le fichier adminer-4.8.1-mysql.php en adminer.php
- Se connecter au serveur du projet en question
- Puis executer le commande ci-dessous (sinon on peut mettre le fichier adminer.php dans projet-preprod.fr/app/public via FileZila)
```ps
scp -P 22 ~/Desktop/adminer.php name_id@141.95.278.81:/var/www/projet-preprod.fr/app/public
```
 `~/Desktop/adminer.php` représente l'endroit ou le fichier adminer.php a été télécharger dans ma machine

`ubuntu@141.94.222.87` représente l'identifiant et l'ip sur serveur

`/var/www/aecale-preprod.edgco.fr/app/public` représente l'endroit on veut installer le fichier adminer.php dans le projet sur serveur

- Pour accéder a adminer on peut se rendre sur cette exemple d'url `https://projet-preprod.fr/adminer.php`