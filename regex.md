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