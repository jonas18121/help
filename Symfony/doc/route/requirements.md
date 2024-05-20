# Différentes façon d'utiliser les requirements dans une route dans un Controller

### Utiliser une expression régulière directement dans les contraintes de la route

- `requirements: [ 'id' => '\d+' ]`
- **'\d+'** est une expression régulière qui signifie "une ou plusieurs chiffres".

```php
#[Route('/recettes/{id}/edit', name: 'app__recipe_edit', methods: ['GET', 'POST'], requirements: [ 'id' => '\d+' ])]
public function edit(Recipe $recipe) {
    // Logique du contrôleur
}
```

### Utiliser la classe Requirement

- [Requirement sur GitHub](https://github.com/symfony/symfony/blob/7.1/src/Symfony/Component/Routing/Requirement/Requirement.php)
- Cette classe contient plusieurs constantes dans lequel certaines expression régulière sont définit

```php
use Symfony\Component\Routing\Requirement\Requirement;

# ... code ...

#[Route('/recettes/{id}/edit', name: 'app_recipe_edit', methods: ['GET', 'POST'], requirements: [ 'id' => Requirement::DIGITS ])]
public function edit(Recipe $recipe) {
    // Logique du contrôleur
}
```

- Voici le contenu de la classe `Requirement`

```php
namespace Symfony\Component\Routing\Requirement;

/*
 * A collection of universal regular-expression constants to use as route parameter requirements.
 */
enum Requirement
{
    public const ASCII_SLUG = '[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*'; // symfony/string AsciiSlugger default implementation
    public const CATCH_ALL = '.+';
    public const DATE_YMD = '[0-9]{4}-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|(?<!02-)3[01])'; // YYYY-MM-DD
    public const DIGITS = '[0-9]+';
    public const POSITIVE_INT = '[1-9][0-9]*';
    public const UID_BASE32 = '[0-9A-HJKMNP-TV-Z]{26}';
    public const UID_BASE58 = '[1-9A-HJ-NP-Za-km-z]{22}';
    public const UID_RFC4122 = '[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}';
    public const ULID = '[0-7][0-9A-HJKMNP-TV-Z]{25}';
    public const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[13-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    public const UUID_V1 = '[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    public const UUID_V3 = '[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    public const UUID_V4 = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    public const UUID_V5 = '[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    public const UUID_V6 = '[0-9a-f]{8}-[0-9a-f]{4}-6[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    public const UUID_V7 = '[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
    public const UUID_V8 = '[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
}
```

### Utiliser un ParamConverter

- `options: ['id' => '\d+']`
- Le ParamConverter de Symfony peut également être utilisé pour convertir et valider les paramètres de route

```php
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

#[Route('/recettes/{id}/edit', name: 'app_recipe_edit', methods: ['GET', 'POST'])]
#[ParamConverter('recipe', options: ['id' => '\d+'])]
public function edit(Recipe $recipe) {
    // Logique du contrôleur
}
```

### Utiliser des assertions PHP

- **assert** : Vous pouvez utiliser les assertions PHP dans votre contrôleur pour valider les paramètres. Cette méthode est simple et directe, bien que moins sophistiquée que certaines autres options

```php
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[Route('/recettes/{id}/edit', name: 'app_recipe_edit', methods: ['GET', 'POST'])]
public function edit(Request $request, $id) {
    assert(is_numeric($id), new NotFoundHttpException('Invalid ID'));

    // Convertir $id en entier si nécessaire
    $id = (int) $id;

    // Logique du contrôleur
}
```

### Utiliser des validateurs Symfony personnalisés

- Créer un validateur Symfony personnalisé pour valider les paramètres avant qu'ils n'atteignent le contrôleur est une autre méthode avancée.

1. Créer le validateur personnalisé 

```php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class IsDigits extends Constraint
{
    public $message = 'The value "{{ value }}" is not a valid number.';
}
```

2. Créer la classe de validation 

```php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class IsDigitsValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        if (!is_numeric($value) || (int) $value != $value) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value)
                ->addViolation();
        }
    }
}
```

3. Utiliser le validateur dans le contrôleur 

```php
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Validator\Constraints\IsDigits;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[Route('/recettes/{id}/edit', name: 'app_recipe_edit', methods: ['GET', 'POST'])]
public function edit($id, ValidatorInterface $validator) {
    $errors = $validator->validate($id, new IsDigits());

    if (count($errors) > 0) {
        throw new NotFoundHttpException('Invalid ID');
    }

    // Logique du contrôleur
}
```