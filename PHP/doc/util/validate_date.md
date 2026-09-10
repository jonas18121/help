# validateDate : validateur générique basé sur les formats natifs de DateTime

**validateDate()** : La méthode vérifie qu'une valeur correspond exactement à un format de date/heure donné et qu'elle représente une date/heure valide.

Elle effectue 3 contrôles :

1)  Création de la date avec DateTime::createFromFormat()
    - Vérifie que PHP arrive à interpréter la valeur selon le format fourni.

2) Vérification de l'exactitude
    - La date est reformatée avec le même format puis comparée à la valeur originale.
    - Cela permet notamment de détecter les dates invalides comme 30/02/2012, que DateTime pourrait sinon normaliser.
3) Contrôle de l'année
    - Si le format contient une année (Y ou y), l'année doit être comprise entre 1970 et 2037 inclus.
    - Si le format ne contient pas d'année (H:i, H, etc.), aucun contrôle d'année n'est effectué.

### Version a partir de PHP 8 avec str_contains()
```php
 /**
  * Validateur de date et d'heure pour tous les formats et avec DateTime.
  *
  * Utilisation :
  * var_dump(validateDate('2012-02-28 12:12:12')); # true
  * var_dump(validateDate('2012-02-30 12:12:12')); # false
  * var_dump(validateDate('2012-02-28', 'Y-m-d')); # true
  * var_dump(validateDate('30/02/2012', 'd/m/Y')); # false
  * var_dump(validateDate('14:77', 'H:i')); # false
  * var_dump(validateDate('14', 'H')); # true
  *
  * @param string $date
  * @param string $format
  * @return bool
  */
 function validateDate(string $date, string $format = 'Y-m-d H:i:s'): bool
 {
     $dateTime = DateTime::createFromFormat($format, $date);
     
     if ($dateTime === false || $dateTime->format($format) !== $date) {
         return false;
     }
 
     if (str_contains($format, 'Y') || str_contains($format, 'y')) {
         $year = (int) $dateTime->format('Y');
 
         if ($year < 1970 || $year > 2037) {
             return false;
         }
     }
 
     return true;
 }
```


### Version PHP 7.4 et inférieur avec strpos() !== false 
```php
/**
 * Validateur de date et d'heure pour tous les formats et avec DateTime.
 *
 * Utilisation :
 * var_dump(validateDate('2012-02-28 12:12:12')); # true
 * var_dump(validateDate('2012-02-30 12:12:12')); # false
 * var_dump(validateDate('2012-02-28', 'Y-m-d')); # true
 * var_dump(validateDate('30/02/2012', 'd/m/Y')); # false
 * var_dump(validateDate('14:77', 'H:i')); # false
 * var_dump(validateDate('14', 'H')); # true
 *
 * @param string $date
 * @param string $format
 * @return bool
 */
function validateDate(string $date, string $format = 'Y-m-d H:i:s'): bool
{
    $dateTime = DateTime::createFromFormat($format, $date);

    if ($dateTime === false || $dateTime->format($format) !== $date) {
        return false;
    }

    if (strpos($format, 'Y') !== false || strpos($format, 'y') !== false) {
        $year = (int) $dateTime->format('Y');

        if ($year < 1970 || $year > 2037) {
            return false;
        }
    }

    return true;
}
```