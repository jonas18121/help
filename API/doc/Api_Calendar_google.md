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
// $client->addScope(\Google\Service\Calendar::CALENDAR);
$client->addScope(\Google_Service_Calendar::CALENDAR);
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
        'RRULE:FREQ=DAILY;COUNT=2'
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
