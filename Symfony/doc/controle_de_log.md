Se connecter sur le serveur

Allez dans le dossier `production > projet.fr > var > logs > website (production/projet.fr/var/logs/website)`

Lancer la commande :

```ps
find -newermt "62 day ago" -ls | grep critical
```

Cette commande permet de lister tous les fichiers d'erreurs CRITIQUE qui ont 62 jours ou moins d'ancienneté. 

Vu que l'on fait des MCO tous les 2 mois, on ignore les autres fichiers.

Pour chaque fichier, faire :

```ps
cat nom_fichier | grep CRITICAL
```