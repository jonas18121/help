# Principales métriques de volumétrie

1. **LLOC (Logical Lines of Code)** – Lignes Logiques de Code :

- Compte le nombre d'instructions exécutables dans le code, en excluant les lignes vides et les commentaires.
- Par exemple, en C ou Java, chaque instruction se terminant par un point-virgule est considérée comme une ligne logique.
- Cette métrique est utile pour estimer la complexité fonctionnelle du code.

2. **CLOC (Comment Lines of Code)** – Lignes de Commentaires :

- Dénombre les lignes contenant des commentaires dans le code source.
- Indique le niveau de documentation du code, ce qui peut faciliter la maintenance et la compréhension du logiciel.

3. **Volume** :

- Fait référence à la taille totale du code source, incluant les lignes de code, les commentaires et les lignes vides.
- Cette mesure donne une idée générale de l'ampleur du projet.

4. **Contenu intelligent** :

- Bien que ce terme ne soit pas standardisé, il peut désigner la proportion de code contenant une logique métier significative ou des algorithmes complexes.
- Cette métrique vise à évaluer la densité de la logique métier par rapport au code boilerplate ou généré automatiquement.

5. **Poids du commentaire** :

- Représente le ratio entre les lignes de commentaires (CLOC) et les lignes de code effectives (LLOC).
- Un ratio élevé peut indiquer une bonne documentation, tandis qu'un ratio faible peut suggérer un manque de commentaires utiles.

## Outils pour mesurer ces métriques

1. **cloc (Count Lines of Code)** :

- Un outil en ligne de commande qui analyse les fichiers source pour compter les lignes de code, les commentaires et les lignes vides.
- Il prend en charge de nombreux langages de programmation.
- Vous pouvez consulter une démonstration de son utilisation ici : [Count Lines of Code (cloc)](https://www.youtube.com/watch?v=dr4Rr64fYVw)


2. **PHP Metrics** :

- Spécifique aux projets PHP, cet outil génère des rapports détaillés sur la qualité du code, incluant des métriques comme LLOC, CLOC, la complexité cyclomatique, etc.
- Il est particulièrement utile pour les applications développées avec des frameworks comme Symfony.

### Cloc

- [Cloc Count Lines of Code](https://cloc.sourceforge.net/)
- [Github Cloc](https://github.com/jonas18121/cloc)
- [Cloc Option](https://github.com/jonas18121/cloc?tab=readme-ov-file#options-)

cloc compte les lignes vides, les lignes de commentaires et les lignes physiques du code source dans de nombreux langages de programmation.

1. Installer Cloc sur (Debian, Ubuntu)

```bash
# Debian, Ubuntu
sudo apt-get install cloc 
```

2. Analyser et compter le code des fichiers par exemple dans le répertoire `./src` du projet cibler

```bash
# projet/src

cloc ./src
```

### PHPMetrics

- [Quick start PHPMetrics](https://phpmetrics.github.io/website/getting-started/)
- [Github PHPMetrics](https://github.com/phpmetrics/PhpMetrics/)

1. Intaller PHPMetrics

```bash
composer global require 'phpmetrics/phpmetrics'

# OU

composer require 'phpmetrics/phpmetrics' --dev
```

2. Voir la version de PHPMetrics

```bash
php ./vendor/phpmetrics/phpmetrics/bin/phpmetrics --version
```

3. Analyser le code et générer un rapport HTML

- **--report-html=rapport** : spécifie le dossier de sortie pour le rapport HTML.

- **src** : indique le répertoire contenant le code source à analyser.

- Après l'exécution, ouvrez le fichier `rapport/index.html` dans le navigateur pour consulter le rapport détaillé.

```bash
php ./vendor/phpmetrics/phpmetrics/bin/phpmetrics --report-html=rapport src
```