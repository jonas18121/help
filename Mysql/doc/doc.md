# Utilisation de MySQL en ligne de commande

Site :

- [Waytolearnx](https://waytolearnx.com/2019/09/liste-des-commandes-mysql.html)
- [buzut](https://buzut.net/maitrisez-mysql-en-cli/)

## MySQL possède une simple interface "ligne de commande"

- Les commandes SQL doivent être séparées par un " ; " (!!!)
- Les exemples suivants supposent que vous avez accès à une base de données

## Connexion à un serveur MySQL (depuis un terminal unix / telnet)

exemple :

    > mysql -h machine -u utilisateur -p [base_de_données]

    -h: machine hôte (ip)
    -u: utilisateur MySQL (pas Unix)
    -p: mot de passe MySQL (pas Unix)

### Si on est déjà connecter dans un serveur qui a notre projet et qui à aussi notre bdd mysql

    > mysql -u utilisateur -p [base_de_données]

## Déconnexion à Mysql

    mysql> EXIT

////////////////////////// CLE ETRANGÈRE //////////////

## Désactiver la configuration par défaut de la vérification des clés étrangères

    mysql> SET FOREIGN_KEY_CHECKS = 0;
## Rétablisser la configuration par défaut de la vérification des clés étrangères

    mysql> SET FOREIGN_KEY_CHECKS = 1;

## Supprimer une FOREIGN KEY

    mysql> ALTER TABLE `my_table` DROP FOREIGN KEY `FK_id_off_foreign_key`;

////////////////////////// FIN CLE ETRANGÈRE //////////////

## Pour créez une base de données SQL.

    mysql> create database [databasename];

## Pour afficher toutes les bases de données sur le serveur SQL.

    mysql> show databases;

## Pour sélectionnez une base de données

    mysql> use [database];

## Pour voir toutes les tables dans une base de données.

    mysql> show tables;

## Pour afficher la structure d’une table:

    mysql> describe [table];

## Pour supprimer une base de données.

    mysql> drop database [databasename];

## Pour supprimer une table.

    mysql> drop table [tablename];

## Afficher toutes les données d’une table.

    mysql> SELECT * FROM [tablename];

## Renvoie les colonnes et les informations sur des colonnes relatives à une table.

    mysql> SHOW COLUMNS FROM  [tablename];

## Déterminez quelle base de données est utilisée:

    mysql> select database();

## Pour lister tous les index d’une table:

    mysql> show index from [table];

## Créer une nouvelle table avec des colonnes:

    mysql> CREATE TABLE [tablename] ([colonne1] VARCHAR(50), [colonne2] DATETIME);

## Pour ajouter une colonne:

    mysql> ALTER TABLE [tablename] ADD COLUMN [colonne3] VARCHAR(100) NULL DEFAULT NULL;

Exemple :

    mysql> ALTER TABLE user ADD COLUMN age TINYINT(2) NOT NULL DEFAULT NULL;

Si le nom de la colonne a le même nom qu'un mot réserver par SQL (ex: default), mettre des backticks

    mysql> ALTER TABLE user ADD COLUMN `default` INT(100) NOT NULL DEFAULT '0';

## Pour ajouter une colonne avec un ID unique par incrémentation automatique:

    mysql> ALTER TABLE [tablename] ADD COLUMN [colonne4] int NOT NULL AUTO_INCREMENT PRIMARY KEY;

## Insérer un enregistrement dans une table SQL:

    mysql> INSERT INTO [tablename] ([colonne1], [colonne2]) VALUES ('[valeur1]', '[valeur2]');

## Fonction MySQL pour afficher la date actuelle:

    mysql> NOW();

## Pour afficher le plan d’exécution d’une requête SQL:

    mysql> EXPLAIN SELECT * FROM [tablename];

## Pour sélectionner une parties d’un enregistrement:

    mysql> SELECT [colonne1], [colonne2] FROM [table];

## Pour compter le nombre d’enregistrement dans une table.

    mysql> SELECT COUNT([colonne]) FROM [table];

## Pour sélectionner des enregistrements spécifiques:

    mysql> SELECT * FROM [table] WHERE [colonne] = [valeur];

D’autre sélecteurs: <, >, !=; pour combiner plusieurs sélecteurs utiliser les opérateurs AND et OR. Exemple:

    mysql> SELECT * FROM users WHERE name = 'Alex' OR age > 30;

## Sélectionnez les enregistrements qui contiennent la valeur [val].

    mysql> SELECT * FROM [table] WHERE [colonne] LIKE '%[val]%';

Exemple: Sélectionnez tous les noms qui contiennent ‘al’

    mysql> SELECT * FROM users WHERE name LIKE '%al%';

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  101   |   ali     |   25   |
    |  102   |  Malis    |   15   |
    |  103   |  Mokali   |   35   |
    |  104   |  Manali   |   40   |
    +--------+-----------+--------+

## Sélectionnez les enregistrements qui commencent par la valeur [val].

    mysql> SELECT * FROM [table] WHERE [colonne] LIKE '[val]%';

Exemple: Sélectionnez tous les noms commençant par « Yo »

    mysql> SELECT * FROM users WHERE name LIKE 'Yo%';

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  115   |   Yohan   |   33   |
    |  130   |   Youssa  |   56   |
    |  109   |   Yonaka  |   15   |
    |  144   |   Yoyo    |   20   |
    +--------+-----------+--------+

## Sélectionnez les enregistrements commençant par ‘val1’ et se terminant par ‘val2’.

    mysql> SELECT * FROM [table] WHERE [colonne] LIKE '[val1_val2]';

Exemple: Sélectionnez toutes les descriptions commençant par « T » et se terminant par « T »

    mysql> SELECT * FROM product WHERE description LIKE 'T_T';

    +--------+---------------+
    |  id    |  description  |
    +--------+---------------+
    |  101   |      TiT      |
    |  102   |      ToT      |
    |  103   |      TaT      |
    |  104   |      TuT      |
    +--------+---------------+

## Sélectionner un intervalle de données.

    mysql> SELECT * FROM [table] WHERE [colonne] BETWEEN [valeur1] and [valeur2];

Exemple:

    mysql> SELECT * FROM users WHERE age BETWEEN 20 and 30;

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  115   |   Yohan   |   20   |
    |  130   |   Thomas  |   21   |
    |  109   |    Jean   |   25   |
    +--------+-----------+--------+

## Sélectionnez avec un ordre personnalisé et seulement une limite:

    mysql> SELECT * FROM [table] WHERE [colonne] ORDER BY [colonne] ASC LIMIT [valeur];

Ordre: DESC (Descendant) ↓, ASC (ascendant) ↑.

Exemple:

    mysql> SELECT * FROM users ORDER BY age ASC LIMIT 3;

    +--------+-----------+--------+
    |  id    |    name   |  age   |
    +--------+-----------+--------+
    |  115   |   Yohan   |   20   |
    |  130   |   Thomas  |   21   |
    |  109   |    Jean   |   25   |
    +--------+-----------+--------+



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