# Gérer les logs d'erreurs de manière globale 

- [Symfony : Configuration des logs Monolog de remipoignon.fr](https://www.remipoignon.fr/symfony-configuration-des-logs-monolog/)
- [Logging](https://symfony.com/doc/7.0/logging.html)
- [Comment configurer Monolog pour envoyer des e-mails en cas d'erreur](https://symfony.com/doc/7.0/logging/monolog_email.html)
- [Envoi d'e-mails avec Mailer](https://symfony.com/doc/current/mailer.html)
- [Github Mailjet](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Component/Mailer/Bridge/Mailjet/README.md)
- [Github Symfony Component Mailjet Bridge](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Component/Mailer/Bridge/Mailjet/README.md)
- [monolog-bundle](https://github.com/symfony/monolog-bundle)
- [Throwable](https://www.php.net/manual/en/class.throwable.php)
- [Log/Logger.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Log/Logger.php)
- [ExceptionEvent](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Event/ExceptionEvent.php)
- [Maîtriser les événements du noyau de Symfony : auditeurs vs abonnés de Medium.com](https://medium.com/@dams_crr/mastering-symfonys-kernel-events-listeners-vs-subscribers-54be05bbe8fa)
- [Liste des codes HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP)
- [Symfony/Component/HttpKernel/Exception/HttpException.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Exception/HttpException.php)
- [Symfony/Component/HttpKernel/Exception/HttpExceptionInterface.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Exception/HttpExceptionInterface.php)

### Installer Monolog

Voir [monolog-bundle](https://github.com/symfony/monolog-bundle)

```bash
composer require symfony/monolog-bundle
```

## Quelques infomations à connaitre

### Niveaux de logs

Comme beaucoup de systèmes de log, Monolog utilise plusieurs niveaux. Par ordre croissant, du moins alertant au plus critique des logs :

- **DEBUG :** Utilisé en général pour développer ou débugger une application afin de vérifier une valeur ou un bon déroulement.
- **INFO :** Information sur un événement commun et normal (exemple : un utilisateur qui se connecte).
- **NOTICE :** Comportement normal signifiant mais pas d’erreur.
- **WARNING :** Événement exceptionnel mais sans erreur (exemple : Utilisation d’une fonction dépréciée).
- **ERROR :** Erreur d’exécution qui ne demande pas d’intervention immédiate mais qui doit être enregistrée. (exemple : une erreur 404, un objet non trouvé en base avec tel identifiant …).
- **CRITICAL :** Exception inattendue soulevée pendant l’exécution de l’application. Cette action est généralement accompagnée d’alerte mail. (exemple : un paramètre manquant dans la configuration d’un module).
- **ALERT :** « Alerte rouge », tout le service ou sa base de données est indisponible. Cette action est généralement accompagnée d’alerte sms et / ou d’alerte monitoring sonore. (exemple : le site est inaccessible par votre outil de monitoring).
- **EMERGENCY :** Le système est inutilisable, tout est complètement cassé et nécessite une grosse intervention pour tout remettre d’aplomb. Des données sont perdues / corrompues. Bref … Je vous laisse imaginer la catastrophe que ça peut être. Je vous souhaite de ne jamais voir apparaître ce genre de log ! (exemple : détection d’un hacking bien hard de votre site).

### Différents types de handles

Il existe plusieurs types de handler avec chacun une fonctionnalité précise :

- **finders_crossed :** Ce handler stocke dans un buffer tout les logs qui passe. Lorsqu’un des logs dépasse le niveau minimum requis, il appelle un autre handler avec tous les logs contenus dans son buffer.
- **stream :** Ce handler écrit le log qu’il reçoit dans un fichier si son niveau dépasse le niveau minimum requis.
- **rotating_file :** Ce handler fait la même chose que stream mais fait une rotation des fichiers pour effacer les logs anciens.
- **group :** Ce handler envoit le log reçu à plusieurs handles (exemple : pour écrire le log ET l’envoyer par mail)
- **buffer :** Ce handler stocke dans un buffer tout les logs qu’il reçoit puis envoit le buffer à un handler à la fin de l’exécution de la requête.
- **swit_mailler :** Ce handle envoit par mail les logs (souvent passé par un handler de type buffer)
- **console :** Ce handler permet de définir les niveaux d’affichage de log dans la console.

## En pratique sans envoie de mail

### 1 Configurer le fichier config/packages/monolog.yaml

- On rajoute le canal **exception** dans `monolog.channels`
- On rajoute le handler **exceptions** avec sa configuration :
    - **type** rotation de fichier sous 30 jours grace à **max_files** qui conserve Jusqu'à 30 fichiers, 1 fichier par jour
    - **path** chemin qui indique ou stocker les fichiers, ici ce sera dans `projet/var/log/exception`, le nom du fichier sera exceptions + la date à cause du **type** rotation de fichier. Exemple :`exceptions-2025-12-25.log`
    - **level**, est le niveau minimum à intercepter, ici c'est **ERROR**. Il prendra aussi **CRITICAL**, **ALERT** et **EMERGENCY**
    - **channels** est le canal dans lequel sera difuser ces erreurs

- Ne pas oublier de mettre le handler dans les autres environnement, exemple **when@prod**

```yaml
monolog:
    channels:
        - deprecation # Deprecations are logged in the dedicated "deprecation" channel when it exists
        - exception # Intercepte toute les log de type error dans le canal exception 

when@dev:
    monolog:
        handlers:
            main:
                type: stream
                path: "%kernel.logs_dir%/%kernel.environment%.log"
                level: debug
                channels: ["!event"]
            console:
                type: console
                process_psr_3_messages: false
                channels: ["!event", "!doctrine", "!console"]

            # Intercepte toute les log de type error dans le canal exception    
            exceptions:
                type: rotating_file 
                max_files: 30 # Conserve Jusqu'à 30 fichiers = 30 jours
                path: "%kernel.logs_dir%/exception/exceptions.log"
                level: error
                channels: ["exception"]
```

### 2. Configurer le fichier config/service.yaml

- On crée un injecte le canal `exception` dans **ExceptionSubscriber**

```yaml
services:
    # default configuration for services in *this* file
    _defaults:
        autowire: true      # Automatically injects dependencies in your services.
        autoconfigure: true # Automatically registers your services as commands, event subscribers, etc.

    # makes classes in src/ available to be used as services
    # this creates a service per class whose id is the fully-qualified class name
    App\:
        resource: '../src/'
        exclude:
            - '../src/DependencyInjection/'
            - '../src/Entity/'
            - '../src/Kernel.php'

    # add more service definitions when explicit configuration is needed
    # please note that last definitions always *replace* previous ones

    App\EventSubscriber\ExceptionSubscriber:
        arguments:
            $logger: '@monolog.logger.exception'
```

### 3.a Première version ligth de ExceptionSubscriber

- Ici, on récupère toutes les erreurs des types **ERROR**, **CRITICAL**, **ALERT** et **EMERGENCY** et on les renvoie dans un type **ERROR** dans le fichier `projet/var/log/exception/exceptions-date.log`

- Voir [Liste des codes HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP)

- Ici, toute les erreurs **4xx Erreur du client HTTP** seront retourner avec un code status exacte mais les erreurs **5xx Erreur du serveur / du serveur d'application** seront par défaut **500** uniquement

```php
namespace App\EventSubscriber;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ExceptionSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private LoggerInterface $logger // Syntaxe à partir de PHP8
    ){
    }

    public static function getSubscribedEvents(): array
    {
        return [
            // 'kernel.exception' => 'onKernelException',
            ExceptionEvent::class => 'onKernelException',
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exceptionLogger = $event->getThrowable();
        $statusCode = 500; // par défaut

        // Si c’est une exception HTTP, on récupère le vrai code (404, 403, 401, etc.)
        if ($exceptionLogger instanceof HttpExceptionInterface) {
            $statusCode = $exceptionLogger->getStatusCode();
        }

        $this->logger->error('Exception interceptée', [
            'status_code' => $statusCode,
            'message' => $exceptionLogger->getMessage(),
            'file' => $exceptionLogger->getFile(),
            'line' => $exceptionLogger->getLine(),
            // Attention trace = beaucoup de texte, utile pour debug
            // 'trace' => $exceptionLogger->getTraceAsString(),
        ]);
    }
}
```

### 3.b Première version plus complexe de ExceptionSubscriber avec gestion des types d'erreurs

- La méthode `managerException` gère le type d'erreur qui doit être utiliser par **$this->logger**

```php
namespace App\EventSubscriber;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ExceptionSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private LoggerInterface $logger
    ){
    }

    public static function getSubscribedEvents(): array
    {
        return [
            // 'kernel.exception' => 'onKernelException',
            ExceptionEvent::class => 'onKernelException',
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exceptionLogger = $event->getThrowable();

        $statusCode = 500; // par défaut
        // Si c’est une exception HTTP, on récupère le vrai code (404, 403, 401, etc.)
        if ($exceptionLogger instanceof HttpExceptionInterface) {
            $statusCode = $exceptionLogger->getStatusCode();
        }

        // Gère le type d'erreur qui doit être utiliser par $this->logger
        $level = $this->managerException($exceptionLogger, $statusCode);

        // LOG avec le niveau d'erreur déterminé
        $this->logger->$level('Exception interceptée', [
            'status_code' => $statusCode,
            'message' => $exceptionLogger->getMessage(),
            'file' => $exceptionLogger->getFile(),
            'line' => $exceptionLogger->getLine(),
            // Attention trace = beaucoup de texte, utile pour debug
            // 'trace' => $exceptionLogger->getTraceAsString(),
        ]);
    }

    /**
     * Gère le type d'erreur qui doit être utiliser par $this->logger
     * Exemple : 
     *     - $this->logger->error()
     *     - $this->logger->critical()
     *     - $this->logger->alert()
     *     - $this->logger->emergency()
     */
    private function managerException(\Throwable $exception, int $statusCode): string
    {
        $message = strtolower($exception->getMessage());

        // ============================
        // 1. EMERGENCY (Crash fatal)
        // ============================
        // Crash PHP fatals / erreurs irréversibles
        if (
            $exception instanceof \Error ||
            $exception instanceof \TypeError ||
            $exception instanceof \ParseError ||
            $exception instanceof \ErrorException
        ) {
            return 'emergency';
        }

        // ============================
        // 2. ALERT (BD, sécurité, API)
        // ============================
        if (
            $exception instanceof \PDOException ||
            str_contains($message, 'sql') ||
            str_contains($message, 'database') ||
            str_contains($message, 'token') ||
            str_contains($message, 'jwt') ||
            str_contains($message, 'auth') ||
            str_contains($message, 'api') ||
            str_contains($message, 'timeout') ||
            str_contains($message, 'unavailable')
        ) {
            return 'alert';
        }

        // ============================
        // 3. CRITICAL (Erreurs serveur 500+)
        // ============================
        if ($statusCode >= 500) {
            return 'critical';
        }

        // ============================
        // 4. ERROR (Par défault)
        // ============================
        // Erreurs fonctionnelles ou utilisateur
        return 'error';
    }
}
```