# git switch VS git checkout

`git switch et git checkout` sont deux commandes dans Git utilisées pour changer de branche, mais elles ont des différences en termes de fonctionnalité et de convivialité. Voici une comparaison détaillée de ce que chaque commande fait :

### git checkout

1. **Changer de branche :** `git checkout <branch-name>` permet de basculer d'une branche à une autre.

2. **Créer une nouvelle branche et y basculer :** `git checkout -b <new-branch>` permet de créer une nouvelle branche et de basculer directement dessus.

3. **Restaurer des fichiers :** `git checkout <commit> -- <file>` permet de restaurer des fichiers à un état spécifique d'un commit.

4. **Basculer vers un commit spécifique :** `git checkout <commit>` permet de se déplacer vers un commit spécifique, plaçant le dépôt dans un état de détachement de HEAD (detached HEAD state).


### git switch

1. **Changer de branche :** `git switch <branch-name>` permet de basculer d'une branche à une autre, similaire à `git checkout`.

2. **Créer une nouvelle branche et y basculer :** `git switch -c <new-branch>` permet de créer une nouvelle branche et de basculer directement dessus, équivalent à `git checkout -b <new-branch>`.

3. **Limiter les opérations :** `git switch` est principalement conçu pour changer de branche, et ne permet pas de restaurer des fichiers ou de basculer vers un commit spécifique. Cela réduit les risques d'erreurs involontaires liées à des opérations multiples.

## Comparaison

1. **Simplicité et Sécurité** : `git switch` est plus simple et plus sécurisé pour les utilisateurs qui souhaitent uniquement changer de branche, sans les risques associés aux fonctionnalités multiples de `git checkout`.

2. **Compatibilité :** `git checkout` reste disponible et est plus polyvalent car il peut gérer plus de cas d'utilisation (restauration de fichiers, déplacement vers des commits spécifiques).

3. **Adoption :** `git switch` a été introduit dans les versions récentes de Git pour encourager une utilisation plus intuitive et moins sujette aux erreurs pour la gestion des branches.