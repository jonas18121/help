
### Afficher en colonne plusieurs checkbox d'adresses qui proviennent d'un FormType en utilisant EntityType

#### Façon 1

Dans le Twig
 - Utilisation de la balise `<div class="form-check row">`
```twig
{% set formHtml %}
    {{ form_start(form, {action:path('application_order')}) }}
        <div class="">
            <div class="">
                {% for address in form.addresses %}
                    <div class="form-check row">
                        <div class="row">
                            <div class="col-md-1">
                            {{ form_widget(address) }}
                            </div>

                            <div class="col-md-10">
                            {{ form_label(address) }}
                            </div>
                        </div>
                    </div>
                {% endfor %}
                <div class="form-error" id="addresses-error">
                    {{ form_errors(form.addresses) }}
                </div>
            </div>
        </div>
    {{ form_end(form) }}
{% endset %}

{{  formHtml|replace({'[br]' : '<br>'})|raw }}
```

Dans le FormType
```php
/** @var User */
$user = $options['user'];
$builder
    ->add('addresses', EntityType::class, [
        'required' => true,
        'label' => 'Choississez votre adresse de livraison',
        'class' => Address::class,
        'choices' => $user->getAddresses(),
        'multiple' => false,
        'expanded' => true,
        'constraints' => [
            new NotBlank([
                'message' => 'Veuillez choisir une adresse',
            ]),
        ],
    ]);
```

Dans l'entité Address 
```php
class Address
{
    # .....code

    public function __toString()
    {
        return $this->getAddressLine1() . (null !== $this->getAddressLine2() ? ' ' . $this->getAddressLine2() : null)
        . (null !== $this->getAddressLine3() ? ' ' . $this->getAddressLine3() : null) . '[br]' . $this->getZipcode() . ' ' . $this->getCity() . ' - ' . $this->getCountry();
    }

    # .....code
}
```

#### Façon 2 qui est mieux

Dans le twig
- On utilise `address.vars.label`
```twig
{{ form_start(form, {action:path('application_my_account_orders_index')}) }}
    <div class="">
        <div class="">
            {% for address in form.addresses %}
                <div class="form-check row">
                    <div class="row">
                        <div class="col-md-1">
                            {{ form_widget(address) }}
                        </div>
                        <div class="col-md-10">
                            {{ address.vars.label|raw }}
                        </div>
                    </div>
                </div>
            {% endfor %}
            <div class="form-error" id="addresses-error">
                {{ form_errors(form.addresses) }}
            </div>
            <a href="{{ path('application_my_account_address_add') }}">Ajouter une adresse</a> 
        </div>
    </div>
    <div class="col-md-12">
        <div class="form-group d-flex justify-content-center">
            <input 
                type="submit" 
                value="Valider ma commande" 
                class="btn btn-secondary btn-md inline-block mb-3"
            >
        </div>
    </div>
{{ form_end(form) }}
```

Dans le FormType
- On utilise `choice_label`
```php
/** @var User */
$user = $options['user'];
$builder
    ->add('addresses', EntityType::class, [
        'required' => true,
        'label' => 'Choississez votre adresse de livraison',
        'class' => Address::class,
        'choices' => $user->getAddresses(),
        'multiple' => false,
        'expanded' => true,
        'choice_label' => function ($address) {
            return $address->getAddressLine1() . (null !== $address->getAddressLine2() ? ' ' . $address->getAddressLine2() : null)
            . (null !== $address->getAddressLine3() ? ' ' . $address->getAddressLine3() : null) . '<br />' . $address->getZipcode() . ' ' . $address->getCity() . ' - ' . $address->getCountry();
        },
        'constraints' => [
            new NotBlank([
                'message' => 'Veuillez choisir une adresse',
            ]),
        ],
    ]);
```

Dans l'entité Address 

- On supprime __toString() car on en n'a plus besoin
```php
class Address
{
    # .....code

    # .....code
}
```

### Compter le nombre d'inscrit dans une session

```Twig
{% for session in sessions %}
        {% set count_registration_paid = 0 %} // Création de la variable

        {% for registration in session.registrations %}
            {% if registration.paymentStatus == 'payé' %}
                {% set count_registration_paid = count_registration_paid + 1 %} // On fait + 1 a chaque fois qu'il y a une inscription payé
            {% endif %}
        {% endfor %}
        
        {{ count_registration_paid }} // On affiche le nombre d'inscrit
{% endfor %}
```

### Implémenter des metadata dans des pages dynamique dans twig 

#### Page Layout de base

On met le block metaData qui recevra les métadonnés des diférentes pages dynamique

Dans `app/templates/Frontend/Layout/base.html.twig`

```Twig
{% if app.environment == 'prod' %}
{% endif %}

<meta charset="UTF-8">

{% block metaData %}{% endblock %}

<title>{% block title %}{{ project_name }}{% endblock %} - {{ project_name }}</title>

<link rel="icon" type="image/x-icon" href="/assets/shared/images/favicon.ico"/>
```

#### Pages dynamique

Dans le fichier qui permettre d'avoir les différentes pages, on met le bloc metaData avec les balises meta qu'on veut

Dans `app/templates/Frontend/Pages/Exam/exam-details.html.twig`

```Twig
{% block stylesheets %}
    ...
{% endblock %}

{% block metaData %}
    <meta property="title" content=" {{ exam.page.seoTitle }}" />
    <meta property="description" content="{{ exam.page.seoDescription }}" />
{% endblock %}

{% block content %}
    ...
{% endblock %}
```

### Enlevé les espaces au début + '&nbsp ;' dans une variable qui contient des balises html

```Twig
{% if project.recommendation %}
    {% set recommendation = project.recommendation|striptags|replace({'&nbsp;' : null})|trim() %}
    {% if recommendation is not null and recommendation is not empty %}

        <div class="card-description">
            <p>{{ recommendation }}</p>
        </div>
    {% endif %}
{% endif %}
```

### Afficher une date au format et avec les mots en français 

1. Intaller `twig/intl-extra` dans Symfony

    > composer require twig/intl-extra

2. Utiliser le filtre `|format_datetime` dans Twig

```Twig

{% for product in products %}
    <div>
        <span class="author">{{ product.name }}</span> 
        <span class="time">{{ product.createdAt|format_datetime(locale='fr',pattern="EEEE dd MMMM YYYY") }}</span>
    </div>
{% endfor %}

```

3. Rendu

name_product lundi 09 mai 2022

### Gérer la timezone de DateTime

Le filtre "Date" de Twig accepte un second paramètre : "timezone".

Ainsi, vous pouvez facilement afficher tous les fuseaux horaires que vous souhaitez. Par example:

```twig
{{ "now"|date("m/d/Y H:i", "Europe/Paris") }}
{{ "now"|date("m/d/Y H:i", "Asia/Calcutta") }}
{{ "now"|date("m/d/Y H:i", "Europe/Berlin") }}
```

OU

Dans la version actuelle, il a été pris en charge dans le fichier de configuration de l'application symfony :

Voir la [doc](https://symfony.com/blog/new-in-symfony-2-7-default-date-and-number-format-configuration)
```yaml
twig:
    date:
        timezone: Asia/Tokyo
```

OU

Par défaut, Twig utilisera le fuseau horaire par défaut défini dans le fichier php ini ou dans l'application globalement, ou déclaré dans twig.

si vous transmettez un objet datetime au filtre de date avec timezone , vous pouvez alors transmettre false comme deuxième argument dans le filtre de date.

```twig
{{ "now"|date('m/d/Y H:i', false) }}
```