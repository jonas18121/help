# Classe de type Manager VS classe de type Service

Dans un projet PHP/Symfony, les classes de type "manager" et les classes de type "service" jouent des rôles différents bien que complémentaires. Voici les distinctions principales entre les deux :

## Classes de type Manager

1. Gestion des Entités :

    - Les managers sont principalement utilisés pour gérer les entités. Ils sont responsables des opérations CRUD (Create, Read, Update, Delete) sur les entités.
    - Ils peuvent encapsuler la logique d'accès aux données et les interactions avec l'ORM (Object-Relational Mapping), comme Doctrine.

2. Couche de Persistance :

    - Les managers sont souvent placés dans la couche de persistance. Ils interagissent directement avec la base de données.
    - Ils contiennent des méthodes pour rechercher des entités, les sauvegarder, les mettre à jour et les supprimer.

3. Exemples :

    - UserManager, ProductManager, OrderManager, etc.
    - Typiquement, ils utilisent l'EntityManager de Doctrine pour effectuer leurs opérations.

## Classes de type Service

1. Logique Métier :

    - Les services sont utilisés pour encapsuler la logique métier de l'application.
    - Ils peuvent effectuer des tâches complexes qui ne sont pas directement liées à la persistance des données, comme l'envoi d'e-mails, la gestion des fichiers, l'authentification, etc.

2. Couche Applicative :

    - Les services appartiennent à la couche applicative. Ils orchestrent les opérations entre les différentes parties de l'application.
    - Ils peuvent utiliser des managers pour accéder aux entités, mais leur rôle est de coordonner et de réaliser des actions spécifiques à la logique de l'application.

3. Exemples :

    - EmailService, PaymentService, NotificationService, etc.
    - Ils peuvent dépendre de plusieurs composants (managers, autres services, API externes) pour accomplir leur tâche.

## Comparaison et Collaboration

1. Séparation des responsabilités :

    - Les managers se concentrent sur la gestion des entités et la communication avec la base de données.
    - Les services se concentrent sur la logique métier et les fonctionnalités de l'application.

2. Collaboration :

    - Les services peuvent utiliser des managers pour effectuer des opérations sur les entités.
    - Par exemple, un OrderService peut utiliser un OrderManager pour créer une commande et un PaymentService pour traiter le paiement associé.

3. Tests et Maintenance :

    - En séparant les responsabilités entre managers et services, le code devient plus modulaire, plus facile à tester et à maintenir.
    - Les tests unitaires pour les managers peuvent se concentrer sur les interactions avec la base de données, tandis que les tests pour les services peuvent vérifier la logique métier.

### Exemple de Code

### UserManager

- se concentrent sur la gestion de entité et la communication avec la base de données.

```php
// src/Manager/UserManager.php
namespace App\Manager;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

class UserManager
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $userPasswordHasher;
    protected EntityManagerInterface $em;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $em
    )
    {
        $this->entityManager = $entityManager;
        $this->userPasswordHasher = $userPasswordHasher;
        $this->em = $em;
    }

    public function createUser(User $user): User
    {
        $user->setPassword(
            $this->userPasswordHasher->hashPassword(
                $user,
                $form->get('plainPassword')->getData()
            ))
            ->setCreatedAt(new \DateTime())
            ->isActive(true)
        ;

        return $this->save($user);
    }

    public function save(User $user): User
    {
        $em = $this->em();
        $em->persist($user);
        $em->flush();

        return $user;
    }

    // Autres méthodes de gestion des utilisateurs...
}
```

### EmailService

- Gére les envoies de mail


```php
// src/Service/EmailService.php
namespace App\Service;

use Swift_Mailer;
use Swift_Message;

class EmailService
{
    private Swift_Mailer $mailer;

    public function __construct(Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendWelcomeEmail(User $user): void
    {
        $message = (new Swift_Message('Welcome!'))
            ->setFrom('send@example.com')
            ->setTo($user->getEmail())
            ->setBody('Welcome to our platform!');
        
        $this->mailer->send($message);
    }

    // Autres méthodes liées aux emails...
}
```

### UserService

- se concentrent sur la logique métier et les fonctionnalités de l'application.

```php
// src/Service/UserService.php
namespace App\Service;

use App\Manager\UserManager;

class UserService
{
    private $userManager;
    private $emailService;

    public function __construct(UserManager $userManager, EmailService $emailService)
    {
        $this->userManager = $userManager;
        $this->emailService = $emailService;
    }

    public function registerUser(User $user): User
    {
        if(null !== $this->getUser()) {
            throw \Exception("Erreur");
        }

        $user = $this->userManager->createUser($user);
        $this->emailService->sendWelcomeEmail($user);

        return $user;
    }

    // Autres méthodes de gestion des utilisateurs...
}
```

### RegistrationController

- utilise UserService

```php
namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\AppAuthenticator;
use App\Security\EmailVerifier;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{
    private EmailVerifier $emailVerifier;

    public function __construct(
        EmailVerifier $emailVerifier,
        UserService $userService
    )
    {
        $this->emailVerifier = $emailVerifier;
        $this->userService = $userService;
    }

    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user = $this->userService->registerUser($user);

            return $security->login($user, AppAuthenticator::class, 'main');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }
}
```

### Pourquoi séparer Service & Manager ?

- **Service** : traite une **intention métier complète** (ex : "Créer un utilisateur").

- **Manager** : contient la **logique technique répétitive** liée à une entité (ex : hasher le mot de passe, envoyer un mail de bienvenue, enregistrer un user).

👉 **Le service orchestre, le manager exécute.**

### Architecture typique

```txt
UserController
    ↓
UserService (service métier)
    ↓
UserManager (logique sur User : création, mise à jour, etc.)
    ↓
UserRepository (accès DB)
```

En résumé, les managers et les services ont des responsabilités distinctes dans un projet Symfony : les managers gèrent les opérations sur les entités et la persistance des données, tandis que les services implémentent la logique métier et orchestrent les différentes actions nécessaires au bon fonctionnement de l'application.





