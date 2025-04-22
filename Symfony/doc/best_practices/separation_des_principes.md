# La séparation des principes

Quand on parle de **séparation des principes** en développement logiciel, on fait généralement référence à une bonne séparation des responsabilités et à l’application de plusieurs principes d’architecture et de conception pour structurer le code de manière claire, maintenable et évolutive.

Ça regroupe souvent plusieurs concepts et principes bien connus. Telque :

### 1. SRP – Single Responsibility Principle (Principe de responsabilité unique)

"Une classe ne doit avoir qu'une seule raison de changer."

- Chaque classe ou composant doit avoir **une seule responsabilité bien définie**.

- Par exemple : un `UserController` ne doit pas contenir de logique métier ni de logique d'accès à la base de données. C’est là qu'on parle de "séparer dans les services ou managers".


### 2. SoC – Separation of Concerns (Séparation des préoccupations)

Chaque couche ou module de l’application s’occupe d’un **aspect spécifique** du système.

- L’idée est de ne pas mélanger la logique métier, la gestion de la présentation, l’accès aux données, etc.

- En Symfony, ça se traduit souvent par une séparation claire entre :

    - **Contrôleurs**

    - **Services**

    - **Repositories**

    - **Formulaires**

    - **Templates Twig (vue)**

    - **DTOs / Event Listeners, etc.**

- Exemple de [Séparation des préoccupations](https://enseignement.leomartin.net/upem/2020-2021/modules/html/1-contexte/2-separation-des-preoccupations.html) pour des fichiers : HTML, CSS et JS

### 3. MVC – Modèle-Vue-Contrôleur

Une architecture classique adoptée par Symfony.

- **Modèle** : entités, services, logique métier, accès à la base de données. (gère les données et la logique métier.)

- **Vue** : les templates Twig. (gère la disposition et l'affichage.)

- **Contrôleur** : gère la requête et oriente vers les bonnes classes. (achemine les commandes des parties "model" et "view".)

- **Symfony s'appuie beaucoup là-dessus, mais on le pousse plus loin avec DDD, CQRS, etc. 

- [MVC](https://developer.mozilla.org/fr/docs/Glossary/MVC#voir_aussi)

### 4. DIP – Dependency Inversion Principle

Les modules de haut niveau **ne doivent pas dépendre** de modules de bas niveau, mais tous deux doivent dépendre d’abstractions.

- En pratique : on code avec des **interfaces**, pas contre on évite les implémentations concrètes.

- Symfony permet ça naturellement avec son système de service container et autowiring.

- [DIP – Dependency Inversion Principle](https://medium.com/@inzuael/solid-dependency-inversion-principle-part-5-f5bec43ab22e)

### 5. DRY & KISS

- **DRY** [(Don't Repeat Yourself)](https://scalastic.io/en/solid-dry-kiss/#dry-dont-repeat-yourself) : éviter les duplications de code.

- **KISS** [(Keep It Simple, Stupid)](https://scalastic.io/en/solid-dry-kiss/#kiss-keep-it-simple-stupid) : rester simple et compréhensible, ne pas sur-architecturer trop tôt.

### 6. DDD – Domain-Driven Design (conception dirigée par le domaine) (si vous poussez un peu plus loin)

- Séparer domain, application, infrastructure, UI.

- C’est une forme de séparation des principes poussée, souvent utilisée dans des projets complexes.

- [DDD](https://alexsoyes.com/ddd-domain-driven-design/)

#### Objectif :

Mettre **le métier (le "domaine") au cœur du développement.** On structure le code autour des règles métier, pas autour de la base de données ou des frameworks.

#### Comment ça marche ?
- On **modélises une application autour du métier réel** (le business).

- On discutes avec les **experts métier** pour bien comprendre leurs besoins.

- On organises le code autour de **concepts métier** : `Commande`, `Client`, `Facturation`, `Paiement`, etc.

- On sépares le code en **couches** bien distinctes.

#### DDD est souvent structuré comme ça :

```bash
src/
├── Domain/
│   ├── Entity/
│   ├── Repository/
│   ├── Service/ (logique métier)
├── Application/
│   ├── Command/
│   ├── Handler/ (exécute les cas d’usage)
├── Infrastructure/
│   ├── Doctrine/
│   ├── ApiClients/
├── UI/
│   ├── Controller/
│   ├── View/

#### Ce qui peut être comme ci-dessous pour une application Symfony
src/
├── Domain/
│   └── User/
│       ├── Entity/User.php
│       ├── Repository/UserRepositoryInterface.php
│       └── Exception/UserAlreadyExistsException.php
├── Application/
│   └── User/
│       ├── Command/CreateUserCommand.php
│       ├── Handler/CreateUserHandler.php
│       └── Query/GetUserByEmailQuery.php
├── Infrastructure/
│   └── User/
│       └── Repository/DoctrineUserRepository.php
└── UI/
    └── Http/Controller/UserController.php
```

#### Avantages :

- Le code est proche du métier, donc facile à comprendre et à faire évoluer.

- Il est modulaire, testable, clair.

- On peut isoler la logique métier du reste (framework, base de données, etc.)

### En résumé, "la séparation des principes", c’est :

- Séparer les responsabilités (SRP)

- Séparer les couches (SoC, MVC)

- Travailler avec des abstractions (DIP)

- Appliquer de la rigueur dans l’architecture du projet

- Faciliter la lecture, la maintenance, les tests