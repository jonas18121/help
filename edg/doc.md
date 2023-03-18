Procès d'installation : 

    CLI

       > git clone  <repo>

       > Mkcert (déjà installé)

       > docker-compose stop

       > sudo netstat -lpn | grep 80

       > sudo kill <si_port_80_occupé>

       > make

       > make install-full

       > sudo make tools-script-domain-names
       
       > sudo chmod 777 –R app/var (si besoin) 



## Attention

Il faut éviter de faire : `make composer-update`, car ça met à jour à chaque fois les vendors

Nous le seul vraiment qui nous intéresse qui soit toujours à jour est seed

Pour ça que j'ai créé : `make composer-update-seed-bundle`

Le problème de tout mettre à jour à chaque fois est qu'on tombe sur des versions deprecated

Donc faut privilégier `make compose-install` et `make composer-update-seed-bundle`

A savoir que c'est une bonne pratique sur les projets symfony, et PHP en général, qu'il faut éviter les `composer update` ^^

## Entrer dans le bash avec docker

Après on peut utiliser toutes les commandes qu'on souhaites car on passera forcément par docker

    > make exec-cli-app

## Erreur 504 Gateway 

### Recharger le php depuis le serveur

    > sudo systemctl restart php7.4-fpm

## Mettre des règles de droits dans des fichiers et dossiers

### La première parcours tous les dossiers du projet et leur mets 0775 

    > sudo find . -type d -exec chmod 0775 {} \;

### La deuxième parcours tous les fichiers du projet et leur mets 0664

    > sudo find . -type f -exec chmod 0664 {} \;

### La troisième ajout de droit "exécutable" sur le fichier bin/console (car le 0664 a enlever le droit exécutable)
    
    > sudo  chmod +x bin/console

### Permission denied CI prod Aec

Faire dans le dossier app du serveur distant 

    > sudo chmod 777 -R var

Ou la commande ci-dessous depuis la racine du projet

    > sudo chmod 777 -R app

ou 
```ps
chown -R www-data:www-data your_folder

chmod -R 777 your_folder
```

### Modif couleur projets

- _custom.css > $themes > day-mode 

## Liste commande make dans app

### Charger un file latest en staging

    > make db-load-latest ENV=staging


Par contre il faut un fichier : **latest.staging.sql**

si on fait : 

    > make db-load-latest

ça chargera un fichier **latest.dev.sql**

### PHPStan

Voir [ce commentaire](https://github.com/phpstan/phpstan/issues/743#issuecomment-355909457)

```php
/** @var User */
$user = $this->manager->getRepository(User::class)->findOneBy(['email' => $value['email']]);

```
**Error Strict comparison using === between null and App\Entity\User will always evaluate to false. **

#### Solution : rajouter null à @var User

```php
/** @var User|null */
$user = $this->manager->getRepository(User::class)->findOneBy(['email' => $value['email']]);

```

### Accéder aux logs dans nginx avec docker

Dans le terminal, se mettre à la racine du projet puis :

```bash
cd .data/logs/nginx
```

### Si le fichier SQL est trop lourd pour MYSQL

```bash
SQLSTATE[08S01]: Communication link failure: 1153 Got a packet bigger than 'max_allowed_packet' bytes  
```

- ajout de : `command: --max_allowed_packet=32505856      # Set max_allowed_packet to 256M (or any other value)`   Dans le conteneur Mysql dans docker-compose
- suppression du conteneur Mysql via docker `docker rm <ID_container>`
- excécution de `docker-compose up -d`


### Monolog

Si projet sous docker path : projet/logs sinon projet/var/log

- [https://www.strangebuzz.com/](https://www.strangebuzz.com/fr/blog/envoyer-des-logs-applicatifs-symfony-vers-slack-avec-monolog)
- [Logging](https://symfony.com/doc/current/logging.html)
```yml
monolog:
    channels: ['payment']
    handlers:

        main:
            type:           rotating_file
            max_files:      7
            path:           '%kernel.logs_dir%/%kernel.environment%.all.log'
            level:          info # Less logs

        # Custom handlers for project


        payment:
            type:           rotating_file
            max_files:      7
            path:           '%kernel.logs_dir%/%kernel.environment%.payment.log'
            level:          debug
            channels:       payment

        # End custom handlers for project
 
        main_error:
            type:           fingers_crossed
            action_level:   error
            handler:        grouped_error
            excluded_http_codes: [401,403,404]

        grouped_error:
            type:    group
            members: [streamed_error, deduplicated]

        streamed_error:
            type:           rotating_file
            max_files:      7
            path:           '%kernel.logs_dir%/%kernel.environment%.error.log'
            level:          error

        console:
            type: console
            process_psr_3_messages: false
            channels: ["!event", "!doctrine", "!console"]


        # SLACK

        # Payment
        slack_payment:
            type:       slack
            token:       '%env(SLACK_TOKEN)%'
            channel:     '#project-payment'
            bot_name:    '%env(SLACK_BOT_NAME)%'
            icon_emoji:  ':school:'
            level:      debug
            include_extra: true
            use_short_attachment: true
            formatter: monolog.formatter.extra
            channels: payment

```

### pour Résourdre make quality dans Repository

Mettre de cette manière la variable `$query` ainsi que `/** @var Product */` puis faire make quality
```php

/**
 * @return Product[]
 */
public function getAllPublishedProductWithSeedPage()
{
    $query = $this->em()->createQuery('SELECT p, sp
        FROM App\Entity\Product p
        LEFT JOIN p.page sp
        WHERE sp.state = :state
        ORDER BY p.id DESC')
        ->setParameter('state', StateEnum::PUBLISHED);

    /** @var Product[] $data */
    $data = $query->execute();

    if (empty($data)) {
        return [];
    }

    return $data;
}

/**
 * @return Product|null
 */
public function getProductWithSeedPage(Page $page)
{
    $query = $this->em()->createQuery('SELECT p, sp
        FROM App\Entity\Product p
        LEFT JOIN p.page sp
        WHERE sp = :page');

    $query->setParameter('page', $page);

    /** @var Product|null $result */
    $result = $query->getOneOrNullResult();

    if (null === $result) {
        return null;
    }

    return $result;
}
```
