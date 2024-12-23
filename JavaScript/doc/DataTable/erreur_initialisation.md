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

1. Vérifier si la DataTable est déjà initialisée

Avant d'initialiser DataTable, vérifiez si elle est déjà initialisée sur l'élément HTML.<br>
Vous pouvez utiliser la méthode `$.fn.DataTable.isDataTable` pour éviter cette erreur.

```js
$(document).ready(function() {
    var tableId = '#datatable';
    
    if (!$.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable({
            // Vos options DataTables
        });
    }
});
```