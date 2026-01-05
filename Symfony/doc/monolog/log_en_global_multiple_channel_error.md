# Gérer les logs d'erreurs de manière globale 

- [Symfony : Configuration des logs Monolog de remipoignon.fr](https://www.remipoignon.fr/symfony-configuration-des-logs-monolog/)
- [Logging](https://symfony.com/doc/7.0/logging.html)
- [Comment configurer Monolog pour envoyer des e-mails en cas d'erreur](https://symfony.com/doc/7.0/logging/monolog_email.html)
- [Envoi d'e-mails avec Mailer](https://symfony.com/doc/current/mailer.html)
- [Github Symfony Component Mailjet Bridge](https://github.com/symfony/symfony/blob/8.0/src/Symfony/Component/Mailer/Bridge/Mailjet/README.md)
- [Github Mailjet](https://github.com/maildev/maildev)
- [monolog-bundle](https://github.com/symfony/monolog-bundle)
- [Throwable](https://www.php.net/manual/en/class.throwable.php)
- [Log/Logger.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Log/Logger.php)
- [ExceptionEvent](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Event/ExceptionEvent.php)
- [Maîtriser les événements du noyau de Symfony : auditeurs vs abonnés de Medium.com](https://medium.com/@dams_crr/mastering-symfonys-kernel-events-listeners-vs-subscribers-54be05bbe8fa)
- [Liste des codes HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP)
- [Symfony/Component/HttpKernel/Exception/HttpException.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Exception/HttpException.php)
- [Symfony/Component/HttpKernel/Exception/HttpExceptionInterface.php](https://github.com/symfony/symfony/blob/8.1/src/Symfony/Component/HttpKernel/Exception/HttpExceptionInterface.php)
- [symfony/src/Symfony/Component/HttpKernel/EventListener/ErrorListener.php](https://github.com/symfony/symfony/blob/refs/heads/6.4/src/Symfony/Component/HttpKernel/EventListener/ErrorListener.php)
- [core-bundle/tests/DependencyInjection/ContaoCoreExtensionTest.php](https://github.com/contao/core-bundle/blob/5.6/tests/DependencyInjection/ContaoCoreExtensionTest.php)

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
            # Intercepte toute les log de type error dans le canal exception    
            # exceptions:
            #     type: rotating_file 
            #     max_files: 30 # Conserve Jusqu'à 30 fichiers = 30 jours
            #     path: "%kernel.logs_dir%/exception/exceptions.log"
            #     level: error
            #     channels: ["exception"]
            
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

- On injecte les 4 canaux dans **ExceptionSubscriber**

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
            
        tags:
        - { name: kernel.event_subscriber }
```

### 3 Première version plus complexe de ExceptionSubscriber avec gestion des types d'erreurs

- La méthode `managerException` gère le type d'erreur qui doit être utiliser par **$logger** et le type de logger à utiliser

- `KernelEvents::EXCEPTION => ['onKernelException', -100]` :
    - à **-100**, on observes après tout le monde
    - Les listeners **avec une priorité plus élevée** sont exécutés **avant**
    - Les listeners **avec une priorité plus basse** sont exécutés **après**
    - Valeurs typiques :
        - `0` => normal
        - `> 0` => très tôt
        - `< 0` => très tard
    - En pratique :
        - priorité  `0`   => listeners applicatifs
        - priorité `-64`  => bundles tiers
        - priorité `-100` => ExceptionSubscriber
        - priorité `-128` => Symfony ErrorListener (stop propagation)
    - On laisse Symfony faire son travail d'abord
        - déterminer le bon `HttpException`
        - transformer certaines exceptions
        - définir le status code réel
        - éventuellement remplacer l’exception
    - On évites les conflits avec les listeners internes
        - `ErrorListener` 
        - `ExceptionListener` 
        - `DebugHandlersListener` 
        - listeners de bundles (Security, Doctrine, etc.)
    - Dans le fichier [symfony/src/Symfony/Component/HttpKernel/EventListener/ErrorListener.php](https://github.com/symfony/symfony/blob/refs/heads/6.4/src/Symfony/Component/HttpKernel/EventListener/ErrorListener.php) la méthode `getSubscribedEvents()` retourne les événements avec leurs priorités, dont **kernel.exception** avec `-128`
    - Dans le fichier [core-bundle/tests/DependencyInjection/ContaoCoreExtensionTest.php](https://github.com/contao/core-bundle/blob/5.6/tests/DependencyInjection/ContaoCoreExtensionTest.php) il y a un test qui vérifie explicitement la priorité -128 dans l’événement kernel.exception pour `ErrorListener`, exemple : `$this->assertSame(-128, $events['kernel.exception'][1][1]);`
    - La commande ci'dessous permet de lister tous les listeners enregistrés pour un événement
```bash
# Voir pour kernel.exception
php bin/console debug:event-dispatcher kernel.exception

# Voir tous
php bin/console debug:event-dispatcher 
```

```php
namespace App\EventSubscriber;

use Psr\Log\LoggerInterface;
use Doctrine\ORM\Query\QueryException;
// use Doctrine\DBAL\Exception as QueryException;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

/**
 * Intercepte toutes les exceptions levées par l'application.
 *
 * Fonctionnement :
 *
 *  → Catégorise les erreurs par niveau de gravité (EMERGENCY, ALERT, CRITICAL, ERROR)
 *
 *  → Enregistre dans des fichiers de logs dédiés (var/log/exception/)
 *
 * @see config/packages/monolog.yaml pour la configuration des canaux de logs
 * @see config/services.yaml pour l'injection des loggers et du cache
 *
 * @author jonas18121
 */
class ExceptionSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private LoggerInterface $errorLogger,
        private LoggerInterface $criticalLogger,
        private LoggerInterface $alertLogger,
        private LoggerInterface $emergencyLogger
    ){
    }

    public static function getSubscribedEvents(): array
    {
        return [
            // 'kernel.exception' => ['onKernelException', -100],
            // ExceptionEvent::class => ['onKernelException', -100],
            KernelEvents::EXCEPTION => ['onKernelException', -100],
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exceptionLogger = $event->getThrowable();

        $statusCode = 500; # par défaut
        # Si c’est une exception HTTP, on récupère le vrai code (404, 403, 401, etc.)
        if ($exceptionLogger instanceof HttpExceptionInterface) {
            $statusCode = $exceptionLogger->getStatusCode();
        }

        # Gère le type d'erreur qui doit être utiliser par $logger et le type de logger à utiliser
        [$level, $logger, $text] = $this->managerException($exceptionLogger, $statusCode);

        try {
            # LOG avec le niveau d'erreur déterminé
            $logger->$level($text, [
                'status_code' => $statusCode,
                'message' => $exceptionLogger->getMessage(),
                'file' => $exceptionLogger->getFile(),
                'line' => $exceptionLogger->getLine(),
                # Attention trace = beaucoup de texte, utile pour debug
                // 'trace' => $exceptionLogger->getTraceAsString(),
            ]);
        } catch (\Throwable $error) {
            # dernier rempart : ne rien faire
            # empêche de créer une boucle infinit d'erreur, si le logger ne fonctionne pas
        }
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
        $message = strtolower($exception->getMessage());

        // ============================
        // 1. EMERGENCY (Crash fatal)
        // ============================
        # Crash PHP fatals / erreurs irréversibles
        if (
            $exception instanceof \Error ||
            $exception instanceof \TypeError ||
            $exception instanceof \ParseError ||
            $exception instanceof \ErrorException
        ) {
            return ['emergency', $this->emergencyLogger, 'Fatal error'];
        }

        // ============================
        // 2. ALERT (BD, sécurité, API)
        // ============================
        if (
            $exception instanceof \PDOException ||
            $exception instanceof QueryException ||
            str_contains($message, 'sql') ||
            str_contains($message, 'database') ||
            str_contains($message, 'token') ||
            str_contains($message, 'jwt') ||
            str_contains($message, 'auth') ||
            str_contains($message, 'api') ||
            str_contains($message, 'timeout') ||
            str_contains($message, 'unavailable')
        ) {
            return ['alert', $this->alertLogger, 'Database error'];
        }

        // ============================
        // 3. CRITICAL (Erreurs serveur 500+)
        // ============================
        if ($statusCode >= 500) {
            return ['critical', $this->criticalLogger, 'Server error'];
        }

        // ============================
        // 4. ERROR (Par défault)
        // ============================
        # Erreurs fonctionnelles ou utilisateur
        return ['error', $this->errorLogger, 'Client error'];
    }
}
```

### 4 Tester les erreurs

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