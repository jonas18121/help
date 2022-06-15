

```php
// get last Id
$lastId = $manager->getRepository(User::class)->findOneBy([], ['id' => 'desc']);

dump($lastId->getId()+1);
```