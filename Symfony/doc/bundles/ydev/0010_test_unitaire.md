# Les Tests Unitaires

### Concept : Les Tests Unitaires

Un test unitaire vérifie qu'une petite unité de code (généralement une méthode) fonctionne correctement de manière isolée.

### Pourquoi tester un bundle ?

- Confiance : être sûr que le code fonctionne
- Régression : Les tests détectent les bugs introduits par de nouvelles modifications
- Documentation vivante : Les tests montrent comment utiliser votre code
- Professionnalisme : Les bundles sérieux ont des tests

### Types de tests :

1. Tests unitaires

- Testent une classe de manière isolée
- Utilisent des mocks (simulations) pour les dépendances
- Rapides à exécuter

2. Tests d'intégration

- Testent plusieurs composants ensemble
- Utilisent de vraies dépendances
- Plus lents mais plus réalistes

### PHPUnit : Le framework de test PHP

PHPUnit est l'outil standard pour les tests PHP. Il fournit :

- Des assertions : assertEquals(), assertTrue(), assertCount()
- Des mocks : Simuler des objets
- Un runner : Exécuter les tests et afficher les résultats

Structure d'un test :

```txt
1. Arrange  (Préparation)
   → Créer les objets nécessaires

2. Act      (Action)
   → Exécuter la méthode testée

3. Assert   (Vérification)
   → Vérifier le résultat
```

```php
class MonServiceTest extends TestCase
{
    public function testMaMethode(): void  // Nom explicite
    {
        // 1. Arrange (Préparation)
        $service = new MonService();
        
        // 2. Act (Action)
        $result = $service->maMethode('test');
        
        // 3. Assert (Vérification)
        $this->assertEquals('EXPECTED', $result);
    }
}
```

C'est le pattern AAA (Arrange, Act, Assert).

### Configuration PHPUnit

Créez `recherche-entreprises-bundle/phpunit.xml.dist` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true">
    <testsuites>
        <testsuite name="Test Suite">
            <directory>tests</directory>
        </testsuite>
    </testsuites>
    <coverage>
        <include>
            <directory suffix=".php">src</directory>
        </include>
    </coverage>
</phpunit>
```

### Test du Bundle

Créez tests/VendorcustomRechercheEntreprisesBundleTest.php :

```php
namespace Vendorcustom\RechercheEntreprisesBundle\Tests;

use PHPUnit\Framework\TestCase;
use Vendorcustom\RechercheEntreprisesBundle\VendorcustomRechercheEntreprisesBundle;

class VendorcustomRechercheEntreprisesBundleTest extends TestCase
{
    public function testBundleCanBeInstantiated(): void
    {
        $bundle = new VendorcustomRechercheEntreprisesBundle();
        $this->assertInstanceOf(VendorcustomRechercheEntreprisesBundle::class, $bundle);
    }

    public function testGetPath(): void
    {
        $bundle = new VendorcustomRechercheEntreprisesBundle();
        $path = $bundle->getPath();

        $this->assertDirectoryExists($path);
    }
}
```

### Test du Client

Explications : Mock HTTP Client

Pour tester notre client sans vraiment appeler l'API (ce qui serait lent et imprévisible), on utilise un Mock HTTP Client.

Symfony MockHttpClient permet de :

- Simuler des réponses HTTP
- Tester sans connexion internet
- Contrôler exactement ce qui est retourné
- Tests rapides et prévisibles

### Créez tests/Client/EntrepriseSearchClientTest.php :

- Le service ne sait pas qu'il utilise un mock ! Il pense appeler la vraie API.
- `$this->expectException(\InvalidArgumentException::class);` on attend que ce test lance une exception". Si l'exception n'est pas lancée, le test échoue.
- Utilisation de `NullLogger`, Un logger qui ne fait rien. Pratique pour les tests où on ne veut pas de logs.

```php
namespace Vendorcustom\RechercheEntreprisesBundle\Tests\Client;

use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;
use Symfony\Component\HttpClient\MockHttpClient;
use Symfony\Component\HttpClient\Response\MockResponse;
use Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClient;

class EntrepriseSearchClientTest extends TestCase
{
    public function testSearchReturnsResults(): void
    {
        // 1. Créer une réponse simulée
        $mockResponse = new MockResponse(json_encode([
            'results' => [
                [
                    'siren' => '123456789',
                    'nom_complet' => 'TEST ENTREPRISE',
                    'siege' => [
                        'siret' => '12345678900001',
                        'adresse' => '1 RUE DE TEST',
                    ],
                ],
            ],
            'total_results' => 1,
            'page' => 1,
            'per_page' => 10,
            'total_pages' => 1,
        ]));

        // 2. Créer un client HTTP qui retourne cette réponse
        $httpClient = new MockHttpClient($mockResponse);

        // 3. Injecter le client mocké dans notre service
        $client = new EntrepriseSearchClient($httpClient, new NullLogger());

        // 4. Tester normalement
        $result = $client->search('test');

        $this->assertTrue($result->hasResults());
        $this->assertCount(1, $result->results);
        $this->assertEquals('123456789', $result->results[0]->siren);
    }

    public function testFindBySirenWithInvalidSiren(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        $httpClient = new MockHttpClient();
        $client = new EntrepriseSearchClient($httpClient, new NullLogger());

        $client->findBySiren('12345'); // SIREN invalide
    }
}
```

### Lancer les Tests

```bash
cd recherche-entreprises-bundle
vendor/bin/phpunit
```