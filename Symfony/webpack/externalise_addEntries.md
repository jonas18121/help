# Déplacer les appels à .addEntry() dans des fichiers séparés et les inclure dans le fichier webpack.config.js

Dans Webpack Encore de Symfony, vous pouvez tout à fait déplacer les appels à .addEntry() dans des fichiers séparés et les inclure dans le fichier webpack.config.js. Cela permet de rendre votre configuration plus lisible et modulaire, surtout si vous avez de nombreuses entrées.

Voici comment procéder :

## Étape 1 : Créer un Fichier pour les Entrées

Créez un fichier, par exemple `entries.js`, qui contiendra toutes vos méthodes `.addEntry()`.

Dans `entries.js`
```js
module.exports = function (Encore) {
    Encore
        .addEntry('app', './assets/app.js')
        .addEntry('admin', './assets/admin.js')
        .addEntry('login', './assets/login.js');
};
```

## Étape 2 : Importer les Entrées dans webpack.config.js

Dans le fichier `webpack.config.js`, importez le fichier des entrées et appelez-le en lui passant l'objet `Encore`.

Dans `webpack.config.js`
```js
const Encore = require('@symfony/webpack-encore');

// Chargement des entrées depuis un fichier séparé
const loadEntries = require('./entries.js');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableSassLoader()
    .autoProvidejQuery();

// Appel des entrées
loadEntries(Encore);

module.exports = Encore.getWebpackConfig();
```

## Étape 3 : Modulariser Plus d’Entrées

Si vous voulez organiser encore plus vos entrées, vous pouvez créer plusieurs fichiers d’entrées et les importer dans `webpack.config.js`.

Exemple avec Plusieurs Fichiers

Créez un fichier `entries/frontend.js`

```js
module.exports = function (Encore) {
    Encore
        .addEntry('home', './assets/frontend/home.js')
        .addEntry('contact', './assets/frontend/contact.js');
};
```

Créez un fichier `entries/backend.js`

```js
module.exports = function (Encore) {
    Encore
        .addEntry('dashboard', './assets/backend/dashboard.js')
        .addEntry('settings', './assets/backend/settings.js');
};
```

Importez-les dans `webpack.config.js` :

```js
const loadFrontendEntries = require('./entries/frontend.js');
const loadBackendEntries = require('./entries/backend.js');

loadFrontendEntries(Encore);
loadBackendEntries(Encore);
```

## Points Importants :

1. **Modularité :** En séparant les entrées, vous simplifiez la maintenance de votre configuration Webpack.

2. **Repasser l’Objet Encore :** Assurez-vous que chaque fichier reçoit l'objet `Encore` comme paramètre pour pouvoir appeler `.addEntry()`.

3. **Autres Configurations :** Vous pouvez appliquer la même approche pour d'autres parties de la configuration Webpack (comme les alias, les plugins, etc.).

Avec cette organisation, votre fichier `webpack.config.js` reste propre et compréhensible, et vous pouvez facilement gérer les entrées dans des fichiers séparés.