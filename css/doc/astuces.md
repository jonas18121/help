# Astuces en CSS

### Exemple de page de détail produit

https://tailwindflex.com/@dika99/product-details-page

### CSS Button

- [Beautiful CSS buttons examples](https://getcssscan.com/css-buttons-examples)

### Utilisation de font-family

- [Google Fonts](https://fonts.google.com/specimen/Montserrat?query=mon)
- [Télécharger le font Monserrat](https://fonts.google.com/download?family=Montserrat)

Pour utiliser ce fichier de police Montserrat-VariableFont_wght.ttf dans votre projet, vous devez l'intégrer dans votre code CSS à l'aide de la règle @font-face. Voici un exemple de code CSS pour intégrer cette police variable :

```css
@font-face {
  font-family: 'Montserrat';
  src: url('fonts/Montserrat-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: normal;
}
```
Dans cet exemple, la police variable Montserrat est nommée et définie dans la règle @font-face. <br>
Le chemin d'accès à la police de caractères est spécifié dans l'URL. La valeur format('truetype-variations') est utilisée pour indiquer que la police de caractères est une police variable.<br> 
Les poids de police disponibles pour cette police variable sont spécifiés à l'aide de la propriété font-weight, allant de 100 (très léger) à 900 (très gras). <br>
La propriété font-style est utilisée pour spécifier le style de police (normal, italique, oblique, etc.).

Une fois la règle @font-face définie, vous pouvez utiliser la police variable Montserrat en spécifiant le nom de la police de caractères dans votre code CSS, comme suit :

```css
body {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}
```
Dans cet exemple, la police variable Montserrat est appliquée au corps du texte avec une épaisseur de police de 400. <br>
Les variantes de police disponibles pour cette police variable peuvent être utilisées en spécifiant des valeurs de poids de police différentes, comme suit :
```css
h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
```

Dans cet exemple, des épaisseurs de police plus élevées sont utilisées pour les titres de niveau 1 et 2.


### Ajuster la hauteur de la couleur du background d'une balise HTML

HTML
```html
    <p class="my_para">Mon paragraphe</p>
```

CSS
```css
    .my_para {
        background: linear-gradient(to right, rgb(28, 169, 28), rgb(28, 169, 28)) left bottom no-repeat;
        background-size: 100% 47px;
    }
```

#### Avoir les images à la même hauteur dans une liste carte composer de textes au dessus et d'images en bas  

On donne une hauteur à la balise div qui contient le texte, exemple : .card_text { height: 590px; }

CSS
```css
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
```


HTML

```html
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
```

### Vertical text CSS

https://codepen.io/ivankemp/pen/gvggXz


### Texte qui se fond dans son arrière-plan

https://css-tricks.com/almanac/properties/m/mix-blend-mode/

La propriété `mix-blend-mode` définit comment le contenu d'un élément doit se fondre dans son arrière-plan

```css
    h1 {
        mix-blend-mode: exclusion;
    }
```

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

### Cursor de css

https://css-tricks.com/almanac/properties/c/cursor/

### Différent exemple de box-shadow

https://getcssscan.com/css-box-shadow-examples

### Redimensionner une image sans la compresser

site [MDN](https://developer.mozilla.org/fr/docs/Web/CSS/object-fit)

```html
<img src="./img/image.png" alt="" srcset="">
```

```css
img {
    width: 300px;
    height: 300px;
    border-radius: 50%;

    /* object-fit: cover; permet d'étirer l'image a un peut plus que la valeur de height: 300px;
        afin de redimensionner l'image pour qu'elle soit bien proportionner a width: 300px;
        On aura une image bien proportionner, mais on n'aura pas une image complete entre width: 300px; et  height: 300px; puis qu'il sera plus grand
    */
    object-fit: cover; 

    /* object-fit: contain; permet de redimensionner l'image pour qu'elle soit complete entre width: 300px; et  height: 300px;
        On aura une image bien proportionner et complete, mais l'image sera plus petite que height: 300px;
    */
    /* object-fit: contain; */
}
```


### appliquer une ombre portée sur une image ou polygone

site css-tricks: https://css-tricks.com/using-box-shadows-and-clip-path-together/

site MDN sur `drop-shadow()` :  https://developer.mozilla.org/fr/docs/Web/CSS/filter-function/drop-shadow()


Faisons une petite étape par étape d'une situation où vous ne pouvez pas tout à fait faire ce qui semble avoir du sens, mais vous pouvez toujours le faire avec la ruse CSS. Dans ce cas, il s'agira d'appliquer une ombre à une forme.


1) tu fais une boite
```css
    .tag {
        background: #FB8C00;
        color: #222;
        font: bold 32px system-ui;
        padding: 2rem 3rem 2rem 4rem;
    }
```


2) Vous le façonnez dans une belle forme d'étiquette Vous utilisez `clip-path` parce que c'est super pour ça.

```css
    .tag {
        clip-path: polygon(30px 0%, 100% 0%, 100% 100%, 30px 100%, 0 50%);
    }
```

3) Vous voulez une ombre dessus, alors vous Essayez d'utiliser `box-shadow`.

```css
    .tag {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    }
```

Mais ça ne marche pas. Rien ne s'affiche. Vous pensez que vous devenez fou. Vous supposez que vous avez une mauvaise syntaxe. Vous ne le faites pas. Le problème c'est que `clip-path` le coupe.

4) Vous pouvez ombrager un élément parent à la place
Il y a un filtre qui fait aussi des ombres : `drop-shadow()` . Mais vous ne pouvez pas l'utiliser directement sur l'élément car cela le coupera également. Alors tu fais un parent :

```html
    <span class="tag-wrap">
        <span class="tag">

            Tag

        </span>
    </span>
``` 


 
5) Vous ne pouvez pas non plus utiliser `box-shadow` sur ce parent, car le parent est toujours un rectangle et l'ombre sera fausse. Mais vous pouvez utiliser filter, et l'ombre suivra la forme.

```css
    .tag-wrap {
        filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
    }
```

C'est tout.

