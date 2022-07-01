# Augmenter le max_allowed_packet en local avec un projet dockeriser


1. Aller sur le path du projet depuis un terminal

2. Démarrer le serveur mysql

```bash
sudo service mysql restart
```

3. Executer la commande ci dessous pour se connecter a mysql et directement modifier `max_allowed_packet`

```bash
mysql --max_allowed_packet=100M -h [host] -p [port] -u [username] -p [BDD]
```

4. Entrer le password