<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserRegisterController {

    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * Pour la collectionOperations nommé "post" dans User.php
     * 
     * Lors de l'enregistrement de 'l'user en bdd, on en profite pour encoder le password
     * ajouter la date de création et le role par défaut 
     *
     * @param Request $request
     * @return User
     */
    public function __invoke(Request $request) : User
    {

        $data = json_decode($request->getContent());
        
        $user = new User();
        
        $user->setPseudo($data->pseudo)
        ->setPhone($data->phone)
        ->setEmail($data->email)
        ->setPassword($data->password)
        ;
        
        $passwordHash = $this->encoder->encodePassword($user, $user->getPassword());

        $user->setPassword($passwordHash)
            ->setDateCreatedAt(new \DateTime())
            ->setRoles(["ROLE_USER"])
        ;

        return $user;
    }
}