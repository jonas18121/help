# Testing dans  symfony

Site [PHPUnit](https://symfony.com/doc/current/testing.html#the-phpunit-testing-framework)

### phpunit/phpunit
```bash
composer require phpunit/phpunit --dev
```
ou
Installez symfony/test-pack, qui installe d'autres packages nécessaires au test (tels que phpunit/phpunit):
```bash
composer require --dev symfony/test-pack
```
ou 
```bash
composer require test --dev
```
### Créer une base de données dans un environnement de test
On crée un fichier .env.test.local puis on met ceci dedans :
```bash
# define your env variables for the test env here
KERNEL_CLASS='App\Kernel'
APP_SECRET='$ecretf0rt3st'
SYMFONY_DEPRECATIONS_HELPER=999999
PANTHER_APP_ENV=panther
PANTHER_ERROR_SCREENSHOT_DIR=./var/error-screenshots
RECAPTCHA3_ENABLED=0 #Enlever le recaptacha

DATABASE_URL=mysql://User:password@mysql/name_bdd_test?serverVersion=5.7
``` 

Ensuite on excécute la commande ci-dessous

```bash
php bin/console doctrine:database:create --env=test
```

### Créer la structure des tables dans la base de données qui est dans un environnement de test
```bash
php bin/console doctrine:schema:update --env=test --force
```
### Envoyer des fixtures dans la base de données qui est dans un environnement de test
```bash
php bin/console doctrine:fixtures:load --env=test
```

### Créer un fichier de test a partir du terminal
#### Voir les types de test qui existe

```bash
php bin/console make:test
```
Retourne
```bash
Which test type would you like?:
  [TestCase       ] basic PHPUnit tests
  [KernelTestCase ] basic tests that have access to Symfony services
  [WebTestCase    ] to run browser-like scenarios, but that dont execute JavaScript code
  [ApiTestCase    ] to run API-oriented scenarios
  [PantherTestCase] to run e2e scenarios, using a real-browser or HTTP client and a real web server

"Puis on choisi celui que l'on veut"
   > TestCase


Choose a class name for your test, like:
 * UtilTest (to create tests/UtilTest.php)
 * Service\UtilTest (to create tests/Service/UtilTest.php)
 * \App\Tests\Service\UtilTest (to create tests/Service/UtilTest.php)

 The name of the test class (e.g. BlogPostTest):
 > Unit\UserApplicationTest

 created: tests/Unit/UserApplicationTest.php

           
  Success! 
           

 Next: Open your new test class and start customizing it.
 Find the documentation at https://symfony.com/doc/current/testing.html#unit-tests

```

Si erreur ci-dessus ce produit : 
```bash
Attempted to load class "TestCase" from namespace "PHPUnit\Framework". Did you forget a "use" statement for another namespace?
```

Executer la commande puis recommencer avec php bin/console make:test :
```bash
composer require --dev phpunit/phpunit symfony/test-pack
```

### Pour tester on utilise cette commande

```bash
php bin/phpunit
```
