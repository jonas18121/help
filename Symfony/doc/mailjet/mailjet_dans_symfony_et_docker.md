# Mailjet dans un projet symfony et qui tourne sous docker

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
### Configuration de fichier docker-compose.yml

```yaml
# docker-compose.yml

version: "3.8"

services:

    # MYSQL
    db:
        image: mysql
        container_name: container_name_mysql
        restart: always
        volumes:
            - db-data:/var/lib/mysql
        environment:
            MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
        networks:
            - dev

    # PHPMyAdmin
    phpmyadmin:
        image: phpmyadmin
        container_name: container_name_phpmyadmin
        restart: always
        depends_on:
            - db
        ports:
            - 8080:80
        environment:
            PMA_HOST: db
        networks:
            - dev

    # APPLICATION (PHP : Symfony App)
    www_app:
        build: php
        container_name: container_name_www
        ports:
            - "8888:80"
        volumes:
            - ./php/vhosts:/etc/apache2/sites-enabled
            - ./:/var/www
        user: '1000:1000' 
        restart: always
        networks:
            - dev
        environment:
            MAILER_DSN: smtp://maildev:1025

    # NODE
    node_app:
        container_name: container_name_node
        build:
            context: .
            dockerfile: node/Dockerfile
        volumes:
            - './app:/var/www/app'
        user: '1000:1000' 
        restart: always
        networks:
            - dev

    # maildev
    maildev:
        container_name: container_name_maildev
        image: maildev/maildev
        restart: always
        environment:
            - TZ=Asia/Shanghai
            - MAILDEV_WEB_PORT=1080
            - MAILDEV_SMTP_PORT=1025
        ports:
            - "8081:1080"
            - "8025:1025"
        logging:
            driver: "json-file"
            options:
                max-size: "1m"
        networks:
            - dev

networks:
    dev:
volumes:
    db-data:
```


### Configuration du dns dans le fichier .env du projet Symfony

```bash
# ... variables

###> symfony/mailer ###
MAILER_DSN=smtp://maildev:1025
###< symfony/mailer ###
```

### Configuration du fichier config/packages/mailer.yaml du projet Symfony, si pas de dns

```yaml
framework:
    mailer:
        dsn: '%env(MAILER_DSN)%'
```

### Construction de la classe ContactDTO (Symfony 7)

```php
# src/DTO/ContactDTO

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class ContactDTO
{
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 254)]
    public string $name;

    #[Assert\NotBlank]
    #[Assert\Email]
    public string $email;

    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 2500)]
    public string $message; 

    #[Assert\NotBlank]
    public string $service = ''; 
}
```

### Construction du fichier ContactType.php

```php
# ContactType.php

namespace App\Form;

use App\DTO\ContactDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'empty_data' => 'Non Rempli'
            ])
            ->add('email', EmailType::class, [
                'empty_data' => 'Non Rempli'
            ])
            ->add('message', TextareaType::class, [
                'empty_data' => 'Non Rempli'
            ])
            ->add('service', ChoiceType::class, [
                'choices'  => [
                    'Compta' => 'compta@demo.fr',
                    'Support' => 'support@demo.fr',
                    'Marketing' => 'marketing@demo.fr',
                ]
            ])
            ->add('Enregistrer', SubmitType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ContactDTO::class,
        ]);
    }
}
```

### Construction du fichier contact/contact.html.twig

```twig
{# contact/contact.html.twig #}

{% extends 'base.html.twig' %}

{% block title %}Hello ContactController!{% endblock %}

{% block body %}
    <h1>Nous Contacter</h1>

    {{ form_start(form) }}
        <div class="row">
            <div class="col_sm">{{ form_row(form.name) }}</div>
            <div class="col_sm">{{ form_row(form.email) }}</div>
            <div class="col_sm">{{ form_row(form.service) }}</div>
            <div class="col_sm">{{ form_row(form.message) }}</div>
        </div>
    {{ form_end(form) }}
{% endblock %}
```

### Construction du fichier emails/contact.html.twig

```twig
{# emails/contact.html.twig #}


<p>Une nouvelle demande de contact a été reçue</p>

<ul>
    <li>Nom : {{ data.name }}</li>
    <li>Email : {{ data.email }}</li>
    <li>Service : {{ data.service }}</li>
</ul>

<p>
    <strong>Message</strong>:<br>
    {{ data.message | nl2br }}
</p>
```

### Exemple d'utilisation dans un controller

```php
// ContactController.php

namespace App\Controller;

use App\DTO\ContactDTO;
use App\Form\ContactType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Mime\Email;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function contact(
        Request $request,
        MailerInterface $mailer
    ): Response
    {
        $data = new ContactDTO();

        $form = $this->createForm(ContactType::class, $data);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {

            $email = (new TemplatedEmail())
                ->from($data->email)
                ->to($data->service)
                //->cc('cc@example.com')
                //->bcc('bcc@example.com')
                //->replyTo('fabien@example.com')
                //->priority(Email::PRIORITY_HIGH)
                ->subject('Demande de contact')
                //->text('Sending emails is fun again!')
                //->html('<p>See Twig integration for better HTML integration!</p>')
                ->htmlTemplate('emails/contact.html.twig')
                ->context(['data' => $data]);

            $mailer->send($email);

            // $entityManager->flush();

            $this->addFlash('success', 'Le mail a bien été envoyé');
            return $this->redirectToRoute('app_contact');
        }


        return $this->render('contact/contact.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
```