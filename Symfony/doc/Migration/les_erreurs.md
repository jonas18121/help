# Listes d'erreurs

## Erreur : Cannot autowire argument $user of "App\Controller\UserController::get one user()": it references class "App\Entity\User" but no such service exists.

Si on a l'erreur ci-dessous, lors de la migration, 
- soit faire une réinstallation des annotations,
- Soit passé en PHP 8 pour utiliser les attributs

```bash
Cannot autowire argument $user of "App\Controller\UserController::get one user()": it references class "App\Entity\User" but no such service exists.
```

### Réinstallation des annotations

```bash
# Réinstallation des annotations
composer require annotations

# Mettre à jour les dépendance
composer update
```

### Passé en PHP 8 pour utiliser les attributs

- [Présentation des attributs Symfony](https://symfony.com/doc/5.x/reference/attributes.html#dependency-injection)

Installez PHP 8 dans votre machine et/ou dans votre configuration docker de votre projet