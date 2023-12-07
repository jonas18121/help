# Les principes SOLID

[Explication](https://afsy.fr/avent/2013/02-principes-stupid-solid-poo)

SOLID est l'acronyme pour les cinq principes suivants :

- Principe de responsabilité unique (Single Responsability Principle),
- Principe ouvert / fermé (Open Close Principle),
- Principe de substitution de Liskov (Liskov Substitution Principle),
- Principe de ségrégation d'interfaces (Interface Segregation Principle),
- Principe d'injection de dépendance (Dependency Injection Principle).

Ce grand principe de la programmation orientée objet a été inventé par Michael Feathers et Robert C. Martin (aka Uncle Bob) au début des années 2000. SOLID définit cinq bonnes pratiques orientées objet à appliquer au code afin d'en simplifier la maintenance, la testabilité et les évolutions futures.

## 1) Principe de responsabilité unique (Single Responsibility Principle - SRP):

D'après Robert C. Martin, le principe de responsabilité unique stipule qu'une classe doit avoir une et une seule raison de changer. 

En d'autres termes, une classe doit remplir un rôle précis. 

C'est exactement comme dans une entreprise où les tâches sont réparties entre chaque employé en fonction de leur expertise respective.

**Mauvaise pratique**

```php
class CsvDataImporter
{
    public function import($file)
    {
        $records = $this->loadFile($file);

        $this->importData($records);
    }

    private function loadFile($file)
    {
        $records = array();
        if (false !== $handle = fopen($file, 'r')) {
            while ($record = fgetcsv($handle)) {
                $records[] = $record;
            }
        }
        fclose($handle);

        return $records;
    }

    private function importData(array $records)
    {
        try {
            $this->db->beginTransaction();
            foreach ($records as $record) {
                $stmt = $this->db->prepare('INSERT INTO ...');
                $stmt->execute($record);
            }
            $this->db->commit();
        } catch (PDOException $e) {
            $this->db->rollback();
            throw $e;
        }
    }
}
```

Dans cet exemple, la classe `CsvDataImporter` a pour rôle d'importer des données issues d'un fichier au format CSV. 

Au premier abord, cette classe semble tout à fait correcte. Cependant, pour un développeur expérimenté, il est évident que cette classe possède plus d'une responsabilité. 

En effet, la classe CsvDataImporter réalise deux tâches de nature complètement différente :

- Lire un fichier CSV et transformer les données en tableaux PHP,
- Importer ces enregistrements dans une base de données MySQL.

Il y a donc clairement deux raisons que la classe change dans un futur proche. 

La première est le changement du format de sérialisation des données tandis que la deuxième concerne le moyen de stockage de ces dernières. 

En effet, il faudra modifier la méthode loadFile si demain les données sont issues d'un fichier XML ou JSON. 

Aussi une réécriture de la méthode importData sera nécessaire s'il est question de charger ces données dans un Mongodb par exemple.

La solution pour se conformer au principe de responsabilité unique consiste à décomposer la classe CsvDataImporter en deux sous-classes : `CsvFileLoader` et `DataGateway`. 

La nouvelle classe générique DataImporter n'a alors plus qu'à déléguer ces deux tâches à ses deux dépendances.

**Bonnes pratique**

```php
class DataImporter
{
    private $loader;
    private $gateway;

    public function __construct(FileLoader $loader, Gateway $gateway)
    {
        $this->loader  = $loader;
        $this->gateway = $gateway;
    }
    public function import($file)
    {
        foreach ($this->loader->load($file) as $record) {
            $this->gateway->insert($record);
        }
    }
}
```

Note : les types des dépendances dans le constructeur de la classe DataImporter sont ici des classes abstraites ou des interfaces.

Avec ce découpage en trois petites classes, il est désormais plus facile de tester unitairement chaque objet, de faire évoluer les implémentations existantes ou d'en ajouter de nouvelles.

## 2) Principe ouvert/fermé (Open/Closed Principle - OCP):

Le principe ouvert / fermé consiste à rendre les modules ouverts à l'extension et fermés aux modifications. 

En d'autres termes, il s'agit de pouvoir enrichir aisément les fonctionnalités d'un module sans avoir à en modifier son comportement.

Le dernier exemple présenté à la fin du principe de responsabilité unique se conforme en effet au principe ouvert / fermé. 

En effet, il est très facile de supporter de nouveaux formats de sérialisation des données ainsi que de nouveaux adapteurs pour des systèmes de stockage. 

Il s'agit tout simplement de créer de nouvelles classes respectant les contrats des interfaces sans avoir à changer la moindre classe existante.

**Bonnes pratique**

```php
$importer = new DataImporter(new CsvFileLoader(), new MySQLGateway());
$importer = new DataImporter(new XmlFileLoader(), new MongoGateway());
$importer = new DataImporter(new JsonFileLoader(), new ElasticSearchGateway());
```

Comme le montre le code ci-dessus, l'objet DataImporter n'a pas été modifié. 

Il s'agit juste de lui injecter de nouvelles implémentations des interfaces FileLoader et Gateway afin de pouvoir utiliser par exemple des données sérialisées en JSON à insérer dans une base MongoDB. 

Inutile de changer l'implémentation interne de la classe DataImporter pour y parvenir.

## 3) Principe de substitution de Liskov (Liskov Substitution Principle - LSP):

Le principe de substitution de Liskov indique qu'il doit être possible pour un objet de type T acceptant une dépendance de type S, de pouvoir remplacer cette dernière par une dépendance d'un type dérivé de S sans que cela est le moindre impact sur le fonctionnement du code.

Derrière cette définition aux airs savants se cache en réalité un principe fondamental de la conception orientée objet : l'héritage. <br>
Il s'agit en réalité de toujours conserver les signatures des méthodes d'une classe parent dérivée ainsi que la nature des valeurs de retour de ces dernières.

En PHP, il est obligatoire d'implémenter strictement les mêmes signatures des méthodes de la classe parent lorsque celle-ci est spécialisée et que ses méthodes sont redéfinies. <br>
En revanche, comme PHP est un langage faiblemenent typé, il est possible de retourner n'importe quel type de valeur en sortie d'une méthode.

Le principe de substitution de Liskov impose donc de s'assurer que la valeur retournée par une méthode redéfinie, est bien du même type que celle initialement retournée par la méthode de la classe parente.

**Bonnes pratique**

```php

abstract class AbstractLoader implements FileLoader
{
    public function load($file)
    {
        if (!file_exists($file)) {
            throw new \InvalidArgumentException(sprintf('%s does not exist.', $file));
        }

        return [];
    }
}

class CsvFileLoader extends AbstractLoader
{
    public function load($file)
    {
        $records = parent::load($file);

        if (false !== $handle = fopen($file, 'r')) {
            while ($record = fgetcsv($handle)) {
                $records[] = $record;
            }
        }
        fclose($handle);

        return $records;
    }
}
```

Dans l'exemple de code ci-dessus, la classe CsvFileLoader hérite de la classe abstraite AbstractLoader et redéfinit sa méthode load. <br>
La signature de la méthode est respectée ainsi que les types de retour. Dans les deux classes, la méthode load est programmée pour retourner un tableau d'enregistrements.

Si toutes les classes concrètes dérivant la classe AbstractLoader conservent les mêmes types de paramètres d'entrée et de sortie, alors c'est qu'elles s'engagent à respecter le contrat de l'interface FileLoader. <br>
Par conséquent, il est possible de remplacer un objet CsvFileLoader par une instance de la classe XmlFileLoader dans le constructeur de la classe DataImporter.

En pratique dans la vie quotidienne, c'est comme changer un pneu crevé d'une marque X par un autre pneu d'une marque Y. <br>
En effet, les fabricants de pneumatiques suivent les spécifications techniques standardisées des constructeurs automobiles. <br>
En programmation orientée objet, une interface est une spécification technique qui définit un modèle d'implémentation.

## 4) Principe de ségrégation de l'interface (Interface Segregation Principle - ISP):

Le principe de ségrégation d'interfaces est identique au principe de responsabilité unique des classes (SRP), mais à la différence qu'il s'applique aux interfaces. <br>
Le principe de responsabilité unique stipule qu'une classe doit avoir une seule responsabilité. <br>
Eh bien c'est la même chose pour une interface qui se doit d'être la plus petite possible et représenter l'implémentation d'une seule tâche.

L'avantage des interfaces par rapport aux classes en PHP, c'est qu'elles se composent facilement grâce à l'héritage.<br> 
En PHP, une classe peut dériver qu'une seule classe parente à la fois. En revanche, une interface peut elle-même dériver une, voire plusieurs interfaces à la fois.<br>
L'héritage multiple existe bel et bien en PHP !

Un très bel exemple de composition d'interfaces par héritage multiple existe dans le framework Symfony. <br>
Il s'agit de l'interface RouterInterface implémentée par la classe Router.

Le routeur de Symfony a pour rôle de générer des urls et de faire correspondre une url à des paramètres de route. <br>
C'est pour cette raison que la classe Router définit les deux méthodes publiques generate et match.

A première vue, ces deux méthodes peuvent être réunies dans une interface commune RouterInterface. <br>
Cependant, le routeur peut être injecté à divers endroits dans le framework pour réaliser ces tâches séparément et donc unitairement. <br>
Le fait de n'avoir besoin que de la méthode generate ou de la méthode match à un instant T dans un objet justifie donc de décomposer plus finement cette RouterInterface en deux plus petites interfaces.

```php
interface UrlGeneratorInterface
{
    public function generate($name, $parameters = array());
}

interface UrlMatcherInterface
{
    public function match($pathinfo);
}

interface RouterInterface extends UrlMatcherInterface, UrlGeneratorInterface
{
    public function getRouteCollection();
}
```

Ainsi, par exemple, il devient possible de typer un argument uniquement avec l'interface UrlGeneratorInterface quand une classe a besoin d'appeler seulement la méthode generate sur cet argument. <br>
C'est d'ailleurs exactement ce qui est fait dans la classe d'extension Twig RoutingExtension qui reçoit dans son constructeur le routeur afin de permettre aux fonctions Twig path et url de générer des chemins.

```php
namespace Symfony\Bridge\Twig\Extension;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class RoutingExtension extends \Twig_Extension
{
    private $generator;

    public function __construct(UrlGeneratorInterface $generator)
    {
        $this->generator = $generator;
    }

    public function getPath($name, $parameters = array())
    {
        return $this->generator->generate($name, $parameters);
    }
}
```

Dans cet exemple, l'argument $generator peut être aussi bien le routeur ou bien un autre objet dédié à cette responsabilité de générer des urls.

Un dernier avantage à fractionner des interfaces en petites interfaces concerne la testabilité du code. <br>
En effet, plus les interfaces sont petites, et plus il est facile de tester leurs implémentations. <br>
Aussi, dans un framework de tests unitaires comme PHPUnit, il est bien plus facile de « mocker » une interface plutôt qu'une classe concrète ou abstraite.

## 5) Principe d'inversion de dépendance (Dependency Inversion Principle - DIP):

Enfin, le principe d'injection de dépendance (aussi appelé principe d'inversion des dépendances) stipule qu'il faille programmer par rapport à des abstractions plutôt que des implémentations.

Le code ci-dessous réalise complètement l'inverse puisque la classe DataImporter dépend directement de deux implémentations concrètes du fait de l'instanciation des deux classes CsvFileLoader et DataGateway.

**Mauvaise pratique**
```php
class DataImporter
{
    private $loader;
    private $gateway;

    public function __construct()
    {
        $this->loader  = new CsvFileLoader();
        $this->gateway = new DataGateway();
    }
}
```

Instancier les dépendances directement à l'intérieur du constructeur limite considérablement les capacités à étendre le code mais aussi à le tester. <br>
En effet, en codant en dur une instanciation avec le mot clé new, la classe DataImporter devient fortement couplée à sa dépendance CsvFileLoader. <br>
Cela signifie aussi qu'il est impossible de remplacer cette dépendance par une autre pour un besoin ultérieur. <br>
Aussi cela empêche de tester unitairement la classe DataImporter puisque les dépendances ne peuvent être remplacées par des doublures (« mocks »).<br>

Pour se conformer au principe d'injection de dépendances, il s'agit tout simplement de créer les deux dépendances de la classe DataImporter à l'extérieur de celle-ci, puis de les injecter dans le constructeur. <br>
Cela a pour effet immédiat d'éliminer l'utilisation du mot clé new et donc de réduire le couplage entre les composants.

**Un peut meiileure pratique**

```php
class DataImporter
{
    private $loader;
    private $gateway;

    public function __construct(CsvFileLoader $loader, DataGateway $gateway)
    {
        $this->loader  = $loader;
        $this->gateway = $gateway;
    }
}
```

Bien que cette classe reçoive désormais ses dépendances par l'intermédiaire de son constructeur, elle reste néanmoins fortement couplée aux deux implémentations injectées. En effet, les arguments du constructeur sont ici typés avec des classes concrètes (donc des implémentations). En typant un paramètre avec une classe concrète (ou abstraite également), cela oblige à injecter forcément une instance de cette classe ou bien une instance d'une classe dérivée. C'est du au fait que PHP supporte uniquement de l'héritage simple pour les classes.

Pour rappel, le principe d'injection de dépendance stipule qu'une classe doit dépendre d'abstractions et non d'implémentations. Par conséquent, il s'agit de remplacer le typage des arguments par des interfaces au lieu de classes.

**Bonnes pratique**

```php
class DataImporter
{
    private $loader;
    private $gateway;

    public function __construct(FileLoader $loader, Gateway $gateway)
    {
        $this->loader  = $loader;
        $this->gateway = $gateway;
    }
}
```

Ici les interfaces FileLoader et Gateway favorisent l'injection de n'importe quels objets implémentant ces dernières.

## Conclusion

Principe STUPID et Principe SOLID sont deux principes qui s'opposent. 

Le premier est un ensemble de mauvaises pratiques et d'écueils à éviter absolument tandis que l'autre invite à suivre les bonnes pratiques. 

Avec ces deux outils en sa possession, le développeur pourra facilement identifier les problèmes dans son code et trouver les remèdes pour les corriger.