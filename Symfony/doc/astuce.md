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

### Utiliser le service session pour ajouter un message flash depuis une autre classe.

La méthode $this->addFlash() est également définie dans la classe Symfony\Bundle\FrameworkBundle\Controller\AbstractController 

et n'est pas directement accessible depuis d'autres classes que les contrôleurs. 

Cependant, il est possible d'utiliser le service session pour ajouter un message flash depuis une autre classe.

Voici un exemple de code qui montre comment utiliser le service session pour ajouter un message flash à partir d'une classe autre que le contrôleur :

```php
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ExampleClass
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function addFlashMessage()
    {
        $this->session->getFlashBag()->add('success', 'Le message a été envoyé avec succès.');
    }
}
```

Dans cet exemple, la classe ExampleClass dispose d'une dépendance SessionInterface qui est injectée via le mécanisme de l'injection de dépendances de Symfony. 

La méthode addFlashMessage() utilise ensuite le service session pour ajouter un message flash à la session de l'utilisateur en utilisant la méthode add() de la FlashBag. 

Dans ce cas, le message est de type success et a pour contenu "Le message a été envoyé avec succès.".

Il est important de noter que pour pouvoir injecter le service session dans une classe, cette classe doit être instanciée par le conteneur de services de Symfony. 

Cela signifie que la classe doit être déclarée en tant que service dans le fichier de configuration services.yaml de votre application Symfony.

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

### Pour ne pas supprimer un fichier/dossier dans un serveur

- [Utiliser rsync](https://doc.ubuntu-fr.org/rsync), s'il est déjà installer
- Ou [Installer rsync](https://serverspace.io/support/help/use-rsync-to-create-a-backup-on-ubuntu/)

Faire la commande ci-dessous, pour savoir si rsync est déjà installer

```ps
sudo rsync --version
```


**Dans project/app/.settings/rsync** , on crée plusieurs fichiers pour chaque environnements :

- rsync.develop.txt
- rsync.preproduction.txt
- rsync.production.txt
- rsync.staging.txt

Puis mettre le nom des dossiers/fichiers dans chaque fichiers de chaque environnements :

Exemple : si on ne veut pas supprimer le contenu dans les dossiers **app/public/backups**, **app/public/media/**, **app/translations/edite/** mettre les lignes ci-dessous pour chaque fichiers de chaque environnements :

rsync.develop.txt
```txt
- app/public/backups/*
- app/public/media/*
- app/translations/edite/*
```

rsync.preproduction.txt
```txt
- app/public/backups/*
- app/public/media/*
- app/translations/edite/*
```

rsync.production.txt
```txt
- app/public/backups/*
- app/public/media/*
- app/translations/edite/*
```

rsync.staging.txt
```txt
- app/public/backups/*
- app/public/media/*
- app/translations/edite/*
```

### Doctrine : exemple de DQL pour Modifier une colonnes

```php
# AddresseRepository
public function switchAddressByDefaultOnFalse(int $id): void
{
    $bool = false;
    $this->createQueryBuilder('a')
        ->update('App\Entity\Address', 'address')
        ->set('address.addressByDefault', ':bool')
        ->andWhere('address.user = :id')
        ->setParameter('id', $id)
        ->setParameter('bool', $bool)
        ->getQuery()
        ->getResult();
}
```

### Doctrine : exemple de DQL pour Supprimer des données dans une table
```php
# AddresseRepository
public function deleteAllAddress(int $id): void
{
    $this->createQueryBuilder('a')
        ->delete('App\Entity\Address', 'address')
        ->andWhere('address.user = :id')
        ->setParameter('id', $id)
        ->getQuery()
        ->getResult();
}
```

### Rediriger vers une autre route à partir d'une autre classe que le contrôleur

La méthode $this->redirectToRoute() est disponible dans les contrôleurs Symfony car elle est définie dans la classe Symfony\Bundle\FrameworkBundle\Controller\AbstractController. 

Cependant, si vous souhaitez rediriger vers une autre route à partir d'une autre classe que le contrôleur, vous pouvez utiliser le service router qui est injecté automatiquement dans la plupart des classes dans Symfony.

Voici un exemple de code qui montre comment utiliser le service router pour rediriger vers une autre route à partir d'une classe autre que le contrôleur :

```php
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

class ExampleClass
{
    private $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    public function redirectToAnotherRoute()
    {
        $routeName = 'nom_de_la_route';
        $routeParams = array('parametre1' => 'valeur1', 'parametre2' => 'valeur2');
        $url = $this->router->generate($routeName, $routeParams);

        return new RedirectResponse($url);
    }
}
```

Dans cet exemple, la classe ExampleClass dispose d'une dépendance RouterInterface qui est injectée via le mécanisme de l'injection de dépendances de Symfony. 

La méthode redirectToAnotherRoute() utilise ensuite le service router pour générer l'URL de la route à laquelle rediriger à partir de son nom et de ses éventuels paramètres. 

Enfin, elle retourne une instance de la classe RedirectResponse qui permet de rediriger vers l'URL générée.

Il est important de noter que pour pouvoir injecter le service router dans une classe, cette classe doit être instanciée par le conteneur de services de Symfony. 

Cela signifie que la classe doit être déclarée en tant que service dans le fichier de configuration services.yaml de votre application Symfony.


### Dans FormType 

Avec le schéma ci dessous, il autorise , les nombres entier et décimaux avec le nombre de décimaux qu'on veut écrire après la virgule

Ex : `74.5555555555`

```php

->add('priceToBase', NumberType::class, [
    'required' => true,
    'label' => 'Prix de base (€)',
    'html5' => false
]);
```

Avec le schéma ci dessous, il autorise , les nombres entier et décimaux puis va arrondir a 2 nombre de décimaux si on écrit plus de 2 chiffres après la virgule

Ex : `74.5555555555` => `74.56`

```php
->add('priceToBase', NumberType::class, [
    'required' => true,
    'label' => 'Prix de base (€)',
    'html5' => false,
    'scale' => 2,
]);
```
### Insérer du code HTML dans le message traduit

Pour insérer du code HTML dans le message traduit, vous pouvez utiliser le filtre `|raw` autour de l'ensemble du message traduit.<br> 
Ensuite, vous pouvez utiliser les balises Twig normales pour générer le lien HTML.

Dans votre fichier de traduction (par exemple, messages.fr.yaml), définissez une clé avec des paramètres numériques :
```yaml
# messages.fr.yaml

application.section.email.footer.message: Cliquez sur le lien de mon projet nommé %dataProjectName%
```

Voici comment vous pouvez le faire dans le twig :
```twig
<p>{{ 'application.section.email.footer.message'|trans({'%dataProjectName%': '<a href="' ~ data_project_url ~ '">' ~ dataProjectName ~ '</a>'})|raw }}</p>
```

Dans cet exemple, nous supposons que `dataProjectName` est une variable Twig contenant le nom du projet et `data_project_url` est une variable Twig contenant l'url du projet.<br> 
La clé `application.section.email.footer.message` est traduite en utilisant `trans()`. <br> 
Ensuite, nous appliquons `|raw` pour désactiver l'échappement HTML sur l'ensemble du message traduit.
On utilise `%dataProjectName%` pour mettre `<a href="' ~ data_project_url ~ '">' ~ dataProjectName ~ '</a>` dedans


#### Résultat dans le navigateur
```html
<p>Cliquez sur le lien de mon projet nommé <a href="https://monprojet.com">Le nom de mon projet</a></p>
```



