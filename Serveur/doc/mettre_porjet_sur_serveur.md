



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

5) Mettre la config apache 

- dans un autre terminal entrer dans le bash pour symfony

    > docker exec -it < nom du containeur> bash

- voir les fichiers de conf

    > ls /etc/apache2/sites-available

- voir un fichier de conf en particulier

    > cat /etc/apache2/sites-available/000-default.conf

ou 

5) Mettre la config nginx

dans `/var/www/wallky_app/backend/api$ `

- Pour voir ce qu'il y a dans le dossier nginx

    > ls /etc/nginx

- Pour voir ce qu'il y a dans le dossier sites-available de nginx    

    > ls /etc/nginx/sites-available   

- Pour voir ce qu'il y a dans le dossier sites-available de apache2  

    > ls /etc/apache2/sites-available

- sert a voir des commandes

    > certbot -h



creer le sous-domaine ls /etc/
creer le certficat ssl pour le sous-domaine