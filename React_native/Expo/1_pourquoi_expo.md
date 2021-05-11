# Pourquoi Expo

site : https://expo.io/

Expo est un framework et une plate-forme pour les applications React universelles. Il s'agit d'un ensemble d'outils et de services construits autour des plates-formes natives et natives de React qui vous aident à développer, créer, déployer et itérer rapidement sur des applications iOS, Android et Web à partir de la même base de code JavaScript / TypeScript.

## 3 environnement de développement en react native 

1) Expo

2) React Native CLI

3) create-react-native-app (CRNA)

## Expo

- Expo est un ensemble d'outil qui vont permettre de faciliter le développement d'application avec `React Native`

- Expo est conseillé pour le développeurs mobiles débutant

- Il permet : le développement locale ( sans Xcode ou Android Studio) avec un serveur Expo

- Il permet : le développement locale avec un déploiement distant (via l'application Expo sur Android/iOS) sur notre téléphone

- Expo fournit un `sdk` qui permet d'accéder au API native

- Il fournit aussi un ensemble de service pour développer ses applications facilement

- Il permet : La publication/déploiement en production

- Lorsqu'on démarre un projet Expo, deux process serveur sont lancés : 

    - Expo Developement Server
    - Expo Native Packager Server

### Expo Developement Server

- Expo permet la communication entre le CLI et l'application expo qui est sur notre téléphone ou simulateur/émulateur

- Il fournit le manifest de l'application (config de l'application)

### Expo Native Packager Server

- Il transpile (transforme) du code JSX en code JS, le tout en un seul fichier

- Il fournit les assets (ressources statiques) tels que : images, fonts, etc.


### Télécharger expo sur le téléphone

allez sur le play store cherchez `expo go`

ou apple store cherchez `expo client`

puis depuis votre application mobile `expo go` ou `expo client`,Scannez le QR code qui s'affiche en ligne de commande après avoir lancez la commande

    > expo start