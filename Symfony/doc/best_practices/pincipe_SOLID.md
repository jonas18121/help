# Les principes SOLID

Les principes SOLID sont un ensemble de cinq principes de conception logicielle qui visent à créer des systèmes plus évolutifs, flexibles et faciles à maintenir. 

Voici une brève explication de chaque principe avec des exemples liés à Symfony :

## 1) Principe de responsabilité unique (Single Responsibility Principle - SRP):

- Chaque classe doit avoir une seule raison de changer.
- Exemple : Divisez les responsabilités des services en créant des services spécifiques à une tâche.

**Mauvaise pratique**

```php
class ArticleService {
    public function createArticle() {
        // Logique de création d'article
    }

    public function sendNotification() {
        // Logique d'envoi de notification
    }
}
```

**Bonnes pratique**

```php
class ArticleService {
    public function createArticle() {
        // Logique de création d'article
    }
}

class NotificationService {
    public function sendNotification() {
        // Logique d'envoi de notification
    }
}
```

On crée un service pour les articles et un service pour les notifications

**Pourquoi** : En suivant le SRP, chaque classe a une seule responsabilité, ce qui facilite la maintenance et l'évolution du code. 
Les services sont plus modulaires et réutilisables.

## 2) Principe ouvert/fermé (Open/Closed Principle - OCP):

- Les entités logicielles (classes, modules, fonctions, etc.) doivent être ouvertes à l'extension mais fermées à la modification.
- Exemple : Utilisez l'héritage ou l'implémentation d'interfaces pour étendre le comportement sans modifier le code existant.

**Mauvaise pratique**

```php
class Report {
    public function generate() {
        // Logique de génération de rapport
    }
}

// Modifiez directement la classe existante pour ajouter une nouvelle fonctionnalité (mauvaise pratique)
class ReportWithChart extends Report {
    public function generateWithChart() {
        // Logique de génération de rapport avec graphique
    }
}
```

**Bonnes pratique**

```php
// Interface pour le générateur de rapport
interface ReportGenerator {
    public function generate();
}

// Implémentation de base du générateur de rapport
class BasicReport implements ReportGenerator {
    public function generate() {
        echo "Generating basic report...\n";
        // Logique de génération de rapport de base
    }
}

// Extension du générateur de rapport pour inclure des graphiques
class ReportWithChart implements ReportGenerator {
    private $reportGenerator;

    public function __construct(ReportGenerator $reportGenerator) {
        $this->reportGenerator = $reportGenerator;
    }

    public function generate() {
        echo "Generating report with charts...\n";
        $this->reportGenerator->generate(); // Appel à la logique de génération de rapport de base si nécessaire
        // Logique de génération de graphiques
    }
}

// Utilisation des classes
$basicReport = new BasicReport();
$basicReport->generate();
// Output: Generating basic report...

$reportWithChart = new ReportWithChart($basicReport);
$reportWithChart->generate();
// Output:
// Generating report with charts...
// Generating basic report...
```

Dans cet exemple, nous avons une classe `BasicReport` qui représente la génération de rapport de base, <br>
et une classe `ReportWithChart` qui étend cette fonctionnalité en ajoutant des graphiques. 

La classe `ReportWithChart` prend un objet `ReportGenerator` (il peut être un `BasicReport` ou tout autre objet implémentant l'interface) dans son constructeur, <br>
et lors de l'appel de sa méthode `generate()`, elle appelle d'abord la méthode `generate()` de l'objet `$reportGenerator` et ajoute ensuite sa propre logique pour les graphiques.

Cela permet d'ajouter de nouvelles fonctionnalités (comme les graphiques) sans avoir à modifier la classe existante (BasicReport). 

Vous pouvez facilement créer de nouveaux types de rapports en implémentant l'interface ReportGenerator et en les passant comme dépendance à d'autres classes.

Dans le principe, tant que la classe passée en paramètre au constructeur de `ReportWithChart` implémente l'interface `ReportGenerator`, elle peut être utilisée. 

Cela permet une grande flexibilité, car vous pouvez introduire de nouvelles implémentations de `ReportGenerator` sans avoir à modifier la classe `ReportWithChart`.

Voici un exemple illustrant cela :

```php
class CustomReport implements ReportGenerator {
    public function generate() {
        echo "Generating custom report...\n";
        // Logique de génération de rapport personnalisé
    }
}

// Utilisation des classes
$basicReport = new BasicReport();
$customReport = new CustomReport();

$reportWithChartForBasicReport = new ReportWithChart($basicReport);
$reportWithChartForBasicReport->generate();
// Output:
// Generating report with charts...
// Generating basic report...

$reportWithChartForCustomReport = new ReportWithChart($customReport);
$reportWithChartForCustomReport->generate();
// Output:
// Generating report with charts...
// Generating custom report...
```

Dans cet exemple, nous avons créé une nouvelle classe `CustomReport` qui implémente également l'interface `ReportGenerator`. 

Vous pouvez passer une instance de cette classe dans le constructeur de `ReportWithChart` de la même manière que vous l'avez fait avec `BasicReport`, et le code de `ReportWithChart` fonctionnera avec n'importe quelle classe qui respecte l'interface `ReportGenerator`. 

Cela illustre le principe d'ouverture/fermeture du SOLID.

## 3) Principe de substitution de Liskov (Liskov Substitution Principle - LSP):

**Mauvaise pratique**

```php
class Bird {
    public function fly() {
        // Logique de vol
    }
}

class Ostrich extends Bird {
    public function fly() {
        throw new \Exception("Les autruches ne volent pas.");
    }
}
```

**Bonnes pratique**

```php
interface Flyable {
    public function fly();
}

class Bird implements Flyable {
    public function fly() {
        // Logique de vol
    }
}

class Ostrich implements Flyable {
    public function fly() {
        throw new \Exception("Les autruches ne volent pas.");
    }
}
```

**Pourquoi** : En suivant le LSP, vous assurez que les objets dérivés peuvent être utilisés partout où les objets de la classe de base sont utilisés. 
Cela garantit la cohérence du programme.

## 4) Principe de ségrégation de l'interface (Interface Segregation Principle - ISP):

- Aucun client ne devrait être forcé d'implémenter des méthodes dont il n'a pas besoin.
- Exemple : Divisez les interfaces volumineuses en interfaces plus petites et spécifiques.

**Mauvaise pratique**

```php
interface Worker {
    public function work();
    public function eat();
    public function sleep();
}
```

**Bonnes pratique**

```php
interface Workable {
    public function work();
}

interface Eatable {
    public function eat();
}

interface Sleepable {
    public function sleep();
}

class Robot implements Workable {
    public function work() {
        // Logique de travail pour un robot
    }
}
```

**Pourquoi** : En respectant le principe ISP, vous évitez d'imposer des méthodes inutiles à une classe. 

Cela rend les interfaces plus spécifiques et les classes qui les implémentent n'ont que ce dont elles ont besoin.

## 5) Principe d'inversion de dépendance (Dependency Inversion Principle - DIP):

- Les modules de haut niveau ne devraient pas dépendre des modules de bas niveau. Les deux devraient dépendre d'abstractions.
- Exemple : Utilisez l'injection de dépendances pour inverser les dépendances.

**Mauvaise pratique**

```php
class OrderService {
    private $entityManager;

    public function __construct() {
        $this->entityManager = new EntityManager();
    }
}
```

**Bonnes pratique**

```php
interface EntityManagerInterface {
    public function persist($entity);
    public function flush();
}

class OrderService {
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }
}
```

**Pourquoi** : En utilisant l'inversion de dépendance, les classes de niveau supérieur ne dépendent pas directement des classes de niveau inférieur. Cela facilite les tests, la réutilisation du code et la maintenance.

En incorporant ces principes SOLID dans votre code Symfony, vous créez des applications plus flexibles, modulaires et faciles à maintenir. Ces principes favorisent la réutilisation du code, la gestion des changements et la facilité de collaboration entre les développeurs.