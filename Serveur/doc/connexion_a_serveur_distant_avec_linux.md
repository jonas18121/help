# Se Connecter à un serveur distant depuis Linux

Site : https://www.malekal.com/comment-se-connecter-en-ssh-a-un-serveur-distant-depuis-linux/

Voir aussi "Générer et se connecter en SSH avec des clés SSH" : https://www.malekal.com/generer-et-se-connecter-en-ssh-avec-des-cles-ssh/

## Avec la commande SSH

Sur Linux, vous pouvez utiliser OpenSSH Client inclut dans votre distribution.

Cela se fait avec une commande SSH à utiliser depuis un terminal ou shell.

Il peut ne pas être installé par défaut donc nécessite son installation.

- Ouvrez un terminal
- La syntaxe de la commande SSH est la suivante :

        > ssh <user>@<host>

Par exemple pour se connecter en SSH à une machine du LAN 192.168.1.22 avec l’utilisateur mak :

    > ssh mak@192.168.1.100

A la première connexion, vous devez accepter l’empreinte de la clé SSH du serveur distant. Pour cela appuyez sur la touche y du clavier

La connexion SSH s’établit et vous avez accès à un shell distant

Nous nous sommes connecté au port TCP par défaut de SSH, soit donc le port 22.
Si le serveur utilise un autre port, on peut le spécifier avec le paramètre -p.
Par exemple pour connecter à un serveur SSH sur le port 2222 :

    > ssh -p 2222 malekalmorte@192.168.1.100


## PuTTY

PuTTY est un client SSH populaire pour Windows, disponible aussi sur Linux.

L’interface graphique PuTTY est principalement un moyen d’enregistrer des sessions SSH, il est donc plus facile de gérer tous ces divers serveurs et bureaux Linux dont vous avez besoin d’entrer et de sortir constamment à distance. Une fois connecté, de PuTTY au serveur Linux, vous aurez une fenêtre de terminal dans laquelle travailler.

- Installez PuTTY avec le gestionnaire de paquets de votre distribution Linux. Par exemple sur Ubuntu ou Debian, avec APT saisissez:

        > sudo apt install putty