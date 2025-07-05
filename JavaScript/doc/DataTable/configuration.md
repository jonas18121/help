# Configuration DataTable

## Configuration de base complète de DataTables en JavaScript

### Exemple Complet : Configuration DataTable

```js
$(document).ready(function () {
    $('#monTableau').DataTable({
        // 🔽 Détermine l'agencement des éléments d'interface
        dom: 'Blfrtip', // B = Buttons, l = changing input control, f = filter, r = processing, t = table, i = info, p = pagination

        // 📦 Charge les boutons d'export (Copier, Exporter en CSV, Exporter en Excel, Exporter en PDF, Imprimer)
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],

        // 🔢 Définit le nombre d’éléments visibles par page
        pageLength: 10,

        // 📑 Définit le menu déroulant pour changer le nombre de lignes
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Tout"]],

        // 🔄 Active le tri par colonne
        ordering: true,

        // 🔎 Active la barre de recherche globale
        searching: true,

        // 📝 Personnalise les colonnes (ex : rendre certaines non triables)
        columnDefs: [
            {
                targets: 'no-sort', // classe CSS sur les colonnes à désactiver
                orderable: false // Applique à toutes les colonnes
            },
            {
                width: '100px', // largeur fixe
                targets: '_all' // sur toutes les colonnes
            }
        ],

        // Laisse DataTables deviner les tailles — souvent déséquilibré si le contenu est variable.
        autoWidth: true,

        // 🌍 Localisation (optionnel - ici en français)
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/fr-FR.json"
        }
    });
});
```

#### Possible personnalisation de configuration de bouton d'export

```js
buttons: [
  {
    extend: 'csv',
    text: 'Exporter CSV',
    className: 'btn btn-secondary'
  },
  {
    extend: 'pdf',
    text: 'Télécharger PDF',
    className: 'btn btn-danger',
    orientation: 'landscape',
    pageSize: 'A4'
  }
]
```

#### Décryptage de 'Blfrtip'

| Lettre | Élément UI affiché               | Description                                                                   |
| ------ | -------------------------------- | ----------------------------------------------------------------------------- |
|    B   | Buttons (export, print, etc.)    | Nécessite l’extension Buttons. Affiche les boutons comme copy, csv, pdf, etc. |
|    l   | Length changing input control    | Le menu déroulant pour choisir combien de lignes afficher (10, 25, 50, etc.)  |
|    f   | Filtering input (search box)     | Le champ de recherche (recherche globale sur toutes les colonnes)             |
|    r   | Processing display element       | Affiche un message de "chargement en cours..." si le traitement est long      |
|    t   | The table itself                 | Le tableau HTML en lui-même                                                   |
|    i   | Table information summary        | Infos comme "Affichage de l’entrée 1 à 10 sur 50 entrées"                     |
|    p   | Pagination control               | Affiche les boutons de pagination (1, 2 3...)                                 |

#### Explication des principaux paramètres

| Option        | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| dom           | Structure de la disposition des éléments (boutons, recherche, pagination, etc.)           |
| buttons       | Active les boutons d’exportation (nécessite l’extension Buttons)                          |
| pageLength    | Nombre de lignes affichées par défaut                                                     |
| lengthMenu    | Menu déroulant permettant à l'utilisateur de choisir combien de lignes afficher           |
| ordering      | Active ou désactive le tri automatique des colonnes                                       |
| searching     | Affiche une barre de recherche globale                                                    |
| columnDefs    | Permet de configurer des options par colonne (ex : désactiver le tri sur certaines)       |
| language.url  | Charge la traduction française pour tous les textes (pagination, "aucune donnée", etc.)   |

### HTML minimum à avoir

```html
<table id="monTableau" class="display">
  <thead>
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Durand</td><td>Paul</td><td>paul@example.com</td></tr>
    <tr><td>Martin</td><td>Julie</td><td>julie@example.com</td></tr>
    <!-- autres lignes -->
  </tbody>
</table>
```