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

Dedan on a la balise Directory

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

### On peut configurer apache.conf

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