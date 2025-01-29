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