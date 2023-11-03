# GITLAB CI SANS DOCKER ET GITLAB CI AVEC DOCKER

https://docs.gitlab.com/ee/ci/testing/test_coverage_visualization.html

## GITLAB CI SANS DOCKER

```yml
image: php:7.4

cache:
  paths:
    - vendor/
      
before_script:
  - cd app
  - curl -sSk https://getcomposer.org/installer | php -- --disable-tls && mv composer.phar /usr/local/bin/composer 
  - zip # on install extension php zip
  - composer install # execution de composer install 
  - composer require symfony/webpack-encore-bundle
  - rm -rf node_modules && yarn add --dev @symfony/webpack-encore && yarn add @babel/plugin-proposal-class-properties && yarn add @babel/core add && yarn install

stages:
  - build
  # - security 
  - quality
  - tests
  - deploy

lint:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - ./bin/console lint:yaml config --parse-tags
    - ./bin/console lint:twig templates --env=prod
    - ./bin/console lint:container --no-debug
    - ./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction
  allow_failure: false # or true

phpstan:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - vendor/bin/phpstan analyse src tests --level=max -c phpstan.dist.neon --memory-limit=2G
  allow_failure: false # or true

phpcsfixer:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - tools/php-cs-fixer/vendor/bin/php-cs-fixer fix -vvv --diff --dry-run
  allow_failure: false # or true

## Ne fonctionne pas, pas de connexion à la BDD 
phpunit:
  stage: tests
  except:
    - staging
    - preproduction
    - production
  variables:
    # DATABASE_URL: "mysql://root:@127.0.0.1:3306/home_stock_gitlab_test?serverVersion=5.7"
    MYSQL_HOST: 127.0.0.1
    MYSQL_PORT: 3306
    MYSQL_DATABASE: home_stock_gitlab_test
    MYSQL_USER: root
  script:
    - vendor/bin/simple-phpunit --testdox --testdox-html public/tests-report/test-testdox.html
  allow_failure: false # or true

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
        cd /var/www/homeStockGitlab/app
        git pull origin staging  
        rm -f .env && cp .settings/files/.env.$ENVIRONMENT .env
        composer install --prefer-dist --optimize-autoloader --classmap-authoritative --ignore-platform-reqs --no-interaction
        APP_ENV=prod APP_DEBUG=0 
        bin/console cache:clear
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
    - bash -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'
    - | 
        ssh -tt -p $SSH_PORT $SSH_USER@$SSH_HOST  << EOF 
        cd /var/www/homeStockGitlab/app
        git pull origin production  
        rm -f .env && cp .settings/files/.env.$ENVIRONMENT .env
        composer install --prefer-dist --optimize-autoloader --classmap-authoritative --ignore-platform-reqs --no-interaction
        APP_ENV=prod APP_DEBUG=0 
        bin/console cache:clear
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

## GITLAB CI AVEC DOCKER (Makefile)

```yml
image: php:7.4

cache:
  paths:
    - vendor/
      
before_script:
  - curl -sSk https://getcomposer.org/installer | php -- --disable-tls && mv composer.phar /usr/local/bin/composer 
  - zip # on install extension php zip
  - make install-full-fixture

stages:
  # - security 
  - quality
  - tests
  - deploy

lint:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - make lint
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

phpcsfixer:
  stage: quality
  except:
    - staging
    - preproduction
    - production
  script:
    - make phpfixer
  allow_failure: false # or true

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
    - make phpunit-test
  allow_failure: false # or true

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
        cd /var/www/homeStockGitlab/app
        git pull origin staging  
        rm -f .env && cp .settings/files/.env.$ENVIRONMENT .env
        composer install --prefer-dist --optimize-autoloader --classmap-authoritative --ignore-platform-reqs --no-interaction
        APP_ENV=prod APP_DEBUG=0 
        bin/console cache:clear
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
    - bash -c 'ssh-add <(echo "$SSH_PRIVATE_KEY")'
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> ~/.ssh/config'
    - | 
        ssh -tt -p $SSH_PORT $SSH_USER@$SSH_HOST  << EOF 
        cd /var/www/homeStockGitlab/app
        git pull origin production  
        rm -f .env && cp .settings/files/.env.$ENVIRONMENT .env
        composer install --prefer-dist --optimize-autoloader --classmap-authoritative --ignore-platform-reqs --no-interaction
        APP_ENV=prod APP_DEBUG=0 
        bin/console cache:clear
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