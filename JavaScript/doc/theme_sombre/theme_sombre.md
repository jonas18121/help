# Faire un theme sombre avec bouton switch dans un projet

### Javascript

#### component/theme.js

- JS pour Changer le theme du site au chargement de la page et au click sur le bouton switch
- JS pour Synchronisé theme du Système du PC et le theme du site

```js
// theme.js

import '../../css/component/theme.css';

// Changer le theme du site
$(function () {
    const TRUE = true;
    const FALSE = false;
    const THEME_DARK = 'dark';
    const toggleButton = document.querySelector('#switch input');
    const tagBody = document.body;
    const saveTheme = localStorage.theme;

    // Au chargement de la page mettre en mode sombre si c'est sélectionné
    if (THEME_DARK === saveTheme) {
        tagBody.classList.add(saveTheme);
        toggleButton.checked = TRUE;
    }

    toggleButton.addEventListener("click", function(event) {
        tagBody.classList.toggle(THEME_DARK);
        toggleButton.checked = FALSE;
        let themeInProgress = '';

        if (TRUE === tagBody.classList.contains(THEME_DARK)) {
            themeInProgress =  THEME_DARK ;
            toggleButton.checked = TRUE;
        }

        localStorage.theme = themeInProgress;
    });
});

// Synchronisé theme du Système du PC et le theme du site
$(function () {
    const TRUE = true;
    const FALSE = false;
    const THEME_DARK = 'dark';
    const tagBody = document.body;
    const toggleButton = document.querySelector('#switch input');

    window.matchMedia("(prefers-color-scheme:" + THEME_DARK + ")")
        .addEventListener("change", (event) => {
            tagBody.classList.remove(THEME_DARK);
            localStorage.theme = '';
            toggleButton.checked = FALSE;

            if (event.matches) {
                tagBody.classList.add(THEME_DARK);
                localStorage.theme = THEME_DARK;
                toggleButton.checked = TRUE;
            }
        })
    ;
});
```

### HTML

#### fichier.html

- Appeler les fichiers JS et CSS
- La classe `dark` sera ajouter à la balise `body` via le JS au click sur le bouton switch `<!-- <body class="dark"> -->`

```html
<body>
    <!-- Rounded switch Theme-->
    <label id="switch">
        <input type="checkbox">
        <p class="switch_check round"></p>
    </label>
</body>
```

### CSS

#### variables.css

- On définit les variables pour le theme clair dans default

```css
/* variables.css */

:root {
    /* Light theme */
    --main-color-old: #4c44bb;
    --main-color-old-transparent:rgba(76, 68, 187, 0.5);
    --grey-main: rgba(233, 233, 240, 0.836);

    --white: #fff;
    --white-clear: rgba(255, 255, 255, 0.2);

    --black: #000;
    --black-clear: rgba(22, 21, 21, 0.4);

    --menu-background: #ededed;

    /* Default */
    --theme-main-background-in-progress: var(--white);
    --theme-main-text-in-progress: var(--black);
    --theme-menu-background-in-progress: var(--menu-background);
    --theme-little-menu-background-in-progress: var(--grey-main);
    --theme-little-menu-text-in-progress: var(--grey-main);

    /* Dark theme */
    --black02: #000000d2;
    --black03: #000000b3;
}
```

#### main.css

- On appel les variables par défault dans les selecteurs CSS, exemple dans `background-color` de `body`
- On redéfinit les variables par défault pour le selecteur CSS `.dark` qui sera ajouter à la balise `body` coté HTML
```css
/* main.css */

@import url('./variables.css');

/***********css par défaut mobile ********************/

/* Theme color */

.dark {
    --theme-main-background-in-progress: var(--black02);
    --theme-main-text-in-progress: var(--white);
    --theme-menu-background-in-progress: var(--menu-background);
    --theme-little-menu-background-in-progress: var(--grey-main);
    --theme-little-menu-text-in-progress: var(--grey-main);
}

/* GLOBAL */

/* ...code  */

body{
    background-color: var(--theme-main-background-in-progress);
    font-size: 1.6rem; 
    width: 100%;
    color: var(--theme-main-text-in-progress);
}

/* ...code  */
```

#### component/theme.css

- CSS du bouton switch

```css
/* component/theme.js */

@import url('../../variables.css');

/* The switch - the box around the switch_check */
#switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

/* Hide default HTML checkbox */
#switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The switch_check */
p.switch_check {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

p.switch_check:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  background-image: url("../../../../uploads/default/other_img/soleil.png"); /* Chemin a partir du fichier css pour aller jusqu'à l'image */
  background-size: cover;
}

.dark p.switch_check::before {
  background-image: url("../../../../uploads/default/other_img/lune3.png"); /* Chemin a partir du fichier css pour aller jusqu'à l'image */
}

input:checked + p.switch_check {
  background-color: var(--black-clear);
}

input:focus + p.switch_check {
  box-shadow: 0 0 1px var(--black-clear);
}

input:checked + p.switch_check:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded switch_checks */
p.switch_check.round {
  border-radius: 34px;
}

p.switch_check.round:before {
  border-radius: 50%;
}
```

