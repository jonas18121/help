<?php

declare(strict_types=1);

namespace App\Tests\Func;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

abstract class AbstractEndPoint extends WebTestCase
{
    private $server_info = [ 'ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json' ];

    private string $login_payload = '{"email" : "%s", "password" : "%s" }';

    const DEFAULT_USER = [ 'email' => 'test@gmail.com', 'password' => 'password' ];



    /**
     * retourne le contenu de la réponse d'une requête
     * 
     * exemple
     *  
     *      headers
     *          computedCacheControl
     *          cookies
     *          headerNames
     *          headers
     *          cacheControl
     *      content
     *      version
     *      statusCode
     *      statusText
     *      charset
     * 
     * 
     * @return Response
     */
    public function getResponseFromRequest(string $method, string $uri, string $payload = '', $parameter = [], $whitAuth = true) : Response
    {
        // $client = self::createClient();
        $client = $this->createAuthClient($whitAuth);

        $client->request(
            $method, 
            $uri . '.json',
            $parameter,
            [],
            $this->server_info,
            $payload,
        );

        return $client->getResponse();
    }

    
    protected function createAuthClient(bool $whitAuth) : KernelBrowser
    {
        $client = self::createClient();

        if(!$whitAuth){
            return $client;
        }
        // !$whitAuth ?? $client;

        $client->request(
            Request::METHOD_POST, 
            '/api/login_check',
            [],
            [],
            $this->server_info,
            sprintf($this->login_payload, self::DEFAULT_USER['email'], self::DEFAULT_USER['password'])
        );

        $response = $client->getResponse();
        $responseContent = $response->getContent();

        $data = json_decode($responseContent, true);
dd($data);
        $client->setServerParameter('HTTP_Autorization', sprintf('Bearer %s', $data['token']));

        return $client;
    }
    



}