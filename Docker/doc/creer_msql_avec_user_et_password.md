# Pour creer un compte utilisateur dans phpMyAdmin et mysql avec docker


### Dans `docker-compose.md`

- Dans la propriété `environment:` de l'image `db` qui représente `mysql`

    - Dans `MYSQL_DATABASE`, on met un nom de batabase

    - Dans `MYSQL_USER`, on met un nom d'utilisateur

    - Dans `MYSQL_PASSWORD`, on met un mot de passe 

    - Dans `MYSQL_ROOT_PASSWORD`, on met un mot de passe

- Dans la propriété `environment:` de l'image `phpmyadmin` qui représente `phpmyadmin`

    - Dans `MYSQL_USER`, on met le même nom d'utilisateur que dans l'image `db`

    - Dans `MYSQL_PASSWORD`, on met le même un mot de passe que dans l'image `db`

    - Dans `MYSQL_ROOT_PASSWORD`, on met le même un mot de passe que dans l'image `db`

    - Dans `PMA_HOST`, on met l'image `db`

Dans `docker-compose.yml`


    version: "3.8"

    services:
        db:
            image: mysql
            container_name: myName_mysql
            restart: always
            volumes:
                - db-data:/var/lib/mysql
            ports:
                - "3306:3306"
            environment:
                - MYSQL_DATABASE=non_database
                - MYSQL_USER=nom_user
                - MYSQL_PASSWORD=password
                - MYSQL_ROOT_PASSWORD=password
            networks:
                - dev
        phpmyadmin:
            image: phpmyadmin
            container_name: myName_phpmyadmin
            restart: always
            depends_on:
                - db
            ports:
                - 8080:80
            environment:
                - MYSQL_USER=nom_user
                - MYSQL_PASSWORD=password
                - MYSQL_ROOT_PASSWORD=password
                - PMA_HOST=db
            networks:
                - dev
        www:
            build: php
            container_name: myName_www
            ports:
                - "8971:80"
            volumes:
                - ./php/vhosts:/etc/apache2/sites-enabled
                - ./:/var/www
            user: '1000:1000' 
            restart: always
            networks:
                - dev

    networks:
        dev:
    volumes:
        db-data:


### Dans phpMyAdmin

- On va dans `phpMyAdmin` que docker envoie, avec le nom d'utilisateur `root` sans sans mot de passe 

- Puis depuis l'accueil, on va dans l'onglet `Comptes utilisateurs` , 

- Puis, on click sur `Ajouter un utilisateur` 

    - Dans le champ `nom d'utilisateur`, on saisi un nom d'utilisateur

    - Dans le champ `d'hôte`, On le laisse avec `%`

    - Dans le champ `Mot de passe` et `Saisir à nouveau `, on saisi un Mot de passe

    - Dans le champ `Extension d'authentification`, on selectionne `Caching sha2 authentification`

    - Puis, on coche tout dans la case de `Privilèges globaux`

    - Et enfin, on click sur le bouton `executer`