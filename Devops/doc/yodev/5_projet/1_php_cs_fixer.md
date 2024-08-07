# PHP CS FIXER

- [Site Symfony pour PHP CS FIXER](https://symfony.com/projects/php-cs-fixer)
- [PHP CS FIXER](https://cs.symfony.com/)
- [PHP CS FIXER Instalation](https://cs.symfony.com/doc/installation.html)
- [PHP CS FIXER Utilisation](https://cs.symfony.com/doc/usage.html)
- [PHP CS FIXER Liste des règles disponibles](https://cs.symfony.com/doc/rules/index.html) : Règles isolé
- [PHP CS FIXER Liste des ensembles de règles disponibles](https://cs.symfony.com/doc/ruleSets/index.html) : Groupe de règles
- [PHP CS FIXER Fichier de configuration](https://cs.symfony.com/doc/config.html)
- [PHP CS FIXER Création de règles personnalisées](https://cs.symfony.com/doc/custom_rules.html)
- [Télécharger php-cs-fixer.phar v3.13.2](https://cs.symfony.com/download/php-cs-fixer-v3.phar)


# Correcteur de normes de codage PHP 

L'outil PHP Coding Standards Fixer (PHP CS Fixer) corrige votre code pour qu'il respecte les normes ; si vous souhaitez suivre les standards de codage PHP tels que définis dans le PSR-1, PSR-2, etc.
ou d'autres standards communautaires comme celui de Symfony. Vous pouvez également définir votre style (d'équipe) via la configuration.

Il peut moderniser votre code (comme convertir la powfonction en **opérateur sur PHP 5.6) et (micro) l'optimiser.

Si vous utilisez déjà un linter pour identifier les problèmes de normes de codage dans votre code, vous savez que les résoudre à la main est fastidieux, en particulier sur les gros projets. Cet outil ne se contente pas de les détecter, mais les corrige également pour vous.

## Installation

La méthode recommandée pour installer PHP CS Fixer est d'utiliser Composer dans un fichier dédié composer.json de votre projet, par exemple dans le répertoire tools/php-cs-fixer :

### Créer un dossier pour php-cs-fixer
Avec la commande ci-dessous le dossier `tools/` qui contiendra le dossier `php-cs-fixer/` sera installer dans le project au même niveau que les dossiers `src/`, `templates/` et `tests/`

- --parents : C'est un paramètre pour indiquer à la commande mkdir qu'elle doit créer les dossiers intermédiaires qui n'existent pas.
```ps
mkdir --parents tools/php-cs-fixer
```

### Installer php-cs-fixer via composer
```ps
composer require --working-dir=tools/php-cs-fixer friendsofphp/php-cs-fixer
```



## Utilisation

### Exécuter sans qu'il fasse de correction lui même (sans apporter de modifications à vos fichiers) . Idéal dans une pipepline

- fix : réparer
- --dry-run : ne pas faire de correction (sans apporter de modifications à vos fichiers)

```ps
./tools/php-cs-fixer/vendor/bin/php-cs-fixer fix --dry-run
```

Retour lorsqu'il trouve une erreur comme il n'a pas fait de correction
```ps
Loaded config default from "/home/user/Bureau/developpementWeb/code/formation-ci-cd/symfony-local/.php-cs-fixer.dist.php".
Using cache file "/home/user/Bureau/developpementWeb/code/formation-ci-cd/symfony-local/var/.php-cs-fixer.cache".
   1) /home/user/Bureau/developpementWeb/code/formation-ci-cd/symfony-local/src/Controller/BlogController.php
```

### Exécuter et qu'il fasse de correction lui même (en apportant des modifications à vos fichiers). Idéal avant de commit

- fix : réparer
- src : dossier dans lequel php-cs-fixer va être executer

On n'a pas besoin de préciser que l'on veut lancer l'analyse dans le dossier **src** puisqu'il est déjà precisé dans le fichier **.php-cs-fixer.dist.php**
```ps
./tools/php-cs-fixer/vendor/bin/php-cs-fixer fix src
```

Pour avoir de nombreuses informations détaillées pendant son exécution et voir les modifications apportées au code source, rajouter `-vvv` et `--diff`
```bash
tools/php-cs-fixer/vendor/bin/php-cs-fixer fix -vvv --diff
```

1. `tools/php-cs-fixer/vendor/bin/php-cs-fixer`: C'est le chemin vers le binaire exécutable de PHP CS Fixer. Cela indique à votre système où trouver l'exécutable pour lancer l'outil.

2. `fix`: C'est la commande principale que vous souhaitez exécuter avec PHP CS Fixer. La commande "fix" est utilisée pour appliquer les correctifs de codage automatiques au code source PHP.

3. `-vvv`: Cela spécifie le niveau de débogage ou de verbosité de la sortie. Trois "v" signifient une sortie très verbeuse, ce qui signifie que la commande affichera de nombreuses informations détaillées pendant son exécution. Cela peut être utile pour le débogage ou la compréhension de ce que fait PHP CS Fixer en interne.

4. `--diff`: Cette option permet à PHP CS Fixer de générer un diff montrant les modifications apportées au code source. Cela permet de voir exactement quelles corrections ont été appliquées au code.

### Configuration de .php-cs-fixer.dist.php

La configuration ce fait dans le fichier **.php-cs-fixer.dist.php** que l'on va créer manuellement, si ce n'est pas fait automatiquement. 

On peut regarder sur [.php-cs-fixer.dist.php](https://github.com/symfony/demo/blob/main/.php-cs-fixer.dist.php) de Symfony Demo 

voici un exemple ci-dessous

- **->exclude()** : Exclure des dossiers/fichiers
- **->notPath()** : Exclure des executables
- **->setRules()** : Définir les règles que l'on veut appliquer
- Voir le groupe de règles de [@Symfony](https://cs.symfony.com/doc/ruleSets/Symfony.html)
- Voir la règle [php_unit_strict](https://cs.symfony.com/doc/rules/php_unit/php_unit_strict.html)

```php
# .php-cs-fixer.dist.php

$fileHeaderComment = <<<COMMENT
This file is part of the Symfony package.

(c) Fabien Potencier <fabien@symfony.com>

For the full copyright and license information, please view the LICENSE
file that was distributed with this source code.
COMMENT;

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__)
    ->exclude('config') // On ne veut pas tester
    ->exclude('var') // On ne veut pas tester
    ->exclude('public/bundles') // On ne veut pas tester
    ->exclude('public/build') // On ne veut pas tester
    
    // exclude files generated by Symfony Flex recipes
    ->notPath('bin/console') // On ne veut pas tester
    ->notPath('public/index.php') // On ne veut pas tester
;

return (new PhpCsFixer\Config())
    ->setRiskyAllowed(true)
    ->setRules([                    // Les règles que l'on veut appliquer
        '@Symfony' => true,
        '@Symfony:risky' => true,
        'header_comment' => ['header' => $fileHeaderComment, 'separate' => 'both'],
        'linebreak_after_opening_tag' => true,
        'mb_str_functions' => true,
        'no_php4_constructor' => true,
        'no_unreachable_default_argument_value' => true,
        'no_useless_else' => true,
        'no_useless_return' => true,
        'php_unit_strict' => true,
        'phpdoc_order' => true,
        'strict_comparison' => true,
        'strict_param' => true,
        'blank_line_between_import_groups' => false,
    ])
    ->setFinder($finder)
    ->setCacheFile(__DIR__.'/var/.php-cs-fixer.cache')
;
```

## Update PHP CS FIXER

Vous pouvez mettre à jour php-cs-fixer via cette commande avec **composer** :
```ps
./composer.phar global update friendsofphp/php-cs-fixer
```