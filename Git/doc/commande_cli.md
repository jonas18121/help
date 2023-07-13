# Commande CLI Git


## Afficher les informations d'aide sur Git

    > git --help 


## Obtenir et définir un référentiel ou des options globales

    > git help config


## Configurer les préférences de l’utilisateur

    > git config

### Configurer le nom de l'utilisateur

    > git config --global user.name "xxx"

### Configurer l'email de l'utilisateur

    > git config --global user.email xxx@example.com

### Configurer notre éditeur pour la création et l’édition des messages de validation et d’étiquetage

    > git config --global core.editor vim

### Répertoriez toutes les variables définies dans le fichier de configuration, ainsi que leurs valeurs.

    > git config --list  

### Vous pouvez voir tous vos paramétrages et d’où ils viennent en utilisant :
```ps
git config --list --show-origin
```

### configurer son identité
```ps
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

## Créer un nouveau dépôt GIT

    > git init

## Cloner un dépôt qui se trouve sur un serveur distant

    > git clone XXXXX.git

## Ajouter des fichiers à l’index

    > git add .

## Valider les modifications apportées au HEAD avec un message

    > git commit -m "xxxxx"

## Pour passer simplement d’une branche à une autre
    
    > git checkout nom_branche

## Forcer le passage d’une branche à une autre
    
    > git checkout nom_branche -f

### creer une branche et basculer directement dessus 

    > git checkout -b nom_branche

## Afficher l'état de l'arborescence de travail 

### ( voir l'état de mon git )

    > git status 

## Voir toutes les branches créer et disponible en local

    > git branch

## Supprimer une branche

    > git branch -d nom_branche

## Forcer la suppression d'une branche

    > git branch -D nom_branche

## Récupérer/fusionner toutes les modifications présentes sur le dépôt distant dans le répertoire de travail local

    > git pull

### Si erreur : fatal: refus de fusionner des historiques sans relation

Si erreur : `fatal: refus de fusionner des historiques sans relation`, ajouter `--allow-unrelated-histories` et pas obliger de mettre `-vf` (verbeux et force)

    > git pull -vf origin <nom_branch> --allow-unrelated-histories

## Fusionner une branche dans la branche active

    > git merge nom_branch

## Aide à enregistrer les changements qui ne doivent pas être commit immédiatement. C’est un commit temporaire

    > git stash

## Afficher des informations sur tout fichier git

    > git show

## Extraire tous les fichiers du dépôt distant qui ne sont pas actuellement dans le répertoire de travail local

    > git fetch origin

## Voir sur quel dépôt distant on pointe

    > git remote -v

### Permet à l’utilisateur de connecter le dépôt local à un serveur distant:

    > git remote add origin xxxx.git


## Afficher les journaux de validation ( voir les sha )

    > git log  

### Avoir un visuel d'un dossier/fichier précis 

- Un visuel sur tous ses log ainsi que toutes les modifications qui on été faites dans chaque log de ce dossier/fichier précis

    > git log -p XXXX.php 

### Voir le sha ainsi que le message du commit des dossier/fichiers précis

    > git log --oneline XXXX.php

## Modification du dernier commit

    > git commit --amend 

## Récupérer une branche supprimer avec git branch -D

Si vous avez utilisé la commande "git branch -D" pour supprimer une branche dans Git, il est possible de récupérer cette branche si vous avez effectué la suppression de manière récente.

Lorsque vous supprimez une branche avec "git branch -D", les commits associés à cette branche ne sont pas immédiatement supprimés. Cependant, la référence de la branche est supprimée, ce qui la rend invisible dans la liste des branches.

Pour récupérer une branche supprimée, vous pouvez utiliser la commande "git reflog" pour afficher l'historique des références de votre dépôt Git. Cela inclut également les références de branches supprimées.

Voici les étapes à suivre pour récupérer une branche supprimée :

1. Ouvrez un terminal ou une invite de commandes.

2. Accédez au répertoire de votre dépôt Git.

3. Exécutez la commande suivante pour afficher l'historique des références (y compris les références de branches supprimées) :

```ps
git reflog
```
**Retour**
```ps
ecfab4a7 HEAD@{3}: checkout: moving from fix/todo to develop
64715b9b (origin/fix/todo) HEAD@{4}: commit: [Fix] : comment commit
536258d56e HEAD@{5}: commit: [Fix] : js select 3
b75135fa90 HEAD@{6}: commit: [Fix] : js select
```

Parcourez la liste des commits et des actions effectuées sur les branches pour trouver l'identifiant (commit hash) du commit le plus récent de la branche supprimée.

Une fois que vous avez identifié l'identifiant du commit, vous pouvez recréer la branche supprimée en utilisant la commande suivante :

```ps
git branch branch_name commit_hash
```
**Exemple**
```ps
git git branch fix/todo 64715b9b
```

Remplacez "branch_name" par le nom de la branche que vous souhaitez recréer et "commit_hash" par l'identifiant du commit que vous avez trouvé à l'étape précédente.

Vous pouvez ensuite récupérer les modifications de la branche en utilisant la commande :

```ps
git checkout branch_name
```

```ps
git checkout fix/todo
```

Cela vous placera sur la branche récupérée avec les modifications et le contenu tels qu'ils étaient au moment de la suppression.

Veuillez noter que si vous avez effectué un push de la branche supprimée avant de la récupérer, vous devrez également la restaurer sur le dépôt distant en utilisant la commande "git push origin branch_name".


## Interface graphique du dépôt local 

    gitk

## Afficher les changements entre les validations, les validations et l'arborescence de travail, etc

    > git diff

## Créer un fichier zip ou tar contenant les composants d’un arbre du dépôt

    > git archive --format=tar master


## Annuler / supprimer des commit

### Supprimer / annuler un commit précis

    > git revert XXXX.php 

### Annulé les 3 derniers commit 

    > git reset HEAD~3  

### Annulé vraiment un fichier d'un commit

    > git reset --soft HEAD^1 

Puis

### Supprimer le fichier du cache 

    > git rm --cached XXXX.php

### Peut être utilisé pour supprimer des fichiers de l’index et du répertoire de travail

    > git rm xxxxx.php

### Retirer des fichiers de stagging à working avant de commit

    > git reset XXXXT.php 

### Retirer un fichier précis avant de commit

    > git reset HEAD XXXXT.php 


## Fusionne 2 branch comme git merge 

    > git rebase nom_de_la_branch  

## Pour ajouter une exception pour ce dépôt, lancez :
```bash
git config --global --add safe.directory <path_of_directory>
```
## Quand on a plusieurs clés SSH et qu'on veut que soit automatiquement choisie la bonne :

1. Commande :
```ps
git config core.sshCommand "ssh -o IdentitiesOnly=yes -i ~/.ssh/<NOM_DE_CLE_PRIVEE> -F /dev/null"
```
2. Puis, dans ~.ssh/config :
```ps
# User1 Account Identity
   Host <USER>
     Hostname gitlab.com
     PreferredAuthentications publickey
     IdentityFile ~/.ssh/<NOM_DE_CLE_PRIVEE>
```
3. Et enfin : 
```ps
git remote add origin git@gitlab.com:<USER>/<REPOSITORY>.git
```

## Généré une clé SSH

    > ssh.keygen -t rsa -b 8096 

### Linux voir clé  id_rsa et le id_rsa_pub

    > ls -l /xxx/xxx/xxx/.ssh/ 

### Voir la clé public

    > cat /xxx/xxx/xxx/.ssh/.id_rsa_pub 

### Voir la clé privée

    > cat  /xxx/xxx/xxx/.ssh/.id_rsa

//////////////////////////////////

### Configurer gitlab avec SSH
    
    > git remote origin
    > git remote -v
    > git remote add origin ssh://git@xxxxxxxx:10022/xxxx.git
    (ssh://git@git.bilbloke.tech:.....)


## équivalent de git log avec un graphique

gitk,  gitg,  gitkraken,  ungit  


## Commande cli normale

### Savoir où on ce situe
    
    > pwd 

### Créé un répertoire 

    > mkdir 

### Vider le cache

    > clear


## commande linux

man git

sudo mkdir XXXXT.php  ( forcer le création d'un dossier )

Sudo chmod 777 xxx ( changer les droits d'accès )


ls ou ls -l  ( lister le contenu )


man ls  ( voir les commandes de Linux )