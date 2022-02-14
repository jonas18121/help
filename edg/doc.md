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

Donc faut privilégier make compose-install et make composer-update-seed-bundle

A savoir que c'est une bonne pratique sur les projets symfony, et PHP en général, qu'il faut éviter les `composer update` ^^

## Erreur 504 Gateway 

### Recharger le php depuis le serveur

    > sudo systemctl restart php7.4-fpm

