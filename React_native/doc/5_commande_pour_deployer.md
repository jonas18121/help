# Quelques commande pour deployer un projet sur play store

- Depuis la racine du projet: exemple my_projet/

    > cd android

maintenant my_projet/android


- Dans le dossier android

    - nettoyer le fichier gradlew

        > gradlew clean

    REMARQUE : désinstaller les anciennes version de l'application, avant de faire les commandes ci-dessous

    - Builder/construire l'application en fichier .apk ou .aap avec mode AR

        > gradlew bundleArRelease

    - Builder/construire l'application en fichier .apk ou .aap sans mode AR

        > gradlew bundleRelease

    - revenir à la racine

        > cd ..

- Depuis la racine du projet

    - Builder/construire l'application en fichier APK, pour le tester sur notre téléphone avant de le mettre dans google play

    en mode AR

    > npx react-native run-android --variant=ArRelease

    sans mode AR

    > npx react-native run-android --variant=Release


### Commande pour voir les logs (journaux) du fichier APK

Après avoir fait l'une des 2 commande ce-dessus, aller la racine du projet et faire la commande ci-dessous

- Voir tout les logs (journaux) 

    > adb logcat

- Voir les logs (journaux) qui on des erreurs

    > adb logcat *:E