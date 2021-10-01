# Quelques astuces pour Angular


## Pour afficher un tableau/liste d'object JSON

Lorsqu'on veut afficher un objet et que ça s'afficher commen ça `[Oject Object]`,
il fault utiliser le `PIPE JSON ( {{ var | json }} )` dans les doubles accolade `pour` que l'objet soit `transformé en string`, très utile pour débuger

exemple :

Dans le fichier `liste.component.ts`

    class listeComponent implements OnInit {

        variablesListeJson = [];

        ngOnInt() : void {
            this.getListe()
        }

        getListe() {
            this.varaibleListeJson = this.ts.getListe();
        }
    }

Dans le fichier `liste.component.html`

    <h3>Afficher le contenu qui est dans la liste</h3>

    {{ variablesListeJson | json }}


## Mettre des données dans un tableau

Dans fichier .ts

    private technos : Technology[] = []; 

    createTechno(techno) {
        
        const newTechno = { id: Date.now(), ...techno};
        this.technos = [newTechno, ...this.technos]; 
    }


## Router, rechargement de l'affichage dans la même page mais avec des données différentes

Au lieu de prendre les valeurs de paramètre de "snapshot.params", vous devez vous abonner à ce activatedRoute qui est indiqué ci-dessous.

    import { ActivatedRoute, Router, ParamMap } from "@angular/router";
    mettez ce code dans votre ngOnInit()

    ngOnInit() {

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.competitionId = params.get('competitionId ');
            let condition = params.get('condition ');
        });
    }


Par instantané, le rechargement ne se produit pas lors de la modification des paramètres de chemin dans l'url car le constructeur n'est pas appelé. 
Mais en utilisant l'abonnement, il écoutera les modifications apportées aux paramètres.


autre exemple :

    ngOnInit() {

        this.route.paramMap.subscribe((params) => {

        this.id = params.get('id');
        console.log('ID de la page',this.id);
    
        this.solution = SOLUTIONS.find(sol => sol.id === 'liste-de-nos-services');
        console.log('propriété solution', this.solution);
    
        this.oneService = this.solution.solutions.find(service => service.id === this.id);
        console.log('propriété d\'un service', this.oneService);
        });
    }

## Route paramétrer avec ? et &



Supposons que votre URL soit http://mit.edu/dashboard et que le résultat souhaité soit http://mit.edu/dashboard/user?id=1 alors utilisez le code ci-dessous

    <a [routerLink]="['user']" [queryParams]="{id: 1}" </a>

Supposons que votre URL soit http://mit.edu/dashboard et que le résultat souhaité soit http://mit.edu/user?id=1, alors utilisez le code ci-dessous ["La différence est / Dashobard" est manquant ici dans l'URL]

    <a [routerLink]="['/user']" [queryParams]="{id: 1}" </a>

Supposons que votre URL soit http://mit.edu/dashboard et que le résultat souhaité soit http://mit.edu/user?produits=micro&qualite=deluxe, alors utilisez le code ci-dessous 

    <a [routerLink]="['/user']" [queryParams]="{produits: 'micro', qualite:  'deluxe'}" </a>