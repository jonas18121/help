# Astuces

## Contrainte Sequentially pour valider des contraintes les une après les autres

- [Sequentially](https://symfony.com/doc/current/reference/constraints/Sequentially.html)

Cette contrainte permet d'appliquer un ensemble de règles qui doivent être validées étape par étape, permettant d'interrompre la validation une fois la première violation levée.

Comme alternative dans les situations Sequentiallyqui ne peuvent pas être résolues, vous pouvez envisager d'utiliser [GroupSequence](https://symfony.com/doc/current/validation/sequence_provider.html) qui permet plus de contrôle.

Cela permet d'afficher les contraintes les une après les autres

Exemple :

**Sans Sequentially :** 
- Si l'utilisateur écrit dans le champs slug : `l1-`
- Cela retournera 2 erreurs car le valeur qui contient moins de 10 caractère et il y a pas d'autres caractères après le tiret
- Les 2 erreurs seront afficher en même temps dans le fromulaire 

```php
# RecipeType.php

$builder
    ->add('slug', TextType::class, [
        'required' => false,
        'constraints' => [
            new Length(min: 10),
            new Regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', message: "Ce slug n'est pas valide")
        ]
    ])
;
```

On peut mettre la contrainte directement dans l'entité

```php
# RecipeType.php

namespace App\Entity;

use App\Repository\RecipeRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 5)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 5)]
    #[Assert\Regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', message: "Ce slug n'est pas valide")]
    private ?string $slug = null;
}
```


**Avec Sequentially :** 
- Si l'utilisateur écrit dans le champs slug : `l1-`
- Cela retournera 2 erreurs car le valeur qui contient moins de 10 caractère et il y a pas d'autres caractères après le tiret
- `Sequentially` va afficher une seule erreur dans l'ordre, en premier celui de `Length`, puis si c'est corriger `Sequentially` va afficher l'erreur de `Regex`

```php
# RecipeType.php

$builder
    ->add('slug', TextType::class, [
        'required' => false,
        'constraints' => new Sequentially ([
            new Length(min: 10),
            new Regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', message: "Ce slug n'est pas valide")
        ])
    ])
;
```

On peut mettre la contrainte directement dans l'entité

```php
# Recipe.php

namespace App\Entity;

use App\Repository\RecipeRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 5)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Assert\Sequentially([
        new Assert\Length(min: 5),
        new Assert\Regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', message: "Ce slug n'est pas valide")
    ])]
    private ?string $slug = null;
}
```