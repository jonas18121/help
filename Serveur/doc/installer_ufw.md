# Installer/Désinstaller ufw

UFW - Pare-feu simple

## Installer ufw
**NB - après avoir activé ufw, assurez-vous que ssh est activé pour vous permettre d'accéder à votre serveur via ssh.**

1. Veuillez noter que ce tutoriel est utilisé pour configurer l'ufw pour un serveur ubuntu 18.04

Vérifiez si ufw est installé ou activé en tapant la commande suivante :
```ps
sudo ufw enable
```

2. Si l'erreur persiste, installez ufw en tapant :
```ps
sudo apt-get install ufw
```

3. Vérifiez l'état de ufw en tapant :
```ps
sudo ufw status
```

4. Si l'état indique le type inactif :sudo ufw enable

NB - après avoir activé ufw, assurez-vous que ssh est activé pour vous permettre d'accéder à votre serveur via ssh.

## Désinstaller ufw

- [Puis-je désinstaller complètement UFW ?](https://askubuntu.com/questions/275998/can-i-uninstall-ufw-completely)

1. Pour désactiver UFW, vous pouvez taper ce qui suit :
```ps
sudo ufw disable
```

2. Pour le supprimer, vous pouvez taper ce qui suit :
```ps
sudo apt-get remove ufw
```

3. Pour le purger (dans les cas où vous détestez vraiment ufw ou gaspillez de l'espace), vous pouvez taper ce qui suit :
```ps
sudo apt-get purge ufw
```

4. Localiser les endroit ou sont placer les différents fichiers de ufw
```ps
whereis ufw
```
```ps
# Retourne
ufw: /etc/ufw
```

5. Supprimer le ou les dossiers/fichiers
```ps
sudo rm -rf  /etc/ufw
```

6. Vous pouvez effectuer les 3 tests suivants pour confirmer qu'ufw a été supprimé :

```ps
Devrait renvoyer ufw:
whereis ufw

# Devrait renvoyer une ligne vide
which ufw

# Vérifiez si ufw est installé ou activé Devrait renvoyer comand not found
sudo ufw enable
```

7. Mettre à jour le cache du gestionnaire de packages :
```ps
sudo apt update
```