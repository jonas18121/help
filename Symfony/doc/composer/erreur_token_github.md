# Erreur de token GitHub 

## L'erreur

Si on fait composer install ou n'importe quel commande avec composer et qu'on a ce genre d'erreur 

```bash
Your github oauth token for github.com contains invalid characters: "## Faire tourner notre applica  
  tion avec la commande symfony en arrière plan" 
```

voir les étapes ci-dessous

## Dans un conteneur Docker

Le fichier auth.json a reçu un mauvais token

1. chercher ou se trouve le fichier auth.json 

```bash
sudo find / -name auth.json

# Exemple de retour
/var/www/.config/composer/auth.json
find: '/proc/1/task/1/fdinfo': Permission denied
find: '/proc/1/map_files': Permission denied
find: '/proc/1/fdinfo': Permission denied
find: '/proc/17/task/17/fdinfo': Permission deni
```

2. On là trouver, maintenant voir ce qu'il contient

```bash
cat /var/www/.config/composer/auth.json

# Exemple de retour
{
    "bitbucket-oauth": {},
    "github-oauth": {
        "github.com": "## Faire tourner notre application avec la commande symfony en arrière plan"},
    "gitlab-oauth": {},
    "gitlab-token": {},
    "http-basic": {},
    "bearer": {}
}
```

github-oauth > github.com à un mauvais token

3. Le supprimer

```bash
rm /var/www/.config/composer/auth.json 
```

4. Regénérer un token

pour savoir comment générer un token github voir la documentation `Github/doc.md`

```bash
composer config --global github-oauth.github.com your_token_github
```

félicitation , il n'y a plus d'erreur