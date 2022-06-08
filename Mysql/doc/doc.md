# Utilisation de MySQL en ligne de commande

## A. MySQL possède une simple interface "ligne de commande"

- Les commandes SQL doivent être séparées par un " ; " (!!!)
- Les exemples suivants supposent que vous avez accès à une base de données

## B. Connexion à un serveur MySQL (depuis un terminal unix / telnet)

exemple :

    > mysql -h machine -u utilisateur -p [base_de_données]

    -h: machine hôte (ip)
    -u: utilisateur MySQL (pas Unix)
    -p: mot de passe MySQL (pas Unix)

### Si on est déjà connecter dans un serveur qui a notre projet et qui à aussi notre bdd mysql

    > mysql -u utilisateur -p [base_de_données]

## C. Déconnexion à Mysql

    mysql> EXIT