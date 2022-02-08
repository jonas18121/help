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

## Erreur 504 Gateway 

### Recharger le php depuis le serveur

    > sudo systemctl restart php7.4-fpm