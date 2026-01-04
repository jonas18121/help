# Publication sur Packagist

## Packagist

Packagist ([packagist.org](https://packagist.org/)) est le registre central pour tous les packages PHP installables via Composer.

**[packagist.org](https://packagist.org/) = npm pour PHP**

```txt
GitHub (code source)
   ↓
Packagist (indexation)
   ↓
composer require (installation depuis GitHub)
```

**Packagist ne stocke PAS le code !** Il indexe seulement :

- Le nom du package
- Les versions disponibles (tags Git)
- Le lien vers GitHub/GitLab
- Les métadonnées (description, auteur, etc.)

### Processus de publication :

- On soumet l'URL GitHub sur Packagist
- Packagist scanne le `composer.json`
- Packagist **indexe** les tags comme versions
- Les développeurs peuvent maintenant faire `composer require`

### Mises à jour automatiques avec GitHub Hook :

Par défaut, Packagist vérifie votre repo GitHub **une fois par jour**. C'est lent !

Heureusement, **si on se connecte à Packagist via GitHub**, Packagist configure automatiquement un **GitHub Hook** pour synchroniser instantanément vos mises à jour.

### Configuration automatique (RECOMMANDÉ) :

1. Aller sur [packagist.org](https://packagist.org/)
2. Se connecter via GitHub (si ce n'est pas déjà fait)
    - Si vous avez déjà un compte non connecté à GitHub, connectez-le dans votre profil
    - Si vous êtes déjà connecté, déconnectez-vous puis reconnectez-vous via GitHub pour accorder les permissions nécessaires
3. Assurez-vous que l'application Packagist a accès à toutes vos organisations GitHub
4. Cliquer Submit
5. Entrer l'URL : https://github.com/vendorcustom/recherche-entreprises-bundle
6. Valider

#### Packagist configure automatiquement le hook sur votre repository GitHub !

#### Vérification :

Après soumission, consultez votre liste de packages sur Packagist :

- Si un avertissement indique que la synchronisation automatique n'est pas configurée, essayez de déclencher une synchronisation manuelle de votre compte
- Note : Les repositories archivés ne peuvent pas être configurés (lecture seule dans l'API GitHub)

#### Astuce : Vous pouvez vérifier que le hook est bien configuré en allant dans les Settings de votre repository GitHub → Webhooks. Vous devriez voir un webhook Packagist.

### C'est Publié !

Maintenant, n'importe qui peut installer votre bundle :

```bash
composer require vendorcustom/recherche-entreprises-bundle
```