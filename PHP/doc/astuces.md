

### Pour obtenir le fuseau horaire au format "+02:00" en PHP
```php
// Définir le fuseau horaire par défaut
date_default_timezone_set('Europe/Paris');

// Obtenir le fuseau horaire actuel
$timezone = date_default_timezone_get();

// Obtenir l'offset du fuseau horaire
$offset = timezone_offset_get(timezone_open($timezone), date_create());

// Formater la sortie au format +02:00
$output = sprintf('%+03d:%02d', $offset / 3600, abs($offset) % 3600 / 60);
```