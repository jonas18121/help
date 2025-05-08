# Slider 2 débutant

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="page_home_container">
        <section>
            <section id="page_home_slider">
                
                <div class="slider">

                    <img src="uploads/images/slider/location-de-piece.jpg" alt="img1" class="img_slider active" />
                    <img src="uploads/images/slider/location-de-box.jpg" alt="img2" class="img_slider" />
                    <img src="uploads/images/slider/location-de-garage.jpg" alt="img3" class="img_slider" />
                    <img src="uploads/images/slider/location-de-entrepot.jpg" alt="img2" class="img_slider" />
                    <img src="uploads/images/slider/location-de-hangar.jpeg" alt="img3" class="img_slider" />

                    <div class="next"><i class="fas fa-chevron-circle-right"></i></div>
                    <div class="prev"><i class="fas fa-chevron-circle-left"></i></div>

                </div>
            </section>

            <section>
                <h1>Partie 1</h1>
            </section>
            <section>
                <h1>Partie 2</h1>
            </section>
            <section>
                <h1>Partie 3</h1>
            </section>
        </section>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

```css
/* style.css */
    .slider {
        height: 80vh;
        position: relative;
        overflow: hidden; /* Empêche le débordement horizontal */
    }
    
    .slider img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        /* left: 0; */
        opacity: 1;
        /* transition: opacity .5s; */
        left: 100%; /* Commencez les images en dehors de la zone visible */
        transition: transform 0.5s; /* Utilisez la propriété transform pour la transition */
    }
    
    .slider img.active {
        /* opacity: 1; */
        transform: translateX(0); /* Déplacez les images à gauche pour les afficher */
    }
    
    .next, .prev {
        color: #fff;
        font-size: 6rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    
    .next {
        right: 1rem;
    }
    
    .prev {
        left: 1rem;
    }
```

```js
//  app.js

"use strict";

$(function () {

    const imgSlider = $(".img_slider");
    let step = 0;
    const countImg = imgSlider.length;
    const prev = $(".prev");
    const next = $(".next");

    let intervalID; // Déplacez la déclaration de intervalID ici

    function slideLeft() {
        $(imgSlider[step]).animate({ left: '100%' }, 500);
        step = (step - 1 + countImg) % countImg;
        $(imgSlider[step]).css('left', '-100%');
        $(imgSlider[step]).animate({ left: '0' }, 500);
        resetInterval();
    }

    function slideRight() {
        $(imgSlider[step]).animate({ left: '-100%' }, 500);
        step = (step + 1) % countImg;
        $(imgSlider[step]).css('left', '100%');
        $(imgSlider[step]).animate({ left: '0' }, 500);
        resetInterval();
    }

    function startInterval() {
        intervalID = setInterval(function() {
            slideRight();
            resetInterval();
        }, 5000);
    }

    function resetInterval() {
        clearInterval(intervalID); // Annulez l'intervalle précédent
        startInterval(); // Démarrez un nouvel intervalle
    }

    // Déplacez la première image à la position de départ (left: 0%) au chargement de la page
    $(imgSlider[step]).css('left', '0');

    next.on('click', slideRight);

    prev.on('click', slideLeft);

    startInterval(); // Démarrez le premier intervalle
});
```
Ce code utilise jQuery pour créer un carrousel d'images (slider) avec des boutons "prev" et "next" pour changer les images. 
Il inclut également un défilement automatique. Voici une explication étape par étape de ce code :

1. `$(function () { ... });`: Cette ligne encapsule tout le code jQuery pour s'assurer qu'il s'exécute une fois que le document HTML est complètement chargé. 
Cela garantit que le code JavaScript ne s'exécutera pas avant que la page HTML soit prête.

2. `const imgSlider = $(".img_slider");`: Cette ligne sélectionne tous les éléments HTML ayant la classe CSS "img_slider" et les stocke dans la variable imgSlider. 
Ces éléments sont supposés être les images du slider.

3. `let step = 0;`: Cette variable step est utilisée pour suivre l'index de l'image actuellement affichée.

4. `const countImg = imgSlider.length;`: Cette variable countImg contient le nombre total d'images dans le slider, calculé en utilisant la propriété .length sur l'objet jQuery imgSlider.

5. `const prev = $(".prev"); et const next = $(".next");`: Ces lignes sélectionnent les éléments HTML ayant les classes CSS "prev" et "next" respectivement, qui sont supposés être les boutons pour afficher les images précédentes et suivantes.

6. `let intervalID;`: Cette variable intervalID est déclarée pour stocker l'ID de l'intervalle qui sera utilisé pour le défilement automatique.

7. Les fonctions `slideLeft()` et `slideRight()` sont utilisées pour animer le déplacement des images vers la gauche et vers la droite, respectivement. 
Ces fonctions utilisent la méthode animate() de jQuery pour animer les transitions entre les images.

8. `function startInterval() { ... }`: Cette fonction initialise l'intervalle en utilisant la méthode setInterval(). 
Elle appelle la fonction slideRight() pour déplacer les images vers la droite et réinitialise l'intervalle en appelant resetInterval().

9. `function resetInterval() { ... }`: Cette fonction annule l'intervalle précédent en utilisant clearInterval() et redémarre un nouvel intervalle en appelant startInterval(). 
Cela permet de réinitialiser l'intervalle à chaque fois que l'utilisateur interagit avec les boutons "prev" ou "next".

10. `$(imgSlider[step]).css('left', '0');`: Cette ligne place la première image du slider à la position de départ (left: 0%) lorsque la page est chargée.

11. `next.on('click', slideRight);` et `prev.on('click', slideLeft);`: Ces lignes ajoutent des gestionnaires d'événements qui appellent les fonctions slideRight() et slideLeft() respectivement lorsque l'utilisateur clique sur les boutons "next" ou "prev".

12. `startInterval();`: Enfin, cette ligne démarre le premier intervalle pour commencer le défilement automatique du slider dès que la page est chargée.

En résumé, ce code utilise jQuery pour créer un carrousel d'images avec des boutons de navigation et un défilement automatique. 
Lorsque l'utilisateur clique sur les boutons "prev" ou "next", l'intervalle est réinitialisé pour maintenir le défilement automatique.

#### function slideLeft()

La fonction slideLeft() est utilisée pour animer le déplacement des images vers la gauche dans le carrousel. Voici une explication étape par étape de cette fonction :

1. `$(imgSlider[step]).animate({ left: '100%' }, 500);`: Cette ligne utilise jQuery pour animer la transition de l'image actuellement affichée vers la droite. 
Elle déplace l'image hors de la vue en la faisant glisser vers la droite (left: 100%) en 500 millisecondes (0,5 seconde).

2. `step = (step + 1) % countImg;`: Après avoir animé la sortie de l'image actuelle, cette ligne incrémente la variable step de 1 pour passer à l'index de l'image suivante. 
La valeur est ensuite calculée en utilisant l'opérateur de modulo (%) par countImg, ce qui permet de boucler à la première image lorsque l'on atteint la fin du carrousel.

3. `$(imgSlider[step]).css('left', '-100%');`: Cette ligne configure la position de l'image suivante en dehors de la vue en la déplaçant vers la gauche (left: -100%). 
L'image est positionnée à gauche de l'écran pour qu'elle puisse être animée vers la droite pour apparaître à la vue.

4. `$(imgSlider[step]).animate({ left: '0' }, 500);`: Enfin, cette ligne anime l'entrée de l'image suivante en la faisant glisser vers la gauche (left: 0%) en 500 millisecondes, ce qui la ramène à la vue.

5. `resetInterval();`: Cette ligne appelle la fonction resetInterval() pour réinitialiser l'intervalle de défilement automatique. 
Cela permet de garantir que le défilement automatique se poursuive sans interruption, même si l'utilisateur interagit avec les boutons "prev" ou "next".

En résumé, la fonction slideLeft() anime la transition d'une image du carrousel vers la gauche en faisant disparaître l'image actuelle vers la droite, puis en faisant apparaître la prochaine image depuis la gauche. 
Elle prend également en charge la réinitialisation de l'intervalle de défilement automatique pour maintenir la continuité du carrousel.

#### function slideRight()

La fonction slideRight() est utilisée pour animer le déplacement des images vers la droite dans le carrousel. 
Voici une explication étape par étape de cette fonction :

1. `$(imgSlider[step]).animate({ left: '-100%' }, 500);`: Cette ligne utilise jQuery pour animer la transition de l'image actuellement affichée vers la gauche. 
Elle déplace l'image hors de la vue en la faisant glisser vers la gauche (left: -100%) en 500 millisecondes (0,5 seconde).

2. `step = (step - 1 + countImg) % countImg;`: Après avoir animé la sortie de l'image actuelle, cette ligne décrémente la variable step de 1 pour passer à l'index de l'image précédente. 
La valeur est ensuite calculée en utilisant l'opérateur de modulo (%) par countImg, ce qui permet de boucler à la dernière image lorsque l'on atteint le début du carrousel.

3. `$(imgSlider[step]).css('left', '100%');`: Cette ligne configure la position de l'image précédente en dehors de la vue en la déplaçant vers la droite (left: 100%). 
L'image est positionnée à droite de l'écran pour qu'elle puisse être animée vers la gauche pour apparaître à la vue.

4. `$(imgSlider[step]).animate({ left: '0' }, 500);`: Enfin, cette ligne anime l'entrée de l'image précédente en la faisant glisser vers la droite (left: 0%) en 500 millisecondes, ce qui la ramène à la vue.

5. `resetInterval();`: Cette ligne appelle la fonction resetInterval() pour réinitialiser l'intervalle de défilement automatique. Cela permet de garantir que le défilement automatique se poursuive sans interruption, même si l'utilisateur interagit avec les boutons "prev" ou "next".

En résumé, la fonction slideRight() anime la transition d'une image du carrousel vers la droite en faisant disparaître l'image actuelle vers la gauche, puis en faisant apparaître l'image précédente depuis la droite. 
Elle prend également en charge la réinitialisation de l'intervalle de défilement automatique pour maintenir la continuité du carrousel.