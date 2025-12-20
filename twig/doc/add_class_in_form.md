# Différentes façon d'ajouter des classes CSS dans un formulaire Twig

En Twig (Symfony Forms), il existe **plusieurs manières d’ajouter des classes CSS**, selon **le niveau** (formulaire, champ, label, widget, row) et **le moment** (dans le template ou dans le FormType).

## 1. Ajouter une classe au formulaire entier

- Ajoute la classe sur la balise `<form>`.

```twig
{{ form_start(form, {
    attr: { class: 'my-class' }
}) }}
```

## 2. Ajouter une classe à un champ (widget/input)

- Écrase les classes existantes si le champ en a déjà.

```twig
{{ form_widget(form.email, {
    attr: { class: 'my-class' }
}) }}
```

HTML généré :

```html
<input class="my-class" ...>
```

- Pour conserver les classes existantes :

```twig
{{ form_widget(form.email, {
    attr: { class: (form.email.vars.attr.class|default('')) ~ ' my-class' }
}) }}
```

## 3. Ajouter une classe au label

```twig
{{ form_label(form.email, null, {
    label_attr: { class: 'my-class' }
}) }}
```

HTML généré :

```html
<label class="my-class">Email</label>
```

## 4. Ajouter une classe aux erreurs

```twig
{{ form_errors(form.email, {
    attr: { class: 'my-class' }
}) }}
```

## 5. Ajouter une classe à la row complète (form_row)

```twig
{{ form_row(form.email, {
    row_attr: { class: 'my-class' }
}) }}
```

HTML généré :

```html
<div class="my-class">
    <label>...</label>
    <input ...>
    <ul class="errors">...</ul>
</div>
```

On peut utiliser `form_row` pour ajouter une classe CSS sur le `champ/input/widget` comme ci-dessous

```twig
{{ form_row(form.email, {
    attr: { class: 'my-class' }
}) }}
```

HTML généré :

```html
<div>
    <label>...</label>
    <input class="your-class" ...>
    <ul class="errors">...</ul>
</div>
```

### Bonnes pratiques

- Mise en page / grid / marges → row_attr

- Style du champ (input, select…) → attr

- Labels → label_attr

### Exemple complet

```twig
{{ form_row(form.email, {
    row_attr: { class: 'mb-3' },
    attr: { class: 'form-control' },
    label_attr: { class: 'form-label' }
}) }}
```

## 6. Ajouter des classes dans le FormType (PHP) ✅ meilleure pratique

- Centralisé
- Réutilisable
- Plus propre que le Twig

```php
$builder->add('email', EmailType::class, [
    'attr' => ['class' => 'input-class'],
    'row_attr' => ['class' => 'row-class'],
    'label_attr' => ['class' => 'label-class'],
]);
```

## 7. Via un form theme (avancé / global)

```twig
{% form_theme form 'bootstrap_5_layout.html.twig' %}
```

```twig
{% block form_row %}
    <div class="custom-row">
        {{ parent() }}
    </div>
{% endblock %}
```