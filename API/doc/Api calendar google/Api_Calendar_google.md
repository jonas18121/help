# Api Calendar


- [Démo Youtube](https://youtu.be/8ddldjKp2IM)
- Guide de démarrage rapide Javascript : https://developers.google.com/calendar/api/quickstart/js
- Repo Github du guide de démarrage rapide Javascript : https://github.com/googleworkspace/browser-samples/blob/main/calendar/quickstart/index.html
- Repo Github Javascript : https://github.com/google/google-api-javascript-client
- Résumé des fonctionnalitées disponible : https://developers.google.com/calendar/api/v3/reference?hl=fr
- Liste des classe en PHP : https://developers.google.com/resources/api-libraries/documentation/calendar/v3/php/latest/?hl=fr
- Liste des classe pour Nodejs : https://googleapis.dev/nodejs/googleapis/latest/calendar/classes/Calendar.html
- Création d'évènement en PHP : https://developers.google.com/calendar/api/guides/create-events?hl=fr#php
- OAuth 2.0 pour les applications Web côté client :https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=fr#authorization-errors-origin-mismatch
- Utiliser OAuth 2.0 pour les applications de serveur Web : https://developers.google.com/identity/protocols/oauth2/web-server?hl=fr
- Repo Github PHP : https://github.com/googleapis/google-api-php-client
- Guide commencer PHP : https://github.com/googleapis/google-api-php-client/blob/main/docs/start.md
- Fonctionnement des identifiants par défaut de l'application : https://cloud.google.com/docs/authentication/application-default-credentials?hl=fr

## 1. Avec le code ci-dessous  dans un controller PHP, on peut créer un évent directement dans Google Agenda avec un compte de service.
```php
// IndexController.php

////////// API CALENDAR /////////////////////////////
/** @var \Google\Client  */
// $client = new \Google\Client();
$client = new \Google_Client();
$client->setDeveloperKey("Api_key");
$client->setAuthConfig($this->checkServiceAccountCredentialsFile());
// $client->useApplicationDefaultCredentials();
$client->setApplicationName("My First Project");
// $client->setScopes(['https://www.googleapis.com/auth/calendar']);
// $client->setRedirectUri('https://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php');
// $client->setRedirectUri($this->redirectToRoute('frontend_index'));
// $client->addScope(\Google\Service\Calendar::DRIVE_METADATA_READONLY);
$client->addScope([\Google_Service_Calendar::CALENDAR, \Google_Service_Calendar::CALENDAR_EVENTS]);
// $client->addScope(\Google_Service_Calendar::CALENDAR);
// dd($client);

// offline access will give you both an access and refresh token so that
// your app can refresh the access token without user interaction.
$client->setAccessType('offline');

// Using "consent" ensures that your application always receives a refresh token.
// If you are not using offline access, you can omit this.
// $client->setApprovalPrompt('consent');
// $client->setIncludeGrantedScopes(true);   // incremental auth

$client->getAccessToken();
$client->getRefreshToken();

// dd($client);

// Build the service object
// $service = new \Google\Service\Calendar($client);
$service = new \Google_Service_Calendar($client);


$event = new \Google_Service_Calendar_Event(array(
    'summary' => 'Test API Calendar',
    'location' => 'Château des ducs de Bretagne, 4 Pl. Marc Elder, 44000 Nantes',
    'description' => 'Description Test API Calendar',
    'start' => array(
        'dateTime' => '2023-01-28T09:00:00+01:00',
        'timeZone' => 'Europe/Paris',
    ),
    'end' => array(
        'dateTime' => '2023-01-28T17:00:00+01:00',
        'timeZone' => 'Europe/Paris',
    ),
    'recurrence' => array(
        'RRULE:FREQ=DAILY;COUNT=1'
    ),
    'attendees' => array(),
    'reminders' => array(
        'useDefault' => FALSE,
        'overrides' => array(
        array('method' => 'email', 'minutes' => 24 * 60),
        array('method' => 'popup', 'minutes' => 10),
        ),
    ),
));

// dd($service->calendarList->get('43rllv5vsjsqcj574spupo47qg@group.calendar.google.com'));
// dd($service->calendarList->listCalendarList());
//   dd($service->calendars->get('primary'));
//   dd($service->events->listEvents('calendarId'));
$calendarId = 'calendarId';
$event = $service->events->insert($calendarId, $event);
//   printf('Event created: %s\n', $event->htmlLink);

////////// END API CALENDAR /////////////////////////////

```

Après avoir fait :
- Créer un compte Google développer  pour lequel Google Agenda est activé. https://console.cloud.google.com
- Lier un projet au compte Google en ajoutant le nom du projet dans “nouveau projet”. 
- Activer l’API dans de projet : https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?supportedpurview=project
- Créer l’ID OAuth
- Générer une clé API 

Suivre les étapes suivantes :
- Allez dans API et services > identifiants > Créer des identifiants cliquez sur Compte de service.
- Remplir le champ Nom du compte de service puis cliquez sur le bouton Créer et continuer.

- Remplir le champ Nom du compte de service puis cliquez sur le bouton Créer et continuer.
- Attribuez le rôle propriétaire puis cliquez sur le bouton Continuer.

- Remplir ou sauter la 3èmes étapes et puis cliquez sur le bouton Ok.
- Conservez le mail qui est afficher dans la liste de compte de service, puis cliquez pour modifier le compte de service

- Allez sur l’onglet clés puis Ajouter une clé sélectionnez Créer une clé
- Créez une clé de type JSON 

- Un fichier JSON sera téléchargée dans l’ordinateur ressemblant au screen ci-dessous, il faudra le mettre dans le projet et l'appeler avec $client->setAuthConfig() du code du début

- Aller dans Google calendar  de son compte
- Cliquez sur Paramètres et partage  de  l’agenda cible dont vous être propriétaire, (ou demandez au propriétaire de faire les opérations suivantes pour vous). 


- Ajoutez le mail qui est afficher dans la liste de compte de service dans Partager avec des personnes en particulier avec un rôle Apporter des modifications et gérer le partage

- Copier l’id de l’agenda


- Mettre l’id de l’agenda dans la Variable $calendarId du codu du début pour créer des évents
- Installer la dépendance avec : composer require google/apiclient:^2.12.1 , si ce n’est pas encore fait



## 2. Avec le code ci-dessous  dans un controller PHP, on peut créer un évent directement dans Google Agenda avec une connexion en OAuth 2.0.



```php
$authUrl = null;

// redirect_uri
$redirect_uri = 'https://site.example.com';

/** @var \Google_Client */
$client = new \Google_Client();
$client->setAuthConfig(__DIR__.'/../../../public/js/code_secret_client_oauth.json');
$client->addScope([\Google_Service_Calendar::CALENDAR, \Google_Service_Calendar::CALENDAR_EVENTS]);
$client->setRedirectUri($redirect_uri);
$client->setAccessType('offline');
$client->setIncludeGrantedScopes(true); 

/************************************************
 * If we have a code back from the OAuth 2.0 flow,
 * we need to exchange that with the
 * Google\Client::fetchAccessTokenWithAuthCode()
 * function. We store the resultant access token
 * bundle in the session, and redirect to ourself.
 ************************************************/
if (null !== $request->get('code')) {
    $token = $client->fetchAccessTokenWithAuthCode($request->get('code'));
    $client->setAccessToken($token);

    // store in the session also
    $sessionInterface->set('upload_token', $token);

    // redirect back to the project
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

$authUrl = null;
// set the access token as part of the client
if (null !== $sessionInterface->get('upload_token')) {
    $client->setAccessToken($sessionInterface->get('upload_token'));
    if ($client->isAccessTokenExpired()) {
        $sessionInterface->remove('upload_token');
        // $client->getRefreshToken();
    }
} else {
    $authUrl = $client->createAuthUrl();
}

// create event if REQUEST_METHOD is same as GET and client access token exists
if ($request->server->get('REQUEST_METHOD') === 'GET' && $client->getAccessToken()) {

    $service = new \Google_Service_Calendar($client);

    $event = new \Google_Service_Calendar_Event(array(
        'summary' => 'Google I/O 2015',
        'location' => '800 Howard St., San Francisco, CA 94103',
        'description' => 'A chance to hear more about Google\'s developer products.',
        'start' => array(
            'dateTime' => '2023-01-28T09:00:00+01:00',
            'timeZone' => 'Europe/Paris',
        ),
        'end' => array(
            'dateTime' => '2023-01-28T17:00:00+01:00',
            'timeZone' => 'Europe/Paris',
        ),
        'recurrence' => array(
            'RRULE:FREQ=DAILY;COUNT=1'
        ),
        'attendees' => array(
            array('email' => 'jonny@gmail.com'),
            array('email' => 'sbrin@example.com'),
        ),
        'reminders' => array(
            'useDefault' => FALSE,
            'overrides' => array(
                array('method' => 'email', 'minutes' => 24 * 60),
                array('method' => 'popup', 'minutes' => 10),
            ),
        ),
        ));
        
        $calendarId = 'primary';
        $event = $service->events->insert($calendarId, $event);
}
```


### ApiCalendarManager.php

```php
declare(strict_types=1);

/*
 * Copyright (C) EDGCo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

namespace App\Manager;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * Api Calendar - Manager.
 */
class ApiCalendarManager
{
    private SessionInterface $sessionInterface;

    public function __construct(
        SessionInterface $sessionInterface
    ) {
        $this->sessionInterface = $sessionInterface;
    }

    /**
     * 
     */
    public function findOwnerClient(): \Google_Client
    {
        /** @var \Google_Client */
        $client = new \Google_Client();
        $client->addScope([\Google_Service_Calendar::CALENDAR, \Google_Service_Calendar::CALENDAR_EVENTS]);
        $client->setScopes([
            'https://www.googleapis.com/auth/calendar', 
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/admin.directory.resource.calendar'
        ]);
        $client->setClientId("Api_key");
        // $client->setClientSecret("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");
        // $client->setDeveloperKey("AIzaSyC1qBv1gG1ZQNsIpYWv1WT-P9LXIId9pUM");
        // $client->setRedirectUri('https://app.aecale.fr');
        // $client->createAuthUrl();
        $client->setAuthConfig($this->checkServiceAccountCredentialsFile());
        $client->setApplicationName('My First Project');
        $client->setAccessType('offline');
        $client->getAccessToken();
        $client->getRefreshToken();

        return $client;
    }

    /**
     * See : https://github.com/googleapis/google-api-php-client/blob/main/docs/oauth-web.md#step-1-set-authorization-parameters
     * 
     */
    public function resquestAuth(Request $request) : Array
    {
        $authUrl = null;

        // redirect_uri
        $redirect_uri = 'https://project.fr/inscription';

        /** @var \Google_Client */
        $client = new \Google_Client();
        $client->setAuthConfig(__DIR__.'/../../public/js/code_secret_client_oauth.json');
        $client->addScope([\Google_Service_Calendar::CALENDAR, \Google_Service_Calendar::CALENDAR_EVENTS]);
        $client->setRedirectUri($redirect_uri);
        $client->setAccessType('offline');
        $client->setIncludeGrantedScopes(true); 

        /************************************************
         * If we have a code back from the OAuth 2.0 flow,
         * we need to exchange that with the
         * Google\Client::fetchAccessTokenWithAuthCode()
         * function. We store the resultant access token
         * bundle in the session, and redirect to ourself.
         ************************************************/
        if (null !== $request->get('code')) {
            $token = $client->fetchAccessTokenWithAuthCode($request->get('code'));
            $client->setAccessToken($token);
        
            // store in the session also
            $this->sessionInterface->set('upload_token', $token);
        
            // redirect back to the project
            header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
        }

        // set the access token as part of the client
        if (null !== $this->sessionInterface->get('upload_token')) {
            $client->setAccessToken($this->sessionInterface->get('upload_token'));
            if ($client->isAccessTokenExpired()) {
                $this->sessionInterface->remove('upload_token');
                // $client->getRefreshToken(); // Refresh Token
            }
        } else {
            $authUrl = $client->createAuthUrl();
        }
        dump('Object Client', $client);
        dump('Token', $this->sessionInterface->get('upload_token'));

        return [ $client, $authUrl ];
    }

    /**
     * Mettre cette méthode dans ApiCalendarManager.php.
     *
     * return  file json or false
     * @return JSON|false
     */
    public function checkServiceAccountCredentialsFile()
    {
        // service account creds
        $application_creds = __DIR__.'/../../public/js/code_secret_owner_client.json';
        return file_exists($application_creds) ? $application_creds : false;
    }

    /**
     * 
     */
    public function createEvent(
        $client,
        $orderUserApplication,
        string $examDateFR,
        string $examDateEN,
        string $examType,
        string $examName,
        string $calendarId
    ): \Google_Service_Calendar_Event
    {
        if (null !== $client->getAccessToken()) {
            // // Build the service object
            $service = new \Google_Service_Calendar($client);

            // Build the event object
            $event = new \Google_Service_Calendar_Event([
                'summary' => $examName . ' Session du '. $examDateFR,
                'location' => '6 Rue de la Plaine, 78860 Saint-Nom-la-Bretèche',
                'description' => 'Session du '. $examDateFR.' pour l\'examen : '.$examName.' sur '.$examType,
                'start' => [
                    'dateTime' => $examDateEN.'T07:30:00+01:00',
                    'timeZone' => 'Europe/Paris',
                ],
                'end' => [
                    'dateTime' => $examDateEN.'T18:30:00+01:00',
                    'timeZone' => 'Europe/Paris',
                ],
                'recurrence' => [
                    'RRULE:FREQ=DAILY;COUNT=1',
                ],
                'attendees' => [
                    [
                        'email' => $orderUserApplication->getEmail(), 
                        'displayName' => $orderUserApplication->getName() 
                    ]
                ],
                'reminders' => [
                    'useDefault' => false,
                    'overrides' => [
                        ['method' => 'email', 'minutes' => 24 * 60],
                        ['method' => 'popup', 'minutes' => 2 * 60],
                        ['method' => 'popup', 'minutes' => 10],
                    ],
                ],
            ]);

            return $service->events->insert($calendarId, $event);
        }
    }

    /**
     * 
     */
    public function ownerCreateEvent(
        string $examDateFR,
        string $examDateEN,
        string $examType,
        string $examName,
        string $calendarId
    ): \Google_Service_Calendar_Event
    {
        /** @var \Google_Client */
        $client = $this->findOwnerClient();

        // // Build the service object
        $service = new \Google_Service_Calendar($client);

        // Build the event object
        $event = new \Google_Service_Calendar_Event([
            'summary' => $examName . ' Session du '. $examDateFR,
            'location' => '6 Rue de la Plaine, 78860 Saint-Nom-la-Bretèche',
            'description' => 'Session du '. $examDateFR.' pour l\'examen : '.$examDateFR.' sur '.$examType,
            'start' => [
                'dateTime' => $examDateEN.'T07:30:00+01:00',
                'timeZone' => 'Europe/Paris',
            ],
            'end' => [
                'dateTime' => $examDateEN.'T18:30:00+01:00',
                'timeZone' => 'Europe/Paris',
            ],
            'recurrence' => [
                'RRULE:FREQ=DAILY;COUNT=1',
            ],
            'anyoneCanAddSelf' => true,
            'attendees' => [
                // ['email' => $orderUserApplication->getEmail() ]
            ],
            'reminders' => [
                'useDefault' => false,
                'overrides' => [
                    ['method' => 'email', 'minutes' => 24 * 60],
                    ['method' => 'popup', 'minutes' => 10],
                ],
            ],
        ]);
        return $service->events->insert($calendarId, $event);
    }

    public function getEvent($client, string $eventId)
    {
        if (null !== $client->getAccessToken()) {
            // // Build the service object
            $service = new \Google_Service_Calendar($client);

            return $service->events->get('primary', $eventId);
        }
    }

    public function updateEvent(
        $client, 
        $event,
        $candidateUserApplication
    )
    {
        if (null !== $client->getAccessToken()) {
            // // Build the service object
            $service = new \Google_Service_Calendar($client);

            if (null !== $event->getAttendees()) {
                $data = [];
                foreach ($event->getAttendees() as $key => $attendee) {
    
                    $data['candidate'][] =  [ 
                        'email' => $attendee->getEmail(),
                        'displayName' => $attendee->getDisplayName()
                    ];
                }
            }

            $data['candidate'][] = [
                'email' => $candidateUserApplication->getEmail(),
                'displayName' => $candidateUserApplication->getName() 
            ];

            $event->setAttendees($data['candidate']);

            return $service->events->update('primary', $event->getId(), $event);
        }
    }

    /**
     *
     */
    public function deleteEventsList(string $calendarId): void
    {
        /** @var \Google_Client */
        $client = $this->findOwnerClient();

        // Build the service object
        $service = new \Google_Service_Calendar($client);

        // Get events list
        $events = $service->events->listEvents($calendarId);

        // Delete events list
        foreach ($events->getItems() as $event) {
            // Delete one event
            $service->events->delete($calendarId, $event->getId());
        }
    }

    /**
     * Delete one event
     */
    public function deleteEventId(string $calendarId, string $eventId): void
    {
        /** @var \Google_Client */
        $client = $this->findOwnerClient();
        // Build the service object
        $service = new \Google_Service_Calendar($client);
        // Get one event
        $event = $service->events->get($eventId);
        // Delete one event
        $service->events->delete($calendarId, $event->getId());
    }
}
```