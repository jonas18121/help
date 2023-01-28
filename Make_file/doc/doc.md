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