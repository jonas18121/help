# Quelques astuces pour Angular


# Pour afficher un tableau/liste d'object JSON

Lorsqu'on veut afficher un objet et que ça s'afficher commen ça `[Oject Object]`,
il fault utiliser le `PIPE JSON ( {{ var | json }} )` dans les doubles accolade `pour` que l'objet soit `transformé en string`, exemple :

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


