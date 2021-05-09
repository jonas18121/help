<?php

declare(strict_types=1);

namespace App\Tests\Func;

use Faker\Factory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class UserTest extends AbstractEndPoint
{
    private string $user_payload = '{"email" : "%s", "password" : "password" }';

    /**
     * généré un email aléatoire
     *
     * @return string
     */
    private function getPayload() : string
    {
        $faker = Factory::create();

        return sprintf($this->user_payload, $faker->email);
    }

    /**
     * Test : Afficher la liste des users
     * 
     * 3 assertions
     * 
     * - Vérifier si le statusCode est bien en 200
     * 
     * - Vérifier si le contenu de $responseContent est bien en json
     * 
     * - Vérifier si le contenu de $responseDecoded n'est pas vide 
     *
     * @return void
     */
    public function testGetAllUsers() : void
    {
        $response = $this->getResponseFromRequest(Request::METHOD_GET, '/api/users');

        $responseContent = $response->getContent();

        $responseDecoded = json_decode($responseContent);

        self::assertEquals(Response::HTTP_OK, $response->getStatusCode());
        self::assertJson($responseContent);
        self::assertNotEmpty($responseDecoded);
    }

    /**
     * Test : Ajouter un user
     * 
     * 3 assertions
     * 
     * - Vérifier si le statusCode est bien en 201
     * 
     * - Vérifier si le contenu de $responseContent est bien en json
     * 
     * - Vérifier si le contenu de $responseDecoded n'est pas vide 
     * 
     *
     * @return int
     */
    public function testAddUsers() : int
    {
        $response = $this->getResponseFromRequest(Request::METHOD_POST, '/api/users', $this->getPayload());

        $responseContent = $response->getContent();

        $responseDecoded = json_decode($responseContent, true);

        self::assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        self::assertJson($responseContent);
        self::assertNotEmpty($responseDecoded);

        return $responseDecoded['id'];
    }

    /**
     * @depends testAddUsers
     * 
     * Test : Afficher un user précis
     * 
     * testGetOneUsers dépend de testAddUsers
     * 
     * 3 assertions
     * 
     * - Vérifier si le statusCode est bien en 200
     * 
     * - Vérifier si le contenu de $responseContent est bien en json
     * 
     * - Vérifier si le contenu de $responseDecoded n'est pas vide 
     *
     * @return int
     */
    public function testGetOneUsers(int $id) : int
    {
        $response = $this->getResponseFromRequest(Request::METHOD_GET, '/api/users/' . $id);

        $responseContent = $response->getContent();

        $responseDecoded = json_decode($responseContent, true);

        self::assertEquals(Response::HTTP_OK, $response->getStatusCode());
        self::assertJson($responseContent);
        self::assertNotEmpty($responseDecoded);

        return $responseDecoded['id'];
    }

    /**
     * @depends testGetOneUsers
     * 
     * Test : Modifier un user
     * 
     * testPutUsers dépend de testGetOneUsers
     * 
     * 3 assertions
     * 
     * - Vérifier si le statusCode est bien en 200
     * 
     * - Vérifier si le contenu de $responseContent est bien en json
     * 
     * - Vérifier si le contenu de $responseDecoded n'est pas vide 
     *
     * @param integer $id
     * @return int
     */
    public function testPutUsers(int $id) : int
    {
        $response = $this->getResponseFromRequest(Request::METHOD_PUT, '/api/users/' . $id, $this->getPayload());

        $responseContent = $response->getContent();

        $responseDecoded = json_decode($responseContent, true);

        self::assertEquals(Response::HTTP_OK, $response->getStatusCode());
        self::assertJson($responseContent);
        self::assertNotEmpty($responseDecoded);

        return $responseDecoded['id'];
    }

    /**
     * @depends testPutUsers
     * 
     * Test : Supprimer un user
     * 
     * testDeleteUsers dépend de testPutUsers
     * 
     * 2 assertions
     * 
     * - Vérifier si le statusCode est bien en 204
     * 
     * - Vérifier si le contenu de $responseContent est bien vide
     *
     * @param integer $id
     * @return void
     */
    public function testDeleteUsers(int $id) : void
    {
        $response = $this->getResponseFromRequest(Request::METHOD_DELETE, '/api/users/' . $id);

        $responseContent = $response->getContent();

        self::assertEquals(Response::HTTP_NO_CONTENT, $response->getStatusCode());
        self::assertEmpty($responseContent);
    }
}