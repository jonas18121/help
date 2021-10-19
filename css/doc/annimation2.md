# Liste de code de construction d'annimations 2

## Flip Effects

### animated.flip

    .animated.flip {
        -webkit-backface-visibility: visible;
        backface-visibility: visible;
        -webkit-animation-name: flip;
        animation-name: flip;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes flip {
        0% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
        40% {
            -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
            transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
        50% {
            -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
            transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        80% {
            -webkit-transform: perspective(400px) scale3d(.95, .95, .95);
            transform: perspective(400px) scale3d(.95, .95, .95);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        100% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
    }
    @keyframes flip {
        0% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
        40% {
            -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
            transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
        50% {
            -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
            transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        80% {
            -webkit-transform: perspective(400px) scale3d(.95, .95, .95);
            transform: perspective(400px) scale3d(.95, .95, .95);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        100% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
    } 
    

### flipInX 

    .flipInX {
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        -webkit-animation-name: flipInX;
        animation-name: flipInX;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes flipInX {
        0% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
            opacity: 0;
    }
        40% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
        }
        60% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
            transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
            opacity: 1;
        }
        80% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
            transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        }
        100% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
    }
    @keyframes flipInX {
        0% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
            opacity: 0;
        }
        40% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
        }
        60% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
            transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
            opacity: 1;
        }
        80% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
            transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        }
        100% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
    } 


### flipInY

    .flipInY {
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        -webkit-animation-name: flipInY;
        animation-name: flipInY;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes flipInY {
        0% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
            opacity: 0;
        }
        40% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
        }
        60% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
            transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
            opacity: 1;
        }
        80% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
        }
        100% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
    }
    @keyframes flipInY {
        0% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
            opacity: 0;
        }
        40% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
            -webkit-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
        }
        60% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
            transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
            opacity: 1;
        }
        80% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
        }
        100% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
    } 

### flipOutX

    .flipOutX {
        -webkit-animation-name: flipOutX;
        animation-name: flipOutX;
        -webkit-animation-duration: .75s;
        animation-duration: .75s;
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes flipOutX {
        0% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
        30% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            opacity: 1;
        }
        100% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            opacity: 0;
        }
    }
    @keyframes flipOutX {
        0% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
        30% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
            opacity: 1;
        }
        100% {
            -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
            opacity: 0;
        }
    } 


### flipOutY 

    .flipOutY {
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        -webkit-animation-name: flipOutY;
        animation-name: flipOutY;
        -webkit-animation-duration: .75s;
        animation-duration: .75s;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes flipOutY {
        0% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
        30% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
            opacity: 1;
        }
        100% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            opacity: 0;
        }
    }
    @keyframes flipOutY {
        0% {
            -webkit-transform: perspective(400px);
            transform: perspective(400px);
        }
        
        30% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
            transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
            opacity: 1;
        }
        
        100% {
            -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
            opacity: 0;
        }
    } 

## Rotate Effects

### rotateIn

    .rotateIn {
        -webkit-animation-name: rotateIn;
        animation-name: rotateIn;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateIn {
        0% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: rotate3d(0, 0, 1, -200deg);
            transform: rotate3d(0, 0, 1, -200deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    @keyframes rotateIn {
        0% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: rotate3d(0, 0, 1, -200deg);
            transform: rotate3d(0, 0, 1, -200deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    } 


### rotateInDownLeft

    .rotateInDownLeft {
        -webkit-animation-name: rotateInDownLeft;
        animation-name: rotateInDownLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateInDownLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    @keyframes rotateInDownLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    } 

### rotateInDownRight

    .rotateInDownRight {
        -webkit-animation-name: rotateInDownRight;
        animation-name: rotateInDownRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateInDownRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    @keyframes rotateInDownRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    } 

### 

    .rotateInUpLeft {
        -webkit-animation-name: rotateInUpLeft;
        animation-name: rotateInUpLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateInUpLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    @keyframes rotateInUpLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    } 


### rotateInUpRight

    .rotateInUpRight {
        -webkit-animation-name: rotateInUpRight;
        animation-name: rotateInUpRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateInUpRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, -90deg);
            transform: rotate3d(0, 0, 1, -90deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    @keyframes rotateInUpRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, -90deg);
            transform: rotate3d(0, 0, 1, -90deg);
            opacity: 0;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    } 


### rotateOut

    .rotateOut {
        -webkit-animation-name: rotateOut;
        animation-name: rotateOut;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateOut {
        0% {
            -webkit-transform-origin: center;
            transform-origin: center;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: rotate3d(0, 0, 1, 200deg);
            transform: rotate3d(0, 0, 1, 200deg);
            opacity: 0;
        }
    }
    @keyframes rotateOut {
        0% {
            -webkit-transform-origin: center;
            transform-origin: center;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: center;
            transform-origin: center;
            -webkit-transform: rotate3d(0, 0, 1, 200deg);
            transform: rotate3d(0, 0, 1, 200deg);
            opacity: 0;
        }
    } 


### rotateOutDownLeft 

    .rotateOutDownLeft {
        -webkit-animation-name: rotateOutDownLeft;
        animation-name: rotateOutDownLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateOutDownLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
    }
    @keyframes rotateOutDownLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
    } 

### rotateOutDownRight

    .rotateOutDownRight {
        -webkit-animation-name: rotateOutDownRight;
        animation-name: rotateOutDownRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateOutDownRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
            opacity: 0;
        }
    }
    @keyframes rotateOutDownRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
            opacity: 0;
        }
    }  .rotateOutUpLeft {
        -webkit-animation-name: rotateOutUpLeft;
        animation-name: rotateOutUpLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateOutUpLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
            opacity: 0;
        }
    }
    @keyframes rotateOutUpLeft {
        0% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: left bottom;
            transform-origin: left bottom;
            -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
            opacity: 0;
        }
    } 


### rotateOutUpRight

    .rotateOutUpRight {
        -webkit-animation-name: rotateOutUpRight;
        animation-name: rotateOutUpRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rotateOutUpRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 90deg);
            transform: rotate3d(0, 0, 1, 90deg);
            opacity: 0;
        }
    }
    @keyframes rotateOutUpRight {
        0% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            opacity: 1;
        }
        100% {
            -webkit-transform-origin: right bottom;
            transform-origin: right bottom;
            -webkit-transform: rotate3d(0, 0, 1, 90deg);
            transform: rotate3d(0, 0, 1, 90deg);
            opacity: 0;
        }
    } 

## Other Effects


### flash

    .flash {
        -webkit-animation-name: flash;
        animation-name: flash;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes flash {
        0%, 50%, 100% {
            opacity: 1;
        }
    
        25%, 75% {
            opacity: 0;
        }
    }
    
    @keyframes flash {
        0%, 50%, 100% {
            opacity: 1;
        }
        
        25%, 75% {
            opacity: 0;
        }
    } 

### pulse

    .pulse {
        -webkit-animation-name: pulse;
        animation-name: pulse;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes pulse {
        0% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        50% {
            -webkit-transform: scale3d(1.05, 1.05, 1.05);
            transform: scale3d(1.05, 1.05, 1.05);
        }
        100% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    @keyframes pulse {
        0% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        50% {
            -webkit-transform: scale3d(1.05, 1.05, 1.05);
            transform: scale3d(1.05, 1.05, 1.05);
        }
        100% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    } 

### rubberBand

    .rubberBand {
        -webkit-animation-name: rubberBand;
        animation-name: rubberBand;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes rubberBand {
        0% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        30% {
            -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
        }
        40% {
            -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
        }
        50% {
            -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
        }
        65% {
            -webkit-transform: scale3d(.95, 1.05, 1);
            transform: scale3d(.95, 1.05, 1);
        }
        75% {
            -webkit-transform: scale3d(1.05, .95, 1);
            transform: scale3d(1.05, .95, 1);
        }
        100% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    @keyframes rubberBand {
        0% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        30% {
            -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
        }
        40% {
            -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
        }
        50% {
            -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
        }
        65% {
            -webkit-transform: scale3d(.95, 1.05, 1);
            transform: scale3d(.95, 1.05, 1);
        }
        75% {
            -webkit-transform: scale3d(1.05, .95, 1);
            transform: scale3d(1.05, .95, 1);
        }
        100% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    } 


### shake

    .shake {
        -webkit-animation-name: shake;
        animation-name: shake;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes shake {
        0%, 100% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
        10%, 30%, 50%, 70%, 90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
        }
        20%, 40%, 60%, 80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
        }
    }
    @keyframes shake {
        0%, 100% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
        10%, 30%, 50%, 70%, 90% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
        }
        20%, 40%, 60%, 80% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
        }
    } 

### swing

    .swing {
        -webkit-transform-origin: top center;
        -ms-transform-origin: top center;
        transform-origin: top center;
        -webkit-animation-name: swing;
        animation-name: swing;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes swing {
        20% {
            -webkit-transform: rotate3d(0, 0, 1, 15deg);
            transform: rotate3d(0, 0, 1, 15deg);
        }
        40% {
            -webkit-transform: rotate3d(0, 0, 1, -10deg);
            transform: rotate3d(0, 0, 1, -10deg);
        }
        60% {
            -webkit-transform: rotate3d(0, 0, 1, 5deg);
            transform: rotate3d(0, 0, 1, 5deg);
        }
        80% {
            -webkit-transform: rotate3d(0, 0, 1, -5deg);
            transform: rotate3d(0, 0, 1, -5deg);
        }
        100% {
            -webkit-transform: rotate3d(0, 0, 1, 0deg);
            transform: rotate3d(0, 0, 1, 0deg);
        }
    }
    @keyframes swing {
        20% {
            -webkit-transform: rotate3d(0, 0, 1, 15deg);
            transform: rotate3d(0, 0, 1, 15deg);
        }
        40% {
            -webkit-transform: rotate3d(0, 0, 1, -10deg);
            transform: rotate3d(0, 0, 1, -10deg);
        }
        60% {
            -webkit-transform: rotate3d(0, 0, 1, 5deg);
            transform: rotate3d(0, 0, 1, 5deg);
        }
        80% {
            -webkit-transform: rotate3d(0, 0, 1, -5deg);
            transform: rotate3d(0, 0, 1, -5deg);
        }
        100% {
            -webkit-transform: rotate3d(0, 0, 1, 0deg);
            transform: rotate3d(0, 0, 1, 0deg);
        }
    }


### tada

    .tada {
        -webkit-animation-name: tada;
        animation-name: tada;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes tada {
        0% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        10%, 20% {
            -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
            transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
        }
        30%, 50%, 70%, 90% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
        }
        40%, 60%, 80% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
        }
        100% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }
    @keyframes tada {
        0% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
        10%, 20% {
            -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
            transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
        }
        30%, 50%, 70%, 90% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
        }
        40%, 60%, 80% {
            -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
            transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
        }
        100% {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    } 


### wobble

    .wobble {
        -webkit-animation-name: wobble;
        animation-name: wobble;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes wobble {
        0% {
            -webkit-transform: none;
            transform: none;
        }
        15% {
            -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
            transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
        }
        30% {
            -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
            transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
        }
        45% {
            -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
            transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
        }
        60% {
            -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
            transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
        }
        75% {
            -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
            transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
        }
        100% {
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes wobble {
        0% {
            -webkit-transform: none;
            transform: none;
        }
        15% {
            -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
            transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
        }
        30% {
            -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
            transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
        }
        45% {
            -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
            transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
        }
        60% {
            -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
            transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
        }
        75% {
            -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
            transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
        }
        100% {
            -webkit-transform: none;
            transform: none;
        }
    } 

### lightSpeedIn

    .lightSpeedIn {
        -webkit-animation-name: lightSpeedIn;
        animation-name: lightSpeedIn;
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes lightSpeedIn {
        0% {
            -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
            transform: translate3d(100%, 0, 0) skewX(-30deg);
            opacity: 0;
        }
        60% {
            -webkit-transform: skewX(20deg);
            transform: skewX(20deg);
            opacity: 1;
        }
        80% {
            -webkit-transform: skewX(-5deg);
            transform: skewX(-5deg);
            opacity: 1;
        }
        100% {
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    }
    @keyframes lightSpeedIn {
        0% {
            -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);
            transform: translate3d(100%, 0, 0) skewX(-30deg);
            opacity: 0;
        }
        60% {
            -webkit-transform: skewX(20deg);
            transform: skewX(20deg);
            opacity: 1;
        }
        80% {
            -webkit-transform: skewX(-5deg);
            transform: skewX(-5deg);
            opacity: 1;
        }
        100% {
            -webkit-transform: none;
            transform: none;
            opacity: 1;
        }
    } 

### lightSpeedOut

    .lightSpeedOut {
        -webkit-animation-name: lightSpeedOut;
        animation-name: lightSpeedOut;
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes lightSpeedOut {
        0% {
            opacity: 1;
        }
        100% {
            -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);
            transform: translate3d(100%, 0, 0) skewX(30deg);
            opacity: 0;
        }
    }
    @keyframes lightSpeedOut {
        0% {
            opacity: 1;
        }
        100% {
            -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);
            transform: translate3d(100%, 0, 0) skewX(30deg);
            opacity: 0;
        }
    } 
