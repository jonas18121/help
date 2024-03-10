# VIM et VI

Ces éditeurs sont très courants dans les systèmes Unix et sont souvent inclus dans les images Docker de base.

## Editer des fichiers 

Voici comment vous pouvez utiliser vi pour éditer des fichiers : 

1) Pour ouvrir un fichier avec vi, utilisez la commande suivante :
```ps
vi nom_du_fichier

# Par exemple, pour ouvrir le fichier config.txt, vous pouvez exécuter :

vi config.txt
```

2) Une fois que le fichier est ouvert dans `vi`, vous pouvez naviguer avec les touches fléchées et éditer le fichier. Pour commencer à éditer, appuyez sur la touche `i` pour passer en mode édition.

3) Lorsque vous avez terminé d'apporter des modifications, appuyez sur la touche `Esc` (qui correspond à `Echap`) pour quitter le mode édition, puis tapez `:wq` et appuyez sur `Entrée` pour enregistrer les modifications et quitter `vi`.

## Quitter un fichier dans vi

Pour quitter un fichier dans vi, vous devez suivre ces étapes :

1) Assurez-vous d'être en mode normal en appuyant sur la touche `Esc`. Si vous êtes dans un autre mode (comme le mode édition), appuyez sur `Esc` jusqu'à ce que vous reveniez en mode normal.

2) Tapez `:` (deux-points). Vous verrez un curseur apparaître en bas de l'écran, prêt à recevoir une commande.

3) Tapez `q` pour quitter.

Si vous avez apporté des modifications au fichier, vous devrez peut-être ajouter un `!` après `q` pour forcer la sortie sans enregistrer les modifications. Dans ce cas, tapez `:q!` suivi de `Entrée`.

Si vous souhaitez enregistrer les modifications avant de quitter, vous pouvez utiliser la commande `:w` pour enregistrer, suivie de `:q` pour quitter. Ou bien, vous pouvez combiner les deux en tapant `:wq` suivi de `Entrée`.

Si vous avez accidentellement démarré `vi` sans l'intention de modifier quoi que ce soit, vous pouvez simplement taper `:q!` pour quitter sans enregistrer les modifications (si vous avez effectué des modifications) ou `q` pour quitter s'il n'y a pas eu de modifications.