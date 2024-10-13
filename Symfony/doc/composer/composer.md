# Composer

## Mettre à jours composer avec la dernière version

```bash
composer self-update 
```

## Mettre à jours composer avec une version précise
```bash
composer self-update your_version
```

exemple :
```bash
composer self-update 2.0.14
```

## Problème avec le cache de Composer

Composer utilise un système de cache pour accélérer les installations et mises à jour. Parfois, ce cache peut être corrompu ou obsolète, provoquant des erreurs.

```bash
composer clear-cache
composer install
```

## Problème de version des packages

Il se peut qu'une version de Symfony ou d'un package ait une dépendance erronée ou manquante. Parfois, certaines versions de packages peuvent introduire ce genre de problème.

Solution :

- Essayez de restreindre la version des dépendances en mettant à jour votre fichier composer.json ou en installant une version stable connue :

```bash
composer require symfony/intl:"^5.0" --update-with-dependencies
```


Remplacez ^5.0 par la version de Symfony que vous utilisez dans le projet.

## Problème de droits d'accès

Parfois, les permissions sur les répertoires ou fichiers dans le répertoire vendor peuvent empêcher Composer de scanner correctement les fichiers.

Solution :

- Assurez-vous que vous avez les bonnes permissions sur le répertoire vendor et les fichiers qui s'y trouvent :

```bash
sudo chown -R $(whoami):$(whoami) vendor/
```