# Augmenter le max_allowed_packet en local avec un projet dockeriser


1. Aller sur le path du projet depuis un terminal

2. Redémarrer le serveur mysql

```bash
sudo service mysql restart
```

3. Executer la commande ci dessous pour se connecter a mysql et directement modifier `max_allowed_packet`

```bash
mysql --max_allowed_packet=100M -h [host] -p [port] -u [username] -p [BDD]
```

4. Entrer le password

### Les commandes ci-dessus modifient `max_allowed_packet` temporairement, utiliser plutôt la commande ci-dessous

```bash
docker run -it -e MYSQL_ROOT_PASSWORD=my_secret_pw mysql:5.7 --max-allowed-packet=32505856
```

Lors de l'utilisation docker-compose(comme demandé dans les commentaires), ajoutez une commandclé avec les arguments :

docker-compose.yml
```bash
version : "3" 
services : 
  données : 
    image : "mysql:5.7.20" 
    commande : --max_allowed_packet=32505856 # Définissez max_allowed_packet sur 256 Mo (ou toute autre valeur) 
    environnement : 
      - MYSQL_ROOT_PASSWORD=mot de passe 
      - MYSQL_DATABASE=db 
      - MYSQL_USER=utilisateur 
      - MYSQL_PASSWORD=user_password
```