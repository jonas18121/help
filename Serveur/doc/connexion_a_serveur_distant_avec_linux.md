# Se Connecter à un serveur distant depuis Linux

[Voir vidéo](https://youtu.be/pLJC96zfwrE)

## Se Connecter à un serveur distant depuis Linux avec une clé ssh (niveau débutant)

1. Avec un premier terminal, générer une clé privé et public ssh sur son PC en local , exemple : (voir le fichier generer_des_cles_ssh.md dans le répertoire linux/doc/)
```ps
ssh-keygen -t ed25519 -C "user18121-key"
```
**Paramètre à ajouter, ne pas mettre de passphrase**
```ps
user@user18121 ~/Bureau/developpementWeb/code/formation-ci-cd/symfony-local (master)$ ssh-keygen -t rsa -C "user18121-key"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): /home/user/.ssh/user18121_key
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
+--[RSA 2048]------+
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
    rsa EAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSUGPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3Pbv7 user18121-key
```
8. Copier la clé public pour la coller dans le fichier **authorized_keys** du serveur distant et enregistrer avec nano
9. Se déconnecter du serveur distant
```ps
logout
```
10. Depuis le premier terminal en local, faire une première connecte avec la clé privé, puis se déconnecter.
    - -i : pour éviter le password
```ps
ssh -i ~/.ssh/user18121_key user18121@172.17.0.7
```
11. Se connecter au serveur distant (sans mettre de password) 
```ps
ssh user18121@172.17.0.7
```

ça fonctionne !!!



## Se Connecter à un serveur distant depuis Linux avec une clé ssh (niveau avancé)

1. Avec un premier terminal, générer une clé privé et public ssh sur son PC en local , exemple : (voir le fichier generer_des_cles_ssh.md dans le répertoire linux/doc/)
```ps
ssh-keygen -t rsa -C "user22222-key"
```
**Paramètre à ajouter, ne pas mettre de passphrase**
```ps
user@user22222 ~/Bureau/developpementWeb/code/formation-ci-cd/symfony-local (master)$ ssh-keygen -t rsa -C "user22222-key"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): /home/user/.ssh/user22222_key
Enter passphrase (empty for no passphrase): 
Enter same passphrase again:
```

**Retourne :**
```ps
Your identification has been saved in /home/user/.ssh/user22222_key.
Your public key has been saved in /home/user/.ssh/user22222_key.pub.
The key fingerprint is:
SHA256:oMDfIAfqefeqfqU5xWK/cZ+n5edfgvzgeagvh6ogcvYivdqvqv/q9Eu42SZE9gOf3s user22222-key
The key's randomart image is:
+--[RSA 2048]-----+
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

3. On crée un autre user (facultative)
```ps
sudo adduser user22222
```
**Retour** avec un nouveau mot de passe a créer pour le new user 
```ps
Adding user `user22222' ...
Adding new group `user22222' (1000) ...
Adding new user `user22222' (1000) with group `user22222' ...
Creating home directory `/home/user22222' ...
Copying files from `/etc/skel' ...
New password: 
Retype new password: 
passwd: password updated successfully
Changing the user information for user22222
Enter the new value, or press ENTER for the default
	Full Name []: 
	Room Number []: 
	Work Phone []: 
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] y
```

4. Voir le new user (facultative)
```ps
id user22222
```
**Retour**
```ps
uid=1000(user22222) gid=1000(user22222) groups=1000(user22222)
```

5. Avec un terminal local on exceute la commande ci-dessous (qui copie la clé public pour la mettre directement dans le serveur distant)
    - **user22222** : le new user (ou le user normale)
    - **-i** : pour éviter le password
    - **ssh-copy-id** est une commande utilisée pour copier la clé publique SSH d'un ordinateur local vers un ordinateur distant,<br> 
    enregistré dans le fichier authorized_keys sur le serveur, permettant ainsi un accès sécurisé via SSH sans avoir à entrer un mot de passe. <br> 
    Cela peut être utile pour automatiser des tâches telles que la synchronisation de fichiers ou l'exécution de commandes à distance.
    - **~/.ssh/user22222_key** clé privée
```ps
ssh-copy-id -i ~/.ssh/user22222_key user22222@172.17.0.7
```

Pour la premier fois il va demander la password

6. Puis, on peut se connecter au seveur distant avec le new user (ou le user normale)
 ```ps
ssh user22222@172.17.0.7
```

ça fonctionne !!!

7. On peut aussi se connecter au user 2 depuis le user 1 (et inversement) avec (facultative)
 ```ps
su - user22222
```















## Se Connecter à un serveur distant avec ssh
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