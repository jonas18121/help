# Utiliser jQuery avec Webpack Encore dans un projet Symfony

Pour utiliser jQuery avec Webpack Encore dans un projet Symfony, vous devrez effectuer quelques étapes pour configurer correctement votre environnement de développement. Webpack Encore est un outil de génération de bundles JavaScript qui facilite l'intégration de bibliothèques tierces comme jQuery dans votre application Symfony.

Voici comment vous pouvez le faire :

1. Assurez-vous que jQuery est installé :

Vous pouvez inclure jQuery dans votre projet en utilisant npm (Node Package Manager). Ouvrez une console et exécutez la commande suivante pour installer jQuery :

```bash
npm install jquery
```

2. Installez le paquet Webpack Encore (si ce n'est pas déjà fait) :

Si vous n'avez pas encore configuré Webpack Encore, vous pouvez le faire en exécutant la commande suivante à la racine de votre projet Symfony :

```bash
composer require symfony/webpack-encore-bundle
```

3. Configurez Webpack Encore :

Créez un fichier webpack.config.js à la racine de votre projet Symfony (s'il n'existe pas déjà) et configurez-le pour inclure jQuery :

activer .autoProvidejQuery()

```js
// webpack.config.js

const Encore = require('@symfony/webpack-encore');
Encore
    // ...
    .addEntry('app', './assets/js/app.js')
    .autoProvidejQuery()
    // ...
    .configureFilenames({
        // ...
    })
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // ...
;

module.exports = Encore.getWebpackConfig();
```

4. (Facultatif) Utilisez jQuery dans vos fichiers JavaScript :

Dans vos fichiers JavaScript, vous pouvez importer jQuery comme suit :

```js
// assets/js/app.js

const $ = require('jquery');

// Maintenant, vous pouvez utiliser jQuery normalement.
$(document).ready(function() {
    // Votre code jQuery ici
});
```

5. Générez les assets :

Exécutez la commande suivante pour générer les fichiers JavaScript à partir de vos sources :

```bash
yarn encore dev
```

Cela générera les fichiers JavaScript minifiés dans le répertoire public/build/. Vous pouvez également utiliser `yarn encore dev --watch` pour surveiller les modifications de fichiers en temps réel pendant le développement.

6. Incluez le bundle JavaScript dans votre modèle Twig :

Vous pouvez inclure le bundle JavaScript dans votre modèle Twig en utilisant la fonction `encore_entry_script_tags` :

```twig
{{ encore_entry_script_tags('app') }}
```

Avec ces étapes, vous pourrez utiliser jQuery dans votre projet Symfony en utilisant Webpack Encore pour gérer les dépendances JavaScript et les fichiers bundle. Assurez-vous de bien suivre les conventions de nommage et les configurations pour que tout fonctionne correctement.