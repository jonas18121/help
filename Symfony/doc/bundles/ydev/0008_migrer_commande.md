# Migrer la Commande

Créez `src/Command/SearchEntrepriseCommand.php` :

```php
namespace Vendorcustom\RechercheEntreprisesBundle\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClientInterface;

#[AsCommand(
    name: 'recherche-entreprise:search',
    description: 'Recherche des entreprises françaises',
)]
class SearchEntrepriseCommand extends Command
{
    public function __construct(
        private readonly EntrepriseSearchClientInterface $entrepriseClient
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('query', InputArgument::REQUIRED, 'Termes de recherche')
            ->addOption('siren', 's', InputOption::VALUE_NONE, 'Rechercher par SIREN')
            ->addOption('per-page', 'p', InputOption::VALUE_OPTIONAL, 'Résultats par page', 10)
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $query = $input->getArgument('query');
        $isSiren = $input->getOption('siren');
        $perPage = (int) $input->getOption('per-page');

        try {
            if ($isSiren) {
                $entreprise = $this->entrepriseClient->findBySiren($query);
                
                if (!$entreprise) {
                    $io->warning('Aucune entreprise trouvée');
                    return Command::SUCCESS;
                }

                $io->success('Entreprise trouvée !');
                $io->definitionList(
                    ['SIREN' => $entreprise->siren],
                    ['Nom' => $entreprise->nomComplet],
                    ['Adresse' => $entreprise->siege?->adresse ?? 'N/A'],
                    ['Code NAF' => $entreprise->activitePrincipale ?? 'N/A'],
                    ['Actif' => $entreprise->isActif() ? '✅ Oui' : '❌ Non'],
                );
            } else {
                $result = $this->entrepriseClient->search($query, 1, $perPage);
                
                if (!$result->hasResults()) {
                    $io->warning('Aucun résultat trouvé');
                    return Command::SUCCESS;
                }

                $io->success(sprintf('%d résultat(s)', $result->totalResults));

                $rows = [];
                foreach ($result->results as $entreprise) {
                    $rows[] = [
                        $entreprise->siren,
                        substr($entreprise->nomComplet, 0, 40),
                        $entreprise->siege?->codePostal ?? 'N/A',
                        $entreprise->isActif() ? '✅' : '❌',
                    ];
                }

                $io->table(['SIREN', 'Nom', 'CP', 'Actif'], $rows);
            }

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $io->error($e->getMessage());
            return Command::FAILURE;
        }
    }
}
```

## Créer la Classe Bundle

### Concept : La Classe Bundle (AbstractBundle)

La classe Bundle est le point d'entrée de votre bundle. C'est elle qui dit à Symfony :

- Quels services sont disponibles
- Comment les configurer
- Quelles sont les options de configuration

## Évolution des bundles dans Symfony :

Avant Symfony 6.1 (ancien style) :

Il fallait créer des fichiers XML/YAML séparés pour la configuration et les services.

- Classe Bundle avec build()

- Fichiers XML/YAML séparés

- Complexe et verbeux


```php
class MonBundle extends Bundle
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);
        // Configuration complexe avec des CompilerPass
    }
}
```

Depuis Symfony 6.1 (style moderne) :

Tout est dans une seule classe PHP ! C'est plus simple, plus lisible, et plus performant.

- AbstractBundle

- Tout dans une seule classe PHP

- Plus simple et performant

```php
class MonBundle extends AbstractBundle
{
    public function configure(DefinitionConfigurator $definition): void
    {
        // Configuration du bundle (options utilisateur)
    }

    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        // Enregistrement des services
    }
}
```

### Les 3 méthodes clés

1. **configure()**

Définit la configuration que l'utilisateur peut personnaliser

```php
public function configure(DefinitionConfigurator $definition): void
{
    $definition->rootNode()
        ->children()
            ->integerNode('timeout')
                ->defaultValue(10)  // Valeur par défaut
                ->min(1)            // Validation : minimum 1
                ->max(60)           // Validation : maximum 60
            ->end()
        ->end();
}
```

Cela permet à l'utilisateur de configurer dans config/packages/ :

```yaml
Vendorcustom_recherche_entreprises:
    timeout: 15  # Personnalisation
```

2. **loadExtension()**

Enregistre les services dans le conteneur

```php
public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
{
    // $config contient la configuration de l'utilisateur
    
    $container->services()
        ->set(MonService::class)
            ->args([...])
            ->public();
}
```

3. **getPath()**

Indique le chemin du bundle

```php
public function getPath(): string
{
    return \dirname(__DIR__);  // Répertoire parent de src/
}
```

**Le conteneur de services :**

Le **ContainerConfigurator** est comme un registre où vous déclarez vos services.

```php
$container->services()
    ->set(MonService::class)           // Déclare le service
        ->args([                       // Ses dépendances
            service('http_client'),    // Injecte un autre service
            '%ma_config%',             // Injecte un paramètre
        ])
        ->public()                     // Accessible depuis l'extérieur
        ->tag('mon.tag');             // Ajoute un tag
```

Créez `src/VendorcustomRechercheEntreprisesBundle.php` :

```php
namespace Vendorcustom\RechercheEntreprisesBundle;

use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;
use Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClient;
use Vendorcustom\RechercheEntreprisesBundle\Client\EntrepriseSearchClientInterface;
use Vendorcustom\RechercheEntreprisesBundle\Command\SearchEntrepriseCommand;

use function Symfony\Component\DependencyInjection\Loader\Configurator\service;

/**
 * Bundle pour l'API Recherche d'entreprises.
 */
class VendorcustomRechercheEntreprisesBundle extends AbstractBundle
{
    public function configure(DefinitionConfigurator $definition): void
    {
        $definition->rootNode()
            ->children()
                ->integerNode('timeout')
                    ->defaultValue(10)
                    ->min(1)
                    ->max(60)
                    ->info('Timeout des requêtes HTTP en secondes')
                ->end()
            ->end()
        ;
    }

    public function loadExtension(
        array $config,
        ContainerConfigurator $container,
        ContainerBuilder $builder
    ): void {
        // Paramètres
        $container->parameters()
            ->set('Vendorcustom_recherche_entreprises.timeout', $config['timeout'])
        ;

        // Services
        $container->services()
            // Client principal
            ->set(EntrepriseSearchClient::class)
                ->args([
                    service('http_client'),
                    service('logger')->ignoreOnInvalid(),
                    '%Vendorcustom_recherche_entreprises.timeout%',
                ])
                ->public()

            // Alias pour l'interface
            ->alias(EntrepriseSearchClientInterface::class, EntrepriseSearchClient::class)
                ->public()

            // Alias nommé
            ->alias('Vendorcustom_recherche_entreprises.client', EntrepriseSearchClientInterface::class)
                ->public()

            // Commande
            ->set(SearchEntrepriseCommand::class)
                ->args([
                    service(EntrepriseSearchClientInterface::class),
                ])
                ->tag('console.command')
        ;
    }

    public function getPath(): string
    {
        return \dirname(__DIR__);
    }
}
```

#### Points Clés :

1. **configure()** : Définit la configuration du bundle (ici : timeout)
2. **loadExtension()** : Enregistre les services
    - Client avec ses dépendances
    - Alias pour l'interface (injection)
    - Commande console (tag console.command)

3. **getPath()** : Chemin racine du bundle

#### Explications Détaillées du Code

Analysons le code de **loadExtension()** ligne par ligne :

1. Enregistrement des paramètres

```php
$container->parameters()
    ->set('Vendorcustom_recherche_entreprises.timeout', $config['timeout']);
```

Crée un paramètre global accessible partout. La convention de nommage : vendor_bundle.parameter_name.

2. Enregistrement du service principal

```php
->set(EntrepriseSearchClient::class)
    ->args([
        service('http_client'),                              // Dépendance 1
        service('logger')->ignoreOnInvalid(),                // Dépendance 2 (optionnelle)
        '%Vendorcustom_recherche_entreprises.timeout%',      // Dépendance 3 (paramètre)
    ])
    ->public()
```

Décomposition :

- **service('http_client')** : Injecte le service HTTP de Symfony
- **service('logger')->ignoreOnInvalid()** : Injecte le logger, mais si il n'existe pas (dans les tests par exemple), passe null au lieu de crash
- **'%nom_parametre%'** : Injecte la valeur d'un paramètre (ici, le timeout configuré)
- **->public()** : Rend le service accessible directement (important pour les bundles)

3. Création d'alias

```php
->alias(EntrepriseSearchClientInterface::class, EntrepriseSearchClient::class)
    ->public()
```

Pourquoi des alias ?

Cela permet à l'utilisateur d'injecter le service de trois façons différentes :

```php
// Option 1 : Par la classe concrète
public function __construct(EntrepriseSearchClient $client) {}

// Option 2 : Par l'interface (RECOMMANDÉ)
public function __construct(EntrepriseSearchClientInterface $client) {}

// Option 3 : Par le nom du service
public function __construct(#[Autowire(service: 'Vendorcustom_recherche_entreprises.client')] $client) {}
```

Les trois pointent vers la même instance du service !

4. Tag pour la commande console

```php
->set(SearchEntrepriseCommand::class)
    ->args([...])
    ->tag('console.command')
```

Le tag console.command indique à Symfony : "Cette classe est une commande console, enregistre-la automatiquement".

Les tags sont un mécanisme de découverte : Symfony cherche tous les services avec le tag console.command et les enregistre comme commandes.

Autres tags courants :

- **controller.service_arguments** : Pour les contrôleurs
- **kernel.event_listener** : Pour les listeners d'événements
- **twig.extension** : Pour les extensions Twig
- **doctrine.event_listener** : Pour les listeners Doctrine

5. Le helper service()

```php
use function Symfony\Component\DependencyInjection\Loader\Configurator\service;
```

C'est une fonction helper qui facilite la référence à d'autres services. Équivalent à :

```php
// Ancien style (verbose)
->args([
    new Reference('http_client'),
])

// Nouveau style (concis)
->args([
    service('http_client'),
])
```

Structure Finale du Bundle

```txt
recherche-entreprises-bundle/
├── composer.json
├── src/
│   ├── VendorcustomRechercheEntreprisesBundle.php
│   ├── Client/
│   │   ├── EntrepriseSearchClientInterface.php
│   │   └── EntrepriseSearchClient.php
│   ├── Command/
│   │   └── SearchEntrepriseCommand.php
│   └── Model/
│       ├── Entreprise.php
│       ├── Siege.php
│       └── SearchResult.php
└── tests/
```