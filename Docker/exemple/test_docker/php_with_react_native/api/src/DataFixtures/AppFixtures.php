<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        

        // --------------- ADMIN ---------------//
        $admin = new User();

        $passwordHash = $this->encoder->encodePassword($admin, 'adminadmin');

        $admin->setEmail('admin@gmail.com')
            ->setPassword($passwordHash)
            ->setRoles(["ROLE_ADMIN"])
        ;

        $manager->persist($admin);



        // --------------- USER ---------------//

        for ($u=0; $u < 3; $u++) { 
            
            $user = new User();

            $passwordHash = $this->encoder->encodePassword($user, 'password');

            $user->setEmail($faker->email)
                ->setPassword($passwordHash)
                ->setRoles(["ROLE_USER"])
            ;

            $manager->persist($user);
        }

        $manager->flush();
    }
}
