# Définir des identifiants dans git


Pour définir des identifiants spécifiques à un projet dans Git. <br> 
Les commandes `git config` permettent de configurer les paramètres pour trois niveaux différents :

### 1. Local (spécifique au projet) :

C'est ce que nous avons configuré avec `git config --local`. Les informations sont enregistrées dans le fichier .git/config à la racine du projet.

### 2. Global (pour l'utilisateur) :

Défini avec `git config --global`, ces paramètres sont stockés dans le fichier ~/.gitconfig et utilisés pour tous les projets sauf si des paramètres locaux existent.

### 3. Système (pour tous les utilisateurs sur une machine) :

Défini avec `git config --system`, ces paramètres sont rarement utilisés, sauf pour des configurations partagées sur une machine.

## Étapes pour configurer des identifiants spécifiques à un projet :

Dans Git, vous pouvez configurer des paramètres spécifiques à un projet en utilisant un fichier de configuration local situé dans le répertoire `.git` du projet. <br> 
Voici comment procéder pour utiliser un `user.name` et un `user.email` différents pour un projet spécifique :

1. Accédez au répertoire du projet :
```bash
cd /chemin/vers/votre/projet
```

2. Configurez les identifiants locaux pour le projet : Utilisez la commande `git config` avec l'option `--local` (qui agit uniquement sur le projet actuel) :
```bash
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"
```

3. Vérifiez les paramètres configurés pour le projet : Pour vous assurer que les identifiants sont bien configurés pour ce projet :
```bash
git config --list

# OU 
git config --local --list

# Vous verrez une sortie contenant les informations de l'utilisateur pour ce projet, comme :

user.name=Votre Nom
user.email=votre.email@example.com
```
Bravo !!!

## Vérifications et Dépannage

Cependant, si cela ne semble pas fonctionner comme prévu, voici quelques points à vérifier :

1. Vérifiez la configuration locale du projet : Assurez-vous que le user.name et user.email sont bien enregistrés dans le fichier de configuration local :

```bash
git config --local --list
```

Vous devriez voir les identifiants spécifiques que vous avez configurés.

2. Forcer l'utilisation des identifiants locaux : Si Git utilise toujours les paramètres globaux, supprimez-les temporairement ou remplacez-les pour ce projet :

```bash
git config --global --unset user.name
git config --global --unset user.email
```

3. Assurez-vous que le commit utilise les bons identifiants : Vérifiez les identifiants utilisés pour un commit :

```bash
git log --format='%an <%ae>' -n 1
```

Cela affichera le nom (%an) et l'email (%ae) utilisés dans le dernier commit.

4. Conflit avec SSH ou HTTPS : Si vous utilisez des comptes différents sur GitHub/GitLab, les clés SSH ou les tokens peuvent poser problème. Configurez un fichier `~/.ssh/config` pour gérer plusieurs comptes SSH si nécessaire.

5. Forcer les informations sur un commit : Si vous souhaitez vérifier immédiatement, vous pouvez également fournir des informations au moment du commit sans affecter la configuration :

```bash
git commit --author="Nom <email@example.com>" -m "Votre message"
```

