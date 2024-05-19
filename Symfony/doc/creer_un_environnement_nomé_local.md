# Créer un environnement personnalisé en local

 Si pour X raison, on a besoin de créer un environnement personnalisé en plus de l'environnement `dev` et l'environnement `prod`
 
 L'environnement personnalisé que l'on va créer ici se nommera `local`
 
 ### 1) Depuis le répertoire racine du projet, aller vers le fichier `config/packages/framework.yaml`
 
 1.1. Configurer le fichier `config/packages/framework.yaml` comme le code ci-dessous

 1.2. `when@local`, `when@test`, `when@dev` et `when@prod` servent à pointer sur différents environnement
 ```bash
# see https://symfony.com/doc/current/reference/configuration/framework.html

# Environnement local
when@local:
    framework:
        http_cache: true
        cache:
            app: cache.adapter.system
        secret: '%env(APP_SECRET)%'
        #csrf_protection: true
        http_method_override: false

        # Enables session support. Note that the session will ONLY be started if you read or write from it.
        # Remove or comment this section to explicitly disable session support.
        session:
            #handler_id: session.handler.native_file
            #handler_id: null
            #cookie_secure: auto
            #cookie_samesite: lax
            #storage_factory_id: session.storage.factory.native
            #storage_factory_id: session.storage.factory.php_bridge
            #storage_id: session.storage.php_bridge
            handler_id: session.handler.native_file
            save_path: '/var/lib/php/session'

        #esi: true
        #fragments: true
        php_errors:
            log: true

# Environnement test
when@local:
    framework:
        test: true
        session:
            storage_factory_id: session.storage.factory.mock_file
            # save_path: '/app/%env(USER_IM)%/log/session'
            save_path: '/var/lib/php/session'

# Environnement dev
when@dev:
    framework:
        http_cache: true
        cache:
            app: cache.adapter.system
        secret: '%env(APP_SECRET)%'
        #csrf_protection: true
        http_method_override: false

        # Enables session support. Note that the session will ONLY be started if you read or write from it.
        # Remove or comment this section to explicitly disable session support.
        session:
            #handler_id: session.handler.native_file
            #handler_id: null
            #cookie_secure: auto
            #cookie_samesite: lax
            #storage_factory_id: session.storage.factory.native
            #storage_factory_id: session.storage.factory.php_bridge
            #storage_id: session.storage.php_bridge
            handler_id: session.handler.native_file
            save_path: '/app/%env(USER_IM)%/log/session'

        #esi: true
        #fragments: true
        php_errors:
            log: true

# Environnement prod
when@prod:
    framework:
        http_cache: true
        cache:
            app: cache.adapter.system
        secret: '%env(APP_SECRET)%'
        #csrf_protection: true
        http_method_override: false

        # Enables session support. Note that the session will ONLY be started if you read or write from it.
        # Remove or comment this section to explicitly disable session support.
        session:
            #handler_id: session.handler.native_file
            #handler_id: null
            #cookie_secure: auto
            #cookie_samesite: lax
            #storage_factory_id: session.storage.factory.native
            #storage_factory_id: session.storage.factory.php_bridge
            #storage_id: session.storage.php_bridge
            handler_id: session.handler.native_file
            save_path: '/app/%env(USER_IM)%/log/session'

        #esi: true
        #fragments: true
        php_errors:
            log: true
```

### 2) Depuis le répertoire racine du projet, aller vers le fichier `config/packages/web_profiler.yaml` pour activer ou désactiver le profiler de débogage pour chaque environnement, sauf la prod
 
2.1. Configurer le fichier `config/packages/web_profiler.yaml` comme le code ci-dessous

```bash
when@local:
    web_profiler:
        toolbar: true
        intercept_redirects: false

    framework:
        profiler: { only_exceptions: false }

when@dev:
    web_profiler:
        toolbar: true
        intercept_redirects: false

    framework:
        profiler: { only_exceptions: false }

when@test:
    web_profiler:
        toolbar: false
        intercept_redirects: false

    framework:
        profiler: { collect: false }
```

### 3) Depuis le répertoire racine du projet, aller vers le fichier `config/routes/web_profiler.yaml` pour que l'environnement personnaliser puisse connaitre la route du profiler de débogage
 
3.1. Configurer le fichier `config/routes/web_profiler.yaml` comme le code ci-dessous pour `when@local`

```bash
when@local:
    web_profiler_wdt:
        resource: '@WebProfilerBundle/Resources/config/routing/wdt.xml'
        prefix: /_wdt

    web_profiler_profiler:
        resource: '@WebProfilerBundle/Resources/config/routing/profiler.xml'
        prefix: /_profiler

when@dev:
    web_profiler_wdt:
        resource: '@WebProfilerBundle/Resources/config/routing/wdt.xml'
        prefix: /_wdt

    web_profiler_profiler:
        resource: '@WebProfilerBundle/Resources/config/routing/profiler.xml'
        prefix: /_profiler
```

### 4) Depuis le répertoire racine du projet, aller vers le fichier `config/bundles.yaml` pour autoriser les bundles de débogage à être utiliser sur l'environnement personnaliser
 
4.1. Activer les 3 bundles ci-dessous dans le fichier `config/bundles.yaml` en rajoutant `'local' => true`

```bash
return [
    Symfony\Bundle\DebugBundle\DebugBundle::class => ['dev' => true, 'local' => true],
    Symfony\Bundle\WebProfilerBundle\WebProfilerBundle::class => ['dev' => true, 'test' => true, 'local' => true],
    Symfony\Bundle\MakerBundle\MakerBundle::class => ['dev' => true, 'local' => true],
];
```

### 5) Depuis le répertoire racine du projet, dupliquer le fichier `.env` et renommer le 2èmes en `.env.local`
 
 5.1. Dans le fichier `.env.local`, modifier `APP_ENV=dev` par `APP_ENV=local`

### 6) Redémarrer le projet

Félicitation !!!