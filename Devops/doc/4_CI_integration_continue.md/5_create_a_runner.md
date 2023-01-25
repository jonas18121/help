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


1. **On Crée le runner sous docker**
```ps
# Créer un répertoire
sudo mkdir -p /data/ 

docker run -d \                                                     # Run docker

--name Jonas-runner \                                               # Donner un nom au container runner 

--restart always \                                                  # On lui dit de toujours redémarrer

-v /var/run/docker.sock:/var/run/docker.sock \                      # Monter le volume de la socket docker

-v /data/gitlab-runner/config:/etc/gitlab-runner \                   # Monter le volume pour stocker sa configuration, si on veut redémarrer ect...

gitlab/gitlab-runner:latest                                         # L'image du runner dans sa dernière version
```

2. **On configure le DNS de l'instance gitlab**

Cette partie n'est pas terminer




## Créer un runner manuellement sous Linux : Debian ou Ubuntu

```ps
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
# --url "http://jonas1812/"
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

```ps
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