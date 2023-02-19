# Installer/Déinstaller Apache 2

- [Installer et configurer Apache](https://ubuntu.com/tutorials/install-and-configure-apache#2-installing-apache)
- [[8] Installer Apache Debian et comprendre sa Configuration](https://www.youtube.com/watch?v=waetmCUHGVM&list=PLT53YLBLESro8Z3s9AIRRBYGdrlq18HbC&index=19&t=39s)
- [Mettre en place un serveur Web (20/28) : Apache](https://www.youtube.com/watch?v=arVwa7jvp5M&list=PLT53YLBLESro8Z3s9AIRRBYGdrlq18HbC&index=3)

0. Commencez par mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
```

1. Installer Apache 2
```ps
sudo apt-get install apache2
```

2. Mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
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

### Sécurité (3) apache2.conf qui est un fichier de configuration
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

On voir `DocumentRoot /var/www/html` qui point déjà dans /var/www/html




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