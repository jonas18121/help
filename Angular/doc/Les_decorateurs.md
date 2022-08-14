# Les Décorateurs

Angular utilise massivement les Décorateurs depuis sa version 2,
les possibilités des Décorateurs sont très intéressantes pour des applications métiers plus concrètes.

Ce sont des fonctions capables d’étendre le comportement d’autres fonctions sans les modifier.

## Le Décorateur @Injectable 

Permet de rendre la classe dans lequel, il est appelé injectable grâce aux injections de dépendances.

Dans la classe `RandomService` 

- On importe le composant `Injectable` depuis '@angular/core'
- On appèle `@Injectable()` au-dessus de la déclaration de la classe RandomService
- Maintenant, on pourra l'injecter dans une autre classe


Dans la classe `RandomService` 

    import { Injectable } from '@angular/core';

    @Injectable({
        providedIn: 'root',
    })
    export class RandomService {
    
    }


Dans la classe `PersonneComponent`

- On importe `RandomService` 
- On crée la propriété random en privé et qui accèptera un objet de type `RandomService`
- On fait une injection de dépendance de la classe `RandomService` dans le constructeur de `PersonneComponent` et on met `RandomService` dans la propriété `this.random`
- Angular a su faire l'injection de dépendance de la classe `RandomService` dans le constructeur de `PersonneComponent` car on a mis le décorateur `@Injectable()` dans la classe `RandomService`


Dans la classe `PersonneComponent`

    import { RandomService } from '../services/random/random.service';

    @Component({
        selector: 'my-person',
        templateUrl: './person.component.html',
        styleUrls: ['./person.component.scss']
    })
    export class PersonComponent implements OnInit {

        private random: RandomService;

        constructor(random: RandomService) 
        {
            this.random = random;
        }

        ngOnInit() {}

    }