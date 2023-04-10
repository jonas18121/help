

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

OU Dans une classe
```php
<?php

declare(strict_types=1);

/*
 * Copyright (C)  - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

namespace App\Helper;

/**
 * Class TimeZone - Helper.
 */
class TimeZoneHelper
{
    public static function getTimeZoneOffsetOutput(
        string $timezone
    ): string {
        if (false === timezone_open($timezone) || false === date_create()) {
            throw new \Exception('TimeZone is not valid.');
        }

        // Get time zone offset
        $offset = timezone_offset_get(timezone_open($timezone), date_create());

        // Format output as +02:00 for examle
        return sprintf('%+03d:%02d', $offset / 3600, abs($offset) % 3600 / 60);
    }
}
```

Ou dans un methode
```php
    public function getTimeZoneOffsetOutput(string $timezone): string
    {
        // Set default time zone
        date_default_timezone_set($timezone);

        // Get the current time zone
        $timezone = date_default_timezone_get();

        if (false === timezone_open($timezone) || false === date_create()) {
            throw new \Exception('DateTimeZone or DateTime is missing.');
        }

        // Get time zone offset
        $offset = timezone_offset_get(timezone_open($timezone), date_create());

        // Format output as +02:00
        return sprintf('%+03d:%02d', $offset / 3600, abs($offset) % 3600 / 60);
    }
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

Ou dans une methode

```php
/**
     * Calculates the end time based on the start time and the duration of the appointment.
     */
    private function calculateEndTime(
        string $startTime,
        string $duration
    ): string {
        // Explode Start Time
        $arrayStartTime = explode(':', $startTime);
        $hourStartTime = (int) $arrayStartTime[0];
        $minuteStartTime = (int) $arrayStartTime[1];
        $secondStartTime = (int) $arrayStartTime[2];

        // Explode Duration
        $arrayDuration = explode(':', $duration);
        $hourDuration = (int) $arrayDuration[0];
        $minuteDuration = (int) $arrayDuration[1];
        $secondDuration = (int) $arrayDuration[2];

        // Calculate Start Time with Duration
        $hourEndTime = $hourStartTime + $hourDuration;
        $minuteEndTime = $minuteStartTime + $minuteDuration;
        $secondEndTime = $secondStartTime + $secondDuration;

        // Check if the number of the second is equal to or greater than 60
        if (60 <= $secondEndTime) {
            // Convert seconds to hours format
            $hours = floor($secondEndTime / 3600);
            $minutes = floor(($secondEndTime % 3600) / 60);
            $seconds_remaining = $secondEndTime % 60;
            $newTime = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds_remaining); // Ex : 00:01:10

            // Explode New Time
            $arrayNewTime = explode(':', $newTime);
            $hourNewTime = (int) $arrayNewTime[0];
            $minuteNewTime = (int) $arrayNewTime[1];
            $secondNewTime = (int) $arrayNewTime[2];

            // Calculate End Time with New Time
            $hourEndTime = $hourEndTime + $hourNewTime;
            $minuteEndTime = $minuteEndTime + $minuteNewTime;
            $secondEndTime = $secondNewTime;
        }
        $secondEndTime = 2 > \strlen((string) $secondEndTime) ? '0' . (string) $secondEndTime : (string) $secondEndTime;

        // check if the minute number is equal to or greater than 60
        if (60 <= $minuteEndTime) {
            // convert minutes to hours format
            $hours = floor($minuteEndTime / 60);
            $minutes_remaining = $minuteEndTime % 60;
            $seconds = 00;
            $newTime = sprintf('%02d:%02d:%02d', $hours, $minutes_remaining, $seconds); // Ex : 01:10:00

            // Explode New Time
            $arrayNewTime = explode(':', $newTime);
            $hourNewTime = (int) $arrayNewTime[0];
            $minuteNewTime = (int) $arrayNewTime[1];
            $secondNewTime = (int) $arrayNewTime[2];

            // Calculate End Time with New Time
            $hourEndTime = $hourEndTime + $hourNewTime;
            $minuteEndTime = $minuteNewTime;
        }
        $minuteEndTime = 2 > \strlen((string) $minuteEndTime) ? '0' . (string) $minuteEndTime : (string) $minuteEndTime;

        // check if the number of the hour is equal to or greater than 24
        if (24 <= $hourEndTime) {
            $hourEndTime = '00';
            $minuteEndTime = '00';
            $secondEndTime = '00';
        }
        $hourEndTime = 2 > \strlen((string) $hourEndTime) ? '0' . (string) $hourEndTime : (string) $hourEndTime;

        return sprintf('%02d:%02d:%02d', $hourEndTime, $minuteEndTime, $secondEndTime);
    }
```