# Mettre un projet sur un serveur puis le lancer


1) il faut creer un dossier pour le backend sur le serveur, depuis le terminal qui pointe sur ce serveur

    > mkdir var

    > cd var

    > mkdir www

    > cd www

    > mkdir nom_du_projet

    > cd nom_du_projet

le chemin doit être `/var/www/wallky_api`

    si on a mal créer le chemin et que le dossier a été supprimer alors qu'on était encore dedans, puis mettre le mot de passe du serveur
    
    sudo mkdir -p /var/www/wallky_api

ou 

    > cd ~

Après on peut utiliser les commandes de git mettre notre projet sur le serveur

    > git clone

    > git pull

    ect...


Et à la fin on lance le projet