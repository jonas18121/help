# Supprimer unbuntu qui est installer en dual boot depuis windows

Pour supprimer Ubuntu qui est installé en dual boot avec Windows, vous pouvez suivre ces étapes générales. 

Veuillez noter que ces instructions peuvent varier légèrement en fonction de la configuration spécifique de votre système.

Remarque importante : Avant de procéder, assurez-vous d'avoir sauvegardé toutes vos données importantes.

1. Démarrer depuis Windows : Assurez-vous que vous démarrez votre ordinateur sous Windows.

2. Ouvrir le Gestionnaire de disques : Cliquez avec le bouton droit sur l'icône "Ce PC" sur votre bureau ou dans le menu Démarrer, puis sélectionnez "Gérer". Dans la fenêtre Gestion de l'ordinateur, choisissez "Gestion des disques" dans le volet de gauche.

3. Supprimer la partition Linux : Identifiez la partition Linux dans la liste des partitions. Elle peut être marquée comme "Non allouée" ou avoir un format de fichier tel que "Ext4". Cliquez avec le bouton droit sur la partition Linux et sélectionnez "Supprimer le volume". Cela va libérer de l'espace non alloué.

4. Étendre la partition Windows (facultatif) : Si vous souhaitez étendre la partition Windows pour utiliser l'espace libéré, cliquez avec le bouton droit sur la partition Windows, puis sélectionnez "Étendre le volume". Suivez les instructions à l'écran pour terminer le processus.

5. Mettre à jour le chargeur d'amorçage : La suppression de la partition Linux peut laisser le chargeur d'amorçage GRUB intact. Pour réparer le chargeur d'amorçage Windows, vous pouvez utiliser l'outil de réparation de démarrage. Pour ce faire, démarrez votre ordinateur à partir du support d'installation de Windows, sélectionnez "Réparer l'ordinateur" > "Dépannage" > "Invite de commandes", puis utilisez les commandes suivantes :

```bash
bootrec /fixmbr
bootrec /fixboot
```

6. Redimensionner la partition Windows (facultatif) : Si vous avez étendu la partition Windows, vous pouvez utiliser un logiciel tiers tel que EaseUS Partition Master ou GParted pour redimensionner la partition Windows et utiliser tout l'espace disponible.

7. Redémarrer : Redémarrez votre ordinateur pour appliquer les modifications.

Après avoir suivi ces étapes, Ubuntu devrait être complètement supprimé de votre système, et votre ordinateur devrait démarrer directement sous Windows sans utiliser le chargeur d'amorçage GRUB.