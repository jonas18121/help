# Gérer les logs d'erreurs de manière globale avec envoie de mail

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

### 1 Configurer le fichier config/packages/monolog.yaml

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

- On injecte les 4 canaux dans **ExceptionSubscriber** ainsi que mailer, cache et lock

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
            
        tags:
        - { name: kernel.event_subscriber }
```

### 3 Version complexe de ExceptionSubscriber avec gestion des types d'erreurs et envoie de mail

- La méthode `managerException` gère le type d'erreur qui doit être utiliser par **$logger** et le type de logger à utiliser
- Dans la méthode `managerException` on envoie un mail pour l'erreur qui à été trouver avec `sendEmail`
- La méthode `managerDuplicate` gère les doublons des erreurs
- La méthode `managerStatusCode` gère le code status HTTP

```php

namespace App\EventSubscriber;

use Psr\Log\LoggerInterface;
use Symfony\Component\Lock\Lock;
use Symfony\Component\Mime\Email;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Component\Cache\CacheItem;
use Symfony\Component\Lock\LockFactory;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ExceptionSubscriber implements EventSubscriberInterface
{
    private const DEDUPLICATE_MINUTES = 30;

    public function __construct(
        private LoggerInterface $errorLogger,
        private LoggerInterface $criticalLogger,
        private LoggerInterface $alertLogger,
        private LoggerInterface $emergencyLogger,
        private MailerInterface $mailer,
        private CacheItemPoolInterface $dedupeCache,
        private LockFactory $lockFactory
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
        /** @var \Throwable $exceptionLogger */
        $exceptionLogger = $event->getThrowable();

        // ============================
        // === GERE LES STATUS DE CODES 
        // ============================

        /** @var int $statusCode */
        $statusCode = $this->managerStatusCode($exceptionLogger);

        // ============================
        // === GERE LES DEDUPLICATIONS 
        // ============================

        // Retourne true si la clé existe déjà (doublon).
        if ($this->managerDuplicate($exceptionLogger)) {
            return; // pas d’e-mail, pas de double log
        }

        // ============================
        // === GERE LES EXCEPTIONS 
        // ============================

        // Gère le type d'erreur qui doit être utiliser par $logger et le type de logger à utiliser
        [$level, $logger, $text] = $this->managerException($exceptionLogger, $statusCode);

        // LOG avec le niveau d'erreur déterminé
        $logger->$level($text, [
            'status_code' => $statusCode,
            'message' => $exceptionLogger->getMessage(),
            'file' => $exceptionLogger->getFile(),
            'line' => $exceptionLogger->getLine(),
            // Attention trace = beaucoup de texte, utile pour debug
            // 'trace' => $exceptionLogger->getTraceAsString(),
        ]);
    }

    /**
     * Gère les doublons des erreurs
     */
    private function managerDuplicate(\Throwable $exceptionLogger): bool
    {
        // Identifiant unique pour la déduplication
        /** @var string $idDeduplicate */
        $idDeduplicate = hash('sha256', $exceptionLogger::class . '|' . $exceptionLogger->getMessage());

        // Retourne true si la clé existe déjà (doublon).
        if ($this->isDuplicate($idDeduplicate)) {
            return true; // pas d’e-mail, pas de double log
        }

        // Enregistre cette erreur pendant le nombre de minutes qu'on veut
        $this->registerError($idDeduplicate);

        // Si pas de doublon retourne false
        return false;
    }

    /**
     * Gère le code status HTTP
     */
    private function managerStatusCode(\Throwable $exceptionLogger): int
    {
        /** @var int $statusCode */
        $statusCode = 500; // par défaut

        // Si c’est une exception HTTP, on récupère le vrai code (404, 403, 401, etc.)
        if ($exceptionLogger instanceof HttpExceptionInterface) {
            /** @var int $statusCode */
            $statusCode = $exceptionLogger->getStatusCode();
        }

        return $statusCode;
    }

    /**
     * Gère le type d'erreur qui doit être utiliser par $logger
     * Et gére quel type de logger à utiliser
     * 
     * Exemple : 
     *     - $logger->error()
     *     - $logger->critical()
     *     - $logger->alert()
     *     - $logger->emergency()
     */
    private function managerException(\Throwable $exception, int $statusCode): array
    {
        /** @var string $message */
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
            $this->sendEmail('EMERGENCY', $exception, $statusCode);
            return ['emergency', $this->emergencyLogger, 'Fatal error'];
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
            $this->sendEmail('ALERT', $exception, $statusCode);
            return ['alert', $this->alertLogger, 'Database error'];
        }

        // ============================
        // 3. CRITICAL (Erreurs serveur 500+)
        // ============================
        if ($statusCode >= 500) {
            $this->sendEmail('CRITICAL', $exception, $statusCode);
            return ['critical', $this->criticalLogger, 'Server error'];
        }


        // ============================
        // 4. ERROR (Par défault)
        // ============================
        $this->sendEmail('ERROR', $exception, $statusCode);
        // Erreurs fonctionnelles ou utilisateur
        return ['error', $this->errorLogger, 'Client error'];
    }

    /**
     * Envoie un email
     */
    private function sendEmail(string $type, \Throwable $exception, int $statusCode): void
    {
        /** @var Email $email */
        $email = (new Email())
            ->from('serveur@monsite.com')
            ->to('admin@gmail.com')
            ->subject("[{$type}] Nouvelle erreur détectée ({$statusCode})")
            ->html("
                <h2>Erreur détectée de type : {$type}</h2>
                <p><strong>Message :</strong> {$exception->getMessage()}</p>
                <p><strong>Status code :</strong> {$statusCode}</p>
                <p><strong>Fichier :</strong> {$exception->getFile()}</p>
                <p><strong>Ligne :</strong> {$exception->getLine()}</p>
                <pre><strong>Trace :</strong><br>{$exception->getTraceAsString()}</pre>
            ");

        $this->mailer->send($email);
    }
   
    /**
     * Retourne true si la clé existe déjà (doublon).
     * Cette méthode ne crée PAS la clé.
     */
    private function isDuplicate(string $id): bool
    {
        /** @var string $key */
        $key = 'dedupe_' . $id;

        // Lock pour éviter les races conditions si plusieurs requête en même temps
        /** @var Lock $lock */
        $lock = $this->lockFactory->createLock($key, ttl: 5);

        // On attend le lock : QUAND IL EST ACQUIS, on peut lire proprement
        $lock->acquire(true);

        if (!$lock->acquire()) {
            // Si quelqu’un d’autre est en train d'écrire → considérer comme doublon
            return true;
        }

        try {
            // retourne un objet CacheItemInterface même si la clé n’existe pas (dans ce cas isHit() sera false)
            /** @var CacheItem $item */
            $item = $this->dedupeCache->getItem($key);

            // envoie true si la valeur existe dans le cache et n’a pas expiré
            return $item->isHit();
        }
        finally {
            // Libères le verrou, les autres processus peuvent accéder à la ressource.
            $lock->release();
        }
    }

    /**
     * Enregistre la clé dans le cache (atomique si Redis)
     */
    private function registerError(string $id): void
    {
        /** @var string $key */
        $key = 'dedupe_' . $id;

        // Crée un verrou portant un nom unique
        /** @var Lock $lock */
        $lock = $this->lockFactory->createLock($key, ttl: 5);

        // Tente d’obtenir le verrou, si quelqu’un l’a déjà, on retourne FALSE
        $lock->acquire(true);

        try {
            // On récupère l’élément de cache (objet) pour cette clé — soit une nouvelle instance si la clé n’existe pas, soit l’item existant.
            /** @var CacheItem $item */
            $item = $this->dedupeCache->getItem($key);
    
            // On stocke une valeur dans l’item. // la valeur n’a pas d’importance
            $item->set(true);
    
            // Demande que l’item expire automatiquement après le nombre de temps définit dans DEDUPLICATE_MINUTES . 
            // C’est la durée pendant laquelle la clé empêchera l’envoi d’un nouvel e-mail.
            $item->expiresAfter(self::DEDUPLICATE_MINUTES * 60);
    
            // On sauvegarde l’item dans le pool de cache. 
            // Après save() la clé existe et isHit() renverra true jusqu’à l’expiration
            $this->dedupeCache->save($item);
        }
        finally {
            // Libères le verrou, les autres processus peuvent accéder à la ressource.
            $lock->release();
        }
    }
}
```

### 4 Les différentes autres configuration à faire/vérifier

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

### 5 Tester les erreurs

#### Error Critical : Provoquer un crash volontaire dans un contrôleur

Dans n’importe quel contrôleur :

```php
throw new \RuntimeException("Test erreur CRITICAL : crash volontaire !");
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

Résultat attendu

- Génère une erreur 500
- Doit aller dans alert.log
- Le subscriber doit capturer l’erreur et loguer via $alertLogger->alert() 

#### Error error : Provoquer un crash volontaire via un mauvais chemin

Dans n’importe la barre de recherche :

- Mettre un chemin de page qui n'existe pas


Résultat attendu

- Génère une erreur 404
- Doit aller dans error.log
- Le subscriber doit capturer l’erreur et loguer via $errorLogger->error() 