# Génération des clés publiques SSH sous linux

Site [GIT](https://git-scm.com/book/fr/v2/Git-sur-le-serveur-G%C3%A9n%C3%A9ration-des-cl%C3%A9s-publiques-SSH)

## Génération des clés publiques SSH

De nombreux serveurs Git utilisent une authentification par clés publiques SSH. 

Pour fournir une clé publique, chaque utilisateur de votre système doit la générer s’il n’en a pas déjà. 

Le processus est similaire sur tous les systèmes d’exploitation. 

Premièrement, l’utilisateur doit vérifier qu’il n’en a pas déjà une. Par défaut, les clés SSH d’un utilisateur sont stockées dans le répertoire **~/.ssh** du compte. 

Vous pouvez facilement vérifier si vous avez déjà une clé en listant le contenu de ce répertoire :

    > cd ~/.ssh
    > ls

    authorized_keys2  id_dsa       known_hosts
    config            id_dsa.pub

Recherchez une paire de fichiers appelés quelquechose et quelquechose`.pub` où le quelquechose en question est généralement **id_dsa** ou **id_rsa**. 

Le fichier en **.pub** est la clé publique tandis que l’autre est la clé privée. 

Si vous ne voyez pas ces fichiers (ou n’avez même pas de répertoire .ssh), vous pouvez les créer en lançant un programme appelé **ssh-keygen** fourni par le paquet SSH sur les systèmes Linux/macOS et MSysGit pour Windows :

    > ssh-keygen -o

    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/schacon/.ssh/id_rsa):
    Created directory '/home/schacon/.ssh'.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /home/schacon/.ssh/id_rsa.
    Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
    The key fingerprint is:
    d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local

Premièrement, le programme demande confirmation de l’endroit où vous souhaitez sauvegarder la clé (.ssh/id_rsa) puis il demande deux fois d’entrer un mot de passe qui peut être laissé vide si vous ne souhaitez pas devoir le taper quand vous utilisez la clé. 

Cependant, si vous utilisez un mot de passe, assurez-vous d’ajouter l’option **-o** ; cela sauvegarde la clé privé dans un format qui est plus résistant au craquage par force brute des mots de passe que le format par défaut.

Maintenant, chaque utilisateur ayant suivi ces indications doit envoyer la clé publique à la personne en charge de l’administration du serveur Git (en supposant que vous utilisez un serveur SSH réglé pour l’utilisation de clés publiques). Ils doivent copier le contenu du fichier **.pub** et l’envoyer par courriel. 

Les clés publiques ressemblent à ceci :

    > cat ~/.ssh/id_rsa.pub

    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
    GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
    Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
    t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
    mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
    NrRFi9wrf+M7Q== schacon@mylaptop.local

Les clés secrètes ressemblent à ceci :

    > cat ~/.ssh/id_rsa

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
