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

### Cas 1 : N'accepte pas les tirets entre deux mots
Pour accepter les accents, les chiffres, les espaces et les virgules, point, tirets underscore en regex en PHP, vous pouvez utiliser la regex suivante :

```php
"/^[\p{L}\p{N}\s,.-_]+$/u"
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
"/^[a-zA-ZÀ-ÖØ-ÿœŒ0-9,.-_]+$/u"
```

Cette regex est équivalente à la première, mais elle utilise des plages de caractères au lieu des classes de caractères.

En résumé, pour accepter les accents, les chiffres, les espaces et les virgules, point, tirets underscore en regex en PHP, vous pouvez utiliser les classes de caractères suivantes :

- \p{L} pour les lettres, y compris les caractères accentués
- \p{N} pour les chiffres
- \s pour les espaces et la ponctuation
- \w pour les caractères alphanumériques, y compris les caractères accentués

### Cas 2 : Accepte les tirets entre deux mots

Pour accepter ce genre de texte avec le tiret entre 2 mots comme ceci **123, rue du clochétier-dôme**

Il faut utiliser cette regex :

```php
"/^\d{0,},?\s?[\p{L}\d\s,-_]+$/u"
```

La regex `/^\d{0,},?\s?[\p{L}\d\s,-_]+$/u` est une expression régulière utilisée pour valider une chaîne de caractères, généralement dans le contexte d'une adresse qui peut ou non contenir un numéro de rue

Voici un exemple de code qui utilise cette regex :

```php
$regex = '/^\d{0,},?\s?[\p{L}\d\s,-_]+$/u';

$string = '123, rue du clochétier-dôme';

if (preg_match($regex, $string)) {
    echo 'Accepter';
} else {
    echo 'Refuser';
}
```

1. `^` : C'est une ancre d'expression régulière qui indique le début de la chaîne.

2. `\d{0,}` : Correspond à zéro ou plus de chiffres (0-9). Cela permet d'accepter un numéro de rue optionnel.

3. `,?` : Permet une virgule , optionnelle après le numéro.

4. `\s?` : Permet un espace blanc optionnel après la virgule.

5. `[\p{L}\d\s,-_]+` :

    - `[\p{L}\d\s,-_]+` : C'est une classe de caractères définie par les crochets []. Elle accepte un ou plusieurs caractères qui peuvent être des lettres, des chiffres, des espaces, des virgules, des tirets et des underscores.
    - `\p{L}` : Correspond à n'importe quelle lettre (Unicode).
    - `\d` : Correspond à un chiffre (0-9).
    - `\s` : Correspond à un espace blanc.
    - `,` : Correspond à une virgule.
    - `-_` : Correspond à un tiret ou un trait de soulignement.

6. `$` : C'est une autre ancre d'expression régulière qui indique la fin de la chaîne.

7. `u` : Modificateur Unicode. Il indique à PHP d'interpréter la chaîne comme une chaîne Unicode.

En résumé, cette regex peut être utilisée pour valider des adresses qui peuvent avoir ou non un numéro de rue, et elle permet une variété de caractères dans le nom de la rue, y compris des lettres, des chiffres, des espaces, des virgules, des tirets et des underscores.

### Cas 3 :  exclure les caractères spécifiques listés ("&~"'{-|`_^@)]°=+}<>:;!") 

Pour exclure les caractères spécifiques que vous avez listés **("&~"'{-|`_^@)]°=+}<>:;!")** de la regex tout en permettant les lettres, les chiffres, les virgules, les points, les tirets et les accents sur les voyelles, vous pouvez ajuster la classe de caractères comme suit :

```php
"/^\d{0,},?\s?[a-zA-Z\d\s,.\-'éèêàôûäëïöüç]+$/u"

# OU

"/^\d{0,},?\s?[\p{L}\d\s,.-]+$/u"
```

1. `^\d{1,5},?\s?` : Cela correspond à un nombre d'une à infinit chiffres suivi d'une virgule facultative et d'un espace facultatif.

2. `[a-zA-Z\d\s,.\-'éèêàôûäëïöüç]+` : Cela correspond à un ou plusieurs caractères qui peuvent être des lettres (avec des accents), des chiffres, des espaces, des virgules, des points, des tirets et des apostrophes.

Cette regex exclut les caractères spécifiques que vous avez mentionnés tout en permettant les caractères souhaités dans une adresse. Vous pouvez ajuster cette regex en fonction de vos besoins spécifiques.


## Accepter valider une chaîne de caractères qui peut contenir des lettres (y compris les caractères accentués), des espaces et des tirets (moins), tout en garantissant que la chaîne ne commence ni ne se termine par un tiret

L'expression régulière /^(?!.*-^)(?!.*-$)[\p{L}\s-]+$/ est conçue pour valider une chaîne de caractères qui peut contenir des lettres (y compris les caractères accentués), des espaces et des tirets (moins), tout en garantissant que la chaîne ne commence ni ne se termine par ou un tiret. Voici une explication détaillée de chaque partie de cette expression régulière :

```php
/^(?!.*^-)(?!.*-$)[\p{L}\s-]+$/
```
1. `^` : C'est une ancre qui indique que la correspondance doit commencer au début de la chaîne.

2. `(?!.*^-)` : C'est la première assertion négative qui signifie "ne pas permettre de tiret au début de la chaîne." 
    
    - `(?! ... )`  Il s'agit de la syntaxe d'une assertion négative en expression régulière. Elle spécifie que le texte recherché à l'intérieur de l'assertion négative NE doit PAS être présent dans la chaîne.

    - `.*` Cela correspond à n'importe quel caractère (sauf un saut de ligne) zéro fois ou plus. Il signifie que la chaîne peut contenir n'importe quel texte avant le modèle que nous cherchons à exclure.
    
    - `-` C'est le caractère tiret (moins) littéral. Dans cet exemple, nous cherchons à exclure un tiret en début de chaîne.

    - `^` C'est une ancre qui représente le début de la chaîne.

3. (?!.*-$) : C'est la deuxième assertion négative qui signifie "ne pas permettre de tiret à la fin de la chaîne." 

    - `(?! ... )`  Il s'agit de la syntaxe d'une assertion négative en expression régulière. Elle spécifie que le texte recherché à l'intérieur de l'assertion négative NE doit PAS être présent dans la chaîne.

    - `.*` Cela correspond à n'importe quel caractère (sauf un saut de ligne) zéro fois ou plus. Il signifie que la chaîne peut contenir n'importe quel texte avant le modèle que nous cherchons à exclure.
    
    - `-` C'est le caractère tiret (moins) littéral. Dans cet exemple, nous cherchons à exclure un tiret en fin de chaîne.

    - `$` C'est une ancre qui représente la fin de la chaîne.

4. `[\p{L}\s-]+` : Cela correspond à une ou plusieurs lettres (caractères Unicode), espaces et tirets (moins). 

    - `\p{L}` est la classe de caractères Unicode pour les lettres, 
    
    - `\s` représente un espace 
    
    - `-` est un caractère de tiret. Cette partie de l'expression permet d'accepter des lettres, des espaces et des tirets.

5. `$` : C'est une autre ancre qui indique que la correspondance doit se terminer à la fin de la chaîne.

En résumé, cette expression régulière permet de valider des chaînes de caractères qui peuvent contenir des lettres, des espaces et des tirets, tout en garantissant qu'ils ne commencent ni ne se terminent par ou un tiret. Elle garantit que la chaîne commence et se termine par des lettres, sans tiret au début ou à la fin.

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