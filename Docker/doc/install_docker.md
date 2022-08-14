# Installer Docker sous windows 10 Home

- Installer Docker sous windows 10 Home : https://docs.docker.com/docker-for-windows/install/

- Installation du sous système linux de windows : https://docs.microsoft.com/en-us/windows/wsl/install-win10


1) Vérifier que vous avez une version de windows supérieur à 1903 (Build 18362)

    - Pour le vérifier, tapez simultannément sur la touche `windows` + la touche `R`, ça ouvrira un invite de commande 
    - Dans cette invite de commande , entrer le mot 'winver', vous obtiendrez ainsi la version de votre windows
    - Si votre windows est inférieur à la version 1903 (Build 18362). faite les mise à jour qu'il faut

2) Prérequis pour continuer les installations

    - un processeur 64 bit
    - minimun 4GB de RAM
    - avoir la technologie de virtualisation activer dans le BIOS, normalement il est déjà activer par défaut

3) Dans l'invite de commande PowerShell en mode administrateur, entrez la commande ci-dessous pour installer le sous système linux de windows

    > dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

4) Toujours ans l'invite de commande PowerShell en mode administrateur, entrez la commande ci-dessous pour installer la plateforme de virtualisation de windows

    > dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

5) Redémarrer votre ordinateur

6) rendez-vouz sur le site : https://docs.microsoft.com/en-us/windows/wsl/install-win10

    - Aller à l'étape 4 pour téléchargez le package de mise à jour du noyau Linux (Download the Linux kernel update package)
    - une fois télécharger, installez le 

7) rendez-vouz sur le site : https://docs.docker.com/docker-for-windows/install/

    - Télécharger l'exécutable de docker nommé `Docker Desktop for windows`
    - une fois télécharger, installez le et cochez les case qu'il faut

8) Redémarrer votre ordinateur si Docker ne la pas fait lui même

9) pour savoir si Docker est bien installer mettez la commande ci-dessous en ligne de commande ( PowerShell ou CMD )

    > docker --version

Bravo !!!