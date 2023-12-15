# Listener (antérieure à symfony 4.4)

Voir [Doctrine Event Listeners and Subscribers](https://symfony.com/doc/4.1/doctrine/event_listeners_subscribers.html)

### Dans src/EventListener/StorageSpaceListener.php

```php
# src/EventListener/StorageSpaceListener.php

namespace App\EventListener;

use App\Manager\StorageSpaceManager;
use App\Repository\BookingRepository;
use App\Repository\StorageSpaceRepository;
use App\Service\StorageSpaceService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class StorageSpaceListener
{
    protected StorageSpaceService $storageSpaceService;
    protected StorageSpaceRepository $storageSpaceRepository;
    protected BookingRepository $bookingRepository;
    protected EntityManagerInterface $entityManager;
    protected StorageSpaceManager $storageSpaceManager;

    public function __construct(
        StorageSpaceService $storageSpaceService,
        StorageSpaceRepository $storageSpaceRepository,
        BookingRepository $bookingRepository,
        EntityManagerInterface $entityManager,
        StorageSpaceManager $storageSpaceManager
    ) {
        $this->storageSpaceService = $storageSpaceService;
        $this->storageSpaceRepository = $storageSpaceRepository;
        $this->bookingRepository = $bookingRepository;
        $this->entityManager = $entityManager;
        $this->storageSpaceManager = $storageSpaceManager;
    }

    /**
     * Pour réagir à une reponse ResponseEvent $event
     * Pour réagir à une request RequestEvent $event.
     */
    public function processStorage(RequestEvent $event): void
    {
        $this->storageSpaceService->emitStorageCheckDateEndAt($event->getRequest(), $this->storageSpaceRepository, $this->bookingRepository, $this->entityManager);
    }

    /**
     * Pour réagir à une reponse ResponseEvent $event
     * Pour réagir à une request RequestEvent $event.
     */
    public function calculPriceByMonth(RequestEvent $event): void
    {
        $this->storageSpaceService->emitStorageCalculPriceByMonth($event->getRequest(), $this->storageSpaceRepository, $this->entityManager, $this->storageSpaceManager);
    }
}
```

### Dans src/Service/StorageSpaceService.php

- Les 2 méthodes sont appeler depuis `src/EventListener/StorageSpaceListener.php`

```php
# src/Service/StorageSpaceService.php

namespace App\Service;

use App\Entity\StorageSpace;
use App\Kernel;
use App\Manager\StorageSpaceManager;
use App\Repository\BookingRepository;
use App\Repository\StorageSpaceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class StorageSpaceService
{
    /**
     *
     * Lorsque StorageSpaceListener réagi à l'évènnement kernel.request
     * StorageSpaceListener fait fonctionner StorageSpaceService::emitStorageCheckDateEndAt()
     * qui va rendre un espace de stockage disponible si la date de fin de réservation est passé.
     *
     * Si la date d'aujourd'hui est plus grand ou égale à la date de fin de réservation,
     * on met la propriété available de l'entité StorageSpace en true , pour qu'il soit disponible aux autres user
     */
    public function emitStorageCheckDateEndAt(
        Request $request,
        StorageSpaceRepository $storageRepository,
        BookingRepository $bookingRepository,
        EntityManagerInterface $entityManager
    ): void {
        $bookings = $bookingRepository->findAll();

        foreach ($bookings as $key => $booking) {
            $dateCurrent = new \DateTime();

            if ($booking->getDateEndAt()) {
                if ($dateCurrent >= $booking->getDateEndAt()) {
                    /*                              17/03/2021                                 >                                   16/03/2021        retourne +1 jour
                        soit la date du jour ->diff(new \DateTime()) a au minimun 1 jour de plus que la date en comparaison $booking->getDateEndAt()

                                                    17/03/2021                                <                                    18/03/2021         retourne -1 jour
                        soit la date du jour ->diff(new \DateTime()) a au minimun 1 jour de moins que la date en comparaison $booking->getDateEndAt()

                                                    17/03/2021                         ==                    17/03/2021          retourne +0 jour
                        soit la date du jour ->diff(new \DateTime()) est égale à la date en comparaison $booking->getDateEndAt()
                    */
                    $nb_days_positif_or_negatif = $booking->getDateEndAt()->diff(new \DateTime());

                    $nb_days = $nb_days_positif_or_negatif->format('%R%a'); // exemple retourne +1 ou -1 ou +0

                    if (0 === (int) $nb_days && false === $booking->getFinish()) {
                        $storageSpace = $storageRepository->findStorageSpaceFromBookingId($booking->getId());

                        $storageSpace->setAvailable(true);
                        $entityManager->persist($storageSpace);

                        $booking->setFinish(true);
                        $entityManager->persist($booking);
                    }
                }
            }
        }

        $entityManager->flush();
    }

    /**
     * calcule le prix par mois de chaque espace de stockage
     * après chaque création ou chaque modification,
     * que ce soit dans EasyAdmin ou dans l'interface normale.
     */
    public function emitStorageCalculPriceByMonth(
        Request $request,
        StorageSpaceRepository $storageRepository,
        EntityManagerInterface $entityManager,
        StorageSpaceManager $storageSpaceManager
    ): void {
        $storageSpaces = $storageRepository->findAll();

        foreach ($storageSpaces as $storageSpace) {
            $priceByMonth = $storageSpaceManager->priceByMonth($storageSpace);

            if (null === $storageSpace->getPriceByMonth() || $priceByMonth !== $storageSpace->getPriceByMonth()) {
                $storageSpace->setPriceByMonth($priceByMonth);
                $entityManager->persist($storageSpace);
            }
        }

        $entityManager->flush();
    }
}
```

### Dans config/services.yaml

- On déclare le service : `storage.space.service`
- On déclare le listener `storage.space.check.date.listener` pour la méthode `emitStorageCheckDateEndAt` avec les différents arguments et tags dont il a besoin
- On déclare le listener `storage.space.calcul.price.month` pour la méthode `calculPriceByMonth` avec les différents arguments et tags dont il a besoin

```yaml
# config/services.yaml

parameters:
    app.path.images: /uploads/images
    app.domain: '%env(DOMAIN)%'

services:
    # default configuration for services in *this* file
    _defaults:
        autowire: true      # Automatically injects dependencies in your services.
        autoconfigure: true # Automatically registers your services as commands, event subscribers, etc.

    # makes classes in src/ available to be used as services
    # this creates a service per class whose id is the fully-qualified class name
    App\:
        resource: '../src/'
        exclude:
            - '../src/DependencyInjection/'
            - '../src/Entity/'
            - '../src/Kernel.php'
            - '../src/Tests/'

    # controllers are imported separately to make sure services can be injected
    # as action arguments even if you don't extend any base controller class
    App\Controller\:
        resource: '../src/Controller/'
        tags: ['controller.service_arguments']

    # add more service definitions when explicit configuration is needed
    # please note that last definitions always *replace* previous ones

    #  doctrine.orm.entity_listener

    storage.space.service:
        class: App\Service\StorageSpaceService

    storage.space.check.date.listener:
        class: App\EventListener\StorageSpaceListener
        arguments: 
            - "@storage.space.service"
            # - "@storage.space.repository"
        tags:
            - {
                name: kernel.event_listener,
                event: kernel.request,
                method: processStorage
            }


    storage.space.calcul.price.month:
        class: App\EventListener\StorageSpaceListener
        arguments: 
            - "@storage.space.service"
        tags:
            - {
                name: kernel.event_listener,
                event: kernel.request,
                method: calculPriceByMonth
            }
```