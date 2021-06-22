# Faire des fonts (polices) personnalisé en RN

1) A la racine du projet créez un dossier nommé `assets/fonts`

2) Dans le dossier `assets/fonts`, mettre les fichiers `.ttf`, qui représentes les diférents fonts, 
vous pouvez récupérer fichiers `.ttf` a cette adresse : https://fonts.google.com/

3) Toujours à la racine du projet, créez un fichier nommé `react-native.config.js`

4) Dans `react-native.config.js`, mettre ce qui est en dessous, la `assets` a comme valeur le chemin de nos fichier font

    module.exports = {
        assets: ['./assets/fonts']
    }

5) Grace à `react-native.config.js`, lorsqu'on va exécuter la commande en CLI ci-dessous, ça va lier le projet avec les fichiers qui sont dans `assets/fonts`

    > npx react-native link  

7) exécuter les commande pour faire tourner le projet sur `android` ou `IOS`

8) Dans le `css` des compsants `Text`, mettre juste le nom fichier font qu'on veut utiliser (sans l'extention)

Exemple : 

On a ce fichier `assets/fonts/Roboto-Thin.ttf`, dans le dossier,

Dans le `css` des compsants `Text`, mettre `fontFamily: "Roboto-Thin"`

    css_de_mon_Text: {
        fontSize: 18,
        fontFamily: "Roboto-Thin",
        textAlignVertical: "center",
    }

Bravo !!!