# mettre un projet manuellement sur un serveur distant


## mettre un projet manuellement sur un serveur distant avec CICD

1. Créer un dossier sur le serveur, depuis le terminal qui pointe sur ce serveur. Le chemin doit être `/var/www/`
```ps
mkdir var

cd var

mkdir www

cd www
```

2. Installer git dans le serveur distant

Depuis votre shell, installez Git en utilisant apt-get :
```ps
sudo apt-get update
sudo apt-get install git
```
Vérifiez que l'installation a réussi en tapant :git --version
```ps
git --version
```

3. Dans GitLab, aller dans le chemin : **Settings > Repository > Deploy Keys**
    - Copier-coller la clé publique qui permet de se connecter au serveur
        - Dans le champ key de **Deploy Keys**, mettre la clé publique qui permet de se connecter au serveur
        - Dans le champ title de **Deploy Keys**, mettre le nom du fichier qui contien la clé publique pour le reconnaitre rapidement
    - Ne cocher pas grant write permission (car on veur que ça soit uniquement en lecture)

4. Copier les clés de votre poste vers le serveur dans un terminal local

- **scp --p ~/.ssh/id_gitlab.pub** : Copier la clé publique sur notre PC
- **user@serveur** : Envoier la clé publique sur le serveur
- **:~/.ssh/** : coller la clé publique dans ce chemin du serveur

```ps
scp -p ~/.ssh/id_gitlab.pub user@serveur:~/.ssh/

scp -p ~/.ssh/id_gitlab user@serveur:~/.ssh/
```

Ou s'il faut préciser le port
```ps
scp -p -P 3022 ~/.ssh/id_gitlab.pub user@serveur:~/.ssh/

scp -p -P 3022 ~/.ssh/id_gitlab user@serveur:~/.ssh/
```
5. A utiliser sur le serveur si besoin (en fonction des cas)
```ps
cd ~/.ssh/
chmod 400 id_gitlab.pub
chmod 400 id_gitlab
```

6. Dans le serveur distant, créer un fichier config dans ~.ssh/, puis l'ouvrir avec nano 
```ps
touch config

nano config
```

7. Définir la clé à utiliser pour GitLab dans le fichier config du serveur distant :
- **Host** : nom de hôte
- **HostName** nom de hôte ou l'adresse IP du serveur distant
- **IdentityFile** : chemin d'accès à la clé privée associée à la clé publique utilisée pour l'authentification SSH
- **User** : nom de l'user, ce sera toujours si le repository vient de gitlab

```ps
Host gitlab.com
    HostName gitlab.com
    IdentityFile ~/.ssh/id_gitlab
    User git
```

8. Dans GitLab au chemin : **Settings > CI/CD > Variables > Add variables** on crée des variables
- Key : SSH_PRIVATE_KEY
    - Value : Le contenu de votre clé privée
- Key : SSH_HOST
    - Value : @ip -p {port} (ip+port de votre serveur ou  nom de domain)
- Key : SSH_USER
    - Value : nom de l'user (root ou autre)

FINI

9. gitlab CICD pour deployer le projet dans le serveur (git pull etc..)

10. 1. si on utilise apache :
    - Ouvrez le fichier de configuration d'Apache pour le site web, généralement nommé "000-default.conf" ou "default.conf" dans le répertoire "/etc/apache2/sites-available".
    - Modifiez la configuration du site web pour définir les paramètres nécessaires, tels que le nom d'hôte et le chemin du fichier de document racine. Par exemple :
```ps
    <VirtualHost *:80>
        ServerName localhost

        DocumentRoot /var/www/project/public
        DirectoryIndex /index.php

        <Directory /var/www/project/public>
            AllowOverride None
            Order Allow,Deny
            Allow from All

            FallbackResource /index.php
        </Directory>

        # uncomment the following lines if you install assets as symlinks
        # or run into problems when compiling LESS/Sass/CoffeeScript assets
        # <Directory /var/www/project>
        #     Options FollowSymlinks
        # </Directory>

        # optionally disable the fallback resource for the asset directories
        # which will allow Apache to return a 404 error when files are
        # not found instead of passing the request to Symfony
        <Directory /var/www/project/public/bundles>
            FallbackResource disabled
        </Directory>
        ErrorLog /var/log/apache2/project_error.log
        CustomLog /var/log/apache2/project_access.log combined

        # optionally set the value of the environment variables used in the application
        #SetEnv APP_ENV prod
        #SetEnv APP_SECRET <app-secret-id>
        #SetEnv DATABASE_URL "mysql://db_user:db_pass@host:3306/db_name"

        # Important : il faut mettre cette commande pour les utilisateurs d'Apache, 
        # afin d'utiliser les tokens dans postman par exemple
        SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
    </VirtualHost>
```
ou 

10. 2. OU si c'est nginx : Mettre la config nginx comme ci-dessus

dans `/var/www/projet$ `

    - Pour voir ce qu'il y a dans le dossier nginx
```ps
ls /etc/nginx
```
    - Pour voir ce qu'il y a dans le dossier sites-available de nginx    
```ps
ls /etc/nginx/sites-available
```   

    - Pour voir ce qu'il y a dans le dossier sites-available de apache2  
```ps
ls /etc/apache2/sites-available
```
    - sert a voir des commandes
```
certbot -h
```



## mettre un projet manuellement sur un serveur distant sans CICD
1) il faut creer un dossier pour le backend sur le serveur, depuis le terminal qui pointe sur ce serveur

    > mkdir var

    > cd var

    > mkdir www

    > cd www


le chemin doit être `/var/www/`

si on a mal créer le chemin et que le dossier a été supprimer alors qu'on était encore dedans, puis mettre le mot de passe du serveur
    
    sudo mkdir -p /var/www/my_app

ou 

    > cd ~

2) Après on peut utiliser les commandes de git mettre notre projet sur le serveur

    > git clone

    > git pull

    ect...


3) Puis on rentre dans le projet

    `/var/www/my_app/backend/api`


4) On fait un composer install pour installer toutes les extensions

    > composer install


les etapes restantes pour mettre l'api en ligne:

5) Mettre la config apache c'est le devops qui va s'occupé de ça

- dans un autre terminal entrer dans le bash pour symfony

    > docker exec -it < nom du containeur> bash

- voir les fichiers de conf

    > ls /etc/apache2/sites-available

- voir un fichier de conf en particulier

    > cat /etc/apache2/sites-available/000-default.conf

ou 

5) Mettre la config nginx c'est le devops qui va s'occupé de ça

dans `/var/www/my_app/backend/api$ `

- Pour voir ce qu'il y a dans le dossier nginx

    > ls /etc/nginx

- Pour voir ce qu'il y a dans le dossier sites-available de nginx    

    > ls /etc/nginx/sites-available   

- Pour voir ce qu'il y a dans le dossier sites-available de apache2  

    > ls /etc/apache2/sites-available

- sert a voir des commandes

    > certbot -h


6) creer le sous-domaine c'est le devops qui va s'occupé de ça

7) creer le certficat ssl pour le sous-domaine c'est le devops qui va s'occupé de ça

8) Si le fichier `.env` est inclut dans `.gitignore`, il faut l'enlevé dedans

9) Dans le fichier `.env` , on met un `mot de passe`, un `nom user`, un `nom de BDD `et en `hote` on met `127.0.0.1:3306 `

    `DATABASE_URL="mysql://nom_user:mot_de_passe@127.0.0.1:3306/nom_bdd?serverVersion=5.7"`  

10) puis on `git push` vers le repository et on fait un `git pull` depuis le serveur

11) Depuis le serveur en CLI

    - Créer l'espace de bdd, s'il n'a pas été fait

        > php bin/console doctrine:database:create

    - Puis on envois les version de migration déjà existante dans le projet

        > php bin/console doctrine:migrations:migrate

    - Puis on génére les clé JWT

        > php bin/console lexik:jwt:generate-keypair

    - Pour autorisé le téléchargment d'image dans un dossier, mais il y a mieux à faire

        > chmod 777 /var/www/my_app/backend/api/public/images/users/


autorisation pour le dossier sudo chmod 777./(folder name)

pour le fichier sudo chmod 777 -R ./(file name)




















creer le sous-domaine sur serveur distant /etc/apache2/

Pour créer un sous-domaine sur un serveur distant Apache2, vous pouvez suivre les étapes suivantes :

Accédez au serveur : Vous pouvez accéder au serveur à distance en utilisant un client SSH tel que Putty ou un terminal intégré si vous êtes sur un système d'exploitation de type Unix.

Créez un nouveau répertoire pour le sous-domaine : Le premier pas consiste à créer un nouveau répertoire pour le sous-domaine sur le serveur. Par exemple, si vous voulez créer le sous-domaine "subdomain.yourdomain.com", vous pouvez créer un répertoire nommé "subdomain".

Créez un nouveau fichier de configuration de virtual host : Vous pouvez créer un nouveau fichier de configuration de virtual host pour le sous-domaine en utilisant un éditeur de texte tel que nano ou vim. Le fichier doit être enregistré avec un nom qui décrit clairement le sous-domaine, tel que "subdomain.conf".

Ajoutez les paramètres de virtual host : Vous pouvez ajouter les paramètres suivants au fichier de configuration de virtual host pour configurer votre sous-domaine :

bash
Copy code
<VirtualHost *:80>
    ServerName subdomain.yourdomain.com
    DocumentRoot /var/www/subdomain
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
Rechargez la configuration d'Apache : Une fois que vous avez enregistré le fichier de configuration, vous pouvez recharger la configuration d'Apache en utilisant la commande suivante :
Copy code
sudo service apache2 reload
Configurez les enregistrements DNS : Vous devez également configurer les enregistrements DNS pour votre sous-domaine en ajoutant un nouvel enregistrement A pour le sous-domaine, pointant vers l'adresse IP de votre serveur.

Vérifiez que le sous-domaine est opérationnel : Une fois que vous avez terminé les étapes ci-dessus, vous pouvez vérifier que le sous-domaine est opérationnel en accédant à "http://subdomain.yourdomain.com" dans un navigateur web.

Note : Les étapes peuvent varier en fonction de la configuration de votre serveur et de la distribution Linux que vous utilisez. Il est donc important de consulter la documentation d'Apache et de votre système d'exploitation pour obtenir des instructions plus détaillées.