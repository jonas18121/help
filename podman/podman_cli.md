# Podman CLI

### Supprimer les conteneurs inutilisés :

```bash
podman container prune

# L'option --dry-run pour simuler l'exécution de la commande sans réellement supprimer quoi que ce soit
podman container prune --dry-run
```


### Supprimer les images inutilisées :

```bash
podman image prune -a
```

### Nettoyer les volumes inutilisés :

```bash
podman volume prune
```

### Supprimer les réseaux inutilisés :

```bash
podman network prune
```

### Pour une suppression complète du cache, vous pouvez utiliser la commande :

```bash
podman system prune --all --volumes
```