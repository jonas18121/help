# Le Path Repository et Utilisation du Bundle

### Le Path Repository

**Problème**

Comment tester le bundle avant de le publier sur Packagist ?

**Solution**

Utiliser un répertoire local comme source de package

## Comment ça marche ?

- Le bundle doit être en dehors du projet de test
- Configurer le path dans composer (Composer crée un symlink avec modifications instantanées)

```txt
Mon ordinateur
├── entreprise_b/        (projet de test)
│   └── composer.json              (configure le path)
│
└── recherche-entreprises-bundle/  (Bundle en dev)
    └── src/
```

### Avantages

✅ Modifications instantanées (pas de réinstall)
✅ Pas besoin de publier à chaque test
✅ Développement et test en parallèle
✅ Workflow réaliste

### Configuration du Path Repository

Ce qu'il faut faire :

- Modifier `composer.json` du projet de test

- Ajouter la section **"repositories"**

- Configurer **"minimum-stability: dev"**

- Installer le bundle en local

- Vérifier le symlink

### Configurer le niveau de stabilité dans composer.json

Par défaut, Composer utilise le niveau de stabilité stable. 

Nous allons utiliser le niveau de stabilité **dev** pour pouvoir **utiliser le bundle en développement**.

#### Concept : Les Niveaux de Stabilité dans Composer

Composer utilise un système de stabilité pour filtrer les packages.

Les niveaux de stabilité (du plus instable au plus stable) :

- **dev** : Développement actif (branches main, develop)
- **alpha** : Version alpha (tests internes)
- **beta** : Version bêta (tests publics)
- **RC** : Release Candidate (presque stable)
- **stable** : Version stable (production)

**Par défaut, Composer n'installe que les packages stable.**

Pourquoi changer à **dev** pour les tests locaux ?

Quand on utilise un path repository, le bundle est considéré comme **dev-main** (branche main en développement).

Si on garde `minimum-stability: stable`, Composer refusera de l'installer :

- **Could not find package Vendorcustom/recherche-entreprises-bundle**

Pour éviter cela, il faut mettre : 

```json
{
    "minimum-stability": "dev"
}
```

Cela autorise Composer à installer des packages en développement.

### Attention : Sécurité en production

Ne mettez JAMAIS `minimum-stability: dev` en production ! C'est seulement pour le développement local.

Alternative plus sûre (si vous avez d'autres dépendances) :

```json
{
    "minimum-stability": "stable",
    "require": {
        "vendorcustom/recherche-entreprises-bundle": "@dev"
    }
}
```

Le `@dev` après le nom du package autorise uniquement ce package en version dev, pas les autres.

#### Après publication sur Packagist :

Une fois que vous aurez créé un tag `v0.1.0` sur GitHub, le bundle sera considéré comme `stable`

## Installer le Bundle

```bash
# Installer
composer require vendorcustom/recherche-entreprises-bundle

# Supprimer
composer remove vendorcustom/recherche-entreprises-bundle
```

- La version sera `dev-main` (développement) comme `"minimum-stability": "dev",`
- Les changements dans le bundle seront immédiatement disponibles
- Composer crée un **symlink** vers le bundle local

### Exemple composer.json du bundle

```json
{
    "name": "vendorcustom/recherche-entreprises-bundle",
    "description": "Bundle Symfony pour l'API Recherche d'entreprises du gouvernement français",
    "type": "symfony-bundle",
    "license": "MIT",
    "keywords": ["symfony", "bundle", "entreprise", "sirene", "siren", "api"],
    "authors": [
        {
            "name": "my name",
            "email": "contact@vendorcustom.com"
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

### Exemple composer.json du projet

```json
{
    "type": "project",
    "license": "proprietary",
    "minimum-stability": "dev",
    "prefer-stable": true,
    "repositories": [
        {
            "type": "path",
            "url": "../recherche-entreprises-bundle"
        }
    ],
    "require": {
        "php": ">=8.2",
        "ext-ctype": "*",
        "ext-iconv": "*",
        "doctrine/doctrine-bundle": "^2.18",
        "doctrine/doctrine-migrations-bundle": "^3.7",
        "doctrine/orm": "^3.5",
        "phpdocumentor/reflection-docblock": "^5.6",
        "phpstan/phpdoc-parser": "^2.3",
        "symfony/asset": "7.3.*",
        "symfony/asset-mapper": "7.3.*",
        "symfony/console": "7.3.*",
        "symfony/doctrine-messenger": "7.3.*",
        "symfony/dotenv": "7.3.*",
        "symfony/expression-language": "7.3.*",
        "symfony/flex": "^2",
        "symfony/form": "7.3.*",
        "symfony/framework-bundle": "7.3.*",
        "symfony/http-client": "7.3.*",
        "symfony/intl": "7.3.*",
        "symfony/mailer": "7.3.*",
        "symfony/mime": "7.3.*",
        "symfony/monolog-bundle": "^3.0",
        "symfony/notifier": "7.3.*",
        "symfony/process": "7.3.*",
        "symfony/property-access": "7.3.*",
        "symfony/property-info": "7.3.*",
        "symfony/runtime": "7.3.*",
        "symfony/security-bundle": "7.3.*",
        "symfony/serializer": "7.3.*",
        "symfony/stimulus-bundle": "^2.31",
        "symfony/string": "7.3.*",
        "symfony/translation": "7.3.*",
        "symfony/twig-bundle": "7.3.*",
        "symfony/ux-turbo": "^2.31",
        "symfony/validator": "7.3.*",
        "symfony/web-link": "7.3.*",
        "symfony/yaml": "7.3.*",
        "twig/extra-bundle": "^2.12|^3.0",
        "twig/twig": "^2.12|^3.0",
        "vendorcustom/recherche-entreprises-bundle": "dev-main"
    },
    "config": {
        "allow-plugins": {
            "php-http/discovery": true,
            "symfony/flex": true,
            "symfony/runtime": true
        },
        "bump-after-update": true,
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
        "symfony/polyfill-ctype": "*",
        "symfony/polyfill-iconv": "*",
        "symfony/polyfill-php72": "*",
        "symfony/polyfill-php73": "*",
        "symfony/polyfill-php74": "*",
        "symfony/polyfill-php80": "*",
        "symfony/polyfill-php81": "*",
        "symfony/polyfill-php82": "*"
    },
    "scripts": {
        "auto-scripts": {
            "cache:clear": "symfony-cmd",
            "assets:install %PUBLIC_DIR%": "symfony-cmd",
            "importmap:install": "symfony-cmd"
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
            "require": "7.3.*"
        }
    },
    "require-dev": {
        "phpunit/phpunit": "^11.5",
        "symfony/browser-kit": "7.3.*",
        "symfony/css-selector": "7.3.*",
        "symfony/debug-bundle": "7.3.*",
        "symfony/maker-bundle": "^1.0",
        "symfony/stopwatch": "7.3.*",
        "symfony/web-profiler-bundle": "7.3.*"
    }
}
```

## Enregistrer le Bundle

### Avec Symfony Flex (automatique)

Si vous avez Flex, le bundle est auto-enregistré.

### Sans Flex (manuel)

Ajoutez dans config/bundles.php :

```php
return [
    // ... autres bundles
    Vendorcustom\RechercheEntreprisesBundle\VendorcustomRechercheEntreprisesBundle::class => ['all' => true],
];
```

## Configurer le Bundle (optionnel)

Créez config/packages/yendorcustom_recherche_entreprises.yaml :

```yaml
vendorcustom_recherche_entreprises:
    timeout: 15  # Augmenter le timeout si nécessaire
```

## Organisation pour GittHub/GitLab pour tests local

Si projet sous Docker

- Le **bundle-custom** est au même niveau que le répertoire **app** qui contient le projet symfony
- Dans le `.gitignore` mettre les répertoires **.composer** et **bundle-custom** pour ne pas les inclures dans le versionnage du projet_test
- **bundle-custom** a son propre `.git` pour ses versionnages

```txt
/bundle-custom/
/.composer/
```


```txt
projet_test
|_ .composer
|_ app
|_ node
|_ php
|_ bundle-custom
|_ .env
|_ .gitignore
|_ docker-compose.yaml
.....
```

## Remplacer l'Ancien Service

Maintenant qu'on a le bundle, on peut supprimer notre ancien code et utiliser le bundle !

1. Supprimer l'Ancien Code

```bash
rm -rf src/Model
rm src/Service/EntrepriseSearchService.php
rm src/Command/SearchEntrepriseCommand.php
```

2. Mettre à Jour le Contrôleur

Modifiez src/Controller/EntrepriseController.php :

Changements :

- Injection de `EntrepriseSearchClientInterface` (du bundle)
- Import depuis `Vendorcustom\RechercheEntreprisesBundle\Client\`
- Le reste du code est **identique** !

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClientInterface;

class EntrepriseController extends AbstractController
{
    public function __construct(
        private readonly EntrepriseSearchClientInterface $entrepriseClient
    ) {
    }

    #[Route('/api/entreprises/search', name: 'entreprise_search', methods: ['GET'])]
    public function search(Request $request): JsonResponse
    {
        $query = $request->query->get('q', '');
        
        if (empty($query)) {
            return $this->json(['error' => 'Le paramètre "q" est requis'], 400);
        }

        try {
            $result = $this->entrepriseClient->search($query, 1, 10);
            
            return $this->json([
                'total' => $result->totalResults,
                'page' => $result->page,
                'results' => array_map(fn($e) => [
                    'siren' => $e->siren,
                    'nom' => $e->nomComplet,
                    'adresse' => $e->siege?->adresse,
                    'code_postal' => $e->siege?->codePostal,
                    'actif' => $e->isActif(),
                ], $result->results),
            ]);

        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/entreprises/{siren}', name: 'entreprise_detail', methods: ['GET'])]
    public function detail(string $siren): JsonResponse
    {
        try {
            $entreprise = $this->entrepriseClient->findBySiren($siren);

            if (!$entreprise) {
                return $this->json(['error' => 'Entreprise non trouvée'], 404);
            }

            return $this->json([
                'siren' => $entreprise->siren,
                'nom' => $entreprise->nomComplet,
                'adresse' => $entreprise->siege?->adresse,
                'code_postal' => $entreprise->siege?->codePostal,
                'code_naf' => $entreprise->activitePrincipale,
                'actif' => $entreprise->isActif(),
            ]);

        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
```

## Tester

1. Vérifier la Commande

```php
php bin/console list recherche-entreprise
```

Résultat :

```txt
Available commands for the "recherche-entreprise" namespace:
  recherche-entreprise:search  Recherche des entreprises françaises
```

✅ La commande du bundle est disponible !

2. Tester la Commande

```bash
php bin/console recherche-entreprise:search carrefour

# puis

php bin/console recherche-entreprise:search 652014051 --siren
```

3. Tester le Contrôleur

```bash
curl "http://127.0.0.1:8971/api/entreprises/search?q=carrefour"

curl "http://127.0.0.1:8971/api/entreprises/652014051"
```

## Vérifier les Services Enregistrés

```bash
php bin/console debug:container recherche

# Résultat :

Select one of the following services to display its information:
  [0] Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClient
  [1] Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClientInterface
  [2] Vendorcustom_recherche_entreprises.client
```

## Supprimer le Path Repository (Avant Publication)

Une fois que vous êtes satisfait, on **supprime** la section `repositories` de `composer.json` de votre app de test.

```yaml
{
    "type": "project",
    "license": "proprietary",
    "repositories": [],  // ← Supprimer ou vider
    "require": {
        ...
    }
}
```

Puis :

```bash
composer remove vendorcustom/recherche-entreprises-bundle
```

Notre app utilise maintenant une version locale du bundle. Après publication, on va faire simplement :

```bash
composer require vendorcustom/recherche-entreprises-bundle
```

Et Composer téléchargera depuis Packagist !

Si besoin supprimer le `vendor` puis `composer install`

```bash
rm -fr vendor

composer install
```