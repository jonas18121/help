# Git, Releases GitHub et Versioning Sémantique

## Les Tags Git

Définition
Un tag = **marqueur permanent** sur un commit spécifique

Pourquoi ?

1. **Traçabilité** : Retrouver le code d'une version

2. **Releases** : Versions téléchargeables

3. **Composer** : Installer une version spécifique

### Versioning Sémantique

**Format : MAJOR.MINOR.PATCH**

```txt
v1.2.3
│ │ │
│ │ └─ PATCH : Correctifs (rétrocompatible)
│ └─── MINOR : Nouvelles fonctionnalités (rétrocompatible)
└───── MAJOR : Breaking changes
```

Exemple :

- **v1.0.0** => Première version stable

- **v1.0.1** => Correction d'un bug

- **v1.1.0** => Ajout méthode searchByDepartement()

- **v2.0.0** => Changement de namespace (breaking)

### Workflow moderne : Release GitHub

Au lieu de créer les tags via Git...

On utilise l'interface GitHub pour créer une Release qui créera automatiquement le tag !

Avantages
- ✅ Interface visuelle intuitive
- ✅ Notes de release en Markdown
- ✅ Fichiers attachables (assets)
- ✅ Archives automatiques (.zip, .tar.gz)
- ✅ Tag + Release + Documentation en un seul endroit

### Pousser le code sur GitHub

Nous allons :

1. Créer le repository sur GitHub

2. Ajouter le remote

3. Pousser le code (main)

```bash
cd recherche-entreprises-bundle

# Premier commit
git add .
git commit -m "Initial commit: Bundle Recherche Entreprises"

# Créer le repo sur GitHub (via interface web)
# Puis :
git remote add origin https://github.com/...
git branch -M main
git push -u origin main
```

Puis sur GitHub , on va dans l'onglet **settings** partie **Features**, on décoche **Wikis** et **Poject** comme on n'a pas besoin.

### Ensuite, sur GitHub :

1. Aller sur votre repository
2. Cliquer sur **"Releases"** (dans la colonne de droite)
3. Cliquer sur **"Create a new release"**
4. Dans **"Choose a tag/Select a tag"** : Taper `v1.0.0` (le tag sera créé automatiquement)
5. Remplir :
    - **Release title** : `Version 1.0.0 - Initial Release`
    - **Description** : Notes de version en Markdown 

```txt
## 🎉 Première version

### ✨ Fonctionnalités
- Client pour l'API Recherche d'entreprises
- Recherche par nom, SIREN, code postal
- Commande console
- Configuration du timeout

### 📦 Installation
    ```bash
    composer require vendorcustom/recherche-entreprises-bundle
    ```
```

6. Cocher **"Set as the latest release"**
7. Cliquer sur **"Publish release"**

✅ C'est fait ! GitHub a automatiquement :

- Créé le tag v1.0.0
- Généré les archives (.zip, .tar.gz)
- Publié la release
- Notifié Packagist (si webhook configuré)

