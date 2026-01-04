# La Documentation du bundle

- [Contributor Covenant](https://www.contributor-covenant.org)

## Structure d'un README

#### Sections essentielles

- Titre + Description courte

- Installation : composer require

- Configuration : Exemples YAML

- Utilisation : Code examples

- Tests : Comment lancer

- Licence

#### Documentation (README.md)

Créez `recherche-entreprises-bundle/README.md` :

- les commandes ne sont pas bien indenter, il faudra bien les indenter dans le vrai fichier `README.md`

```bash
## Recherche Entreprises Bundle

Bundle Symfony pour l'[API Recherche d'entreprises](https://recherche-entreprises.api.gouv.fr/) du gouvernement français.

### 📦 Installation

    ```bash
    composer require vendorcustom/recherche-entreprises-bundle
    ```

### ⚙️ Configuration (optionnelle)

    ```yaml
    # config/packages/vendorcustom_recherche_entreprises.yaml
    vendorcustom_recherche_entreprises:
        timeout: 10  # Timeout en secondes (défaut: 10)
    ```

### 🚀 Utilisation

#### Dans un Contrôleur

    ```php
    use Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClientInterface;

    public function __construct(
        private EntrepriseSearchClientInterface $entrepriseClient
    ) {}

    public function search(): Response
    {
        $result = $this->entrepriseClient->search('carrefour');
        
        foreach ($result->results as $entreprise) {
            echo $entreprise->nomComplet . ' - ' . $entreprise->siren;
        }
    }
    ```

#### Recherche par SIREN

    ```php
    $entreprise = $this->entrepriseClient->findBySiren('652014051');

    if ($entreprise) {
        echo $entreprise->nomComplet;
    }
    ```

#### Commande Console

    ```bash
    # Recherche simple
    php bin/console recherche-entreprise:search carrefour

    # Par SIREN (détails complets)
    php bin/console recherche-entreprise:search 652014051 --siren
    ```

### 📊 Modèles

- `SearchResult` : Résultat paginé
- `Entreprise` : Données d'entreprise
- `Siege` : Établissement siège

### 🧪 Tests

    ```bash
    vendor/bin/phpunit --testdox
    ```

### 📝 Licence

MIT
```

### Documentation additionnelle

#### Fichiers essentiels

- **LICENSE** : Licence MIT (obligatoire)

- **CONTRIBUTING.md** : Guide de contribution

- **CODE_OF_CONDUCT.md** : Code de conduite

Ces fichiers créent une communauté accueillante et professionnelle.

### Fichier LICENSE

- [licence MIT](https://loantruong.github.io/choose-license/licences/licence-mit.html)

Créez `recherche-entreprises-bundle/LICENSE` avec la licence MIT :

- Ne pas oublié de remplacer l'année et le nom. (`[year] [fullname]`)

```txt
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Fichier CONTRIBUTING.md

Créez `recherche-entreprises-bundle/CONTRIBUTING.md` pour guider les contributeurs :

```txt
# Contributing to Recherche Entreprises Bundle

Merci de votre intérêt pour contribuer à ce projet ! 🎉

## Comment Contribuer

### 🐛 Reporter un Bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/vendorcustom/recherche-entreprises-bundle/issues)
2. Créez une nouvelle issue avec :
   - Un titre descriptif
   - Les étapes pour reproduire le bug
   - Le comportement attendu vs le comportement réel
   - Votre environnement (PHP, Symfony, OS)

### ✨ Proposer une Fonctionnalité

1. Ouvrez une issue pour discuter de votre idée
2. Attendez les retours avant de commencer le développement
3. Assurez-vous que la fonctionnalité correspond à l'objectif du bundle

### 🔧 Soumettre une Pull Request

1. **Forkez** le projet
2. **Créez une branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Commitez** vos changements : `git commit -m "feat: ajout de ma fonctionnalité"`
4. **Pushez** : `git push origin feature/ma-fonctionnalite`
5. **Ouvrez une Pull Request**

### 📝 Standards de Code

- Suivez les standards **PSR-12**
- Ajoutez des **tests** pour toute nouvelle fonctionnalité
- Assurez-vous que les tests passent : `vendor/bin/phpunit`

### 🧪 Tests

    ```bash
    # Lancer les tests
    vendor/bin/phpunit

    # Avec couverture (si Xdebug installé)
    vendor/bin/phpunit --coverage-html coverage
    ```

### Commits

- [convention Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Utilisez des messages de commit clairs selon la convention Conventional Commits :

- **feat** : Nouvelle fonctionnalité
- **fix** : Correction de bug
- **docs** : Documentation
- **refactor** : Refactoring
- **test** : Ajout/modification de tests
- **chore** : Tâches de maintenance


### Checklist PR

Avant de soumettre votre PR, vérifiez que :

- [ ] Le code respecte les standards PSR-12
- [ ] Les tests passent (vendor/bin/phpunit)
- [ ] La documentation est à jour
- [ ] Les commits suivent la convention

### Code de Conduite

Ce projet adhère au Code de Conduite. En participant, vous vous engagez à respecter ses termes.

### Questions ?

N'hésitez pas à ouvrir une issue pour toute question !
```


### Fichier CODE_OF_CONDUCT.md

Créez `recherche-entreprises-bundle/CODE_OF_CONDUCT.md` :

```txt
# Code de Conduite

## Notre Engagement

Dans l'intérêt de favoriser un environnement ouvert et accueillant, nous nous engageons, en tant que contributeurs et mainteneurs, à faire de la participation à notre projet et à notre communauté une expérience sans harcèlement pour tous, indépendamment de l'âge, de la taille corporelle, du handicap, de l'ethnicité, de l'identité et de l'expression de genre, du niveau d'expérience, de la nationalité, de l'apparence personnelle, de la race, de la religion ou de l'identité et de l'orientation sexuelles.

## Nos Standards

Exemples de comportements qui contribuent à créer un environnement positif :

* Utiliser un langage accueillant et inclusif
* Respecter les différents points de vue et expériences
* Accepter gracieusement les critiques constructives
* Se concentrer sur ce qui est le mieux pour la communauté
* Faire preuve d'empathie envers les autres membres de la communauté

Exemples de comportements inacceptables :

* L'utilisation de langage ou d'images sexualisés et les avances sexuelles non sollicitées
* Le trolling, les commentaires insultants/désobligeants et les attaques personnelles ou politiques
* Le harcèlement public ou privé
* La publication d'informations privées d'autrui, telles qu'une adresse physique ou électronique, sans permission explicite
* Toute autre conduite qui pourrait raisonnablement être considérée comme inappropriée dans un cadre professionnel

## Nos Responsabilités

Les mainteneurs du projet sont responsables de clarifier les standards de comportement acceptable et sont censés prendre des mesures correctives appropriées et équitables en réponse à tout cas de comportement inacceptable.

Les mainteneurs du projet ont le droit et la responsabilité de supprimer, modifier ou rejeter les commentaires, commits, code, modifications de wiki, issues et autres contributions qui ne sont pas alignés avec ce Code de Conduite, ou de bannir temporairement ou définitivement tout contributeur pour des comportements qu'ils jugent inappropriés, menaçants, offensants ou nuisibles.

## Portée

Ce Code de Conduite s'applique à la fois dans les espaces du projet et dans les espaces publics lorsqu'un individu représente le projet ou sa communauté.

## Application

Les cas de comportement abusif, harcelant ou autrement inacceptable peuvent être signalés en contactant l'équipe du projet. Toutes les plaintes seront examinées et enquêtées et donneront lieu à une réponse jugée nécessaire et appropriée aux circonstances. L'équipe du projet est tenue de maintenir la confidentialité concernant le rapporteur d'un incident.

## Attribution

Ce Code de Conduite est adapté du [Contributor Covenant](https://www.contributor-covenant.org), version 2.1, disponible à https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
```