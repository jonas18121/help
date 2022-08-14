# Gitignore ne fait pas sont taff

Si les fichiers/dossiers sont déjà enregistré dans le repositorie de Gitlab/Github et qu'on les ajoute dans le `.gitignore`.
Lorsqu'on va pushé, ils seront encore présent dans le repositorie de Gitlab/Github.

Exemple : mon projet est déjà enregistré dans le repositorie de Gitlab/Github avec le fichier `foo.yml` et le dossier `foo`.
Je voudrais les ignoré pour le prochain push. Je les est ajouté dans `.gitignore` (`/foo.yml`, `/foo`).
Lorsque j'ai pushé, ils sont encore présent dans le repositorie de mon projet sur Gitlab/Github.

### Pour que le repositorie de mon projet sur Gitlab/Github fasse les modifications, il faut vider le cache de `git`

```git
git rm -rf --cached .
```

Puis on pourra continer les autres commande `git` pour pushé

```git
git add .

git commit -m "blabla"

git push origin <branche>
```

`/foo.yml` et `/foo` ne seront plus présent dans le repositorie de Gitlab/Github.