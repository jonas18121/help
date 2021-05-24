# Expo cli

## Installer Expo

    > npm install -g expo-cli

ou

    > yarn global add expo-cli

## Voir la version de expo

    > expo --version

## Creer un projet avec expo

    > expo init <nom_du_projet>

## démarrer le projet a la fois sur iOS, Android, web

    > expo start

## démarrer le projet a la fois sur iOS, Android, web

    > yarn start

ou 

    > npm start

## démarrer le projet seulement sur Android 

    > yarn android

ou 

    > npm android

## démarrer le projet seulement sur iOS

    > yarn ios

ou 

    > npm ios


## démarrer le projet seulement sur le Web

    > yarn web

ou 

    > npm web

## Netoyer le cache et redémarrer

    > expo r -c


## Installer expo-constants

    > expo install expo-constants

## Installer expo-font

    > expo install expo-font


## Installer AsyncStorage

Site : https://docs.expo.io/versions/latest/sdk/async-storage/

    > expo install @react-native-async-storage/async-storage

###  Pour l'importer :

Site : https://react-native-async-storage.github.io/async-storage/docs/usage/

    import AsyncStorage from '@react-native-async-storage/async-storage';

## Installer Google auth

    > expo install expo-google-app-auth

### Pour l'importer

    import * as Google from 'expo-google-app-auth';

## Installer la permission pour la geolocalisation

    > expo install expo-permissions

###  Pour l'importer :

    import * as Permissions from 'expo-permissions';