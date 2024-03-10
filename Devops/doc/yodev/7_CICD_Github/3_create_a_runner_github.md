# Créer un runner pour github

## Créer un runner manuellement sous Linux : Debian ou Ubuntu

0. Aller dans le repository du projet en question puis au chemin **Settings > Actions > Runners > new  self-hosted runner**, on peut suivre les commandes afficher.

Les hash et token sont a voir directement depuis le projet en question.

### Télécharger

1. Créer le dossier actions-runneret rentrer dedans
```ps
# Create a folder
mkdir actions-runner && cd actions-runner
```

2. Téléchargez le dernier package de coureur
```ps
# Download the latest runner package
curl -o actions-runner-linux-x64-2.301.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.301.1/actions-runner-linux-x64-2.301.1.tar.gz
```

3. Facultatif : valider le hachage
```ps
# Optional: Validate the hash
echo "3ee9c3b83de642f9199185585555555555555518827da785d034c1163f8efdf907  actions-runner-linux-x64-2.301.1.tar.gz" | shasum -a 256 -c
```

4. Extraire le programme d'installation
```ps
# Extract the installer
tar xzf ./actions-runner-linux-x64-2.301.1.tar.gz
```

### Configurer

5. Créer le runner et démarrer l'expérience de configuration
```ps
# Create the runner and start the configuration experience
$ ./config.sh --url https://github.com/user18121/symfony-github --token AKRN555555555555555JONCVI24TD46GMO
```

l'expérience de configuration
```ps
--------------------------------------------------------------------------------
|        ____ _ _   _   _       _          _        _   _                      |
|       / ___(_) |_| | | |_   _| |__      / \   ___| |_(_) ___  _ __  ___      |
|      | |  _| | __| |_| | | | | '_ \    / _ \ / __| __| |/ _ \| '_ \/ __|     |
|      | |_| | | |_|  _  | |_| | |_) |  / ___ \ (__| |_| | (_) | | | \__ \     |
|       \____|_|\__|_| |_|\__,_|_.__/  /_/   \_\___|\__|_|\___/|_| |_|___/     |
|                                                                              |
|                       Self-hosted runner registration                        |
|                                                                              |
--------------------------------------------------------------------------------

# Authentication


√ Connected to GitHub

# Runner Registration

Enter the name of the runner group to add this runner to: [press Enter for Default] 

Enter the name of runner: [press Enter for user18121] jonas-runner-github

This runner will have the following labels: 'self-hosted', 'Linux', 'X64' 
Enter any additional labels (ex. label-1,label-2): [press Enter to skip] Linux

√ Runner successfully added
√ Runner connection is good

# Runner settings

Enter name of work folder: [press Enter for _work] 

√ Settings Saved.
```

6. Lancer le runner
```ps
# Last step, run it!
$ ./run.sh
```


### Utilisation de votre coureur auto-hébergé

7. Dans le fichier yaml , utilisez votre runner via **runs-on: self-hosted**
```ps
# Use this YAML in your workflow file for each job
runs-on: self-hosted
```