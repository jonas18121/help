# Liste de code de construction d'annimations 

site : https://www.theappguruz.com/tag-tools/web/CSSAnimations/

site : https://animista.net/play/basic/rotate/rotate-bl

MDN : https://developer.mozilla.org/fr/docs/Web/CSS/animation

## Slide Effects

### slideInDown

    .slideInDown {
        -webkit-animation-name: slideInDown;
        animation-name: slideInDown;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideInDown {
        0% {
            -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
    @keyframes slideInDown {
        0% {
            -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    } 

### slideInLeft

    .slideInLeft {
        -webkit-animation-name: slideInLeft;
        animation-name: slideInLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideInLeft {
        0% {
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @keyframes slideInLeft {
        0% {
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    } 

### slideInRight

    .slideInRight {
        -webkit-animation-name: slideInRight;
        animation-name: slideInRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideInRight {
        0% {
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @keyframes slideInRight {
        0% {
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
    } 

### slideInUp

    .slideInUp {
        -webkit-animation-name: slideInUp;
        animation-name: slideInUp;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideInUp {
        0% {
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
    @keyframes slideInUp {
        0% {
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
            visibility: visible;
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    } 

### slideOutDown

    .slideOutDown {
        -webkit-animation-name: slideOutDown;
        animation-name: slideOutDown;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideOutDown {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
        }
    }
    @keyframes slideOutDown {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
        }
    } 

### slideOutLeft

    .slideOutLeft {
        -webkit-animation-name: slideOutLeft;
        animation-name: slideOutLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideOutLeft {
        0% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
        }
    }
    @keyframes slideOutLeft {
        0% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
        }
    } 

### slideOutRight 

    .slideOutRight {
        -webkit-animation-name: slideOutRight;
        animation-name: slideOutRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideOutRight {
        0% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
        }
    }
    @keyframes slideOutRight {
        0% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
        }
    } 

### slideOutUp

    .slideOutUp {
        -webkit-animation-name: slideOutUp;
        animation-name: slideOutUp;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes slideOutUp {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
        }
    }
    @keyframes slideOutUp {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            visibility: hidden;
            -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
        }
    } 

## Fade Effects

### fadeIn

    .fadeIn {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    } 

### fadeInDown 

    .fadeInDown {
        -webkit-animation-name: fadeInDown;
        animation-name: fadeInDown;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInDown {
        0% {
        opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInDown {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    } 

### fadeInDownBig

    .fadeInDownBig {
        -webkit-animation-name: fadeInDownBig;
        animation-name: fadeInDownBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInDownBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -2000px, 0);
            transform: translate3d(0, -2000px, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInDownBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -2000px, 0);
            transform: translate3d(0, -2000px, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    } 

### fadeInLeft 

    .fadeInLeft {
        -webkit-animation-name: fadeInLeft;
        animation-name: fadeInLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInLeft {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInLeft {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    } 
