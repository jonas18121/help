<?php

declare(strict_types=1);

namespace App\Test\Unit;

use App\Entity\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = new User();
    }

    /**
     * 3 assertions
     * 
     * - Vérifier si $response est une instance de User
     * 
     * - on test $get_email pour savoir s'il a la même valeur que $email
     *      si oui, tous est ok
     * 
     * - on test $get_username pour savoir s'il a la même valeur que $email
     *      si oui, tous est ok
     *
     * @return void
     */
    public function testGetEmail(): void
    {
        $email = 'test@gmail.fr';

        $response = $this->user->setEmail($email);
        $get_email = $this->user->getEmail();
        $get_username = $this->user->getUserName();

        self::assertInstanceOf(User::class, $response);
        self::assertEquals($email, $get_email);
        self::assertEquals($email, $get_username);
    }

    /**
     * 3 assertions
     * 
     * - Vérifier si $response est une instance de User
     * 
     * - on test $roles_user pour savoir s'il a la même valeur que 'ROLE_USER'
     *      si oui, tous est ok
     * 
     * - on test $roles_admin pour savoir s'il a la même valeur que 'ROLE_ADMIN'
     *      si oui, tous est ok
     *
     * @return void
     */
    public function testGetRoles(): void
    {
        $roles_user = $this->user->getRoles();

        $response = $this->user->setRoles(["ROLE_ADMIN"]);
        $roles_admin = $this->user->getRoles();

        self::assertInstanceOf(User::class, $response);
        self::assertContains('ROLE_USER', $roles_user);
        self::assertContains('ROLE_ADMIN', $roles_admin);
    }

    /**
     * 2 assertions
     * 
     * - Vérifier si $response est une instance de User
     * 
     * - on test $password_user pour savoir s'il a la même valeur que $password
     *      si oui, tous est ok
     *
     * @return void
     */
    public function testGetPassword(): void
    {
        $password = 'password';

        $response = $this->user->setPassword($password);
        $password_user = $this->user->getPassword();

        self::assertInstanceOf(User::class, $response);
        self::assertEquals($password, $password_user);
    }
}