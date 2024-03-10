# Comment vérifier l’espace disque sous Linux ?

- [Comment vérifier l’espace disque sous Linux ?](https://www.it-connect.fr/comment-verifier-lespace-disque-sous-linux/)

## L'espace disque sous Linux avec df

1. Commencez par vous connecter sur votre machine et exécutez la commande df, sans option. D'ailleurs, "df" signifie "disk free", ce qui s'annonce plutôt de bien par rapport à ce que l'on cherche à faire !

Vous allez obtenir une sortie similaire à celle ci-dessous. Pour chaque volume, nous avons plusieurs informations au sujet de l'espace de stockage : la taille totale, l'espace utilisé, l'espace disponible et le pourcentage d'utilisation du disque. Néanmoins, ce n'est pas très facile à lire.

```bash
df
```

2. Reprenons la commande précédente et ajoutons simplement le paramètre "-h" : il va permettre d'avoir la sortie au format "human readable", c'est-à-dire plus facilement à lire pour les humains. Les valeurs seront alors indiquées en Gigaoctets ou Megaoctets, ce qui sera plus agréable.

```bash
df -h
```

Intéressons-nous un instant aux différentes colonnes :

- Sys. de fichiers : le nom du système de fichiers, c'est-à-dire les différents disques physiques, volumes logiques, etc.
- Taille : la taille totale du système de fichiers
- Utilisé : l'espace disque consommé
- Dispo : l'espace disponible
- Uti% : le pourcentage d'espace disque utilisé
- Monté sur : point de montage correspondant à ce système de fichiers

3. Pour obtenir l'état d'un volume spécifique, on précise son nom ou alors "/" pour afficher les informations sur le disque primaire.

```bash
df -h /
```

4. Enfin, sachez que l'on peut obtenir le type de système de fichiers utilisés pour chaque volume. Il suffit d'ajouter l'option "T".

```bash
df -hT

# Ou

df -h -T
```