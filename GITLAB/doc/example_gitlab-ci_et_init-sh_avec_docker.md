# Exemple de gitlab-ci.yml et init.sh qui contient du Docker et du php

```yml
# project/gitlab-ci.yml

image: 
  name: docker:latest
  entrypoint: ["/bin/sh", "-c"]


cache:
  paths:
    - vendor/

services:
  - docker:dind

variables:
  DOCKER_DRIVER: overlay2
  GIT_STRATEGY: clone
  DOCKER_TLS_CERTDIR: ""
  DOCKER_HOST: tcp://docker:2375
  # DOCKER_HOST: tcp://localhost:2375/
  # DOCKER_HOST: tcp://docker-host:2375/
      
before_script:
  # - export PATH=$PATH:/usr/sbin  # Assurez-vous que le chemin pour iptables est configuré
  # - echo "Building and running Docker in privileged mode"
  # - docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
  # - docker info
  - chmod +x init.sh
  - sh ./init.sh
  - zip --version
  # - apt-get update && apt-get install zip -y # on install extension php zip 
  - docker-compose --version
  - php --version
  - make --version
  - docker info
  - make install-full-fixture 

stages:
  # - security 
  - quality
  - tests
  - deploy

### Quality ###
lint:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - make lint
  allow_failure: false # or true

phpcsfixer:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - make phpfixer-to-gitlab
  allow_failure: false # or true

phpstan:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - make phpstan
  allow_failure: false # or true

### Tests ###
phpunit:
  stage: tests
  except:
    - staging
    - preproduction
    - production
  variables:
    MYSQL_HOST: 127.0.0.1
    MYSQL_PORT: 3306
    MYSQL_DATABASE: home_stock_gitlab_test
    MYSQL_USER: root
  script:
    - export XDEBUG_MODE=coverage
    - make phpunit-to-gitlab
  artifacts:
    when: always
    paths:
      - app/public/tests-report/ # Spécifiez le dossier qui contient vos rapports
    reports:
      junit: app/public/tests-report/phpunit-report.xml # Fichier creer manuellement
      coverage_report:
        coverage_format: cobertura
        path: app/public/tests-report/phpunit-coverage.xml # Fichier creer manuellement
  coverage: '/^\s*Lines:\s*\d+.\d+\%/'
  allow_failure: false # or true

### Env ###
staging:
  stage: deploy
  only: 
    - staging
  script:
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client git -y )'
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - eval $(ssh-agent -s)
    - bash -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'
    - | 
        ssh -tt -p $SSH_PORT $SSH_USER@$SSH_HOST  << EOF 
        cd /var/www/homeStockGitlab
        git pull origin staging  
        cd app
        rm -f .env && cp .settings/files/.env.$ENVIRONMENT .env
        composer install --prefer-dist --optimize-autoloader --classmap-authoritative --ignore-platform-reqs --no-interaction
        APP_ENV=prod APP_DEBUG=0 
        bin/console cache:clear
        chmod 777 -R public/uploads
        yarn install && yarn dev  
        exit
        EOF
  variables:
    ENVIRONMENT: staging
    ENVIRONMENT_SYMFONY: staging 
    PROJECT_PATH: "$PROJECT_PATH_STAGING" # Not using at the moment 
    SSH_PORT: "$SSH_PORT_STAGING"
    SSH_USER: "$SSH_USER_STAGING"
    SSH_HOST: "$SSH_HOST_STAGING"
    SSH_PRIVATE_KEY: "$SSH_PRIVATE_KEY_STAGING"
```

```sh
# project/init.sh

#!/bin/sh

apk add --no-cache docker-cli docker-cli-compose
apk add --no-cache php php-phar php-iconv php-mbstring
apk --update add curl zip make sudo nmap

# Vérification de l'état du service Docker sans systemctl
if ! ps | grep -v grep | grep dockerd > /dev/null; then
  echo "Docker daemon is not running. Starting Docker daemon..."
  dockerd &
  sleep 5  # Attendez quelques secondes que Docker Daemon démarre
fi

# Configuration iptables si nécessaire
if ! iptables -t nat -L | grep -q DOCKER; then
  echo "Setting up iptables for Docker..."
  sudo iptables -t nat -N DOCKER
fi

# Ajout de l'utilisateur au groupe Docker
if id -nG "$USER" | grep -qw docker; then
  echo "User $USER is already in the docker group."
else
  echo "Adding user $USER to the docker group..."
  addgroup -g $(stat -c "%g" /var/run/docker.sock) docker
  adduser $USER docker
fi

curl -sSk https://getcomposer.org/installer | php -- --disable-tls && mv composer.phar /usr/local/bin/composer



# apk add --no-cache docker-compose
# apk add --no-cache php
# apk --update add curl zip make
# apk add --no-cache sudo
# apk add --no-cache php-phar
# apk add --no-cache php-iconv
# apk add --no-cache php-mbstring
# systemctl start docker
# systemctl status docker
# chown $USER:docker /var/run/docker.sock  # Note: Cette ligne est commentée car elle nécessite un utilisateur existant
# apk add nmap
# sudo iptables -t nat -N DOCKER
# dockerd 
# nmap -sT -p- docker
# usermod -aG docker $USER

# Vérification de l'état du service Docker sans systemctl
# if ps | grep -v grep | grep dockerd > /dev/null; then
#   echo "Docker daemon is running."
# else
#   echo "Docker daemon is not running. Starting Docker daemon..."
#   dockerd &
#   sleep 5  # Attendez quelques secondes que Docker Daemon démarre
# fi

# # Reste de votre script
# usermod -aG docker $USER
```
