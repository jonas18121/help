# Astuces en CSS

### Ajuster la hauteur de la couleur du background d'une balise HTML

HTML

    <p class="my_para">Mon paragraphe</p>


CSS

    .my_para {
        background: linear-gradient(to right, rgb(28, 169, 28), rgb(28, 169, 28)) left bottom no-repeat;
        background-size: 100% 47px;
    }

#### Avoir les images à la même hauteur dans une liste carte composer de textes au dessus et d'images en bas  

On donne une hauteur à la balise div qui contient le texte, exemple : .card_text { height: 590px; }

CSS

    .list_card {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 80px;
    }

    .card {
        background-color:#C8C8C8;
        width: 340px;
    }   

    .card_text {
        padding: 20px 20px 0 20px ;
        height: 590px;
    } 

    .card_img {
        height: 150px;
    }



HTML

    <section class="list_card">

        <div class="card">

            <div class="card_text">

                <h3> El titro <h3>

                <p>
                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla 
                </p>
            </div>

            <img src="public/img/my_image.png" alt="my_image" class="card_img">
        </div>

        <div class="card">

            <div class="card_text">

                <h3> El titro <h3>

                <p>
                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla 

                    blabla blabla blabla blabla blabla blabla blabla blabla
                </p>
            </div>

            <img src="public/img/my_image.png" alt="my_image" class="card_img">
        </div>

        <div class="card">

            <div class="card_text">

                <h3> El titro <h3>

                <p>
                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla 

                    blabla blabla blabla blabla blabla blabla blabla blabla

                    blabla blabla blabla blabla blabla blabla blabla blabla
                </p>
            </div>

            <img src="public/img/my_image.png" alt="my_image" class="card_img">
        </div>
    </section>

## Vertical text CSS

https://codepen.io/ivankemp/pen/gvggXz


## Texte qui se fond dans son arrière-plan

https://css-tricks.com/almanac/properties/m/mix-blend-mode/

La propriété `mix-blend-mode` définit comment le contenu d'un élément doit se fondre dans son arrière-plan

    h1 {
        mix-blend-mode: exclusion;
    }

Valeurs

- initial: le paramètre par défaut de la propriété qui ne définit pas de mode de fusion.

- inherit: un élément héritera du mode de fusion de son élément parent.

- unset: supprime le mode de fusion actuel d'un élément.

- <blend-mode>: c'est l'attribut de l'un des modes de fusion ci-dessous :

- normal: cet attribut n'applique aucun mélange.

- multiply: l'élément est multiplié par le fond et remplace la couleur du fond. La couleur résultante est toujours aussi sombre que l'arrière-plan.

- screen: multiplie le fond et le contenu complète alors le résultat. Cela se traduira par un contenu plus brillant que le fichier background-color.

- overlay : multiplie ou filtre le contenu en fonction de la couleur de fond. C'est l'inverse du mode de fusion de la lumière dure.

- assombrir : l'arrière-plan est remplacé par le contenu là où le contenu est plus sombre, sinon, il est laissé tel quel.

- lighten: l'arrière-plan est remplacé par le contenu où le contenu est plus clair.

- color-dodge: cet attribut éclaircit la couleur d'arrière-plan pour refléter la couleur du contenu.

- color-burn: cela assombrit l'arrière-plan pour refléter la couleur naturelle du contenu.

- hard-light: selon la couleur du contenu, cet attribut le filtrera ou le multipliera.

- soft-light: selon la couleur du contenu, cela l'assombrira ou l'éclaircira.

- difference: cela soustrait la plus foncée des deux couleurs de la couleur la plus claire.

- exclusion: similaire à differencemais avec un contraste plus faible.

- hue: crée une couleur avec la teinte du contenu combinée avec la saturation et la luminosité de l'arrière-plan.

- saturation: crée une couleur avec la saturation du contenu combinée avec la teinte et la luminosité de l'arrière-plan.

- color: crée une couleur avec la teinte et la saturation du contenu et la luminosité de l'arrière-plan.

- luminosity: crée une couleur avec la luminosité du contenu et la teinte et la saturation de l'arrière-plan. C'est l'inverse de l' colorattribut.