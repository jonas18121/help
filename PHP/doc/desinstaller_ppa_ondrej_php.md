# Désinstaller ppa:ondrej/php

Pour désinstaller le dépôt PPA d'Ondřej Surý, procédez comme suit :

1. Ouvrez un terminal.

2. Listez les paquets installés à partir du PPA :

Vous pouvez vérifier les paquets installés à partir du PPA en utilisant la commande suivante :

```bash
dpkg -l | grep ondrej
```

3. Supprimez les paquets installés à partir du PPA :
Utilisez la commande apt-get purge pour supprimer les paquets installés à partir du PPA. Remplacez <paquet> par le nom réel du paquet que vous souhaitez supprimer.

```bash
sudo apt-get purge <paquet>
```


4. Exécutez la commande suivante pour supprimer le dépôt PPA :

```bash
sudo add-apt-repository --remove ppa:ondrej/php
```

4. Mettez à jour la liste des paquets :

```bash
sudo apt-get update
```

5. Nettoyez le système :

```bash
sudo apt-get autoremove
sudo apt-get clean
```