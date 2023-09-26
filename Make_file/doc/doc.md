# Makefile



### Commande MakeFile qui est sur 2 fichiers différents

**Déclaratione de variable dans le fichier makefile qui ce trouve à la racine du projet**
```makefile

```

**Fichier MakeFile dans projet/** 

Placé dans la racine du projet, au même niveau que le dossier `docker/`

La commande `docker-projet-command` sera exécuter depuis docker (make docker-projet-command)
```makefile
#!/bin/bash
SHELL = /bin/bash # Use bash syntax

# ENVIRONMENT
ENV = dev
BIN_PHP = php
ENVIRONMENT = develop

# VARIABLES
SYMFONY_CONSOLE = $(BIN_PHP) bin/console
PROJECT = aecale

ifeq ($(OS), Windows_NT)
	CURRENT_UID = $(cmd id -u)
	CURRENT_GID = $(cmd id -g)
else
	CURRENT_UID = $(shell id -u)
	CURRENT_GID = $(shell id -g)
endif

# EXEC
EXEC_CONTAINER = docker exec -it -u $(CURRENT_UID):$(CURRENT_GID)

# RUN
RUN_APP = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) app
RUN_NODE = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) node

# HELP
.DEFAULT_GOAL = help

##-----------------------------------------
## DATABASE
##-----------------------------------------

docker-db-load-latest: ## Load latest SQL file - depending env
	$(RUN_APP) bash -c "make db-load-latest"

##-----------------------------------------
## MIGRATION
##-----------------------------------------

docker-projet-command: ## exécuter depuis docker
	$(RUN_APP) bash -c "make app-projet-migration"
```

**Fichier MakeFile dans projet/app/**

Placé dans le dossier `app/` du projet, 

La commande `docker-projet-command` sera exécuter depuis la partie de symfony dans `app/` (make app-projet-command), 

par exemple si le projet est sur un serveur distant et qu'on ne peut pas exécuter la commande `docker-projet-command` car le serveur n'utilise pas docker
```makefile
#!/bin/bash
SHELL = /bin/bash # Use bash syntax

# ARGUMENT - ENV
ifndef ENV
ENV = dev
else
ENV = $(ENV)
endif

ifeq ($(ENV),dev)
BIN_PHP = php
ENVIRONMENT = develop
else ifeq ($(ENV),staging)
BIN_PHP = php
ENVIRONMENT = staging
else ifeq ($(ENV),preprod)
BIN_PHP = php
ENVIRONMENT = preproduction
else ifeq ($(ENV),prod)
BIN_PHP = php
ENVIRONMENT = production
else
$(error ENV argument is required : dev|staging|preprod|prod)
endif

# VARIABLES
SYMFONY_CONSOLE = $(BIN_PHP) bin/console

# HELP
.DEFAULT_GOAL = help

##-----------------------------------------
## DATABASE
##-----------------------------------------

db-load-latest: ## Load latest SQL file - depending env
	$(SYMFONY_CONSOLE) doctrine:database:drop --force
	$(SYMFONY_CONSOLE) doctrine:database:create
	$(SYMFONY_CONSOLE) doctrine:database:import latest.$(ENV).sql

##-----------------------------------------
## MIGRATION
##-----------------------------------------
## pull:category -c et pull:category sont des commandes qu'on a créées

app-projet-command: ## exécuter via symfony
	- $(SYMFONY_CONSOLE) pull:category -c 
	- $(SYMFONY_CONSOLE) pull:category
```

### Explication en détaille d'une commande

Explication en détaille de la commande un peut complexe :

```make
docker-compose: ## Generate docker-composer.yml file
docker-compose: docker-compose.yml.dist
	@if [ -f docker-compose.yml ]; then \
	    echo 'docker-compose.yml already exists'; \
	else \
	    echo cp docker-compose.yml.dist docker-compose.yml; \
	    cp docker-compose.yml.dist docker-compose.yml; \
	fi
```

Le Makefile semble être utilisé pour générer un fichier `docker-compose.yml` à partir d'un modèle (`docker-compose.yml.dist`) s'il n'existe pas déjà. Voici une explication ligne par ligne du code :

1. `docker-compose`:  Il s'agit d'une cible (target) dans le Makefile, et le nom de la cible est "docker-compose". Les cibles dans un Makefile sont utilisées pour spécifier les tâches que le Makefile peut effectuer. Dans ce cas, "docker-compose" est la cible principale du Makefile.

2. `## Generate docker-composer.yml file` : Cette ligne est un commentaire. Les commentaires dans un Makefile commencent généralement par le caractère #. Cela permet de documenter la cible et d'expliquer brièvement ce qu'elle fait.

3. `docker-compose: docker-compose.yml.dist` : Cette ligne indique que la cible `docker-compose` dépend du fichier "docker-compose.yml.dist". Cela signifie que si "docker-compose.yml.dist" est modifié, la cible "docker-compose" sera exécutée pour générer le fichier "docker-compose.yml".

4. La section suivante commence par `@if [ -f docker-compose.yml ]; then \` et marque le début d'une commande conditionnelle. Cette commande vérifie si le fichier "docker-compose.yml" existe dans le répertoire.

5. `echo 'docker-compose.yml already exists'; \` : Si le fichier "docker-compose.yml" existe, cette commande affiche un message disant que le fichier existe déjà.

6. `else \` : Si le fichier "docker-compose.yml" n'existe pas, le flux de commande passe à la section suivante après "else".

7. `echo cp docker-compose.yml.dist docker-compose.yml; \` : Cette ligne affiche la commande cp (copie) qui copie le fichier "docker-compose.yml.dist" vers "docker-compose.yml". **Cependant, notez qu'il n'exécute pas réellement cette commande ; il affiche simplement la commande que vous devrez exécuter**.

8. `cp docker-compose.yml.dist docker-compose.yml; \` : Cette ligne **effectue réellement** la copie du fichier "docker-compose.yml.dist" vers "docker-compose.yml" en utilisant la commande cp.

9. `fi` : Cette ligne marque la fin de la commande conditionnelle.

En résumé, cette partie du Makefile est conçue pour générer le fichier "docker-compose.yml" à partir du modèle "docker-compose.yml.dist" s'il n'existe pas déjà. Elle vérifie d'abord si le fichier existe et, si ce n'est pas le cas, elle le copie à partir du modèle. Cela permet de créer automatiquement le fichier de configuration Docker Compose s'il n'est pas présent, ce qui peut être utile lors du déploiement d'une application.