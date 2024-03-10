# Les scripts shell .sh

## Intro 

Dans Symfony, un fichier avec l'extension `.sh` est généralement un fichier de script shell (ou script Bash) qui est utilisé pour automatiser des tâches ou des opérations spécifiques dans le cadre de votre application Symfony. Ces scripts shell sont écrits en langage de script shell, tel que Bash, **et peuvent être exécutés en utilisant un terminal ou une ligne de commande**.

Les scripts shell ".sh" peuvent être utilisés pour diverses tâches, telles que :

1. **Gestion de déploiement** : Vous pouvez créer des scripts shell pour automatiser le processus de déploiement de votre application Symfony, y compris la copie de fichiers, la mise à jour de la base de données, la gestion des dépendances, etc.

2. **Tâches de maintenance** : Les scripts shell peuvent être utilisés pour automatiser des tâches de maintenance telles que la sauvegarde de la base de données, la suppression de fichiers temporaires, la rotation des journaux, etc.

3. **Gestion des données** : Vous pouvez créer des scripts shell pour importer/exporter des données dans votre application Symfony depuis/vers des sources externes, telles que des fichiers CSV, des bases de données, etc.

4. **Exécution de tests automatisés** : Les scripts shell peuvent être utilisés pour exécuter automatiquement des tests unitaires, des tests fonctionnels ou d'autres types de tests dans votre application Symfony.

5. **Nettoyage de cache** : Vous pouvez automatiser le processus de nettoyage du cache Symfony à l'aide de scripts shell.

6. **Configuration de l'environnement** : Vous pouvez utiliser des scripts shell pour configurer l'environnement de développement ou de production de votre application Symfony.

7. **Gestion des dépendances** : Les scripts shell peuvent être utilisés pour installer ou mettre à jour des dépendances et des bibliothèques requises par votre application Symfony.

8. **Tâches planifiées** : Vous pouvez utiliser des scripts shell avec des tâches planifiées (cron jobs) pour exécuter des tâches récurrentes à des intervalles spécifiques.

En résumé, les fichiers `.sh` dans Symfony sont des scripts shell qui peuvent être utilisés pour automatiser diverses tâches liées au développement, au déploiement et à la maintenance de votre application Symfony. Ils offrent un moyen pratique d'automatiser des opérations courantes et de simplifier la gestion de votre projet Symfony.

### Exemple

Voici un exemple simple d'un fichier de script shell `.sh` qui pourrait être utilisé dans un projet Symfony. Supposons que vous souhaitiez automatiser le processus de nettoyage du cache Symfony à l'aide d'un script shell. Vous pouvez créer un fichier `clean_cache.sh` avec le contenu suivant :

Dans `clean_cache.sh`
```sh
#!/bin/bash
# Ce script nettoie le cache Symfony

# Chemin vers le répertoire du projet Symfony
SYMFONY_DIR="/chemin/vers/votre/projet/symfony"

# Se déplacer dans le répertoire du projet Symfony
cd "$SYMFONY_DIR" || exit 1

# Nettoyer le cache
php bin/console cache:clear

# Afficher un message de confirmation
echo "Le cache Symfony a été nettoyé avec succès."
```

Ce script fait ce qui suit :

1. Il spécifie le chemin vers le répertoire de votre projet Symfony dans la variable SYMFONY_DIR.

2. Il se déplace dans le répertoire du projet Symfony en utilisant la commande cd.

3. Il utilise la commande Symfony Console php bin/console cache:clear pour nettoyer le cache Symfony.

4. Enfin, il affiche un message de confirmation indiquant que le cache a été nettoyé.

Vous pouvez exécuter ce script en ouvrant un terminal, en vous plaçant dans le répertoire où se trouve le script, et en exécutant la commande suivante :

```sh
./clean_cache.sh
```

Assurez-vous de donner au fichier `.sh` la permission d'exécution en utilisant `chmod +x clean_cache.sh` si ce n'est pas déjà fait.

Ceci est un exemple simple, mais les scripts shell peuvent être beaucoup plus complexes et peuvent automatiser des tâches plus avancées en fonction des besoins de votre projet Symfony. Ils sont particulièrement utiles pour automatiser des tâches de déploiement, de maintenance et de gestion des serveurs.

