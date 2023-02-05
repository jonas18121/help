# Se Connecter à un serveur distant depuis Linux


## Se Connecter à un serveur distant depuis Linux avec une clé ssh (Façon nouveau)

1. Avec un premier terminal, générer une clé privé et public ssh sur son PC en local , exemple : (voir le fichier generer_des_cles_ssh.md dans le répertoire linux/doc/)
```ps
ssh-keygen -t ed25519 -C "user18121-key"
```
**Paramètre à ajouter, ne pas mettre de passphrase**
```ps
user@user18121 ~/Bureau/developpementWeb/code/formation-ci-cd/symfony-local (master)$ ssh-keygen -t ed25519 -C "user18121-key"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519): /home/user/.ssh/user18121_key
Enter passphrase (empty for no passphrase): 
Enter same passphrase again:
```

**Retourne :**
```ps
Your identification has been saved in /home/user/.ssh/user18121_key.
Your public key has been saved in /home/user/.ssh/user18121_key.pub.
The key fingerprint is:
SHA256:oMDfIAfqefeqfqU5xWK/cZ+n5edfgvzgeagvh6ogcvYivdqvqv/q9Eu42SZE9gOf3s user18121-key
The key's randomart image is:
+--[ED25519 256]--+
|  .=o            |
| .=..            |
| .++. .          |
| o +o+..         |
|o o o+..S.       |
| + =..  o o      |
|  X + .  =.      |
| ooB =Eo....     |
| .+=X+o.oo+.     |
+----[SHA256]-----+
```

2. Avec un deuxième terminal, se connecter au serveur distant avec le bon password 
```ps
ssh user18121@172.17.0.7
```

3. Vérifier si le dossier **.ssh** existe dans le serveur
```ps
ls -lah
```
4. Si le dossier **.ssh** n'existe pas, il faut le créer
```ps
mkdir .ssh
```
5. Créer le fichier **authorized_keys** dans le dossier **.ssh**
```ps
touch authorized_keys
```
6. Ouvrir le fichier **authorized_keys** de façon à pouvoir écrire dedans
```ps
sudo nano authorized_keys
```
7. Depuis le premier terminal en local afficher le contenu de la clé public que l'on a généré plus haut
```ps
cat ~/.ssh/user18121_key.pub
```
**Retourne :**
```bash
    ed25519 EAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSUGPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3Pbv7 user18121-key
```
8. Copier la clé public pour la coller dans le fichier **authorized_keys** du serveur distant et enregistrer avec nano
9. Se déconnecter du serveur distant
```ps
logout
```
10. Depuis le premier terminal en local, faire une première connecte avec la clé privé, puis se déconnecter.
    - -i : pour évité le password
```ps
ssh -i ~/.ssh/user18121_key user18121@172.17.0.7
```
11. Se connecter au serveur distant (sans mettre de password) 
```ps
ssh user18121@172.17.0.7
```

ça fonctionne !!!






















## Façon ancien
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