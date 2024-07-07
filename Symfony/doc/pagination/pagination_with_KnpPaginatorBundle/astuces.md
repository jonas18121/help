# Astuces

- [Creating custom subscriber](https://github.com/KnpLabs/KnpPaginatorBundle/blob/master/docs/custom_pagination_subscribers.md)
- [Manual counting / Comptage manuel](https://github.com/KnpLabs/KnpPaginatorBundle/blob/master/docs/manual_counting.md)
- [Configuring paginator](https://github.com/KnpLabs/KnpPaginatorBundle/blob/master/docs/paginator_configuration.md)
- [Templates](https://github.com/KnpLabs/KnpPaginatorBundle/blob/master/docs/templates.md)
- [Filtrez votre requête](https://github.com/KnpLabs/KnpPaginatorBundle/blob/master/docs/templates.md#filter-your-query)
- [Personnaliser le rendu](https://github.com/KnpLabs/KnpPaginatorBundle/blob/master/docs/templates.md#customize-rendering)

## Filtrez votre requête

Incluez uniquement ces lignes et profitez de la pagination :

```twig
{{ knp_pagination_filter(pagination, {
        'entity.name': 'Name',
    }) 
}}
```

## Personnaliser le rendu

Vous pouvez configurer la position, la taille et rendre les boutons arrondis ou non :

- `align`: `left`, `center`, ou `right`. Par défaut, `align` n'est pas modifié
- `size` : `small`, `'medium`, ou `large`. Par défaut, la taille n'est pas modifiée
- `rounded`: `true` ou `false`. Par défaut, c'est `false`

Dans votre contrôleur :

```php
$pagination->setCustomParameters([
    'align' => 'center',
    'size' => 'large',
    'rounded' => true,
]);
```

ou dans la vue : 

```twig
{{ knp_pagination_render(pagination, null, {}, {
   'align': 'center',
   'size': 'large',
   'rounded': true,
}) }}
```