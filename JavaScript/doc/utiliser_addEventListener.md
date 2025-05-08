# Utiliser addEventListener

Site : 
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Liste des évènements](https://developer.mozilla.org/en-US/docs/Web/Events#event_listing)
- [évènement resize](https://developer.mozilla.org/en-US/docs/Web/API/PictureInPictureWindow/resize_event)

Si on veut écouté les évènements depuis [window](https://developer.mozilla.org/en-US/docs/Web/API/Window) ou [document](https://developer.mozilla.org/en-US/docs/Web/API/Document)

On sera obliger d'utiliser [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

Dans `App.js`

- On crée un écouteur d'évènement pour agir lorsque qu'on redimensionne l'écran
- La fonction actionResize est appeler dans l'écouteur d'évènement
- Puis on supprime l'addEventListener
```JS
// App.js

"use strict";
  
// création d'un écouteur d'évènement pour agir lorsque qu'on redimensionne l'écran
window.addEventListener('resize', actionResize);

// actionResize est appeler dans l'écouteur d'évènement
function actionResize() {
    console.log("Resized !!!");
}

// Puis on supprime l'addEventListener
window.removeEventListener('resize', actionResize);
```