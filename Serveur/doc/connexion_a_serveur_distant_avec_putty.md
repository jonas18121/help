# Se Connecter à un serveur distant sur Windows avec PuTTy


Site : https://www.malekal.com/generer-et-se-connecter-en-ssh-avec-des-cles-ssh/

1) Télécharger et installer PuTTy via le setup MSI, a cette adresse : https://telecharger.malekal.com/download/putty/


## Générer les clés SSH

### PuTTYgen

2) Lancez `PuTTYgen`, l'utilitaire pour gérer les clés SSH

3) Cliquez sur le bouton `Generate` afin générer les clés SSH

    Notez que le menu `Conversions` vous permet d'importer des clés SSH déjà générées.

3) Bougez la souris pour terminer la génération des clés SSH

4) Saisissez la phrase de mot de passe dans Key `passphrase` et `confirm passphrase`

5) Puis cliquez sur le bouton `Save private key` afin d'enregistrer le fichier de clés `privée`

6) Enregistrez le fichier PPK dans votre PC dans un emplacement sûr (Le fichier PPK est votre clé privée, elle ne doit pas être récupérée par un tiers car elle vous permet de vous connecter à votre serveur SSH.
Stockez le fichier dans un emplacement sécurisé.)

7) puis cliquez sur le bouton `Save public key` afin d'enregistrer le fichier de clés `public`

### Dans le serveur distant

8) Connectez vous à la machine cible (serveur distant)

9) Éditez le fichier `~/.ssh/authorized_keys` du (serveur distant)

10) Copiez/collez le contenu du champs `Key / Public key for pasting info OpenSSH authorized_keys file` qui est dans `PuTTYgen`

11) Puis enregistrez le contenu du fichier authorized_keys

Bravo ! vous avez réussi à générer des clés SSH sur Windows avec PuTTY.

## Se connecter à un serveur SSH avec des clés SSH


## PuTTy 

12) Ouvrez PuTTy sur PC Windows (`PuTTY Configuration`)

13) On indique le champs `Host Name (or IP addresse)`,
exemple l'adresse ip du serveur xxx.xxx.xxx.x

14) On indique le champ `Port`, généralement le 22 fait l'affaire

15) Saisissez le nom d'une sessions dans le champ `Saved Session`

16) puis cliquez sur le bouton `Save`

17) Puis à gauche, allez dans le menu `Connection => SSH => Auth`

18) Dans le champ `Private key file for authentification`, cliquez sur `Browse` et Sélectionnez le `fichier PPK` de la `clé privée` généré précédemment,

19) Retournez dans le menu `Session` puis cliquez sur le bouton `Save` pour enregistrer les changements

20) Lancez la connexion SSH en cliquant sur le bouton `Open`

21) Saisissez le `nom d'utilisateur` que vous utilisez pour vous connecter au serveur généralement


22) Puis Saisissez la `passphrase`

Bravo ! vous avez réussi à vous connecter à un serveur SSH avec une authentification par clés SSH.