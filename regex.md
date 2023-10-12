# regex pour mot de passe



#### Au moins huit caractères, au moins une lettre et un chiffre :
```js
^(?=.*[A-Za-z])(?=.*\d).{8,}$
```


#### Au moins huit caractères, au moins une lettre, un chiffre et un caractère spécial :
```js
^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$
```

#### Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre :
```js
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
```


#### Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial :
```js
^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
```


#### Minimum huit et maximum 10 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial :
```js
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,10}$
```

    
#### Cette regex appliquera ces règles :

Au moins une lettre majuscule anglaise ,(?=.*?[A-Z])

Au moins une lettre anglaise minuscule, (?=.*?[a-z])

Au moins un chiffre, (?=.*?[0-9])

Au moins un caractère spécial, (?=.*?[#?!@$%^&*-])

Minimum huit de longueur .{8,}(avec les ancres)

```js
^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
```

## Regex pour la date avec les années bissextiles

Exemple : dd/mm/yyyy, dd-mm-yyyy ou dd.mm.yyyy
```js
    ^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$
```

## Regex pour Téléphone français

Site : https://regex101.com/r/dsi0Pw/2

Exemple de format autorisé : 06 01 02 03 04 ou +33 6 01 02 03 04 ou 0033 7 01 02 03 04 ou 0601020304 ou 0601-02-03-04
```js
    ^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$
```

Exemple de format autorisé : 0701010101 ou +33701010101 et pas de numéro commençant par 08 ou +338,
```js
    ^(?:(?:\+|00)33|0)[12345679](?:\d{2}){4}$
```

## Accepter les accents, les chiffres, les espaces et les virgules, point, tirets underscore en regex


Pour accepter les accents, les chiffres, les espaces et les virgules, point, tirets underscore en regex en PHP, vous pouvez utiliser la regex suivante :

```php
/^[\p{L}\p{N}\s,.-_]+$/u
```

Cette regex accepte une chaîne de caractères composée uniquement de lettres, de chiffres, d'espaces, de virgules, de points, de tirets et d'underscore. Les caractères accentués sont acceptés car la classe \p{L} est utilisée. Les chiffres sont acceptés car la classe \p{N} est utilisée. Les espaces, les virgules, les points, les tirets et les underscores sont acceptés car ils sont inclus dans la classe \w.

Voici un exemple de code qui utilise cette regex :

```php
$regex = '/^[\p{L}\p{N}\s,.-_]+$/u';

$string = 'Ceci est une chaîne avec des accents, des chiffres, des espaces, des virgules, des points, des tirets et des underscores';

if (preg_match($regex, $string)) {
    echo 'La chaîne contient des accents, des chiffres, des espaces, des virgules, des points, des tirets et des underscores';
} else {
    echo 'La chaîne ne contient pas d\'accents, de chiffres, d\'espaces, de virgules, de points, de tirets ou d\'underscores';
}
```

Ce code affichera la sortie suivante :

La chaîne contient des accents, des chiffres, des espaces, des virgules, des points, des tirets et des underscores

Vous pouvez également utiliser la regex suivante :

```php
/^[a-zA-ZÀ-ÖØ-ÿœŒ0-9,.-_]+$/u
```

Cette regex est équivalente à la première, mais elle utilise des plages de caractères au lieu des classes de caractères.

En résumé, pour accepter les accents, les chiffres, les espaces et les virgules, point, tirets underscore en regex en PHP, vous pouvez utiliser les classes de caractères suivantes :

- \p{L} pour les lettres, y compris les caractères accentués
- \p{N} pour les chiffres
- \s pour les espaces et la ponctuation
- \w pour les caractères alphanumériques, y compris les caractères accentués


## Les classes de caractères abrégées ou prédéfinies


| Classe abrégée |	Description                                                                                             |
| :------------: | :------------------------------------------------------------------------------------------------------- |
| \w	         | Représente tout caractère de « mot » (caractère alphanumérique + tiret bas). Équivalent à [a-zA-Z0-9_]   |
| \W	         | Représente tout caractère qui n’est pas un caractère de « mot ». Equivalent à [^a-zA- Z0-9_]             |
| \d	         | Représente un chiffre. Équivalent à [0-9]                                                                |
| \D	         | Représente tout caractère qui n’est pas un chiffre. Équivalent à [^0-9]                                  |
| \s	         | Représente un caractère blanc (espace, retour chariot ou retour à la ligne)                              |
| \S	         | Représente tout caractère qui n’est pas un caractère blanc                                               |
| \t	         | Représente une espace (tabulation) horizontale                                                           |
| \v	         | Représente une espace verticale                                                                          |
| \n	         | Représente un saut de ligne                                                                              |