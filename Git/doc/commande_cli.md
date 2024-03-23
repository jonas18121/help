# Commande CLI Git


## Afficher les informations d'aide sur Git

```bash
git --help 
```
    


## Obtenir et définir un référentiel ou des options globales

```bash
git help config
```

## Configurer les préférences de l’utilisateur

```bash
git config
```

### Configurer le nom de l'utilisateur

```bash
git config --global user.name "xxx"
```

### Configurer l'email de l'utilisateur

```bash
git config --global user.email xxx@example.com
```

### Configurer notre éditeur pour la création et l’édition des messages de validation et d’étiquetage

```bash
git config --global core.editor vim
```

### Répertoriez toutes les variables définies dans le fichier de configuration, ainsi que leurs valeurs.

```bash
git config --list  
```

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

```bash
git init
```

## Cloner un dépôt qui se trouve sur un serveur distant

```bash
git clone XXXXX.git
```

## Ajouter des fichiers à l’index

```bash
git add .
```

## Valider les modifications apportées au HEAD avec un message

```bash
git commit -m "xxxxx"
```

## Pour passer simplement d’une branche à une autre

```bash    
git checkout nom_branche
```

## Forcer le passage d’une branche à une autre

```bash    
git checkout nom_branche -f
```

### creer une branche et basculer directement dessus 

```bash
git checkout -b nom_branche
```

## Afficher l'état de l'arborescence de travail 

### ( voir l'état de mon git )

```bash
git status 
```

## Voir toutes les branches créer et disponible en local

```bash
git branch
```

## Supprimer une branche

```bash
git branch -d nom_branche
```

## Forcer la suppression d'une branche

```bash
git branch -D nom_branche
```

## Récupérer/fusionner toutes les modifications présentes sur le dépôt distant dans le répertoire de travail local

```bash
git pull
```

### Si erreur : fatal: refus de fusionner des historiques sans relation

Si erreur : `fatal: refus de fusionner des historiques sans relation`, ajouter `--allow-unrelated-histories` et pas obliger de mettre `-vf` (verbeux et force)

```bash
git pull -vf origin <nom_branch> --allow-unrelated-histories
```

## Fusionner une branche dans la branche active

```bash
git merge nom_branch
```

## Aide à enregistrer les changements qui ne doivent pas être commit immédiatement. C’est un commit temporaire

```bash
git stash
```

### Remettre votre branche develop dans son état précédent sans les modifications non commitées et de déplacer ces modifications vers une nouvelle branche

1. **Stasher les modifications non commitées :** Utilisez la commande `git stash` pour mettre de côté les modifications non commitées.

```bash
git stash
```

2. **Créer la nouvelle branche db/migration :** Utilisez `git checkout -b new_branch` pour créer une nouvelle branche à partir de develop.

```bash
git checkout -b new_branch
```

3. **Appliquer les modifications stachées à la nouvelle branche :** Utilisez `git stash pop` pour appliquer les modifications que vous avez mises de côté à votre nouvelle branche.

```bash
git stash pop
```

4. **Vérifier et continuer votre travail :** Utilisez `git status` et `git diff` pour vérifier les modifications appliquées et continuez à travailler sur votre nouvelle branche comme nécessaire.

```bash
git status

git diff
```

Ces étapes devraient vous permettre de gérer efficacement vos modifications non commitées et de les déplacer vers une nouvelle branche tout en maintenant un historique de travail propre et organisé.

## Afficher des informations sur tout fichier git

```bash
git show
```

## Extraire tous les fichiers du dépôt distant qui ne sont pas actuellement dans le répertoire de travail local

```bash
git fetch origin
```

## Voir sur quel dépôt distant on pointe

```bash
git remote -v
```

### Permet à l’utilisateur de connecter le dépôt local à un serveur distant:

```bash
git remote add origin xxxx.git
```

## Afficher les journaux de validation ( voir les sha )

```bash
git log  
```

### Avoir un visuel d'un dossier/fichier précis 

- Un visuel sur tous ses log ainsi que toutes les modifications qui on été faites dans chaque log de ce dossier/fichier précis

```bash
git log -p XXXX.php 
```

### Voir le sha ainsi que le message du commit des dossier/fichiers précis

```bash
git log --oneline XXXX.php
```

## Modification du dernier commit

```bash
git commit --amend 
```

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

```bash
gitk
```

## Afficher les changements entre les validations, les validations et l'arborescence de travail, etc

```bash
git diff
```

## Créer un fichier zip ou tar contenant les composants d’un arbre du dépôt

```bash
git archive --format=tar master
```

## Annuler / supprimer des commits

### Supprimer / annuler un commit précis

```bash
git revert XXXX.php 
```

### Annulé les 3 derniers commit 

```bash
git reset HEAD~3  
```

### Annulé vraiment un fichier d'un commit

```bash
git reset --soft HEAD^1 
```

Puis

### Supprimer le fichier du cache 

```bash
git rm --cached XXXX.php
```

### Peut être utilisé pour supprimer des fichiers de l’index et du répertoire de travail

```bash
git rm xxxxx.php
```

### Retirer des fichiers de stagging à working avant de commit

```bash
git reset XXXXT.php 
```

### Retirer un fichier précis avant de commit

```bash
git reset HEAD XXXXT.php 
```

---

### Pour revenir à un ancien commit avec Git en ligne de commande (Supprimer, Annuler)

Pour revenir à un ancien commit avec Git en ligne de commande lorsque le dernier commit contient des données erronées, vous pouvez utiliser la commande git reset. Voici les étapes pour revenir à un ancien commit :

1. **Identifier le commit à revenir :** Utilisez la commande `git log` pour afficher l'historique des commits et repérez le commit auquel vous souhaitez revenir. Notez son identifiant (SHA-1) ou son nom de référence.

```bash
git log
```

2. **Effectuer un reset :** Utilisez la commande `git reset --hard <commit>` où `<commit>` est l'identifiant du commit auquel vous souhaitez revenir. Par exemple :

```bash
git reset --hard abc123
```

Assurez-vous de remplacer "abc123" par l'identifiant réel du commit auquel vous voulez revenir.

- **--hard :** Cela signifie que le reset sera effectué de manière "dure", ce qui signifie que tous les changements après le commit spécifié seront supprimés de l'index et de l'arborescence de travail.

3. **Optionnel : Remonter la branche (si nécessaire) :** Si vous avez déjà poussé les commits indésirables vers un dépôt distant, vous devrez peut-être forcer la mise à jour de votre référence de branche avec la version réinitialisée. Pour cela, utilisez :

```bash
git push origin +<votre_branche>
```

Cependant, soyez prudent avec cette commande car elle force la mise à jour du dépôt distant et peut entraîner une perte de données pour les autres collaborateurs.

près avoir effectué ces étapes, votre référence de branche devrait pointer vers l'ancien commit spécifié, annulant ainsi les commits ultérieurs avec les données erronées. Assurez-vous de sauvegarder les modifications locales importantes avant d'effectuer le reset, car cela peut entraîner la perte de données non sauvegardées.

> [!IMPORTANT]
> Le signe plus (`+`) dans la commande `git push origin +<votre_branche>` indique à Git de forcer la mise à jour de la branche distante avec la branche locale, même si cela implique une perte de commits sur la branche distante. <br><br>
> Normalement, lorsqu'une branche est poussée vers un dépôt distant, Git vérifie si les commits de la branche distante sont en avance sur ceux de la branche locale. Si tel est le cas, Git refuse de pousser la branche locale vers le dépôt distant pour éviter d'écraser les commits existants sur la branche distante. Cependant, en utilisant le signe plus (`+`), vous forcez Git à mettre à jour la branche distante avec la branche locale, même si cela entraîne la perte de commits sur la branche distante.<br><br>
> Cela peut être utile dans certaines situations, par exemple, lorsque vous avez besoin de réécrire l'historique des commits d'une branche pour corriger des erreurs ou pour synchroniser votre dépôt local avec le dépôt distant après un reset.<br><br>
> Cependant, l'utilisation du signe plus dans `git push` est une opération puissante et peut entraîner la perte de données si elle est utilisée de manière incorrecte. Il est important de l'utiliser avec prudence  et de s'assurer que vous comprenez les implications de cette action, en particulier si d'autres collaborateurs travaillent sur la même branche.









## Fusionne 2 branch comme git merge 

```bash
git rebase nom_de_la_branch  
```

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

```bash
ssh.keygen -t rsa -b 8096 
```

### Linux voir clé  id_rsa et le id_rsa_pub

```bash
ls -l /xxx/xxx/xxx/.ssh/ 
```

### Voir la clé public

```bash
cat /xxx/xxx/xxx/.ssh/.id_rsa_pub 
```

### Voir la clé privée

```bash
cat  /xxx/xxx/xxx/.ssh/.id_rsa
```

//////////////////////////////////

### Configurer gitlab avec SSH

```bash    
git remote origin
git remote -v
git remote add origin ssh://git@xxxxxxxx:10022/xxxx.git
    (ssh://git@git.bilbloke.tech:.....)
```

## équivalent de git log avec un graphique

gitk,  gitg,  gitkraken,  ungit  


## Commande cli normale

### Savoir où on ce situe

```bash 
pwd 
```

### Créé un répertoire 

```bash
mkdir 
```

### Vider le cache

```bash
clear
```

## commande linux

```bash
man git

sudo mkdir XXXXT.php  ( forcer le création d'un dossier )

Sudo chmod 777 xxx ( changer les droits d'accès )


ls ou ls -l  ( lister le contenu )


man ls  ( voir les commandes de Linux )
```