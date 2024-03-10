# Faire une pagination personatiser avec KNP Paginator

- [KNP Paginator](https://github.com/KnpLabs/KnpPaginatorBundle)

### 1) Dans knp_paginator.yaml

Une fois que la paganation est implémenter dans le projet, on peut personnalisé le CSS en modiant le template.

le template utiliser de base est `@KnpPaginator/Pagination/sliding.html.twig` que l'on retrouve dans le repertoire vendor
- `vendor/knp-paginator-bundle/templates/Paginationsliding.html.twig`

Il y a aussi d'autres templates que le peut utiliser

Il suffit de remplacer `@KnpPaginator/Pagination/sliding.html.twig` par le template personnaliser

ex:

Avant
```yaml
template:
        pagination: '@KnpPaginator/Pagination/sliding.html.twig'
```

Après
```yaml
template:
        pagination: 'components/_pagination.html.twig'
```

```yaml
# config/packages/knp_paginator.yaml 

knp_paginator:
    page_range: 5                       # number of links shown in the pagination menu (e.g: you have 10 pages, a page_range of 3, on the 5th page you'll see links to page 4, 5, 6)
    default_options:
        page_name: page                 # page query parameter name
        sort_field_name: sort           # sort field query parameter name
        sort_direction_name: direction  # sort direction query parameter name
        distinct: true                  # ensure distinct results, useful when ORM queries are using GROUP BY statements
        filter_field_name: filterField  # filter field query parameter name
        filter_value_name: filterValue  # filter value query parameter name
    template:
        pagination: '@KnpPaginator/Pagination/sliding.html.twig'     # sliding pagination controls template
        sortable: '@KnpPaginator/Pagination/sortable_link.html.twig' # sort link template
        filtration: '@KnpPaginator/Pagination/filtration.html.twig'  # filters template
```


### 2) Dans le composant Twig components/_pagination.html.twig

Ex:

On crée un composant nommé `src/templates/components/_pagination.html.twig`

On copier le contenu de `vendor/knp-paginator-bundle/templates/Paginationsliding.html.twig`

Pour le coller dans `src/templates/components/_pagination.html.twig`

On modifie la structure si on veut, puis on lui donne un CSS

```twig
{# default Sliding pagination control implementation #}
{% if pageCount > 1 %}
    <div class="pagination">
        {% if first is defined and current != first %}
            <span class="first">
                <a href="{{ path(route, query|merge({(pageParameterName): first})) }}">&lt;&lt;</a>
            </span>
        {% endif %}

        {% if previous is defined %}
            <span class="previous">
                <a rel="prev" href="{{ path(route, query|merge({(pageParameterName): previous})) }}">&lt;</a>
            </span>
        {% endif %}

        {% for page in pagesInRange %}
            {% if page != current %}
                <span class="page">
                    <a href="{{ path(route, query|merge({(pageParameterName): page})) }}">{{ page }}</a>
                </span>
            {% else %}
                <span class="current">{{ page }}</span>
            {% endif %}
        {% endfor %}

        {% if next is defined %}
            <span class="next">
                <a rel="next" href="{{ path(route, query|merge({(pageParameterName): next})) }}">&gt;</a>
            </span>
        {% endif %}

        {% if last is defined and current != last %}
            <span class="last">
                <a href="{{ path(route, query|merge({(pageParameterName): last})) }}">&gt;&gt;</a>
            </span>
        {% endif %}
    </div>
{% endif %}
```

### 3) CSS

Puis on fait le CSS.

On peut aussi modifier le CSS sans remplacer `@KnpPaginator/Pagination/sliding.html.twig`

Ex :

```css
.navigation {
    margin: 0 0 3vw;
}

.navigation .pagination .first,
.navigation .pagination .previous,
.navigation .pagination .next,
.navigation .pagination .last,
.navigation .pagination .current, 
.navigation .pagination .page
{
    border: 2px solid #aaa;
    padding: 0.5vw 1vw;
    margin: 0.2vw;
}
```