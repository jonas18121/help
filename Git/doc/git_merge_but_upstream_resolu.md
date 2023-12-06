# Erreur no merge sur derveur distant (résolu)

Dans la pipeline il y a "updated upstream into a topic branch" qui s'affiche à l'infinit juste après le "git pull origin staging"

Exemple : 

```bash
git pull origin staging  
remote: Enumerating objects: 117, done.
remote: Counting objects: 100% (86/86), done.
remote: Compressing objects: 100% (28/28), done.
remote: Total 36 (delta 25), reused 17 (delta 8), pack-reused 0
Unpacking objects: 100% (36/36), 3.85 KiB | 85.00 KiB/s, done.
From gitlab.com:User18121/homeStockGitlab
 * branch              staging    -> FETCH_HEAD
   da999969..aab71483  staging    -> origin/staging
updated upstream into a topic branch.
...
```

### Utiliser les commandes ci-dessous dans gitLab-CI

```bash
git fetch origin staging  # Récupère les dernières modifications de la télécommande sans fusionner

git reset --hard origin/staging  # Réinitialise la branche locale pour qu'elle corresponde à la mise en scène distante

git pull origin staging  # Extraire les dernières modifications de la mise en scène distante    
```

### Résolution

Le message "updated upstream into a topic branch" indique que votre branche locale (dans ce cas, "staging") est mise à jour depuis la branche distante "staging". 

Voici une façon de faire :

```yml
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
        ssh -tt -p $SSH_PORT $SSH_USER@$SSH_HOST  << 'EOF'
        cd /var/www/projet
        git fetch origin staging
        git reset --hard origin/staging
        git pull origin staging 
        git add . 
        git commit -m "It's ok"
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

On inclut l'ajout de `git fetch origin staging` pour récupérer les derniers changements sans les fusionner dans votre branche locale. 

Ensuite, `git reset --hard origin/staging` réinitialise votre branche locale au dernier commit de la branche distante "staging". 

Enfin, `git pull origin staging` récupère les derniers changements et fusionne votre branche locale avec la branche distante "staging".

Assurez-vous de tester cela dans un environnement de test avant de l'appliquer à votre pipeline de production.