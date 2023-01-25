# La syntaxe markdown

Site [ici](https://docs.framasoft.org/fr/grav/markdown.html)


### Mettre en surbrillance les commandes bash/shell dans le démarquage

[blocks pour langage](https://arcticicestudio.github.io/styleguide-markdown/rules/code.html)

Quelques exemples de coque :

Shell:      console, shell, shellscript

Bash:       bash, sh, zsh

PowerShell: powershell, ps

DOS:        dos, bat, cmd

Exemple:

    ```bat
    cd \
    copy a b
    ping 192.168.0.1
    ```

Si j'ai seulement besoin de surligner le premier mot en tant que commande, j'utilise souvent properties:

    ```properties
    npm run build
    ```  

### Des graphiques avec mermaid.js

[mermaid.js](https://mermaid.js.org/intro/)

Exemple :

        ```mermaid
        graph TD;
            A-->B;
            A-->C;
            B-->D;
            C-->D;
        ```

Retourne :

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```