# Modifier le fichier my.cnf depuis un serveur distant et redemmader MYSQL

#### Trouver l'emplacement du fichier my.cnf peut varier selon la version de MySQL, il faut exécuter l'un de ces commandes depuis la racine du projet :

- ~/.my.cnf

Terminal connecter et qui pointe à la racine du projet distant
```bash
sudo nano ~/.my.cnf  # Ecrire dans le fichier

cat ~/.my.cnf # Voir/Lire le contenu du fichier
```
OU

- /etc/my.cnf

Terminal connecter et qui pointe à la racine du projet distant
```bash
sudo nano /etc/my.cnf  # Ecrire dans le fichier

cat /etc/my.cnf # Voir/Lire le contenu du fichier
```
OU

- /etc/mysql/my.cnf

Terminal connecter et qui pointe à la racine du projet distant
```bash
sudo nano /etc/mysql/my.cnf  # Ecrire dans le fichier

cat /etc/mysql/my.cnf # Voir/Lire le contenu du fichier
```

OU 

- /etc/mysql/mysql.conf.d/mysqld.cnf

Terminal connecter et qui pointe à la racine du projet distant
```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf  # Ecrire dans le fichier

cat /etc/mysql/mysql.conf.d/mysqld.cnf # Voir/Lire le contenu du fichier
```

#### Vous pouvez également déterminer où se trouve l'emplacement du fichier de configuration en exécutant `mysqld --help --verbose`. 

```bash
mysqld --help --verbose
```

Cette commande affichera quelque chose dans ce sens :

```bash
Default options are read from the following files in the given order:

/etc/my.cnf /usr/local/etc/my.cnf ~/.my.cnf
```

Dans le fichier de configuration `my.cnf`, vous voudrez trouver la section `[mysqld]` ou autre et modifier l'élément qui vous intéresse.

#### L'utilisation de cette méthode nécessiterait que vous redémarriez votre serveur MySQL en exécutant la commande : /etc/init.d/mysql restart.

```bash
/etc/init.d/mysql restart
```

Si cela ne fonctionne pas, essayez d'exécuter : sudo systemctl restart mysqld

```bash
sudo systemctl restart mysqld
```