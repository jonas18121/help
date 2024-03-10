# PHPStan

PHPStan est un analyseur de code statique, Il va vérifier si le code est cohérent grace aux typage et aux commentaires qu'on va mettre dans notre code

### Error Strict comparison using === between null and App\Entity\User will always evaluate to false.

Voir [ce commentaire](https://github.com/phpstan/phpstan/issues/743#issuecomment-355909457)

```php
/** @var User */
$user = $this->manager->getRepository(User::class)->findOneBy(['email' => $value['email']]);

```
**Error Strict comparison using === between null and App\Entity\User will always evaluate to false. **

#### Solution : rajouter null à @var User

```php
/** @var User|null */
$user = $this->manager->getRepository(User::class)->findOneBy(['email' => $value['email']]);

```