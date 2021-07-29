# projet App

## Ce projet utilise :

- Symfony 4.4 

- Apache/2.4.38 (Debian)

- PHP : 7.4.18

- phpMyAdmin : 5.1.0

- MySQL :  5.7

- Docker : 20.10.6

- Composer : 2.0.12

- React Native : 0.64

- Viro React : 2.7.3


## Instalation du projet en frotend

1) Enter dans le projet react native, charger ses dépendances et le lancer

       > cd mobile/react-native/app

       > npm install

       > expo start

2) Télécharger l’application « Expo » sur son mobile

    - « Expo Go » pour Android
Ou 

    - « Expo Client » pour Ios

3) s'assurer que son mobile et son ordi sont sur la même wifi

4) Avec son mobile et via l’application Expo,  prendre une photo du QR code qui s’affichera dans le terminal après avoir fait « expo start »                                                                       


## Instalation du projet en backend

1) Dans le projet, doublez tous fichiers ` docker-compose.yml.dist`  et `.env.dist` sans le `.dist` 

2) Ouvrir un premier invite de commande (CMD)

3) Accédez au projet dans l'invite de commande (CMD)

4) Entrez la commande ci-dessous pour faire tourner Docker

    > docker-compose up 

    Ou faire tourner Docker en arrière plan

    > docker-compose up -d

5) Ouvrir un deuxième invite de commande (CMD)

6) Accédez au projet dans l'invite de commande (CMD)

7) Entrez la commande ci-dessous pour accéder à git bash dans le projet depuis Docker

    > docker exec -it projet_www bash

8) Entrez la commande ci-dessous pour accéder au projet depuis Docker

    > cd api

9) Entrez la commande ci-dessous pour importer les dépendances du projet depuis Docker

    > composer update