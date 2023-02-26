
## Copier une clé privée ou public ssh dans nodepad

Dans le dossier .ssh

    > notepad <name_key_public_ou_key_private>


## Manipuler un fichier depuis un terminal, quand on est connecter à un serveur distant 

### Voir le contenu d'un fichier

    > cat <nom_fichier_._extention>

exemple : 

    > cat .env.local

ou

    > cat index.php

### Ecrire dans un fichier

    > nano <nom_fichier_._extention>

exemple : 

    > nano .env.local

#### Dans Nano

    1. Naviguez dans le fichier avec les flèches haut, bas, gauche, droite
    2. Modifiez la phrase ou le mot qu'il faut
    3. Pour sauvegarder, cliquez sur `ctrl + x` pour dire `EXIT`
    4. Puis cliquez sur `y` pour dire `YES`
    5. Et enfin appuyez sur le bouton `ENTRER` du clavier

## Redemarrer php depuis un terminal, quand on est connecter à un serveur distant 

site : https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units-fr

    > sudo systemctl restart php7.4-fpm

### Voir des fichier cacher dans un serveur

```ps
ls -lah
```

### Voir les droit dans un serveur

```ps
ls -l
```

### Changer le propriétaire du dossier sur un serveur

```ps
sudo chown -R [USER NAME]:[USER NAME] /var/www
```

Exemple :
```ps
sudo chown -R www-data:www-data /var/www
```

### Mettre un user dans un groupe

- **usermod**  : La commande
- **-g** : l'option groupe
- **www-data** : c'est le nom du groupe que l'on veut ajouter un user
- **user007** : c'est l'utisateur qui va intégre le groupe `www-data`
```ps
sudo usermod -g www-data user007
```