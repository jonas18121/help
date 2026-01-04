# Glossaire des Concepts Avancés

Pour devenir un développeur Symfony confirmé, voici les concepts clés à maîtriser :

## Principes SOLID

Les **principes SOLID** sont 5 règles de conception orientée objet qui rendent le code plus maintenable.

### S - Single Responsibility Principle (Responsabilité Unique)

- Une classe = une seule raison de changer
- Notre `EntrepriseSearchClient` ne fait QUE appeler l'API (pas de logging métier, pas de cache, pas d'envoi d'email)

### O - Open/Closed Principle (Ouvert/Fermé)

- Ouvert à l'extension, fermé à la modification
- Grâce à l'interface, on peut créer `CachedEntrepriseSearchClient` sans modifier `EntrepriseSearchClient`

### L - Liskov Substitution Principle (Substitution de Liskov)

- On peut remplacer une classe par sa sous-classe sans casser le code
- Toute implémentation de EntrepriseSearchClientInterface peut être utilisée de la même façon

### I - Interface Segregation Principle (Ségrégation des Interfaces)

- Mieux vaut plusieurs petites interfaces qu'une grosse
- Si notre client avait aussi des méthodes d'admin, on créerait `EntrepriseSearchAdminInterface`

### D - Dependency Inversion Principle (Inversion des Dépendances)

- Dépendre d'abstractions (interfaces) plutôt que d'implémentations concrètes
- On injecte `HttpClientInterface`, pas `HttpClient` directement

## Design Patterns Utilisés

### 1. Data Transfer Object (DTO)

- `Entreprise`, `Siege`, `SearchResult`
- Objets de transport de données sans logique métier

### 2. Factory Method

- Méthodes `fromArray()` pour créer des objets
- Centralise la logique de création

### 3. Dependency Injection

- Les dépendances sont injectées via le constructeur
- Facilite les tests et le découplage

### 4. Service Locator (le conteneur Symfony)

- Le conteneur de services est un registre central
- Les services y sont enregistrés et récupérés

## Architecture en Couches

Notre application suit une architecture en couches :

```txt
Présentation (Contrôleur, Commande)
       ↓
Application (Services)
       ↓
Domaine (Modèles/DTO)
       ↓
Infrastructure (Client HTTP, API externe)
```

Chaque couche ne communique qu'avec la couche du dessous.

Avantages :

- Code organisé et prévisible
- Facile à tester (on mock la couche inférieure)
- Facile à remplacer une couche (ex: changer d'API)

## Inversion de Contrôle (IoC)

L'inversion de contrôle signifie que ce n'est pas votre code qui crée ses dépendances, c'est le framework.

### Sans IoC (mauvais) :

```php
class MonService
{
    public function __construct()
    {
        $this->httpClient = new HttpClient();  // Création directe
    }
}
```

### Sans IoC (bon) :

```php
class MonService
{
    public function __construct(
        private HttpClientInterface $httpClient  // Injection
    ) {}
}
```

Avantages :

- Testabilité (on peut injecter un mock)
- Flexibilité (on peut changer l'implémentation)
- Le framework gère le cycle de vie des objets

## Le Conteneur de Services (Service Container)

Le conteneur de services est le cœur de Symfony. C'est une boîte qui :

- Connaît tous les services disponibles
- Sait comment les créer (avec quelles dépendances)
- Crée les services à la demande
- Gère leur cycle de vie (singleton par défaut)

## PSR (PHP Standard Recommendations)

Les PSR sont des standards PHP. Ceux qu'on utilise :

- **PSR-4** : Autoloading (namespace → fichiers)
- **PSR-3** : Logger Interface (LoggerInterface)
- **PSR-7/18** : HTTP Messages (HttpClientInterface)
- **PSR-12** : Coding Style (formatage du code)

En respectant les PSR, votre code est interopérable avec d'autres projets PHP.