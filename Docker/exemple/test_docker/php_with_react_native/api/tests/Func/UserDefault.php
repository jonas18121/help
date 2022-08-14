<?php

declare(strict_types=1);

namespace App\Tests\Func;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserDefault extends AbstractEndPoint
{

    
    /*
    public function testPostUsersDefault()
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_POST, 
            '/api/users', 
            json_encode(self::DEFAULT_USER),
            [],
            false
        );

        $responseContent = $response->getContent();

        $responseDecoded = json_decode($responseContent, true);
        
        dd($responseDecoded);
        self::assertEquals(Response::HTTP_CREATED, $response->getStatusCode());
        self::assertJson($responseContent);
        self::assertNotEmpty($responseDecoded);

        return $responseDecoded['id'];
    }

    /**
     * @depends testPostUsersDefault
     *
     * @return void
     */
    /*
    public function testGetOneUsersDefault(int $id)
    {
        $response = $this->getResponseFromRequest(
            Request::METHOD_GET, 
            '/api/users/' . $id,
            '',
            [],
            false
        );

        $responseContent = $response->getContent();

        $responseDecoded = json_decode($responseContent, true);
dd($responseDecoded);
        self::assertEquals(Response::HTTP_OK, $response->getStatusCode());
        self::assertJson($responseContent);
        self::assertNotEmpty($responseDecoded);

        return $responseDecoded[1]['id'];
    }

    */
}