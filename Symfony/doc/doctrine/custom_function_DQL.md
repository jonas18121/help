# Comment enregistrer des fonctions DQL personnalisées

- [How to Register custom DQL Functions](https://symfony.com/doc/current/doctrine/custom_dql_functions.html)
- [DQL User Defined Functions](https://www.doctrine-project.org/projects/doctrine-orm/en/current/cookbook/dql-user-defined-functions.html)

1. Configuration des Fonctions DQL Personnalisées

Pour enregistrer des fonctions DQL personnalisées dans Symfony, configurez-les dans votre fichier `doctrine.yaml`, `doctrine.xml` ou `doctrine.php`. Ajoutez vos fonctions personnalisées sous la configuration `dql` pour les types string, numeric et datetime. Voici un exemple de configuration dans `doctrine.yaml` :

Dans `doctrine.yaml`

```yaml
doctrine:
    orm:
        dql:
            string_functions:
                FUNCTION_NAME: Namespace\Of\YourFunction
            numeric_functions:
                FUNCTION_NAME: Namespace\Of\YourFunction
            datetime_functions:
                FUNCTION_NAME: Namespace\Of\YourFunction

```

2. Déclaration de la Fonction Personnalisée

```php
namespace App\Doctrine;

use Doctrine\ORM\Query\Lexer;
use Doctrine\ORM\Query\AST\Functions\FunctionNode;

class MyCustomFunction extends FunctionNode
{
    // Implémentez la logique de votre fonction
    public function getSql(\Doctrine\ORM\Query\SqlWalker $sqlWalker)
    {
        // Retourne l'implémentation SQL de la fonction
    }

    public function parse(\Doctrine\ORM\Query\Parser $parser)
    {
        // Analyse l'arbre de syntaxe abstraite de la fonction
    }
}
```

3. Utilisation de la Fonction dans une Requête

Dans une classe de repository ou de service, vous pouvez utiliser votre fonction DQL personnalisée :

```php
$entityManager = $this->getEntityManager();
$query = $entityManager->createQuery(
    'SELECT e
     FROM App\Entity\YourEntity e
     WHERE FUNCTION_NAME(e.property) = :value'
)->setParameter('value', $value);

$results = $query->getResult();
```