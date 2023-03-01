# Installer/Déinstaller Apache 2

- [devdocs.io](https://devdocs.io/apache_http_server/)
- [Apache](https://httpd.apache.org/docs/2.4/)
- [Installer et configurer Apache](https://ubuntu.com/tutorials/install-and-configure-apache#2-installing-apache)
- [[8] Installer Apache Debian et comprendre sa Configuration](https://www.youtube.com/watch?v=waetmCUHGVM&list=PLT53YLBLESro8Z3s9AIRRBYGdrlq18HbC&index=19&t=39s)
- [Mettre en place un serveur Web (20/28) : Apache](https://www.youtube.com/watch?v=arVwa7jvp5M&list=PLT53YLBLESro8Z3s9AIRRBYGdrlq18HbC&index=3) stoppé à 8min90s

0. Commencez par mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update

ou

sudo apt-get update
```

1. Installer Apache 2
```ps
sudo apt-get install apache2
```

2. Mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update

ou

sudo apt-get update
```

3. Après avoir laissé la commande s'exécuter, tous les packages requis sont installés et nous pouvons le tester en tapant notre adresse IP de notre serveur Web.<br>
Si vous voyez la page par defaut de apache, cela signifie qu'Apache a été installé avec succès sur votre serveur ! 

La page par défaut est le fichier `/var/www/html/index.html`, c'est sur ce fichier que Apache par défaut.

Explication de l'image [serveur_debian.png](https://github.com/jonas18121/help/blob/master/Serveur/doc/apache/apache_debian/serveur_debian.png) :

- On a un serveur qui à un OS Débian 
- Dedans on a installer un serveur apache2, on dit seveur car apache2 répond a toutes les requètes http qui vont venir vers lui
    - On appel serveur tous logiciel ou bout de code qui répond a une requète
- exemple le nav firefox envoie des requète vers norte serveur, apache va recevoir cette requétes puis y repondre en renvoyant la page d'accueil, si c'est ça qui a été demander
- Sécurité sur le serveur :
### Sécurité (1) Le parefeu qui peut bloqué des requètes de type http
### Sécurité (2) Apache répond que a un port spécifique, par défaut c'est le port 80

On peut voir/changer le port dans le fichier port.conf 
```ps      
cat /etc/apache2/port.conf
```

**Retourne**
```ps
# If you just change the port or add more ports here, you will likely also
# have to change the VirtualHost statement in
# /etc/apache2/sites-enabled/000-default.conf

Listen 80

<IfModule ssl_module>
	Listen 443
</IfModule>

<IfModule mod_gnutls.c>
	Listen 443
</IfModule>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```
- Listen : définir le port utilisé pour apache (On peut aussi dire une IP + port 127.0.0.1:80 pour répondre seulement a cette IP)
- Listen 443 : Pour le https

### Sécurité (3) apache2.conf qui est un fichier de configuration pour apache
```ps      
cat /etc/apache2/apache2.conf
```

Dedans on a la balise Directory

- Dans le dossier (Directory) /var/www/ apache peut y accéder(Require all granted), (Require all denied) pour interdir l'accès à apache
```ps
<Directory /var/www/>
	Options Indexes FollowSymLinks
	AllowOverride None
	Require all granted
</Directory>
```

### Sécurité (4) Les droits user

Apache est l'utilisateur `www-data` est il faut lui donné les droits pour accéder au fichier présent sur le disque dur

### Sécurité (5) Lien relatifs

Pour accéder à la page par défault dans ce chemin : http://AdresseIP/index.html on a pas besoin de mettre le chemin absolu : http://AdresseIP/var/www/html/index.html

On va dans le fichier 000-default.conf

```ps
cat /etc/apache2/sites-enabled/000-default.conf
```

On voit `DocumentRoot /var/www/html` qui point déjà dans /var/www/html

Dans `/etc/apache2/sites-enabled/` on retrouve les liens symboliques qui sont liens au fichier du même nom dans `/etc/apache2/sites-available/`

```ps
ls /etc/apache2/sites-enabled/ -lah
```
**Retourne**
```ps
drwxr-xr-x 2 root root 4.0K Feb 12 23:08 .
drwxr-xr-x 8 root root 4.0K Feb 19 14:39 ..
lrwxrwxrwx 1 root root   35 Feb 12 22:39 000-default.conf -> ../sites-available/000-default.conf
```
`lrwxrwxrwx 1 root root   35 Feb 12 22:39 000-default.conf -> ../sites-available/000-default.conf` : le fichier 000-default.conf qui est dans `/etc/apache2/sites-enabled/` est le lien symboliques du fichier 000-default.conf qui est dans `/etc/apache2/sites-available/`

Dans 000-default.conf

```ps
    <VirtualHost *:80> # Serveur virtuel qui point sur le port 80 , * : accepte toute les IP

        # La directive ServerName définit le schéma de requête, le nom d'hôte et le port qui
        # que le serveur utilise pour s'identifier. Ceci est utilisé lors de la création
        # URL de redirection. Dans le contexte des hôtes virtuels, le ServerName
        # spécifie quel nom d'hôte doit apparaître dans l'en-tête Host: de la requête pour
        # correspond à cet hôte virtuel. Pour l'hôte virtuel par défaut (ce fichier), ceci
        # La valeur # n'est pas décisive car elle est utilisée comme hôte de dernier recours malgré tout.
        # Cependant, vous devez le définir explicitement pour tout autre hôte virtuel.
        ServerName localhost # Le nom du serveur

        ServerAdmin xxxx@xxxx.xxx # L'email du développeur a contacter s'il y a un problème
        DocumentRoot /var/www/project/public # Indique la ou est le fichier index.php pour symfony par exemple (/var/www/html par default)
        DirectoryIndex /index.php # Indique le fichier index.php


        <Directory /var/www/project/public>
            AllowOverride None
            Order Allow,Deny
            Allow from All

            FallbackResource /index.php
        </Directory>

        # décommentez les lignes suivantes si vous installez des ressources en tant que liens symboliques
        # ou rencontrez des problèmes lors de la compilation des ressources LESS/Sass/CoffeeScript
        # <Directory /var/www/project>
        #     Options FollowSymlinks
        # </Directory>

        # désactiver éventuellement la ressource de secours pour les répertoires d'actifs
        # qui permettra à Apache de renvoyer une erreur 404 lorsque les fichiers sont
        # introuvable au lieu de passer la requête à Symfony
        <Directory /var/www/project/public/bundles>
            FallbackResource disabled
        </Directory>
        ErrorLog /var/log/apache2/project_error.log
        CustomLog /var/log/apache2/project_access.log combined

        # définir éventuellement la valeur des variables d'environnement utilisées dans l'application
        #SetEnv APP_ENV prod
        #SetEnv APP_SECRET <app-secret-id>
        #SetEnv DATABASE_URL "mysql://db_user:db_pass@host:3306/db_name"

        # Important : il faut mettre cette commande pour les utilisateurs d'Apache, 
        # afin d'utiliser les tokens dans postman par exemple
        SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
    </VirtualHost>
```

### accéder au fichier 000-default.conf 
```ps
sudo nano /etc/apache2/sites-available/000-default.conf
```
### Faire les modification puis Redémarrer le service apache
```ps
sudo service apache2 restart
# ou
sudo service apache2 reload
```
### Voir les logs si problème
```ps
cat /var/log/apache2/error.log
```
### Voir les logs si problème avec nombre de ligne
```ps
tail -n 30 /var/log/apache2/error.log
```

### 1) On peut configurer apache.conf

```ps
sudo nano /etc/apache2/apache2.conf
```

```ps
<Directory />
        Options FollowSymLinks
        AllowOverride None
        Require all denied
</Directory>

<Directory /usr/share>
        AllowOverride None
        Require all granted
</Directory>

<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>
```

Voici ce que chaque ligne signifie :

- `<Directory /var/www/>` : Déclare le début de la section de configuration pour le répertoire "/var/www/".

- `Options Indexes FollowSymLinks` : Active les options "Indexes" et "FollowSymLinks". L'option "Indexes" permet d'afficher la liste des fichiers dans le répertoire si aucun fichier n'est spécifié dans l'URL. L'option "FollowSymLinks" autorise Apache à suivre les liens symboliques qui pointent vers d'autres fichiers ou répertoires.

- `AllowOverride None` : Empêche les fichiers .htaccess dans le répertoire "/var/www/" de modifier la configuration Apache.

- `Require all granted` : Autorise tous les utilisateurs à accéder au contenu du répertoire "/var/www/".

Ensemble, ces directives permettent à Apache d'afficher le contenu du répertoire "/var/www/" aux utilisateurs et d'autoriser tous les utilisateurs à y accéder, tout en empêchant les fichiers .htaccess de modifier la configuration Apache pour ce répertoire.

Il faute enlever `Indexes` pour la prod.


### Création d'un lien symbolique entre un projet placer quelque part et le dossier /var/www

Exemple: 

On a un projet placer dans ce chemin `/home/dev/project` et on veut y accéder dans le navigateur Web

- Dans `/etc/apache2/apache2.conf`, on a configuré apache2 qui pointe vers `/var/www/` de cette manière `<Directory /var/www/>`
- Faire la commande suivante pour créé un lien symbolique qui va recopier le contenu du dossier `/home/dev/project` dans `/var/www/` en le nommant `monsite.fr` (`/var/www/monsite.fr`)
```ps
ln -s /home/dev/project /var/www/monsite.fr
```
Cette commande Linux crée un lien symbolique entre le répertoire `/home/dev/project` et le répertoire `/var/www/monsite.fr`.

Plus précisément, elle crée un lien symbolique nommé `monsite.fr` dans le répertoire `/var/www/`, qui pointe vers le répertoire `/home/dev/project`.

Ce lien symbolique permet d'accéder au contenu du répertoire `/home/dev/project` à partir de l'emplacement `/var/www/monsite.fr`.

En d'autres termes, lorsque vous accédez à `monsite.fr` à partir du navigateur Web, le serveur Apache2 utilisera le contenu du répertoire `/home/dev/www` pour servir le site.

Cela est souvent utilisé pour permettre à plusieurs sites Web d'utiliser le même code source tout en étant stockés dans différents répertoires sur le serveur.

On pourra accéder à `monsite.fr` de cette manière `http://adresseIP/monsite.fr`

### Faire en sorte d'accéder au site de cette manière http://monsite.fr au lieu de http://adresseIP/monsite.fr

Par défaut il faudrait réserver un nom de domain qui pointe vers le serveur.

Voici une astuce pour tester un nom de domain et accéder au site de cette manière http://monsite.fr au lieu de http://adresseIP/monsite.fr

#### Aller dans le fichier hosts depuis un terminal qui point sur son ordi perso
```ps
sudo nano /etc/hosts
```

**Rajouter l'ip du serveur avec le nom de domain**
```ps
127.0.0.1       localhost.localdomain localhost
127.0.1.1       localhost
224.112.545.12  monsite.fr
```

### Créer un autre virtualhost pour monsite.fr
```ps
sudo nano /etc/apache2/sites-available/001-monsite.conf
```
**Dedans, on configure à notre sauce, on a aussi enlevé Indexes avec le moins (-)**
```ps
<VirtualHost *:80>
    ServerAdmin contact@jonas.fr
    ServerName monsite.fr
    ServerAlias *.monsite.fr

    DocumentRoot /var/www/monsite.fr

    <Directory /var/www/monsite.fr>
        Options -Indexes +FollowSymLinks
	    AllowOverride All
    </Directory>

    ErrorLog /home/dev/logs/error.log

</VirtualHost>
```

**On crée le dossier logs et le fichier error.log**
```ps
mkdir /home/dev/logs

touch /home/dev/logs/error.log
```
**Voir les logs  en live**
```ps
tail -f /home/dev/logs/error.log
```

**Puis on crée un lien symbolique pour le fichier 001-monsite.conf**
```ps
sudo a2ensite 001-monsite
```

**Un lien symbolique pour le fichier 001-monsite.conf a été créer dans le dossier /etc/apache2/sites-enabled**
```ps
ls /etc/apache2/sites-enabled -l
```
**Retourne**
```ps
total 0
lrwxrwxrwx 1 root root 35 Feb 12 22:39 000-default.conf -> ../sites-available/000-default.conf
lrwxrwxrwx 1 root root 35 Feb 25 15:44 001-monsite.conf -> ../sites-available/001-monsite.conf
```

**On peut aussi désactiver un lien symbolique pour un fichier**
Exemple pour le fichier 000-default.conf
```ps
sudo a2dissite 000-default
```

**Ou faire une redirection vers le site monsite.fr**
Exemple pour le fichier 000-default.conf
- 1) Mettre en commentaire `DocumentRoot`, `ErrorLog` et `CustomLog`
- 2) Ajouter `Redirect 301 /` qui pointe vers `monsite.fr` avec un vrai nom de domaine
```ps
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        # DocumentRoot /var/www/html

        # ErrorLog ${APACHE_LOG_DIR}/error.log
        # CustomLog ${APACHE_LOG_DIR}/access.log combined
        Redirect 301 / http://monsite.fr/
</VirtualHost>
```

**Redémarrer le service apache**
```ps
sudo service apache2 restart
```

**Vider le cache aussi**

#### Tester la configuration d'apache2 pour voir si il a bien été construit
```ps
/usr/sbin/apache2ctl configtest
```
**S'il y a une erreur**
```ps
AH00526: Syntax error on line 8 of /etc/apache2/sites-enabled/001-monsite.conf:
Either all Options must start with + or -, or no Option may.
Action 'configtest' failed.
The Apache error log may have more information.
```

**S'il n'y a pas d'erreur**
```ps
Syntaxe OK
```

#### Après modification redémarrer le service apache
```ps
# Redémarrer le service apache
sudo service apache2 restart
# ou
sudo service apache2 reload

# Voir les logs si problème
cat /var/log/apache2/error.log

# Voir les logs si problème avec nombre de ligne
tail -n 30 /var/log/apache2/error.log
```

**Voir les logs  en live**
```ps
tail -f /home/dev/logs/error.log
```

### Les mods
#### Voir les mods activé
```ps
ls -la /etc/apache2/mods-enabled/
```

**Exemple de retour**
```ps
drwxr-xr-x 2 root root 4096 Feb 18 23:15 .
drwxr-xr-x 8 root root 4096 Feb 25 14:20 ..
lrwxrwxrwx 1 root root   28 Feb 18 23:10 proxy.load -> ../mods-available/proxy.load
lrwxrwxrwx 1 root root   33 Feb 12 22:39 reqtimeout.conf -> ../mods-available/reqtimeout.conf
lrwxrwxrwx 1 root root   33 Feb 12 22:39 reqtimeout.load -> ../mods-available/reqtimeout.load
lrwxrwxrwx 1 root root   31 Feb 12 22:39 setenvif.conf -> ../mods-available/setenvif.conf
lrwxrwxrwx 1 root root   31 Feb 12 22:39 setenvif.load -> ../mods-available/setenvif.load
lrwxrwxrwx 1 root root   29 Feb 12 22:39 status.conf -> ../mods-available/status.conf
lrwxrwxrwx 1 root root   29 Feb 12 22:39 status.load -> ../mods-available/status.load
```
#### Voir les mods disponible
```ps
ls -la /etc/apache2/mods-available/
```
**Exemple de retour**
```ps
-rw-r--r-- 1 root root    97 Jun  9  2022 proxy_http2.load
-rw-r--r-- 1 root root    89 Jun  9  2022 proxy_http.load
-rw-r--r-- 1 root root    62 Jun  9  2022 proxy.load
-rw-r--r-- 1 root root    89 Jun  9  2022 proxy_scgi.load
-rw-r--r-- 1 root root    91 Jun  9  2022 proxy_uwsgi.load
-rw-r--r-- 1 root root    97 Jun  9  2022 proxy_wstunnel.load
-rw-r--r-- 1 root root    85 Jun  9  2022 ratelimit.load
-rw-r--r-- 1 root root    70 Jun  9  2022 reflector.load
-rw-r--r-- 1 root root    68 Jun  9  2022 remoteip.load
-rw-r--r-- 1 root root  1190 Jun  9  2022 reqtimeout.conf
-rw-r--r-- 1 root root    72 Jun  9  2022 reqtimeout.load
-rw-r--r-- 1 root root    66 Jun  9  2022 request.load
-rw-r--r-- 1 root root    66 Jun  9  2022 rewrite.load
```

#### Activer un mod

Exemple le module rewrite
```ps
sudo a2enmod rewirte

# Redémarrer le service apache
sudo service apache2 restart
# ou
sudo service apache2 reload
```

# Déinstaller Apache 2

- [Comment désinstaller Apache2 sur Ubuntu](https://www.edureka.co/community/46181/how-to-uninstall-apache2-on-ubuntu)

0. Commencez par mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
```

1. Arrêtez d'abord le service apache2 s'il s'exécute avec :
```ps
sudo service apache2 stop
```

2. Maintenant, supprimez et nettoyez tous les packages apache2 avec :
```ps
sudo apt-get purge apache2 apache2-utils apache2.2-bin apache2-common 

# ou 

sudo apt-get purge apache2 apache2-utils apache2-bin apache2.2-common
```
Puis
```ps
sudo apt-get purge apache2*
```

3. 1. Enfin, exécutez sudo apt-get autoremove au cas où un autre nettoyage serait nécessaire
```ps
sudo apt-get autoremove 
```
3. 2. Si cela ne fonctionne pas, vous avez peut-être installé l'une des dépendances manuellement. Vous pouvez cibler tous les packages apache2 depuis l'espace et bombarder le lot :
```ps
sudo apt remove apache2.*
```
4. Localiser les endroit ou sont placer les différents fichiers de apache2 (fichiers binaires, sources et de la page de manuel)
```ps
whereis apache2
```
```ps
# Retourne
apache2: /usr/sbin/apache2 /usr/lib/apache2 /etc/apache2 /usr/share/apache2 /usr/share/man/man8/apache2.8.gz
```

5. Supprimer chacun de ces dossiers/fichiers
```ps
sudo rm -rf /usr/sbin/apache2

sudo rm -rf /usr/lib/apache2

sudo rm -rf /etc/apache2

sudo rm -rf /usr/share/apache2 

sudo rm -rf /usr/share/man/man8/apache2.8.gz
```

6. Vous pouvez effectuer les deux tests suivants pour confirmer qu'apache a été supprimé :

```ps
# Devrait renvoyer une ligne vide
which apache2

# Devrait renvoyer apache2 : service non reconnu [apache2: unrecognized service]
sudo service apache2 start 
```

7. Mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
```