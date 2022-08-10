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