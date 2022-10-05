# Quelques algo

Site : https://www.codewars.com/

### Complétez la fonction de somme carrée de manière à ce qu'elle élève au carré chaque nombre qui y est passé, puis additionne les résultats.

Par exemple, car [1, 2, 2]il devrait revenir 9car 1^2 + 2^2 + 2^2 = 9.

result :

    function square_sum($numbers) : int {

        $square_of_sum = 0;

        foreach ($numbers as $one_number){
            $square_of_sum += $one_number * $one_number;
        }
        
        return $square_of_sum;
    }
    
    var_dump(square_sum([-1,0,1])); // return 2


Ou ce code aussi est bien :

    function square_sum2($numbers) : int {

        $square_of_sum = 0;

        foreach ($numbers as $one_number){
            $square_of_sum += pow($one_number, 2);
        }
        
        return $square_of_sum;
    }
    
    var_dump(square_sum2([-1,0,1])); // return 2


### Récupéré le lien courant 
```php
// Récupéré le lien courant
$actual_link_form = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

// exploxer le lien a partir du point d'interrogation "?"
$actual_link_form = explode("?", $actual_link_form);
```