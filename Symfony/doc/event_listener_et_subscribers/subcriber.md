# Subscriber

Voir [Événements de doctrine](https://symfony.com/doc/5.4/doctrine/events.html)

Voir [Events Overview](https://www.doctrine-project.org/projects/doctrine-orm/en/current/reference/events.html#events-overview)

Voir [Doctrine Event Listeners and Subscribers](https://symfony.com/doc/4.1/doctrine/event_listeners_subscribers.html)

## Exemple avec prePersite lors d'un submit

### Dans src/Subscribers/ProductSubscriber

```php
namespace App\Subscribers;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class ProductSubscriber implements EventSubscriberInterface
{
    // this method can only return the event names; you cannot define a
    // custom method name to execute when each event triggers
    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist,
        ];
    }

    /**
     * On fait une concaténation sur la propriété Subtitle de l'entité Product,
     * lorsqu'on va submit un formulaire sur l'entité Product, avant de mettre les données dans la bdd
     */ 
    public function prePersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if($entity instanceof Product){
            // Concat . :)
            $entity->setSubtitle($entity->getSubtitle() . ". :)");
        }
    }
}
```

### Dans services.yaml

```yaml
App\Subscribers\ProductSubscriber:
        tags:
            - 
                name: 'doctrine.event_subscriber'

                # listeners can define their priority in case multiple subscribers or listeners are associated
                # to the same event (default priority = 0; higher numbers = listener is run earlier)
                priority: 500

                # you can also restrict listeners to a specific Doctrine connection
                connection: 'default'
```