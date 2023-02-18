# Installer/Désintaller MySQL 5.7 sur Debian 11/Debian 10

- [computingforgeeks](https://computingforgeeks.com/how-to-install-mysql-on-debian-linux-system/?utm_content=cmp-true)

Dans cet article, nous allons voir comment installer MySQL 5.7 sur Debian 11 et Debian 10. <br> 
MySQL est l'une des bases de données relationnelles les plus utilisées. <br>
Nous allons installer l'édition communautaire qui est un logiciel gratuit à installer géré sous licence publique générale.


# Installer MySQL 5.7 sur Debian 11/Debian 10
## Étape 1 : Ajouter un référentiel MySQL sur Debian 11 / Debian 10

1. Téléchargeons et installons le package de configuration du référentiel mysql sur Debian 11 et Debian 10. Exécutez la commande ci-dessous : 
```ps
wget https://dev.mysql.com/get/mysql-apt-config_0.8.18-1_all.deb
```

2. Une fois téléchargé, nous devons installer le package de référentiel.
```ps
sudo dpkg -i mysql-apt-config_0.8.18-1_all.deb
```

3. Notez que le référentiel MySQL 5.7 n'est pas encore disponible pour Debian 11 (Bullseye). 

Dans ce cas, nous allons sélectionner `Debian 10 Buster (debian  buster)` pour Debian 11 et Debian 10, puis appuyer sur la touche entrer.

Voir l'image `/debian_buster.png`

4. Assurez-vous que mysql-8.0 est sélectionné, puis appuyer sur la touche entrer.

Voir l'image `/mysql_server.png`

5. Sélectionnez ensuite mysql-5.7 comme indiqué, puis appuyer sur la touche entrer.

Voir l'image `/mysql_5_7.png`

6. Ensuite, utilisez la touche fléchée vers le bas pour sélectionner OK , puis cliquez sur OK et le package sera installé

Voir l'image `/mysql_ok.png`

## Étape 2 : Installer le serveur MySQL 5.7 sur Debian 11 / Debian 10

7. Puisque nous avons installé le référentiel pour MySQL 5.7, nous allons maintenant procéder à l'installation de MySQL 5.7 sur Debian 11 et Debian 10. <br> 
Première mise à jour de l'index du référentiel.

```ps
sudo apt update
```

8. Importer les clés GPG manquantes sur Debian 11

Si vous rencontrez des signatures qui n'ont pas pu être vérifiées, des erreurs similaires à celles ci-dessous :

`The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 467B942D3A79BD29`

Importez ensuite la ou les clés GPG manquantes avec la commande ci-dessous :
```ps
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
```

9. Relancez la commande apt update pour vérifier si cela fonctionne :
```ps
sudo apt update
```

10. Installer le package serveur MySQL 5.7 sur Debian 11 / Debian 10
```ps
sudo apt install -y mysql-community-server
```

11. Définissez votre mot de passe root préféré lorsque vous y êtes invité

Voir l'image `/password.png`

**Exemple de résultat d'installation réussie :**
```ps
Unpacking libnuma1:amd64 (2.0.12-1+b1) ...
Selecting previously unselected package mysql-community-client.
Preparing to unpack .../mysql-community-client_5.7.37-1debian10_amd64.deb ...
Unpacking mysql-community-client (5.7.37-1debian10) ...
Selecting previously unselected package mysql-client.
Preparing to unpack .../mysql-client_5.7.37-1debian10_amd64.deb ...
Unpacking mysql-client (5.7.37-1debian10) ...
Selecting previously unselected package libmecab2:amd64.
Preparing to unpack .../libmecab2_0.996-14+b4_amd64.deb ...
Unpacking libmecab2:amd64 (0.996-14+b4) ...
Selecting previously unselected package mysql-community-server.
Preparing to unpack .../mysql-community-server_5.7.37-1debian10_amd64.deb ...
Unpacking mysql-community-server (5.7.37-1debian10) ...
Setting up libmecab2:amd64 (0.996-14+b4) ...
Setting up libnuma1:amd64 (2.0.12-1+b1) ...
Setting up mysql-community-client (5.7.37-1debian10) ...
Setting up mysql-client (5.7.37-1debian10) ...
Setting up mysql-community-server (5.7.37-1debian10) ...
update-alternatives: using /etc/mysql/mysql.cnf to provide /etc/mysql/my.cnf (my.cnf) in auto mode
Created symlink /etc/systemd/system/multi-user.target.wants/mysql.service → /lib/systemd/system/mysql.service
```

## Étape 3 : Démarrer le service MySQL

12. Une fois installé, le service MySQL n'est pas démarré par défaut. Démarrez-le et activez-le également pour qu'il démarre automatiquement chaque fois que le serveur est redémarré.
```ps
sudo systemctl restart mysql
sudo systemctl enable mysql
```

13. Confirmez le statut comme ci-dessous :
```ps
systemctl status mysql
```

**Exemple de résultat d'installation réussie :**
```ps
● mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset:>
     Active: active (running) since Thu 2022-01-06 13:04:38 EAT; 10s ago
   Main PID: 3666 (mysqld)
      Tasks: 27 (limit: 2322)
     Memory: 174.6M
        CPU: 250ms
     CGroup: /system.slice/mysql.service
```

## Étape 4 : Sécurisez MySQL 5.7 sur Debian 11 / Debian 10

14. Sécurisez votre installation de base de données MySQL. <br> 
Comme nous avions déjà défini le mot de passe root, <br> 
vous serez invité à le saisir pour continuer et il vous sera également demandé si vous souhaitez le modifier.<br> 
Répondez en conséquence comme vous le souhaitez.

```ps
sudo mysql_secure_installation
```

**Exemple de résultat réussie :**
```ps

Securing the MySQL server deployment.

Enter password for user root: 
The 'validate_password' plugin is installed on the server.
The subsequent steps will run with the existing configuration
of the plugin.
Using existing password for root.

Estimated strength of the password: 25 
Change the password for root ? ((Press y|Y for Yes, any other key for No) : n

 ... skipping.
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : Y
Success.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : Y
Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) : Y
 - Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
Success.

All done!
```

## Étape 5 : Connectez-vous au serveur MySQL à l'aide du client mysql

15. À ce stade, nous avons installé avec succès MySQL 5.7 sur Debian. <br> 
Nous pouvons nous y connecter comme ci-dessous en utilisant le mot de passe root défini précédemment.

```ps
mysql -u root -p
```
**Exemple de résultat d'installation réussie :**
```ps
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 6
Server version: 5.7.36 MySQL Community Server (GPL)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

16. Créons une base de données de test
```ps
mysql> CREATE DATABASE testdb;
Query OK, 1 row affected (0.00 sec)

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| testdb             |
+--------------------+
5 rows in set (0.01 sec)

mysql>
```

17. Vous pouvez confirmer la version installée de MySQL comme indiqué ci-dessous :
```ps
mysql> SHOW VARIABLES LIKE "%version%";
+-------------------------+------------------------------+
| Variable_name           | Value                        |
+-------------------------+------------------------------+
| innodb_version          | 5.7.36                       |
| protocol_version        | 10                           |
| slave_type_conversions  |                              |
| tls_version             | TLSv1,TLSv1.1,TLSv1.2        |
| version                 | 5.7.36                       |
| version_comment         | MySQL Community Server (GPL) |
| version_compile_machine | x86_64                       |
| version_compile_os      | Linux                        |
+-------------------------+------------------------------+
8 rows in set (0.01 sec)
```

## (Faclutatif) Étape 6 : Autoriser les connexions à distance à MySQL

18. Si vous souhaitez accéder à distance à la base de données MySQL, vous pouvez autoriser les commandes ci-dessous

Voir fichier help/Serveur/doc/installer_ufw.md pour installer ufw

```ps
# open MySQL port 3306 on the firewall
sudo ufw allow mysql

# allow specific addresses to connect to mysql
sudo ufw allow from 192.168.100.222 to any port 3306
```

C'est tout pour l'installation de MySQL 5.7 sur Debian 11 et Debian 10.


# Désintaller MySQL 5.7 sur Debian 11/Debian 10

## Étape 1 : Arrêter le service MySQL

1. Vérifier si MYSQL est activer
```ps
sudo systemctl status mysql
```

2. Arrêter le service MySQL sur votre système, pui revérifier si MYSQL est activer
```ps
sudo systemctl stop mysql

sudo systemctl status mysql
```

## Étape 2 : désinstaller les packages MySQL

3. Désinstallez tous les packages MySQL installés sur votre serveur. <br> 
Utilisez l'une des commandes suivantes selon votre distribution Linux. <br>
Les noms des packages peuvent varier en fonction du système d'exploitation et des types d'installation.

    - Sur les systèmes basés sur Debain

```ps
sudo apt-get purge mysql*

sudo apt remove mysql-server mysql-client

sudo apt autoremove 

sudo apt autoclean 

sudo apt-get remove dbconfig-mysql

sudo apt-get dist-upgrade
```

    - Ou sur les systèmes basés sur RHEL

```ps
sudo dnf remove mysql-server mysql-client 
```

4. voir les packages mysql qui ne sont pas supprimer
```ps
dpkg -l | grep -i mysql 
```

**Exemple de retour**
```ps
rc  mysql-apt-config               0.8.18-1                                           all          Auto configuration for MySQL APT Repo.
rc  mysql-common                   5.8+1.0.7                                          all          MySQL database common files, e.g. /etc/mysql/my.cnf
rc  mysql-community-client         5.7.41-1debian10                                   amd64        MySQL Client
rc  mysql-community-server         5.7.41-1debian10                                   amd64        MySQL Server
ii  php8.1-mysql                   8.1.16+repack-1+0~20230214.36+debian11~1.gbpb38498 amd64        MySQL module for PHP
```

5. Ensuite, vous verrez les packages mysql et les supprimerez un par un sauf php8.1-mysql (si vous voulez le garder)
```ps
sudo apt purge [package_name]

ou

sudo dpkg purge [package_name]
```

**Exemple**
```ps
sudo apt purge mysql-apt-config

sudo apt purge mysql-common

sudo apt purge mysql-community-client

sudo apt purge mysql-community-server

sudo apt autoremove 

sudo apt autoclean 
```

Cela supprime les packages MySQL et leurs dépendances de votre système.<br>
Les commandes autoremove et autoclean suppriment les packages inutiles et nettoient le cache des packages.

## Étape 3 : Supprimer les fichiers de configuration et de données MySQL

4. Localiser les endroit ou sont placer les différents fichiers de mysql
```ps
whereis mysql
```
```ps
# Retourne
ufw: /etc/mysql /usr/share/mysql
```

5. Supprimer le ou les dossiers/fichiers
```ps
sudo rm -rf /etc/mysql

sudo rm -rf /usr/share/mysql
```

6. Vous pouvez effectuer les 4 tests suivants pour confirmer que mysql a été supprimé :

```ps
Devrait renvoyer mysql:
whereis mysql

# Devrait renvoyer une ligne vide
which mysql

# Vérifiez si mysql est installé ou activé Devrait renvoyer comand not found
sudo systemctl status mysql
```

Cette commande suivante répertorie tous les packages installés sur votre système et grep pour le mot 'mysql' . <br>
Si aucun package MySQL n'est installé, vous avez réussi à supprimer MySQL de votre système.
```ps
dpkg -l | grep -i mysql 
```

7. Mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
```