# Installer/Désintaller PhpMyAdmin

- [Comment installer phpMyAdmin sur Debian 11 Bullseye (Apache)](https://www.how2shout.com/linux/how-to-install-phpmyadmin-on-debian-11-bullseye-apache/)
## Installer PhpMyAdmin

1. Téléchargez le dernier package phpMyAdmin

Bien que nous puissions installer PHPMyAdmin directement en utilisant le référentiel par défaut de Debian 11 Bullseye, cependant, la version sera ancienne. <br>
Par conséquent, pour obtenir le dernier, téléchargez son fichier d'archive manuellement à l'aide de la commande indiquée :

```ps
wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz
```

2. Configurer phpMyAdmin sur Debian 11 Bullseye

Une fois que vous avez le fichier phpMyAdmin compressé sur votre serveur ou votre système, créez les répertoires requis et déplacez le fichier vers un emplacement approprié pour y accéder via le serveur Web Apache.

```ps
sudo tar xvf phpMyAdmin-latest-all-languages.tar.gz

sudo mv phpMyAdmin-*-all-languages/ /var/www/html/phpmyadmin
```

3. créez un fichier de configuration en copiant celui déjà présent dans le dossier phpMyAdmin ;

```ps
cd /var/www/html

sudo cp phpmyadmin/config.sample.inc.php phpmyadmin/config.inc.php
```

4. Créez également un dossier temporaire pour le stockage, s'il n'existe pas.

```ps
sudo mkdir /var/www/html/phpmyadmin/tmp
```

5. Générez une clé secrète à utiliser avec phpMyadmin :

```ps
openssl rand -base64 32
```

Copiez la clé générée pour l'authentification par cookie.

6. Editez le fichier de configuration de phpMyAdmin

```ps
sudo nano /var/www/html/phpmyadmin/config.inc.php
```

et passez-le devant la ligne :

**$cfg['blowfish_secret'] = ' votre-clé '; /* VOUS DEVEZ LE REMPLIR POUR L'AUTHENTIFICATION DES COOKIES ! */**

Exemple : 
```php
/**
 * phpMyAdmin sample configuration, you can use it as base for
 * manual configuration. For easier setup you can use setup/
 *
 * All directives are explained in documentation in the doc/ folder
 * or at <https://docs.phpmyadmin.net/>.
 */

declare(strict_types=1);

/**
 * This is needed for cookie based authentication to encrypt the cookie.
 * Needs to be a 32-bytes long string of random bytes. See FAQ 2.10.
 */
$cfg['blowfish_secret'] = 'ojfbsdksbdkjsbcjsnsbdjncd,sks,sxdxbn,sk,q'; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */

/**
 * Servers configuration
 */
$i = 0;

/**
 * First server
 */
$i++;
/* Authentication type */
$cfg['Servers'][$i]['auth_type'] = 'cookie';
/* Server parameters */
$cfg['Servers'][$i]['host'] = 'localhost';
$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false;

/**
 * phpMyAdmin configuration storage settings.
 */

/* User used to manipulate with storage */
// $cfg['Servers'][$i]['controlhost'] = '';
// $cfg['Servers'][$i]['controlport'] = '';
// $cfg['Servers'][$i]['controluser'] = 'pma';
// $cfg['Servers'][$i]['controlpass'] = 'pmapass';

/* Storage database and tables */
// $cfg['Servers'][$i]['pmadb'] = 'phpmyadmin';
// $cfg['Servers'][$i]['bookmarktable'] = 'pma__bookmark';
// $cfg['Servers'][$i]['relation'] = 'pma__relation';
// $cfg['Servers'][$i]['table_info'] = 'pma__table_info';
// $cfg['Servers'][$i]['table_coords'] = 'pma__table_coords';
// $cfg['Servers'][$i]['pdf_pages'] = 'pma__pdf_pages';
// $cfg['Servers'][$i]['column_info'] = 'pma__column_info';
// $cfg['Servers'][$i]['history'] = 'pma__history';
// $cfg['Servers'][$i]['table_uiprefs'] = 'pma__table_uiprefs';
// $cfg['Servers'][$i]['tracking'] = 'pma__tracking';
// $cfg['Servers'][$i]['userconfig'] = 'pma__userconfig';
// $cfg['Servers'][$i]['recent'] = 'pma__recent';
// $cfg['Servers'][$i]['favorite'] = 'pma__favorite';
// $cfg['Servers'][$i]['users'] = 'pma__users';
// $cfg['Servers'][$i]['usergroups'] = 'pma__usergroups';
// $cfg['Servers'][$i]['navigationhiding'] = 'pma__navigationhiding';
// $cfg['Servers'][$i]['savedsearches'] = 'pma__savedsearches';
// $cfg['Servers'][$i]['central_columns'] = 'pma__central_columns';
// $cfg['Servers'][$i]['designer_settings'] = 'pma__designer_settings';
// $cfg['Servers'][$i]['export_templates'] = 'pma__export_templates';

$cfg['TempDir'] = '/var/www/html/phpmyadmin/tmp';

/**
 * End of servers configuration
 */

/**
 * Directories for saving/loading files from server
 */
$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';

/**
 * Whether to display icons or text or both icons and text in table row
 * action segment. Value can be either of 'icons', 'text' or 'both'.
 * default = 'both'
 */
//$cfg['RowActionType'] = 'icons';

```

7. Faites également défiler vers le bas et ajoutez cette ligne. dans le code ci-dessus et sauvegarder le fichier

**$cfg['TempDir'] = '/var/www/html/phpmyadmin/tmp';**

8. Modifier les autorisations de fichier :

Accès donné à l'utilisateur Apache (qui est www-data) pour lire les fichiers :

```ps
sudo chown -R www-data:www-data /var/www/html/phpmyadmin
```

9. Créer un fichier de configuration Apache

```ps
sudo nano /etc/apache2/conf-available/phpmyadmin.conf
```

10. Copiez-collez les lignes suivantes :

```ps
Alias /phpmyadmin /var/www/html/phpmyadmin

<Directory /var/www/html/phpmyadmin/>
   AddDefaultCharset UTF-8
   <IfModule mod_authz_core.c>
          <RequireAny>
      Require all granted
     </RequireAny>
   </IfModule>
</Directory>

<Directory /var/www/html/phpmyadmin/setup/>
   <IfModule mod_authz_core.c>
     <RequireAny>
       Require all granted
     </RequireAny>
   </IfModule>
</Directory>
```

11. Activer la nouvelle configuration :

```ps
sudo a2enconf phpmyadmin.conf
```

12. Redémarrez le serveur Web Apache

Pour que les modifications s'appliquent correctement, redémarrez le serveur Web Apache.
```ps
sudo systemctl restart apache2
```

13.  Accéder à l'interface Web

Entrez l'adresse IP du serveur ou le nom de domaine ainsi que /phpmyadminle dossier dans l'URL du navigateur pour accéder à cette plate-forme de gestion de base de données Web.

Par exemple:

`https://server-ipaddress/phpmyadmin`

ou

`http://your-domain.com/phpmyadmin`

Vous devriez voir la page de connexion de phpmyadmin

## Désactiver phpMyAdmin sans désinstaller

Si vous souhaitez simplement désactiver l'accès à phpMyadmin, vous pouvez simplement désactiver phpMyAdmin sans le désinstaller.
```ps
sudo a2disconf phpmyadmin
sudo systemctl reload apache2
```

Pour réactiver phpMyAdmin, exécutez :
```ps
sudo a2enconf phpmyadmin
sudo systemctl reload apache2
```

## Déinstaller PhpMyAdmin

1. Supprimer le fichier phpmyadmin.conf PhpMyAdmin

```ps
sudo rm /etc/apache2/conf-available/phpmyadmin.conf
```

2. Supprimer le dossier phpmyadmin

```ps
sudo rm -rf /var/www/html/phpmyadmin
```

3. Redémarrez le serveur Web Apache

Pour que les modifications s'appliquent correctement, redémarrez le serveur Web Apache.
```ps
sudo systemctl restart apache2
```

4. Mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
```





# Script bash pour installer phpMyAdmin sur un serveur distant (Non tester)

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