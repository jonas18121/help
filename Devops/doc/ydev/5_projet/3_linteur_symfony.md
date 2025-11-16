# Linteurs "Symfony"

## Linteurs qui sont déjà intégré dans Symnfony

### Vérifier s'il n'y a pas d'erreur dans les fichiers Twig
```ps
./bin/console lint:twig templates --env=prod
```

### Vérifier s'il n'y a pas d'erreur dans les fichiers de configuration Yaml
```ps
./bin/console lint:yaml config --parse-tags
```

### Vérifier s'il n'y a pas d'erreur pour les Parametres et les Services
```ps
./bin/console lint:container --no-debug
```

### Vérifier s'il n'y a pas d'erreur et que les schema dans doctrine sont correctent
```ps
./bin/console doctrine:schema:validate --skip-sync -vvv --no-interaction
```