# Fonctionnalitée personnalisée

### Remplace easter_date qui retourne le timestamp Unix pour minuit local le jour de Pâques d'une année donnée

- [easter_date sur PHP.net](https://www.php.net/manual/en/function.easter-date.php)
- [easter_date Github](https://github.com/php/php-src/blob/master/ext/calendar/easter.c)

Comme la méthode `easter_date()` est limité en 1970 et 2037, on va la remplacer avec la méthode ci-dessous, qui fait la même fonctionnalité mais sans limite.

Donc elle retourne le timestamp Unix du dimanche de Pâques de cette année-là

L’algorithme de Pâques calcule uniquement… la date de Pâques.

Et ensuite seulement, on peut en déduire :

- Lundi de Pâques (Pâques + 1 jour)

- Ascension (Pâques + 39 jours)

- Lundi de Pentecôte (Pâques + 50 jours)

Mais les autres jours fériés français sont fixes, donc devons les ajouter nous-mêmes.

```php
function calculateEasterDate(int $year, string $timeZone): int
{
    // Algorithme Meeus/Jones/Butcher
    $goldenNumber = $year % 19;
    $century = intdiv($year, 100);
    $yearWithinCentury = $year % 100;

    $centuryDiv4 = intdiv($century, 4);
    $centuryMod4 = $century % 4;

    $leapCorrection = intdiv($century + 8, 25);
    $solarCorrection = intdiv($century - $leapCorrection + 1, 3);

    $epact = (19 * $goldenNumber + $century - $centuryDiv4 - $solarCorrection + 15) % 30;

    $yearWithinCenturyDiv4 = intdiv($yearWithinCentury, 4);
    $yearWithinCenturyMod4 = $yearWithinCentury % 4;

    $weekdayCorrection = (32 + 2 * $centuryMod4 + 2 * $yearWithinCenturyDiv4 - $epact - $yearWithinCenturyMod4) % 7;

    $finalCorrection = intdiv($goldenNumber + 11 * $epact + 22 * $weekdayCorrection, 451);

    $month = intdiv($epact + $weekdayCorrection - 7 * $finalCorrection + 114, 31);
    $day   = (($epact + $weekdayCorrection - 7 * $finalCorrection + 114) % 31) + 1;

    // 100 % DST-proof pour le pays donné
    $timeZone = new DateTimeZone($timeZone);
    $date = new DateTimeImmutable("$year-$month-$day", $timeZone);
    $date = $date->setTime(0, 0, 0);

    return $date->getTimestamp();
}
```
#### Utilisation

```php
$timeZones = [
    'Europe/Paris',
    'America/New_York',
    'America/Toronto',
    'Asia/Shanghai',
    'UTC',
    'Europe/Rome',
    'Europe/Madrid'
];

foreach ($timeZones as $tz) {
    $timestamp = calculateEasterDate(2025, $tz);
    echo $tz . " => " . date('Y-m-d H:i:s', $timestamp) . " (" . $timestamp . ")\n";
}
```

#### Résultats obtenus

Voici les résultats:

| Fuseau horaire       | Offset UTC (20/04/2025) | Date locale retournée | Timestamp Unix | Commentaire             |
| -------------------- | ----------------------- | --------------------- | -------------- | ----------------------- |
| **Europe/Paris**     | **UTC+2** (DST)         | 2025-04-20 00:00:00   | 1745109600     | Heure d’été active      |
| **America/New_York** | **UTC-4** (DST)         | 2025-04-20 00:00:00   | 1745127600     | Heure d’été active      |
| **America/Toronto**  | **UTC-4** (DST)         | 2025-04-20 00:00:00   | 1745127600     | Même règle que New York |
| **Asia/Shanghai**    | **UTC+8**               | 2025-04-20 00:00:00   | 1745068800     | Pas de DST en Chine     |
| **UTC**              | **UTC+0**               | 2025-04-20 00:00:00   | 1745107200     | Référence               |
| **Europe/Rome**      | **UTC+2** (DST)         | 2025-04-20 00:00:00   | 1745109600     | Même DST que Paris      |
| **Europe/Madrid**    | **UTC+2** (DST)         | 2025-04-20 00:00:00   | 1745109600     | Même DST que Paris      |

