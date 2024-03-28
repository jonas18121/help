

## Utiliser un theme de formulaire bootstrap

Dans `app/config/packages/twig.yaml` ajoutez : `form_themes: ['bootstrap_5_layout.html.twig'] `

```yaml
twig:
    file_name_pattern: '*.twig'
    form_themes: ['bootstrap_5_layout.html.twig'] # Themes pour formater des formulaires, si on ne fait pas de themes personaliser
```