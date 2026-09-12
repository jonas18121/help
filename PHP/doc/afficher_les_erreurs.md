

### En développement

```php
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
```

### En Production

```php
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
```