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

### Construire/Reconstruire les conteneurs à partir des services

    > docker-compose up --build

### Voir les logs d'un service.
```bash
docker-compose logs name_services
```

# La commande docker


## Executer une nouvelle cli dans le container

### La commande docker exec exécute une nouvelle commande dans un conteneur en cours d'exécution.

https://docs.docker.com/engine/reference/commandline/exec/

    > docker exec

### Entrer dans la cli de git bash du projet

    > docker exec -it <nom_du_container_du_projet> bash

### Télécharger une image

    > docker pull <nom_de_image>

### Télécharger une image avec une version précise

    > docker pull <nom_de_image>:<version>

## Les images

### Lister toutes les images qui sont télécharger dans ma machine

    > docker image ls

### Lister toutes les images

    > docker images -a

### Supprimer une ou plusieurs images

    > docker image rm <id_de_image>

    ou si, ça ne passe pas, il faut forcer

    > docker image rm <id_de_image>

### Supprimer une ou plusieurs images via leur ID

    > docker rmi <id_de_image>

    ou si, ça ne passe pas, il faut forcer

    > docker rmi <id_de_image> --force

### Supprimer toutes les images Docker

#### Comment ça fonctionne

docker images -q listera tous les ID d'image. 

Nous transmettons ces identifiants à docker rmi(qui signifie supprimer des images) et nous supprimons donc toutes les images.

```ps
docker rmi $(docker images -q)
```

### Créer une image à partir d'un Dockerfile

    > docker image build 

### Afficher l'historique d'une image

    > docker image history <id_de_image>

## Les containers

### Lister tout les container actif

    > docker container ls

### Lister tout les containers même ceux qui ne sont pas actif

    > docker container ls -a

### Lister les containers et les filtrer selon leur statut : créé, redémarré, en cours d'exécution, en pause ou quitté

    > docker ps -a

### Consulter la liste des conteneurs quittés, utilisez le drapeau -f

    > docker ps -a -f status=exited

### Utilisez -q pour transmettre les ID à la commande docker rm, afin de Supprimer tous les conteneurs quittés

    > docker rm $(docker ps -a -f status=exited -q)

### Arrêter tous les conteneurs Docker

#### Comment ça fonctionne

La commande docker ps listera tous les conteneurs en cours d' exécution . 

L' indicateur -q ne répertoriera que les ID de ces conteneurs. 

Une fois que nous avons la liste de tous les identifiants de conteneurs, nous pouvons simplement exécuter la docker killcommande, en transmettant tous ces identifiants, et ils seront tous arrêtés !

```ps
docker kill $(docker ps -q)
```

### Supprimer tous les conteneurs Docker

#### Comment ça fonctionne
Nous savons déjà que docker ps -q répertoriera tous les ID de conteneur en cours d'exécution.

Le drapeau -a, renverra tous les conteneurs, pas seulement ceux en cours d'exécution. Par conséquent, cette commande supprimera tous les conteneurs (y compris les conteneurs en cours d'exécution et arrêtés).

```ps
docker rm $(docker ps -a -q)
```

### Créer un container à partir d'une image (le contaire sera inactif tant qu'on l'aura pas ativer)

    > docker run <nom_de_image>

### Créer un container à partir d'une image et le démarrer en mode actif

    > docker run -it <nom_de_image>

### Supprimer un conteneur

    > docker rm <ID_ou_nom_du_conteneur>

### Supprimer un conteneur et son volume

    > docker rm -v <container_name>

### Supprimer les données inutilisées

    > docker system prune

```bash
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N] 
```
### Pour supprimer en plus tous les conteneurs arrêtés et toutes les images non utilisées

    > docker system prune -a

### Pour supprimer en plus tous les conteneurs arrêtés, toutes les images et toutes les volumes non utilisées

Par défaut, les volumes ne sont pas supprimés pour empêcher la suppression de données importantes si aucun conteneur n'utilise actuellement le volume. Utilisez l' --volumes indicateur lors de l'exécution de la commande pour élaguer également les volumes :

    > docker system prune -a --volumes

```bash
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all volumes not used by at least one container
  - all images without at least one container associated to them
  - all build cache

Are you sure you want to continue? [y/N] 
```

### Voir les Logs d'un container

    > docker logs <ID_ou_nom_du_conteneur>

    
### Afficher les détails de l'état d'un container

    > docker inspect <ID_ou_nom_du_conteneur>



## Les volumes

### voir les volumes 

    > docker volume ls

### Supprimer un volume

    > docker volume rm <nom_volume>

### Supprimer un volume, après avoir fait un docker system prune -a --volumes

- Après avoir fait un docker system prune -a --volumes, le volume du projet peut ne pas être supprimer. faire les commandes suivante : 

```bash
# Arrêter le conteneur MySQL
docker stop mysql-container

# Supprimer le conteneur MySQL
docker rm mysql-container

# ou 
docker systeme prune -a --volumes

# ------------- ENSUITE --------------

# Lister les volumes Docker
docker volume ls

# Supposons que le volume s'appelle mysql-data, supprimer le volume
docker volume rm mysql-data

# ------------- ENSUITE --------------

# Recréer un conteneur MySQL vierge
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
```


## Se mettre en utilisateur root dans un container docker

1) Commencez par identifier le nom ou l'ID de votre conteneur Docker en utilisant la commande ci-dessous :

```ps
docker ps
```

2) Une fois que vous avez identifié le conteneur dans lequel vous souhaitez devenir l'utilisateur root, vous pouvez exécuter la commande suivante pour accéder à un shell interactif à l'intérieur de ce conteneur en tant qu'utilisateur root :


```ps
docker exec -u 0 -it nom_ou_ID_du_conteneur /bin/bash

# ou

docker exec -u 0 -it nom_ou_ID_du_conteneur bash
```

## Afficher les logs d'un conteneur Docker 


Pour afficher les logs d'un conteneur Docker nommé "name_container", vous pouvez utiliser la commande suivante :

```bash
docker logs name_container
```

Remplacez "name_container" par le nom du conteneur Docker dont vous souhaitez consulter les logs. Cette commande affichera les logs du conteneur, ce qui peut vous fournir des informations sur ce qui s'est passé à l'intérieur du conteneur, y compris les erreurs rencontrées.

### Si vous souhaitez également voir les logs en temps réel (comme un suivi de journal), vous pouvez utiliser l'option -f :

```bash
docker logs -f name_container
```

Cela affichera les logs en temps réel et les mettra à jour lorsque de nouveaux logs seront générés dans le conteneur. C'est particulièrement utile pour le débogage en temps réel lors du développement ou de la résolution de problèmes dans un environnement de production.

# Seulment pour Linux

### supprimer un dossier

    > sudo rm -r <nom_dossier>

### Vérifier si docker est en cours d'exécution sur votre machine pour Linux

    > systemctl status docker.service

### Ajoutez votre utilisateur au groupe Docker.

    > sudo gpasswd -a $USER docker

    puis 

    > newgrp docker

    Si le problème persiste, vous pouvez essayer après vous être déconnecté et reconnecté, ou redémarrer. Ou faites simplement

    > sudo su $USER

### Démarrer Docker 

    > systemctl start docker

### Activer le service Docker

    > systemctl enable docker

### Ne plus utiliser sudo lorsqu'on utilise docker
```bash
sudo chmod 666 /var/run/docker.sock
```

### Si le fichier SQL est trop lourd pour MYSQL

```bash
SQLSTATE[08S01]: Communication link failure: 1153 Got a packet bigger than 'max_allowed_packet' bytes  
```

- ajout de : `command: --max_allowed_packet=32505856      # Set max_allowed_packet to 256M (or any other value)`  Dans le conteneur Mysql dans docker-compose
- suppression du conteneur Mysql via docker `docker rm <ID_container>`
- excécution de `docker-compose up -d`