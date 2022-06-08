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

    mysql> ALTER TABLE [tablename] ADD COLUMN [colonne3] VARCHAR(100);

## Pour ajouter une colonne avec un ID unique par incrémentation automatique:

    mysql> ALTER TABLE [tablename] ADD COLUMN [colonne4] int NOT NULL AUTO_INCREMENT PRIMARY KEY;

## Insérer un enregistrement dans une table SQL:

    mysql> INSERT INTO [tablename] ([colonne1], [colonne2]) VALUES ('[valeur1]', '[valeur2]');

## Fonction MySQL pour afficher la date actuelle:

    mysql> NOW()