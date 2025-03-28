# Créer un runner

### Site :
[Créer un runner sous docker](https://docs.gitlab.com/runner/install/docker.html)

[Créer un runner manuellement sous Linux](https://docs.gitlab.com/runner/install/linux-manually.html)

### Vidéo :
[Lancer son premier runner et son premier pipeline](https://www.youtube.com/watch?v=vPrwq2h8MGk)

[Installer un runner et executor docker](https://www.youtube.com/watch?v=Wbaczrx-US0)

### param
[Paramétrer les runner dans gitlab](https://gitlab.com/jonas1812/learn/-/settings/ci_cd)

## Créer un runner sous docker

1. Désactiver runner partager dans gitlab

2. **On Crée le runner sous docker**
```sh
# Créer un répertoire
sudo mkdir -p /data/ 

# Puis 

docker run -d \                                                     # Run docker

--name Jonas-runner-docker \                                        # Donner un nom au container runner 

--restart always \                                                  # On lui dit de toujours redémarrer

-v /var/run/docker.sock:/var/run/docker.sock \                      # Monter le volume de la socket docker

-v /data/gitlab-runner/config:/etc/gitlab-runner \                   # Monter le volume pour stocker sa configuration, si on veut redémarrer ect...

gitlab/gitlab-runner:latest                                         # L'image du runner dans sa dernière version

############################################################################################################################################

## Sans les commetaires #### 

sudo mkdir -p /data/ 

# Puis 

docker run -d \
--name Jonas-runner-docker \
--restart always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /data/gitlab-runner/config:/etc/gitlab-runner \
gitlab/gitlab-runner:latest
```

Executer le runner sous docker
```ps
docker exec -it Jonas-runner-docker gitlab-runner register
```

Après la commande ci-dessus on va de renter quelques valeurs

```ps
Enter the GitLab instance URL (for example, https://gitlab.com/):
https://gitlab.com/ # valeur

Enter the registration token:
GR1kskjhdhgdj348941ETaK2jdhdSJqzE86hdhdjswxRYd86q # valeur pris dans le Setting > CI/CD > runners

Enter a description for the runner:
[fb194c3b4225]: Jonas-runner-docker # valeur

Enter tags for the runner (comma-separated):
docker, debian # valeur

Enter optional maintenance note for the runner:
ok # valeur

Enter an executor: parallels, ssh, virtualbox, docker-ssh+machine, kubernetes, custom, docker-ssh, docker+machine, instance, docker, shell: # Spécifier un executeur
docker # valeur

Enter the default Docker image (for example, ruby:2.7): # L'image docker qui va être utiliser
debian:latest # valeur


Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
```

Le lancer une pipepline, normalement tout est bon

3. **On configure le DNS de l'instance gitlab** (cette partie est facultative)

```sh
cat /etc/hosts # voir le hosts 
sudo nano /etc/hosts # modifier le hosts
sudo nano /etc/gitlab/gitlab.rb # Modifier gitlab.rb
gitlab-ctl reconfigure # Recharger la configuration
```

4. Voir l'image docker dans le PC
```sh
docker ps

# retour
685cfbf3a89e   5c8936e57a38                  "sh -c 'if [ -x /usr…"   38 seconds ago   Up 37 seconds             runner-twaqwpc-project-42796794-concurrent-0-5b3ff8b314589eeb-build-2 # temporaire le temps de l'execution de la pipepline
fb194c3b4225   gitlab/gitlab-runner:latest   "/usr/bin/dumb-init …"   37 minutes ago   Up 37 minutes             Jonas-runner-docker
```

5. Voir les logs
```sh
docker logs runner-twaqwpc-project-42796794-concurrent-0-5b3ff8b314589eeb-build-2

docker logs -f runner-twaqwpc-project-42796794-concurrent-0-5b3ff8b314589eeb-build-2

# Exemple 
jonas@jonas18121 ~ $ docker logs -f runner-twaqwpc-project-42796794-concurrent-0-6e7fa9edabccac57-build-2
$ echo "Linting code... This will take about 10 seconds."
Linting code... This will take about 10 seconds.
$ sleep 200
$ echo "No lint issues found."
No lint issues found.
```





## Créer un runner manuellement sous Linux : Debian ou Ubuntu

1. Désactiver runner partager dans gitlab

```sh
# Télécharger le fichier .deb
curl -LJO "https://gitlab-runner-downloads.s3.amazonaws.com/latest/deb/gitlab-runner_amd64.deb"

# Installer le fichier
sudo dpkg -i gitlab-runner_amd64.deb

# Verifier si le runner est en place
sudo gitlab-runner status

# Se mettre en mode root
sudo -s

# Enregistrer le token qu'on prends dans setting > CI/CD > Runners > And this registration token:
# Et on le mets dans une variable d'environnement
export REGISTRATION_TOKEN="my_token"

# Enregister le runner
gitlab-runner register --url https://gitlab.com/ --registration-token $REGISTRATION_TOKEN

# Quelques arguments utiles pour Enregister le runner
# --non-interactive : le rendre non interactive
# --url "https://gitlab.com/"
# --registration-token $REGISTRATION_TOKEN "my_token"
# --executor "shell" ; on execute en shell
# --description "runner1"
# --tag-list "shell, runner" : liste de tag que l'on rattache, on mette (shell, linux)
# --run-untagged
# --locked="false"

# Voir la configuration du runner dans un fichier .toml
cat /etc/gitlab-runner/config.toml
```

## autre façon de faire sous linux

```sh
# Download the binary for your system
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Give it permission to execute
sudo chmod +x /usr/local/bin/gitlab-runner

# Create a GitLab Runner user
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

# Install and run as a service
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start

sudo gitlab-runner register --url https://gitlab.com/ --registration-token YOUR_TOKEN_FROM_GITLAB_CICD_SETTING_RUNNER
```

### Exemple

Si les commandes ci-dessus on déjà été exécuter pour créer un autre runner spécifique par exemple, il suffit juste d'exécuter la commande ci-dessous,

1. pour enregistrer le runner de manière spécifique en ajoutant le token du projet spécifique.
```sh
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

2. Démarrer manuellement avec la commande ci-dessous
```sh
gitlab-runner run
```
3. Si il y a une erreur /home/user_name/.gitlab-runner/config.toml

`ERROR: Failed to load config stat /home/user_name/.gitlab-runner/config.toml: no such file or directory  builds=0 max_builds=1
`

Allez dans ce dossier `/etc/gitlab-runner` et copier le fichier `config.toml` pour le coller dans `/home/user_name/.gitlab-runner/`

4. Si on veut utiliser du Docker dans la pipeline de Gitlab, il faudra mettre en true le module `privileged` qui ce trouve dans les différents fichiers `config.toml` qu'on a généré : `/home/user_name/.gitlab-runner/config.toml` et `/etc/gitlab-runner/config.toml` 

- [Utiliser l'exécuteur Docker](https://docs.gitlab.com/runner/executors/docker.html#use-the-docker-executor)

- [Chercher gitlab-runner.runners.privileged=true dans ce lien](https://gitlab.com/gitlab-org/charts/gitlab/-/issues/478)

Ex : 
```sh
# /home/user_name/.gitlab-runner/config.toml

concurrent = 4

[[runners]]
name = "myRunner"
url = "https://gitlab.com/ci"
token = "......"
executor = "docker"
[runners.docker]
  tls_verify = true
  image = "my.registry.tld:5000/alpine:latest"
  privileged = true
  disable_entrypoint_overwrite = false
  oom_kill_disable = false
  disable_cache = false
  volumes = [
    "/cache",
  ]
  shm_size = 0
  allowed_pull_policies = ["always", "if-not-present"]
  allowed_images = ["my.registry.tld:5000/*:*"]
  allowed_services = ["my.registry.tld:5000/*:*"]
  [runners.docker.volume_driver_ops]
    "size" = "50G"
```

`privileged = false` était sur false et on la modifié à true maintenant `privileged = true`

5. Ensuite relancez 

```sh
gitlab-runner run
```

## Voir fichier hosts + Modifier gitlab.rb + Recharger la configuration
```sh
cat /etc/hosts # voir le hosts 
sudo nano /etc/hosts # modifier le hosts
sudo nano /etc/gitlab/gitlab.rb # Modifier gitlab.rb
gitlab-ctl reconfigure # Recharger la configuration
```


# Si erreur :
```ps
FATAL: Failed to install gitlab-runner: Init already exists: /etc/systemd/system/gitlab-runner.service 
```
Vous pouvez simplement supprimer ce fichier :
```ps
rm /etc/systemd/system/gitlab-runner.service
```
Ou alors:
```ps
gitlab-runner uninstall
```
Et puis réinstallez gitlab-runner.

ou

Renommez le fichier init avec
```ps
sudo mv /etc/systemd/system/gitlab-runner.service  /etc/systemd/system/gitlab-runner.service.bak
```
et exécuter à nouveau
```ps
sudo gitlab-runner install --user=my-user --working-directory=/home/my-user
```

nettoyer le fichier de sauvegarde
```ps
sudo rm /etc/systemd/system/gitlab-runner.service.bak
```

Enfin, vous pouvez redémarrer le coureur avec service 
```ps
gitlab-runner start.
```

## Créer un shared runner (runner partager) manuellement sous Linux : Debian ou Ubuntu (il faut mettre la CB pour gitlab)

0. Activer runner partager dans gitlab

Vous pouvez créer un coureur de groupe pour votre instance GitLab autogérée ou pour GitLab.com. 

Vous devez avoir le rôle Propriétaire pour le groupe.

Pour créer un coureur de groupe :


1. [Installez GitLab Runner](https://docs.gitlab.com/runner/install/) .
2. Dans la barre supérieure, sélectionnez **Menu principal > Groupes et recherchez votre groupe**.
3. Dans la barre latérale gauche, sélectionnez **CI/CD > Runners** .
4. Dans le coin supérieur droit, sélectionnez **Enregistrer un coureur de groupe** .
5. Sélectionnez Afficher **les instructions d'installation et d'enregistrement de l'exécuteur** . Ces instructions incluent le jeton, l'URL et une commande pour enregistrer un coureur.

Alternativement, vous pouvez copier le jeton d'inscription et suivre la documentation pour savoir comment [inscrire un coureur](https://docs.gitlab.com/runner/register/) .

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
```
### Commande pour enregistrer le runner de manière partager

Si les commandes ci-dessus on déjà été exécuter pour créer des runner spécifique par exemple, il suffit juste d'exécuter la commande ci-dessous,

pour enregistrer le runner de manière partager en ajoutant le token du groupe au lieu de mettre le token d'un seul projet spécifique.

```ps
sudo gitlab-runner register --url https://gitlab.com/ --registration-token your_token_group_GR1zdzd
```

## Supprimer/Désinscrire un runner GitLab dans GitLab et dans le PC

1. Depuis Gitlab, supprimer le runner souhaité du projet ou du group au quel il est lier
2. Répertorier les coureurs pour obtenir leurs jetons et leurs URL :
```ps
sudo gitlab-runner list
```
Retour
```ps
jonas@jonas18121 ~ $ sudo gitlab-runner list
[sudo] Mot de passe de jonas : 
Runtime platform                                    arch=amd64 os=linux pid=75451 revision=12262148144 version=15.8.0
Listing configured runners                          ConfigFile=/etc/gitlab-runner/config.toml
jonas-runner                                        Executor=shell Token=mlfndkdnksnsssddxs_Zr-c2 URL=https://gitlab.com/
Jonas Shared Runner                                 Executor=shell Token=pdidndkddbdjbdjnddbbXtLN URL=https://gitlab.com/
```
3. Vérifiez avec l'option de suppression en spécifiant le jeton et l'URL du coureur :
```ps
sudo gitlab-runner verify --delete -t mlfndkdnksnsssddxs_Zr-c2 -u https://gitlab.com/
```
Retour
```ps
Runtime platform                                    arch=amd64 os=linux pid=75451 revision=12262148144 version=15.8.0
Running in system-mode.                            
                                                   
ERROR: Verifying runner... is removed               runner=kiFTHHSt
Updated /etc/gitlab-runner/config.toml 
```

4. Vérifiez dans le fichier /etc/gitlab-runner/config.toml si le runner a bien été supprimer.
```ps
sudo cat /etc/gitlab-runner/config.toml
```

Retour
```ps
concurrent = 1
check_interval = 0
shutdown_timeout = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "Jonas Shared Runner"
  url = "https://gitlab.com/"
  id = 7585455511
  token = "pdidndkddbdjbdjnddbbXtLN"
  token_obtained_at = 2023-02-04T10:41:06Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "shell"
  [runners.custom_build_dir]
  [runners.cache]
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
```

5. Le runner nommé **jonas-runner** à bien été supprimer

## Kill un runner

1. Voir si un runner est en cours

```bash
ps -ax | grep gitlab-runner

# Retour 

27034 ?        Ssl    0:06 /usr/bin/gitlab-runner run --working-directory /home/gitlab-runner --config /etc/gitlab-runner/config.toml --service gitlab-runner --syslog --user gitlab-runner
```


2. kill le runner via son id

```bash
sudo kill -9 27034
```

# commande

### Voir la liste des runners sous linux
```ps
sudo gitlab-runner list
```

