# Récupérer une balise `<a>` avec un id dynamique ayant un préfix spécifique en jQuery

## Récupérer une balise `<a>` avec un id dynamique ayant un préfix spécifique lorsqu'il y a beaucoup de balise <a>

Pour récupérer une balise `<a>` avec un id dynamique ayant un préfix spécifique en jQuery, vous pouvez utiliser l'attribut ^= (commence par) dans le sélecteur. Voici un exemple :
```js
// Exemple de préfixe
const prefix = "prefix_";

// Sélectionner la balise <a> avec un id qui commence par ce préfixe
const anchorTag = $(`a[id^="${prefix}"]`);

// Si vous voulez effectuer une action, comme cliquer dessus ou récupérer son contenu
anchorTag.each(function () {
    console.log($(this).attr('id')); // Affiche l'id
    console.log($(this).text());    // Affiche le texte de la balise
});
```

### Explications 
1. Sélecteur `^=` : Ce sélecteur permet de cibler les attributs qui commencent par une valeur spécifique.
2. `${prefix}` : Le préfixe dynamique peut être inséré comme une variable.
3. `.each()` : Permet de parcourir toutes les correspondances si plusieurs balises `<a>` ont un id avec ce préfixe.

Exemple HTML : 
```html
<a id="prefix_123">Lien 1</a>
<a id="prefix_456">Lien 2</a>
<a id="other_789">Lien 3</a>
```

Le code récupérera uniquement les balises `<a>` avec des id other_789 si on clicque dessus.

## Récupérer une balise `<a>` avec un id dynamique ayant un préfix spécifique lorsqu'il y a une seul balise <a>

S'il y à qu'une seule balise <a> avec un ID commençant par un préfixe donné sur la page, voici une version simplifiée du code :
```js
// Exemple de préfixe
const prefix = "prefix_";

// Sélectionner la balise <a> avec un id qui commence par ce préfixe
const anchorTag = $(`a[id^="${prefix}"]`);

// Vérification et utilisation
if (anchorTag.length) {
    console.log("ID:", anchorTag.attr('id')); // Affiche l'ID
    console.log("Texte:", anchorTag.text());  // Affiche le texte de la balise
}
```

### Explications 
1. Sélecteur unique : `$('a[id^="prefix_"]')` retourne la balise correspondante ou un objet vide s'il n'y a pas de correspondance.
2. `.attr()` et `.text()` : Permettent d'extraire des informations de la balise si elle existe.
3. Condition `if (anchorTag.length)` : Permet de vérifier que la balise existe avant d'accéder à ses propriétés pour éviter les erreurs.

Exemple HTML : 
```html
<a id="prefix_123">Détail du lien</a>
```

Le code récupérera la balise `<a>` avec des id prefix_123 si on clicque dessus.

### Si on veut réagir a un évènement onclick sur cette id
```js
// Exemple de préfixe
const prefix = "prefix_";

// Ajouter un gestionnaire d'événement onclick
$(document).on('click', `a[id^="${prefix}"]`, function (event) {
    event.preventDefault(); // Empêche le comportement par défaut (facultatif, si le lien ne doit pas rediriger)
    
    const clickedId = $(this).attr('id'); // Récupérer l'ID de la balise cliquée
    const linkText = $(this).text();      // Récupérer le texte du lien

    console.log("Lien cliqué !");
    console.log("ID:", clickedId);
    console.log("Texte:", linkText);

    // Ajoutez ici votre logique à exécuter lors du clic
});
```

# Récupérer une balise `<select>` avec un id dynamique ayant un préfix spécifique et un suffix spécifique en jQuery

Pour gérer un ID dynamique avec un préfixe constant, vous pouvez utiliser un sélecteur d'attribut `(^=` ou `*=)` en jQuery pour sélectionner les éléments dont l'ID commence par une certaine valeur ou contient une certaine chaîne.

```js
// Sélecteur pour toutes les balises <select> dont l'ID commence par "id_prefix_"
$("select[id^='id_prefix_'][id$='_id_suffix']").on("change", function () {
    productFunction.selectValeurs(this.id, $(this).val());
});
```

#### 1) Sélecteur `id^='...'` :

- Sélectionne les éléments dont l'ID commence par la chaîne spécifiée, ici : `id_prefix_`.

#### 2) Sélecteur `id$='...'` :

- Sélectionne les éléments dont l'ID se termine par la chaîne spécifiée, ici : `_id_suffix`.

#### 3) Combinaison `[id^='...'][id$='...']` :

- Cette combinaison permet de cibler uniquement les éléments ayant des ID qui commencent et se terminent par les chaînes spécifiées, en ignorant la partie dynamique.

#### 4) Gestion de l'événement `.on('change')` :

- Réagit chaque fois qu'une valeur est changée dans un `<select>` correspondant au sélecteur.

```html
<select id="id_prefix_0_id_suffix">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<select id="id_prefix_42_id_suffix">
    <option value="A">Option A</option>
    <option value="B">Option B</option>
</select>
```

### Avantages
- Le code fonctionne quel que soit le numéro dynamique dans l'ID (ex. : `_0_`, `_42_`, etc.).
- Maintient un ciblage précis des éléments grâce à la combinaison `^=` et `$=`.
