# Astuces

### Afficher les valeurs d'une propriété de collection

`->getValues()` permet d'afficher les valeurs d'une propriété de collection

Exemple : Afficher les valeurs de la propriété de collection `Addresses`
```php
$user->getAddresses()->getValues()
```
Retourne un tableau d'addresses
```php
array:2 [▼
  0 => App\Entity\Address {#767 ▶}
  1 => App\Entity\Address {#774 ▶}
]
```

### Rediriger un formulaire vers un autre chemin

Si on veut rediriger le formulaire vers  un autre chemin que celui ou il est, on utilise action du coté de twig.

```twig
{{ form_start(form, { 'action': path('app_order_reacp'), 'method': 'POST' }) }}
{{ form_end(form) }}
```

On peut aussi le faire directement dans la création du formulaire dans le controller en PHP

```php
$form = $this->createForm(ProjectProposalValidationType::class, $project, [
    'action' => $this->generateUrl('app_order_reacp'),
    'method' => 'POST',
]);
```

### Plusieurs façon de récupéré des données précise depuis le submit d'un form

```php
$carriers = $form['carriers']->getData();
```

```php
$carriers = $form->getData()['carriers'];
```

```php
$carriers = $form->get('carriers')->getData();
```

C'est le même retour pour les 3 codes ci-dessus
```php
App\Entity\Carrier {#1179 ▼
  -id: 1
  -name: "Colissimo"
  -description: "Votre colis est livrer en 72h"
  -price: 9.9
}
```

Si on veut afficher le name :
```php
$carrierName = $form->getData()['carriers']->getName();
```

Retourne :
```php
"Colissimo"
```

### Trouver php.ini

Pour trouver `php.ini`, on peut faire `phpinfo()` dans un controller, puis `CTRL + F` pour chercher php.ini
```php
phpinfo()
```

Le fichier pourrait ce trouver dans un chemin comme celui ci : `/etc/php/7.4/fpm/php.ini`

Puis soit on fait les codes ci-dessous pour voir ou écrire dans le fichier, sinon ou peut se rendre dans ce fichier avec l'explorateur de fichier
```properties
cat /etc/php/7.4/fpm/php.ini

# ou

nano /etc/php/7.4/fpm/php.ini
```

### Dans security.yaml, autoriser uniquement les users non connecter à accéder à une page, par exemple la page mot de passe oublier

```yaml
# security.yaml

access_control:
        - { path: ^/admin, roles: ROLE_ADMIN }
        - { path: ^/compte, roles: ROLE_USER }
        - { path: ^/mot-de-passe-oublie, allow_if: "is_anonymous() and !is_authenticated()" } # Uniquement les users non connecter peuvent accéder à cette page
```

### Exemple de différentes façon d'appeler et completer un addFlash()

```php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        // 1. Using the shortcut method of the controller

        // Adding a success type message
        $this->addFlash("success", "This is a success message");

        // Adding a warning type message
        $this->addFlash("warning", "This is a warning message");

        // Adding an error type message
        $this->addFlash("error", "This is an error message");

        // Adding a custom type message, remember the type is totally up to you !
        $this->addFlash("bat-alarm", "Gotham needs Batman");

        // 2. Retrieve manually the flashbag

        // Retrieve flashbag from the controller
        $flashbag = $this->get('session')->getFlashBag();

        // Set a flash message
        $flashbag->add("other", "This is another flash message with other type");

        // Render some twig view
        return $this->render("default/index.html.twig");
    }
}
```

### Comment supprimer les messages flash

Si vous avez déjà ajouté un message flash à la session, mais que vous ne souhaitez plus l'afficher pour une raison quelconque, vous devez le supprimer. 

Comme mentionné précédemment, les messages flash disparaissent une fois qu'ils sont récupérés.

Donc, pour les supprimer, il suffit d'accéder à la méthode get avec le type de message flash comme premier argument sans pointeur (ne stockez pas sa valeur dans une variable) :

```php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        // Retrieve flashbag from the controller
        $flashbag = $this->get('session')->getFlashBag();

        // Set a flash message
        $flashbag->add("bat-alarm", "Gotham needs Batman");

        // Retrieves the value (that isn't being assigned to a variable)
        // and therefore is "deleted" from the flashbag
        $flashbag->get("bat-alarm");

        // Render some twig view
        return $this->render("default/index.html.twig");
    }
}
```

### Choissir un fichier de traduction/translate dans twig

2 fichiers de trad core.fr.yaml et custom.page.fr.yaml

```yaml
# custom.page.fr.yaml

action:
    cancel: Annuler
```

```yaml
# core.fr.yaml

action:
    cancel: Annuler
```

```twig
<!-- Fichier twig --> 

<!-- Le domaine de traduction définit pour ce fichier Twig entier est custom.page par défault qui réprésente le fichier custom.page.fr.yaml  -->
{% trans_default_domain 'custom.page' %}

<!-- On utilise custom.page.fr.yaml qui est par défault  -->
<a herf="#">{{ 'action.cancel'|trans }}</a>

<!-- Avec trans({}, 'core') on peut utiliser précisément core.fr.yaml --> 
<!-- Sinon on aurait utiliser custom.page.fr.yaml qui est par défault  -->
<a herf="#">{{ 'action.cancel'|trans({}, 'core') }}</a> 

<!-- On peut l'utiliser aussi de cette manière --> 
<a herf="#">{{ 'action.cancel'|trans([], domain = 'core') }}</a> 
```

### Gérer la timezone de DateTime

**En Object**

```php
$datetime = new \DateTime();
$timezone = new \DateTimeZone('Europe/Paris');
$datetime->setTimezone($timezone);
echo $datetime->format('d/m/Y H:i:s');

// ou
$datetime = (new \DateTime('now'))->setTimezone(new \DateTimeZone('Europe/Paris'));
echo $datetime->format('d/m/Y H:i:s');

//ou
$datetime = new \DateTime('now', new DateTimeZone('Europe/Paris'));
echo $datetime->format('d/m/Y H:i:s');
```

OU 

**En Procedural**

```php
date_default_timezone_set("Europe/Paris");
$date = date('d/m/Y H:i');
echo $date;
```

OU

**Placez cette ligne de code au-dessus de votre script :**

```php
date_default_timezone_set('Europe/Paris');
```

### Obtenir le répertoire racine dans Symfony 5

- [Accéder aux paramètres de configuration](https://symfony.com/doc/current/configuration.html#accessing-configuration-parameters)
- [Liste des variables d'environnement](https://symfony.com/doc/current/configuration.html#listing-environment-variables)

#### Dans les contrôleurs s'étendant de AbstractController 
```php
$projectRoot = $this->getParameter('kernel.project_dir');
```

OU

```php
$projectRoot = $this->get('kernel')->getProjectDir();
```

OU

#### N'est pas recommander
```php
class Foo 
{
    /** KernelInterface $appKernel */
    private $appKernel;

    public function __construct(KernelInterface $appKernel)
    {
        $this->appKernel = $appKernel;
    }

    public function getProjectRoot()
    {
        return $this->appKernel->getProjectDir();
    }
}
```

OU

#### Le moyen le plus simple de le faire sans injecter de dépendances inutiles est de créer une méthode utilitaire comme celle-ci (dans mon cas, c'est dans src\Utils\Utils.php):

```php
namespace App\Utils;

public static function getRootDir(): string
{
    return __DIR__ . '/../..';
}
```

#### Ensuite, appelez-le simplement n'importe où avec
```php
Utils::getRootDir();
```
**Cela fonctionne à la fois sur Windows et Linux, mais si vous préférez, vous pouvez utiliser la constante DIRECTORY_SEPARATOR au lieu de'/'**

OU

#### L'approche recommandée en global
```yaml
# config/services.yaml

services:
    _defaults:
        bind:
            # pass this value to any $projectDir argument for any service
            # that's created in this file (including controller arguments)
            $projectDir: '%kernel.project_dir%'
```

**Vous pouvez donc injecter chaque service et contrôleur en tant que $projectDir .**

```php
# YourController
public class YourController {
   public function index(string $projectDir){
        // Your code
   }
}

# YourService
public class YourService {
   public function __construct(string $projectDir){
        // Your code
   }
}
```

OU 

#### L'approche dans un service
```yaml
# config/services.yaml
parameters:
    app.contents_dir: '...'

services:
    App\Service\Foo:
        arguments:
            - $projectDir: '%kernel.project_dir%' 
            - $contentsDir: '%app.contents_dir%'
```

```php
// src/Service/Foo.php

namespace src\Service;

class Foo {

  private $projectDir;
  private $contentsDir;

  public function __construct($projectDir, $contentsDir) 
  {
     $this->projectDir = $projectDir;
     $this->contentsDir = $contentsDirr;
  }
}
```
