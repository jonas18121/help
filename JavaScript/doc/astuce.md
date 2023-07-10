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

### Afficher un spinner de chargement dans jQuery (Chargement de page)


```html
<div id="loadingSpin"></div>
```

Lorsque l'on click sur un element qui exécute du ajax, le spinner va s'activer

- `.ajaxStart(function () { ... })` : Cette méthode est utilisée pour définir un gestionnaire de l'événement ajaxStart. 
Cela signifie que lorsque des requêtes AJAX sont initiées, la fonction anonyme passée en paramètre sera exécutée.

- `.ajaxStop(function () { ... })` : Cette méthode est utilisée pour définir un gestionnaire de l'événement ajaxStop. 
Cela signifie que lorsque toutes les requêtes AJAX en cours sont terminées, la fonction anonyme passée en paramètre sera exécutée.

```js
var $loading = $('#loadingSpin').hide();
$(document)
    .ajaxStart(function () {
        $loading.show();
    })
    .ajaxStop(function () {
        $loading.hide();
    });
```

Exemple de requète Ajax,

- Lorsque la requète Ajax, va être exécuter `ajaxStart` va être activer
- Lorsque la requète Ajax, sera terminer `ajaxStop` va être activer
```js
let baseUrl = window.location.origin;
$.ajax({
    url: baseUrl + '/mon/chemin/' + $('#id').val() + '/auth',
    data: {},
    success: function(response) {
        
    },
    error: function (xhr, textStatus, error) {
        'Error : ' + xhr.statusText + '.';
    },
    complete: function (data) {
        // Nothing
    }
});
```

CSS pour créer le spinner
```css
 #loadingSpin::before {
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 8px #cfd0d1;
    border-bottom-color: $main-color;
    border-radius: 50%;
    content: "";
    height: 100px;
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate3d(-50%, -50%, 0);
    width: 100px;
    will-change: transform;
    z-index: 1000;
}

@keyframes spinner {
    0% {
        transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
        transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
}
```

### Observer les changements dans le DOM (Document Object Model) d'une div spécifique

```js
/** 
 * Observez les changements DOM dans la span, si la span est vide, on enlève la cochée de l'entrée radio
 * 
 * Fonction pour réagir au changement de contenu span
*/
function handleContentChange() {
    $('span[onclick="function_close_JS();"]').on('click', function() {
        $('#observerDiv').css({'display': 'none', 'top': '16px'});
        $('#id_input_radio').prop('checked', false);
    });
}
 //////////// Observez les changements DOM dans la div, si la div est vide, on enlève la cochée de l'entrée radio  //////////          
// Observer les changements DOM dans la div
const observer = new MutationObserver(handleContentChange);
// Configurer la surveillance pour surveiller les modifications de l'enfant de div
const config = { childList: true };
// Commencer à observer sur la div
observer.observe(document.getElementById('observerDiv'), config);
```

Contenue de #observerDiv vide
```html
<div id="observerDiv" class=""></div>
<input type="radio" id="id_input_radio"/>
```
Contenue de #observerDiv plein
```html
<div id="observerDiv" class="">
    <span onclick="function_close_JS()">
        code ....
    </span>
</div>
<input type="radio" id="id_input_radio"/>
```

Ce code JavaScript permet d'observer les changements dans le DOM (Document Object Model) d'une div spécifique, et plus précisément dans le contenu de cette div.

Voici une explication ligne par ligne du code :

1. - Le commentaire indique que le but est d'observer les changements dans la div et de supprimer la sélection (checked) d'un élément radio (radio input) si la div est vide.

2. - On crée une nouvelle instance de MutationObserver, qui est une interface JavaScript permettant de réagir aux mutations (changements) observées dans le DOM.

3. - On définit une fonction nommée "handleContentChange" qui sera appelée lorsque des changements dans le contenu de la div observée seront détectés.

4. - On crée un objet de configuration nommé "config" avec la propriété "childList" définie à "true". Cela indique à l'observateur de surveiller les changements apportés aux enfants (éléments enfants) de la div observée.

5. - On utilise la méthode "getElementById" pour récupérer la référence à l'élément de div spécifique avec l'ID "observerDiv" dans le document.

6. - On appelle la méthode "observe" de l'instance de MutationObserver pour commencer à observer les changements dans la div. On lui passe en paramètre l'élément de div et l'objet de configuration.

En résumé, ce code met en place un observateur de mutations (MutationObserver) pour surveiller les changements dans le contenu de la div avec l'ID "observerDiv".<br> Lorsque des modifications sont détectées, la fonction "handleContentChange" sera appelée, mais le code de cette fonction n'est pas inclus dans l'extrait fourni.

### Ecrire un text dans une couleur spécifique pendant quelque seconde puis revenir à la couleur initiale

```js
let myText = 'Hello'
$('#myId').text(myText).css('color', 'green').delay(5000).queue(function(next) {
    $(this).css('color', 'black');
        next();
    }
);
```

Dans cet exemple : 

1. nous utilisons la méthode `text()` pour modifier le contenu de `$('#myId')` avec la valeur de `myText`. 

2. Ensuite, nous utilisons la méthode `css()` pour changer la couleur du texte en vert `('green')`.

3. Ensuite, nous utilisons la méthode `delay()` pour ajouter une pause de 5 secondes. 

4. Après cette pause, nous utilisons la méthode `queue()` pour ajouter une fonction qui sera exécutée après la pause. Dans cette fonction, nous rétablirons la couleur originale en utilisant la valeur `black` avec la méthode `css('color', 'black')`.

Ainsi, le texte sera temporairement en vert pendant 5 secondes avant de revenir à sa couleur d'origine.