# Mailjet

Mailjet est une autre solution que Swifmailer pour envoyer des email avec Symfony.
Il permet a une équipe marketing qui ne connaissent rien au code de configurer et customiser un email, sans faire du code. 

- Site : [Mailjet](https://www.mailjet.com/fr)

- [Documentation Send API v3.1 Mailjet](https://dev.mailjet.com/email/guides/send-api-v31/)
- [Github Mailjet](https://github.com/mailjet/mailjet-apiv3-php)
- En mode connecter => [Code PHP : Envoyez votre premier email](https://app.mailjet.com/auth/get_started/developer)

## Installation
Nous recommandons d'installer la bibliothèque avec Composer. Exécutez la commande suivante :

```bash
composer require mailjet/mailjet-apiv3-php
```

## Demo
### Construire la class Mail.php

- Le code qui est à l'intérieur de la méthode send() à été pris directement dans le site de mailjet
- Voir dans le fichier [afficher_variable_env.md](https://github.com/jonas18121/help/blob/master/Symfony/doc/afficher_variable_env.md) pour savoir comment faire pour utiliser `getenv('MAILJET_PUBLIC_KEY')`
- `MAILJET_PUBLIC_KEY` est créer en le fichier .env
- On utilise le composant [Dotenv](https://symfony.com/doc/4.3/components/dotenv.html) pour obtenir la valeur de la variable `MAILJET_PUBLIC_KEY` avec `getenv()` 

```php
// src/class/Mail.php

namespace App\Classe;

use Mailjet\Resources;

class Mail
{
    public function send($to_email, $to_name, $subjet, $content)
    {
        $mj = new \Mailjet\Client(getenv('MAILJET_PUBLIC_KEY'), getenv('MAILJET_SECRET_KEY'),true,['version' => 'v3.1']);
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "jonathandevelopper971@gmail.com",
                        'Name' => "La Boutique française"
                    ],
                    'To' => [
                        [
                            'Email' => $to_email,
                            'Name' => $to_name
                        ]
                    ],
                    'TemplateID' => 4406445,
                    'TemplateLanguage' => true,
                    'Subject' => $subjet,
                    'Variables' => [
                        // c'est ici qu'on va envoyer le message personnaliser dans le template qui est dans mailjet
                        // Le non de la variable s'appel content aussi dans mailjet
                        // Dans mailjet {var:content:""}
                        'content' => $content 
                    ],
                ]
            ]
        ];

        $response = $mj->post(Resources::$Email, ['body' => $body]);
        $response->success()  /*&& dump($response->getData())*/;  
    }
}
```

### Exemple d'utilisation dans un controller

- On instancie la class `Mail.php` puis on utilise la méthode `send()` avec les argument qu'il a besoin

```php
// RegisterController.php

namespace App\Controller;

use App\Classe\Mail;
use App\Entity\User;
use App\Form\RegisterType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController extends AbstractController
{
    protected EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager) 
    {
        $this->entityManager = $entityManager;    
    }

    /**
     * @Route("/inscription", name="app_register")
     */
    public function index(Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = new User();
        $form = $this->createForm(RegisterType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();

            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $user->getPassword()
            );

            $user->setPassword($hashedPassword);

            $this->entityManager->persist($user);
            $this->entityManager->flush();


            $mail = new Mail();
            $content = 'Bonjour ' . $user->getFirstname() . '<br> Est ce que vous savez que ....';
            $mail->send($user->getEmail(), $user->getFirstname(), 'Bienvenue sur la Boutique Française', $content);
            $this->addFlash('success', 'Votre inscription s\'est correctement déroulée');
        }

        return $this->render('register/index.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
```
