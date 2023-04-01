

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

### Convertir des minutes et secondes en heure dans ce format 00:00:00
```php
// secondes
$secondEndTime = 60;
$hours = floor($secondEndTime / 3600);
$minutes = floor(($secondEndTime % 3600) / 60);
$seconds_remaining = $secondEndTime % 60;
$newTime = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds_remaining);

// ou
$secondEndTime = 60;
$hours = floor($secondEndTime / 3600);
$minutes = floor(($secondEndTime % 3600) / 60);
$seconds_remaining = $secondEndTime % 60;
$time = mktime(intval($hours), intval($minutes_remaining), $seconds_remaining, 1, 1, 2000);
$newTime = date('H:i:s', $time);
```

```php
// Minutes
$minuteEndTime = 60;
$hours = floor($minuteEndTime / 60);
$minutes_remaining = $minuteEndTime % 60;
$newTime = sprintf('%02d:%02d:%02d', $hours, $minutes, 00);

// ou
$minuteEndTime = 60;
$hours = floor($minuteEndTime / 60);
$minutes_remaining = $minuteEndTime % 60;
$time = mktime(intval($hours), intval($minutes_remaining), 0, 1, 1, 2000);
$newTime = date('H:i:s', $time);
```