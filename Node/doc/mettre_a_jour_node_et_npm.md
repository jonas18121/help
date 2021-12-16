# Mettre à jour nodejs et npm vers la dernière version avec Ubuntu

### Mettez à jour nodejs vers la dernière version :

    > sudo npm install -g n

    > sudo n latest
    
Différentes façon pour avoir une version de node :

    n                            # Versions de sortie installées
    n latest                     # Installer ou activer la dernière version de node
    n stable                     # Installer ou activer la dernière version stable de node
    n <version>                  # Installer node avec une version précise <version>
    n use <version> [args ...]   # Execute node <version> avec [args ...]
    n bin <version>              # Chemin du path de sortie pour <version>
    n rm <version ...>           # Supprime la ou les versions données
    n --latest                   # Affiche la dernière version de node disponible
    n --stable                   # Affiche la dernière version de node stable disponible
    n ls                         # Affiche les versions de node disponibles

### Mettre à jour npm vers la dernière version :

    > sudo npm install -g npm

### Faites ce que @runcible a suggéré

    > hash -d npm

### Essayez l'installation de npm dans un projet

    > npm i
