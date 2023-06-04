# Installer Symfony CLI dans un serveur web

- [Installation et configuration du framework Symfony](https://symfony.com/doc/3.2/setup.html)

1. Creer le dossier bin <br>
Cette commande utilise mkdir pour créer un nouveau répertoire dans le système de fichiers.<br>
Le paramètre -p permet de créer les répertoires intermédiaires s'ils n'existent pas, de sorte que le répertoire /usr/local/bin sera créé, <br>
même si les répertoires /usr/local ou /usr n'existent pas.
```ps
sudo mkdir -p /usr/local/bin
```

2. Télécharger le script d'installation de Symfony à partir du site Web de Symfony et l'enregistrer dans le répertoire `/usr/local/bin/` avec le nom de fichier `symfony`.
```ps
sudo curl -LsS https://symfony.com/installer -o /usr/local/bin/symfony

// OU

sudo curl -LsS https://get.symfony.com/cli/installer -o /usr/local/bin/symfony
```

3.  Changer les permissions d'accès pour le fichier `/usr/local/bin/symfony`. <br>
Le paramètre a+x indique que l'on souhaite ajouter le droit d'exécution pour tous les utilisateurs `(a signifie "all")`.
```ps
sudo chmod a+x /usr/local/bin/symfony

// OU

sudo chmod +x /usr/local/bin/symfony
```

4. S'il y a un problème, supprimer symfony puis recommencer à partir de l'étape 2
```ps
sudo rm /usr/local/bin/symfony
```