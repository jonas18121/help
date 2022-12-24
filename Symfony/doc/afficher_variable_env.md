# Utliser des variables .env dans Symfony

[Youtube](https://www.youtube.com/watch?v=n_wGBA_dl68&t=7s)

[Le composant Dotenv](https://symfony.com/doc/4.3/components/dotenv.html)

[Github symfony/dotenv](https://github.com/symfony/dotenv)


## Obtenir une variable qui est définit dans le fichier .env et l'utiliser dans un controller, Symfony 5.

### Dans le fichier `.env`

Dans le fichier `.env`, on définit la variable `APP_PARAM`.
```shell
# config/services.yaml

APP_PARAM=param_value_here
```

### Dans le fichier `config/services.yaml`

Dans le fichier `config/services.yaml`, on appel la variable `APP_PARAM` en valeur d'un paramètre `app.paramname` qui représentera `APP_PARAM`.
```yaml
# config/services.yaml

parameters:
    app.paramname: '%env(APP_PARAM)%'
```

### Dans le controller

Dans le controller, on appel `app.paramname` via `$this->getParameter()`.

(S'assurer que le controller hérite de `AbstractController` pour utiliser `$this->getParameter()`)
```php
$this->getParameter('app.paramname'); // param_value_here
```

## Obtenir une variable qui est définit dans le fichier .env et l'utiliser dans un service, Symfony 5.

### Dans le fichier `.env`

Dans le fichier `.env`, on définit la variable `APP_PARAM`.
```shell
# config/services.yaml

APP_PARAM=param_value_here
```

### Dans le fichier `config/services.yaml`

Dans le fichier `config/services.yaml`, on appel la variable `APP_PARAM` en valeur d'un paramètre `app.paramname` qui représentera `APP_PARAM`.
```yaml
# config/services.yaml

parameters:
    app.paramname: '%env(APP_PARAM)%'
```
### Dans le service `DemoService`

Dans le service `DemoService`, on appel `app.paramname` via `$this->parameterBag->get()`.

(`$this->parameterBag->get()` provient de `ParameterBagInterface`)

```php
// DemoService.php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class DemoService
{
  private $parameterBag;

  public function _construc(ParameterBagInterface $parameterBag)
  {
    $this->parameterBag = $parameterBag;
  }

  /**
   * Afficher la variable d'environnement
  */
  public function getDemo(): string
  {
    return $this->parameterBag->get('app.paramname'); // param_value_here
  }
}
```
----------------------------------

### Ou on n'utilide pas ParameterBagInterface et on fournit la variable env directement, dans le fichier `config/services.yaml`. 
```yaml
# config/services.yaml

services:
    App\Service\DemoService:
      arguments:
        $demo: '%env(app.paramname)%
```

### Puis dans le service `DemoService`

Puis dans le service `DemoService`, on appel `app.paramname` via `$this->demo`.

(La valeur de $demo dans `DemoService` vient de l'argument $demo du fichier `config/services.yaml` )

```php
// DemoService.php

namespace App\Service;

class DemoService
{
  private string $demo;

  public function _construc(string $demo)
  {
    $this->demo = $demo;
  }

  /**
   * Afficher la variable d'environnement
  */
  public function getDemo(): string
  {
    return $this->demo; // param_value_here
  }
}
```

## Obtenir une variable qui est définit dans le fichier .env et l'utiliser dans Twig de manière global, Symfony 5.

### Dans `config/twig.yaml`

Dans `config/twig.yaml`, on utilise `globals` pour créer le clé qu'on a nommé `DEMO` qui recoit la varible env, et on pourra utiliser `DEMO` partout dans twig
```yaml
# config/twig.yaml

twig:
    default_path: '%kernel.project_dir%/templates'
    form_themes: ['bootstrap_5_layout.html.twig']
    globals:
      DEMO: '%env(app.paramname)%
```

## Obtenir une variable qui est définit dans le fichier .env et l'utiliser dans un fichier .php de manière global avec Le composant Dotenv , Symfony 5.

### Installation de `symfony/dotenv`
```bash
composer require symfony/dotenv
```

### Dans `public/index.php`

Dans `public/index.php`, charger le fichier `.env` avec `new Dotenv()`

- Importer `Dotenv`
- Instancier  `Dotenv`
- Puis charger le fichier `.env`

Avec cette configuration cela va appeler les fichiers en priorité `.env.local` et `.env.dev` si on en a.

Ordre de priorité

1) `.env.dev.local`
2) `.env.dev`
3) `.env.local`
4) `.env`

```php
use App\Kernel;
use Symfony\Component\Dotenv\Dotenv;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

$dotenv = new Dotenv();
$dotenv->usePutenv(true)->bootEnv(dirname(__DIR__).'/.env');

// ou utilise le code ci-dessous
// (new Dotenv())->usePutenv(true)->bootEnv(dirname(__DIR__).'/.env');

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
```

### Dans le fichier `.env`

Dans le fichier `.env`, on définit la variable `APP_PARAM`.
```shell
# config/services.yaml

APP_PARAM=param_value_here
```

### Dans le controller

Dans le controller, on affiche la valeur de la variable avec `getenv('VARIABLE_ENV')`

```php
dd(getenv('APP_PARAM')); // affiche la valeur de la variable qui est : param_value_here
```