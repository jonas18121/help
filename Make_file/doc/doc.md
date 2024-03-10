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

```makefile
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

### L'UID (User ID) et le GID (Group ID)

**L'UID (User ID) et le GID (Group ID)** sont des identifiants numériques utilisés dans les systèmes Unix et Linux pour identifier les utilisateurs et les groupes. Ils sont essentiels pour la gestion des autorisations d'accès aux fichiers, aux répertoires et aux ressources système. Voici ce que chacun de ces identifiants signifie :

1. UID (User ID - Identifiant de l'utilisateur) :

	- L'UID est un numéro unique associé à chaque utilisateur sur un système Unix ou Linux. Chaque utilisateur a son propre UID.
	- L'UID permet au système d'exploitation de savoir qui est l'utilisateur qui exécute un processus ou qui possède un fichier. Par exemple, lorsque vous vous connectez à un système Unix/Linux, le système vous attribue un UID unique.
	- Les fichiers et les répertoires ont un propriétaire, identifié par son UID. Les autorisations d'accès sont souvent basées sur l'UID du propriétaire. Par exemple, un fichier peut être accessible en lecture/écriture uniquement par l'utilisateur dont l'UID correspond au propriétaire du fichier.

2. GID (Group ID - Identifiant de groupe) :

	- Le GID est un numéro associé à un groupe d'utilisateurs. Un groupe est un ensemble logique d'utilisateurs qui ont des autorisations similaires sur les fichiers et les ressources.
	- Chaque utilisateur appartient à un ou plusieurs groupes, et l'un de ces groupes est généralement désigné comme son groupe principal.
	- Les fichiers et les répertoires ont un groupe propriétaire, identifié par son GID. Les autorisations de groupe déterminent qui peut accéder aux fichiers et aux répertoires appartenant à ce groupe.

En résumé, l'UID identifie de manière unique chaque utilisateur sur un système Unix ou Linux, tandis que le GID identifie de manière unique chaque groupe d'utilisateurs. Ces identifiants sont utilisés pour contrôler les autorisations d'accès aux fichiers, aux répertoires et aux ressources du système. Ils sont essentiels pour garantir la sécurité et l'organisation des systèmes Unix/Linux.

```makefile
ifeq ($(OS), Windows_NT)
	CURRENT_UID = $(cmd id -u)
	CURRENT_GID = $(cmd id -g)
else
	CURRENT_UID = $(shell id -u)
	CURRENT_GID = $(shell id -g)
endif
```

Ce code ci-dessus, dans le fichier Makefile est utilisé pour déterminer l'identifiant de l'utilisateur (UID) et l'identifiant du groupe (GID) actuels en fonction du système d'exploitation sur lequel vous exécutez le Makefile. Il utilise une condition pour détecter si le système d'exploitation est Windows_NT (ce qui indique que le Makefile est exécuté sous Windows) ou non (ce qui signifie que le Makefile est exécuté sous un système d'exploitation Unix/Linux).

Voici une explication de ce que fait ce code :

1. ifeq ($(OS), Windows_NT) : Cette ligne vérifie si la variable d'environnement OS est définie à "Windows_NT". Cela indique que le Makefile est exécuté sous Windows. Dans ce cas, le bloc de code suivant sera exécuté pour déterminer l'UID et le GID.

2. CURRENT_UID = $(cmd id -u) et CURRENT_GID = $(cmd id -g) : Ces lignes exécutent les commandes id -u et id -g sous Windows en utilisant la commande cmd pour déterminer l'UID et le GID de l'utilisateur actuel. Les résultats de ces commandes sont stockés dans les variables CURRENT_UID et CURRENT_GID.

3. else : Si le système d'exploitation n'est pas Windows_NT, le bloc de code suivant sera exécuté pour déterminer l'UID et le GID.

4. CURRENT_UID = $(shell id -u) et CURRENT_GID = $(shell id -g) : Ces lignes utilisent la commande id -u et id -g pour déterminer l'UID et le GID sous un système d'exploitation Unix/Linux. Les résultats de ces commandes sont stockés dans les variables CURRENT_UID et CURRENT_GID en utilisant la fonction shell de Make pour exécuter des commandes shell.

En fin de compte, ce code permet d'obtenir les valeurs de l'UID et du GID de l'utilisateur actuel en fonction du système d'exploitation sur lequel le Makefile est exécuté. Ces valeurs sont généralement utilisées pour garantir que les fichiers créés par les commandes Docker ont les bonnes autorisations pour l'utilisateur actuel, ce qui est souvent nécessaire lors de l'utilisation de conteneurs Docker pour le développement.

### Les variables RUN_APP et RUN_NODE

```makefile
# EXEC
EXEC_CONTAINER = docker exec -it -u $(CURRENT_UID):$(CURRENT_GID)

# RUN
RUN_APP = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) app
RUN_NODE = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) node
```

Ce code  définit des variables pour simplifier l'utilisation de commandes Docker à l'intérieur de votre environnement de développement. Voici une explication de ce que fait chaque partie du code :

1. Variables d'exécution :
```makefile
EXEC_CONTAINER = docker exec -it -u $(CURRENT_UID):$(CURRENT_GID)
```
Cette ligne définit une variable appelée `EXEC_CONTAINER`. Cette variable contient une commande Docker qui sera utilisée pour exécuter des commandes à l'intérieur d'un conteneur Docker. Elle utilise les options suivantes :

- `-it` : Permet d'ouvrir un terminal interactif à l'intérieur du conteneur.
- `-u $(CURRENT_UID):$(CURRENT_GID)` : Définit l'identifiant de l'utilisateur (UID) et du groupe (GID) actuels. Ces valeurs sont généralement utilisées pour garantir que les fichiers créés dans le conteneur auront les mêmes autorisations que l'utilisateur qui exécute le Makefile.

2. Variables d'exécution d'application :

```makefile
RUN_APP = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) app
```

Cette ligne définit une variable appelée RUN_APP. Cette variable contient une commande Docker Compose qui sera utilisée pour exécuter des commandes à l'intérieur du service "app" (qui est probablement votre application Symfony, par exemple). Elle utilise les options suivantes :

- `--rm` : Supprime le conteneur après son arrêt. Cela permet de nettoyer automatiquement les conteneurs temporaires.
- `-u $(CURRENT_UID):$(CURRENT_GID)` : Comme précédemment, cette option définit l'UID et le GID de l'utilisateur pour les autorisations dans le conteneur.

3. Variables d'exécution de Node.js :

```makefile
RUN_NODE = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) node
```

Cette ligne définit une variable appelée RUN_NODE. Cette variable contient une commande Docker Compose qui sera utilisée pour exécuter des commandes à l'intérieur du service "node" (probablement lié à Node.js, par exemple). Elle utilise les mêmes options que RUN_APP pour définir l'UID et le GID et nettoyer le conteneur après l'exécution.

Ces variables permettent de simplifier l'exécution de commandes Docker et Docker Compose en utilisant les bonnes options pour définir les autorisations d'utilisateur et nettoyer les conteneurs temporaires. Vous pouvez maintenant utiliser ces variables dans vos règles du Makefile pour exécuter des commandes spécifiques à l'application ou à Node.js dans votre environnement de développement. Par exemple 

```makefile
run_my_app_command:
    $(RUN_APP) php bin/console my-command

run_node_command:
    $(RUN_NODE) npm install
```

Ces règles Makefile utilisent les variables `RUN_APP` et `RUN_NODE` pour exécuter des commandes spécifiques à l'intérieur des conteneurs correspondants.