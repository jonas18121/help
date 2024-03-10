# Exemple

## Instalation du projet

1) Dans le projet, doublez tous fichiers ` docker-compose.yml.dist`  et `.env.dist` sans le `.dist` 

2) Ouvrir un premier invite de commande (CMD)

3) Accédez au projet dans l'invite de commande (CMD)

4) Entrez la commande ci-dessous pour faire tourner Docker

    > docker-compose up 

    Ou faire tourner Docker en arrière plan, et donc pas besoin d'une 2èmes CMD

    > docker-compose up -d

5) Ouvrir un deuxième invite de commande (CMD)

6) Accédez au projet dans l'invite de commande (CMD)

7) Entrez la commande ci-dessous pour accéder à git bash dans le projet depuis Docker

    > docker exec -it <nom_du_container_de_app> bash

8) Entrez la commande ci-dessous pour accéder au projet depuis Docker

    > cd <nom_du_projet_creer_dans_docker>

9) Entrez la commande ci-dessous pour importer les dépendances du projet depuis Docker

    > composer update