# MYSQL

## Installer MYSQL manuellement pour windows

L'avantage d'installer MYSQL manuellement est qu'on sait ce qu'on installe

1) Allez sur https://www.mysql.com/downloads/

2) Cliquez sur `MySQL Community (GPL) Downloads »` ça va vous amené sur ce chemin https://dev.mysql.com/downloads/

3) Cliquez sur `MySQL Community Server` ça va vous amené sur ce chemin https://dev.mysql.com/downloads/mysql/

4) `Select Operating System:` permet de choisir le système d'exploitation de notre machine (moi c'est windows)

5) pour windows on choisit `Windows (x86, 64-bit), ZIP Archive` et on clic sur le bouton `Download`

6) On décomprèsse le fichier ZIP qui a été télécharger et on le renomme `mysql`

7) On peut mettre le dossier `mysql` la ou on veut, moi je le met dans ce chemin C:\MyWampPerso

### Créer un fichier de configuration .ini

8) On va créer un fichier de configuration nommé `my.ini` dans le dossier `mysql`

Dans `my.ini`

- Le fichier `my.ini` va nous permettre d'indiquer les chemins
- [mysqld] : mysql driver qui est le serveur de mysql
- basedir : c'est le répertoire de base pour mysql
- datadir : c'est le répertoire pour les données, c'est ici qu'on aura ma base de données

Dans `my.ini`

    [mysqld]
    basedir=C:/MyWampPerso/mysql
    datadir=C:/MyWampPerso/mysql/data

### Générer le répertoire data par rapport a notre configuration

9) On ouvre un invite de commande (PowerShell ou autre) et on pointe vers le bin de mysql

    > cd C:\MyWampPerso\mysql\bin

10) on indique mysqld

    > mysqld

11) On initialise la création du dossier data en ce basant sur le fichier my.ini

    > .\mysqld.exe --defaults-file=C:\MyWampPerso\mysql\my.ini --initialize

ça va créer un dossier nommé data dans le dossier mysql

### Faire tourner le serveur de mysql

12) Faire tourner le serveur de mysql toujours avec le terminal qui pointe vers le bin de mysql

    > .\mysqld.exe --console

faudra ouvrir un nouveau de terminal

13) On ouvre un nouveau de terminal qui pointe vers le bin de mysql

14) Dans C:\MyWampPerso\mysql\data , il y a un fichier qui porte le même nom que notre ordinateur et qui a une extention .err

exemple : nom_ordi.err

On va ouvrir ce fichier dans VSCode afin de voir l'user par défaut avec son mot de passe :

    2021-08-30T13:21:29.275478Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: d)FdJjL-%3l61

On copier le mot de passe

15) Dans le terminale (PowerShell ou autre) on va accéder a mysql

    > .\mysql.exe -u root -p

puis on colle le mot de passe lorsque c'est demander, et la on sera connecter

le chemin ce transformera en prompt mysql>

#### La commande \c est comme clear

    > \c

### Remarque : il faut impérativement mettre un point virgule, à la fin d'une commande lorsqu'on est sur le prompt mysql>

#### commande pour afficher une base de données

    > show databases;

16) mysql veut qu'on change de mot de passe pour afficher une base de données,

On va le changer avec la commande suivante :

    > alter user 'root'@'localhost' identified by '';

Dans les quotes de `identified by ''`, on peut mettre le mot de passe que l'on veut, exemple : `identified by 'uizbcdouz148998eg'`

#### La commande exit pour fermer le terminale, il sert aussi a quitter le client lorsqu"on est sur le prompt mysql>

    > exit


#### Commande pour bien arreter le seveur de mysql

    > .\mysqladmin.exe -u root -p shutdown
