
Exo 6 : https://www.codingame.com/playgrounds/41820/exercice-php---base/exercice-6

Il faut écrire la fonction check_form. Celle-ci prend un tableau associatif en paramètre. Ce dernier contient les clés suivantes :

nom
prenom
CP
naissance
banque

La fonction check_form doit vérifier que les données sont valides. Pour être valides les données doivent respecter les contraintes suivantes :

Le nom doit exclusivement être composé des caractères de a à z, de - et  (d'espace).
Le prenom doit exclusivement être composé des caractères de a à z, de - et  (d'espace).
CP est une valeur numérique comprise entre 1000 et 9999.
naissance doit être une date valide au format jour/mois/année.
banque doit être un numéro de compte belge au format européen (eg. BE15 1234 5678 9012)
Pour vous aider dans la vérification des données vous pouvez utiliser les expressions régulières (voir fonction preg_match). Voici des expressions régulières pouvant vous aider :

#^[A-Za-z -]*$# vérifie qu'une chaîne est composée des caractères de a à z, de - et  (d'espace).
#^[0-9]{1,2}/[0-9]{1,2}/[0-9]{1,4}$# vérifie qu'une chaine est au format xx/xx/xxxx où x est un nombre.
#^BE[0-9]{2}( ?[0-9]{4}){3}$# vérifie qu'une chaîne correspond à un numéro de compte belge au format européen.
La fonction retournera un tableau associatif contenant les informations suivantes :

valide valeur booléenne TRUE ou FALSE selon que toutes les données sont valides ou non
nom
valide valeur booléenne TRUE ou FALSE selon que les données dans nom sont valides ou non.
message un message d'erreur relatif à nom si valide est FALSE.
prenom
valide valeur booléenne TRUE ou FALSE selon que les données dans prenom sont valides ou non.
message un message d'erreur relatif à prenom si valide est FALSE.
CP
valide valeur booléenne TRUE ou FALSE selon que les données dans CP sont valides ou non.
message un message d'erreur relatif à CP si valide est `FALSE
naissance
valide valeur booléenne TRUE ou FALSE selon que les données dans naissance sont valides ou non.
message un message d'erreur relatif à naissance si valide est FALSE.
banque
valide valeur booléenne TRUE ou FALSE selon que les données dans banque sont valides ou non.
message un message d'erreur relatif à banque si valide est FALSE.
```php	

	function check_form($data) {

        $result = [];

        // $resultNom = null;
        if(preg_match('/^[A-Za-z -]*$/', $data['nom'])){
            $resultNom = [
                'valide' => true,
                'message' => ''
            ];
            $result['nom'] = $resultNom;
        }
        else {
            $resultNom = [
                'valide' => false,
                'message' => 'Le nom est invalide'
            ];
            $result['nom'] = $resultNom;
        }

        // $resultPrenom = [];
        if(preg_match('/^[A-Za-z -]*$/', $data['prenom'])){
            $resultPrenom = [
                'valide' => true,
                'message' => ''
            ];
            $result['prenom'] = $resultPrenom;
        }
        else {
            $resultPrenom = [
                'valide' => false,
                'message' => 'Le prenom est invalide'
            ];
            $result['prenom'] = $resultPrenom;
        }
        
        // $resultCP = [];
        if(preg_match('/^[1-9][0-9]{3}$/', $data['CP'])){
            $resultCP = [
                'valide' => true,
                'message' => ''
            ];
            $result['CP'] = $resultCP;
        }
        else {
            $resultCP = [
                'valide' => false,
                'message' => 'Le CP est invalide'
            ];
            $result['CP'] = $resultCP;
        }

        // $resultNaissance = [];
        if(preg_match('/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/', $data['naissance'])){
            $resultNaissance = [
                'valide' => true,
                'message' => ''
            ];
            $result['naissance'] = $resultNaissance;

            var_dump($result);
        }
        else {
            $resultNaissance = [
                'valide' => false,
                'message' => 'La naissance est invalide'
            ];
            $result['naissance'] = $resultNaissance;

            var_dump($result);
        }

        // $resultBanque = [];
        if(preg_match('/^BE[0-9]{2}( ?[0-9]{4}){3}$/', $data['banque'])){
            $resultBanque = [
                'valide' => true,
                'message' => ''
            ];
            $result['banque'] = $resultBanque;
        }
        else {
            $resultBanque = [
                'valide' => false,
                'message' => 'La banque est invalide'
            ];
            $result['banque'] = $resultBanque;
        }

        $isValide = true;
        foreach($result as $field) {
            if($field["valide"] == false){
                $isValide = false;
            };
        }

        if($isValide == false){
            $result["valide"] = false;
        } else {
            $result["valide"] = true;
        }

        return $result;
	}
```

Exo 7: https://www.codingame.com/playgrounds/41820/exercice-php---base/exercice-7

Il faut écrire une fonction distance qui prend les 4 paramètres suivants : $x1, $x2, $y1 et $y2. Ces paramètres représentent les coordonnées de deux points du plan. La fonction calculera et renverra la distance séparant ces deux points.

```php
function distance($x1,$y1,$x2,$y2) {
    return sqrt(pow($x2 - $x1, 2) + pow($y2 - $y1, 2));
}
```

exo 9: https://www.codingame.com/playgrounds/41820/exercice-php---base/exercice-9

Il faut écrire une fonction premiers qui retourne un tableau contenant les $n premiers nombres premiers. n est un paramètre fourni à la fonction.

Attention : 1 n'est pas un nombre premier.

```php
function estPremier($nombre)
{
    if ($nombre <= 1) {
        return false;
    }
    
    if ($nombre <= 3) {
        return true;
    }

    if ($nombre % 2 == 0 || $nombre % 3 == 0) {
        return false;
    }

    $i = 5;
    while ($i * $i <= $nombre) {
        if ($nombre % $i == 0 || $nombre % ($i + 2) == 0) {
            return false;
        }
        $i += 6;
    }

    return true;
}

function premiers($n)
{
    $nombresPremiers = array();
    $nombre = 2; // Commence avec le premier nombre premier

    while (count($nombresPremiers) < $n) {
        if (estPremier($nombre)) {
            $nombresPremiers[] = $nombre;
        }
        $nombre++;
    }

    return $nombresPremiers;
}
```