# Install XAMPP dans Ubuntu : un serveur LAMP complet

Site : [Ubuntu](https://doc.ubuntu-fr.org/xampp)

Le paquet open source XAMPP est un serveur LAMP complet et pré-configuré. Il contient :

- un serveur HTTP Apache 2,
- une base de données MariaDB avec phpMyAdmin,
- SQLite
- PHP,
- Perl,
- et un serveur FTP : ProFTPD
- et de nombreuses bibliothèques

## 1. Installation

Tout XAMPP tient en un seul répertoire : /opt/lampp.

Son installation est donc d'une extrême simplicité (de même que sa désinstallation = supprimer le répertoire /opt/lampp).

Sur la page https://www.apachefriends.org/fr/index.html, choisissez la version 32 ou 64 bits selon votre système d'exploitation Linux.

Modifiez les autorisations du programme d'installation et lancez-le en mode super-utilisateur :

```bash
cd répertoire/de/téléchargement/
sudo chmod +x xampp-linux-*-installer.run
sudo ./xampp-linux-*-installer.run
```

Exemple : 

```bash
cd répertoire/de/téléchargement/
sudo chmod +x xampp-linux-x64-8.1.6-0-installer.run
sudo ./xampp-linux-x64-8.1.6-0-installer.run
```

Acceptez toutes les étapes en cliquant sur Next ; pour la dernière fenêtre, cliquez sur Finish → le panneau de contrôle de XAMPP démarre.

Ouvrez l'onglet Manage Servers et cliquez sur Start All pour démarrer les serveurs.

### Atuces

Pour que Xampp se lance au démarrage, lancez dans un terminal :

```bash
sudo ln -s /opt/lampp/lampp /etc/init.d/lampp
sudo update-rc.d lampp defaults
```
Au redémarrage, XAMPP sera démarré. Le répertoire htdocs est la racine du serveur.

## 2. Configuration

### 2.1 Aliases suggérés

Pour vous simplifier la vie, créez des aliases en éditant ou créant le fichier ~/.bash_aliases pour y écrire :

Dans ~/.bash_aliases

```bash
# Alias pour permettre sudo [un_alias]
alias sudo='sudo '
 
# Aliases pour Xampp
alias lampp='/opt/lampp/lampp'
alias ctlampp='/opt/lampp/manager-linux-x64.run'
 
# Aliases pour proftp
alias ftpasswd='/opt/lampp/bin/ftpasswd'
```

On obtient les raccourcis suivants :

| Description	| Raccourci	| Effet |

| lampp |	sudo lampp … |	→ sudo /opt/lampp/lampp … |

| panneau de contrôle |	sudo ctlampp |	→ sudo /opt/lampp/manager-linux-x64.run |

| gérer les utilisateurs de proftpd |	sudo ftpasswd … |	→ sudo /opt/lampp/bin/ftpasswd … |

L'alias sudo='sudo ' permet d'utiliser les autres aliases en sudo, comme avec

```bash
sudo lampp start
```

Activez les aliases par :

```bash
source ~/.bash_aliases
```

### 2.2 Sécurisation

Pour changer les mots de passe de MySQL, MySQL/phpMyAdmin et FTP, lancez :

```bash
sudo lampp security
```

qui donne le dialogue suivant pour créer des mots de passe :

```bash
XAMPP:  Quick security check...
XAMPP:  MySQL is accessable via network. 
XAMPP: Normaly that's not recommended. Do you want me to turn it off? [yes] 
XAMPP:  Turned off.
...
XAMPP:  The MySQL/phpMyAdmin user pma has no password set!!! 
XAMPP: Do you want to set a password? [yes] yes
XAMPP: Password: 
...
XAMPP:  MySQL has no root passwort set!!! 
XAMPP: Do you want to set a password? [yes] yes
XAMPP:  Write the password somewhere down to make sure you won't forget it!!! 
XAMPP: Password: 
...
XAMPP:  The FTP password for user 'daemon' is still set to 'xampp'. 
XAMPP: Do you want to change the password? [yes] yes
XAMPP: Password: 
...
XAMPP:  Done.
```

### 2.3 Créer un lanceur sous Gnome

Si l'installation n'a pas créé de lanceur, le mieux est d'utiliser [MenuLibre](https://doc.ubuntu-fr.org/menulibre) pour en ajouter un.

## 3. Utilisation

### 3.1. Commandes

Avec les aliases suggérés plus haut, voici les commandes :

- Démarrer le serveur :
```bash
sudo lampp start
```

Si cette erreur apparait `Warning: World-writable config file '/opt/lampp/etc/my.cnf' is ignored` executer les commandent suivante :

    sudo chown mysql:mysql /opt/lampp/etc/my.cnf

    sudo chmod 600 /opt/lampp/etc/my.cnf

ou

    sudo chown mysql:mysql /opt/lampp/etc/my.cnf
    
    sudo chmod 777 /opt/lampp/etc/my.cnf

- Redémarrer le serveur :
```bash
sudo lampp restart
```

- Sécuriser le serveur :
```bash
sudo lampp security
```

- Arrêter le serveur :
```bash
sudo lampp stop
```

- Liste des options possibles :
```bash
sudo lampp
```

- Lancer le panneau de contrôle :
```bash
sudo ctlampp
```

Bien sûr, vous pourrez toujours utiliser ces commandes avec /opt/lampp/lampp.

### 3.2. Essai

Depuis un PC du réseau, connectez-vous au PC sur lequel tourne le serveur, par exemple http://127.0.0.1 

### 3.3. Mettre en place un site

Pour mettre en place un site sur xampp, utilisez un client FTP (par exemple Client FTP : FileZilla) pour déposer le répertoire du site ou de son installateur sur la racine /opt/lampp/htdocs (utilisateur : daemon + mot de passe que vous avez défini à la sécurisation).

### 3.4. Remarques importantes
Rappelons que ce serveur tout-en-un n'a pas d'autre prétention que d'être un petit serveur local de travail.

Pour une mise en exploitation, mieux vaut se tourner vers un Serveur web - LAMP

Pour les curieux, dans XAMPP, les réglages fournis sont :

pour Apache (port 80) :
- serveur : localhost
- racine : /opt/lampp/htdocs
- user : daemon (avec les mots de passe donnés à la phase de sécurisation)
- Group : daemon

pour ProFTPd (port 21) :
- serveur : ProFTPD, de type standalone
- racine : /opt/lampp/htdocs
- user : daemon (avec les mots de passe donnés à la phase de sécurisation)
- Umask : 022

## 4. Désintallation

Pour supprimer cette application, il suffit de supprimer le répertoire /opt/lampp :

```bash
sudo rm -R /opt/lampp/
```

ainsi que l'éventuel raccourci sur le bureau.

## Pour accéder à phpMyAdmin, il faut ouvrir le navigateur de votre choix et taper l'url :

`http://127.0.0.1/phpmyadmin/`

Si cela affiche une page blanche, peut être que tout a été autoriser avec cette commande `sudo sudo chmod 755 -R opt`, donc executer la commande ci-dessous la racine du terminal

exemple :

ordinateur opt/lampp/phpmyadmin ou opt/lampp/htdocs

```bash
sudo sudo chmod 755 -R opt
```

## Pour accéder à un projet sous Symfony, il faut ouvrir le navigateur de votre choix et taper l'url :

`http://127.0.0.1:8000`