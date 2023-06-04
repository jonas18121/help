# Switcher entre deux versions de PHP installées

Pour switcher entre deux versions de PHP installées sur votre système, vous pouvez utiliser le module Apache `mod_php` et les commandes `a2enmod` et `a2dismod` pour activer et désactiver les versions respectives de PHP.

Voici les étapes pour switcher entre PHP 7.1 et PHP 7.4 sur Apache :

1. Assurez-vous que les deux versions de PHP sont installées sur votre système selon les instructions précédentes.

2. Désactivez le module PHP actuellement utilisé par Apache. 

Si PHP 7.1 est actuellement utilisé, exécutez la commande suivante :
```ps
sudo a2dismod php7.1
```

3. Activez le module PHP correspondant à la version souhaitée. 

Par exemple, pour activer PHP 7.4, exécutez la commande suivante :
```ps
sudo a2enmod php7.4
```

4. Redémarrez Apache pour appliquer les modifications :
```ps
sudo systemctl restart apache2
```

Après avoir redémarré Apache, il utilisera la nouvelle version de PHP spécifiée.

Veuillez noter que cette méthode s'applique spécifiquement à Apache avec le module mod_php. 

Si vous utilisez une autre configuration, telle que PHP-FPM ou Nginx, les étapes peuvent être différentes. 

Assurez-vous de consulter la documentation spécifique à votre serveur web pour configurer correctement la version de PHP souhaitée.