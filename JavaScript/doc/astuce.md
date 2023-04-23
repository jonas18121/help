## Supprimer les doublons d’un tableau en Javascript.


### Trois manières simple pour supprimer les doublons d’un tableau en JavaScript.

1. Le premier avec [set( )](https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute) qui permet de stocker des valeurs unique.

2. Le deuxième avec [.filter( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) qui permet de retourner (dans un nouveau tableau qu’il aura créer), tous les éléments du `tableau d’origine` qui respectent une condition, qu’on aura déterminée. 

    Dans la condition, on a [indexOf( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) qui renvoie l’index de chaque valeurs du `tableau d’origine`  que l’on va comparer.

    Si on trouve `deux valeurs identique qui on deux index différents`, on va retourner la première valeur en true, puis il sera ajouter dans le nouveau tableau et la deuxième valeur sera en false, ce dernier, ne sera pas ajouter dans le nouveau tableau.

3. Le troisième avec [.reduce( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) qui permet de stocker dans un accumulateur les valeurs du `tableau d’origine` qui respectent une condition, qu’on aura déterminée. 

    `L’accumulateur sera l’argument accumulator` qu’on va définir comme un tableau vide avec des crochets `[ ]` (qui sont tout à droite). Dans `l’argument accumulator` on va stocker  les valeurs de `l’argument value` qui respectent la condition.

    Dans la condition, on a [.includes( )](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) qui va vérifié si la valeur de `l’argument value` existe déjà dans le `tableau accumulator`.

    Si oui, on ne l’ajoute pas dans le `tableau accumulator` . Si non, on l’ajoute dans le `tableau accumulator`.

Exemple(s) :


```javascript
const array = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

let newArray = null;

newArray = [...new Set(array)];
console.log(newArray); // (5) [1, 2, 3, 4, 5]

newArray = array.filter((value, index) => array.indexOf(value) == index);
console.log(newArray); // (5) [1, 2, 3, 4, 5]

newArray = array.reduce((accumulator, value) => accumulator.includes(value) ? accumulator : [...accumulator, value], []);
console.log(newArray); // (5) [1, 2, 3, 4, 5]
```

### recupérer la valeur de l'attribut class d'un input (champ select)

```javascript
let valueClass = $( "#id_input_select option:selected" )[0].classList['value'];
```

```js
let isInvalid = false;
  // const cardNumberInput = document.getElementById('page_product_update_category');
  // const cardForm = document.getElementById('page_product_update');

  // const errorDiv = document.getElementById('invalid-category');


  // categoryId = cardNumberInput.value;
  // categoryName = cardNumberInput.options[cardNumberInput.selectedIndex].text;

  // isInvalid = categoryName.split(' ').some(function(word){return word === 'supprimé'});


  // console.log(errorDiv);
  // console.log(cardNumberInput.selectedIndex);


  
  
  
  
  
  // console.log(categoryName);
  
    // get form
    const cardForm = $('#page_product_update');
  
    // event on submit
    cardForm.on('submit', e => {

        // get the selected category
        const categorySelected = $('#page_product_update_category option:selected');

        // get div tag for error 
        const errorDiv = $('#invalid-category');
        
        let categoryId = categorySelected.val();
        let categoryName = categorySelected.text();

        // search the word supprimé in the text
        isInvalid = categoryName.split(' ').some(function(word){return word === 'supprimé'});

        if (isInvalid == true) {
            e.preventDefault(); // stop submit
            
            errorDiv.html('<p class="mt-2 mb-0">Cette Categorie a été supprimé. Veuillez choisir une autre catégorie.</p>');
            errorDiv.css("color", "red");

            // back to top
            $('html,body').animate({scrollTop: 0}, 'slow');
        }
    })
```