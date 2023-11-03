# Différents exemple de fichier Makefile

## Exemple 1

```makefile
# --------------------------------#
# Makefile for the "make" command
# --------------------------------#

# ----- Colors -----
GREEN = /bin/echo -e "\x1b[32m\#\# $1\x1b[0m"
RED = /bin/echo -e "\x1b[31m\#\# $1\x1b[0m"

# ----- Programs -----
COMPOSER = composer
PHP = php
SYMFONY = symfony
SYMFONY_CONSOLE = $(PHP) bin/console
PHP_UNIT = $(PHP) bin/phpunit
NPM = npm
DOCKER_DEV = sudo docker-compose -f docker-compose.dev.yml

## ----- System -----
cl: ## clear
	clear

las: ## las
	ls -la

## ----- Docker dev -----
docker-run: ## docker run
	@$(call GREEN, "Docker run!")
	$(DOCKER_DEV) up -d

docker-ps: ## docker ps
	@$(call GREEN, "Docker ps!")
	$(DOCKER_DEV) ps

docker-build: ## docker build
	@$(call GREEN, "Docker build!")
	$(DOCKER_DEV) up --force-recreate --build -d

docker-stop: ## docker stop
	@$(call GREEN, "Docker stop!")
	$(DOCKER_DEV) stop

docker-exec: ## docker exec
	@$(call GREEN, "Docker exec!")
	$(DOCKER_DEV) exec apache bash

docker-restart: ## docker restart
	@$(call GREEN, "Docker restart!")
	$(DOCKER_DEV) restart

docker-down: ## docker down
	@$(call GREEN, "Docker down!")
	$(DOCKER_DEV) down

## ----- Project -----
init: ## Initialize the project
	$(MAKE) composer-install

## ----- Composer -----
composer-install: ## Install the dependencies
	@$(call GREEN, "Installing dependencies...")
	$(COMPOSER) install

composer-update: ## Update the dependencies
	@$(call GREEN, "Updating dependencies...")
	$(COMPOSER) update

## ----- NPM -----
npm-install: ## Install the dependencies
	@$(call GREEN, "Installing dependencies...")
	$(NPM) install
	$(MAKE) npm-build

npm-build: ## Build the assets
	@$(call GREEN, "Building assets...")
	$(NPM) run build

## ----- Symfony -----
start: ## Start the project
	@$(call GREEN, "Starting the project...")
	$(SYMFONY) server:start
	@$(call GREEN, "Project started! You can now access it at http://127.0.0.1:8000")

stop: ## Stop the project
	@$(call GREEN, "Stopping the project...")
	$(SYMFONY_CONSOLE) server:stop
	@$(call GREEN, "Project stopped!")

database-create: ## Create the database
	@$(call GREEN, "Creating database...")
	$(SYMFONY_CONSOLE) doctrine:database:create --if-not-exists

database-drop: ## Drop the database
	@$(call GREEN, "Dropping database...")
	$(SYMFONY_CONSOLE) doctrine:database:drop --force --if-exists

database-migrate: ## Migrate the database
	@$(call GREEN, "Migrating database...")
	$(SYMFONY_CONSOLE) doctrine:migrations:migrate --no-interaction

database-rollback: ## Rollback the database
	@$(call GREEN, "Rolling back database...")
	$(SYMFONY_CONSOLE) doctrine:migrations:migrate prev --no-interaction

database-fixtures: ## Load the fixtures
	@$(call GREEN, "Loading fixtures...")
	$(SYMFONY_CONSOLE) doctrine:fixtures:load --no-interaction

database-init: ## Initialize the database
	@$(call GREEN, "Initializing database...")
	$(MAKE) database-drop
	$(MAKE) database-create
	$(MAKE) database-migrate
	$(MAKE) database-fixtures

cache-clear: # Clear the cache
	@$(call GREEN, "Clearing cache...")
	$(SYMFONY_CONSOLE) cache:clear
## ----- Tests -----
tests: ## Run the tests
	@$(call GREEN, "Running tests...")
	$(MAKE) database-init-test
	$(PHP_UNIT)

database-init-test: ## Init database for tests
	@$(call GREEN, "Creating the database for tests...")
	$(SYMFONY_CONSOLE) d:d:d --force --if-exists --env=test
	$(SYMFONY_CONSOLE) d:d:c --env=test --if-not-exists
	$(SYMFONY_CONSOLE) d:m:m --no-interaction --env=test
	$(SYMFONY_CONSOLE) d:f:l --no-interaction --env=test

## ----- Help -----
help: ## Display this help
	@$(call GREEN, "Available commands:")
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
```

## Exemple 2

```makefile
#---Symfony-And-Docker-Makefile---------------#
# Author: https://github.com/yoanbernabeu
# License: MIT
#---------------------------------------------#

#---VARIABLES---------------------------------#
#---DOCKER---#
DOCKER = docker
DOCKER_RUN = $(DOCKER) run
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_UP = $(DOCKER_COMPOSE) up -d
DOCKER_COMPOSE_STOP = $(DOCKER_COMPOSE) stop
#------------#

#---SYMFONY--#
SYMFONY = symfony
SYMFONY_SERVER_START = $(SYMFONY) serve -d
SYMFONY_SERVER_STOP = $(SYMFONY) server:stop
SYMFONY_CONSOLE = $(SYMFONY) console
SYMFONY_LINT = $(SYMFONY_CONSOLE) lint:
#------------#

#---COMPOSER-#
COMPOSER = composer
COMPOSER_INSTALL = $(COMPOSER) install
COMPOSER_UPDATE = $(COMPOSER) update
#------------#

#---NPM-----#
NPM = npm
NPM_INSTALL = $(NPM) install --force
NPM_UPDATE = $(NPM) update
NPM_BUILD = $(NPM) run build
NPM_DEV = $(NPM) run dev
NPM_WATCH = $(NPM) run watch
#------------#

#---PHPQA---#
PHPQA = jakzal/phpqa
PHPQA_RUN = $(DOCKER_RUN) --init -it --rm -v $(PWD):/project -w /project $(PHPQA)
#------------#

#---PHPUNIT-#
PHPUNIT = APP_ENV=test $(SYMFONY) php bin/phpunit
#------------#
#---------------------------------------------#

## === 🆘  HELP ==================================================
help: ## Show this help.
	@echo "Symfony-And-Docker-Makefile"
	@echo "---------------------------"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
#---------------------------------------------#

## === 🐋  DOCKER ================================================
docker-up: ## Start docker containers.
	$(DOCKER_COMPOSE_UP)
.PHONY: docker-up

docker-stop: ## Stop docker containers.
	$(DOCKER_COMPOSE_STOP)
.PHONY: docker-stop
#---------------------------------------------#

## === 🎛️  SYMFONY ===============================================
sf: ## List and Use All Symfony commands (make sf command="commande-name").
	$(SYMFONY_CONSOLE) $(command)
.PHONY: sf

sf-start: ## Start symfony server.
	$(SYMFONY_SERVER_START)
.PHONY: sf-start

sf-stop: ## Stop symfony server.
	$(SYMFONY_SERVER_STOP)
.PHONY: sf-stop

sf-cc: ## Clear symfony cache.
	$(SYMFONY_CONSOLE) cache:clear
.PHONY: sf-cc

sf-log: ## Show symfony logs.
	$(SYMFONY) server:log
.PHONY: sf-log

sf-dc: ## Create symfony database.
	$(SYMFONY_CONSOLE) doctrine:database:create --if-not-exists
.PHONY: sf-dc

sf-dd: ## Drop symfony database.
	$(SYMFONY_CONSOLE) doctrine:database:drop --if-exists --force
.PHONY: sf-dd

sf-su: ## Update symfony schema database.
	$(SYMFONY_CONSOLE) doctrine:schema:update --force
.PHONY: sf-su

sf-mm: ## Make migrations.
	$(SYMFONY_CONSOLE) make:migration
.PHONY: sf-mm

sf-dmm: ## Migrate.
	$(SYMFONY_CONSOLE) doctrine:migrations:migrate --no-interaction
.PHONY: sf-dmm

sf-fixtures: ## Load fixtures.
	$(SYMFONY_CONSOLE) doctrine:fixtures:load --no-interaction
.PHONY: sf-fixtures

sf-me: ## Make symfony entity
	$(SYMFONY_CONSOLE) make:entity
.PHONY: sf-me

sf-mc: ## Make symfony controller
	$(SYMFONY_CONSOLE) make:controller
.PHONY: sf-mc

sf-mf: ## Make symfony Form
	$(SYMFONY_CONSOLE) make:form
.PHONY: sf-mf

sf-perm: ## Fix permissions.
	chmod -R 777 var
.PHONY: sf-perm

sf-sudo-perm: ## Fix permissions with sudo.
	sudo chmod -R 777 var
.PHONY: sf-sudo-perm

sf-dump-env: ## Dump env.
	$(SYMFONY_CONSOLE) debug:dotenv
.PHONY: sf-dump-env

sf-dump-env-container: ## Dump Env container.
	$(SYMFONY_CONSOLE) debug:container --env-vars
.PHONY: sf-dump-env-container

sf-dump-routes: ## Dump routes.
	$(SYMFONY_CONSOLE) debug:router
.PHONY: sf-dump-routes

sf-open: ## Open project in a browser.
	$(SYMFONY) open:local
.PHONY: sf-open

sf-open-email: ## Open Email catcher.
	$(SYMFONY) open:local:webmail
.PHONY: sf-open-email

sf-check-requirements: ## Check requirements.
	$(SYMFONY) check:requirements
.PHONY: sf-check-requirements
#---------------------------------------------#

## === 📦  COMPOSER ==============================================
composer-install: ## Install composer dependencies.
	$(COMPOSER_INSTALL)
.PHONY: composer-install

composer-update: ## Update composer dependencies.
	$(COMPOSER_UPDATE)
.PHONY: composer-update

composer-validate: ## Validate composer.json file.
	$(COMPOSER) validate
.PHONY: composer-validate

composer-validate-deep: ## Validate composer.json and composer.lock files in strict mode.
	$(COMPOSER) validate --strict --check-lock
.PHONY: composer-validate-deep
#---------------------------------------------#

## === 📦  NPM ===================================================
npm-install: ## Install npm dependencies.
	$(NPM_INSTALL)
.PHONY: npm-install

npm-update: ## Update npm dependencies.
	$(NPM_UPDATE)
.PHONY: npm-update

npm-build: ## Build assets.
	$(NPM_BUILD)
.PHONY: npm-build

npm-dev: ## Build assets in dev mode.
	$(NPM_DEV)
.PHONY: npm-dev

npm-watch: ## Watch assets.
	$(NPM_WATCH)
.PHONY: npm-watch
#---------------------------------------------#

## === 🐛  PHPQA =================================================
qa-cs-fixer-dry-run: ## Run php-cs-fixer in dry-run mode.
	$(PHPQA_RUN) php-cs-fixer fix ./src --rules=@Symfony --verbose --dry-run
.PHONY: qa-cs-fixer-dry-run

qa-cs-fixer: ## Run php-cs-fixer.
	$(PHPQA_RUN) php-cs-fixer fix ./src --rules=@Symfony --verbose
.PHONY: qa-cs-fixer

qa-phpstan: ## Run phpstan.
	$(PHPQA_RUN) phpstan analyse ./src --level=7
.PHONY: qa-phpstan

qa-security-checker: ## Run security-checker.
	$(SYMFONY) security:check
.PHONY: qa-security-checker

qa-phpcpd: ## Run phpcpd (copy/paste detector).
	$(PHPQA_RUN) phpcpd ./src
.PHONY: qa-phpcpd

qa-php-metrics: ## Run php-metrics.
	$(PHPQA_RUN) phpmetrics --report-html=var/phpmetrics ./src
.PHONY: qa-php-metrics

qa-lint-twigs: ## Lint twig files.
	$(SYMFONY_LINT)twig ./templates
.PHONY: qa-lint-twigs

qa-lint-yaml: ## Lint yaml files.
	$(SYMFONY_LINT)yaml ./config
.PHONY: qa-lint-yaml

qa-lint-container: ## Lint container.
	$(SYMFONY_LINT)container
.PHONY: qa-lint-container

qa-lint-schema: ## Lint Doctrine schema.
	$(SYMFONY_CONSOLE) doctrine:schema:validate --skip-sync -vvv --no-interaction
.PHONY: qa-lint-schema

qa-audit: ## Run composer audit.
	$(COMPOSER) audit
.PHONY: qa-audit
#---------------------------------------------#

## === 🔎  TESTS =================================================
tests: ## Run tests.
	$(PHPUNIT) --testdox
.PHONY: tests

tests-coverage: ## Run tests with coverage.
	$(PHPUNIT) --coverage-html var/coverage
.PHONY: tests-coverage
#---------------------------------------------#

## === ⭐  OTHERS =================================================
before-commit: qa-cs-fixer qa-phpstan qa-security-checker qa-phpcpd qa-lint-twigs qa-lint-yaml qa-lint-container qa-lint-schema tests ## Run before commit.
.PHONY: before-commit

first-install: docker-up composer-install npm-install npm-build sf-perm sf-dc sf-dmm sf-start sf-open ## First install.
.PHONY: first-install

start: docker-up sf-start sf-open ## Start project.
.PHONY: start

stop: docker-stop sf-stop ## Stop project.
.PHONY: stop

reset-db: ## Reset database.
	$(eval CONFIRM := $(shell read -p "Are you sure you want to reset the database? [y/N] " CONFIRM && echo $${CONFIRM:-N}))
	@if [ "$(CONFIRM)" = "y" ]; then \
		$(MAKE) sf-dd; \
		$(MAKE) sf-dc; \
		$(MAKE) sf-dmm; \
	fi
.PHONY: reset-db
#---------------------------------------------#
```

## Exemple 3

```makefile
#!/bin/bash
SHELL = /bin/bash # Use bash syntax

# ARGUMENT - ENV
ifndef ENV
ENV = dev
else
ENV = $(ENV)
endif

ifeq ($(ENV),test)
BIN_PHP = php
ENVIRONMENT = test
else ifeq ($(ENV),dev)
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
$(error ENV argument is required : test|dev|staging|preprod|prod)
endif

# VARIABLES
SYMFONY_CONSOLE = $(BIN_PHP) bin/console
URL_TEST ="http://127.0.0.1:8971"

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
RUN_APP = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) www
RUN_NODE = docker-compose run --rm -u $(CURRENT_UID):$(CURRENT_GID) node

# HELP
.DEFAULT_GOAL = help

# Display the list commands whit the command "make"
ifeq ($(OS), Windows_NT)
help:
	@echo "/!\ Make help is disabled on windows /!\ ";
.PHONY: help
else
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help
endif

##-----------------------------------------
## QUALITY
##-----------------------------------------

quality: ## Global quality (app)
quality: phpfixer phpstan  lint

lint: ## Run Lint globally (app)
lint:
	$(SYMFONY_CONSOLE) lint:twig templates 
	$(SYMFONY_CONSOLE) lint:yaml config translations --parse-tags
	$(SYMFONY_CONSOLE) lint:container --no-debug
	$(SYMFONY_CONSOLE) doctrine:schema:validate --skip-sync -vvv --no-interaction

phpfixer: ## Run PhpCsFixer globally (app)
	$(BIN_PHP) tools/php-cs-fixer/vendor/bin/php-cs-fixer fix -vvv --diff

phpfixer-to-gitlab: ## Run PhpCsFixer globally (app)
	$(BIN_PHP) tools/php-cs-fixer/vendor/bin/php-cs-fixer fix --dry-run -vvv --diff

phpstan: ## Run PhpStan globally (app)
phpstan: phpstan.dist.neon
	$(BIN_PHP) vendor/bin/phpstan analyse public src tests --level=max -c phpstan.dist.neon --memory-limit=2G

##-----------------------------------------
## TESTS
##-----------------------------------------

behat: ## Run all units tests (app)
	$(BIN_PHP) vendor/bin/behat --colors

phpunit: ## Run all units tests (app)
phpunit: phpunit-test phpunit-test-coverage

phpunit-test: ## Run unit tests (app)
	@echo -e '\nReport : \e]8;;YourNameDomain/tests-report/test-testdox.html\ahttps://YourNameDomain/tests-report/test-testdox.html\e]8;;\a'
	$(BIN_PHP) vendor/bin/simple-phpunit --testdox --testdox-html public/tests-report/test-testdox.html

phpunit-test-coverage: ## Run unit tests with coverage (app)
	@echo -e '\nReport : \e]8;;https://YourNameDomain/tests-report/test-coverage/index.html\ahttps://YourNameDomain/tests-report/test-coverage/index.html\e]8;;\a'
	XDEBUG_MODE=coverage $(BIN_PHP) vendor/bin/simple-phpunit --coverage-text --coverage-html public/tests-report/test-coverage

phpunit-test-to-gitlab: ## Run unit tests (app)
	$(BIN_PHP) vendor/bin/simple-phpunit --testdox --testdox-xml app/public/tests-report/phpunit-report.xml

phpunit-test-coverage-to-gitlab: ## Run unit tests with coverage (app)
	XDEBUG_MODE=coverage $(BIN_PHP) vendor/bin/simple-phpunit --log-junit app/public/tests-report/phpunit-report.xml --coverage-cobertura app/public/tests-report/phpunit-coverage.xml --coverage-text --testdox --colors=never

##-----------------------------------------
## DATABASE
##-----------------------------------------

db-load-latest: ## Load latest SQL file - depending env
	$(SYMFONY_CONSOLE) doctrine:database:drop --force
	$(SYMFONY_CONSOLE) doctrine:database:create
	$(SYMFONY_CONSOLE) doctrine:database:import latest.$(ENV).sql

db-with-fixture: 
	$(SYMFONY_CONSOLE) doctrine:fixtures:load

##-----------------------------------------
## .ENV FILES
##-----------------------------------------

generate-env-files: ## Generate env files (from .env.dist)
generate-env-files: generate-env

ifeq ($(OS), Windows_NT)
generate-env: ## Generate .env (windows)
generate-env: .env.dist
	@if exist .env; then \
		echo '.env already exists';\
	else \
		echo cp .env.dist .env; \
		cp .env.dist .env; \
  	fi
else
generate-env: ## Generate .env (unix)
generate-env: .env.dist
	@if [ -f .env ]; then \
		echo '.env already exists';\
	else \
		echo cp .env.dist .env; \
		cp .env.dist .env; \
  	fi
endif

switch-env-develop: ## Generate .env  (.settings/files/.env.develop - no docker)
switch-env-develop: .settings/files/.env.develop
	@ echo cp .settings/files/.env.develop .env; \
	cp .settings/files/.env.develop .env;

switch-env-develop-docker: ## Generate .env (.settings/files/.env.develop.docker - docker)
switch-env-develop-docker: .settings/files/.env.develop.docker
	@ echo cp .settings/files/.env.develop.docker .env; \
	cp .settings/files/.env.develop.docker .env;

##-----------------------------------------
## APPLICATION
##-----------------------------------------

fix-folders-files: ## Fix folders and files
fix-folders-files:
	- bin/shared/fix-folders-files.sh

##-----------------------------------------
## TOOLS
##-----------------------------------------

front-dev-build: ## Build front for dev
	yarn install && yarn encore dev

front-dev-watch: ## Watch front for dev
	yarn && yarn dev --watch

front-production-build: ## Build front for production
	yarn install && yarn encore production

##-----------------------------------------
## COMPOSER
##-----------------------------------------

composer-install: ## Install bundles of symfony whit composer
	@echo "Install bundles of symfony whit compose"
	composer install

composer-update: ## Composer updata
	- composer update
```