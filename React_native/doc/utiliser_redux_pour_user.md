# Utilisation de Redux pour centraliser les données de l'utilisateur lorsqu'il se connecte

## Le comportement de Redux

Voici comment ça va ce passer avec `Redux`

1) La `View`(Le client) va envoyer une `action` au `store`

2) Le `store` va récupère l'`action` et le transmettra au `reducer`

3) Le `reducer` va modifier le `state` en fonction du type d'`action` qu'il a reçu et va renvoyer le state modifier au `store`

4) Le `store` reçois la modification du `state` et le met à jours afin de transmettre la nouvelle version du state à la `View`

## L' archithecture

Cette architecture peut être amléiorer mais c'est une bonne base

    src/

        api/
            users/
                requestUser.js

        redux/

            actions/
                users/
                    actionsTypesUser.js
                    actionsUser.js

            reducers/
                reducerUser.js
                rootReducer.js
            
            selectors/
                selectorsUser.js

            store.js


- `api/` = Le dossier qui va recevoir les requêtes pour communiquer avec le backend

- `users/` = Le dossier qui va recevoir les fichiers pour les requêtes de la table User, 
evidement on va créer un autre dossier pour mettre les requêtes d'une autre table

- `requestUser.js` = Le fichier qui va recevoir les requêtes de la table User

- `redux/` = Le dossier qui va recevoir notre algorithme pour utiliser `Redux`

- `reducers/` = Le dossier qui va recevoir tous les reducers de chaque table présent dans le backend

- `index.js` = Fichiers qui va regrouper tous nos `reducers`. On va importer nos `reducers` dans `index.js` et c'est via `index.js` que le fichier `store.js` va communiquer avec les `reducers`.

- `reducerGetOneUser.js` = Ce fichier qu' on a créer, représentera le `reducer` qui va permettre dé récupéré un utilisateur

- `action.js` = Dans ce fichier il y a les types d'actions et les données à retourner pour chaque type d'action

- `actionType.js` = Ce fichier regroupe tous les types d'actions

- `selectors.js` = Le fichier qui va regrouper des fonctions qui vont prendre comme paramètre le `store` et renvoie une partie du `state`. par exemple la fontion `selectorGetOneUser()` permet d'afficher un utilisateur

- `store.js` = Ce fichier aura toute les mises à jour du `state` pour les transmettre à la `View`