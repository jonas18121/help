# Tips et Codes

## Supprimer les doublons d’un tableau en Javascript.


### Trois manières simple pour supprimer les doublons d’un tableau en JavaScript.

1. Le premier avec [set( )](https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute) qui permet de stocker des valeurs unique.

Le deuxième avec [].filter( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) qui permet de retourner (dans un nouveau tableau qu’il aura créer), tous les éléments du tableau d’origine qui respectent une condition, qu’on aura déterminée. 

Dans la condition, on a [indexOf( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) qui renvoie l’index de chaque valeurs du tableau d’origine  que l’on va comparer.

Si on trouve deux valeurs identique qui on deux index différents, on va retourner le premier en true, puis il sera ajouter dans le nouveau tableau et le deuxième en false, ce dernier, ne sera pas ajouter dans le nouveau tableau.

Le troisième avec [.reduce( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) qui permet de stocker dans un accumulateur les valeurs du tableau d’origine qui respectent une condition, qu’on aura déterminée. 

L’accumulateur sera l’argument accumulator qu’on va définir comme un tableau avec des crochets `[ ]` ([ ] qui est tout à droite). Dans l’argument accumulator on va stocker  les valeurs de l’argument value qui respectent la condition.

Dans la condition, on a [.includes( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) qui va vérifié si la valeur de l’argument value existe déjà dans le tableau accumulator.

Si oui, on ne l’ajoute pas dans le tableau accumulator . Si non, on l’ajoute dans le tableau accumulator.

Exemple(s) :


```javascript
const array = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

let newArray = null;

newArray = [...new Set(array)];
console.log(newArray); // (5) [1, 2, 3, 4, 5]

newArray = array.filter((value, index) => array.indexOf(value) == index);
console.log(newArray); // (5) [1, 2, 3, 4, 5]

newArray = array.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
console.log(newArray); // (5) [1, 2, 3, 4, 5]
```