# Gérer les logs d'erreurs de manière globale avec envoie de mail. Symfony 7 PHP 8+

- [Symfony : Configuration des logs Monolog de remipoignon.fr](https://www.remipoignon.fr/symfony-configuration-des-logs-monolog/)
- [Logging](https://symfony.com/doc/7.0/logging.html)
- [Comment configurer Monolog pour envoyer des e-mails en cas d'erreur](https://symfony.com/doc/7.0/logging/monolog_email.html)
- [Envoi d'e-mails avec Mailer](https://symfony.com/doc/current/mailer.html)
- [Github Symfony Component Mailjet Bridge](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Component/Mailer/Bridge/Mailjet/README.md)
- [Github Mailjet Bridge](https://github.com/maildev/maildev)
- [Github mailjet-apiv3-php](https://github.com/mailjet/mailjet-apiv3-php)
- [monolog-bundle](https://github.com/symfony/monolog-bundle)
- [Throwable](https://www.php.net/manual/en/class.throwable.php)
- [Log/Logger.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Log/Logger.php)
- [ExceptionEvent](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Event/ExceptionEvent.php)
- [Maîtriser les événements du noyau de Symfony : auditeurs vs abonnés de Medium.com](https://medium.com/@dams_crr/mastering-symfonys-kernel-events-listeners-vs-subscribers-54be05bbe8fa)
- [Liste des codes HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP)
- [Symfony/Component/HttpKernel/Exception/HttpException.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Exception/HttpException.php)
- [Symfony/Component/HttpKernel/Exception/HttpExceptionInterface.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Exception/HttpExceptionInterface.php)
- [Composant Symfony Lock](https://symfony.com/doc/current/components/lock.html)
- [Symfony Cache Pools and Supported Adapters](https://symfony.com/doc/current/components/cache/cache_pools.html)
- [Symfony Cache](https://symfony.com/doc/current/cache.html)

## Installation

### Installer Monolog

Voir [monolog-bundle](https://github.com/symfony/monolog-bundle)

```bash
composer require symfony/monolog-bundle
```

### Installer Mailer

Voir [Envoi d'e-mails avec Mailer](https://symfony.com/doc/current/mailer.html)

```bash
composer require symfony/mailer
```

### Installer Mailjet ou un autre transporteur tiers pour l'envoie de mail

Voir [Github mailjet-apiv3-php](https://github.com/mailjet/mailjet-apiv3-php)

```bash
composer require mailjet/mailjet-apiv3-php
```

### Installer Lock

Voir [Composant Symfony Lock](https://symfony.com/doc/current/components/lock.html)

```bash
composer require symfony/lock
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

## En pratique avec envoie de mail

### 1. Configurer le fichier config/packages/monolog.yaml

- On rajoute plusieurs canal **exception.error**, **exception.critical**, **exception.alert** et **exception.emergency** dans `monolog.channels`
- On rajoute les handlers **error_logs**, **critical_logs**, **alert_logs** et **emergency_logs**  avec leurs configuration :
    - **type** rotation de fichier sous 30 jours grace à **max_files** qui conserve Jusqu'à 30 fichiers, 1 fichier par jour
    - **path** chemin qui indique ou stocker les fichiers, ici ce sera dans 
    `projet/var/log/exception/error/error.log` ou `projet/var/log/exception/critical/critical.log` ou `projet/var/log/exception/alert/alert.log` ou `projet/var/log/exception/emergency/emergency.log` le nom du fichier sera le nom + la date à cause du **type** rotation de fichier. Exemple :`exceptions-2025-12-25.log`
    - **level**, est le niveau intercepter sera **ERROR**, **CRITICAL**, **ALERT** et **EMERGENCY**. un seul par canal
    - **channels** est le canal dans lequel sera difuser ces erreurs
    - **bubble: false** empêcher un handler de niveau inférieur d’attraper un message de niveau supérieur.

- Ne pas oublier de mettre le handler dans les autres environnement, exemple **when@prod**

```yaml
monolog:
    channels:
        - deprecation # Deprecations are logged in the dedicated "deprecation" channel when it exists
        - exception.error # sous-canaux (ex: exception.error, exception.critical, etc.) pour un tri propre
        - exception.critical # sous-canaux (ex: exception.error, exception.critical, etc.) pour un tri propre
        - exception.alert # sous-canaux (ex: exception.error, exception.critical, etc.) pour un tri propre
        - exception.emergency # sous-canaux (ex: exception.error, exception.critical, etc.) pour un tri propre

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
            
            # Intercepte les erreurs de type ERROR : erreurs "normales" (404, 403, 400...)
            error_logs:
                type: rotating_file
                path: "%kernel.logs_dir%/exception/error/error.log"
                level: error
                max_files: 30
                channels: ["exception.error"] # créer des sous-canaux (ex: exception.error, exception.critical, etc.) pour un tri propre
                bubble: false # empêcher un handler de niveau inférieur d’attraper un message de niveau supérieur.

            # Intercepte les erreurs de type CRITICAL : erreurs serveur 500+ (500, 502, 503...)
            critical_logs:
                type: rotating_file
                path: "%kernel.logs_dir%/exception/critical/critical.log"
                level: critical
                max_files: 30
                channels: ["exception.critical"]
                bubble: false # empêcher un handler de niveau inférieur d’attraper un message de niveau supérieur.

            # Intercepte les erreurs de type ALERT : erreurs importantes (BDD, sécurité, API)
            alert_logs:
                type: rotating_file
                path: "%kernel.logs_dir%/exception/alert/alert.log"
                level: alert
                max_files: 30
                channels: ["exception.alert"]
                bubble: false # empêcher un handler de niveau inférieur d’attraper un message de niveau supérieur.

            # Intercepte les erreurs de type EMERGENCY : crashs fatals (TypeError, ParseError, Error)
            emergency_logs:
                type: rotating_file
                path: "%kernel.logs_dir%/exception/emergency/emergency.log"
                level: emergency
                max_files: 30
                channels: ["exception.emergency"]  
                bubble: false # empêcher un handler de niveau inférieur d’attraper un message de niveau supérieur.

```

### 2. Configurer le fichier config/service.yaml

- On injecte les 4 canaux dans **ExceptionSubscriber** ainsi que mailer, cache, lock et l'environnement

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
            $errorLogger: '@monolog.logger.exception.error'
            $criticalLogger: '@monolog.logger.exception.critical'
            $alertLogger: '@monolog.logger.exception.alert'
            $emergencyLogger: '@monolog.logger.exception.emergency'
            $mailer: '@mailer'
            $dedupeCache: '@cache.app'
            $lockFactory: '@lock.factory' 
            $environment: '%kernel.environment%'
            
        tags:
        - { name: kernel.event_subscriber }
```

### 3. Version complexe de ExceptionSubscriber avec gestion des types d'erreurs et envoie de mail

- La méthode `managerException` gère le type d'erreur qui doit être utiliser par **$logger** et le type de logger à utiliser
- Dans la méthode `managerException` on envoie un mail pour l'erreur qui à été trouver avec `sendEmail`
- La méthode `managerDuplicate` gère les doublons des erreurs
- La méthode `managerStatusCode` gère le code status HTTP

```php
declare(strict_types=1);

namespace App\EventSubscriber;

use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Lock\LockFactory;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Component\Cache\CacheItem;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use App\Service\MailerService;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Doctrine\DBAL\Exception as QueryException;
use Symfony\Component\HttpFoundation\Request;

class ExceptionSubscriber implements EventSubscriberInterface
{
    # Définit le nombre de minutes souhaiter pour attendre avant d'envoyer un mail et un log pour une même erreur
    private const COOL_DOWN_IN_MINUTES = 120;

    # Calcule pour que COOL_DOWN_IN_MINUTES soit vraiment traduit en minitues
    private const COOL_DOWN = self::COOL_DOWN_IN_MINUTES * 60;

    private MailerService $mailer;

    private CacheItemPoolInterface $dedupeCache;

    private LockFactory $lockFactory;

    private string $environment;

    public function __construct(
        MailerService  $mailer,
        string $environment,
        CacheItemPoolInterface $dedupeCache,
        LockFactory $lockFactory
    ){
        $this->mailer = $mailer;
        $this->environment = $environment;
        $this->dedupeCache = $dedupeCache;
        $this->lockFactory = $lockFactory;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            // 'kernel.exception' => 'onKernelException',
            // ExceptionEvent::class => 'onKernelException',
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function onKernelException(ExceptionEvent $event): void
    {
        /** @var \Throwable $exceptionLogger */
        $exceptionLogger = $event->getThrowable();

        /** @var Request $request */
        $request = $event->getRequest();

        // ============================
        // === GERE LES STATUS DE CODES
        // ============================

        /** @var int $statusCode */
        $statusCode = $this->managerStatusCode($exceptionLogger);

        // ============================
        // === GERE LES DEDUPLICATIONS
        // ============================

        # Retourne true si la clé existe déjà (doublon).
        if ($this->managerDuplicate($exceptionLogger)) {
            return; # pas d’e-mail, pas de double log
        }

        // ============================
        // === GERE LES EXCEPTIONS
        // ============================

        # Gestion de l’exception (type, logger, message)
        $this->managerException($exceptionLogger, $statusCode, $request);
    }

    /**
     * Gère le code status HTTP
     */
    private function managerStatusCode(\Throwable $exceptionLogger): int
    {
        /** @var int $statusCode */
        $statusCode = 500; # par défaut

        # Si c’est une exception HTTP, on récupère le vrai code (404, 403, 401, etc.)
        if ($exceptionLogger instanceof HttpExceptionInterface) {
            /** @var int $statusCode */
            $statusCode = $exceptionLogger->getStatusCode();
        }

        return $statusCode;
    }

    /**
     * Gère l'autorisation d'envoyer des mails pour d'autres environnement que la prod
     * 
     * Utiliser true pour envoyer des mails dans d'autres environnement que la prod
     * true est a utiliser temporairement
     */
    private function managerAllowsEnv(): bool
    {
        /** @var bool $allowsAllEnv */
        $allowsAllEnv = false;

        # Depuis un fichier .env ou .env.local vérichier si FORCE_ERROR_MAIL est en true en minuscule
        if(isset($_ENV['FORCE_ERROR_MAIL']) && !empty($_ENV['FORCE_ERROR_MAIL'])){
            if(ctype_lower($_ENV['FORCE_ERROR_MAIL']) && true === (bool) $_ENV['FORCE_ERROR_MAIL']){
                /** @var bool $allowsAllEnv */
                $allowsAllEnv = true;
            }
        }

        return $allowsAllEnv;
    }

    /**
     * Détermine le type d’exception et le logger associé.
     */
    private function managerException(\Throwable $exception, int $statusCode, ?Request $request): void
    {
        /** @var string $message */
        $message = strtolower($exception->getMessage());

        if (
            $exception instanceof \Error ||
            $exception instanceof \TypeError ||
            $exception instanceof \ParseError ||
            $exception instanceof \ErrorException
        ) {
            $this->sendEmail('EMERGENCY', $exception, $statusCode, $request);
            return;
        }

        if (
            $exception instanceof \PDOException ||
            $exception instanceof QueryException ||
            strpos($message, 'sql') !== false ||
            strpos($message, 'database') !== false ||
            strpos($message, 'token') !== false ||
            strpos($message, 'jwt') !== false ||
            strpos($message, 'auth') !== false ||
            strpos($message, 'api') !== false ||
            strpos($message, 'timeout') !== false ||
            strpos($message, 'unavailable') !== false
        ) {
            $this->sendEmail('ALERT', $exception, $statusCode, $request);
            return;
        }

        if ($statusCode >= 500) {
            $this->sendEmail('CRITICAL', $exception, $statusCode, $request);
            return;
        }

        $this->sendEmail('ERROR', $exception, $statusCode, $request);
    }

    /**
     * Gère les doublons des erreurs
     */
    private function managerDuplicate(\Throwable $exceptionLogger): bool
    {
        $idDeduplicate = hash(
            'sha256',
            $exceptionLogger::class
            . '|' . $exceptionLogger->getMessage()
            . '|' . $exceptionLogger->getFile()
            . '|' . $exceptionLogger->getLine()
        );

        if ($this->isDuplicate($idDeduplicate)) {
            return true;
        }

        $this->registerError($idDeduplicate);

        return false;
    }

    /**
     * Envoie un email
     */
    private function sendEmail(
        string $type, 
        \Throwable $exception, 
        int $statusCode, 
        ?Request $request
    ): void
    {
        /** @var bool $allowsAllEnv */
        $allowsAllEnv = $this->managerAllowsEnv();

        if ('prod' !== $this->environment && true !== $allowsAllEnv) {
            return;
        }

        $url = null !== $request
            ? $request->getSchemeAndHttpHost() . $request->getPathInfo()
            : 'N/A'
        ;

        $email = (new Email())
            ->from('ne-pas-repondre@gmail.fr')
            ->to('my@gmail.fr')
            ->subject("[{$type}] Nouvelle erreur détectée ({$statusCode})  - Application popo- {$this->environment}")
            ->html("
                <h2>Erreur détectée de type : {$type}</h2>
                <p><strong>Application :</strong> popo</p>
                <p><strong>Environnement :</strong> {$this->environment}</p>
                <p><strong>Status code :</strong> {$statusCode}</p>
                <p><strong>Url (sans info après '?') :</strong> {$url}</p>
                <p><strong>Message :</strong> {$exception->getMessage()}</p>
                <p><strong>Fichier :</strong> {$exception->getFile()}</p>
                <p><strong>Ligne :</strong> {$exception->getLine()}</p>
                <pre><strong>Trace :</strong><br>{$exception->getTraceAsString()}</pre>
            ")
        ;

        try {
            $this->mailer->getMailer()->send($email);
        } catch (\Throwable $e) {
            // silence
        }
    }

    private function isDuplicate(string $id): bool
    {
        $key = 'cool_down_' . $id;
        $lock = $this->lockFactory->createLock($key, ttl: 5);

        if (!$lock->acquire()) {
            return true;
        }

        try {
            $item = $this->dedupeCache->getItem($key);
            return $item->isHit();
        } finally {
            $lock->release();
        }
    }

    private function registerError(string $id): void
    {
        $key = 'cool_down_' . $id;
        $lock = $this->lockFactory->createLock($key, ttl: 5);
        $lock->acquire(true);

        try {
            $item = $this->dedupeCache->getItem($key);
            $item->set(true);
            $item->expiresAfter(self::COOL_DOWN);
            $this->dedupeCache->save($item);
        } finally {
            $lock->release();
        }
    }
}
```

### 4. Les différentes autres configuration à faire/vérifier

#### Dans .env

- `LOCK_DSN=flock` pour le composant Symfony Lock
- `MAILER_DSN` pour cette variable, on utilise le transporteur tiers **Mailjet**

```bash
###> symfony/mailer ###
# MAILER_DSN=null://null
MAILER_DSN=smtp://maildev:1025
###< symfony/mailer ###
###> symfony/lock ###
# Choose one of the stores below
# postgresql+advisory://db_user:db_password@localhost/db_name
LOCK_DSN=flock
###< symfony/lock ###
```

#### Dans .env.local

- Si, on veut tester les envoies de mail en env de dev, on peut utiliser `FORCE_ERROR_MAIL` sur `true`, sinon ne rien mettre

```bash
FORCE_ERROR_MAIL=true
```

#### Dans config/packages/mailer.yaml 

```yaml
framework:
    mailer:
        dsn: '%env(MAILER_DSN)%'
```

#### Dans config/packages/lock.yaml

```yaml
framework:
    lock: '%env(LOCK_DSN)%'
```

### 5. Tester les erreurs

#### Error Critical : Provoquer un crash volontaire dans un contrôleur ou repository

Dans n’importe quel contrôleur :

```php
throw new \RuntimeException("Test erreur CRITICAL : crash volontaire !");

# ou

// HttpExceptions explicites
throw new \Symfony\Component\HttpKernel\Exception\HttpException(500, "Test erreur CRITICAL : erreur 500 !");
# ou
throw new \Symfony\Component\HttpKernel\Exception\HttpException(502, "Test erreur CRITICAL : Bad Gateway !");
# ou
throw new \Symfony\Component\HttpKernel\Exception\HttpException(503, "Test erreur CRITICAL : Service Unavailable !");
```

ou dans un repository :

- Transformer une variable en chaine de caractère pour causer une **Syntax Error**
    - $name transformer en '$name'

```php
public function findPaginationList(int $page, string $name, int $limit): ?SlidingPagination
    {
        /** @var array */
        $data = $this->createQueryBuilder($name)
            ->select('$name')
            ->getQuery()
            ->getResult();

        /** @var SlidingPagination */
        $pagination = $this->paginationInterface->paginate($data, $page, $limit);

        if ($pagination instanceof SlidingPagination) {
            return $pagination;
        }

        return null;
    }
```

Résultat attendu

- erreur 500
- fichier exception/critical/critical.log doit recevoir une entrée
- Le subscriber doit capturer l’erreur et loguer via $criticalLogger->critical()

#### Error emergency : Provoquer un crash volontaire dans un contrôleur

Dans n’importe quel contrôleur :

- Mettre en commentaire tout le contenu du contrôleur

ou

- Ajouter le code ci-dessous dans le contrôleur

```php
$foo = null;
$foo->bar();

# ou

throw new \Error("Test erreur EMERGENCY : crash fatal !");
# ou
throw new \ErrorException("Test erreur EMERGENCY : ErrorException !");
```

Résultat attendu

- Génère une erreur 500
- Doit aller dans critical.log (ou emergency selon la logique)
- Le subscriber doit capturer l’erreur et loguer via $criticalLogger->critical() ou $emergencyLogger->emergency()

#### Error alert : Provoquer un crash volontaire dans un repository

Dans n’importe quel repository de la page qu'on test :

- Modifier le premier argument de setParameter, exmple ajouter un s a gameName

```php
    public function findPaginationList(int $page, string $name, int $limit, $gameName = null): ?SlidingPagination
    {
        /** @var array */
        $data = $this->createQueryBuilder($name)
            ->select($name)
            ->orderBy($name . '.id', 'DESC')
            ->andWhere($name . '.gameName = :gameName')
            ->setParameter('gameNames', $gameName)
            ->getQuery()
            ->getResult();

        /** @var SlidingPagination */
        $pagination = $this->paginationInterface->paginate($data, $page, $limit);

        if ($pagination instanceof SlidingPagination) {
            return $pagination;
        }

        return null;
    }
```

Ou dans n’importe quel contrôleur :

```php
// Via PDOException
throw new \PDOException("Test erreur ALERT : problème base de données !");

// Via mots-clés (sql, database, token, jwt, auth, api, timeout, unavailable)
throw new \RuntimeException("Test erreur ALERT : database connection failed !");
throw new \RuntimeException("Test erreur ALERT : sql syntax error !");
throw new \RuntimeException("Test erreur ALERT : invalid token detected !");
throw new \RuntimeException("Test erreur ALERT : jwt expired !");
throw new \RuntimeException("Test erreur ALERT : auth failed !");
throw new \RuntimeException("Test erreur ALERT : api unreachable !");
throw new \RuntimeException("Test erreur ALERT : connection timeout !");
throw new \RuntimeException("Test erreur ALERT : service unavailable !");
```

Résultat attendu

- Génère une erreur 500
- Doit aller dans alert.log
- Le subscriber doit capturer l’erreur et loguer via $alertLogger->alert() 


#### Error error : Provoquer un crash volontaire via un mauvais chemin

Dans n’importe la barre de recherche :

- Mettre un chemin de page qui n'existe pas

Ou dans n’importe quel contrôleur :

```php
throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException("Test erreur ERROR : page introuvable !");          // 404
throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException("Test erreur ERROR : accès refusé !");       // 403
throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException("Test erreur ERROR : requête invalide !");     // 400
throw new \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException('Bearer', "Test erreur ERROR : non authentifié !"); // 401
```


Résultat attendu

- Génère une erreur 404
- Doit aller dans error.log
- Le subscriber doit capturer l’erreur et loguer via $errorLogger->error() 