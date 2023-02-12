# Installer Composer sur un serveur distant

- [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-debian-11)

1. Commencez par mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
```

2. Vérifier la version de curl pour voir s'il existe puis l'installer s'il n'existe pas.
```ps
# Vérifier la version de curl pour voir s'il existe
curl --version

# Installer CURL
sudo apt install curl 
```

3. Assurez-vous que vous êtes dans votre répertoire personnel 
```ps
cd ~
```

4. Récupérez le programme d'installation en utilisant curl:
```ps
curl -sS https://getcomposer.org/installer -o composer-setup.php
```

5. Ensuite, vérifiez que le programme d'installation correspond au hachage SHA-384 du dernier programme d'installation trouvé sur la page Composer Public Keys / Signatures .<br> Pour faciliter l'étape de vérification, vous pouvez utiliser la commande suivante pour obtenir par programmation le dernier hachage de la page de composition <br>
et le stocker dans une variable shell :
```ps
HASH=`curl -sS https://composer.github.io/installer.sig`
```

6. Pour afficher la valeur obtenue, exécutez :
```ps
echo $HASH
```

```ps
# retourne
55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae
```

7. Exécutez maintenant le code PHP suivant, tel qu'il est fourni sur la page de téléchargement de Composer , pour vérifier que le script d'installation peut être exécuté en toute sécurité :
```ps
php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

```ps
# Retourne 
Installer verified
```

Si vous recevez un message indiquant Installer corrupt, vous devez télécharger à nouveau le script d'installation et vérifier que vous utilisez le bon hachage.<br> 
Exécutez ensuite la commande pour vérifier à nouveau le programme d'installation. <br>
Une fois que vous avez un programme d'installation vérifié, vous pouvez continuer.

8. Pour installer composerglobalement, utilisez la commande suivante pour télécharger et installer Composer en tant que commande système nommée composer sous `/usr/local/bin` :
```ps
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

```ps
# Retourne
All settings correct for using Composer
Downloading...

Composer (version 2.3.10) successfully installed to: /usr/local/bin/composer
Use it: php /usr/local/bin/composer
```

9. Testez votre installation en exécutant cette commande :
```ps
composer
```

```ps
# Retourne

  ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 2.3.10 2022-07-13 15:48:23

Usage:
  command [options] [arguments]

Options:
  -h, --help                     Display help for the given command. When no command is given display help for the list command
  -q, --quiet                    Do not output any message
  -V, --version                  Display this application version
      --ansi|--no-ansi           Force (or disable --no-ansi) ANSI output
  -n, --no-interaction           Do not ask any interactive question
      --profile                  Display timing and memory usage information
      --no-plugins               Whether to disable plugins.
      --no-scripts               Skips the execution of all scripts defined in composer.json file.
  -d, --working-dir=WORKING-DIR  If specified, use the given directory as working directory.
      --no-cache                 Prevent use of the cache
  -v|vv|vvv, --verbose           Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
. . .
```

## Erreur
S"il y a l'erreur ci-dessous , il faut creer un user normale dans le serveur distant (Aller voir le fichier `creer_un_utilisateur.md`)

`Do not run Composer as root/super user! See https://getcomposer.org/root for details`

Le message "Ne pas exécuter Composer en tant que root/super user!" n'est qu'un avertissement. <br>
Il est dangereux d'exécuter composer en tant qu'utilisateur root car, selon ce que vous installez, un code malveillant peut être exécuté et disposer de tous les droits sur votre système.