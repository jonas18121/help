# Script bash pour installer phpMyAdmin sur un serveur distant

Ce script 
- télécharge la dernière version de phpMyAdmin, 
- la décompresse, 
- la déplace dans le répertoire web 
- et change les autorisations pour permettre à PHP de lire le répertoire. 
- Il redémarre également le service PHP-FPM pour appliquer les modifications.

```ps
# Mettre à jour les paquets
sudo apt-get update

# Installer les paquets nécessaires
sudo apt-get install -y php-fpm php-mysql

# Télécharger la dernière version de phpMyAdmin
wget https://files.phpmyadmin.net/phpMyAdmin/5.0.2/phpMyAdmin-5.0.2-all-languages.tar.gz

# Décompresser le fichier téléchargé
tar xvf phpMyAdmin-5.0.2-all-languages.tar.gz

# Déplacer le répertoire décompressé dans le répertoire web par défaut
sudo mv phpMyAdmin-5.0.2-all-languages /var/www/html/phpmyadmin

# Changer les autorisations pour permettre à PHP de lire le répertoire
sudo chown -R www-data:www-data /var/www/html/phpmyadmin

# Redémarrer le service PHP-FPM pour appliquer les modifications
sudo service php7.2-fpm restart
```