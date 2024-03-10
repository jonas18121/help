# Gestion de données avec then() , avec async/await

https://www.youtube.com/watch?v=MQRQkyx6rJg

Dans `index.html`
```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css"/>
        <script src="main.js" defer></script>
        <title>Test Promise then(), async/await</title>
    </head>
    <body>

        <section>
            <div class="flex">
                <div>
                    <form id="github_form">
                        <input type="search" name="" >
                        <input type="submit" value="Chercher sur Github" >
                    </form>
                </div>
            
                <div>
                    <form id="github_form2">
                        <input type="search" name="" >
                        <input type="submit" value="Chercher sur Github 2" >
                    </form>
                </div>
            </div>

            <div id="github_result"></div>
        </section>
    </body>
    </html>
```

Dans `style.css`
```css
    .flex {
        display: flex;
        flex-direction: row;
    }

    .flex > div {
        width: 50%;
    }
```

Dans `main.js`
```javascript
    'use strict';

    const github_result = document.getElementById('github_result');

    ////////////// Gestion de données avec then() ///////////////////////////

    const github_form = document.getElementById('github_form');

    github_form.addEventListener('submit', search_github);

    /**
    * Aller chercher un profil sur Github
    * et afficher les données du profil dans <div id="github_result"></div>
    * 
    * Les réponses sont retourner avec then(); 
    * 
    * @param {*} e 
    * @returns 
    */
    function search_github (e) {
        e.preventDefault();

        const account = github_form.elements[0].value;

        if (account == '') return '';

        fetch(`https://api.github.com/users/${account}`)
            .then((data) => data.json())
            .then(jsonData => {
                console.log(`jsonData`, jsonData);
                github_result.innerHTML = `<pre><code>${JSON.stringify(jsonData, null, 4)}</code></pre>`;
            });
        ;

        github_form.elements[0].value = '';
    }


    ////////////// Gestion de données avec async/await ///////////////////////////

    const github_form2 = document.getElementById('github_form2');

    github_form2.addEventListener('submit', search_github2);

    /**
    * Aller chercher un profil sur Github
    * et afficher les données du profil dans <div id="github_result"></div>
    * 
    * Les réponses sont retourner avec async/await ; 
    * 
    * @param {*} e 
    * @returns 
    */
    async function search_github2 (e) {
        e.preventDefault();

        const account = github_form2.elements[0].value;

        if (account == '') return '';

        const data = await fetch(`https://api.github.com/users/${account}`);
        const jsonData = await data.json();
        github_result.innerHTML = `<pre><code>${JSON.stringify(jsonData, null, 4)}</code></pre>`;

        github_form2.elements[0].value = '';
    }
```