# Slider 3 débutant avec texte à l'intérieur du slide

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

                    <div class="img_slider">
                        <img src="uploads/images/slider/location-de-piece.jpg" alt="location-de-piece" class="" />
                        <div class="slider_text">
                            <h2>Location de pièces</h2>
                            <p>Louez une pièce de maison partout en France</p>
                        </div>
                    </div>

                    <div class="img_slider">
                        <img src="uploads/images/slider/location-de-box.jpg" alt="location-de-box" class="" />
                        <div class="slider_text">
                            <h2>Location de box</h2>
                            <p>Louez un box partout en France</p>
                        </div>
                    </div>

                    <div class="img_slider">
                        <img src="uploads/images/slider/location-de-garage.jpg" alt="location-de-garage" class="" />
                        <div class="slider_text">
                            <h2>Location de garage</h2>
                            <p>Louez un garage partout en France</p>
                        </div>
                    </div>

                    <div class="img_slider">
                        <img src="uploads/images/slider/location-de-entrepot.jpg" alt="location-de-entrepot" class="" />
                        <div class="slider_text">
                            <h2>Location d' entrepot</h2>
                            <p>Louez un entrepot partout en France</p>
                        </div>
                    </div>

                    <div class="img_slider">
                        <img src="uploads/images/slider/location-de-hangar.jpeg" alt="location-de-hangar" class="" />
                        <div class="slider_text">
                            <h2>Location de hangar</h2>
                            <p>Louez un hangar partout en France</p>
                        </div>
                    </div>

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

.slider .img_slider {
    height: 100%;
    width: 100%; 
    position: absolute;
    top: 0;
    opacity: 1;
    left: 100%; /* Commencez les images en dehors de la zone visible */
    transition: transform 0.5s; /* Utilisez la propriété transform pour la transition */
}

.slider .img_slider img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.slider img.active {
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

.slider_text {
    position: absolute;
    top: 30%;
    left: 10%;
    font-size: 4vw;
}

.slider_text h2 {
    font-size: 6vw;
}

.slider_text , .slider_text h2 {
    text-align: left;
    color: #9f34cb;
}
```

```js
//  app.js

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
        }, 10000);
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