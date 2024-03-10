# Erreur no merge sur derveur distant à cause de commit non fini (non résolu)

Si vous ne voulez pas avoir cette erreur à chaque fois que vous effectuez un git pull, cela signifie probablement qu'une fusion précédente n'a pas été correctement conclue sur le serveur distant. Pour éviter cette situation, vous pouvez essayer les étapes suivantes :

1. Assurez-vous que votre copie de travail est propre :
Assurez-vous d'avoir confirmé ou annulé toute fusion locale en cours dans votre copie de travail avant de tirer (git pull). Utilisez git status pour vérifier si votre copie de travail est propre.

2. Finalisez ou annulez la fusion en cours sur le serveur distant :
Si une fusion a été initiée sur le serveur distant mais n'a pas été correctement conclue, vous pouvez vous connecter au serveur distant et finaliser la fusion en cours ou l'annuler.

```bash
# Pour finaliser la fusion en cours sur le serveur distant
git merge --continue

# OU pour annuler la fusion en cours sur le serveur distant
git merge --abort
```

Si vous n'avez pas les droits nécessaires pour effectuer ces opérations sur le serveur distant, contactez l'administrateur du serveur.

3. Effectuez un pull après avoir confirmé ou annulé la fusion sur le serveur distant :
Une fois que vous avez assuré que la fusion a été correctement conclue ou annulée sur le serveur distant, essayez d'effectuer à nouveau un git pull depuis votre copie de travail locale.

Si le problème persiste, il peut être utile de demander de l'aide à l'administrateur du serveur distant pour résoudre la situation. Il se peut qu'il y ait un problème plus complexe sur le serveur qui nécessite une intervention manuelle.