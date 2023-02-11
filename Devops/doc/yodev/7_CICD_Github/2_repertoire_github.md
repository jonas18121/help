# Le repertoire .github

Le repertoire `.github` c'est LE repertoire qui gère tout votre pipeline avec GitHub.

- Il contient un repertoire `workflow` qui contiendra nos fichiers de pipeline
- Ce sont des fichiers au format YAML
- Pour nous simplifier l'apprentissage, nous utiliserons un fichier pour la CI et un autre fichier pour la CD.

# Un pipeline pour découvrir !
Testons le principe, et créons un pipeline ULTRA simple directement sur GitHub. Chemin **Actions > New workflow > set up a ...**

```yml
name: Pipeline-CI
on:
  push:
    branches: [ main ]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - name: LS
        run: ls
```

- **name** : nom de la pipeline 
- **on** : On indique a quel moment il va se déclencher
    - **push** : ici, on dit qu'il va se déclencher lors d'un push
        - **branches** : sur lea branch main, (comme c'est un tableau, on peut mettre plusieurs branches)
- **jobs** : dedans on pourra décrire des jobs
    - **ci** : le nom de ce job est ci
        - **runs-on** : on indique dans quel environnement il doit s'executer, on dit ici la dernier version d'ubuntu
            - **steps** : on indique les étapes
                - **uses: actions/checkout@v2** : L'action actions/checkout@v2 est une action de base GitHub Actions qui permet de vérifier le code source d'un dépôt GitHub dans le $GITHUB_WORKSPACE du workflow. <br>
                Cela signifie que le code source du dépôt est disponible pour les autres étapes du workflow pour accéder et utiliser.<br>
                L'utilisation de cette action est très courante dans les workflows CI/CD, <br>
                car elle permet de vérifier le code source avant de lancer les autres étapes de la CI, telles que les tests, la construction et le déploiement.
                - **name** : nom de l'action custom
                - **run** : commande à executer
