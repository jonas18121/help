# Créer un runner pour gitlab

## Aller voir dans ce fichier aussi help/Devops/doc/cours/4_CI_integration_continue/5_create_a_runner.md
Il contient beaucoup plus d'informations

## Créer un runner manuellement sous Linux : Debian ou Ubuntu

```ps
# Download the binary for your system
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Give it permission to execute
sudo chmod +x /usr/local/bin/gitlab-runner

# Create a GitLab Runner user
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

# Install and run as a service
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start

sudo gitlab-runner register --url https://gitlab.com/ --registration-token $REGISTRATION_TOKEN
```

### Exemple

Si les commandes ci-dessus on déjà été exécuter pour créer un autre runner spécifique par exemple, il suffit juste d'exécuter la commande ci-dessous,

pour enregistrer le runner de manière spécifique en ajoutant le token du projet spécifique.
```ps
jonas@jonas18121 ~/Bureau/developpementWeb/code/formation-ci-cd/symfony-gitlab (main)$ sudo gitlab-runner register --url https://gitlab.com/ --registration-token GR134894hdgdjdbdjknEcHAPyF
[sudo] Mot de passe de jonas : 
Runtime platform                                    arch=amd64 os=linux pid=658493 revision=12475144 version=15.8.0
Running in system-mode.                            
                                                   
Enter the GitLab instance URL (for example, https://gitlab.com/):

[https://gitlab.com/]: 

Enter the registration token:
[GR134894hdgdjdbdjknEcHAPyF]: 

Enter a description for the runner:
[jonas18121]: jonas-runner-symfony-gitlab

Enter tags for the runner (comma-separated):
docker,shell

Enter optional maintenance note for the runner:
jonas-runner-symfony-gitlab

WARNING: Support for registration tokens and runner parameters in the 'register' command has been deprecated in GitLab Runner 15.6 and will be replaced with support for authentication tokens. For more information, see https://gitlab.com/gitlab-org/gitlab/-/issues/380872 
Registering runner... succeeded                     runner=GR444444444444KVH3

Enter an executor: docker-ssh, parallels, shell, virtualbox, docker-ssh+machine, kubernetes, docker, ssh, docker+machine, instance, custom:
docker

Enter the default Docker image (for example, ruby:2.7):
php

Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
```