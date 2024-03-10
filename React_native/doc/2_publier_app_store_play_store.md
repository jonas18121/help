# Publier une application sur l'App Store et le Play Store

Les étapes sont : 

1) configurer app.json

2) Lancer la compilation de l'application en mode production

    > expo build:android

    > expo build:ios

3) Vérifier la progression de la complation

    > expo build:status

4) Télécharger l'application Android et Ios grace aux liens fournis par la commande précédente

5) Tester son application en mode production

6) Publier son application sur le Play Store et l'App Store

## 1) configurer app.json

### Dans app.json

- `"name": "Wallky",` on met un nom à notre application

- `"slug": "Wallky-EDGCO",` , on met un slug unique a notre application (faire attention n'a pas le même slug que d'autre application)

- `"version": "1.0.0",` Le numéro de la version, Le jour ou on va publier une nouvelle version on va incrémenter le numéro de la version, exemple : "1.0.1"

- `"icon": "./assets/icon.png",` Si on veut changer l'icon, ce sera dans le dossier asset

- `"splash":` c'est l'écran qui apparait lors de l'ouverture de l'application, Si on veut changer l'image, ce sera dans le dossier asset

- Dans `"ios"` on va rajouter `"bundleIdentifier"` en valeur on va lui donner `com.yourcompanyoryourname.yourappname` : `"bundleIdentifier": "com.edgco.wallky"`

- Pareil pour `"android":` : `"package": "com.edgco.wallky"`

Dans `app.json`

    {
    "expo": {
        "name": "Wallky",
        "slug": "Wallky-EDGCO",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "splash": {
            "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "assetBundlePatterns": [
            "**/*"
        ],
            "ios": {
                "bundleIdentifier": "com.edgco.wallky"
                "supportsTablet": true
        },
        "android": {
            "package": "com.edgco.wallky"
            "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#FFFFFF"
            }
        },
        "web": {
            "favicon": "./assets/favicon.png"
        }
    }
    }

## 2) Lancer la compilation de l'application en mode production


### Android

En ligne de commande, on met la commande ci dessous pour android

    > expo build:android

La première fois que l'on va lancer cette application expo va nous demander ce qu'on va faire avec le certificat unique 

un certificat pour une application android est très important, c'est ça qui va permettre au play store d'identifier l'application

si on perd le certificat , on peut toujours faire une demande à google via le play store pour regénérer un nouveau certificat

Le plus simple est le laisser expo géré ce certificat en tapant sur entrer sans rien ajouter



### IOS

ATTENTION : Il faut un compte Apple Developer (99€ par an) pour pouvoir lancer la compilation de l'application iOS.

Puis en ligne de commande, on met la commande ci dessous pour ios

    > expo build:ios

Lors de la première exécution de cette commande, Expo demandera d'identifier avec le compte Apple Developer. 
Ensuite on peux toujours sélectionner "Let Expo handle it for me".

Une fois la compilation terminée, on pourra télécharger l'application grâce à l'URL fournie par la commande


## 3) Vérifier la progression de la complation et 4) Télécharger l'application Android et Ios grace aux liens fournis par la commande précédente

Tape la commande ci dessous pour voir la progession de la complation

    > expo build:status

pour une meilleur visibilité, on peut copier coller, l'url qui sera retourne dans le terminale

expo compile l'application sur son serveur et à la fin ou pour télécharger notre application grace au bouton download

pour Android c'est un fichier .apk

Pour iOS, la procédure est exactement la même. Mais cette fois on téléchargera un fichier  .ipa.


## 5) Tester son application en mode production

### Android

lorsque notre application est bien télécharger, on peut simplement faire un drag and drop du fichier télécharger jusqu'a l'émulateur.

Puis on pourra l'ouvrir et le tester dans l'émulateur

## 6.1) Publier son application sur le Play Store

Site : https://developer.android.com/distribute/console

Rendez-vous sur google play store pour devepoppeur, 

- il faudrat s'inscrire, si on n'a pas encore de compte, 

- il faut payer les frais d'inscription, environ 25 dollars

- puis clicker sur le bouton `CREATE APPLICATION`, on donne un nom a l'application 

- pour la partie administration, il faudra remplir plusieurs formulaire, `Store listing`, `Content rating`, `App content` et `Pricing & distribution`

- pour la partie dev, on va dans `App releases`, dedans on pourra uploader l'application en `Beta`, en `Alpha` ou en `production`

- Si on uploade l'application en `Beta` ou en `Alpha` ça permettra d'envoyer un liens de l'application par email a quelques personnes qui on un compte google, c'est seulement eux qui pourrons l'utiliser en production

- Si on uploade l'application en `production` tout le monde pourra voir l'application et l'utiliser

- Dans `production`, clic sur le bouton `CREATE RELEASE`, google va demander si on lui laisse géré le certificat, on clic `OPT OUT` puis `I'M SURE, OPT OUT` car on la déjà créer avec expo, 

- puis, on verra un formulaire pour déployer notre application, qu'on devra remplir. c'est la qu'on va uploader notre fichier .apk qu'on a télécharger

- Une fois que tous est remplit ,on clic sur les bouton `SAVE`, puis `PREVIEW` et enfin `START ROLL-OUT TO PRODUCTION `


## 6.2) Publier son application sur l'App Store