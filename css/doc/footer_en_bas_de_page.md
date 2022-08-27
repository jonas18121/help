# Mettre le footer en bas de page

## Structure du HTML

La balise footer est dans la balise body

```html
<!doctype html>
<html lang="fr">
    <head>
    </head>
    <body>
        <header>
        </header>
        <main>
        </main>
        <footer>
        </footer>
    </body>
</html>
```

## CSS style.css

### Dans body :

- Mettre min-height à 100vh, ce qui prend la taille de l'écran tel quel soit. 
- Il faut vérifier qu'il n'y a pas de margin top ou bottom au body, s'il y a en à, il faut les enlevés sinon min-height: 100vh; sera plus grand que prévu.
- Avec padding-bottom on va alloué de la place pour la taille du footer.
- Mettre position: relative; et box-sizing: border-box;

### Dans footer :

- Mettre position: absolute; pour qu'il s'accrode avec body.
- Puis bottom: 0;, pour qu'il ce place sous le body et dans la place qu'on lui a alloué.
- left: 0; et right: 0; c'est pour le width, donc on peut faire width: 100%; selon les préférences.
- height: 10rem; c'est la taille du footer.

```css

body {
    min-height: 100vh;
    padding-bottom: 11rem;
    position: relative;
    box-sizing: border-box;
}

footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10rem;
}

```