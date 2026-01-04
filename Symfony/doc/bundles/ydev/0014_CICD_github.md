# CI/CD avec GitHub Actions

Automatiser :

- Tests à chaque push
- Vérification du code (outils de qualité : PHPStan, PHP CS Fixer, etc.)
- Publication automatique sur Packagist

#### Exemple de workflow GitHub Actions :

```yaml
# .github/workflows/tests.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - run: composer install
      - run: vendor/bin/phpunit
```

**Note** : Pour ajouter PHPStan, PHP CS Fixer ou d'autres outils, vous devrez les installer via `composer require --dev` et les configurer.

#### Ajout de badge pour CI dans le markdown

Une fois avoir envoyer le premier test via **GitHub Actions** sur GitHub, <br>
on peut aller dans l'onglet **Actions** puis cliquer sur le menu **Tests** à gauche, <br>
Puis cliquer sur les **3 points horizontale**, puis **Create status badge** <br>
ensuite on peut configurer et copier-coller le badge dans notre README.md 
