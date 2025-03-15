# Archithecture du code JS :


### Fichiers d'execution

Dans ce fichier
- On va executer les méthodes des fichiers de définition
- Toutes les méthodes ou codes qui sont appeler dans le navigateur seron dans ce fichier
- Les algorithmes/méthodes seront dans des blocks `$(function () {` ou `document.addEventListener('DOMContentLoaded', function() {` 
    - Avec un commentaire au dessus pour expliquer ce que l'algorithmes/méthodes fait
    - Cela permet d'avoir une meilleure lisibilité

#### EN JQuery 
```js
// product.js
import { ProductClass } from './productClass';

// Affiche la liste des produits disponible
$(function () {
    const productClass = new ProductClass();

    productClass.sayHello("Jhon");

    // code ...
});

// Supprime un produit
$(function () {
    const productClass = new ProductClass();

    productClass.sayHello("Jhon");

    // code ...
});
```

#### EN JavaScript 
```js
// product.js
import { ProductClass } from './productClass';

// Affiche la liste des produits disponible
document.addEventListener('DOMContentLoaded', function() {
    const productClass = new ProductClass();

    productClass.sayHello("Jhon");

    // code ...
});

// Supprime un produit
document.addEventListener('DOMContentLoaded', function() {
    const productClass = new ProductClass();

    productClass.sayHello("Jhon");

    // code ...
});
```

### Fichiers de définition, classe JS

Dans ce fichier :
- On va définir des méthodes, mais ces méthodes seront appeler dans les fichiers d'execution
- Une methode définit ici ou qui vient d'une autre classe/fichier peut être appeler ici mais il sera dans une méthode définit ici mais pas appeler ici.

```js
// productClass.js
export class ProductClass {

    constructor() {
        
    }

    /**
     * Dit hello
     * 
     * @param {String} name 
     * 
     * @returns {String}
     */
    sayHello(name)
    {
        this.autreMethodes();
        return "Hello" + name;
    }

    /**
     * Autres méthodes qui sera appeler dans une autres méthodes
     * 
     * @returns {boolean}
     */
    autreMethode()
    {
        // code ...
    }

    // code ...
}
```