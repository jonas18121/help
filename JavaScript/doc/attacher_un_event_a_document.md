# Différence entre `$(document).on("change", ".my_class")` et `$(".my_class").on("change")`

La principale différence entre `$(document).on("change", ".my_class")` et `$(".my_class").on("change")` réside dans leur comportement avec les éléments dynamiques et leur portée d'application :

1. **$(document).on("change", ".my_class")**

- Utilise la délégation d'événements
- Fonctionne pour les éléments existants et futurs avec la classe "my_class"
- L'événement est attaché au document et se propage jusqu'à l'élément ciblé
- Idéal pour les éléments ajoutés dynamiquement après le chargement initial de la page

2. **$(".my_class").on("change")**

- Attache l'événement directement à l'élément avec la classe "my_class"
- Ne fonctionne que pour les éléments existants au moment de l'exécution du code (chargement initial de la page)
- Plus rapide pour les éléments statiques car l'événement est directement lié
- Ne fonctionnera pas pour les éléments ajoutés dynamiquement après l'exécution du code (chargement initial de la page)

Exemple illustratif :

```js
// Fonctionne pour tous les éléments actuels et futurs avec la classe "my_class"
$(document).on("change", ".my_class", function() {
    console.log("Changement détecté (délégation)");
});

// Fonctionne uniquement pour l'élément existant avec la classe "my_class" (au chargement initial de la page)
$(".my_class").on("change", function() {
    console.log("Changement détecté (direct)");
});

// Ajout dynamique d'un nouvel élément
$("body").append('<input id="my_id" class="my_class" type="text">');

```

Dans cet exemple, le premier gestionnaire d'événements fonctionnera pour le nouvel élément ajouté, tandis que le second ne le détectera pas

### Autre exemple avec traduction en JQuery et Javascript vanilla

#### Ecoute les clics sur les éléments .closestRemove (ou leur icône .bi-dash), empêche le comportement par défaut, puis supprime le parent .collectionContainer le plus proche.

**En JQuery**
```js
$(document).on('click', '.closestRemove, .closestRemove i.bi-dash', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien (si c'est un lien)
    
    // Trouve le parent le plus proche avec la classe .collectionContainer et le supprime
    $(this).closest('.collectionContainer').remove();
});
```

**EN Javascript vanilla**
```js
document.addEventListener('click', function(event) {
    // Si on clique sur l'élément a.closestRemove ou sur l'icône i.bi-dash à l'intérieur de a.closestRemove, on supprime l'input
    if (
        event.target.classList.contains('closestRemove')
        || event.target.matches('.closestRemove i.bi-dash')
    ) {
        event.preventDefault(); // Empêche le comportement par défaut du lien (si c'est un lien)
        
        // Trouve le parent le plus proche avec la classe .collectionContainer et supprime-le
        event.target.closest('.collectionContainer').remove();
    }
});
```

**HTML**

- On fait comme si les div.collectionContainer avec leurs contenu apparaissent, dynamiquement lorsqu'on 
clique sur un autre bouton pour les affichés les uns après les autres
- Si on clique sur l'icon ou sur la zone que prend la balise `<a>` du Conteneur 1, il devra être supprimer
, pareil pour les autres si on clique sur eux

```html
<!-- Conteneur 1 -->
<div class="collectionContainer">
    <input type="text" value="Champ 1">
    <a href="#" class="closestRemove">
        <i class="bi bi-dash"></i> Supprimer
    </a>
</div>

<!-- Conteneur 2 -->
<div class="collectionContainer">
    <input type="text" value="Champ 2">
    <a href="#" class="closestRemove">
        <i class="bi bi-dash"></i> Supprimer
    </a>
</div>

<!-- Conteneur 3 -->
<div class="collectionContainer">
    <input type="text" value="Champ 3">
    <button class="closestRemove">Supprimer</button>
</div>
```

# Différence entre `window` et `document`

En JavaScript, window et document sont deux objets globaux qui jouent des rôles différents lorsqu'on attache un événement. Voici les principales différences :

## `window` : Gère les événements liés à la fenêtre du navigateur

L'objet `window` représente la fenêtre du navigateur et est utilisé pour écouter des événements globaux tels que :

#### ✅ Exemples d'événements sur window :

- `load` → Quand la page et tous ses éléments (images, styles, etc.) sont chargés
- `resize` → Quand la taille de la fenêtre change
- `scroll` → Quand l'utilisateur fait défiler la page
- `beforeunload` → Juste avant que l'utilisateur quitte la page

```js
window.addEventListener('load', function() {
    console.log("La page est complètement chargée !");
});

window.addEventListener('resize', function() {
    console.log("La fenêtre a été redimensionnée !");
});
```

#### 📌 Quand utiliser window ?

Lorsque tu veux réagir à des événements qui affectent toute la fenêtre du navigateur.

## `document` : Gère les événements sur le contenu de la page (DOM)

L'objet document représente le contenu HTML chargé dans la fenêtre et est utilisé pour écouter des événements liés aux éléments de la page.

#### ✅ Exemples d'événements sur document :

- `DOMContentLoaded` → Quand le HTML est chargé, mais pas forcément les images et styles
- `click` → Quand un utilisateur clique n'importe où sur la page
- `keydown` → Quand une touche est enfoncée

```js
document.addEventListener('DOMContentLoaded', function() {
    console.log("Le DOM est prêt !");
});

document.addEventListener('click', function(event) {
    console.log("Un élément a été cliqué :", event.target);
})
```

#### 📌 Quand utiliser document ?

- Lorsque tu veux interagir avec le contenu de la page (DOM), comme capturer des événements sur les boutons, formulaires, etc.
- Lorsque tu utilises la délégation d'événements, par exemple :

```js
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn")) {
        console.log("Bouton cliqué !");
    }
});
```

**➜ Ici, document capture les clics sur tous les éléments .btn, même ceux ajoutés dynamiquement après le chargement.**

### DOMContentLoaded peut être utilisé pour Window ?

Oui, DOMContentLoaded peut être utilisé avec `window`, mais il est généralement attaché à document.

### ✅ Utilisation correcte avec document (recommandé)

```js
document.addEventListener("DOMContentLoaded", function() {
    console.log("Le DOM est complètement chargé !");
});
```

#### 📌 Pourquoi ?

`document` est l'objet qui représente le contenu HTML, donc c'est lui qui déclenche `DOMContentLoaded` une fois le DOM chargé.
Cette méthode est plus directe et plus claire.

### ❌ Utilisation avec window (possible mais pas standard)

```js
window.addEventListener("DOMContentLoaded", function() {
    console.log("Le DOM est chargé !");
});
```

#### 📌 Pourquoi ça fonctionne quand même ?

- `window` propage l'événement `DOMContentLoaded`, donc tu peux techniquement l'écouter sur `window`.
- Mais ce n'est pas recommandé, car l'événement appartient à `document`.

### ⚠️ Ne pas confondre avec load sur window

Si tu veux attendre que tout (y compris les images, les styles CSS, les iframes) soit chargé, utilise plutôt `window.load` :

```js
window.addEventListener("load", function() {
    console.log("La page et ses ressources sont complètement chargées !");
});
```

**➡ À utiliser si tu veux attendre que tout (y compris les images) soit prêt.**

#### 📌 Différence clé :

- `DOMContentLoaded` : Se déclenche dès que le HTML est chargé et analysé (les images et styles peuvent encore être en chargement).
- `load sur window` : Se déclenche quand tout le contenu (images, styles, iframes) est complètement chargé.

### Conclusion :
- ✅ Utilise `document.addEventListener("DOMContentLoaded", ...)` pour exécuter du JS dès que le DOM est prêt.
- ✅ Utilise `window.addEventListener("load", ...)` si tu veux attendre que tout soit chargé.


