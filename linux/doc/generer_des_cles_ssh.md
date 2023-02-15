# Génération des clés publiques SSH sous linux

- Site [GIT](https://git-scm.com/book/fr/v2/Git-sur-le-serveur-G%C3%A9n%C3%A9ration-des-cl%C3%A9s-publiques-SSH)
- [Utiliser des clés SSH pour communiquer avec GitLab](https://docs.gitlab.com/ee/user/ssh.html)
- [Utiliser différents comptes sur une seule instance GitLab](https://docs.gitlab.com/ee/user/ssh.html#use-different-accounts-on-a-single-gitlab-instance)

## Génération des clés publiques SSH

De nombreux serveurs Git utilisent une authentification par clés publiques SSH. 

Pour fournir une clé publique, chaque utilisateur de votre système doit la générer s’il n’en a pas déjà. 

Le processus est similaire sur tous les systèmes d’exploitation. 

Premièrement, l’utilisateur doit vérifier qu’il n’en a pas déjà une. 

Par défaut, les clés SSH d’un utilisateur sont stockées dans le répertoire **~/.ssh** du compte. 

**Vous pouvez facilement vérifier si vous avez déjà une clé en listant le contenu de ce répertoire :**

```ps
cd ~/.ssh
```

**Voir les fichiers/dossiers présent dans .ssh**
```ps
ls
```

**Retourne :**
```ps
authorized_keys2  id_dsa       known_hosts
config            id_dsa.pub
```

Recherchez une paire de fichiers appelés quelquechose et quelquechose`.pub` où le quelquechose en question est généralement **id_dsa** ou **id_rsa**. 

Le fichier en **.pub** est la clé publique tandis que l’autre est la clé privée. 

Si vous ne voyez pas ces fichiers (ou n’avez même pas de répertoire .ssh), vous pouvez les créer en lançant un programme appelé **ssh-keygen** fourni par le paquet SSH sur les systèmes Linux/macOS et MSysGit pour Windows :

**Faire la commande ci-dessous**
```ps
ssh-keygen -o
```

**Retourne :**
```ps
    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/schacon/.ssh/id_rsa):
    Created directory '/home/schacon/.ssh'.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /home/schacon/.ssh/id_rsa.
    Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
    The key fingerprint is:
    d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
```


Premièrement, le programme demande confirmation de l’endroit où vous souhaitez sauvegarder la clé (.ssh/id_rsa) puis il demande deux fois d’entrer un mot de passe qui peut être laissé vide si vous ne souhaitez pas devoir le taper quand vous utilisez la clé. 

Cependant, si vous utilisez un mot de passe, assurez-vous d’ajouter l’option **-o** ; cela sauvegarde la clé privé dans un format qui est plus résistant au craquage par force brute des mots de passe que le format par défaut.

**Ou, on peut aussi utiliser cette commande :**
```ps
ssh-keygen -t rsa -C "user18121-key"
```

OU 

```ps
ssh-keygen -t ecdsa -b 521 -f .ssh
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
+--[RSA 2048]--+
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


Maintenant, chaque utilisateur ayant suivi ces indications doit envoyer la clé publique à la personne en charge de l’administration du serveur Git (en supposant que vous utilisez un serveur SSH réglé pour l’utilisation de clés publiques). Ils doivent copier le contenu du fichier **.pub** et l’envoyer par courriel. 

**Les clés publiques ressemblent à ceci :**
```ps
cat ~/.ssh/id_rsa.pub
```
**Retourne :**
```bash
    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
    GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
    Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
    t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
    mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
    NrRFi9wrf+M7Q== schacon@mylaptop.local
```

**Les clés secrètes ressemblent à ceci :**

```ps
cat ~/.ssh/id_rsa
```

**Retourne :**
```bash
    -----BEGIN OPENSSH PRIVATE KEY-----
    PkhCDOcSC5o6NTG1vXrlriYBCvaM2pSPYG6VXu3E80IO7qER5a9G8TgX+AcCNP1ghf83Ra
    PkhCDOcSC5o6NTG1vXrlriYBCvaM2pSPYG6VXu3E80IO7qER5a9G8TgX+AcCNP1ghf83Ra
    eLQ52zk37ZYTkJ0iDpkhnz4HIcd/tOVmiJxFyqj6X1HSmCQgxFazHW/FYCBlPVei34Cvqh
    +55SJxjpK/ja/w6lMkPDBZiV1ULDNVZMGWl6HQx+0EPoqqxosmJKBagLlkdSS/9FnsoEoF
    HQRRM2K+Gtwh8LGgxAJGl3b4Kxa6LmS5oJIGxNCYIs0/VLoQ3KFhCQwedrBH/SGpLGcY3b
    Vb4hDKPuzmQLhNd9+7KgsDmfb8fceLkPeA17pHmpxVIjAjP9TR4BAAAD4OrZwkkDqpkOuf
    pzlljsCV0O2xFGhu1HsDhTCYLcTg4+SU3V96hKfCyEAL5Op9IgvrOXj4fa1gvM4Mo3kz+h
    eLQ52zk37ZYTkJ0iDpkhnz4HIcd/tOVmiJxFyqj6X1HSmCQgxFazHW/FYCBlPVei34Cvqh
    +55SJxjpK/ja/w6lMkPDBZiV1ULDNVZMGWl6HQx+0EPoqqxosmJKBagLlkdSS/9FnsoEoF
    HQRRM2K+Gtwh8LGgxAJGl3b4Kxa6LmS5oJIGxNCYIs0/VLoQ3KFhCQwedrBH/SGpLGcY3b
    Vb4hDKPuzmQLhNd9+7KgsDmfb8fceLkPeA17pHmpxVIjAjP9TR4BAAAD4OrZwkkDqpkOuf
    pzlljsCV0O2xFGhu1HsDhTCYLcTg4+SU3V96hKfCyEAL5Op9IgvrOXj4fa1gvM4Mo3kz+h
    +55SJxjpK/ja/w6lMkPDBZiV1ULDNVZMGWl6HQx+0EPoqqxosmJKBagLlkdSS/9FnsoEoF
    HQRRM2K+Gtwh8LGgxAJGl3b4Kxa6LmS5oJIGxNCYIs0/VLoQ3KFhCQwedrBH/SGpLGcY3b
    Vb4hDKPuzmQLhNd9+7KgsDmfb8fceLkPeA17pHmpxVIjAjP9TR4BAAAD4OrZwkkDqpkOuf
    pzlljsCV0O2xFGhu1HsDhTCYLcTg4+SU3V96hKfCyEAL5Op9IgvrOXj4fa1gvM4Mo3kz+h
    /PFT/WMVVT6YayhUWOxwrWTrTlfeBFAWanBu4rNOsJOyA47elSCUON3p3CfO6TJCjrc4jh
    xJwTu43wIt05I1rfYFz8WPYjvskW4BBaxjn1O+I2mojPA2KqhB2ZPhX4pJscLXWGkQUd2F
    PkhCDOcSC5o6NTG1vXrlriYBCvaM2pSPYG6VXu3E80IO7qER5a9G8TgX+AcCNP1ghf83Ra
    PkhCDOcSC5o6NTG1vXrlriYBCvaM2pSPYG6VXu3E80IO7qER5a9G8TgX+AcCNP1ghf83Ra
    eLQ52zk37ZYTkJ0iDpkhnz4HIcd/tOVmiJxFyqj6X1HSmCQgxFazHW/FYCBlPVei34Cvqh
    +55SJxjpK/ja/w6lMkPDBZiV1ULDNVZMGWl6HQx+0EPoqqxosmJKBagLlkdSS/9FnsoEoF
    HQRRM2K+Gtwh8LGgxAJGl3b4Kxa6LmS5oJIGxNCYIs0/VLoQ3KFhCQwedrBH/SGpLGcY3b
    Vb4hDKPuzmQLhNd9+7KgsDmfb8fceLkPeA17pHmpxVIjAjP9TR4BAAAD4OrZwkkDqpkOuf
    pzlljsCV0O2xFGhu1HsDhTCYLcTg4+SU3V96hKfCyEAL5Op9IgvrOXj4fa1gvM4Mo3kz+h
    hTu/os1/AVJ5Wa9JwVnq9Ncygw0nMyFXGGZAROjIoGy7TKMZ0/
    -----END OPENSSH PRIVATE KEY-----
```

### Ecrire dans un fichier de key depuis un terminal

```ps
nano ~/.ssh/id_rsa.pub
```

### Utiliser différents comptes sur une seule instance GitLab

- [Utiliser différents comptes sur une seule instance GitLab](https://docs.gitlab.com/ee/user/ssh.html#use-different-accounts-on-a-single-gitlab-instance)

1. Creer un fichier nommé config dans le dosier ~/.ssh

```ps
touch ~/.ssh/config
```

2. Accéder au fichier config en écriture 

```ps
sudo nano ~/.ssh/config
```

3. Ecrire les user dans le fichier config

- **Host** : Le nom qu'on va donner au host
- **Hostname** : Toujours mettre gitlab.com
- **PreferredAuthentications** : On indique que l'on veut s'authentifier via la clé publique
- **IdentityFile** : Mettre le chemin du fichier publique qu'on va tiliser pour un user précis

```ps
# config

# User1 Account Identity
Host user1@gmail.com
  Hostname gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_1.pub

# User2 Account Identity
Host user2@gmail.com
  Hostname gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_2.pub
```

4. Dire a git de choisir le bon fichier de clé
```ps
git config core.sshCommand "ssh -o IdentitiesOnly=yes -i ~/.ssh/<NOM_DE_CLE_PRIVEE> -F /dev/null"
```


## 

### vous utilisez plusieurs clés en même temps, vérifiez par :
```ps
ssh-add -l
```

### contrôle d'authentification pour github par exemple
```ps
ssh -T git@github.com
```

### Voir des clé privé et publique via leurs nom de fichiers
```ps
ls | grep id_rsa
```

### Essayez de pousser vers le référentiel en utilisant la clé qui sensé etre associée au repository
```ps
ssh -i ~/.ssh/id_rsa git@github.com

# retour
Hi user/project! You've successfully authenticated, but GitHub does not provide shell access.
```

### Ajoutez une clé ssh dans l'user agent
```ps
ssh-add /home/my_user/.ssh/my_key
```

### Supprimez toutes les clés de votre agent SSH et rajoutez uniquement la clé de compte correcte.
```ps
ssh-add -D
```


## Configurer .ssh/config

Ce code est un exemple de configuration du fichier ~/.ssh/config, qui permet de configurer les options de connexion SSH pour différents hôtes.

Dans ce cas, le code définit une configuration pour l'hôte my_bridge. Il spécifie que l'hôte a une adresse IP de 161.35.197.155 et que la connexion doit être effectuée en utilisant l'utilisateur medev.

Lorsqu'un utilisateur essaie de se connecter à l'hôte my_bridge à partir de la machine locale, la configuration définie dans le fichier ~/.ssh/config sera utilisée pour établir la connexion. Il n'est pas nécessaire de spécifier l'adresse IP ou l'utilisateur lors de la connexion, car ces informations sont déjà définies dans la configuration.

```ps

Host my_bridge
    Hostname 711.307.194.247
    User medev
```

Ce code est un exemple de configuration du fichier ~/.ssh/config, qui permet de configurer les options de connexion SSH pour différents hôtes.

Dans ce cas, le code définit une configuration pour l'hôte projet-prod. Il spécifie que la connexion à cet hôte doit être effectuée en utilisant l'utilisateur my_user_remonte. De plus, la connexion doit être établie via un proxy, en utilisant la commande ssh avec l'option -o 'ForwardAgent yes'.

Le proxy lui-même est défini comme my_bridge, ce qui signifie que la connexion initiale sera établie avec cet hôte. Ensuite, la commande ssh-add est utilisée pour ajouter les clés d'authentification à l'agent SSH en cours d'exécution sur la machine locale, ce qui permet d'authentifier la connexion à l'hôte distant. Enfin, la commande nc 127.147.014.77 22 est utilisée pour rediriger le trafic SSH vers le port 22 de l'hôte distant, qui est le port par défaut pour les connexions SSH.

En résumé, cette configuration permet d'établir une connexion sécurisée SSH à l'hôte aecale-prod en utilisant un proxy et en redirigeant le trafic via un port spécifié.

```ps

Host projet-prod
    User my_user_remonte
    ProxyCommand ssh -o 'ForwardAgent yes' my_bridge 'ssh-add && nc 127.147.014.77 22'
```