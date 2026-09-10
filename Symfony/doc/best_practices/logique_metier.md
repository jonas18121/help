# La logique métier

## Qu’est-ce que la logique métier (Business Logic) ?

C’est **tout ce qui concerne les règles, comportements ou processus spécifiques au fonctionnement réel de l’entreprise ou de l’application.**

- En clair : ce qui ne relève **ni de l'affichage, ni de l'accès aux données**, mais de **ce que fait réellement l'application selon des règles métiers précises**.

## Exemples de logique métier

### Contexte : Création d’un compte utilisateur

Disons qu'on est dans un `UserController` qui gère l'inscription.

### ❌ Mauvais exemple (logique métier dans le controller) :

```php
public function register(Request $request): JsonResponse
{
    $email = $request->request->get('email');
    $plainPassword = $request->request->get('password');

    // ❌ Logique métier dans le contrôleur
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return new JsonResponse(['error' => 'Invalid email'], 400);
    }

    if (strlen($plainPassword) < 8) {
        return new JsonResponse(['error' => 'Password too short'], 400);
    }

    $user = new User($email);
    $user->setPassword($hasher->hashPassword($user, $plainPassword));

    $entityManager->persist($user);
    $entityManager->flush();

    return new JsonResponse(['message' => 'User created']);
}
```

### ✅ Bon exemple (logique métier déléguée à un Service ou Handler ou Manager) :

Dans le controller :

```php
public function register(Request $request, UserService $userService): JsonResponse
{
    // 1. Extraire les données
    $email = $request->get('email');
    $password = $request->get('password');

    // 2. Vérifier les droits (si nécessaire)
    $this->denyAccessUnlessGranted('ROLE_USER');

    // 3. Appeler la logique métier
    try {
        $userService->create($email, $password);
    } catch (DomainException $e) {
        return new JsonResponse(['error' => $e->getMessage()], 400);
    }

    // 4. Retourner une réponse HTTP
    return new JsonResponse(['message' => 'Utilisateur créé'], 201);
}
```

Dans le Service :

```php
// src/Service/UserService.php
class UserService
{
    public function __construct(
        private UserManager $userManager,
        private MailerInterface $mailer
    ) {}

    public function create(string $email, string $plainPassword): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidEmailException();
        }

        if (strlen($plainPassword) < 8) {
            throw new WeakPasswordException();
        }

        $this->userManager->createUser($email, $plainPassword);
        
        // Bonus : envoyer un mail de bienvenue
        $this->mailer->send(
            (new Email())
                ->to($email)
                ->subject('Bienvenue !')
                ->text('Merci pour votre inscription.')
        );
    }
}
```

Et dans le Manager :

- Voir le fichier [manager_vs_service.md](https://github.com/jonas18121/help/blob/master/Symfony/doc/best_practices/manager_vs_service.md)

```php
// src/Manager/UserManager.php
class UserManager
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $hasher,
        private MailerInterface $mailer
    ) {}

    public function createUser(string $email, string $plainPassword): void
    {
        if ($this->userRepository->findByEmail($email)) {
            throw new UserAlreadyExistsException();
        }

        $user = new User($email);
        $user->setPassword($this->hasher->hashPassword($user, $plainPassword));

        $this->userRepository->save($user);
    }
}
```

### Résumer :

Voici quelques **types de logique métier** qu’on ne veut **jamais voir dans un controller** :

- Validations métiers (ex : un utilisateur doit avoir au moins 18 ans)

- Calculs métiers (ex : calcul de TVA, prix remisé, date d’expiration)

- États métiers (ex : une commande ne peut passer en “expédiée” que si elle est “payée”)

- Déclenchement d’actions internes (ex : envoyer un email de confirmation, notifier un admin)

- Conditions d’accès spécifiques (ex : seul un auteur peut modifier son article)

### CHECKLIST : CONTROLLER vs SERVICE
checklist claire et directe à utiliser pour savoir quoi garder dans un controller et quoi déléguer à un service (ou handler/manager/etc.) 👇

| Élément à coder                               | Controller    | Service / Handler | Notes                                                             |
| --------------------------------------------- | ------------- | ----------------- | ----------------------------------------------------------------- |
| Récupérer les données de la requête           | ✅            | ❌                | `$request->get(...)`, `$request->files->get(...)`, etc.           |
| Vérifier les rôles / accès utilisateur        | ✅            | ❌                | Utilise `isGranted()`, `denyAccessUnlessGranted()`                |
| Appeler un service métier                     | ✅            | ✅                | Le controller est un **orchestrateur**, pas un acteur métier      |
| Retourner une réponse HTTP                    | ✅            | ❌                | `return new JsonResponse(...)`, `render(...)`                     |
| Logique de validation métier (âge, email...)  | ❌            | ✅                | Pas de `if (...)` métiers dans le controller                      |
| Création d'entités métiers                    | ❌            | ✅                | Exemple : `new Order(...)`, `new User(...)`, etc.                 |
| Gestion des règles métiers                    | ❌            | ✅                | Exemple : "commande = validée seulement si stock OK"              |
| Accès à la base de données                    | ❌            | ✅                | Le controller **ne doit pas** connaître Doctrine                  |
| Calculs (prix TTC, points de fidélité...)     | ❌            | ✅                | Dès qu’il y a de la logique, direction service                    |
| Envoi d’e-mails ou de notifications           | ❌            | ✅                | Service de notification                                           |
| Gestion des erreurs métiers                   | ❌            | ✅                | Exemple : `throw new InsufficientBalanceException()`              |
| Formater la réponse HTTP                      | ✅            | ❌                | C’est le rôle du controller (sauf cas d’API avec normalizer/DTO)  |

### Règle d'or (facile à retenir)

**Le controller reçoit une requête, délègue à un service, et renvoie une réponse. Rien de plus.**

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

### Résumé des rôles

| Composant     | Rôle                                                                      |
| ------------- |---------------------------------------------------------------------------|
| Controller    | Récupère la requête, appelle un service, retourne la réponse              |
| Service       | Orchestration métier (validation, appels aux managers, envoi mail)                    |
| Manager       | Exécute les actions précises sur l'entité (création, hashing) |
| Repository    | Communication avec la BDD                                                 |