
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

exo 3 tutoriel

Dans cet exercice, on vous demande d'écrire un programme capable d'analyser un relevé de températures pour trouver quelle température se rapproche le plus de zéro.

Implémentez la fonction computeClosestToZero(array $ts)  qui prend un tableau de températures $ts  en paramètre et renvoie la température la plus proche de zéro.

contrainte

- Si le tableau est vide, la fonction doit renvoyer 0
- 0<= taille $ts <= 1000
- Si deux températures sont aussi proches de zéro, la fonction devra renvoyer la température positive (par exemple si les températures sont -5 et 5, renvoyez 5)

```php
function computeClosestToZero(array $ts): int
{
    // Si le tableau est vide, renvoyer 0
    if (empty($ts)) {
        return 0;
    }

    // Initialiser la température la plus proche de zéro à la première valeur du tableau
    $closest = $ts[0];

    // // Parcourir le tableau
    // foreach ($ts as $temperature) {
    //     // Si la différence entre la température actuelle et zéro est plus petite que la différence entre la température la plus proche de zéro et zéro, mettre à jour la température la plus proche de zéro
    //     if (abs($temperature) < abs($closest)) {
    //         $closest = $temperature;
    //     }
    // }

    // foreach ($ts as $temperature) {
    //     // on prend le nombre positif si $temperature est égale au $closest
    //     if (abs($temperature) === abs($closest)) {
    //         $closest = $temperature;
    //     }
    // }

    foreach ($ts as $temperature) {
        if (abs($temperature) <= abs($closest)) {
            $closest = $temperature;
        }
    }

    // Retourner la température la plus proche de zéro
    return $closest;
}

computeClosestToZero([5, 4, 3, 2, 1, -5, -4, -3, -2 ]);
```

Exo : PHP - Système de tri de paquets (tutoriel)

Sélectionner les colis du plus lourd au plus léger.
 
  Règles
Vous travaillez pour une usine autonome qui dispose d'un bras robotique pour déplacer des colis. Le bras peut se déplacer au dessus de chaque tapis roulant pour y attraper un colis et former un tas de colis.

Les colis sont triés par ordre du plus lourd au plus léger sur chaque tapis roulant. Votre objectif est de prendre le colis le plus lourd parmi les 3 tapis pour le déposer sur un tas.

  Implémentation
Implémentez la fonction solve($weight0, $weight1, $weight2) qui prend en argument 3 entiers : $weight0, $weight1 et $weight2. Ces valeurs représentent le poids des colis présents respectivement sur les tapis d'indice 0, 1 et 2. Lorsqu'un tapis est vide, la valeur envoyée est 0.
La fonction doit retourner l'indice du tapis qui contient le colis le plus lourd. Par exemple, si les valeurs pour $weight0, $weight1 et $weight2 sont 85, 100 et 90 alors la réponse attendue est 1. En cas d'égalité, plusieurs bonnes réponses sont possibles.

La fonction solve($weight0, $weight1, $weight2) sera appelée en boucle tant qu'il reste au moins un colis sur l'un des tapis.

```php
function solve($weight0, $weight1, $weight2) {
    if($weight0 >= $weight1 && $weight0 >= $weight2){
        return 0;
    }

    if($weight1 >= $weight0 && $weight1 >= $weight2){
        return 1;
    }

    if($weight2 >= $weight0 && $weight2 >= $weight1){
        return 2;
    }
}

solve(100, 80, 130);
```