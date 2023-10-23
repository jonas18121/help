# Evénement personnalisé avec .trigger()

Lien vers jquery.com : [.trigger()](https://api.jquery.com/trigger/)

Description : exécute tous les gestionnaires et comportements attachés aux éléments correspondants pour le type d'événement donné.

Exemple :

Ce code ci-dessous est composé de deux parties. <br>
La première partie vérifie si la variable data contient du contenu (c'est-à-dire si elle n'est pas nulle, non définie et non une chaîne vide).<br>
Si cette condition est vraie, un événement personnalisé nommé "eventDataNotEmpty" est déclenché sur l'élément document. <br>
La deuxième partie consiste à écouter cet événement "eventDataNotEmpty" et à réagir en affichant une boîte de dialogue d'alerte "hello" lorsque l'événement est déclenché.

Voici comment cela fonctionne avec des exemples :

1. Cas où data est défini et non vide :

```js
var data = "Contenu non vide";

if (data !== null && data !== undefined && data !== '') {
    $(document).trigger("eventDataNotEmpty");
}
```

Dans ce cas, data contient "Contenu non vide", donc la condition est vraie, et l'événement "eventDataNotEmpty" est déclenché. Cela provoque l'affichage de l'alerte "hello".

Pour écouter à l'événement "eventDataNotEmpty" et à réagir en affichant une boîte de dialogue d'alerte "hello" lorsque l'événement est déclenché.:

```js
$(document).on("eventDataNotEmpty",  function(event) {
    // Utilisez l'objet event ici
    alert('hello');
});
```

