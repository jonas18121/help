

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

### Voir des fichiers cacher (avec les droits) dans un serveur en plus des fichiers 

```ps
ls -lah
```

### vérifié que le service snapd est en cours d'exécution
https://forum.snapcraft.io/t/error-cannot-communicate-with-server/298/4

```ps
systemctl status snapd.service

et 

journalctl -u snapd.service
```

Si snapd.service est inactif, pour résoudre l'erreur, exécutez les commandes suivantes
```ps
systemctl start snapd.service
```

, puis essayez d'installer le package avec snap, dans mon cas, c'était .
```ps
sudo snap install libreoffice
```

Version de snap
```ps
snap version
```

liste de snap
```ps
snap list
```

snap refresh
```ps
sudo snap refresh core
```

### Comment savoir si son linux est en 32-bits ou 64-bits

**La commande uname**

Utiliser la commande suivante :

```ps
uname -m
```

Le résultat de cette commande vous indiquera si votre système est en 32 ou 64 bits. Cela peut vous afficher plusieurs choses :

- Si le résultat est i686 ou i386 alors votre système d’exploitation est en 32-bits.

- Si le résultat est x86_64 alors votre système d’exploitation est en 64-bits.

**La commande arch**

Vous pouvez aussi utilisez la commande arch :

```ps
arch
```

Cette commande donnera exactement le même résultat que la commande uname

### Passer en root

```ps
sudo -s
```

### Obtenir adresse IP

[site](https://blog.shevarezo.fr/post/2019/01/08/comment-obtenir-adresse-ip-linux-ligne-de-commande)

```ps
ip route get 1.2.3.4 | awk '{print $7}'
```

### Désinstaller la symfony-cli (linux)

Voir les droits
```ps
ls -al /usr/local/bin/symfony
```
si c'est là

supprimer

```ps
rm -rf /usr/local/bin/symfony
```

```ps
sudo ln -s ~/usr/bin/symfony /usr/local/bin/symfony 

sudo mv /usr/bin/symfony /usr/local/bin/symfony # bouger symfony.exe de /usr/bin/symfony à /usr/local/bin/symfony

sudo cp -r -u /usr/local/bin/symfony /usr/bin/symfony # copier symfony.exe de /usr/local/bin/symfony à /usr/bin/symfony
```

### Voir info sur l'OS
```ps
cat /etc/os-release 
```

### Utiliser la commande scp (Secure Copy Protocol) pour télécharger des fichiers depuis un serveur distant vers votre PC via une connexion SSH :
```bash
scp -P 22 name_user_of_server@ip_server:/chemin/du/fichier/local /chemin/de/destination/sur/votre/ordinateur
```

Explications :

- `name_user_of_server` est votre nom d'utilisateur sur le serveur distant.

- `ip_server` est l'adresse IP ou le nom de domaine du serveur distant.

- `/chemin/du/fichier/local` est le chemin du fichier sur le serveur distant que vous souhaitez télécharger.

- `/chemin/de/destination/sur/votre/ordinateur` est le chemin de destination sur votre PC où vous souhaitez enregistrer le fichier téléchargé.

Exemple :
```bash
scp john@example.com:/home/john/documents/document.txt /chemin/local/sur/votre/ordinateur
```

Cette commande téléchargera le fichier `document.txt` du répertoire `/home/john/documents/` sur le serveur distant `example.com` dans le répertoire local `/chemin/local/sur/votre/ordinateur`.

Assurez-vous d'avoir les autorisations nécessaires pour accéder au fichier sur le serveur distant et que votre connexion SSH est configurée correctement.

## Transformer un dossier en .tgz

### Pour compresser un dossier en un fichier .tgz (archive tar.gz) sous Linux, tu peux utiliser la commande suivante :

```bash
tar -czvf nom_archive.tgz nom_dossier/
```

Voici ce que chaque option signifie :

- **c :** crée une nouvelle archive.
- **z :** compresse avec gzip.
- **v :** affiche les fichiers qui sont ajoutés à l'archive (option "verbose").
- **f :** spécifie le nom de l'archive à créer (ici nom_archive.tgz).

```bash
tar -czvf mon_dossier.tgz mon_dossier/
```

Cela créera un fichier mon_dossier.tgz contenant le dossier mon_dossier et son contenu.