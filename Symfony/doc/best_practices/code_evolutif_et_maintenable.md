# Explication sur le code évolutif et maintenable avec des exemples 

Ecrire un code évolutif et maintenable implique l'utilisation de bonnes pratiques de programmation et de conception. 

Voici quelques principes clés avec des exemples:

## 1) Structure modulaire:

[Bundles](https://symfony.com/doc/current/bundles.html)
[The Symfony MakerBundle](https://symfony.com/bundles/SymfonyMakerBundle/current/index.html)

- Évitez les monolithes en décomposant votre application en modules ou bundles.
- Exemple: Créez des bundles Symfony pour regrouper des fonctionnalités spécifiques, ce qui facilite l'ajout, la modification ou la suppression de fonctionnalités.

**Remarque 2023**
---
Dans les versions Symfony antérieures à 4.0, il était recommandé d'organiser votre propre code d'application à l'aide de bundles. 

**Cela n'est plus recommandé et les bundles ne doivent être utilisés que pour partager du code et des fonctionnalités entre plusieurs applications.**

## 2) Injection de dépendances:

- Utilisez l'injection de dépendances pour rendre les composants interchangeables et faciliter les tests unitaires.
- Exemple: Injectez les dépendances dans les services plutôt que de les instancier directement à l'intérieur du service.

```php
// Mauvaise pratique
class MonService {
    private $autreService;

    public function __construct() {
        $this->autreService = new AutreService();
    }
}

// Bonne pratique
class MonService {
    private $autreService;

    public function __construct(AutreService $autreService) {
        $this->autreService = $autreService;
    }
}
```

## 3) Utilisation des services ou managers:

- Regroupez la logique métier dans des services ou managers réutilisables.
- Exemple: Créez un service pour gérer les opérations liées à une entité spécifique.

```php
class GestionnaireEntite {
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    public function sauvegarderEntite($entite) {
        $this->entityManager->persist($entite);
        $this->entityManager->flush();
    }
}
```

### 4) Tests unitaires:

- Écrivez des tests unitaires pour garantir le bon fonctionnement de chaque composant.
- Exemple: Utilisez PHPUnit pour créer des tests unitaires pour vos services et contrôleurs.

```php
class MonServiceTest extends TestCase {
    public function testSauvegarderEntite() {
        // ...
    }
}
```

En suivant ces principes, vous contribuerez à la création d'un code Symfony évolutif et maintenable, facilitant ainsi la maintenance et l'ajout de nouvelles fonctionnalités à votre application.