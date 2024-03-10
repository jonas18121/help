# NVM (utilisation linux et windows)

## Installer une version plus récente de Node.js sur Debian 10


Pour installer une version plus récente de Node.js sur Debian 10, vous pouvez utiliser NodeSource pour obtenir une version plus récente. Voici les étapes à suivre :

1. Ajoutez le référentiel Node.js en exécutant les commandes suivantes dans votre terminal :

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```

2. Une fois que le référentiel est ajouté, vous pouvez installer Node.js en exécutant :

```bash
sudo apt-get install -y nodejs
```

Cela installera la version LTS (Long Term Support) de Node.js, qui devrait être plus récente que la version que vous avez actuellement.

3. Vous pouvez également installer le paquet `npm` si ce n'est pas déjà fait :

```bash
sudo apt-get install -y npm
```

4. Pour vérifier que Node.js et npm ont été installés avec succès, vous pouvez exécuter les commandes suivantes :

```bash
node -v
npm -v
```

Cela devrait afficher les versions installées de Node.js et npm respectivement.

## Installer une version spécifique de Node.js sur Debian 10

Exemple la version 16.0.0

Pour installer spécifiquement la version 16.0.0 de Node.js sur Debian 10, vous pouvez utiliser NVM (Node Version Manager). Voici les étapes à suivre :

1. Tout d'abord, assurez-vous que vous disposez des outils nécessaires pour compiler les programmes sur votre système. Vous pouvez les installer en exécutant :

```bash
sudo apt-get update
sudo apt-get install build-essential checkinstall
```

2. Ensuite, vous devez installer NVM en utilisant curl. Exécutez la commande suivante dans votre terminal :

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

3. Fermez et réouvrez votre terminal pour que les modifications apportées à votre profil prennent effet.

4. Une fois NVM installé, vous pouvez vérifier la liste des versions disponibles de Node.js en exécutant :

```bash
nvm ls-remote
```

5. Ensuite, vous pouvez installer la version 16.0.0 de Node.js en utilisant la commande suivante :

```bash
nvm install 16.0.0
```

6. Une fois l'installation terminée, vous pouvez vérifier que la version 16.0.0 est correctement installée en exécutant :

```bash
node -v
```

Cela devrait afficher `v16.0.0`.

7. Vous pouvez également définir la version que vous venez d'installer comme la version par défaut en exécutant :

```bash
nvm alias default 16.0.0
```

## Revenir à une version précédente de Node.js après avoir installé une version spécifique avec NVM

Si vous avez besoin de revenir à une version précédente de Node.js après avoir installé une version spécifique avec NVM, vous pouvez le faire en sélectionnant simplement la version précédente que vous souhaitez utiliser. 
Voici comment vous pouvez revenir à une version précédente :

1. Tout d'abord, assurez-vous de connaître la version précédente que vous souhaitez utiliser. 
Vous pouvez lister toutes les versions de Node.js installées sur votre système avec la commande suivante :

```bash
nvm ls
```

2. Ensuite, sélectionnez la version précédente que vous souhaitez utiliser en exécutant :

```bash
nvm use <version>
```

Remplacez <version> par le numéro de version de Node.js que vous souhaitez utiliser.

3. Une fois que vous avez sélectionné la version précédente, vous pouvez vérifier qu'elle est correctement utilisée en exécutant :

```bash
node -v
```
Cela devrait afficher la version de Node.js que vous avez sélectionnée.

4. Si vous souhaitez définir cette version précédente comme la version par défaut à utiliser, vous pouvez également exécuter :

```bash
nvm alias default <version>
```

Cela configurera la version précédente comme la version par défaut à utiliser lorsque vous ouvrez un nouveau terminal.