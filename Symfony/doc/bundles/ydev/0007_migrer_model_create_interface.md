# Migrer les Modèles et Créer une Interface

Maintenant, on va copier et adapter notre code depuis l'application.

### 1. Copier les Modèles

Copier les Modèles/DTO qu'on a créé dans l'application afin de les coller dans notre nouveau bundle dans `src/Model`

Ensuite, changez le namespace dans chaque fichier 

Avant (dans l'app) :

```php
namespace App\Model;

# Ou 

namespace App\DTO;
```

Après (dans le bundle) :

```php
namespace Vendorcustom\RechercheEntreprisesBundle\Model;
```
Faites ça pour :

- src/Model/Siege.php
- src/Model/Entreprise.php
- src/Model/SearchResult.php

### 2. Migrer le Service

Concept : Pourquoi créer une Interface ?

Dans l'application initiale, on avait un simple service `EntrepriseSearchService`. 

Dans le bundle, on crée d'abord une interface `EntrepriseSearchClientInterface`, puis une implémentation `EntrepriseSearchClient`.

On va transformer `EntrepriseSearchService` en `EntrepriseSearchClient` dans le bundle.

1. Contrat d'interface (Design by Contract)

Une interface définit un contrat : "Voici les méthodes que je m'engage à fournir".

```php
interface EntrepriseSearchClientInterface
{
    public function search(string $query): SearchResult;
    public function findBySiren(string $siren): ?Entreprise;
}
```

Toute classe qui implémente cette interface doit fournir ces méthodes.

Cela permet d'utiliser le **D** (**Dependency Inversion Principe**) du **Principe SOLID**

Dépendre d'abstractions (interfaces), pas d'implémentations

2. Injection de dépendances propre

Dans les contrôleurs, on injecte l'interface, pas la classe concrète :

```php
// Bon
public function __construct(
    EntrepriseSearchClientInterface $client
) {}

// Moins bon
public function __construct(
    EntrepriseSearchClient $client
) {}
```

3. Flexibilité pour l'utilisateur du bundle

Un développeur peut créer sa propre implémentation :

```php
// Mon implémentation avec cache Redis
class CachedEntrepriseSearchClient implements EntrepriseSearchClientInterface
{
    public function search(string $query): SearchResult
    {
        // Chercher dans le cache d'abord
        // Sinon appeler l'API
    }
}
```

Puis la déclarer dans services.yaml :

```yaml
services:
    Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClientInterface:
        class: App\Service\CachedEntrepriseSearchClient
```

Tout le reste de l'application continuera de fonctionner !

4. Best practice pour les bundles

Les bundles Symfony professionnels utilisent toujours des interfaces. Exemples :

- `Psr\Log\LoggerInterface` (pour les logs)
- `Symfony\Contracts\HttpClient\HttpClientInterface` (pour HTTP)
- `Doctrine\ORM\EntityManagerInterface` (pour la base de données)

Créez `src/Client/EntrepriseSearchClientInterface.php` :

```php
namespace Vendorcustom\RechercheEntreprisesBundle\Client;

use Vendorcustom\RechercheEntreprisesBundle\Model\Entreprise;
use Vendorcustom\RechercheEntreprisesBundle\Model\SearchResult;

/**
 * Interface pour le client de recherche d'entreprises.
 */
interface EntrepriseSearchClientInterface
{
    public function search(
        string $query,
        int $page = 1,
        int $perPage = 10,
        array $filters = []
    ): SearchResult;

    public function findBySiren(string $siren): ?Entreprise;

    public function searchByCodePostal(
        string $codePostal,
        int $page = 1,
        int $perPage = 10
    ): SearchResult;
}
```

Créez `src/Client/EntrepriseSearchClient.php` :

```php
namespace Vendorcustom\RechercheEntreprisesBundle\Client;

use Psr\Log\LoggerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Vendorcustom\RechercheEntreprisesBundle\Model\Entreprise;
use Vendorcustom\RechercheEntreprisesBundle\Model\SearchResult;

/**
 * Client pour interroger l'API Recherche d'entreprises.
 */
class EntrepriseSearchClient implements EntrepriseSearchClientInterface
{
    private const API_BASE_URL = 'https://recherche-entreprises.api.gouv.fr';
    private const MAX_PER_PAGE = 25;

    public function __construct(
        private readonly HttpClientInterface $httpClient,
        private readonly ?LoggerInterface $logger = null,
        private readonly int $timeout = 10,
    ) {
    }

    public function search(
        string $query,
        int $page = 1,
        int $perPage = 10,
        array $filters = []
    ): SearchResult {
        try {
            $params = array_merge([
                'q' => $query,
                'page' => max(1, $page),
                'per_page' => min($perPage, self::MAX_PER_PAGE),
            ], $filters);

            $response = $this->httpClient->request('GET', self::API_BASE_URL . '/search', [
                'query' => $params,
                'timeout' => $this->timeout,
            ]);

            $data = $response->toArray();

            $this->logger?->info('Recherche entreprise effectuée', [
                'query' => $query,
                'total_results' => $data['total_results'] ?? 0,
            ]);

            return SearchResult::fromArray($data);

        } catch (\Exception $e) {
            $this->logger?->error('Erreur lors de la recherche entreprise', [
                'query' => $query,
                'error' => $e->getMessage(),
            ]);
            throw new \RuntimeException(
                sprintf('Erreur lors de la recherche : %s', $e->getMessage()),
                0,
                $e
            );
        }
    }

    public function findBySiren(string $siren): ?Entreprise
    {
        $siren = preg_replace('/[^0-9]/', '', $siren);

        if (strlen($siren) !== 9) {
            throw new \InvalidArgumentException('Le SIREN doit contenir exactement 9 chiffres');
        }

        $result = $this->search($siren, 1, 1);

        if (!$result->hasResults()) {
            return null;
        }

        $entreprise = $result->getFirstResult();

        if ($entreprise && $entreprise->siren === $siren) {
            return $entreprise;
        }

        return null;
    }

    public function searchByCodePostal(
        string $codePostal,
        int $page = 1,
        int $perPage = 10
    ): SearchResult {
        return $this->search('', $page, $perPage, [
            'code_postal' => $codePostal,
        ]);
    }
}
```

Changements :

- Namespace changé
- Interface créée (bonne pratique pour un bundle)
- Logger optionnel (?LoggerInterface)
- Timeout configurable
