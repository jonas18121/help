<?php 

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;

class UserImageController {

    /**
     * Pour la itemOperations nommé "image" dans User.php
     * 
     * ajoute un fichier (image) à la table user
     * ainsi que la date de modification
     *
     * @param Request $request
     * @return User
     */
    public function __invoke(Request $request) : User
    {
        $user = $request->attributes->get('data');

        if (! ($user instanceof User)) {
            throw new \RuntimeException('Un user est attendu ici');
        }
        
        $user->setFile($request->files->get('file'))
            ->setUpdatedAt(new \DateTime())
        ;

        return $user;
    }

}