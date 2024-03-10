

```php
// get last Id
$lastId = $manager->getRepository(User::class)->findOneBy([], ['id' => 'desc']);

dump($lastId->getId()+1);
```

OU

Utiliser `$user->getId()` après le `$em->flush()` pour obtenir le dernier identifiant d'insertion :
```php
$em->persist($user);
$em->flush();
$user->getId();
```