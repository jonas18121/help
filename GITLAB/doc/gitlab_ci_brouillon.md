# Bouillon pour faire des tests dans gitlab-ci.yml

```yaml
# image: 
#   name: docker:latest
#   entrypoint: ["/bin/sh", "-c"]

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
  # PROJECT_DIR: "/builds/Jonas18121/homeStockGitlab/build"
      
# before_script:
#   - chmod +x init.sh
#   - sh ./init.sh
#   # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
#   - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
#   - docker info
#   - apk add --no-cache make
#   - apt-get update && apt-get install make -y
#   - chmod +x init.sh
#   - sh ./init.sh
#   # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
#   - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
#   - docker info
#   - make install-full-fixture 

stages:
  # - security 
  # - build
  - quality
  - tests
  - deploy

# =========== #
# Templates
# =========== #
# .build: &build
#   stage: build
#   script:
#     # - chmod +x init.sh
#     # - sh ./init.sh
#     # # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
#     # - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
#     # - docker info
#     - make install-full-fixture 
#     - mkdir -m 777 build
#   artifacts:
#     paths:
#       - "/builds/Jonas18121/homeStockGitlab/build"
#     expire_in: 30 days
#   allow_failure: false # or true

# Définition de l'ancre spécifique à quality:lint, basée sur l'ancre build
# .quality: &quality
#   <<: *build

# .quality: &quality
#   stage: quality
#   image: 
#     name: docker:latest
#     entrypoint: ["/bin/sh", "-c"]
#   before_script:
#     - chmod +x init.sh
#     - sh ./init.sh
#     # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
#     - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
#     - docker info
#   script:
    
#     # - chmod +x init.sh
#     # - sh ./init.sh
#     # # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
#     # - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
#     # - docker info
#     - make install-full-fixture 
#     - ls 
#     # - mkdir -m 777 build
#     # - ls 
#   artifacts:
#     paths:
#       # - builds/Jonas18121/homeStockGitlab/build
#       # - build
#       - app/vendor
#       - app/var
#     expire_in: 30 days
#   allow_failure: false # or true

# =========== #
# Temporary
# =========== #

### Load Template build in build:tmp
# build:tmp:
#   <<: *build
#   except:
#     - develop
#     - staging
#     - preproduction
#     - master
#     - tags
#   environment:
#     name: develop
#   variables:
#     ENVIRONMENT: develop
#     ENVIRONMENT_SYMFONY: dev

# quality:tmp:
#   <<: *quality
#   except:
#     - develop
#     - staging
#     - preproduction
#     - master
#     - tags
#   environment:
#     name: develop
#   variables:
#     ENVIRONMENT: develop
#     ENVIRONMENT_SYMFONY: dev


# quality:linter:
#   <<: *quality
#   except:
#     - develop
#     - staging
#     - preproduction
#     - master
#     - tags
#   environment:
#     name: develop
#   variables:
#     ENVIRONMENT: develop
#     ENVIRONMENT_SYMFONY: dev
#   script:
#     - ls
#     - make lint
#   allow_failure: false # or true

# =========== #
# Quality
# =========== #
quality:lint:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  image: 
    name: docker:latest
    entrypoint: ["/bin/sh", "-c"]
  before_script:
    - chmod +x init.sh
    - sh ./init.sh
    # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
    - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
    - docker info
    - make install-full-fixture 
  script:
    - ls
    - make lint
  allow_failure: false # or true

quality:phpcsfixer:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  image: 
    name: docker:latest
    entrypoint: ["/bin/sh", "-c"]
  before_script:
    - chmod +x init.sh
    - sh ./init.sh
    # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
    - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
    - docker info
    - make install-full-fixture 
  script:
    - make phpfixer-to-gitlab
  allow_failure: false # or true

quality:phpstan:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  image: 
    name: docker:latest
    entrypoint: ["/bin/sh", "-c"]
  before_script:
    - chmod +x init.sh
    - sh ./init.sh
    # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
    - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
    - docker info
    - make install-full-fixture 
  script:
    - make phpstan
  allow_failure: false # or true

# =========== #
# Tests
# =========== #
tests:phpunit:
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
  image: 
    name: docker:latest
    entrypoint: ["/bin/sh", "-c"]
  before_script:
    - chmod +x init.sh
    - sh ./init.sh
    # - docker login -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN} registry.gitlab.com # https://blog.stephane-robert.info/post/gitlab-container-docker-registry/
    - echo "$CI_JOB_TOKEN" | docker login -u "$CI_REGISTRY_USER" --password-stdin $CI_REGISTRY
    - docker info
    - make install-full-fixture 
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

# =========== #
# Env
# =========== #
staging:
  stage: deploy
  only: 
    - staging
  script:
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client git -y )'
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - eval $(ssh-agent -s)
    - sh -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'
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

production:
  stage: deploy
  only:
    - production
  script:
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client git -y )'
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - eval $(ssh-agent -s)
    - sh -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'
    - | 
        ssh -tt -p $SSH_PORT $SSH_USER@$SSH_HOST  << EOF 
        cd /var/www/homeStockGitlab/app
        git pull origin production  
        rm -f .env && cp .settings/files/.env.$ENVIRONMENT .env
        composer install --prefer-dist --optimize-autoloader --classmap-authoritative --ignore-platform-reqs --no-interaction
        APP_ENV=prod APP_DEBUG=0 
        bin/console cache:clear
        chmod 777 -R public/uploads
        yarn install && yarn dev  
        exit
        EOF
  variables:
    ENVIRONMENT: production
    ENVIRONMENT_SYMFONY: production
    PROJECT_PATH: "$PROJECT_PATH_PROD"
    SSH_PORT: "$SSH_PORT_PROD"
    SSH_USER: "$SSH_USER_PROD"
    SSH_HOST: "$SSH_HOST_PROD"
    SSH_PRIVATE_KEY: "$SSH_PRIVATE_KEY_PROD"
```