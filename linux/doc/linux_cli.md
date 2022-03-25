

### Installer net-tools

Le package net-toolspeut ne pas être installé sur votre système par défaut, vous devez donc l'installer manuellement.

Le forfait comprend également utilisties supplémentaires comme une arp, ifconfig, netstat, rarp, nameifet route.

    > sudo apt-get install net-tools

### Mettre du code en commentaire

    > ctrl + shift + touche A

        <!--  -->
        /** */

    > ctrl + shift + touche /

        <!--  -->
        //
    
### Mettre des règles de droits dans des fichiers et dossiers

#### La première parcours tous les dossiers du projet et leur mets 0775 

    > sudo find . -type d -exec chmod 0775 {} \;

#### La deuxième parcours tous les fichiers du projet et leur mets 0664

    > sudo find . -type f -exec chmod 0664 {} \;

#### La troisième ajout de droit "exécutable" sur le fichier bin/console (car le 0664 a enlever le droit exécutable)
    
    > sudo  chmod +x bin/console