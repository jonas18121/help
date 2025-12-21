# Les Bundles

- [Les Bundles dans Symfony: Comment ils fonctionnent et comment les utiliser](https://w3r.one/fr/blog/web/symfony/symfony-bases-framework/les-bundles-dans-symfony-comment-ils-fonctionnent-et-comment-les-utiliser)
- [Configuring Symfony](https://symfony.com/doc/current/configuration.html)
- [Packagist](https://packagist.org/)

## Qu'est-ce qu'un Bundle Symfony ?

Dans Symfony, un **bundle** est une unité logicielle **modulaire et réutilisable** qui regroupe de manière cohérente du code et des ressources : contrôleurs, services, entités, configurations, templates, traductions, commandes, etc.

Un bundle est conçu pour :

- encapsuler une **fonctionnalité précise**,

- être **réutilisable** dans plusieurs projets,

- s’intégrer proprement au conteneur de services et au système de configuration de Symfony.

Autrement dit, un bundle est à Symfony ce qu’un plugin est à un CMS.

## Exemple concret

Supposons que tu veuilles gérer des notifications (email, SMS, push) dans plusieurs applications Symfony.

### Structure simplifiée d’un bundle

```text
src/NotificationBundle/
├── NotificationBundle.php
├── DependencyInjection/
│   └── NotificationExtension.php
├── Service/
│   └── NotificationSender.php
├── Resources/
│   └── config/
│       └── services.yaml
```

### Classe du bundle

```php
// src/NotificationBundle/NotificationBundle.php
namespace App\NotificationBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class NotificationBundle extends Bundle
{
}
```

### Service exposé par le bundle

```php
// src/NotificationBundle/Service/NotificationSender.php
namespace App\NotificationBundle\Service;

class NotificationSender
{
    public function send(string $message): void
    {
        // logique d’envoi
    }
}
```

Une fois le bundle installé et déclaré, l’application peut utiliser ce service comme n’importe quel autre service Symfony.

## Comparaison : Bundle vs Application vs Librairie

| Concept         | Description                           | Dépendance à Symfony | Cas d’usage               |
| --------------- | ------------------------------------- | -------------------- | ------------------------- |
| **Application** | Projet final (backend, API, site web) | Totale               | Produit livré             |
| **Bundle**      | Module Symfony réutilisable           | Forte                | Fonctionnalité transverse |
| **Librairie**   | Code PHP générique                    | Aucune               | Logique métier pure       |

#### Application

- Point d’entrée (controllers, routes, config globale)

- Orchestration des bundles et librairies

- Non réutilisable telle quelle

#### Bundle

- Connaît Symfony (services, config, events)

- Fournit des extensions de configuration

- Réutilisable **entre applications Symfony**

#### Librairie

- PHP pur (pas de Container, pas d’HttpKernel)

- Testable indépendamment

- Peut être utilisée par Symfony, Laravel, CLI, etc.

#### En pratique :

- **Librairie** = logique métier

- **Bundle** = intégration Symfony de cette logique

- **Application** = assemblage final


## À quel problème un bundle répond-il ?

Le bundle résout principalement **quatre problèmes structurels.**

1. **Réutilisation du code**

Sans bundle, une fonctionnalité est copiée d’un projet à l’autre.
Le bundle permet :

- un seul code source,

- des mises à jour centralisées,

- une maintenance réduite.

2. **Séparation des responsabilités**

Il impose une **frontière claire** :

- ce qui relève du domaine fonctionnel,

- ce qui relève de l’application.

- Cela limite le couplage et améliore la lisibilité.

3. **Industrialisation et standardisation**

Les bundles facilitent :

- la création de briques internes (ex : Auth, Billing, Audit),

- la standardisation entre équipes et projets,

- l’onboarding des développeurs.

4. **Intégration native à Symfony**

Un bundle sait :

- enregistrer ses services,

- exposer une configuration propre,

- écouter des événements,

- ajouter des commandes ou des routes.

Une simple librairie ne sait pas faire cela sans code d’adaptation.

## En résumé

- Un bundle est un **module Symfony réutilisable.**

- Il se situe entre la librairie (trop générique) et l’application (trop spécifique).

- Il répond aux besoins de **modularité, réutilisation et maintenabilité** dans des projets Symfony de taille moyenne à grande.

# Dans le site web w3r.one

- [Les Bundles dans Symfony: Comment ils fonctionnent et comment les utiliser](https://w3r.one/fr/blog/web/symfony/symfony-bases-framework/les-bundles-dans-symfony-comment-ils-fonctionnent-et-comment-les-utiliser)

## Pourquoi utiliser les Bundles

Les Bundles ont plusieurs avantages en Symfony:

**Réutilisation du code** : Les Bundles peuvent être réutilisés dans différents projets. En fait, Symfony lui-même est construit autour de Bundles. Par exemple, le framework bundle est ce qui met en place le framework lui-même.

- **Modularité** : Les Bundles sont une manière d'organiser votre application autour de fonctionnalités spécifiques. Cela permet de mieux structurer votre code et rend plus facile la maintenance et l'évolutivité de l'application.

- **Distribution** : Grâce à leur caractère indépendant et réutilisable, les Bundles peuvent être distribués facilement. Ils peuvent ainsi être partagés avec la communauté, et on peut également utiliser ceux créés par d'autres développeurs via Composer.

- **Rapidité de développement** : Grâce à la possibilité d'utiliser des Bundles préexistants, on peut rapidement ajouter des fonctionnalités à une application, sans avoir à réinventer la roue.

Dans le développement avec Symfony, un projet consiste essentiellement à intégrer ensemble divers Bundles selon vos besoins particuliers.


## Architecture d'un Bundle

### Structure typique d'un Bundle

Les Bundles Symfony sont conçus de manière à suivre une structure standardisée. C'est cette structure qui permet une modularité et une réutilisabilité exceptionnelles. Une structure typique de Bundle peut ressembler à :

```text
spielgman/awesome-bundle/
├─ src/
│  ├─ Controller/
│  ├─ DependencyInjection/
│  ├─ Resources/
│  │  ├─ config/
│  │  ├─ doc/
│  │  ├─ translations/
│  │  ├─ views/
│  ├─ Tests/
├─ composer.json
└─ README.md
```

## Qu'est-ce qui fait qu'un Bundle est un Bundle

Un Bundle n'est pas simplement un ensemble arbitraire de code, c'est une unité modulaire avec une organisation définie. Un Bundle doit contenir un certain nombre d'éléments essentiels pour être considéré comme tel :

- **Fichier de service** : Un bundle doit inclure un fichier de service, généralement en XML, Yaml ou PHP, qui informe Symfony des classes de service.
- **Classe principale**: Chaque Bundle doit avoir une classe principale qui hérite de **Symfony\Component\HttpKernel\Bundle\Bundle**.
- **Convention nommage** : Le nom de chaque Bundle doit se terminer par **"Bundle"**.
- **Flexibilité de configuration** : Pour offrir une véritable réutilisabilité, un Bundle doit permettre une configuration assez flexible pour s'adapter aux besoins spécifiques de chaque application.

Un exemple de classe Bundle symple serait :

```php
namespace Spielgman\AwesomeBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class AwesomeBundle extends Bundle
{
    
}
```

Et un fichier de service (services.yaml) typique peut ressembler à :

```yaml
services:
  _defaults:
    autowire: true
    autoconfigure: true

  Spielgman\AwesomeBundle\:
    resource: '../src/*'
    exclude: '../src/{DependencyInjection,Entity,Migrations,Tests}'
```

Rappelez-vous, l'architecture spécifique de votre Bundle peut varier en fonction de vos besoins. Ces descriptions ne sont qu'une introduction à la structure de base que vous pouvez utiliser comme point de départ.


## La création d'un Bundle personnalisé

### Processus étape par étape

Cette phase requiert votre attention et votre expertise. Voici les étapes-clés:

- **Créez le répertoire du Bundle**: Ceci se fait en utilisant la commande `mkdir` suivie du nom de votre Bundle, dans le répertoire approprié de votre projet Symfony.

- **Générez le fichier Bundle**: Dans ce fichier, définissez les services que votre Bundle va offrir. Vous pouvez vous servir de la commande touch pour créer ce fichier.

- **Enregistrez votre Bundle**: Vous devez ensuite ajouter le Bundle à votre `Kernel` afin que Symfony prenne conscience de son existence.
Configurez votre Bundle: Le Bundle étant maintenant enregistré, vous pouvez débuter la configuration des services.

Voici un aperçu du code qui pourrait être utilisé pour ces étapes:

```bash
# Etape 1
$ mkdir MonBundle

# Etape 2
$ touch MonBundle/MonBundle.php
```

```php
# Contenu de MonBundle.php
namespace MonBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class MonBundle extends Bundle
{
}

# Etape 3
$bundles = [
    //...
    new MonBundle\MonBundle(),
];
```

```yaml
# Etape 4: Configuration du service dans services.yaml
services:
    # ...
    MonBundle\:
        resource: '../src/*'
        exclude: '../src/{Entity,Migrations,Tests,Kernel.php}'
```

### Validation de votre Bundle

Une fois votre Bundle créé et configuré, il est important de le valider. Pour ce faire, vérifiez que Symfony détecte correctement votre Bundle en utilisant la commande **debug:bundles**. Il est aussi essentiel de tester les services de votre Bundle pour vous assurer qu'ils fonctionnent comme prévu. 

## Les Bundles tiers dans Symfony

### Installer des Bundles tiers

Le moyen le plus simple d'installer un Bundle tiers dans Symfony est d'utiliser Composer, notre gestionnaire de dépendances favori.

Voici un exemple de commande pour installer le Bundle **symfony/monolog-bundle**:

```bash
composer require symfony/monolog-bundle
```

### Utilisation standard des Bundles tiers

Une fois que vous avez installé un Bundle tiers, il est généralement activé par défaut. Vous pouvez le configurer en modifiant l'option correspondante dans le fichier `config/bundles.php`. Par exemple, voici comment activer le Bundle Monolog:

```php
return [
    // ...,
    Symfony\Bundle\MonologBundle\MonologBundle::class => ['all' => true],
];
```

## Comment partager vos Bundles

### Partager votre Bundle avec la communauté

Pour partager votre Bundle avec la communauté, il doit être publié sur un répertoire accessible, comme [Packagist](https://packagist.org/), qui est le principal répertoire de paquets PHP.

## Autre

### Le cycle de vie

```text
1. Développement local    → Créer le bundle
2. Test local             → Tester avec path repository
3. Publication GitHub     → Mettre en ligne
4. Publication Packagist  → Rendre installable
5. Utilisation            → composer require mon/bundle
```