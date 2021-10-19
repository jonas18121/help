# Pour faire joué une annimation au scroll Angular

Dans `test-annimation.component.ts`

    import { Component, OnInit, HostListener } from '@angular/core';

    @Component({
        selector: 'app-test-annimation',
        templateUrl: './test-annimation.component.html',
        styleUrls: ['./test-annimation.component.scss']
    })
    export class TestAnnimationComponent implements OnInit {

        constructor() { }

        ngOnInit(): void {
        }

        @HostListener('window:scroll', ['$event'])
        onWindowScroll(e) {
            this.applyScrolledClass('scroll');
            this.applyScrolledClass('zoomIn');
            this.applyScrolledClass('fadeIn');
        }

        /**
        * récupère l'id du bloc puis lui rajoute ou enlève la classe scrolled selon le sens qu'on scroll
        * @param elID 
        */
        applyScrolledClass(elID) {

            try {
                const el = document.getElementById(elID);

                if (window.innerHeight > el.getBoundingClientRect().top) {

                    el.classList.add('scrolled');

                } else if (window.innerHeight <= el.getBoundingClientRect().top) {
                    
                    el.classList.remove('scrolled');
                }
            } catch (e) {
            }
        }

    }

Dans `test-annimation.component.scss`

    .container-annim {
        margin: 17vw 0 0 0;
        text-align: center;

        .card-annim {
            width: 30vw;
            margin: 3vw auto;
            background-color: $LGMprimary;
            padding: 4vw 2vw;
            border-radius: 10px;

            h3, p {
                color: $LGMwhite;
            }

            &#scroll {

                &.scrolled {
                    animation: 1s both scroll
                }
            }
            
            &#zoomIn {

                &.scrolled {
                    animation: 1s both zoomIn
                }
            }
            
            &#fadeIn {

                &.scrolled {

                    animation: 20s both fadeIn
                }
            }
        }
    }


Dans `test-annimation.component.html`

    <section class="container-annim">
        <h1>Test Annimation</h1>

        <section>
            <div >
                <h2>Scroll</h2>

                <div class="card-annim" id="scroll">
                    <h3>Lorem ipsum dolor .</h3>

                    <p>
                        sit amet consectetur adipisicing elit. Fugiat accusantium delectus deleniti, 
                        necessitatibus dolor nesciunt ducimus, quaerat maiores aperiam, labore itaque. 
                        Consequuntur iste ex est voluptatem non, officia dicta ad
                    </p>
                </div>
            </div>
            
            <div >
                <h2>zoomIn</h2>

                <div class="card-annim" id="zoomIn">
                    <h3>Lorem ipsum dolor .</h3>

                    <p>
                        sit amet consectetur adipisicing elit. Fugiat accusantium delectus deleniti, 
                        necessitatibus dolor nesciunt ducimus, quaerat maiores aperiam, labore itaque. 
                        Consequuntur iste ex est voluptatem non, officia dicta ad
                    </p>
                </div>
            </div>
            
            <div >
                <h2>fadeIn</h2>

                <div class="card-annim" id="fadeIn">
                    <h3>Lorem ipsum dolor .</h3>

                    <p>
                        sit amet consectetur adipisicing elit. Fugiat accusantium delectus deleniti, 
                        necessitatibus dolor nesciunt ducimus, quaerat maiores aperiam, labore itaque. 
                        Consequuntur iste ex est voluptatem non, officia dicta ad
                    </p>
                </div>
            </div>
        </section>
    </section>

Dans `src/app/style/_animation.scss`

    @keyframes scroll{
        0%{
            transform: translateY(0px);
        }
        50%{
            transform: translateY(20px); 
        }
        100%{
            transform: translateY(0px); 
        }
    }
    @-webkit-keyframes scroll{
        0%{
            -webkit-transform: translateY(0px);
        }
        50%{
            -webkit-transform: translateY(20px); 
        }
        100%{
            -webkit-transform: translateY(0px); 
        }
    }

    @keyframes zoomIn{
        0%{
            transform: scale(0);
        }
        100%{
            transform: scale(1);
        }
    }
    @-webkit-keyframes zoomIn{
        0%{
            -webkit-transform: scale(0);
        }
        100%{
            -webkit-transform: scale(1);
        }
    }

    @keyframes fadeIn{
        100%{
            opacity: 1;
        }
    }
    @-webkit-keyframes fadeIn{
        100%{
            opacity: 1;
        }
    }


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

### fadeInLeftBig

    .fadeInLeftBig {
        -webkit-animation-name: fadeInLeftBig;
        animation-name: fadeInLeftBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInLeftBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(-2000px, 0, 0);
            transform: translate3d(-2000px, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInLeftBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(-2000px, 0, 0);
            transform: translate3d(-2000px, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    } 

### fadeInRight

    .fadeInRight {
        -webkit-animation-name: fadeInRight;
        animation-name: fadeInRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInRight {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInRight {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    } 

### fadeInRightBig

    .fadeInRightBig {
        -webkit-animation-name: fadeInRightBig;
        animation-name: fadeInRightBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInRightBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(2000px, 0, 0);
            transform: translate3d(2000px, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInRightBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(2000px, 0, 0);
            transform: translate3d(2000px, 0, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

### fadeInUp

    .fadeInUp {
        -webkit-animation-name: fadeInUp;
        animation-name: fadeInUp;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInUp {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    } 

### fadeInUpBig

    .fadeInUpBig {
        -webkit-animation-name: fadeInUpBig;
        animation-name: fadeInUpBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeInUpBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 2000px, 0);
            transform: translate3d(0, 2000px, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes fadeInUpBig {
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 2000px, 0);
            transform: translate3d(0, 2000px, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    } 

### fadeOut

    .fadeOut {
        -webkit-animation-name: fadeOut;
        animation-name: fadeOut;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOut {
        0% {opacity: 1;}
        100% {opacity: 0;}
    }
    @keyframes fadeOut {
        0% {opacity: 1;}
        100% {opacity: 0;}
    } 

### fadeOutDown

    .fadeOutDown {
        -webkit-animation-name: fadeOutDown;
        animation-name: fadeOutDown;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutDown {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
    }
    @keyframes fadeOutDown {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
    }

### fadeOutDownBig

    .fadeOutDownBig {
        -webkit-animation-name: fadeOutDownBig;
        animation-name: fadeOutDownBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutDownBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, 2000px, 0);
            transform: translate3d(0, 2000px, 0);
        }
    }
    @keyframes fadeOutDownBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, 2000px, 0);
            transform: translate3d(0, 2000px, 0);
        }
    }

### fadeOutLeft

    .fadeOutLeft {
        -webkit-animation-name: fadeOutLeft;
        animation-name: fadeOutLeft;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutLeft {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }
    }
    @keyframes fadeOutLeft {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
        }
    }

### fadeOutLeftBig

    .fadeOutLeftBig {
        -webkit-animation-name: fadeOutLeftBig;
        animation-name: fadeOutLeftBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutLeftBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(-2000px, 0, 0);
            transform: translate3d(-2000px, 0, 0);
        }
    }
    @keyframes fadeOutLeftBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(-2000px, 0, 0);
            transform: translate3d(-2000px, 0, 0);
        }
    } 

### fadeOutRight


    .fadeOutRight {
        -webkit-animation-name: fadeOutRight;
        animation-name: fadeOutRight;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutRight {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
    }
    @keyframes fadeOutRight {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
    }

### fadeOutRightBig 

    .fadeOutRightBig {
        -webkit-animation-name: fadeOutRightBig;
        animation-name: fadeOutRightBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutRightBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(2000px, 0, 0);
            transform: translate3d(2000px, 0, 0);
        }
    }
    @keyframes fadeOutRightBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(2000px, 0, 0);
            transform: translate3d(2000px, 0, 0);
        }
    }

### fadeOutUp

    .fadeOutUp {
        -webkit-animation-name: fadeOutUp;
        animation-name: fadeOutUp;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutUp {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
    }
    @keyframes fadeOutUp {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
    } 

### fadeOutUpBig

    .fadeOutUpBig {
        -webkit-animation-name: fadeOutUpBig;
        animation-name: fadeOutUpBig;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes fadeOutUpBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, -2000px, 0);
            transform: translate3d(0, -2000px, 0);
        }
    }
    @keyframes fadeOutUpBig {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            -webkit-transform: translate3d(0, -2000px, 0);
            transform: translate3d(0, -2000px, 0);
        }
    } 
