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

### Traduction avec variable

- Installer [willdurand/js-translation-bundle](https://packagist.org/packages/willdurand/js-translation-bundle)
- Télécharger [toastr](https://www.cdnpkg.com/toastr.js/file/toastr.min.js/) (Facultatif) 

Dans le fichier `translation.js`
- On Définit la variable `name` avec le signe du pourcentage
```js
// translation.js

import Translator from '../../../../../../vendor/willdurand/js-translation-bundle/Resources/public/js/translator.min.js';

$(function() {
    (function (Translator) {
        Translator.fallback      = 'fr';
        Translator.defaultDomain = 'javascript';
        Translator.add('frontend.js.message.hello', 'Bonjour %name%, comment vas tu ?', 'javascript', 'fr');
        Translator.add('frontend.js.message.hello', 'Hello %name%, how are you ?', 'javascript', 'en');
    })(Translator);   
});
```

Dans le fichier `specific.js` 
- On va utiliser `Translator.trans(`
- On lui passe en valeur la variable `name` entre les crochets, 
- La clé `name` entre crochet, va modifier la variable `%name%` définit dans le fichier `translation.js`
```js
// specific.js

import toastr from '../../../../public/assets/shared_all/plugins/toastr/toastr.min.js';
import '../../translations.js'
import Translator from '../../../../../vendor/willdurand/js-translation-bundle/Resources/public/js/translator.min.js';

let name = 'Jonas';

$(function () {    
    $("#idName").text(
        Translator.trans(
            'frontend.js.message.hello', 
            {name: name}, 
            'javascript'
        )
    );
});
```

### Afficher et positionner dynamiquement un élément en fonction d'un autre élément sélectionné.

```js
function toogleShippingAddresses(elementDomId) {

    // $(elementDomId).on(event, function(){
        let shippingAddresses = $('#shippingAddresses');
        if ($(elementDomId).is(':checked')) {
    
            shippingAddresses.show(1000);
    
            if (elementDomId === '#order_shippingModes_2') {
                let targetElement = $(elementDomId);
                // let targetElementTop = targetElement.offset().top + targetElement.outerHeight();
                // let targetElementTop = targetElement.position().top + targetElement.outerHeight();
                let targetElementTop = targetElement.offset().top - 1010;

                console.log(elementDomId);
                console.log(targetElement.position().top);
                console.log(targetElement.outerHeight());
                console.log(targetElementTop);
                console.log(targetElement.offset().top);

                shippingAddresses.css('top', targetElementTop);
            }
    
            if ($(elementDomId).is('#order_shippingModes_3')) {
                let targetElement = $(elementDomId);
                // let targetElementTop = targetElement.position().top + targetElement.outerHeight();
                let targetElementTop = targetElement.offset().top - 1060;

                console.log(elementDomId);
                console.log(targetElement.position().top);
                console.log(targetElement.outerHeight());
                console.log(targetElementTop);
                console.log(targetElement.offset().top);

                shippingAddresses.css('top', targetElementTop);
            }
    
            // make scrollable
            let shippingAddressCount = $('#shippingAddresses .form-check').length;
            if (shippingAddressCount > 4) {
                shippingAddresses.css('height', '380px');
                shippingAddresses.css('overflow-y', 'auto');
            }
        }
        else {
            shippingAddresses.hide(1000);
        }
    // }); 
}
```

Ce code est une fonction nommée `toogleShippingAddresses` qui prend en paramètre l'ID d'un élément DOM. Voici une explication ligne par ligne du code :

1. La fonction commence par sélectionner l'élément avec l'ID `#shippingAddresses` et le stocke dans la variable `shippingAddresses`.

2. Ensuite, il vérifie si l'élément avec l'ID spécifié est coché (utilisation de `$(elementDomId).is(':checked')`).

3. Si l'élément est coché, il affiche l'élément `#shippingAddresses` avec une animation de 1000 ms en utilisant `shippingAddresses.show(1000)`.

4. Ensuite, il vérifie si l'élément en question correspond à `#order_shippingModes_2` en comparant elementDomId avec `'#order_shippingModes_2'`.

5. Si c'est le cas, il sélectionne l'élément avec l'ID `#order_shippingModes_2` et le stocke dans la variable `targetElement`.

6. Ensuite, il calcule la position verticale de targetElement en utilisant `targetElement.offset().top` et soustrait une valeur spécifique pour ajuster le positionnement (par exemple, 1010 dans cet exemple).

7. Les valeurs de position et de hauteur de `targetElement` sont affichées dans la console à des fins de débogage.

8. Enfin, il applique la valeur de `targetElementTop` comme position top de l'élément #shippingAddresses en utilisant `shippingAddresses.css('top', targetElementTop)`.

9. Le même processus est répété pour l'élément avec l'ID `#order_shippingModes_3` en ajustant les valeurs spécifiques.

10. Enfin, il vérifie si le nombre d'éléments avec la classe `.form-check` à l'intérieur de #shippingAddresses est supérieur à 4. Si c'est le cas, il applique des styles pour rendre la zone de contenu de `#shippingAddresses` scrollable.

11. Si l'élément n'est pas coché, il masque `#shippingAddresses` avec une animation de 1000 ms en utilisant `shippingAddresses.hide(1000)`.

C'est ainsi que la fonction `toogleShippingAddresses` fonctionne pour afficher et positionner dynamiquement l'élément `#shippingAddresses` en fonction de l'élément sélectionné.