# Handler d'exceptions PHP

## 1. Introduction

Un **handler d'exceptions** permet de centraliser la gestion des exceptions PHP dans l'application.

Au lieu de gérer chaque exception séparément dans chaque fichier, on définit un handler global qui sera appelé lorsqu'une exception n'est pas interceptée par un `try/catch`.

Cela permet notamment de :

* centraliser l'affichage des erreurs ;
* afficher le fichier et la ligne concernés ;
* afficher le message de l'exception ;
* afficher la stack trace ;
* gérer les erreurs `Exception` et `Error` ;
* éviter d'afficher les erreurs PHP directement dans la page ;
* avoir un comportement différent entre le développement et la production.

---

# 2. `Throwable`

Depuis PHP 7, les erreurs et exceptions modernes implémentent l'interface `Throwable`.

La hiérarchie principale est :

```text
Throwable
├── Error
│   ├── TypeError
│   ├── ParseError
│   ├── ArithmeticError
│   └── ...
│
└── Exception
    ├── PDOException
    ├── RuntimeException
    ├── LogicException
    └── ...
```

Cela signifie qu'un handler basé sur `Throwable` peut gérer les deux grandes familles :

```php
Error
Exception
```

Par exemple :

```php
try {
    // Code susceptible de provoquer une erreur
} catch (Throwable $e) {
    // Gestion de l'erreur
}
```

---

# 3. Les principales erreurs rencontrées

### `Exception`

Exception générique.

```php
throw new Exception('Une erreur est survenue.');
```

### `PDOException`

Exception provenant de PDO, notamment lors d'une erreur SQL.

```php
$pdo->query('SELECT * FROM table_inexistante');
```

Si PDO est configuré avec :

```php
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

une erreur SQL provoquera une `PDOException`.

### `TypeError`

Erreur lorsqu'un type attendu n'est pas respecté.

```php
function addition(int $a, int $b): int
{
    return $a + $b;
}

addition('hello', 10);
```

### `ParseError`

Erreur de syntaxe détectée par PHP.

```php
if ($test {
    echo 'Hello';
}
```

### `Error`

Erreur PHP générale.

Par exemple, certaines opérations impossibles peuvent provoquer un `Error`.

---

# 4. Déclarer le handler global

PHP permet d'enregistrer un handler global avec :

```php
set_exception_handler('appExceptionHandler');
```

Exemple :

```php
set_exception_handler('appExceptionHandler');

function appExceptionHandler(Throwable $exception): void
{
    // Gestion de l'exception
}
```

Le handler sera appelé lorsqu'une exception ou une erreur `Throwable` remonte sans avoir été interceptée.

---

# 5. Exemple de handler

Un handler simple peut récupérer les informations importantes de l'exception :

```php
function appExceptionHandler(Throwable $exception): void
{
    $message = $exception->getMessage();
    $file    = $exception->getFile();
    $line    = $exception->getLine();
    $trace   = $exception->getTrace();

    // Affichage ou journalisation
}
```

Les principales méthodes disponibles sont :

```php
$exception->getMessage();
$exception->getCode();
$exception->getFile();
$exception->getLine();
$exception->getTrace();
$exception->getTraceAsString();
$exception->getPrevious();
```

---

# 6. Exemple d'utilisation

Une fois le handler enregistré :

```php
set_exception_handler('appExceptionHandler');
```

on peut simplement lancer une exception :

```php
throw new Exception('Impossible de charger les données.');
```

Le programme remontera automatiquement jusqu'au handler :

```php
function appExceptionHandler(Throwable $exception): void
{
    echo $exception->getMessage();
    exit;
}
```

Résultat :

```text
Impossible de charger les données.
```

---

# 7. Exemple avec PDO

Dans une application utilisant PDO, il est recommandé d'activer le mode exception :

```php
$pdo = new PDO(
    $dsn,
    $username,
    $password,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]
);
```

Une erreur SQL provoquera alors une `PDOException`.

Par exemple :

```php
try {
    $pdo->query('SELECT * FROM table_inexistante');
} catch (PDOException $e) {
    throw $e;
}
```

Le `throw $e` permet de laisser l'exception continuer sa remontée jusqu'au handler global.

---

# 8. Attention aux `try/catch`

Un point important : une exception capturée par un `catch` n'arrive pas automatiquement au handler global.

Par exemple :

```php
try {
    throw new Exception('Erreur');
} catch (Exception $e) {
    echo $e->getMessage();
}
```

Le handler global ne sera pas appelé.

L'exception a été interceptée par le `catch`.

Si on souhaite la laisser remonter :

```php
try {
    throw new Exception('Erreur');
} catch (Exception $e) {
    throw $e;
}
```

Elle continuera alors sa propagation jusqu'au prochain `catch` ou jusqu'au handler global.

---

# 9. Ne pas perdre la stack trace

Il faut éviter de remplacer inutilement une exception :

```php
catch (PDOException $e) {
    throw new Exception($e->getMessage());
}
```

Cette pratique peut faire perdre des informations importantes concernant l'exception originale.

Il vaut mieux faire :

```php
catch (PDOException $e) {
    throw $e;
}
```

Ou, si on souhaite créer une nouvelle exception :

```php
catch (PDOException $e) {
    throw new Exception(
        $e->getMessage(),
        (int) $e->getCode(),
        $e
    );
}
```

Le troisième paramètre permet de conserver l'exception originale avec :

```php
$exception->getPrevious();
```

---

# 10. Exemple avec un modèle

Un modèle peut laisser remonter une `PDOException` :

```php
function getCategory(PDO $pdo, int $id): array
{
    $sql = '
        SELECT *
        FROM category
        WHERE id_category = :id
    ';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id' => $id,
    ]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}
```

Il n'est pas nécessaire d'avoir un `try/catch` si le modèle ne fait rien de particulier avec l'exception.

L'exception pourra remonter :

```text
Modèle
   ↓
Controller / index.php
   ↓
Handler global
```

Le handler devient alors le point central de gestion.

---

# 11. Exemple avec un `try/catch` dans le modèle

Si le modèle doit effectuer une action particulière :

```php
function getCategory(PDO $pdo, int $id): array
{
    try {
        $stmt = $pdo->prepare('
            SELECT *
            FROM category
            WHERE id_category = :id
        ');

        $stmt->execute([
            ':id' => $id,
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
        // Log, ajout de contexte, etc.

        throw $e;
    }
}
```

Le `throw $e` permet de conserver l'exception originale.

---

# 12. `set_exception_handler()` et `try/catch`

Il faut retenir la différence suivante :

```php
try {
    // ...
} catch (Throwable $e) {
    // Exception interceptée ici
}
```

contre :

```php
throw new Exception('Erreur');
```

sans `catch`.

Dans le deuxième cas, PHP cherche un handler enregistré :

```php
set_exception_handler('appExceptionHandler');
```

Le fonctionnement peut être résumé ainsi :

```text
throw
  │
  ▼
try/catch ?
  │
  ├── Oui → catch
  │
  └── Non
       │
       ▼
appExceptionHandler()
```

---

# 13. Handler complet simplifié

Exemple minimal :

```php
error_reporting(E_ALL);

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');

set_exception_handler('appExceptionHandler');

function appExceptionHandler(Throwable $exception): void
{
    $type = get_class($exception);

    $message = $exception->getMessage();
    $file    = $exception->getFile();
    $line    = $exception->getLine();
    $trace   = $exception->getTrace();

    ?>
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title><?= htmlspecialchars($type, ENT_QUOTES, 'UTF-8') ?></title>
    </head>

    <body>

        <h1>
            <?= htmlspecialchars($type, ENT_QUOTES, 'UTF-8') ?>
        </h1>

        <p>
            <?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?>
        </p>

        <p>
            Fichier :
            <?= htmlspecialchars($file, ENT_QUOTES, 'UTF-8') ?>
        </p>

        <p>
            Ligne :
            <?= $line ?>
        </p>

        <pre><?php
            echo htmlspecialchars(
                print_r($trace, true),
                ENT_QUOTES,
                'UTF-8'
            );
        ?></pre>

    </body>
    </html>
    <?php

    exit;
}
```

---

# 14. Pourquoi centraliser le handler ?

Sans handler centralisé, chaque partie de l'application peut finir par gérer les erreurs différemment :

```text
model.php
    → affichage erreur

controller.php
    → autre affichage

index.php
    → autre gestion

autre fichier
    → rien
```

Avec un handler global :

```text
                     ┌── PDOException
                     │
                     ├── TypeError
                     │
Application ──────────┼── RuntimeException
                     │
                     ├── Exception
                     │
                     └── Error
                              │
                              ▼
                    appExceptionHandler()
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                 Dev                  Prod
              détails             message générique
              + trace              + journalisation
```

Cela donne un comportement cohérent dans toute l'application.

---

# 15. Développement et production

En développement, il est utile d'afficher :

* le type de l'exception ;
* le message ;
* le fichier ;
* la ligne ;
* le code source ;
* la stack trace.

En production, il vaut mieux éviter d'afficher ces informations à l'utilisateur.

Une exception peut contenir des informations sensibles :

```text
/var/www/application/config/database.php
```

ou :

```text
SQLSTATE[42000] ...
```

ou encore des informations concernant la structure de la base de données.

En production, on peut donc afficher :

```text
Une erreur interne est survenue.
```

et enregistrer les détails dans un fichier de log.

---

# 16. Résumé

Le principe général est :

```php
set_exception_handler('appExceptionHandler');
```

Puis :

```php
function appExceptionHandler(Throwable $exception): void
{
    // Gestion centralisée
}
```

`Throwable` permet de gérer les deux grandes familles :

```text
Error
Exception
```

et notamment :

```text
TypeError
ParseError
ArithmeticError
PDOException
RuntimeException
LogicException
Exception
...
```

Un `try/catch` intercepte l'exception avant le handler global :

```php
try {
    // ...
} catch (Throwable $e) {
    // Ici
}
```

Pour laisser l'exception remonter :

```php
throw $e;
```

Il faut éviter de recréer inutilement une exception, car cela peut faire perdre des informations de diagnostic.

---

# Conclusion

Un handler d'exceptions permet de disposer d'un **point central de gestion des erreurs de l'application**.

Dans une application PHP native, il permet notamment de conserver une architecture simple :

```text
Modèle
   │
   │ exception
   ▼
Controller / index.php
   │
   │ exception non interceptée
   ▼
Handler global
   │
   ├── Développement
   │      └── affichage détaillé
   │
   └── Production
          ├── journalisation
          └── message utilisateur
```

Le modèle n'a donc pas besoin de connaître le système d'affichage des erreurs. Il peut simplement laisser remonter l'exception.

Le point essentiel à retenir est :

> **Le code métier génère l'erreur, le handler central décide comment elle doit être présentée.**
