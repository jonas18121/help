# initialiser un Bundles personnalisé

Pour cet exemple 

## Structure à créer

```text
recherche-entreprises-bundle/
├── composer.json
├── src/
│   ├── Bundle.php
│   ├── Client/
│   ├── Command/
│   └── Model/
└── tests/
```

## Le fichier composer.json

### Métadonnées importantes

- **name** : vendor/package-name

- **type** : symfony-bundle (CRUCIAL)

- **autoload** : PSR-4 mapping

- **require** : Dépendances Symfony


## Initialisation

Nous allons :

- Créer le dossier du bundle

- Initialiser Git

- Créer composer.json avec les bonnes métadonnées

- Lancer **composer install**

- Créer la structure des dossiers

### Initialiser le projet Bundle

#### Créer le repertoire

- A la racine du projet web dans lequel la fonctionnalitée n'est pas encore un bundle

```bash
mkdir recherche-entreprises-bundle && cd recherche-entreprises-bundle
```

#### Initiaser Git

```bash
git init
echo "/vendor/
/composer.lock
/.phpunit.cache
.DS_Store
.idea/" > .gitignore
```

#### Créer composer.json

```yaml
{
    "name": "Vendorcustom/recherche-entreprises-bundle",
    "description": "Bundle Symfony pour l'API Recherche d'entreprises du gouvernement français",
    "type": "symfony-bundle",
    "license": "MIT",
    "keywords": ["symfony", "bundle", "entreprise", "sirene", "siren", "api"],
    "authors": [
        {
            "name": "my name",
            "email": "contact@Vendorcustom.com"
        }
    ],
    "require": {
        "symfony/http-kernel": "^7.3",
        "symfony/dependency-injection": "^7.3",
        "symfony/config": "^7.3",
        "symfony/http-client": "^7.3",
        "symfony/console": "^7.3"
    },
    "require-dev": {
        "phpunit/phpunit": "^11.0",
        "symfony/phpunit-bridge": "^7.3"
    },
    "autoload": {
        "psr-4": {
            "Vendorcustom\\RechercheEntreprisesBundle\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Vendorcustom\\RechercheEntreprisesBundle\\Tests\\": "tests/"
        }
    }
}
```

**Points Importants** :

- **"type"**: "symfony-bundle" : Crucial pour Symfony Flex
- **Namespace** : Vendorcustom\RechercheEntreprisesBundle

#### Explications : Le fichier composer.json

Le fichier `composer.json` est la carte d'identité de votre package PHP. Décomposons chaque section :

1. **Métadonnées de base**

```yaml
"name": "Vendorcustom/recherche-entreprises-bundle"
```

Format : `vendor/package`. Le vendor (ici Vendorcustom) est généralement votre nom d'utilisateur GitHub ou d'entreprise.

```yaml
"type": "symfony-bundle"
```

CRUCIAL : Ce type indique à Symfony Flex qu'il s'agit d'un bundle Symfony. Sans ça, Flex ne l'auto-enregistrera pas dans `config/bundles.php`.

2. **Les dépendances (require)**

```yaml
"require": {
    "symfony/http-kernel": "^7.3",
    "symfony/dependency-injection": "^7.3",
    ...
}
```

Ce sont les packages **nécessaires** au fonctionnement de votre bundle.

**Notation des versions avec ^ (caret)** :

- ^7.3 signifie : ">=7.3.0 et <8.0.0"
- Accepte les mises à jour mineures (7.3, 7.4, 7.5) mais pas les majeures (8.0)
- C'est le standard pour la compatibilité sémantique

3. **L'autoloading PSR-4**

```yaml
"autoload": {
    "psr-4": {
        "Vendorcustom\\RechercheEntreprisesBundle\\": "src/"
    }
}
```

**PSR-4** est un standard PHP pour l'autoloading des classes.

Comment ça marche ?

- Le namespace `Vendorcustom\RechercheEntreprisesBundle` correspond au dossier `src/`
- Une classe `Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClient` sera cherchée dans `src/Client/EntrepriseSearchClient.php`

Convention de nommage :

```text
Namespace : Vendorcustom\RechercheEntreprisesBundle
            ↑ Vendor    ↑ Nom du Bundle (avec suffixe Bundle)

Structure :
src/
  Client/
    EntrepriseSearchClient.php → Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClient
  Model/
    Entreprise.php → Vendorcustom\RechercheEntreprisesBundle\Model\Entreprise
```

4. **Keywords (mots-clés)**

```yaml
"keywords": ["symfony", "bundle", "entreprise", "sirene", "siren", "api"]
```

Utilisés par Packagist pour la recherche. Mettez des mots-clés pertinents pour que les développeurs trouvent votre bundle.

5. **Installer les Dépendances**

```bash
composer install
```

6. **Créer la Structure**

```bash
mkdir -p src/Client src/Command src/Model tests
```