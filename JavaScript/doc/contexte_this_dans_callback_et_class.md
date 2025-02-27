# Le Contexte de this dans les Callbacks et dans les classes en JavaScript

## Le Contexte de this dans les Callbacks JavaScript
Lorsque vous utilisez des fonctions dans des objets ou comme callbacks, le contexte de this peut ne pas pointer vers l'instance de la classe. 

Cela peut causer des erreurs comme :

`Uncaught TypeError: this.maMethode is not a function.`

### Problème

Dans un callback, comme la fonction `body` ci-dessous, `this` peut pointer vers un objet ou contexte inattendu :

**function (data, _row, _column, node)** va recréé un nouveau `this` qui sera différent du `this` de la classe dans lequel le code ci-dessous est définit

```js
'exportOptions': {
    'format': {
        body: function (data, _row, _column, node) {
            return this.nettoyagePourExport(data, node); // Peut générer une erreur
        }
    }
}
```

### Solutions

#### 1. Utiliser une fonction fléchée

Les fonctions fléchées capturent le contexte lexical de `this`. Cela garantit que `this` pointe vers l'instance de la classe.

**(data, _row, _column, node) => {** va utiliser le même `this` de la classe dans lequel le code ci-dessous est définit

```js
'exportOptions': {
    'format': {
        body: (data, _row, _column, node) => {
            return this.nettoyagePourExport(data, node);
        }
    }
}
```
**Avantage :** Simple et lisible.
**Limite :** Nécessite que votre environnement supporte les fonctions fléchées.

#### 2. Utiliser `.bind(this)`

Liez explicitement le contexte de `this` à la fonction. Cela peut se faire au moment de la déclaration ou avant l'utilisation.

**.bind(this)** va utiliser le même `this` de la classe dans lequel le code ci-dessous est définit

**Exemple : Liaison lors de la déclaration**

```js
'exportOptions': {
    'format': {
        body: function (data, _row, _column, node) {
            return this.nettoyagePourExport(data, node);
        }.bind(this)
    }
}
```

**Exemple : Liaison dynamique**

```js
const options = {
    'exportOptions': {
        'format': {
            body: function (data, _row, _column, node) {
                return this.nettoyagePourExport(data, node);
            }
        }
    }
};

// Lier avant utilisation
options.exportOptions.format.body = options.exportOptions.format.body.bind(this);
```
**Avantage :** Compatible avec toutes les versions de JavaScript.
**Limite :** Nécessite une étape supplémentaire pour lier le contexte.

## Test
```js
class ExportHandler {
    constructor() {
        // Utilise le this qui représente ExportHandler
        this.columnsExport = [0, 1, 2, 3]; // Exemple de colonnes à exporter
    }

    // Méthode de nettoyage utilisée dans l'export
    nettoyagePourExport(data, node) {
        // Utilise le this qui représente ExportHandler
        console.log(this);

        // Nettoyage du contenu pour l'export
        return data.replace(/<[^>]*>?/gm, ''); // Supprime les balises HTML
    }

    // Configuration pour l'export avec une fonction fléchée
    getExportOptions() {
        return {
            'exportOptions': {
                'rowsmodifier': {
                    'search': 'applied',
                },
                'columns': this.columnsExport,
                'format': {
                    body: (data, _row, _column, node) => {
                        // Utilise le this qui représente ExportHandler
                        // Appel de la méthode de nettoyage
                        return this.nettoyagePourExport(data, node);
                    }
                },
            },
        };
    }

    getTestOptions() {
        return {
            'exportOptions': {
                'rowsmodifier': {
                    'search': 'applied',
                },
                'columns': this.columnsExport,
                'format': {
                    body: function(data, _row, _column, node) {
                        // Va recréer un nouveau this qui est différent du this qui représente ExportHandler
                        // Appel de la méthode de nettoyage
                        return this.nettoyagePourExport(data, node); // ça ne va pas fonctionner le this à chager de contexte
                    }
                },
            },
        };
    }
}

// Exemple d'utilisation
const exportHandler = new ExportHandler();
const options = exportHandler.getExportOptions();
console.log(options);
```

## Dans quel cas nettoyagePourExport va recréé un nouveau this qui ne sera pas référent a ExportHandler ?

La méthode `nettoyagePourExport` peut recréer un nouveau contexte this qui ne pointe plus vers l'instance de la classe `ExportHandler` dans les cas suivants :

#### 1. Appel direct comme une fonction autonome

Si vous extrayez la méthode `nettoyagePourExport` et l'appelez en dehors de son contexte d'origine, le `this` peut ne plus référer à `ExportHandler`. Exemple :

```js
const nettoyage = exportHandler.nettoyagePourExport;
console.log(nettoyage('<p>Test</p>')); // Erreur ou `this` incorrect
```

Dans ce cas, `nettoyage` est une référence à la méthode, mais le lien avec l'instance `ExportHandler` est perdu. Par défaut, dans ce `contexte`, this sera soit `undefined` (en mode strict), soit l'objet global (en mode non strict).

#### 2. Utilisation comme callback ou dans un gestionnaire d'événements

Quand la méthode est passée comme callback à une autre fonction (par exemple, un événement ou une promesse), le contexte est également perdu. Exemple :

```js
setTimeout(exportHandler.nettoyagePourExport, 1000);
// Après 1 seconde, `this` dans `nettoyagePourExport` ne pointera pas vers `ExportHandler`.
```

#### 3. Assignation à un autre objet

Si la méthode est copiée ou assignée à un autre objet, le contexte devient celui de l'objet où elle est appelée. Exemple :

```js
const autreObjet = { nettoyage: exportHandler.nettoyagePourExport };
autreObjet.nettoyage('<p>Test</p>'); // Ici, `this` est `autreObjet`, pas `ExportHandler`.
```

#### 4. Utilisation dans une fonction classique à l'intérieur de la méthode

Si une fonction classique est utilisée à l'intérieur de `nettoyagePourExport` (au lieu d'une fonction fléchée), elle crée un nouveau contexte pour `this`. Exemple :

```js
nettoyagePourExport(data, node) {
    function interne() {
        console.log(this); // Ici, `this` ne pointe pas vers `ExportHandler`.
    }
    interne();
    return data;
}
```

### Comment éviter ces problèmes

#### 1. Lier explicitement la méthode au contexte de la classe : Utilisez .bind(this) pour lier nettoyagePourExport à l'instance ExportHandler.

```js
const nettoyage = exportHandler.nettoyagePourExport.bind(exportHandler);
setTimeout(nettoyage, 1000); // Le `this` reste correct.
```

#### 2. Utiliser une fonction fléchée dans les méthodes internes : Les fonctions fléchées ne créent pas de nouveau this.

```js
nettoyagePourExport(data, node) {
    const interne = () => {
        console.log(this); // `this` pointe toujours vers `ExportHandler`.
    };
    interne();
    return data;
}
```
#### 3. Utiliser une classe avec des propriétés de classe : Déclarez la méthode comme une propriété fléchée pour qu'elle capture automatiquement this.

```js
class ExportHandler {
    nettoyagePourExport = (data, node) => {
        console.log(this); // Toujours `ExportHandler`.
        return data.replace(/<[^>]*>?/gm, '');
    };
}
```

Avec ces approches, vous vous assurez que this reste lié à l'instance de ExportHandler dans tous les cas.


## Le Contexte de this dans les classes en JavaScript

### Ici, le console log retourne undefined (console.log(this.formCheckFunction);)

```js
import { FormCheckFunction } from '../../../component/form/form-check-function';

export class RegisterCheckFunction {

    constructor(formCheckFunction) {
        this.formCheckFunction = formCheckFunction;
    }

    /**
     * Vérifier Le prénom
     * 
     * @returns {void}
     */
    checkFirstName() {
        $(document).on('input change focusout', '#registration_firstName', function (event) {
            this.formCheckFunction.validInputLength(
                this,
                "#error_firstName",
                'Ce champ ne doit pas être vide',
                "Le prénom est trop court",
                "Trop de caractère",
                ""
            );
        });
    }

    /**
     * Vérifier Le prénom
     * 
     * @returns {void}
     */
    checkLastName() {
        $(document).on('input change focusout', '#registration_lastName', function (event) {

            console.log(this.formCheckFunction);
            
            this.formCheckFunction.validInputLength(
                this,
                "#error_lastName",
                'Ce champ ne doit pas être vide',
                "Le nom est trop court",
                "Trop de caractère",
                ""
            );
        });
    }
}
```

### ❌ Pourquoi this.formCheckFunction est undefined ?

Le problème vient de l'utilisation de `this` dans les gestionnaires d'événements (`.on('input change focusout', ...)`). <br>
En JavaScript, `this` **à l'intérieur d'un gestionnaire d'événement ne fait pas référence à l'instance de la classe** (`RegisterCheckFunction`), mais à l'élément DOM qui a déclenché l'événement (comme `#registration_firstName` ou `#registration_lastName`).

### ✅ Solution 1 : Sauvegarder this dans une variable (self)

Une solution classique consiste à stocker `this` dans une variable (`self` ou `that`) et l'utiliser dans le gestionnaire d'événement :

```js
export class RegisterCheckFunction {
    constructor(formCheckFunction) {
        this.formCheckFunction = formCheckFunction;
    }

    /**
     * Vérifier Le prénom
     */
    checkFirstName() {
        let self = this; // Stocke l'instance actuelle
        $(document).on('input change focusout', '#registration_firstName', function (event) {
            self.formCheckFunction.validInputLength(
                this, // Ici, `this` est l'élément input
                "#error_firstName",
                'Ce champ ne doit pas être vide',
                "Le prénom est trop court",
                "Trop de caractères",
                ""
            );
        });
    }

    /**
     * Vérifier Le nom
     */
    checkLastName() {
        let self = this;
        $(document).on('input change focusout', '#registration_lastName', function (event) {
            console.log(self.formCheckFunction); // ✅ Maintenant, ce n'est plus undefined
            
            self.formCheckFunction.validInputLength(
                this,
                "#error_lastName",
                'Ce champ ne doit pas être vide',
                "Le nom est trop court",
                "Trop de caractères",
                ""
            );
        });
    }
}
```

### ✅ Solution 2 : Utiliser une fonction fléchée (ES6)

Les fonctions fléchées (`() => {}`) ne créent pas leur propre `this`, donc elles conservent le `this` de la classe :

```js
export class RegisterCheckFunction {
    constructor(formCheckFunction) {
        this.formCheckFunction = formCheckFunction;
    }

    /**
     * Vérifier Le prénom
     */
    checkFirstName() {
        $(document).on('input change focusout', '#registration_firstName', (event) => {
            this.formCheckFunction.validInputLength(
                event.target, // `this` n'est plus l'input, donc on utilise event.target
                "#error_firstName",
                'Ce champ ne doit pas être vide',
                "Le prénom est trop court",
                "Trop de caractères",
                ""
            );
        });
    }

    /**
     * Vérifier Le nom
     */
    checkLastName() {
        $(document).on('input change focusout', '#registration_lastName', (event) => {
            console.log(this.formCheckFunction); // ✅ Maintenant, `this.formCheckFunction` fonctionne

            this.formCheckFunction.validInputLength(
                event.target,
                "#error_lastName",
                'Ce champ ne doit pas être vide',
                "Le nom est trop court",
                "Trop de caractères",
                ""
            );
        });
    }
}
```

### 📌 Quelle solution choisir ?

| **Solution**                | **Avantages**             | **Inconvénients**                           |
| --------------------------- | ------------------------- | ------------------------------------------- |
|  1. `self = this`           | Compatible avec ES5       | Moins élégant                               |
|  2. Fonction fléchée (`=>`) | Plus moderne et propre    | Non compatible avec ES5 (mais OK en ES6+)   |

Si votre projet utilise **ES6+, utilisez la solution avec les fonctions fléchées**, car c'est plus propre et évite d'avoir une variable intermédiaire (`self`).

### 🚀 Exemple d'utilisation :

```js
import { FormCheckFunction } from '../../../component/form/form-check-function';
import { RegisterCheckFunction } from './register-check-function';

// Création de l'instance
const formCheckFunction = new FormCheckFunction();
const registerCheck = new RegisterCheckFunction(formCheckFunction);

// Active les vérifications
registerCheck.checkFirstName();
registerCheck.checkLastName();
```

Avec cette correction, **le** `console.log(this.formCheckFunction)` **fonctionne bien**, et votre `formCheckFunction.validInputLength(...)` s'exécute correctement à chaque modification des champs du formulaire. 🎯