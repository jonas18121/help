# MYSQL

## Installer MYSQL manuellement

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

- Ce fichier va nous permettre d'indiquer les chemins
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