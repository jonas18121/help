# Voir la liste des versions de PHP disponibles sur votre serveur

Pour voir la liste des versions de PHP disponibles sur votre serveur, vous pouvez utiliser la commande `update-alternatives` avec l'option `--list` pour afficher les alternatives installées pour PHP. 

Voici la commande :

```ps
update-alternatives --list php
```

Cette commande affichera une liste des versions de PHP installées sur votre système, avec leurs chemins respectifs. 

Vous verrez quelque chose comme ceci :
```ps
/path/to/php7.1
/path/to/php7.4
```

Cela vous indique les chemins vers les exécutables PHP pour chaque version installée.

Notez que la disponibilité de cette commande dépend de la distribution Linux que vous utilisez. 

Sur certaines distributions, vous devrez peut-être utiliser des commandes spécifiques pour obtenir la liste des versions de PHP installées, 

telles que `phpenmod -l` ou `php-fpm -v.` 

Assurez-vous de consulter la documentation appropriée pour votre distribution si la commande `update-alternatives` ne fonctionne pas.