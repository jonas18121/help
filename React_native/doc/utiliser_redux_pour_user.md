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

- `requestUser.js` = Le fichier qui va recevoir les requêtes uniquement de la table User

- `redux/` = Le dossier qui va recevoir notre logique pour utiliser `Redux`


- `actions` = Dossier qui contiendra les fichiers d'`actions` et les fichiers de `types d'action` de chaque table

- `users` = Dossier qui contiendra le fichier d'`actions` et le fichier de `types d'action` de la table user uniquement

- `actionUser.js` = Dans ce fichier il y a les types d'actions et les données à retourner pour chaque type d'action ( pour la table user uniquement ) 

- `actionTypeUser.js` = Ce fichier regroupe tous les types d'actions ( pour la table user uniquement ) 



- `reducers/` = Le dossier qui va recevoir tous les reducers de chaque table présent dans le backend

- `rootReducer.js` = Ce fichiers qui va regrouper tous nos `reducers`. On va importer nos `reducers` dans `rootReducer.js` et c'est via `rootReducer.js` que le fichier `store.js` va communiquer avec les `reducers`.

- `reducerUser.js` = Ce fichier représentera le `reducer` de la table user uniquement. Il executera certaines fonctions et retounera certaines valeurs `en fonction du type d'action qu'il va recevoir`



- `selectors` = Le dossier qui va recevoir tous les selector de chaque table présent dans le backend

- `selectorsUser.js` = Le fichier qui va regrouper des fonctions qui vont prendre comme paramètre le `store` et renvoie une partie du `state` ( pour la table user uniquement ) . par exemple la fontion `selectorGetOneUser()` permet d'afficher un utilisateur

- `store.js` = Ce fichier communique à la fois avec la `View` (grace au `Providers` présent dans `App.js`) et à la fois avec les `reducers` (grace à la fonction `combineReducers` présent dans `rootReducer.js`). `store.js` aura toute les mises à jour du `state` pour les transmettre à la `View`.



## Le code

- En ligne de commande, on installe `redux` et `react-redux`

    > npm install redux react-redux

ou

    > yarn add redux react-redux


### Dans `store.js`

- On importe `createStore` depuis `redux`

- On importe `rootReducer` depuis le fichier './reducers/rootReducer', pour mettre `rootReducer` à la racine

- `createStore(rootReducer)`, on exporte `createStore` avec `rootReducer` comme paramètre, pour que le `store` puisse communiquer avec les différents reducers

- Pour ce servir de ce store dans toutes l'application, on va l'intégré à la racine de notre application dans `App.js`

Dans `store.js`


    import { createStore } from 'redux';
    import rootReducer from './reducers/rootReducer';

    export default createStore(rootReducer);




### Dans App.js

- On va importé `Provider` depuis la librairie `react-redux`

- On importe notre `store` depuis le dossier ou on là créer

- On va englober (wrapper) toutes notre application avec le composant `Provider` et on lui passe en `props` notre `store`

    < Provider store={store}>

- maintenant on va s'occuper du reducer, aller dans `reducerUser.js`

Dans `App.js`

    import React, { useState, useEffect } from 'react';
    import { StyleSheet, Text, View, StatusBar } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import * as Font from "expo-font";
    import { renderIntialScreen } from './src/tools/helpers';
    import { Provider } from 'react-redux';

    // dossier redux
    import store from './src/redux/store';

    //screen
    import RegisterScreen from './src/screens/RegisterScreen';
    import LoginScreen from './src/screens/LoginScreen';
    import PasswordResetScreen from './src/screens/PasswordResetScreen';
    import ConfirmPasswordScreen from './src/screens/ConfirmPasswordScreen';
    import ChooseConnexionScreen from './src/screens/ChooseConnexionScreen';
    import HomeMapScreen from './src/screens/HomeMapScreen';

    // screen profile
    import ProfileGalerieScreen from './src/screens/profile/ProfileGalerieScreen';
    import ProfileContactScreen from './src/screens/profile/ProfileContactScreen';
    import ProfileWallkiesScreen from './src/screens/profile/ProfileWallkiesScreen';
    import ProfileSettingScreen from './src/screens/profile/ProfileSettingScreen';



    const { Navigator, Screen } = createStackNavigator();

    export default function App() {

        const [ loading, setLoading ] = useState(true);

        const [initialScreen, setInitilaScreen] = useState("ChooseConnexion");

        const loadFont = async () => {
            try {
            
                await Font.loadAsync({
                    "Roboto-Regular":       require('./assets/fonts/Roboto-Regular.ttf'),
                    "Roboto-Black":         require('./assets/fonts/Roboto-Black.ttf'),
                    "Roboto-BlackItalic":   require('./assets/fonts/Roboto-BlackItalic.ttf'),
                    "Roboto-Bold":          require('./assets/fonts/Roboto-Bold.ttf'),
                    "Roboto-BoldItalic":    require('./assets/fonts/Roboto-BoldItalic.ttf'),
                    "Roboto-Italic":        require('./assets/fonts/Roboto-Italic.ttf'),
                    "Roboto-Light":         require('./assets/fonts/Roboto-Light.ttf'),
                    "Roboto-LightItalic":   require('./assets/fonts/Roboto-LightItalic.ttf'),
                    "Roboto-Medium":        require('./assets/fonts/Roboto-Medium.ttf'),
                    "Roboto-MediumItalic":  require('./assets/fonts/Roboto-MediumItalic.ttf'),
                    "Roboto-Thin":          require('./assets/fonts/Roboto-Thin.ttf'),
                    "Roboto-ThinItalic":    require('./assets/fonts/Roboto-ThinItalic.ttf')
                });

                const screen = await renderIntialScreen();
                if(screen) setInitilaScreen(screen);

                setLoading(false);
            
            } catch (error) {
                console.log('erreur', error);
            }
        }

        useEffect(() => {
            // StatusBar.setHidden(true);
            StatusBar.setBackgroundColor(styles.statusbar.backgroundColor)
            loadFont();
        }, []);

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text>loading...</Text>
                </View>
            )
        }



        return (
        
            <Provider store={store}>
                <NavigationContainer>
                    <Navigator 
                        screenOptions={{ headerShown: false }}
                        initialRouteName={initialScreen}
                    >

                        <Screen 
                            name="ChooseConnexion" 
                            component={ChooseConnexionScreen} 
                            options={{ headerShown: false }}
                        />

                        <Screen 
                            name="Login" 
                            component={LoginScreen} 
                            options={{ headerShown: false }}
                        />

                        <Screen 
                            name="Register" 
                            component={RegisterScreen} 
                            options={{ headerShown: false }}
                        />

                        <Screen 
                            name="PasswordReset" 
                            component={PasswordResetScreen} 
                            options={{ headerShown: false }}
                        />

                        <Screen 
                            name="ConfirmPassword" 
                            component={ConfirmPasswordScreen} 
                            options={{ headerShown: false }}
                        />

                        <Screen 
                            name="ProfileGalerie" 
                            component={ProfileGalerieScreen} 
                        />

                        <Screen 
                            name="ProfileContact" 
                            component={ProfileContactScreen} 
                        />

                        <Screen 
                            name="ProfileWallkies" 
                            component={ProfileWallkiesScreen} 
                        />

                        <Screen 
                            name="ProfileSetting" 
                            component={ProfileSettingScreen} 
                        />

                        <Screen 
                            name="HomeMap" 
                            component={HomeMapScreen} 
                        />
                    </Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: Constants.statusBarHeight
        },
        statusbar: {
            backgroundColor: "#171628",
        }
    });



### Dans reducerUser.js

- `export const reducerUser = (state = defaultState, action)` Pour rappel un réducer est une fonction qui prend comme paramètre le `state` et l'`action` qui sera émise. 

- Selon l'`action` qui sera émise, le reducer retournera un nouveau `state`

- `reducerUser` Ce reducer va traité uniquement les actions pour la table de `User.php`

- On importe nos types d'action, qu'on va créer dans le fichier `src/redux/actions/users/actionsTypeUser.js`

- On importe nos requêtes, qu'on va créer dans le fichier `src/api/users/requestUser.js`

- `const defaultState = [];` Pour le reducer, il faut obligatoirement un `state par défaut`, donc on le crée avec comme valeur un tableau vide


- En deuxième argument de `reducerUser()` nos action seront représenté en tant qu'objet avec comme propriété : `type` (type d'action) et `payload` (les données)  
    
    `action = {type: NOM_ACTION, payload}`

- `switch (action.type)` va vérifié quel type d'action on lui a passer pour aller dans la bonne `case`

- `switch ()` doit retourner par défaut, le `state` :  `default: return state;`

#### Exemple

Si le type d'action est `UPLOAD_IMAGE_FOR_USER` le `switch (action.type)` va aller dans la `case`, `case UPLOAD_IMAGE_FOR_USER:` et va exécuter la fonction `requestUploadImageForUser()`

La fonction `requestUploadImageForUser()` va prendre ses arguments depuis une fonction `action` précise

La `case`, `case UPLOAD_IMAGE_FOR_USER:` retourne `null` car dans la fonction `requestUploadImageForUser()`, (après que la logique de téléchargement d'image sera faite), on va appeler l'action `GET_ONE_USER:` qui devra retourner les données de l'user courant avec sa nouvelle image de profile

Dans `reducerUser.js`

    import { 
        GET_ONE_USER, 
        CHECK_USER,
        UPLOAD_IMAGE_FOR_USER,
        LOGIN_USER   
    } from '../actions/users/actionsTypeUser';
    import { 
        requestUploadImageForUser,
        requestChekUser,
        requestLoginUser 
    } from '../../api/users/requestUser';

    const defaultState = [];

    export const reducerUser = (state = defaultState, action) => {


        //action = {type: NOM_ACTION, payload}
        switch (action.type) {

            case GET_ONE_USER:
                return action.payload

            case UPLOAD_IMAGE_FOR_USER:
                requestUploadImageForUser(action.payload.fromData, action.payload.user, action.payload.dispatch);
                return null;

            case CHECK_USER:    
                requestChekUser(action.props, action.payload.dispatch);
                return null;

            case LOGIN_USER:
                requestLoginUser(action.payload.pseudo, action.payload.password, action.payload.props, action.payload.dispatch);
                return null;

            default:
                return state;
        }
    } 


### Dans `rootReducer.js`

- On importe notre reducer `reducerUser.js`

- On importe `combineReducers` depuis `redux`, pour combiner tous nos reducers 

- On exporte `combineReducers` qui prend en paramètre un objet, c'est la qu'on va mettre nos reducers, comme le `store` pourra communiquer avec eux

Dans `rootReducer.js`


    import { reducerUser } from './reducerUser';
    import { combineReducers } from 'redux';


    export default combineReducers({
        reducerUser: reducerUser,
    });


### Dans `actionsTypeUser.js`

- On va créer et exporter des constantes pour plus de facilité en écrivant le string des actions de la table de `User.php` dans un seul endroit

Dans `actionsTypeUser.js`


    export const GET_ONE_USER = 'GET_ONE_USER';

    export const CHECK_USER = 'CHECK_USER';

    export const UPLOAD_IMAGE_FOR_USER = 'UPLOAD_IMAGE_FOR_USER';

    export const LOGIN_USER = 'LOGIN_USER';



### Dans `actionUser.js`

- On va importer nos type d'action depuis le fichier `actionsTypeUser.js`

- Nos action seront représenté en tant qu'objet avec comme propriété, `type` (type d'action) et `payload` (les données) 

    `exemple : action = {type: NOM_ACTION, payload: data}`

- On crée nos `action` pour la table de `User.php`

- Chaque `action` aura une propriété `type` précis

- Les différentes données qui seront dans la propriété `payload` viendront depuis le `screen` car les actions seront appeler dans une fonction `dispatch()` dans le `screen`

- A la différence des autre fonction `action`(qui sont appeler depuis le `screen`), la fonction `action`, `actionGetOneUser(user)`, lui pourra être appeler dans les différentes requête des autre `action` comme il retourne uniquement un user

- Maintenant, on va aller creer nos requête pour la table de `User.php`, dans `src/api/users/requestUser.js`

Dans `actionUser.js`

    import { 
        GET_ONE_USER, 
        CHECK_USER,
        UPLOAD_IMAGE_FOR_USER,
        LOGIN_USER 
    } from './actionsTypeUser';

    //exemple : action = {type: NOM_ACTION, payload: data}


    export const actionGetOneUser = (user) => ({
        type: GET_ONE_USER,
        payload: {
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            phone: user.phone,
            dateCreatedAt: user.dateCreatedAt,
            updatedAt: user.updatedAt,
            fileUrl: user.fileUrl
        }
    });

    export const actionUploadImageForUser = (fromData, user, dispatch) => ({
        type: UPLOAD_IMAGE_FOR_USER,
        payload: {
            fromData: fromData,
            user: user,
            dispatch: dispatch
        }
    });

    export const actionCheckUser = (props, dispatch) => ({
        type: CHECK_USER,
        payload: {
            props: props,
            dispatch: dispatch
        }
    });

    export const actionLoginUser = (pseudo, password, props, dispatch) => ({
        type: LOGIN_USER,
        payload: {
            pseudo: pseudo,
            password: password,
            props: props,
            dispatch: dispatch
        }
    });


Dans `requestUser.js`

- Ici on va mettre toutes nos requête pour la table de `User.php`

- On importe tous ce qu'on a besion pour executer nos requête, sans oublier certaine action comme `actionGetOneUser` pour retouner un utilisateur (l'user courant),

- On cree nos fonctions `requêtes` qui seront executer seulement s'il on a mis les bons type d'action qui sont relié a ces fonctions `requêtes` dans la fonction `reducer` (`reducerUser()`)

- Les fonctions `requêtes` vont prendre leur paramètres depuis la fonction `reducer` (`reducerUser()`), qui lui même a récupéré ces paramètres depuis les fonctions `action` qui les ont reçu depuis le `screen` (écran/page)

Dans `requestUser.js`

    import axios from 'axios';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { BASE_URL } from '../../tools/helpers';
    import { Buffer } from "buffer";
    import { actionGetOneUser, actionCheckUser } from '../../redux/actions/users/actionsUser'


    /**
    * 
    * fait une réquête pour envoyer une image depuis le front vers le back
    * puis appel l'action actionGetOneUser() pour mettre à mise a jour, les données de l'utilisateur dans le store 
    *   
    */
    export const requestUploadImageForUser = async (fromData, user, dispatch) => {

        try {
            
            const tokenStorage = await AsyncStorage.getItem('token');
        
            const response = await axios.post(`${ BASE_URL }/api/users/${ user.id }/image`, fromData, {
                headers: {
                    'Accept' : '*/*',
                    'Content-type' : 'multipart/form-data',
                    'Authorization' : `Bearer ${tokenStorage}`
                }
            })

            // console.log('reponse de la requête postes image', response.data);
        
            dispatch(actionGetOneUser(response.data));

        } catch (error) {
            console.error(`Erreur de la requête pour upload une image pour un utilisateur : ${error}`);
        }
    }


    /**
    * fait une réquête pour recupèrer l'user qui est dans le storage du mobile, 
    * puis le cherche en bdd
    * puis appel l'action actionGetOneUser() pour mettre à mise a jour, les données de l'utilisateur dans le store
    */
    export const requestChekUser = async (props, dispatch) => {

        const userStorage = await AsyncStorage.getItem('user');
        const userCurrent = JSON.parse(userStorage);

        if(!userCurrent.email){
            props.navigation.navigate('Login');
        }

        await fetch(`${ BASE_URL }/api/users/${ userCurrent.id }`, {
            method: 'get',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        })
        .then((response) => response.json())
        .then(async (responseJsonUser) => {

            dispatch(actionGetOneUser(responseJsonUser));
        })
        .catch((error) => console.error(`Erreur de la requête pour check un utilisateur dans le storage du mobile pour le rechercher en bdd : ${error}`));
    }


    /**
    * fait une réquête pour que l'utilisateur se connecte à l'application, 
    * puis on stocke les données de l'utilisateur + son token dans le storage de son mobile
    */
    export const requestLoginUser = async (pseudo, password, props, dispatch) => {

        //il faut l'addresse ip de votre ordinateur (172.27.224.1) à la place (de localhost et de 127.0.0.1) 
        // ou le LAN que expo affiche après avoir fait expo start exp://192.168.43.175:19000 => 192.168.43.175
        await fetch(`${ BASE_URL }/api/login_check`, {
            method: 'post',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                username:   pseudo, 
                password:   password,
            }) 
        })
        .then((response) => response.json())
        .then(async (responseJson) => {

            await AsyncStorage.setItem('token', responseJson.token);

            // décoder le token en 3 parties
            const parts = responseJson.token.split('.').map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'),'base64').toString());

            // on met en storage la partie qui nous intéresse
            await AsyncStorage.setItem('user', parts[1]);

            await dispatch(actionCheckUser(props, dispatch));

            if(parts){
                props.navigation.navigate('HomeMap');
            } 
        })
        .catch((error) => console.error(error));
    }