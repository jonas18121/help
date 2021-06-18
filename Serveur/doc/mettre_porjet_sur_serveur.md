# mettre un projet sur un serveur distant



1) il faut creer un dossier pour le backend sur le serveur, depuis le terminal qui pointe sur ce serveur

    > mkdir var

    > cd var

    > mkdir www

    > cd www


le chemin doit être `/var/www/`

si on a mal créer le chemin et que le dossier a été supprimer alors qu'on était encore dedans, puis mettre le mot de passe du serveur
    
    sudo mkdir -p /var/www/wallky_api

ou 

    > cd ~

2) Après on peut utiliser les commandes de git mettre notre projet sur le serveur

    > git clone

    > git pull

    ect...


3) Puis on rentre dans le projet

    `/var/www/wallky_app/backend/api`


4) On fait un composer install pour installer toutes les extensions

    > composer install


les etapes restantes pour mettre l'api en ligne:

5) Mettre la config apache c'est le devops qui va s'occupé de ça

- dans un autre terminal entrer dans le bash pour symfony

    > docker exec -it < nom du containeur> bash

- voir les fichiers de conf

    > ls /etc/apache2/sites-available

- voir un fichier de conf en particulier

    > cat /etc/apache2/sites-available/000-default.conf

ou 

5) Mettre la config nginx c'est le devops qui va s'occupé de ça

dans `/var/www/wallky_app/backend/api$ `

- Pour voir ce qu'il y a dans le dossier nginx

    > ls /etc/nginx

- Pour voir ce qu'il y a dans le dossier sites-available de nginx    

    > ls /etc/nginx/sites-available   

- Pour voir ce qu'il y a dans le dossier sites-available de apache2  

    > ls /etc/apache2/sites-available

- sert a voir des commandes

    > certbot -h


6) creer le sous-domaine c'est le devops qui va s'occupé de ça

7) creer le certficat ssl pour le sous-domaine c'est le devops qui va s'occupé de ça

8) Si le fichier `.env` est inclut dans `.gitignore`, il faut l'enlevé dedans

9) Dans le fichier `.env` , on met un `mot de passe`, un `nom user`, un `nom de BDD `et en `hote` on met `127.0.0.1:3306 `

    `DATABASE_URL="mysql://nom_user:mot_de_passe@127.0.0.1:3306/nom_bdd?serverVersion=5.7"`  

10) puis on `git push` vers le repository et on fait un `git pull` depuis le serveur

11) Depuis le serveur en CLI

    - Créer l'espace de bdd, s'il n'a pas été fait

        > php bin/console doctrine:database:create

    - Puis on envois les version de migration déjà existante dans le projet

        > php bin/console doctrine:migrations:migrate

    - Puis on génére les clé JWT

        > php bin/console lexik:jwt:generate-keypair

    - Pour autorisé le téléchargment d'image dans un dossier, mais il y a mieux à faire

        > chmod 777 /var/www/wallky_app/backend/api/public/images/users/


autorisation pour le dossier sudo chmod 777./(folder name)

pour le fichier sudo chmod 777 -R ./(file name)