# Comment faire pour se connecter à mysql workbench pour l'exécution de mysql à l'intérieur de docker?

### 1. Spécifier la configuration de mysql bloc dans votre menu fixe-composer.yml. J'ai suivantes mysql bloc sous services objet dans mon menu fixe-composer.fichier yml.

```yml
services:
    db:
        image: mysql
        volumes:
            - "./.data/db:/var/lib/mysql"
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: mydb
            MYSQL_USER: user
            MYSQL_PASSWORD: pass
        ports:
            42333:3306
```

### 2. Redémarrer conteneur docker et exécuter les commandes suivantes pour obtenir le shell bash dans la base de données mysql contenant
```bash
docker ps
docker exec -it <mysql container name> /bin/bash
```

À l'intérieur du conteneur, pour se connecter à mysql en ligne de commande type,

```bash
mysql -u root -p
```

Utilisation MYSQL_ROOT_PASSWORD comme spécifié dans le menu fixe-composer.yml . Exécuter les commandes suivantes pour créer un nouvel utilisateur.

```bash
create user 'user'@'%' identified by 'pass';
grant all privileges on *.* to 'user'@'%' with grant option;
flush privileges;
```
Le signe de pourcentage (%) signifie que toutes les adresses ip. Redémarrez le conteneur docker.Dans votre MySQL Workbench fournir les détails de la connexion. Utilisation MYSQL_PASSWORD comme spécifié dans votre menu fixe-composer.fichier yml.

Vous devriez maintenant être en mesure de se connecter à votre serveur mysql contenant.