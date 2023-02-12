# Installer Apache 2

- [Installer et configurer Apache](https://ubuntu.com/tutorials/install-and-configure-apache#2-installing-apache)

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

3. Après avoir laissé la commande s'exécuter, tous les packages requis sont installés et nous pouvons le tester en tapant notre adresse IP pour le serveur Web.<br>
Si vous voyez la page par defaut de apache, cela signifie qu'Apache a été installé avec succès sur votre serveur !











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