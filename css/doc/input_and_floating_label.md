# Input avec un label flottant

## Structure du HTML

- L'input est au dessus du label
- Il faut mettre un placerholder
- .form-container qui entoure l'input et le label
- .form-input, css pour l'input
- .form-label, css pour le label

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="main.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <h1>Form</h1>

    <form action="" method="post">

        <div class="form-container">
            <select name="pets" id="pet-select" class="form-input">
                <option value="">--Please choose an option--</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
            </select>
            <label for="pet-select" class="form-label">Choose a pet:</label>
        </div>

        <div class="form-container">
            <input type="text" id="fname" name="fname" placeholder="John" class="form-input">
            <label for="fname"  class="form-label">First name</label>
        </div>

        <div class="form-container">
            <input type="text" id="lname" name="lname" placeholder="Doe" class="form-input">
            <label for="lname"  class="form-label">Last name</label>
        </div>

        <div>
            <input type="submit" value="Submit">
        </div>
    </form>
</body>
</html>
```

## CSS style.css

```css
body, .form-input {
    background-color: gray;
}

form {
    width: 50%;
    margin: auto;
}

/* C'est important que le label et l'input soit en display block, 
pour que le translateY fonctionne */
Label, input {
    display: block;
}

div {
    margin: 40px;
}

.form-container {
    transition: all .3s; /* Effet de transition */
}

.form-label {
    /* Le label va se placer a une certaine hauteur par rapport a l'input en fonction du nombre écrit dans translateY() */
    transform: translateY(-1.5em);
    transform-origin: 0 0;/* Mettre le label a gauche, lorsqu'il est en haut  */
    transition: all .3s; /* Effet de transition */
}

.form-input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid black;
    box-shadow: none;
    transition: all .5s;/* Effet de transition */
}

/* Il faut mettre un placerholder pour que tout ce système fonctionne  */
.form-input::placeholder {
    color: transparent;
}

.form-input:focus {
    box-shadow: none;
    outline: none; /* Enlever la surbrillance au focus */
    border-bottom: 3px solid rgba(35, 125, 7, 0.8); /* Modification du border bottom au focus */
}

/* Le label monte au focus et reste en haut, si l'user écrit */
/* Le label doit etre sous l'input */
.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label
{
    transform: translateY(-2.9em) scale(.8);
}

.form-container:focus-within {
    transform: scale(1.05,1.05); /* Agrandir le border bottom au focus */
}
```