# IsGranted() VS $this->denyAccessUnlessGranted()

Source :

- [@Security & @IsGranted](https://symfony.com/bundles/SensioFrameworkExtraBundle/current/annotations/security.html)
- [Using Expressions in Security Access Controls](https://symfony.com/doc/current/security/expressions.html)
- [Security](https://symfony.com/doc/current/security.html)
- [Denying Access in a Controller](https://symfonycasts.com/screencast/symfony-security/deny-access-controller)
- [Construisez un site web à l'aide du framework Symfony 7](https://openclassrooms.com/fr/courses/8264046-construisez-un-site-web-a-laide-du-framework-symfony-7/8403110-gerez-les-autorisations-des-utilisateurs)

En Symfony, les annotations de sécurité telles que #[IsGranted('ROLE_ADMIN')] permettent de restreindre l'accès aux contrôleurs et aux méthodes spécifiques selon les rôles des utilisateurs.

## Utilisation de #[IsGranted('ROLE_ADMIN')] 

### Au-dessus de la classe du contrôleur

Lorsqu'on place #[IsGranted('ROLE_ADMIN')] au-dessus d'une classe de contrôleur, cela signifie que toutes les actions (méthodes) dans ce contrôleur sont restreintes aux utilisateurs qui ont le rôle ROLE_ADMIN.

- Dans l'exemple ci-dessous, toutes les routes définies dans `AdminController` nécessitent que l'utilisateur soit authentifié avec le rôle `ROLE_ADMIN`.
```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
class AdminController extends AbstractController
{
    #[Route('/admin/dashboard', name: 'admin_dashboard')]
    public function dashboard()
    {
        // Seuls les utilisateurs ayant le rôle ROLE_ADMIN peuvent accéder à cette méthode
        return $this->render('admin/dashboard.html.twig');
    }

    #[Route('/admin/settings', name: 'admin_settings')]
    public function settings()
    {
        // Seuls les utilisateurs ayant le rôle ROLE_ADMIN peuvent accéder à cette méthode
        return $this->render('admin/settings.html.twig');
    }
}
```

### Au-dessus d'une méthode

Lorsqu'on place `#[IsGranted('ROLE_ADMIN')]` au-dessus d'une méthode, cela signifie que seule cette méthode est restreinte aux utilisateurs ayant le rôle `ROLE_ADMIN`.

- Dans l'exemple ci-dessous, seule la méthode adminStats est protégée par le rôle ROLE_ADMIN. La méthode profile reste accessible à tous les utilisateurs.

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class SomeController extends AbstractController
{
    #[Route('/user/profile', name: 'user_profile')]
    public function profile()
    {
        // Cette méthode est accessible à tous les utilisateurs
        return $this->render('user/profile.html.twig');
    }

    #[Route('/admin/stats', name: 'admin_stats')]
    #[IsGranted('ROLE_ADMIN')]
    public function adminStats()
    {
        // Seuls les utilisateurs ayant le rôle ROLE_ADMIN peuvent accéder à cette méthode
        return $this->render('admin/stats.html.twig');
    }
}
```

## Différence entre #[IsGranted('ROLE_ADMIN')] et $this->denyAccessUnlessGranted('ROLE_ADMIN')

### *#[IsGranted('ROLE_ADMIN')]*

L'annotation `#[IsGranted('ROLE_ADMIN')]` est une manière déclarative de restreindre l'accès. 

Elle est plus concise et rend la configuration de sécurité plus lisible. 

L'annotation est évaluée avant que la méthode du contrôleur ne soit appelée.

### *$this->denyAccessUnlessGranted('ROLE_ADMIN')*

La méthode `$this->denyAccessUnlessGranted('ROLE_ADMIN')` est utilisée de manière programmatique à l'intérieur d'une méthode de contrôleur. 

Elle permet de vérifier les permissions d'accès à un moment spécifique dans l'exécution de la méthode.

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AnotherController extends AbstractController
{
    #[Route('/admin/reports', name: 'admin_reports')]
    public function reports()
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        // Cette partie du code ne sera atteinte que si l'utilisateur a le rôle ROLE_ADMIN
        return $this->render('admin/reports.html.twig');
    }
}
```

## Avantages et inconvénients

### *#[IsGranted('ROLE_ADMIN')]*

**Avantages**

- Lisibilité et simplicité : le code est plus propre et les intentions sont claires.

- Déclaratif : permet une séparation claire entre la logique métier et les règles de sécurité.

**Inconvénients**

- Moins de flexibilité : ne peut être utilisé que pour des contrôles d'accès simples et directs.

### *$this->denyAccessUnlessGranted('ROLE_ADMIN')*

**Avantages**

- Flexibilité : permet d'ajouter des conditions de sécurité plus complexes à des moments précis dans l'exécution de la méthode.

- Contrôle fin : peut être utilisé dans des situations où l'accès doit être contrôlé dynamiquement en fonction de la logique métier.

**Inconvénients**

- Moins lisible : les vérifications de sécurité peuvent être éparpillées dans le code, ce qui peut nuire à la lisibilité et à la maintenabilité.

## Bonnes pratiques

Pour des contrôles d'accès simples et directs, il est recommandé d'utiliser `#[IsGranted('ROLE_ADMIN')]` car cela rend le code plus lisible et maintenable. 

Pour des contrôles d'accès plus complexes ou conditionnels, `$this->denyAccessUnlessGranted('ROLE_ADMIN')` est plus approprié.<br> 
En général, il est important de garder le code aussi propre et simple que possible tout en répondant aux besoins de sécurité de l'application.

## Avec les voter

Les Voter permettent d'implémenter des contrôles d'accès plus complexes et spécifiques dans Symfony. Lorsque vous utilisez des Voter, il est généralement préférable d'utiliser l'approche programmatique avec `$this->denyAccessUnlessGranted('ROLE_ADMIN')` ou une version plus spécifique de l'accès, comme un Voter personnalisé. Cependant, les annotations peuvent aussi être utilisées avec des Voter.

### Utilisation des Voter

#### Créer un Voter

```php
namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class AdminVoter extends Voter
{
    // Les attributs que ce Voter supporte
    const VIEW = 'view_admin';
    const EDIT = 'edit_admin';

    protected function supports(string $attribute, $subject): bool
    {
        // Si l'attribut n'est pas supporté, retourner false
        if (!in_array($attribute, [self::VIEW, self::EDIT])) {
            return false;
        }

        // Si le sujet est nul ou non pris en charge, retourner false
        if ($subject && !$subject instanceof SomeEntity) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            return false;
        }

        // Logique de vérification des permissions
        switch ($attribute) {
            case self::VIEW:
                return $this->canView($subject, $user);
            case self::EDIT:
                return $this->canEdit($subject, $user);
        }

        return false;
    }

    private function canView($subject, UserInterface $user): bool
    {
        // Logique pour vérifier si l'utilisateur peut voir le sujet
        return $user->hasRole('ROLE_ADMIN');
    }

    private function canEdit($subject, UserInterface $user): bool
    {
        // Logique pour vérifier si l'utilisateur peut éditer le sujet
        return $user->hasRole('ROLE_ADMIN');
    }
}
```

#### Utiliser un Voter dans un contrôleur avec $this->denyAccessUnlessGranted

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SomeController extends AbstractController
{
    #[Route('/admin/resource/{id}', name: 'admin_resource_view')]
    public function viewResource(SomeEntity $entity)
    {
        $this->denyAccessUnlessGranted('view_admin', $entity);

        // Cette partie du code ne sera atteinte que si l'utilisateur a la permission view_admin pour cet entity
        return $this->render('admin/resource_view.html.twig', ['entity' => $entity]);
    }
}
```

#### Utiliser un Voter dans un contrôleur avec l'annotation #[IsGranted]

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class SomeController extends AbstractController
{
    #[Route('/admin/resource/{id}', name: 'admin_resource_view')]
    #[IsGranted('view_admin', subject: 'entity')]
    public function viewResource(SomeEntity $entity)
    {
        // Cette partie du code ne sera atteinte que si l'utilisateur a la permission view_admin pour cet entity
        return $this->render('admin/resource_view.html.twig', ['entity' => $entity]);
    }
}
```