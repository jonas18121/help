# Fix Docker Permission Denied Error /var/run/docker.sock (lire jusqu'en bas)

J'ai installé Docker sur Ubuntu. C'était super facile. Mais lorsque j'ai essayé d'exécuter une commande docker, cela m'a renvoyé cette erreur :

```bash
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.39/containers/json: dial unix /var/run/docker.sock: connect: permission denied
```

Cela se produit également pour les commandes Docker de base telles que Docker PS.

L'erreur est essentiellement due au fait que l'utilisateur ne dispose pas de l'autorisation requise pour accéder au fichier docker.sock lors de l'exécution de Docker. La solution est assez simple.

## Correctif 1 : exécutez toutes les commandes Docker avec sudo

Si vous avez un accès sudo sur votre système, vous pouvez exécuter chaque commande docker avec sudo et vous ne verrez plus ce message « Autorisation refusée lors de la tentative de connexion au socket du démon Docker ».

```bash
sudo docker ps -

# Retourne 

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                    PORTS               NAMES
13dc0f4226dc        ubuntu              "bash"              17 hours ago        Exited (0) 16 hours ago                       container-2
2d9a8c190e6c        ubuntu              "/bin/bash"         17 hours ago        Created                                       container-1a
```

Mais exécuter chaque commande docker avec sudo est très gênant. 

Vous manquez d’ajouter sudo au début et vous obtiendrez à nouveau une erreur « autorisation refusée ».

## Correctif 2 : exécuter des commandes Docker sans sudo

Pour exécuter les commandes Docker sans sudo, vous pouvez ajouter votre compte utilisateur (ou le compte pour lequel vous essayez de résoudre ce problème) au groupe Docker.

1. Tout d'abord, créez le groupe Docker à l'aide de la commande groupadd. Le groupe existe peut-être déjà, mais exécuter la commande de création de groupe ne fera pas de mal.

```bash
sudo groupadd docker
```

2. Maintenant que vous disposez du groupe Docker, ajoutez votre utilisateur à ce groupe avec la commande usermod. Je suppose que vous essayez de le faire pour votre propre compte utilisateur et dans ce cas, vous pouvez utiliser la variable $ USER.

```bash
sudo usermod -aG docker $USER
```

3. Vérifiez que votre utilisateur a été ajouté au groupe Docker en répertoriant les utilisateurs du groupe. Vous devrez probablement vous déconnecter et vous reconnecter. 

```bash
group

# Retourne 

maino adm cdrom sudo dip plugdev dockers
```

4. Si vous vérifiez que vos groupes et les groupes Docker ne sont pas répertoriés même après vous être déconnecté, vous devrez peut-être redémarrer Ubuntu. Pour éviter cela, vous pouvez utiliser la commande newgrp comme ceci :

```bash
newgrp docker
```

Maintenant, si vous essayez d'exécuter les commandes docker sans sudo, cela devrait fonctionner correctement.

## Dépannage

Dans certains cas, vous devrez peut-être ajouter des autorisations supplémentaires à certains fichiers, surtout si vous avez déjà exécuté les commandes docker avec sudo.

Vous pouvez essayer de modifier la propriété du groupe du fichier /var/run/docker.sock.

```bash
sudo chown root:docker /var/run/docker.sock
```

Vous pouvez également essayer de modifier la propriété du groupe du répertoire ~/.docker.

```bash
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R

sudo chmod g+rwx "$HOME/.docker" -R
```

## Si docker fonctionne dans un terminal qui pointe vers la racine ubuntu mais ne fonctionne pas dans un terminal qui pointe vers le dossier d'un projet

Si docker fonctionne dans un terminal qui pointe vers la racine ubuntu, comme si dessous

```bash
user@userUbuntu123:~$ docker ps

# Retourne 

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                    PORTS               NAMES
13dc0f4226dc        ubuntu              "bash"              17 hours ago        Exited (0) 16 hours ago                       container-2
2d9a8c190e6c        ubuntu              "/bin/bash"         17 hours ago        Created  
```

Mais ne fonctionne pas dans un terminal qui pointe vers le dossier d'un projet, comme si dessous

```bash
user@userUbuntu123:~/Bureau/Dev/perso/projet$ docker ps

# Retourne 

permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied 
```

1. Depuis le terminal qui pointe vers le dossier du projet faite la commande suivante

```bash
user@userUbuntu123:~/Bureau/Dev/perso/projet$ newgrp docker
```

2. Puis docker ps et ça devrait fonctionner

```bash
user@userUbuntu123:~/Bureau/Dev/perso/projet$ docker ps

# Retourne 

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                    PORTS               NAMES
13dc0f4226dc        ubuntu              "bash"              17 hours ago        Exited (0) 16 hours ago                       container-2
2d9a8c190e6c        ubuntu              "/bin/bash"         17 hours ago        Created  
```