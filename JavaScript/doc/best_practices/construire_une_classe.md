
# Construire une classe en JavaScript

Voici un **guide complet et moderne** sur **toutes les façons possibles de construire une classe en JavaScript**, incluant :

1. Propriétés (publiques, privées, statiques)

2. Méthodes (publiques, privées, statiques, accesseurs)

3. Champs de classe (avec valeur ou non)

4. Initialisation dynamique

5. Blocs d'initialisation statiques

6. Héritage

7. Getters / Setters

8. Symboles

## 🧱 1. Structure de base d'une classe

```js
"use strict";

class Animal {
    constructor(name) {
        this.name = name; // propriété d'instance
    }

    speak() {           // méthode publique
        console.log(`${this.name} fait du bruit.`);
    }
}
```

## 🧩 2. Propriétés dans une classe

### A. Propriétés d'instance (définies dans le constructeur)

```js
"use strict";

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
```

### B. Champs de classe (champ public, ES2022)

```js
"use strict";

class Person {
    name = 'Inconnu'; // valeur par défaut
    age;              // sera undefined

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
```

### C. Propriétés privées (avec #, ES2022)

```js
"use strict";

class Compte {
    #solde = 0;

    constructor(soldeInitial) {
        this.#solde = soldeInitial;
    }

    getSolde() {
        return this.#solde;
    }
}
```

### D. Propriétés statiques (class-level)

```js
"use strict";

class Voiture {
    static nbRoues = 4;

    static description() {
        return "Toutes les voitures ont " + this.nbRoues + " roues.";
    }
}
```

## 🔧 3. Méthodes dans une classe

### A. Méthode publique

```js
"use strict";

class Chien {
    aboyer() {
        console.log("Wouf !");
    }
}
```

### B. Méthode privée (avec #)

```js
"use strict";

class Utilisateur {
    #log(message) {
        console.log("Log interne : " + message);
    }

    faireQuelqueChose() {
        this.#log("Action effectuée");
    }
}
```

### C. Méthodes statiques

```js
"use strict";

class MathUtils {
    static carre(x) {
        return x * x;
    }
}
```

## 🔁 4. Getters / Setters (accesseurs)

```js
"use strict";

class Cercle {
    constructor(rayon) {
        this._rayon = rayon;
    }

    get aire() {
        return this._rayon;
    }

    set rayon(rayon) {
        this._rayon = rayon;
    }
}
```

## 🧬 5. Héritage (extends)

```js
"use strict";

class Animal {
    constructor(nom) {
        this.nom = nom;
    }

    parler() {
        console.log(`${this.nom} fait du bruit.`);
    }
}

class Chat extends Animal {
    parler() {
        console.log(`${this.nom} miaule.`);
    }
}

const monChat = new Chat("Félix");
monChat.parler(); // "Félix miaule."
```

## ⚡ 6. Blocs d'initialisation statiques

Permet d’exécuter du code une seule fois lors du chargement de la classe :

```js
"use strict";

class Config {
    static version;
    static {
        this.version = "1.0.0";
        console.log("Classe Config initialisée !");
    }
}
```

## 🔐 7. Utilisation de Symboles comme propriétés privées masquées

```js
"use strict";

const secret = Symbol("secret");

class Mystere {
    constructor(valeur) {
        this[secret] = valeur;
    }

    reveler() {
        return this[secret];
    }
}
```

## 🔄 8. Mixins (ajout dynamique de comportements)

```js
"use strict";

let volant = {
    voler() {
        console.log("Je vole !");
    }
};

class Oiseau {}
Object.assign(Oiseau.prototype, volant);

const pigeon = new Oiseau();
pigeon.voler();
```

## 🧾 Exemple final complet

```js
"use strict";

class Utilisateur {
    // Static Property
    static nbUtilisateurs = 0;
    static {
        console.log("Classe Utilisateur chargée !");
    }

    // Private Property
    #motDePasse;

    // Public Property
    nom = "Anonyme";
    email;

    constructor(nom, email, mdp) {
        this.nom = nom;
        this.email = email;
        this.#motDePasse = mdp;
        Utilisateur.nbUtilisateurs++;
    }

    // Static Method
    static afficherTotal() {
        return `Total : ${this.nbUtilisateurs}`;
    }

    // Private Method
    #log(message) {
        console.log("Log interne : " + message);
    }

    // Public Method
    login(mdp) {
        return mdp === this.#motDePasse;
    }

    get info() {
        return `${this.nom} (${this.email})`;
    }

    set changerMotDePasse(nouveau) {
        this.#motDePasse = nouveau;
    }


    faireQuelqueChose() {
        this.#log("Action effectuée");
    }
}
```

## ✅ Conclusion
Une classe JS peut contenir :

| Élément               | But                               | Syntaxe           |
| --------------------- | --------------------------------- | ----------------- |
| Propriété d’instance  | Stocker les données de l’objet    | this.nom = val    |
| Champ de classe       | Valeur par défaut                 | nom = val         |
| Propriété privée      | Donnée encapsulée                 | #nom              |
| Propriété statique    | Associée à la classe              | static nom = val  |
| Méthode publique      | Comportement accessible           | nom()             |
| Méthode privée        | Comportement interne              | #nom()            |
| Méthode statique      | Outils liés à la classe           | static nom()      |
| Get / Set             | Accès contrôlé                    | get, set          |
| Héritage              | Étendre une autre classe          | extends           |
| Initialiseur statique | Exécuter du code une fois         | static { ... }    |
| Symboles              | Pseudo-privé avec Symbol()        | obj[monSymbole]   |