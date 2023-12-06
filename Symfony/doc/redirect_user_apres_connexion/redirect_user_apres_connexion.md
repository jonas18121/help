# Redirection après login vers la page que l'user voulait aller sans être connecter

Exemple : 

Un utilisateur anonyme clique pour reserver un article,
il et rediriger vers la page login, donc il se connecte

Il faut rediriger l'utilisateur vers la première page ou il y a cliquer pour revserver son article

### 1) Stocker l'URL d'origine dans la session avant de le rediriger vers la page de connexion

Dans le contrôleur où l'utilisateur clique pour réserver l'article, vous pouvez stocker l'URL d'origine dans la session avant de le rediriger vers la page de connexion :

- `/booking/add/storageSpace/{id}`: est l'URL que l'user se rendre, mais il devra se connecter avant
- Utilisation de : `$request->getSession()->set('_security.main.target_path', $request->getUri());` pour tocker l'URL d'origine dans la session
    - Ex: `http://your_domain/booking/add/storageSpace/1`

```php
// BookingController.php

    class BookingController extends AbstractController
    {
        /**
         * @Route("/booking/add/storageSpace/{id}", name="booking_add", requirements={"id": "\d+"})
         */
        public function create_booking(
            int $id,
            StorageSpaceRepository $storageSpaceRepository,
            Request $request,
            BookingManager $bookingManager
        ): Response {
            /** @var User|null */
            $user = $this->getUser();

            if (!$user) {
                // Stocker l'URL d'origine dans la session
                $request->getSession()->set('_security.main.target_path', $request->getUri());
                
                // Redirection vers login
                return $this->redirectToRoute('app_login');
            }

            $booking = new Booking();

            $storageSpace = $storageSpaceRepository->find_one_storage($id);

            $formBooking = $this->createForm(BookingType::class, $booking);

            $formBooking->handleRequest($request);

            if ($formBooking->isSubmitted() && $formBooking->isValid()) {
                return $bookingManager->createdBooking($booking, $storageSpace, $user);
            }

            return $this->render('pages/booking/create_booking.html.twig', [
                'formBooking' => $formBooking->createView(),
                'storageSpace' => $storageSpace,
                'oneBookingTrue' => $bookingManager->verifBookingTrue($user),
            ]);
        }
    }
```

### 2) Configuration du pare-feu (main dans cet exemple) a la redirection par défaut vers la page de connexion

- Ajout du code ci-dessous dans security.yaml
```yaml
form_login:
    default_target_path: /
    always_use_default_target_path: true
    use_referer: true
```

```yaml
# security.yaml

security:
    encoders:
        App\Entity\User:
            algorithm: auto

    # https://symfony.com/doc/current/security.html#where-do-users-come-from-user-providers
    providers:
        # used to reload user from session & other features (e.g. switch_user)
        app_user_provider:
            entity:
                class: App\Entity\User
                property: email
    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            anonymous: lazy
            provider: app_user_provider
            guard:
                authenticators:
                    - App\Security\LoginFormAuthenticator
            logout:
                path: app_logout
                # where to redirect after logout
                # target: app_any_route

            # Redirection par défaut après connexion
            form_login:
                default_target_path: /
                always_use_default_target_path: true
                use_referer: true

            # activate different ways to authenticate
            # https://symfony.com/doc/current/security.html#firewalls-authentication

            # https://symfony.com/doc/current/security/impersonating_user.html
            # switch_user: true

    # Easy way to control access for large sections of your site
    # Note: Only the *first* access control that matches will be used
    access_control:
        - { path: ^/admin, roles: ROLE_ADMIN }
        # - { path: ^/profile, roles: ROLE_USER }
```

### 3) Vérifier dans LoginFormAuthenticator 

- Vérifier dans LoginFormAuthenticator que onAuthenticationSuccess contient du code de redirection pour la variable `$targetPath`

S'il y en a un cela devrait ressembler a ceci :

```php
# security/LoginFormAuthenticator.php

public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
{
    if ($targetPath = $this->getTargetPath($request->getSession(), $providerKey)) {
        return new RedirectResponse($targetPath);
    }

    return new RedirectResponse($this->urlGenerator->generate('storage_space_all'));
}
```

Sinon vous pouvez ajouter ceci : 

```php
# security/LoginFormAuthenticator.php

public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
{
    // Récupérer la session
    $session = $request->getSession();

    // Récupérer l'URL d'origine depuis la session
    $targetPath = $session->get('_security.' . $providerKey . '.target_path');

    if ($targetPath) {
        // Si une `target_path` est définie, rediriger l'utilisateur vers cette URL
        $session->remove('_security.' . $providerKey . '.target_path'); // Supprimer la `target_path` de la session
        return new RedirectResponse($targetPath);
    }

    // Si aucune `target_path` n'est définie, rediriger l'utilisateur vers une route par défaut
    return new RedirectResponse($this->urlGenerator->generate('storage_space_all'));
}
```

### 4) Recgupérer l'URL d'origine depuis la session dans le securityController (Facultative)

- Facultative car dès que l'on stock l'URL d'origine depuis la session dans `BookingController.php` `LoginFormAuthenticator.php` pourra l'obtenir via `$request->getSession()`

```php
# SecurityController.php

/**
 * @Route("/login", name="app_login")
 */
public function login(AuthenticationUtils $authenticationUtils): Response
{
    if ($this->getUser()) {
        return $this->redirectToRoute('storage_space_all');
    }

    // Récupérer l'URL d'origine depuis la session
    $targetPath = $this->getTargetPath($authenticationUtils);

    return $this->render('pages/security/login.html.twig', [
        'last_username' => $authenticationUtils->getLastUsername(), // last username entered by the user
        'error' => $authenticationUtils->getLastAuthenticationError(), // get the login error if there is one
        'target_path' => $targetPath // Récupérer l'URL d'origine depuis la session
    ]);
}

private function getTargetPath(AuthenticationUtils $authenticationUtils)
{
    // Récupérer l'URL d'origine depuis la session
    $targetPath = $this->get('session')->get('_security.main.target_path');

    return $targetPath;
}
```

### 5) Mettre l'input dans le formulaire twig (Facultative)

- Facultative car dès que l'on stock l'URL d'origine depuis la session dans `BookingController.php` `LoginFormAuthenticator.php` pourra l'obtenir via `$request->getSession()`

- recupération de `target_path` qui viens de SecurityController.php
- Utilisation du code ci-dessous pour envoyer l'url protéger

```twig
<input type="hidden" name="_target_path" value="{{ target_path }}" />
```

```twig
{% extends 'base.html.twig' %}

{% block title %}Log in!{% endblock %}

{% block stylesheets %}
    {{ parent() }}
    {{ encore_entry_link_tags('component/input_and_floating_label') }}
{% endblock %}

{% block body %}

<div class="container">

    <h1 class="">Se Connecter</h1>

    <div class="container_form">

        {% if error %}
            <div class='error_form_login'>
                Email ou mot de passe incorrect(s)
            </div>
        {% endif %}

        <form method="post">

            {% if app.user %}
                {# <div class="mb-3">
                    You are logged in as {{ app.user.username }}, <a href="{{ path('app_logout') }}">Logout</a>
                </div> #}
            {% endif %}

            <div class="form-container">
                <input type="email" value="{{ last_username }}" placeholder="Email" name="email" id="inputEmail" class="form-input" required autofocus>
                <label for="inputEmail" class="form-label">Email</label>
            </div>

            <div class="form-container">
                <input type="password" placeholder="Mot de passe" name="password" id="inputPassword" class="form-input" required>
                <label for="inputPassword" class="form-label">Mot de passe</label>
            </div>

            <input type="hidden" name="_csrf_token"value="{{ csrf_token('authenticate') }}">

            {#  
                La variable {{ target_path }} affiche l'URL d'origine à l'utilisateur

                Cette variable sera automatiquement ajoutée à la requête par Symfony 
                lorsqu'un utilisateur anonyme essaie d'accéder à une page protégée sans être connecté.
            #}
            <input type="hidden" name="_target_path" value="{{ target_path }}" />

            {#
                Uncomment this section and add a remember_me option below your firewall to activate remember me functionality.
                See https://symfony.com/doc/current/security/remember_me.html

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" name="_remember_me"> Remember me
                    </label>
                </div>
            #}

            <button class="btn" type="submit">Se connecter</button>
        </form>
    </div>
</div>
{% endblock %}
```