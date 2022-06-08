

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

### Supprimer les fichiers temporaires des fichiers d'installation

site doc Ubuntu : https://doc.ubuntu-fr.org/nettoyer_ubuntu

Supprimez les paquets .deb pour gagner de la place, car après plusieurs installations les paquets téléchargés s'accumulent et utilisent beaucoup d'espace. Ces paquets d'installation sont sauvegardés dans le dossier /var/cache/apt/archives/

Précision: Les paquets téléchargés ne servent à rien si vous avez Internet. Il vous permettront uniquement de réinstaller des applications en mode hors ligne. Leur suppression n'engendre pas la suppression des applications déjà installées grâce à ces paquets.
Depuis un terminal en saisissant les commandes suivantes:

- Supprimer le cache des paquets périmés

    > sudo apt autoclean

- Supprimer tout le cache 

    > sudo apt clean

- Supprimer les paquets installés automatiquement comme dépendances et devenus inutiles

    > sudo apt autoremove

les fichiers dans .cache ou .thumbnails dans home/NOM/ peuvent prendre beaucoup de place
par exemple home/NOM/.cache/VMWARE/drag_and_drop (plusieurs Go)

le logiciel "Représentation graphique du disque" permet de trouver les éléments de grande taille
à vous de les supprimer (à bon escient) ensuite !




### Installer filezilla

> sudo apt-get install filezilla