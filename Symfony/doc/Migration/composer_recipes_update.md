# Mise à niveau d'une version majeure

suivre ce lien
- [Mise à niveau d'une version majeure](https://symfony.com/doc/5.x/setup/upgrade_major.html)

## 1) Faire la monter de version dans le composer.json

Passer de "4.4.*" vers "5.4.*" ainsi que monter les autres dépendances

Exemple : 
```json
    "require": {
        "symfony/cache": "4.4.*",
        "symfony/cache": "5.0.*",
        "symfony/config": "4.4.*",
        "symfony/config": "5.0.*",
        "symfony/console": "4.4.*",
        "symfony/console": "5.0.*",
```

```json
{
    "type": "project",
    "license": "proprietary",
    "minimum-stability": "stable",
    "require": {
        "php": ">=7.4.3",
        "ext-ctype": "*",
        "ext-iconv": "*",
        "doctrine/annotations": "^1.13",
        "doctrine/doctrine-bundle": "^2.2",
        "doctrine/doctrine-migrations-bundle": "^3.0",
        "doctrine/orm": "^2.8",
        "easycorp/easyadmin-bundle": "^3.5.23",
        "knplabs/knp-paginator-bundle": "^5.9",
        "sensio/framework-extra-bundle": "^6.2",
        "stripe/stripe-php": "^7.75",
        "symfony/console": "5.4.*",
        "symfony/dotenv": "5.4.*",
        "symfony/flex": "^1.17|^2",
        "symfony/form": "5.4.*",
        "symfony/framework-bundle": "5.4.*",
        "symfony/password-hasher": "5.4.*",
        "symfony/proxy-manager-bridge": "5.4.*",
        "symfony/runtime": "5.4.*",
        "symfony/security-bundle": "5.4.*",
        "symfony/security-csrf": "5.4.*",
        "symfony/twig-bundle": "5.4.*",
        "symfony/validator": "5.4.*",
        "symfony/webpack-encore-bundle": "^1.17",
        "symfony/yaml": "5.4.*",
        "twig/extra-bundle": "^2.12|^3.0",
        "twig/twig": "^2.12|^3.0",
        "vich/uploader-bundle": "^1.17"
    },
    "require-dev": {
        "doctrine/doctrine-fixtures-bundle": "^3.4",
        "fzaninotto/faker": "^1.9",
        "phpstan/phpstan": "^1.10",
        "phpunit/phpunit": "^9.5.58",
        "symfony/browser-kit": "^5.4",
        "symfony/css-selector": "^5.4",
        "symfony/debug-bundle": "^5.4",
        "symfony/maker-bundle": "^1.29",
        "symfony/monolog-bundle": "^3.0",
        "symfony/phpunit-bridge": "^5.3",
        "symfony/stopwatch": "^5.4",
        "symfony/var-dumper": "^5.4",
        "symfony/web-profiler-bundle": "^5.4"
    },
    "config": {
        "allow-plugins": {
            "composer/package-versions-deprecated": true,
            "php-http/discovery": true,
            "symfony/flex": true,
            "symfony/runtime": true
        },
        "optimize-autoloader": true,
        "preferred-install": {
            "*": "dist"
        },
        "sort-packages": true
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "App\\Tests\\": "tests/"
        }
    },
    "replace": {
        "paragonie/random_compat": "2.*",
        "symfony/polyfill-ctype": "*",
        "symfony/polyfill-iconv": "*",
        "symfony/polyfill-php72": "*",
        "symfony/polyfill-php71": "*",
        "symfony/polyfill-php70": "*",
        "symfony/polyfill-php56": "*"
    },
    "scripts": {
        "auto-scripts": {
            "cache:clear": "symfony-cmd",
            "assets:install %PUBLIC_DIR%": "symfony-cmd"
        },
        "post-install-cmd": [
            "@auto-scripts"
        ],
        "post-update-cmd": [
            "@auto-scripts"
        ]
    },
    "conflict": {
        "symfony/symfony": "*"
    },
    "extra": {
        "symfony": {
            "allow-contrib": false,
            "require": "5.4.*"
        }
    }
}
```

## 2) Utilisez Composer pour télécharger les nouvelles versions des bibliothèques

```bash
composer update "symfony/*"
```

### Erreurs de dépendance

Si vous obtenez une erreur de dépendance, cela peut signifier que vous devez également mettre à niveau d'autres bibliothèques qui sont des dépendances des bibliothèques Symfony. Pour permettre cela, passez le --with-all-dependenciesdrapeau :

```bash
composer update "symfony/*" --with-all-dependencies
```

Cette mise à jour symfony/*ainsi que tous les packages dont dépendent ces packages. En utilisant des contraintes de version strictes dans composer.json, vous pouvez contrôler les versions vers lesquelles chaque bibliothèque est mise à niveau.

Si cela ne fonctionne toujours pas, votre composer.jsonfichier peut spécifier une version d'une bibliothèque qui n'est pas compatible avec la version la plus récente de Symfony. Dans ce cas, la mise à jour de cette bibliothèque vers une version plus récente composer.jsonpeut résoudre le problème.

Ou bien, vous pouvez rencontrer des problèmes plus profonds lorsque différentes bibliothèques dépendent de versions contradictoires d’autres bibliothèques. Vérifiez votre message d'erreur pour déboguer.

### Mise à niveau d'autres packages

```bash
composer update
```

## 3) Mise à jour des recettes

Au fil du temps – et notamment lorsque vous effectuez une mise à niveau vers une nouvelle version d’une bibliothèque – une version mise à jour de la recette peut être disponible. Ces mises à jour sont généralement mineures - par exemple de nouveaux commentaires dans un fichier de configuration - mais c'est une bonne idée de garder vos fichiers synchronisés avec les recettes.

Symfony Flex fournit plusieurs commandes pour vous aider à mettre à niveau vos recettes. Assurez-vous de valider toutes les modifications sans rapport sur lesquelles vous travaillez avant de commencer :

```bash

# Choisissez une recette obsolète à mettre à jour
composer recipes:update

# Mettre à jour une recette spécifique
composer recipes:update symfony/framework-bundle

# Voir une liste de toutes les recettes installées et pour lesquelles des mises à jour sont disponibles
composer recipes

# Voir des informations détaillées sur une recette spécifique
composer recipes symfony/framework-bundle
```

## 4) Mettez à jour votre code pour fonctionner avec la nouvelle version

Dans de rares situations, la prochaine version majeure peut contenir des ruptures de compatibilité ascendante. Assurez-vous de lire le UPGRADE-X.0.md(où X est la nouvelle version majeure) inclus dans le référentiel Symfony pour toute rupture BC dont vous devez être conscient.

# Voir certaines commandes

## composer recipes:update

```bash
composer recipes:update
```

**composer recipes:update** est une commande Composer utilisée pour mettre à jour les recettes (recipes) des paquets installés dans votre projet. Les recettes sont des fichiers qui fournissent des informations sur la configuration, les dépendances, et d'autres aspects d'un paquet pour permettre une intégration fluide dans votre application.

Voici une explication détaillée de cette commande :

1. **Recettes (Recipes) dans Composer :** Les recettes sont des fichiers JSON décrivant comment un paquet spécifique doit être intégré dans un projet. Ils peuvent contenir des informations sur les fichiers à copier, les services à activer, les configurations à appliquer, etc.

2. **Commande composer recipes:update :** Lorsque vous exécutez cette commande, Composer va chercher des mises à jour pour les recettes des paquets installés dans votre projet. Cela inclut la vérification des nouvelles versions de ces recettes et l'application des changements nécessaires.

3. **Objectif de la Mise à Jour des Recettes :** Les recettes peuvent être mises à jour pour diverses raisons, telles que des changements dans la manière dont un paquet doit être intégré ou des améliorations dans la configuration par défaut. En exécutant composer recipes:update, vous vous assurez que votre projet utilise les versions les plus récentes et les plus compatibles des recettes.

4. **Interaction avec les Recettes Personnalisées :** Si vous avez des recettes personnalisées dans votre projet, la commande peut vous demander comment gérer les conflits potentiels entre les recettes personnalisées et les mises à jour. Vous pouvez choisir de conserver vos modifications, d'accepter les mises à jour ou de fusionner manuellement les changements.

5. **Considérations de Sécurité :** Assurez-vous de n'exécuter cette commande que lorsque vous êtes prêt à effectuer des mises à jour potentiellement importantes dans votre configuration de paquets. Examinez attentivement les changements proposés pour éviter des problèmes de compatibilité.

En résumé, composer recipes:update est une commande essentielle pour maintenir la cohérence et la compatibilité des paquets dans votre projet en mettant à jour les recettes, garantissant ainsi une intégration correcte des fonctionnalités et des configurations des paquets dans votre application.

6. Faire git status ou git diff --cached pour voir les changement.

```bash
git status

git diff --cached 
```

# composer recipes:update symfony/console

```bash
composer recipes:update symfony/console
```

Faire git status ou git diff --cached pour voir les changement.

```bash
git status

git diff --cached bin/console
```