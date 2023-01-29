# PHPSTAN

- [PHP STAN](https://phpstan.org/user-guide/getting-started)
- [Liste des exentions](https://phpstan.org/user-guide/extension-library#framework-specific-extensions)
- [Exention phpstan pour Symfony](https://github.com/phpstan/phpstan-symfony)

## Installation

### Installer phpstan
```ps
composer require --dev phpstan/phpstan
```

### Pour installer les extentions necéssaire selon la conf de phpstan
```ps
composer require --dev phpstan/extension-installer
```

### Installer l'extention phpstan pour Symfony
- [Liste des extentions](https://phpstan.org/user-guide/extension-library#framework-specific-extensions)
- [Github de l'extention phpstan pour Symfony](https://github.com/phpstan/phpstan-symfony)
- [Niveau de règles](https://phpstan.org/user-guide/rule-levels)
```ps
composer require --dev phpstan/phpstan-symfony
```

### Créer le fichier phpstan.neon à la racine du projet

- **level** : Le niveau de niveau de règles a respecter de 0 à 9
- **ignoreErrors** : Erreurs à ignorer, dans le fichier ci-dessous on ignore toutes les erreurs qui contiennent les phrases listé
- **excludePaths** : Fichiers/dossiers à exclure
- **paths** : Fichiers/dossiers que l'on veut analyser

```ps
# phpstan.neon


parameters:
    level: 6

    symfony:
        container xml path: var/cache/dev/App KernelDevDebugContainer.xml

    ignoreErrors:
        - '#no type specified#'
        - '#Component#'
        - '#never written, only read#'
        - '#expects int, string given#'
        - '#is always true#'
        - '#Call to an undefined#'


    excludePaths:
	- tests/tmp/*
	- tests/*/data/*

    paths:
        - src
```

## Utilisation

### Commande pour lancer une analyse dans le dossier src

On n'a pas besoin de préciser que l'on veut lancer l'analyse dans le dossier **src** puisqu'il est déjà precisé dans le fichier **phpstan.neon**
```ps
vendor/bin/phpstan analyse src
```
