## Erreur DataTable initialisation

### Question

```txt
Dans un projet Symfony utilisant webpacke encore,

par rapport aux DataTable, 

la première affichage de la page tout ce passe bien.

par contre lorsqu'on click sur le bouton chercher d'un formulaire pour filtrer un tableau, larche se recharge et il retourne cette erreur dans une popup :

DataTables warning: table id=datatable - Cannot reinitialise DataTable. For more information about this error, please see https://datatables.net/tn/3
```

### Erreur DataTables warning: table id=datatable - Cannot reinitialise DataTable

Si vous avez une erreur : 
`DataTables warning: table id=datatable - Cannot reinitialise DataTable. For more information about this error, please see https://datatables.net/tn/3` 

Elle se produit lorsque vous essayez d'initialiser une instance de DataTable sur une table qui est déjà initialisée. <br>
En d'autres termes, votre script tente de réinitialiser la DataTable après le rechargement de la table suite à la recherche.

Voici les étapes pour corriger ce problème dans votre projet Symfony utilisant Webpack Encore :

### 1. Vérifier si la DataTable est déjà initialisée

Avant d'initialiser DataTable, vérifiez si elle est déjà initialisée sur l'élément HTML.<br>
Vous pouvez utiliser la méthode `$.fn.DataTable.isDataTable` pour éviter cette erreur.

```js
"use strict";

$(document).ready(function() {
    var tableId = '#datatable';
    
    if (!$.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable({
            // Vos options DataTables
        });
    }
});
```

### 2. Détruire la DataTable avant de la réinitialiser

Si vous devez réinitialiser DataTable après une mise à jour (comme un rechargement AJAX), vous pouvez détruire l'instance existante avant d'en créer une nouvelle. <br>
La méthode `destroy` de DataTables permet de nettoyer les instances précédentes.

```js
"use strict";

$(document).ready(function() {
    var tableId = '#datatable';
    
    // Détruire l'instance existante si elle existe
    if ($.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable().destroy();
    }
    
    // Réinitialiser la DataTable
    $(tableId).DataTable({
        // Vos options DataTables
    });
});
```

### 3. Recharger la table après une recherche

Si le tableau est mis à jour dynamiquement (par exemple avec un appel AJAX après un clic sur le bouton "Rechercher"), assurez-vous de réinitialiser DataTable uniquement après que le contenu HTML de la table ait été mis à jour.

Exemple avec AJAX :

```js
$('#searchButton').on('click', function(event) {
    event.preventDefault();

    // Requête AJAX pour filtrer les données
    $.ajax({
        url: '/chemin-vers-votre-route', // URL de votre recherche
        method: 'GET',
        data: $('#formulaireRecherche').serialize(), // Sérialiser le formulaire
        success: function(response) {
            var tableId = '#datatable';

            // Mettre à jour le contenu du tableau
            $(tableId + ' tbody').html(response);

            // Réinitialiser DataTable
            if ($.fn.DataTable.isDataTable(tableId)) {
                $(tableId).DataTable().destroy();
            }

            $(tableId).DataTable({
                // Vos options DataTables
            });
        },
        error: function(xhr) {
            console.error('Erreur lors du chargement des données.');
        }
    });
});
```

### 4. Références circulaires Webpack Encore et DataTables

Avec Webpack Encore, assurez-vous que les dépendances JavaScript nécessaires pour DataTables sont bien incluses dans votre projet. <br>
Les modules doivent être importés correctement, par exemple :

```js
"use strict";

// Importer jQuery
import $ from 'jquery';

// Importer DataTables
import 'datatables.net';
import 'datatables.net-bs5'; // Ou votre style Bootstrap utilisé
```

Assurez-vous que les styles nécessaires pour DataTables (CSS) sont également inclus dans app.scss ou dans votre fichier CSS principal.

### En résumé

- Utilisez $.fn.DataTable.isDataTable pour vérifier si DataTable est déjà initialisé.
- Si nécessaire, utilisez .destroy() pour réinitialiser l'instance existante.
- Mettez à jour les données de la table après une recherche, puis réinitialisez DataTable.
- Vérifiez que toutes les dépendances (jQuery, DataTables) sont correctement incluses avec Webpack Encore.

En suivant ces étapes, votre problème de réinitialisation de DataTables devrait être résolu.