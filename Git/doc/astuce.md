

### Problème fusion develop local et distant

Lorsque vous faites `git pull origin develop`, Git fusionne les modifications de la branche `develop` du dépôt distant dans votre branche locale. Les modifications de l'autre personne sont incluses dans cette fusion.

Lorsque vous créez une demande de fusion vers la branche `develop`, Git compare votre branche locale à la branche `develop` du dépôt distant. Comme les modifications de l'autre personne ont été fusionnées dans votre branche locale, Git les considère comme étant vos modifications.

Il y a deux façons de résoudre ce problème.

1. La première consiste à utiliser la commande `git rebase origin develop` au lieu de `git pull origin develop`. La commande `git rebase` replace votre branche locale sur top de la branche develop du dépôt distant, en appliquant les modifications de l'autre personne dans votre branche locale. Cela signifie que les modifications de l'autre personne seront affichées dans votre historique de commit, mais elles ne seront pas attribuées à vous.

2. La deuxième consiste à utiliser la commande `git cherry-pick` pour appliquer les modifications spécifiques de l'autre personne à votre branche locale. La commande `git cherry-pick` vous permet de sélectionner des commits spécifiques à appliquer à votre branche locale, sans fusionner l'intégralité de la branche develop.

Dans votre exemple, si vous utilisez la commande `git rebase origin develop`, Gitlab affichera que vous avez fait 10 modifications, car seules vos modifications seront incluses dans l'historique de commit. Si vous utilisez la commande `git cherry-pick`, Gitlab affichera que vous avez fait 20 modifications, car les modifications de l'autre personne seront également incluses dans l'historique de commit.

Je vous recommande d'utiliser la commande `git rebase`. Cela vous permettra de garder un historique de commit clair et concis.

### Enlever le rebasage automatique par git pull

Pour enlever le rebasage automatique par `git pull` vous devez supprimer la ligne rebase = true de votre configuration Git. Vous pouvez le faire en exécutant la commande suivante :

```ps
git config --global --unset pull.rebase
```

Cela permettra à `git pull` de fusionner les modifications de la branche distante dans votre branche locale, sans les réécrire.

Remarquez que cette modification ne s'appliquera qu'à votre configuration globale. Si vous souhaitez enlever le rebasage automatique pour une branche spécifique, vous pouvez utiliser la commande `git config branch.<nom_branche>.rebase false`. Par exemple, pour enlever le rebasage automatique pour la branche develop, vous pouvez exécuter la commande suivante :

```ps
git config branch.develop.rebase false
```

### Remettre le rebasage après avoir exécuté la commande git config --global --unset pull.rebase

Pour remettre le rebasage après avoir exécuté la commande git config --global --unset pull.rebase, vous pouvez exécuter la commande suivante :

```ps
git config --global pull.rebase true
```

Cela permettra à `git pull` de rebaser automatiquement les modifications de la branche distante dans votre branche locale.

Remarquez que cette modification ne s'appliquera qu'à votre configuration globale. Si vous souhaitez remettre le rebasage automatique pour une branche spécifique, vous pouvez utiliser la commande `git config branch.<nom_branche>.rebase true`. Par exemple, pour remettre le rebasage automatique pour la branche develop, vous pouvez exécuter la commande suivante :

```ps
git config branch.develop.rebase true
```

Si vous avez déjà effectué des modifications sur votre branche locale depuis que vous avez exécuté la commande git config --global --unset pull.rebase, vous devrez peut-être rebaser votre branche manuellement. Pour ce faire, vous pouvez utiliser la commande git rebase origin develop.