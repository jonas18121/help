# Convention de liste de bonnes pratiques et un guide de style pour le développement avec PHP, Symfony et Doctrine.

## Guide de style

### Général

#### Les fichiers

Les fichiers pour tous les langages (PHP, Javascript, Twig, YAML, XML, etc.) doivent se terminer par une ligne vide (le caractère de saut de ligne, LF).

#### Longueur de la ligne

Essayez de rester en dessous de 120 caractères. Les lignes plus longues doivent être divisées, à la seule exception des chaînes, qui peuvent dépasser la limite sans nécessiter de division.

Dans le cas où les paramètres d'une fonction sont répartis sur plusieurs lignes, chaque paramètre doit être placé sur une seule ligne :

```php
// Yes
$service->action(
    $parameter1,
    $parameter2,
    $parameter3,
    $parameter4
);

// No
$service->action($parameter1,
    $parameter2, $parameter3, $parameter4);
```

#### Déclarations de type et typage strict

Tout nouveau code doit déclarer les paramètres in et out en tant que déclarations de type. Tous les nouveaux fichiers doivent avoir `declare(strict_types=1);` ajouté au début.


### Dénomination

#### Des classes

Dans un projet Symfony, il est logique d'utiliser les mêmes conventions que le code Symfony et d'utiliser le préfixe `Abstract` et le suffixe `Interface` et `Exception`.

```text
DateProviderInterface
InvalidDateException
AbstractDateProvider
```

Même si cela peut parfois paraître redondant, il est toujours préférable d’employer une convention claire plutôt que de discuter d’un scénario au cas par cas.

#### Variables

Les noms de variables ne doivent être ni trop longs ni trop courts. Bien qu’il n’y ait pas de limite stricte dans les deux cas, il est de bon sens de ne pas descendre en dessous de 3 caractères.

#### La case

Les variables et les méthodes doivent être nommées en utilisant du `camel case`, tandis que les classes et les structures de type classe (traits, interfaces, etc.) doivent utiliser la  `pascal case`.

```php
class PascalCase {

    private $camelCase;

    ## les autres cases
    private $snake_case;
    private $kebab = "kebab-case";

    Const UPPERCASE = " ok";
}
```

---

### PHPDoc

À partir de PHP 7.0, il est possible de définir des types de paramètres sans avoir à utiliser PHPDoc. Pour cette raison, l’utilisation de PHPDoc lorsqu’aucune information supplémentaire n’est ajoutée est considérée comme redondante et à éviter.

Lorsque des informations complémentaires _can_ sont ajoutées à l’aide de PHPDoc, les informations _all_ doivent alors être ajoutées car une petite duplication est préférable à deux sources partielles de données qui doivent ensuite être combinées par le lecteur. Ce sont les principales situations où l’utilisation de PHPDoc est requise.

#### Documentation des exceptions

Si dans une fonction une exception est levée (à la fois directement avec 'throw', ou à l’intérieur d’une autre fonction qui est appelée), il est obligatoire d’ajouter une annotation '@throws' dans le bloc PHPDoc. La seule exception à cette règle est lorsqu’il faut travailler avec des objets comme « DateTimeImmutable » qui techniquement peut lancer une exception pendant la construction, mais seulement lorsque la chaîne donnée est invalide et souvent nous pouvons être raisonnablement sûrs que ce ne sera pas le cas. Dans tous les autres scénarios, les exceptions doivent être documentées.

#### Documentation des tableaux

Pour que les outils d’analyse statique fonctionnent mieux avec une base de code, tous les tableaux doivent être documentés. Les tableaux PHP peuvent réellement représenter plusieurs choses, il est donc important de toujours essayer de transmettre leur signification réelle.

Voici un exemple de la façon dont les structures communes devraient être documentées. Vous trouverez de la documentation supplémentaire sur le [site Web Psalm](https://psalm.dev/docs/annotating_code/type_syntax/array_types/).

```php
/** @var list<int> */
$array = [1, 2];
/** @var list<string> */
$array = ['foo', 'bar'];
/** @var list<stdClass> */
$array = [new stdClass(), new stdClass()];

/** @var array<string, int> $array */
$array = [
    'foo' => 1,
    'bar' => 2,
];
/** @var array<string, stdClass> $array */
$array = [
    'foo' => new stdClass(),
    'bar' => new stdClass(),
];
/** @var array<int, int> $array */
$array = [
    5 => 50,
    10 => 100,
];
/** @var array<int, array<int>> $array */
$array = [
    5 => [50],
    10 => [100, 200],
];
/** @var array<int, array<string, string>> $array */
$array = [
    5 => ['foo' => 'foo'],
    10 => ['bar' => 'bar', 'baz' => 'baz'],
];
```

Important : même s’il existe un moyen de documenter les tableaux hétérogènes, il est recommandé d’éviter de les utiliser et de préférer la création d’objets de valeur ad-hoc.

### Misc

#### Importer des classes et d’autres éléments

Par souci d’uniformité (et d’un léger avantage en matière de rendement), tous les éléments qui peuvent être utilisés devraient l’être. Cela signifie que toutes les classes (y compris celles de l’espace de noms global), toutes les fonctions et toutes les constantes doivent être ajoutées à la liste d’utilisation au début d’un fichier. Cela peut être facilement fait automatiquement en utilisant PHP-CS-Fixer, et évite d’encombrer le code avec des barres obliques inversées sans raison réelle. Toutes les utilisations dans le reste du code doivent alors faire référence au symbole importé, sans aucune référence d’espace de noms ajoutée.

#### Interfaces fluides

La règle de base avec des interfaces fluides est d’avoir une action par ligne. Il est considéré comme une mauvaise pratique d’utiliser des interfaces fluides dans les structures de contrôle et les appels de fonction.

```php
// Yes
$this->service->getStartDate()
    ->format('Y-m-d');

// No
$this
    ->service
    ->getStartDate()
    ->format('Y-m-d');

// No
$this->service->getStartDate()->format('Y-m-d');
```

L’accès à une propriété avec $this->property ne compte pas comme une action, de sorte que comme le montre le premier exemple, avoir $this->service->getStartDate()” dans une ligne est valide.

Exception : lorsque les paramètres de fonction doivent être divisés en lignes séparées, il peut être utile de ne pas avoir d’action sur la première ligne afin de mieux aligner les appels suivants :

```php
$builder
    ->add('startDate', DateType::class, [
        'required' => true,
    ])
    ->add('endDate', DateType::class, [
        'required' => true,
    ]);
```

Lors de la séparation d’une interface fluide en plusieurs lignes, l’unité de base de l’indentation (4 espaces) doit être utilisée. L’indentation qui change en fonction de la longueur du nom d’une variable est considérée comme fragile et doit être évitée.

```php
// Yes: Renommer une variable n’affectera pas les autres lignes
$queryBuilder = $entityManager->createQueryBuilder()
    ->from(MyEntity::class, 'e');

// No: renommer la variable du gestionnaire d’entités ou du générateur de requêtes
// fera changer l’indentation de toutes les lignes suivantes
$queryBuilder = $entityManager->createQueryBuilder()
                              ->from(MyEntity::class, 'e');
```

#### Visibilité constante

Tout comme les propriétés de classe, les constantes doivent avoir leur modificateur de visibilité déclaré. Tout comme les propriétés, le privé est toujours préférable au public.

#### Conditions ternaire divisé en plusieurs lignes 

Lorsqu’un opérateur ternaire doit être divisé en plusieurs lignes, la méthode recommandée est la suivante :

```php
$value = $condition
    ? 'value if true'
    : 'value if false';
```

De cette façon, chaque résultat est clairement visible selon le symbole avec lequel la ligne commence, avec ?, au début du chemin “ vrai ” et “ :” au début du chemin “ faux ”.

## Bonnes pratiques

### Générique

#### Accéder à une propriété depuis une classe

Une propriété doit être accessible directement, et l’utilisation d’un getter pour cela doit être considérée comme un anti-pattern :

```php
// No
$this->getAuthor()->getName();

// Yes
$this->author->getName();
```

#### Affectation de variables dans les structures de contrôle

À l’exception de quelques cas particuliers, l’attribution de valeurs à une variable dans une structure de contrôle (p. ex., « si », « pendant », etc.) devrait être considérée comme une mauvaise pratique.

```php
// Yes:
$author = $blogPost->getAuthor();
if ($author) {

// No:
if ($author = $blogPost->getAuthor()) {
```

#### Exceptions de domaine et d’application

Chaque fois qu’une méthode publique doit lancer une exception, il doit s’agir d’une exception au niveau du domaine ou de l’application et jamais d’une exception intégrée à PHP. Les exceptions de domaine devraient étendre une « DomainException » propre à une application et non pas à d’autres comme « RuntimeException » ou « InvalidArgumentException », car l’objectif d’une exception de domaine devrait être de communiquer un message propre au domaine. et le catégoriser en utilisant une exception PHP intégrée spécifique n’a aucun avantage supplémentaire.

Toutes les exceptions ne sont pas des exceptions de domaine : selon les séparations en 3 niveaux (domaine, application, infrastructure) d’une architecture "ports et adaptateurs" (également appelée architecture "hexagonale"), certaines exceptions peuvent être soulevées à partir de contextes qui ne sont pas liés au domaine. Pour cette raison, il devrait y avoir une base « ApplicationException » qui sert le même objectif que « DomainException », mais elle est utilisée dans les limites de l’application.

La couche d’infrastructure n’a pas d’exception de base car les composants d’infrastructure sont intégrés à l’aide de ports de domaine ou d’application (interfaces), et ces interfaces doivent définir elles-mêmes quelle exception peut être levée, C’est pourquoi ces exceptions font partie de la couche de domaine.

[Cet article](https://medium.com/@davide.borsatto/not-just-for-exceptional-circumstances-7692f2775a5a) traite davantage de l’utilisation des exceptions.

#### Constructeurs nommés pour les exceptions

Bien qu’il ne soit pas obligatoire, il est fortement recommandé d’utiliser des constructeurs nommés pour créer des exceptions :

```php
class BlogPostException extends DomainException
{
    public static function titleTooShort(string $title): self
    {
        return new self(sprintf('The title "%s" is too short for a blog post', $title));
    }
}
```

Ce type d’utilisation rend les messages d’exception plus cohérents et a pour effet secondaire de rendre les messages d’erreur facilement accessibles dans des contextes de test unitaires, il est donc possible de tester qu’une fonction a lancé *exactement* l’exception attendue.

#### Utilisation de DateTimeImmutable

Dans la mesure du possible, il est préférable d’utiliser `DateTimeImmutable` au lieu de `DateTime`. Ceci est particulièrement vrai pour `in` et nos paramètres de fonctions, car l’immutabilité garantit que la valeur ne sera pas modifiée par la fonction elle-même.

#### Différence entre l’objet de valeur et l’objet de transfert de données

Dans le cadre d’une application Symfony, il est utile de s’accorder sur ces définitions :

- Un objet _value object_ est un objet immuable qui, une fois construit, est dans un état valide. Ces objets nécessitent que tous les paramètres obligatoires soient passés à l’aide du constructeur, et ne fournissent aucun paramètre nul à moins que la nullité ne soit explicitement définie par des règles de domaine.
  Si d’autres moyens de créer un objet de valeur sont trouvés, ces moyens peuvent être exprimés en utilisant différents constructeurs nommés. Il est considéré comme une bonne pratique de ne pas mélanger l’utilisation de constructeurs réguliers et de constructeurs nommés : si le second est utilisé, il est recommandé de définir le constructeur réel comme privé.
  Les objets de valeur peuvent définir des getters pour accéder aux propriétés, mais aucun setter ne doit être disponible. Ils peuvent avoir des méthodes qui fournissent une sorte de données calculées en utilisant l’état interne.
  Comme il s’agit de simples conteneurs de données, ils ne doivent pas avoir accès à des objets pouvant être classés comme des services. Les seuls paramètres qui peuvent être transmis aux constructeurs sont ceux qui doivent déterminer l’état interne de l’objet de valeur, mais ils ne peuvent pas être utilisés pour fournir la fonctionnalité de calcul des données.
  Selon les directives DDD, un objet de valeur représente un concept de domaine autonome. Deux objets de valeur sont considérés comme _same_ (indépendamment de l’identité PHP) si toutes leurs propriétés ont la même valeur. C’est différent des entités, qui sont censées avoir une sorte d’identifiant qui détermine l’identité.
- Un objet de transfert de données est un objet qui peut être créé dans un état non valide et qui fournit des moyens (méthodes ou propriétés publiques) de modifier son état interne. Il peut être utilisé comme un objet où les données peuvent être "accumulées" à partir de différentes sources, et peut-être comme un objet qui est utilisé comme un état intermédiaire entre les formes et les entités, car les formes Symfony exigent que toutes les propriétés de l’objet soient nullables.

En raison de leur immuabilité, les objets de valeur sont généralement préférables aux objets de transfert de données. Le suffixe _VO_ doit être évité, car l’objet doit représenter un concept de domaine, tandis que le suffixe _DTO_ peut être utilisé car il représente des implémentations techniques.

#### Préférez toujours les données structurées et immuables aux tableaux non structurés

L’utilisation de tableaux pour transférer des données à partir de deux objets différents est fortement déconseillée, sauf lorsqu’il s’agit de simples listes ordonnées d’éléments (leur type peut donc être défini comme `list<Type>`). La raison en est que cela peut représenter des valeurs hétérogènes et difficiles à documenter, même en utilisant des annotations de type appropriées. Par exemple, un type `array<string, MyClass>` indique que les clés sont des chaînes, mais il ne transmet pas ce que ces chaînes sont et donc il a besoin de plus de documentation. L’utilisation de ces structures au sein d’une classe n’est pas un problème car le contexte est complètement disponible au même endroit, mais ils doivent être évités pour la communication entre les différentes classes car l’encapsulation est cassée car le récepteur doit connaître les détails d’implémentation afin d’utiliser la valeur. Pour ces raisons, de telles utilisations sont considérées comme :

```php
class MyService
{
    public function getCredentials(): array
    {
        return [$username, $password];
    }
    
    public function getData(): array
    {
        // ...
        return [
            'name' => $name,
            'age' => $age,
            // ...
        ];
    }
}
```

Des situations comme celle-ci justifient la création d’objets spécifiques, de préférence immuables, qui ont l’effet secondaire d’utiliser moins de mémoire car PHP peut mieux optimiser leur utilisation.

#### Évitez d’utiliser des classes abstraites comme déclarations de type

Une classe abstraite ne représente pas une promesse, mais plutôt une mise en œuvre partielle. Pour cette raison, il est sémantiquement incorrect de l’utiliser comme déclaration de type, car une déclaration de type définit la promesse d’un comportement (qui doit être défini par une interface) ou une implémentation très spécifique (qui utilise une classe réelle). Utiliser une classe abstraite est une mauvaise façon de catégoriser les objets qui partagent un certain comportement, et pour cette raison, les interfaces doivent être utilisées à la place.

#### FQCN usage

Le formulaire `MyClass::class` doit être utilisé chaque fois que possible au lieu d’avoir à taper manuellement le FQCN d’une classe. Cette utilisation permet une analyse correcte du code et élimine l’inconvénient de devoir se référer à des classes utilisant des chaînes, qui sont intrinsèquement fragiles et seraient difficiles à refactoriser. Ce syntas doit également être utilisé dans les annotations d’entités pour faire référence à d’autres classes (comme les entités liées).

```php
// Yes
use App\Code\MyClass;

public function getClassName(): string
{
    return MyClass::class;
}

// No
public function getClassName(): string
{
    return 'App\Code\MyClass';
}
```

#### Conversion d’objet en chaîne

Bien que PHP propose nativement la méthode magique `__toString()`, qui est appelée automatiquement chaque fois qu’un objet est converti en chaîne, cette approche repose sur un comportement implicite qui [peut être difficile à déboguer](https://github.com/ShittySoft/symfony-live-berlin-2018-doctrine-tutorial/pull/3) et difficile à analyser (il n’y a pas de moyen facile de trouver où du code lance un objet sur une chaîne).

Pour cette raison, le recours à la méthode `__toString()` est considéré comme une mauvaise pratique, et une méthode explicite `toString()` devrait être utilisée à la place. Pour les scénarios où la méthode `__toString()` est requise par une utilisation spécifique, les deux méthodes doivent être mises en œuvre et `__toString()` doit être transmise à la mise en œuvre réelle.

```php
public function __toString(): string
{
    return $this->toString();
}

public function toString(): string
{
    return '...';
}
```

### Symfony

# Validation à l’aide des événements POST_SUBMIT dans les formulaires

Les validations de formulaire ont lieu pendant le `POST_SUBMIT` même, en utilisant la priorité `0`. Si un écouteur d’événement est défini pour cela même, il faut se rappeler que selon la priorité, le formulaire peut ou non avoir été validé.

# Forcer le rendu des champs de formulaire de collecte dans Twig

Si, dans un modèle Twig, un champ de formulaire de collecte est rendu à l’aide d’une boucle `for`, il faut tenir compte du fait que si la collection est vide, Twig ne traitera pas correctement l’état et ne considérera pas que ce champ a été rendu. Pour cette raison, il sera rendu à tort chaque fois que `form_rest` est appelé. 

Pour éviter cela, un appel manuel à `setRendered` doit être placé comme mesure de protection :

```twig
{% for field in form.fields %}
  //
{% else %}
  {% do form.fields.setRendered() %}
{% endfor %}
```

#### Injection de service et localisateurs de service

La récupération de service utilisant `$container->get($serviceId)` doit être considérée comme obsolète et doit être évitée, avec une injection de dépendance appropriée utilisant le constructeur à la place. Pour la même raison, l’accès aux dépôts à l’aide de `EntityManagerInterface::getRepository($entityName)` est également considéré comme obsolète.

#### Répartiteurs d’événements et abonnés

Chaque abonné à un événement devrait s’abonner à un seul événement. La méthode qui gère l’événement devrait s’appeler `handle`.

#### Dans les formulaires EntityType, préférez l’option de choix à queryBuilder

Pour créer un formulaire qui étend `EntityType`, les choix peuvent être définis à l’aide de deux options : `choices`, qui accepte un paramètre de type `list<MyEntity>` ou `queryBuilder`, qui accepte soit un générateur de requête, soit un rappel qui doit renvoyer le générateur de requête.

Les choses étant égales, `choices` devraient être l’option préférée, car le type de formulaire peut correctement déclarer sa dépendance envers le référentiel, et le référentiel lui-même peut être configuré pour renvoyer des entités et non des objets du générateur de requêtes, un comportement qui viole le modèle du référentiel.

#### Dans EntityType forms, configurer choice_label comme callback

En utilisant l’option `choice_label` il est possible de définir comment Symfony convertira un objet en chaîne (en utilisant `__toString()` comme solution de repli). Lorsqu’une méthode personnalisée doit être utilisée, il y a deux approches :

```php
// Solution 1
'choice_label' => 'customMethod',

// Solution 2
'choice_label' => function (MyEntity $entity): string {
    return $entity->customMethod();
},
```

La deuxième option, bien que plus longue, est préférable car la méthode ne sera plus appelée "magiquement" par Symfony, avec le code sera plus facile à analyser et les utilisations de la `customMethod` plus facile à suivre dans le projet.

#### Collections

Le traitement des collections doit être considéré comme un détail d’implémentation au sein des entités, et idéalement, il ne doit pas être exposé par l’API publique. Cela présente plusieurs avantages :
- Il n’y a aucun doute quant au type qui sera retourné (qui sera toujours `list<MyEntity>`)
- L’indication de type peut être utilisée sans avoir à utiliser la double annotation `Collection|list<MyEntity>`
- Une collection ne peut pas être mise à jour depuis l’extérieur de l’entité
- Gestion manuelle des méthodes `setX` nous évitons les bog

Voici un exemple complet d’une façon correcte de définir les méthodes qui fonctionnent sur une collection :

```php
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
class Author
{
    /**
     * @var Collection|list<BlogPost>
     *
     * @ORM\OneToMany(
     *     targetEntity=BlogPost::class,
     *     mappedBy="author",
     *     cascade={"persist"},
     *     orphanRemoval=true
     * )
     */
    private $blogPosts;

    public function __construct()
    {
        $this->blogPosts = new ArrayCollection();
    }
    
    /**
     * @return list<BlogPost>
     */
    public function getBlogPosts(): array
    {
        return $this->blogPosts->toArray();
    }
    
    public function addBlogPost(BlogPost $blogPost): void
    {
        if (!$this->blogPosts->contains($blogPost)) {
            $this->blogPosts->add($blogPost);
        }
    }

    public function removeBlogPost(BlogPost $blogPost): void
    {
        $this->blogPosts->removeElement($blogPost);
    }
    
    /**
     * @param list<BlogPost> $blogPosts
     */
    public function setBlogPosts(array $blogPosts): void
    {
        $this->blogPosts->clear();
        foreach ($blogPosts as $blogPost) {
            $this->blogPosts->add($blogPost);
        }
    }
}
```

Dans la définition de la propriété, l’interface `Collection` doit être utilisée à la place de l’implémentation `ArrayCollection`, qui est utilisée pour initialiser la valeur. La raison en est que pendant l’exécution, Doctrine écrasera la propriété en utilisant une implémentation différente de `Collection`, qui permet le chargement différé et d’autres fonctionnalités.

In the property definition, the interface `Collection` should be used instead of the `ArrayCollection` implementation, which is used to initialize the value. The reason for this is that during execution, Doctrine will overwrite the property using a different `Collection` implementation, which enables lazy loading and other features.

#### Définitions du référentiel

Si les référentiels de doctrine doivent étendre un service de base (ce qui ne devrait pas être le cas), ils doivent être définis en étendant `Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository`, de sorte qu’il n’est pas nécessaire de configurer manuellement le référentiel et qu’il peut être utilisé avec le câblage automatique.

#### Valeurs de retour du référentiel

Le modèle de référentiel définit que seules les entités ou les résultats de calcul simples (comme un int pour une opération de comptage ou un booléen) doivent être retournés. Retourner un objet query builder est une fuite infrastructurelle, alors que la conversion d’entités en objets de valeur implique que le référentiel est conscient des détails d’implémentation de l’utilisation spécifique.

#### Méthodes magiques de "trouver" dans les dépôts

Doctrine fournit des méthodes magiques dans ses services de référentiel de base, qui peuvent être utilisés comme raccourci. L’utilisation de ces méthodes devrait cependant être considérée comme une mauvaise pratique, et la définition de méthodes personnalisées et explicites devrait être préférable.