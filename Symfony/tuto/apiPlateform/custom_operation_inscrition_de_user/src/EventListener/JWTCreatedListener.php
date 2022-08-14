<?php

declare(strict_types=1);

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    private ?UserInterface $user;

    public function __construct(Security $security)
    {
        $this->user = $security->getUser();
    }

    /**
     * https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/2-data-customization.md
     * L'event JWTCreatedListener qu'on a pris depuis dans le github de jwtLexik pour le mettre dans notre service
     * nous sert à ajouter des données dans le token
     * Ici on a rajouter la date de création de l'user son id, son pseudo et son phone
     * 
     * 
     * ps: c'est pas grave si getDateCreatedAt() et getId() et ls autre, sont souligner en rouge
     *
     * @param JWTCreatedEvent $event
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        if (null !== $this->user) {

            $payload = $event->getData();

            $payload['dateCreatedAt'] = $this->user->getDateCreatedAt();
            $payload['id'] = $this->user->getId();
            $payload['pseudo'] = $this->user->getPseudo();
            $payload['phone'] = $this->user->getPhone();
            $payload['email'] = $this->user->getEmail();
            // $payload['fileUrl'] = $this->user->getFileUrl();

            $payload['filePath'] = $this->user->getFilePath();
            

            $event->setData($payload);
        }
    }
}
