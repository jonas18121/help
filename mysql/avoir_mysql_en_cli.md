## Avoir MYSQL en CLI avec windows

- Aller dans `Path` de `Varaibles d'environnement` et enter le chemin de Mysql qui mène jusqu'au dossier `/bin` de Mysql qui est dans votre ordi

- Ouvrez un terminal puis enter la commande ci dessous pour demarrer mysql

    > mysql -u root -p



## Sauvegarde MySql

Il y a différents types de sauvegarde mysql.
On peut sauvegarder toutes les bases de données, une seule base de données ou encore certaines tables d’une ou de plusieurs bases.

- Pour sauvegarder toutes les bases de données on utilise la commande suivante :

    > mysqldump --user=mon_user --password=mon_password --all-databases > fichier_destination.sql

- Pour sauvegarder une base de données précise :

    > mysqldump --user=mon_user --password=mon_password --databases nom_de_la_base > fichier_destination.sql

- Pour sauvegarder plusieurs bases de données :

    > mysqldump --user=mon_user --password=mon_password --databases nom_de_la_base_1 nom_de_la_base_2 > fichier_destination.sql

- Pour sauvegarder une table précise :

    > mysqldump --user=mon_user --password=mon_password --databases nom_de_la_base --tables nom_de_la_table > fichier_destination.sql

- Pour sauvegarder plusieurs tables :

    > mysqldump --user=mon_user --password=mon_password --databases nom_de_la_base --tables nom_de_la_table_1 nom_de_la_table_2 > fichier_destination.sql

Pour tous ces types de sauvegarde mysql les fichiers générés sont en .sql. Cela dit on peut mettre l’extension que l’on veut comme .txt par exemple. Ca n’a pas d’importance.
Les fichiers sont lisibles en clair et contiennent toutes les commandes SQL pour pouvoir faire une restauration mysql.

Cela dit les fichiers .sql sont volumineux. Pour gagner de la place, on va les compresser à la volée lors de la sauvegarde.

## Compresser la sauvegarde mysql

Pour compresser les données, nous allons utiliser gunzip après avoir invoqué mysqldump.

- Cela donnera des commandes du type :

    > mysqldump < commandes> | gzip > fichier_destination.sql.gz
    
- Exemple avec la commande de sauvegarde complète :

    > mysqldump --user=mon_user --password=mon_password --all-databases | gzip > fichier_destination.sql.gz

A noter qu’avec cette méthode, la commande de sauvegarde mysql produit un seul fichier compressé. le fichier source n’existe plus.

## Restauration MySql

Pour la restauration mysql on n’utilise plus la commande mysqldump. On utilise la commande mysql.
La commande mysql va aller lire un fichier puis le restaurer en fonction de son contenu et de ses instructions.

La restauration mysql peut se faire pour toutes les bases de données ou pour un base de données précise.

- Exemple sans distinction de base de données :

    > mysql --user=mon_user --password=mon_password < fichier_source.sql

- Autre exemple pour restaurer dans une base de données précise :

    > mysql --user=mon_user --password=mon_password nom_de_la_base < fichier_source.sql

Maintenant que tout est clair, on peut programmer une tâche CRON pour sauvegarder à intervalle régulier nos bases de données.

