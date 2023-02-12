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
        - **runs-on** : on indique dans quel environnement il doit s'executer, on dit ici la dernier version d'ubuntu (on peut mettre notre runner perso avec la valeur self-hosted)
            - **steps** : on indique les étapes
                - **uses: actions/checkout@v2** : L'action actions/checkout@v2 est une action de base GitHub Actions qui permet de vérifier le code source d'un dépôt GitHub dans le $GITHUB_WORKSPACE du workflow. <br>
                Cela signifie que le code source du dépôt est disponible pour les autres étapes du workflow pour accéder et utiliser.<br>
                L'utilisation de cette action est très courante dans les workflows CI/CD, <br>
                car elle permet de vérifier le code source avant de lancer les autres étapes de la CI, telles que les tests, la construction et le déploiement.
                - **name** : nom de l'action custom
                - **run** : commande à executer


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

      # https://github.com/shivammathur/setup-php (community)
      - name: Setup PHP, extensions and composer with shivammathur/setup-php
        uses: shivammathur/setup-php@v2
        with:
          extensions: mbstring, xml, ctype, iconv, intl, pdo, pdo_mysql, dom, filter, gd, json

      - name: LS
        run: ls
```
L'action GitHub **"Setup PHP, extensions and composer with shivammathur/setup-php"** permet de configurer un environnement PHP avec des extensions et Composer. <br>
L'action utilise la version 2 de l'action GitHub **"shivammathur/setup-php"** et configure les extensions spécifiées dans la section **"with"**. <br>
Les extensions spécifiées dans ce cas sont "mbstring, xml, ctype, iconv, intl, pdo, pdo_mysql, dom, filter, gd, json".<br>
On peut rajouter des extension si besoin

Dans le retour dans github
```ps
Run shivammathur/setup-php@v2
/usr/bin/bash /home/runner/work/_actions/shivammathur/setup-php/v2/src/scripts/run.sh

==> Setup PHP
✓ PHP Installed PHP 8.2.2

==> Setup Extensions
✓ mbstring Enabled
✓ xml Enabled
✓ ctype Enabled
✓ iconv Enabled
✓ intl Enabled
✓ pdo Enabled
✓ pdo_mysql Enabled
✓ dom Enabled
✓ filter Enabled
✓ gd Enabled
✓ iconv Enabled
✓ json Enabled
✓ mbstring Enabled
✓ pdo Enabled

==> Setup Tools
✓ composer Added composer 2.5.3

==> #StandWithUkraine
✓ read-more https://setup-php.com/support-ukraine
```


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

      # https://github.com/shivammathur/setup-php (community)
      - name: Setup PHP, extensions and composer with shivammathur/setup-php
        uses: shivammathur/setup-php@v2
        with:
          extensions: mbstring, xml, ctype, iconv, intl, pdo, pdo_mysql, dom, filter, gd, json

      # cache
      - name: Cache
        uses: actions/cache@v2
        with:
          path: |
            vendor
          key: ${{ runner.os }}-${{ hashFiles('composer.lock') }}

      # Install composer
      - name: "Composer install"
        run: composer install --no-interaction --no-progress

      # Install Symfony CLI
      - name: Symfony CLI
        run: |
          curl -sS https://get.symfony.com/cli/installer | bash
          mv /home/runner/.symfony5/bin/symfony /usr/local/bin/symfony

      # Check vulnerabilities
      - name: Symfony Check Vulnerabilities
        run: symfony check:security
```

- L'action "Cache" permet de mettre en cache le répertoire "vendor" pour accélérer les temps de construction. <br> 
La clé de cache est basée sur l'OS utilisé par le runner GitHub Actions et sur le contenu du fichier "composer.lock".

- L'action "Composer install" exécute la commande "composer install" pour installer les dépendances du projet. <br>
Les options "--no-interaction" et "--no-progress" sont utilisées pour exécuter la commande sans interaction avec l'utilisateur et sans afficher de progression.

- L'action "Symfony CLI" installe la CLI Symfony en exécutant les commandes suivantes :
  - Télécharger l'installateur avec la commande "curl".
  - Exécuter l'installateur avec la commande "bash".
  - Déplacer le binaire Symfony dans un emplacement globalement accessible avec la commande "mv".

- L'action "Symfony Check Vulnerabilities" exécute la commande "symfony check:security" pour vérifier les vulnérabilités dans les dépendances du projet. <br> 
Cette commande utilise la CLI Symfony installée dans l'action précédente.