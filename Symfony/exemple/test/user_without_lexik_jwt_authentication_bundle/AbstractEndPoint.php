<?php

declare(strict_types=1);

namespace App\Tests\Func;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

abstract class AbstractEndPoint extends WebTestCase
{
    private $server_info = [ 'ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json' ];

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
    public function getResponseFromRequest(string $method, string $uri, string $payload = '', $parameter = []) : Response
    {
        $client = self::createClient();

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
}