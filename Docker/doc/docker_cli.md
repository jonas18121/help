# La commande docker-compose

## Supprimer un container/image/service

### Supprimer un service

    > docker-compose rm <nom_du_service_dans_docker-compose.yml>








## Voir la liste des container/images/service

### Voir la liste des images 

    > docker-compose images

### Voir la liste des container 

    > docker-compose ps


## Extraire des images de service

    > docker-compose pull


## Faire tourner ou stoper docker/docker-compose

### Faire tourner docker-compose

    > docker-compose up

### Faire tourner docker-compose en arrière plan

    > docker-compose up -d

### Arrêter les conteneurs et supprimer les conteneurs, les réseaux, les volumes et les images créés par up.

    > docker-compose down

### Arrêter l'exécution des conteneurs sans les supprimer. Ils peuvent être redémarrés avec docker-compose start.

    > docker-compose stop

### Démarrer les conteneurs

    > docker-compose start

### Redémarrer les conteneurs

    > docker-compose restart

### Mettres les conteneurs en pause

    > docker-compose pause

### réactiver le conteneurs en pause

    > docker-compose unpause

### Forcer l'arrêt des conteneurs de service.

    > docker-compose kill





## Executer une nouvelle cli dans le container

### La commande docker exec exécute une nouvelle commande dans un conteneur en cours d'exécution.

https://docs.docker.com/engine/reference/commandline/exec/

    > docker exec

### Entrer dans la cli de git bash du projet

    > docker exec -it <nom_du_container_du_projet> bash


# La commande docker

### Télécharger une image

    > docker pull <nom_de_image>

### Télécharger une image avec une version précise

    > docker pull <nom_de_image>:<version>

## Les images

### Lister toutes les images qui sont télécharger dans ma machine

    > docker image ls

### Supprimer une ou plusieurs images

    > docker image rm <id_de_image>

### Créer une image à partir d'un Dockerfile

    > docker image build 

### Afficher l'historique d'une image

    > docker image history <id_de_image>

## Les containers

### Lister tout les container actif

    > docker container ls

### Lister tout les container mêm ceux qui ne sont pas actif

    > docker container ls -a

### Créer un container à partir d'une image (le contaire sera inactif tant qu'on l'aura pas ativer)

    > docker run <nom_de_image>

### Créer un container à partir d'une image et le démarrer en mode actif

    > docker run -it <nom_de_image>