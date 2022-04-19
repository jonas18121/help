# regex pour mot de passe



#### Au moins huit caractères, au moins une lettre et un chiffre :

    "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"


#### Au moins huit caractères, au moins une lettre, un chiffre et un caractère spécial :

    "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"


#### Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre :

    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"


#### Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial :

    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"


#### Minimum huit et maximum 10 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial :

    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"





    
#### Cette regex appliquera ces règles :

Au moins une lettre majuscule anglaise ,(?=.*?[A-Z])

Au moins une lettre anglaise minuscule, (?=.*?[a-z])

Au moins un chiffre, (?=.*?[0-9])

Au moins un caractère spécial, (?=.*?[#?!@$%^&*-])

Minimum huit de longueur .{8,}(avec les ancres)


    ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$

## Regex pour la date avec les années bissextiles

exemple : dd/mm/yyyy, dd-mm-yyyy ou dd.mm.yyyy

    ^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$