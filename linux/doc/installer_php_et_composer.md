# Comment installer et utiliser Composer sur Ubuntu

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04-fr


## Introduction

Composer est un outil populaire de gestion des dépendances pour PHP, créé principalement pour faciliter l'installation et les mises à jour des dépendances des projets. 

Il vérifiera de quels autres paquets un projet spécifique dépend et les installera pour vous en utilisant les versions appropriées selon les exigences du projet. 

Composer est également couramment utilisé pour lancer de nouveaux projets basés sur des cadres PHP populaires tels que Symfony et Laravel.

Dans ce tutoriel, vous allez installer et commencer à utiliser Composer sur un système Ubuntu 20.04.

### Conditions préalables

Pour pouvoir suivre ce guide, vous devez avoir accès à un serveur Ubuntu 20.04 en tant que non-root sudo user, et un pare-feu activé sur votre serveur. Pour configurer cela, vous pouvez notre guide de configuration initiale du serveur pour Ubuntu 20.04.

## Étape 1 - Installer PHP et des dépendances supplémentaires

En plus des dépendances qui devraient déjà être incluses dans votre système Ubuntu 20.04, telles quegit et curl, Composer nécessite php-cli pour exécuter les scripts PHP en ligne de commande, et unzip pour extraire les archives zippées.   Nous allons maintenant installer ces dépendances.

Tout d'abord, mettez à jour le cache du gestionnaire de paquets en exécutant :

    > sudo apt update

Ensuite, exécutez la commande suivante pour installer les paquets requis :

    > sudo apt install php-cli unzip

Vous serez invité à confirmer l'installation en tapant `Y` et ensuite `ENTER`.

Une fois les prérequis installés, vous pouvez procéder à l'installation de Composer.

### Étape 2 - Téléchargement et installation de Composer

Composer fournit un script d'installation écrit en `PHP`. Nous allons le télécharger, vérifier qu'il n'est pas corrompu, puis l'utiliser pour installer Composer.

Assurez-vous que vous êtes dans votre répertoire d'origine, puis récupérez l'installateur en utilisant curl : 

    > cd ~

    > curl -sS https://getcomposer.org/installer -o composer-setup.php

Ensuite, nous allons vérifier que l'installateur téléchargé correspond au hachage SHA-384 pour le dernier installateur trouvé sur la page des clés publiques/signatures de Composer.   Pour faciliter l'étape de vérification, vous pouvez utiliser la commande suivante pour obtenir par programmation le dernier hachage de la page de Composer et le stocker dans une variable shell :

    > HASH=`curl -sS https://composer.github.io/installer.sig`

Si vous voulez vérifier la valeur obtenue, vous pouvez exécuter :

    > echo $HASH

    Output
    e0012edf3e80b6978849f5eff0d4b4e4c79ff1609dd1e613307e16318854d24ae64f26d17af3ef0bf7cfb710ca74755a

Exécutez maintenant le code PHP suivant tel que fourni dans la page de téléchargement de Composer pour vérifier que le script d'installation peut être exécuté en toute sécurité : 

    > php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

Vous verrez la sortie suivante :

    Installer verified

Si la sortie indique que l'installateur est corrompu, vous devrez télécharger à nouveau le script d'installation et vérifier que vous utilisez le bon hachage. Ensuite, répétez le processus de vérification. Lorsque vous avez un installateur vérifié, vous pouvez continuer.

Pour installer Composer globalement, utilisez la commande suivante qui téléchargera et installera Composer sous la forme d'une commande système nommée composer, sous /usr/local/bin :


    > sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

Vous verrez une sortie semblable à celle-ci :

    Output

        All settings correct for using Composer
        Downloading...

        Composer (version 1.10.5) successfully installed to: /usr/local/bin/composer
        Use it: php /usr/local/bin/composer

Pour tester votre installation, exécutez :

    > composer


    Output
        ______
        / ____/___  ____ ___  ____  ____  ________  _____
        / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
        / /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
        \____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                            /_/
        Composer version 1.10.5 2020-04-10 11:44:22

        Usage:
        command [options] [arguments]

        Options:
        -h, --help                     Display this help message
        -q, --quiet                    Do not output any message
        -V, --version                  Display this application version
            --ansi                     Force ANSI output
            --no-ansi                  Disable ANSI output
        -n, --no-interaction           Do not ask any interactive question
            --profile                  Display timing and memory usage information
            --no-plugins               Whether to disable plugins.
        -d, --working-dir=WORKING-DIR  If specified, use the given directory as working directory.
            --no-cache                 Prevent use of the cache
        -v|vv|vvv, --verbose           Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
        ...


Cela permet de vérifier que Composer a été installé avec succès sur votre système et qu'il est disponible dans tout le système.