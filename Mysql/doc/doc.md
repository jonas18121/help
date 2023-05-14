# Utilisation de MySQL en ligne de commande

Site :

- [Waytolearnx](https://waytolearnx.com/2019/09/liste-des-commandes-mysql.html)
- [buzut](https://buzut.net/maitrisez-mysql-en-cli/)

## MySQL possède une simple interface "ligne de commande"

- Les commandes SQL doivent être séparées par un " ; " (!!!)
- Les exemples suivants supposent que vous avez accès à une base de données

## Connexion à un serveur MySQL (depuis un terminal unix / telnet)

exemple :

```bash
    > mysql -h machine -u utilisateur -p [base_de_données]
```
    -h: machine hôte (ip)
    -u: utilisateur MySQL (pas Unix)
    -p: mot de passe MySQL (pas Unix)

### Si on est déjà connecter dans un serveur qui a notre projet et qui à aussi notre bdd mysql

```bash
    > mysql -u utilisateur -p [base_de_données]
```

###  Se connecter à phpmyadmin en local depuis un terminal sur un projet symfony qui est sous docker

```bash
docker exec -it contenaire_mysql mysql -u user_bdd -p
```
## Déconnexion à Mysql

```sql
    mysql> EXIT
```

////////////////////////// CLE ETRANGÈRE //////////////

## Désactiver la configuration par défaut de la vérification des clés étrangères

```sql
    mysql> SET FOREIGN_KEY_CHECKS = 0;
```
## Rétablisser la configuration par défaut de la vérification des clés étrangères

```sql
    mysql> SET FOREIGN_KEY_CHECKS = 1;
```
## Supprimer une FOREIGN KEY

```sql
    mysql> ALTER TABLE `my_table` DROP FOREIGN KEY `FK_id_off_foreign_key`;
```

////////////////////////// FIN CLE ETRANGÈRE //////////////

## Pour créez une base de données SQL.

```sql
    mysql> create database [databasename];
```

## Pour afficher toutes les bases de données sur le serveur SQL.

```sql
    mysql> show databases;
```

## Pour sélectionnez une base de données

```sql
    mysql> use [database];
```

## Pour voir toutes les tables dans une base de données.

```sql
    mysql> show tables;
```

## Pour afficher la structure d’une table:

```sql
    mysql> describe [table];
```

## Pour supprimer une base de données.

```sql
    mysql> drop database [databasename];
```

## Pour supprimer une table.

```sql
    mysql> drop table [tablename];
```

## Remettre l'auto-incrémentation d'une table à 0 

On exécute cette commande depuis l'onglet `SQL` de phpMyAdmin

```sql
    mysql> ALTER TABLE <nom_de_la_table> AUTO_INCREMENT=0
```

## Afficher toutes les données d’une table.

```sql
    mysql> SELECT * FROM [tablename];
```

## Renvoie les colonnes et les informations sur des colonnes relatives à une table.

```sql
    mysql> SHOW COLUMNS FROM  [tablename];
```

## Déterminez quelle base de données est utilisée:

```sql
    mysql> select database();
```

## Pour lister tous les index d’une table:

```sql
    mysql> show index from [table];
```

## Créer une nouvelle table avec des colonnes:

```sql
    mysql> CREATE TABLE [tablename] ([colonne1] VARCHAR(50), [colonne2] DATETIME);
```

## Pour ajouter une colonne:

```sql
    mysql> ALTER TABLE [tablename] ADD COLUMN [colonne3] VARCHAR(100) NULL DEFAULT NULL;
```

Exemple :

```sql
    mysql> ALTER TABLE user ADD COLUMN age TINYINT(2) NOT NULL DEFAULT NULL;
```

Si le nom de la colonne a le même nom qu'un mot réserver par SQL (ex: default), mettre des backticks

```sql
    mysql> ALTER TABLE user ADD COLUMN `default` INT(100) NOT NULL DEFAULT '0';
```

## Pour ajouter une colonne avec un ID unique par incrémentation automatique:

```sql
    mysql> ALTER TABLE [tablename] ADD COLUMN [colonne4] int NOT NULL AUTO_INCREMENT PRIMARY KEY;
```

## Insérer un enregistrement dans une table SQL:

```sql
    mysql> INSERT INTO [tablename] ([colonne1], [colonne2]) VALUES ('[valeur1]', '[valeur2]');
```

## Modifier une colonne (modifier la structure d'une table)

```sql
    mysql> ALTER TABLE [tablename] MODIFY [colonne4] int NOT NULL AUTO_INCREMENT PRIMARY KEY;
```

ou 

```sql
mysql> ALTER TABLE `tablename` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;
```

## Fonction MySQL pour afficher la date actuelle:

```sql
    mysql> NOW();
```

## Pour afficher le plan d’exécution d’une requête SQL:

```sql
    mysql> EXPLAIN SELECT * FROM [tablename];
```

## Pour sélectionner une parties d’un enregistrement:

```sql
    mysql> SELECT [colonne1], [colonne2] FROM [table];
```

## Pour compter le nombre d’enregistrement dans une table.

```sql
    mysql> SELECT COUNT([colonne]) FROM [table];
```

## Pour sélectionner des enregistrements spécifiques:

```sql
    mysql> SELECT * FROM [table] WHERE [colonne] = [valeur];
```

D’autre sélecteurs: <, >, !=; pour combiner plusieurs sélecteurs utiliser les opérateurs AND et OR. Exemple:

```sql
    mysql> SELECT * FROM users WHERE name = 'Alex' OR age > 30;
```

## Sélectionnez les enregistrements qui contiennent la valeur [val].

```sql
    mysql> SELECT * FROM [table] WHERE [colonne] LIKE '%[val]%';
```

Exemple: Sélectionnez tous les noms qui contiennent ‘al’

```sql
    mysql> SELECT * FROM users WHERE name LIKE '%al%';

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  101   |   ali     |   25   |
    |  102   |  Malis    |   15   |
    |  103   |  Mokali   |   35   |
    |  104   |  Manali   |   40   |
    +--------+-----------+--------+
```

## Sélectionnez les enregistrements qui commencent par la valeur [val].
```sql
    mysql> SELECT * FROM [table] WHERE [colonne] LIKE '[val]%';
```

Exemple: Sélectionnez tous les noms commençant par « Yo »

```sql
    mysql> SELECT * FROM users WHERE name LIKE 'Yo%';

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  115   |   Yohan   |   33   |
    |  130   |   Youssa  |   56   |
    |  109   |   Yonaka  |   15   |
    |  144   |   Yoyo    |   20   |
    +--------+-----------+--------+
```

## Sélectionnez les enregistrements commençant par ‘val1’ et se terminant par ‘val2’.

```sql
    mysql> SELECT * FROM [table] WHERE [colonne] LIKE '[val1_val2]';
```

Exemple: Sélectionnez toutes les descriptions commençant par « T » et se terminant par « T »

```sql
    mysql> SELECT * FROM product WHERE description LIKE 'T_T';

    +--------+---------------+
    |  id    |  description  |
    +--------+---------------+
    |  101   |      TiT      |
    |  102   |      ToT      |
    |  103   |      TaT      |
    |  104   |      TuT      |
    +--------+---------------+
```

## Sélectionner un intervalle de données.

```sql
    mysql> SELECT * FROM [table] WHERE [colonne] BETWEEN [valeur1] and [valeur2];

```
Exemple:

```sql
    mysql> SELECT * FROM users WHERE age BETWEEN 20 and 30;

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  115   |   Yohan   |   20   |
    |  130   |   Thomas  |   21   |
    |  109   |    Jean   |   25   |
    +--------+-----------+--------+
```
## Sélectionnez avec un ordre personnalisé et seulement une limite:

```sql
    mysql> SELECT * FROM [table] WHERE [colonne] ORDER BY [colonne] ASC LIMIT [valeur];
```
Ordre: DESC (Descendant) ↓, ASC (ascendant) ↑.

Exemple:
```sql
    mysql> SELECT * FROM users ORDER BY age ASC LIMIT 3;

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  115   |   Yohan   |   20   |
    |  130   |   Thomas  |   21   |
    |  109   |    Jean   |   25   |
    +--------+-----------+--------+
```

## Mettre à jour des enregistrements:

```sql
    mysql> UPDATE [table] SET [colonne] = '[new_val]' WHERE [colonne] = '[old_val]';
```

Exemple: 

```sql
    mysql> UPDATE users SET age = '30' WHERE age = '25';
```

## Supprimer des enregistrements:

```sql
    mysql> DELETE FROM [table] WHERE [colonne] = [valeur];
```

## Supprimer tous les enregistrements d’une table (sans supprimer la table elle-même)

```sql
    mysql> DELETE FROM [table];
```

## Supprimer tous les enregistrements d’une table:

```sql
    mysql> truncate table [table];
```

## Supprimer les colonnes d’une table:

```sql
    mysql> ALTER TABLE [table] DROP COLUMN [colonne];
```

## Supprimer une table:

```sql
    mysql> DROP TABLE [table];
```

## Supprimer une base de donnée:

```sql
    mysql> DROP DATABASE [database];
```
## Créer un alias pour renommer temporairement une colonne:

```sql
    mysql> SELECT [colonne] AS [col] FROM [table];
```

## Exporter un dump de base de données un terminale connecter à un serveur distant :

```sql
    > mysqldump -u [username] -p [database] > backup.sql
```

## Exporter un dump de base de données avec la date depuis un terminale connecter à un serveur distant :

```sql
    > mysqldump -u [username] -p [database] > backup-$(date +%Y-%m-%d).sql
```

## Exporter un dump de base de données avec la date depuis son terminal en local :
```sql
    > mysqldump -u [username] -h [hostname] -p [database] > /home/[user]/Téléchargements/backup-$(date +%Y-%m-%d).sql
```

Exemple : 
```sql
    > mysqldump -u nameOfUser -h 777.77.777.77 -p nameOfBdd > /home/jonas/Téléchargements/backup_prod-$(date +%Y-%m-%d).sql
```

## Importer un dump de base de données:

```sql
    > mysql -u [username] -p -h localhost [database] < backup.sql
```

## Trouvez l’adresse IP de l’hôte Mysql:

```sql
    mysql> SHOW VARIABLES WHERE Variable_name = 'hostname';
```

## Faire un SELECT sur plusieurs tables:

```sql
    mysql> SELECT [table1].[colonne], [table2].[colonne] FROM [table1], [table2];
```

## Lister tous les utilisateurs:

```sql
    mysql> SELECT User FROM mysql.user;
```

## Créer un nouvel utilisateur:


```sql
    mysql> CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

## Accorder un accès complet à l’utilisateur pour * tables:

```sql
    mysql> GRANT ALL PRIVILEGES ON database.* TO 'user'@'localhost';
```

# Fonctions d’agrégation

## Sélectionnez des enregistrements sans doublons:

```sql
    mysql> SELECT distinct nom, adresse FROM employe WHERE nom = "Alex";
```

## Calculer la somme des enregistrements:

```sql
    mysql> SELECT SUM([colonne]) FROM [table];
```

## Calculer la somme des enregistrements de [col] et grouper par [catégorie]:

```sql
    mysql> SELECT [column], SUM([col]) FROM [table] GROUP BY [catégorie];
```

## Récupérer la plus grande valeur dans une colonne.

```sql
    mysql> SELECT MAX([colonne]) FROM [table];
```

## Récupérer la plus petite valeur dans une colonne.

```sql
    mysql> SELECT MIN([colonne]) FROM [table];
```

## Récupérer la moyenne d’une colonne.

```sql
    mysql> SELECT AVG([colonne]) FROM [table];
```

## Récupérer la moyenne arrondie et grouper par [catégorie]:

```sql
    mysql> SELECT [colonne], ROUND(AVG([colonne]), 2) FROM [table] GROUP BY [catégorie];
```


<hr>

# Exporter une base de données MySQL avec mysqldump

Site :
- [Infomaniak](https://www.infomaniak.com/fr/support/faq/2128/mysql-exporter-une-base-de-donnees#:~:text=Exporter%20une%20base%20de%20donn%C3%A9es%20MySQL%20via%20SSH&text=Se%20connecter%20au%20serveur%20de,%2D%2Dno%2Dtablespaces%20%3E%20sauvegarde.)
- [Waytolearnx](https://waytolearnx.com/2020/01/importer-et-exporter-une-base-de-donnees-mysql.html)
- [Commentçamarche](https://www.commentcamarche.net/contents/694-importer-et-exporter-des-donnees-sous-mysql)

La commande mysql permet d'exporter l'intégralité d'une base de données hébergée par MySQL de façon efficace mais n'offre pas la souplesse nécessaire à l'exportation de plusieurs bases de données ou au contraire d'une partie de la base de données (table ou partie d'une table). 

La commande mysqldump répond à ce besoin en offrant la possibilité de spécifier plus précisément les données à exporter. Voici la syntaxe de cette commande :

    > mysqldump [options] base_de_donnees [tables]

///////////////////////////// EXEMPLE 1 /////////////////////////////////////////////////////////

Voici les options généralement utilisées :

    > mysqldump -h host -u user -ppass -rfichier base_de_donnees [tables]

**host** représente le nom ou l'adresse IP de la machine sur laquelle la base de données que vous désirez exporter est installée. 
Par défaut il s'agit de localhost, c'est-à-dire la machine à partir de laquelle la commande mysql est lancée

**user** représente l'utilisateur avec lequel vous désirez vous connecter. Par défaut il s'agit de l'utilisateur root

**password** représente le mot de passe de l'utilisateur avec lequel vous désirez vous connecter. Si vous n'indiquez pas de mot de passe, celui-ci sera demandé de manière interactive. Il ne doit pas y avoir d'espace entre -p et le mot de passe fourni

**base_de_donnees** est le nom de la base de données à exporter. 

**fichier** est le nom du fichier dans lequel la base va être exportée.
Si aucun chemin absolu n'est précisé, le fichier sera stocké dans le même répertoire que la commande mysql.

Voici un exemple d'exportation des tables membres et invites de la base nommée utilisateurs située sur la machine db.commentcamarche.com et appartenant à l'utilisateur admin (dont le mot de passe est KinderSurprise) :

    > mysqldump -h db.commentcamarche.net -u admin -pKinderSurprise -outilisateurs.sql utilisateurs membres invites

Il est possible d'affiner encore plus précisément les données à exporter en donnant une condition SQL grâce au commutateur -w (--where, ici "WHERE id > 4000") :

    > mysqldump -h db.commentcamarche.net -u admin -pKinderSurprise -outilisateurs.sql -w "id>4000" utilisateurs membres invites

La commande SQL située après le commutateur -w doit être délimitée par des guillemets (doubles ou simples).


///////////////////////////// FIN EXEMPLE 1 /////////////////////////////////////////////////////////

///////////////////////////// EXEMPLE 2 A UTILISER /////////////////////////////////////////////////////////

### Exporter une ou plusieurs table(s) précise(s)

    > mysqldump -h [host_name] -u [user_name] –p [password] [options] [database_name] [table_name] > [dumpfilename.sql]

On peut ne pas utiliser le -h [ host_name ] et le –p [ password ]

    > mysqldump -h 141.222.22 -u userAdmin –p la_pass_pass my_database my_table > sauvegarde.sql

### Exporter une base de données entière

On peut ne pas utiliser le -h [ host_name ] et le –p [ password ]

    > mysqldump -u [user_name] -p [database_name] > [dumpfilename.sql]

**user_name** est le nom d’utilisateur avec lequel vous pouvez vous connecter à la base de données.

**database_name** est le nom de la base de données qui sera exportée.

**dumpfilename.sql** est le fichier dans lequel la sortie sera enregistrée.

Si des erreurs se produisent pendant le processus d’exportation, mysqldump les affichera clairement à l’écran.

///////////////////////////// FIN EXEMPLE 2 /////////////////////////////////////////////////////////


# Importer une base de données sous MySQL

La commande en ligne mysql permet également d'importer des données. Il suffit pour cela d'utiliser la redirection < et d'indiquer le fichier dump contenant les instructions SQL à importer :

    > mysql -h host -u user -ppass base_de_donnees < fichier_dump

La notation suivante est, une fois de plus, également possible :

    > mysql --host host --user user -passwordpass base_de_donnees < fichier_dump