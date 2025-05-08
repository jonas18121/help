# Slider 1 débutant

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
    }
    
    .slider img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity .5s;
    }
    
    .slider img.active {
        opacity: 1;
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

    next.on('click', function() {
        step++;
        if(step >= countImg) {
            step = 0;
        }
        removeClass(imgSlider, countImg);
        addClass(imgSlider[step], 'active');
    });
    
    prev.on('click', function() {
        step--;
        if(step < 0) {
            step = countImg - 1;
        }
        removeClass(imgSlider, countImg);
        addClass(imgSlider[step], 'active');
    });
    
    setInterval(function() {
        step++;
        if(step >= countImg) {
            step = 0;
        }
        removeClass(imgSlider, countImg);
        addClass(imgSlider[step], 'active');

    }, 10000);
});

function removeClass(imgSlider, countImg) {
    for(let i = 0 ; i < countImg ; i++) {
        $(imgSlider[i]).removeClass('active');
    }
}

function addClass(imgSliderStep,className) {
    $(imgSliderStep).addClass(className);
}
```