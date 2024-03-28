# Optimiser la performance des volumes

## L'option delegated

Dans un fichier `docker-compose.yml`, l'option `delegated` est utilisée pour améliorer les performances de montage de volumes dans les conteneurs Docker.

Lorsque vous montez un volume depuis l'hôte vers un conteneur Docker, cela permet au conteneur d'accéder aux fichiers de l'hôte en temps réel. Cependant, cela peut parfois entraîner une dégradation des performances, en particulier pour les applications exigeantes en termes d'E/S (Entrées/Sorties) de fichiers.

L'option `delegated` permet de remédier à ce problème en améliorant les performances de montage de volumes. En spécifiant `delegated` pour un volume monté, Docker utilise des mécanismes de synchronisation plus efficaces entre l'hôte et le conteneur, ce qui peut améliorer les performances, en particulier pour les opérations d'écriture.

Par exemple, dans un fichier `docker-compose.yml`, vous pouvez avoir quelque chose comme ceci :

```yaml
# docker-compose.yml

version: '3'

services:
  myservice:
    image: myimage
    volumes:
      - ./local_folder:/container_folder:delegated
```

Dans cet exemple, `./local_folder` est un répertoire sur l'hôte, et `/container_folder` est un répertoire dans le conteneur Docker. L'option `delegated` est utilisée pour améliorer les performances du montage de ce volume.

Il est important de noter que l'effet exact de l'option `delegated` peut varier en fonction du système de fichiers hôte (par exemple, ext4, XFS, etc.) et du système d'exploitation sous-jacent. Il est recommandé de tester différentes configurations pour déterminer celle qui convient le mieux à votre cas d'utilisation spécifique.

## L'option cached

Dans Docker Compose, l'option `cached` est utilisée pour optimiser les performances de montage de volumes en utilisant une stratégie de cache. Cela peut être utile pour améliorer les performances des applications qui effectuent fréquemment des opérations d'E/S (Entrées/Sorties) sur les fichiers.

Lorsque vous montez un volume depuis l'hôte vers un conteneur Docker, les fichiers sur l'hôte doivent être synchronisés avec les fichiers dans le conteneur. Cependant, cette synchronisation peut parfois entraîner des performances dégradées, en particulier pour les applications qui effectuent de nombreuses opérations d'écriture.

L'option `cached` permet d'améliorer ces performances en utilisant une stratégie de cache. Lorsque vous utilisez `cached`, Docker utilise un mécanisme de mise en cache pour synchroniser les fichiers entre l'hôte et le conteneur, ce qui peut réduire le temps nécessaire pour effectuer ces opérations de synchronisation.

Par exemple, dans un fichier `docker-compose.yml`, vous pouvez utiliser l'option cached comme ceci :

```yaml
# docker-compose.yml

version: '3'

services:
  myservice:
    image: myimage
    volumes:
      - ./local_folder:/container_folder:cached
```

Dans cet exemple, `./local_folder` est un répertoire sur l'hôte, et `/container_folder` est un répertoire dans le conteneur Docker. L'option `cached` est utilisée pour améliorer les performances du montage de ce volume en utilisant une stratégie de mise en cache.

Il est important de noter que l'effet exact de l'option `cached` peut varier en fonction du système de fichiers hôte (par exemple, ext4, XFS, etc.) et du système d'exploitation sous-jacent. Il est recommandé de tester différentes configurations pour déterminer celle qui convient le mieux à votre cas d'utilisation spécifique.

## L'option default


Dans Docker Compose, l'option `default` pour les volumes est utilisée pour spécifier le mode de montage par défaut d'un volume. Elle est utilisée pour déterminer le comportement du volume lorsqu'aucun mode de montage spécifique n'est précisé pour ce volume.

Lorsque vous montez un volume depuis l'hôte vers un conteneur Docker, vous pouvez spécifier différents modes de montage pour ce volume, tels que `cached`, `delegated`, `ro` (lecture seule), `rw` (lecture/écriture), etc.

L'option `default` vous permet de spécifier le mode de montage par défaut pour tous les volumes de votre service dans le fichier `docker-compose.yml`. Si vous ne spécifiez pas de mode de montage pour un volume particulier, Docker Compose utilisera alors le mode de montage par défaut que vous avez défini avec l'option `default`.

Voici comment vous pouvez spécifier l'option default dans votre fichier `docker-compose.yml` :

```yaml
# docker-compose.yml

version: '3'

services:
  myservice:
    image: myimage
    volumes:
      - ./local_folder:/container_folder
    volumes_default: &volumes_default
      default: cached
```

Dans cet exemple, `volumes_default` est utilisé pour spécifier le mode de montage par défaut pour tous les volumes de ce service. Ici, le mode de montage par défaut est défini sur `cached`. Cela signifie que si aucun mode de montage n'est spécifié pour un volume particulier (./local_folder:/container_folder dans cet exemple), Docker Compose utilisera cached comme mode de montage par défaut.

Il est à noter que `volumes_default` est un alias YAML utilisé pour éviter la duplication de code. Vous pouvez le réutiliser pour tous les services qui partagent les mêmes paramètres de volumes par défaut.

## Exemple de reutilisation de volumes_default

Voici un exemple de réutilisation de `volumes_default` dans un fichier `docker-compose.yml` :

```yaml
# docker-compose.yml

version: '3'

services:
  service1:
    image: image1
    volumes:
      - ./data:/app/data
    volumes_default: &volumes_default
      default: cached

  service2:
    image: image2
    volumes:
      - ./config:/app/config
    volumes_default: *volumes_default

  service3:
    image: image3
    volumes:
      - ./logs:/app/logs
    volumes_default: *volumes_default
```

Dans cet exemple :

- `service1`, `service2` et `service3` sont trois services différents définis dans le fichier `docker-compose.yml`.
- Chaque service utilise un volume monté avec `volumes`, qui pointe vers un répertoire spécifique sur l'hôte.
- L'option `volumes_default` est utilisée pour définir le mode de montage par défaut (`cached` dans cet exemple).
- `volumes_default: &volumes_default` crée un alias nommé `volumes_default`.
- Dans `service2` et `service3`, `volumes_default: *volumes_default` est utilisé pour réutiliser l'option `volumes_default` définie précédemment, ce qui signifie que le mode de montage par défaut pour les volumes de ces services sera `cached`.

Cela permet de réduire la duplication de code dans votre fichier `docker-compose.yml` lorsque vous avez plusieurs services nécessitant les mêmes options de montage par défaut.