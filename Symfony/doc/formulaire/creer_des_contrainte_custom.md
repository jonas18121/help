# Créer des contraintes personnaliser

#### Ligne de commande  

```bash
php bin/console make:validator
```

- Ensuite écrire le nom de la classe
- Et cela nous créera 2 classe, 
    - une qui représantera la constrainte. Exemple : BanWord.php
    - L'autre premettra de mettre la logique pour valider ou non le champ input qui aura la contrainte. Exemple : BanWordValidator.php
```bash
# Ensuite écrire le nom de la classe

The name of the validator class (e.g. EnabledValidator):
 > BanWordValidator

 created: src/Validator/BanWordValidator.php
 created: src/Validator/BanWord.php
```

### La représentaion de la contrainte personnalisé

- Ne pas oublier de le contruct du parent `parent::__construct(null, $groups, $payload);`

```php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class BanWord extends Constraint
{
    public function __construct(
        public string $message = 'The contains a banned word "{{ banWord }}".',
        public array $banWords = ['spam','viagra'],
        mixed $options = null,
        ?array $groups = null, 
        mixed $payload = null
    )
    {
        parent::__construct($options, $groups, $payload);
    }
}
```

### Représentation de la classe qui remettra de mettre la logique pour valider ou non le champ input qui aura la contrainte


```php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class BanWordValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {
        /* @var BanWord $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        $value = strtolower($value);

        foreach ($constraint->banWords as $banWord) {
            if (str_contains($value, $banWord)) {
                $this->context->buildViolation($constraint->message)
                ->setParameter('{{ banWord }}', $banWord)
                ->addViolation();
            }
        }
    }
}
```