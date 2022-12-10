

```css
/* Loader */
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1111;
}

.letter {
  color: #484848;
  font-size: 80px;
  letter-spacing: 12px;
  margin-bottom: 150px;
  animation: flash 1.2s linear infinite;
  opacity: 1;
}

@keyframes flash {
  0% {
    color: #fff900;
    text-shadow: 0 0 7px #fff900;
  }
  90% {
    color: #484848;
    text-shadow: none;
  }
  100% {
    color: #fff900;
    text-shadow: 0 0 7px #fff900;
  }
  
}

.letter:nth-child(1) {
  animation-delay: 0.1s;
}
.letter:nth-child(2) {
  animation-delay: 0.2s;
}
.letter:nth-child(3) {
  animation-delay: 0.3s;
}
.letter:nth-child(4) {
  animation-delay: 0.4s;
}
.letter:nth-child(5) {
  animation-delay: 0.5s;
}
.letter:nth-child(6) {
  animation-delay: 0.6s;
}
.letter:nth-child(7) {
  animation-delay: 0.7s;
}
.letter:nth-child(8) {
  animation-delay: 0.8s;
}
.letter:nth-child(9) {
  animation-delay: 0.9s;
}
.letter:nth-child(10) {
  animation-delay: 1s;
}

.fondu-out {
  display: none;
  opacity: 0;
  transition: opacity .4s ease-out ;
}
```

```js
/////// Start Loader /////////
window.addEventListener('load', () => {

    alert('chargement');
    const loader = document.querySelector('.loader');
    loader.classList.removeClass('fondu-out');
})
////// End Loader ////////

//$( ".loader" ).addClass( "fondu-out" );
```

```html
<div class="loader">
    <span class="letter">C</span>
    <span class="letter">H</span>
    <span class="letter">A</span>
    <span class="letter">R</span>
    <span class="letter">G</span>
    <span class="letter">E</span>
    <span class="letter">M</span>
    <span class="letter">E</span>
    <span class="letter">N</span>
    <span class="letter">T</span>
</div>
```