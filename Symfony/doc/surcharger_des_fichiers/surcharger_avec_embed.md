# Surcharger des block twig avec embed

- [embed](https://twig.symfony.com/doc/3.x/tags/embed.html)
- [include](https://twig.symfony.com/doc/3.x/tags/include.html)

La balise `{% include %}` en Twig se contente d’insérer le contenu d’un autre template sans permettre de redéfinir ses blocs internes. <br> 
Pour pouvoir à la fois inclure un fragment et surcharger un de ses blocs, il faut utiliser la balise `{% embed %}`, 
qui combine le comportement de **include** et d’**extends** et offre ainsi la possibilité d’override de blocs définis dans le template « **embeddé** »

## 1. Pourquoi {% include %} ne suffit pas

- `{% include '.../_form.html.twig' %}` insère le template, mais tout bloc défini à l’intérieur de `_form.html.twig` ne pourra pas être redéfini depuis le template parent 
- Les blocs sont pris en compte que lorsque la hiérarchie de templates utilise `{% extends %}` (héritage) ou `{% embed %}` (inclusion + héritage de sous-squelettes).

## 2. Utiliser {% embed %} pour surcharger un bloc

La balise `{% embed %}` permet d’inclure un template « micro-squelette » et d’y redéfinir tout bloc qu’il contient.

```twig
{% embed 'backend/pages/product/components/_form.html.twig' with { formProduct: formProduct } %}
    {# On surcharge ici le block formButton défini dans _form.html.twig #}
    {% block formButton %}
        <button type="submit" class="btn btn-primary">Enregistrer le produit</button>
    {% endblock %}
{% endembed %}
```

- `embed` injecte le template `_form.html.twig`

- `with { ... }` passe la variable `formProduct`

- `{% block formButton %}` redéfinit le block au sein de l’embed

## 3. Exemple concret dans votre fichier parent

#### Dans create.html.twig

- Fichier Twig qui utilise `embed` pour surcharger

- Le mot-clé `only` (optionnel) garantit que seul `formProduct` est disponible dans l’embed.

- Tout autre bloc défini dans `_form.html.twig` peut également être redéfini de la même manière.

```twig
{% extends "general/base.html.twig" %}

{% block title %}Créer un produit{% endblock %}

{% block stylesheets %}{% endblock %}

{% block body %}
    <div class="container">
        <h1>Créer un produit</h1>

        <div class="container_form">
            {# On remplace include par embed pour pouvoir surcharger formButton #}
            {% embed 'backend/pages/product/components/_form.html.twig'
                     with { formProduct: formProduct } only %}
                
                {# Surcharge du bouton de soumission #}
                {% block formButton %}
                    <button type="submit" class="btn btn-success">
                        Créer un produit
                    </button>
                {% endblock %}
                
            {% endembed %}
        </div>
    </div>
{% endblock %}
```

#### Dans backend/pages/product/components/_form.html.twig 

- Fichier qui inclus le formulaire de base `_base_form_product_body.html.twig`

- On peut rajouter des champs supplémentaire dans ce fichier, exemple des champs facultatives

- On utilise le bloc `{% block formButton %}` avec une bouton par défaut et qui peut être surcharger

```twig
{{ form_start(formProduct, { 'attr' : { 'class' : 'form backend product_backend' }} ) }}
    <div class="container_form">
        {% include 'components/_base_form_product_body.html.twig' with {'formProduct': formProduct } %}

        {# 
            Nous pouvons rajouter des champs ici, ci besoin 
            à partir de la balise div.container_form_element
            comme l'exemple ci-dessous.
            On remplace new_props par le nom de la nouvelle propriété

            <div class="container_form_element">
                <div>
                    <label for="product_new_props" class="form_label">new_props</label>
                    {{ form_widget(formProduct.new_props, {attr : {class : 'form_input' }} ) }}
                </div>
                <small class="error_input_small">{{ form_errors(formProduct.new_props) }}</small>
            </div>
        #}

        {# Exemple : #}
        <div class="container_form_element">
            <div>
                <label for="product_new_props" class="form_label">Test: minimum 1 caractère</label>
                {# {{ form_widget(formProduct.new_props, {attr : {class : 'form_input' }} ) }} #}
                <input
                    type="text"
                    id="new_props"
                    name="new_props"
                    required
                    minlength="1"
                    maxlength="8"
                    size="10" 
                />
            </div>
            <small class="error_input_small"></small>
        </div>

        {# Bouton par défaut qui peut être surcharger #}
        {% block formButton %}
            <button type="submit" class="btn">Valider</button>
        {% endblock formButton %}
    </div>
{{ form_end(formProduct) }}
```

#### Dans components/_base_form_product_body.html.twig

- Représente la base du formulaire de produits

- Il contient les champs obligatoire

```twig
{# Représente la base du formulaire de produits #}
{# Les champs obligatoire #}

<div class="container_form_element">
    <div>
        <label for="product_title" class="form_label">Titre</label>
        {{ form_widget(formProduct.title, {attr : {class : 'form_input' }} ) }}
    </div>
    <small class="error_input_small">{{ form_errors(formProduct.title) }}</small>
</div>

<div class="container_form_element">
    <div>
        <label for="product_description" class="form_label">Description</label>
        {{ form_widget(formProduct.description, {attr : {class : 'form_input' }} ) }}
    </div>
    <small class="error_input_small">{{ form_errors(formProduct.description) }}</small>
</div>

<div class="container_form_element">
    <div>
        <label for="product_price" class="form_label">Prix</label>
        {{ form_widget(formProduct.price, {attr : {class : 'form_input' }} ) }}
    </div>
    <small class="error_input_small">{{ form_errors(formProduct.price) }}</small>
</div>

<div class="container_form_element">
    <div>
        <label for="product_category" class="form_label">Catégorie</label>
        {{ form_widget(formProduct.category, {attr : {class : 'form_input' }} ) }}
    </div>
    <small class="error_input_small">{{ form_errors(formProduct.category) }}</small>
</div>
```

## 4. Alternatives

- **Macros** : transformer votre formulaire en macro Twig, puis appeler la macro depuis le parent et passer le label du bouton en argument.

- **use** : importer les blocs d’un template, mais n’autorise pas de passer dynamiquement le chemin du template ni de variables de contexte : https://stackoverflow.com/questions/47960681/twig-include-block-of-another-template/47962414?


## En résumé

pour surcharger un bloc d’un template inclus, préférez `{% embed %}` plutôt que `{% include %}`; 
cela vous permet d’inclure le formulaire tout en redéfinissant proprement le block `formButton`.