
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

### Générer un tableau associatif en twig

Ce code Twig semble être utilisé pour générer un tableau de lignes de facturation (facture d'achat) à partir d'un ensemble de lignes de commande (orderLines) et pour calculer des totaux par taux de TVA (taxe sur la valeur ajoutée). Voici une explication étape par étape du code :


```twig
{% set tvaRates = {} %}
{% for orderLine in order.orderLines %}

    {% set sellingPrice = orderLine.price %}
    {% set sellingPriceWithTva = orderLine.priceWithTva %}

    {# Array for tva rates  #}
    {% set key = 'tva_' ~ orderLine.tva %}
    {% if key in tvaRates|keys %}
        {% set tvaRates = tvaRates|merge({(key): tvaRates[key]|merge([orderLine])}) %}
    {% else %}
        {% set tvaRates = tvaRates|merge({(key): [orderLine]}) %}
    {% endif %}

    <tr class="item">
        <td>{{ orderLine.productName }}</td>
        <td>{{ orderLine.quantity }}</td>
        {% if modeVatCurrent != modeVatFranchise %}
            <td class="number">{{ sellingPrice|round(2) }}</td>
        {% endif %}
        <td class="number">{{ sellingPriceWithTva|round(2) }}</td>
        <td class="number">{{ orderLine.total|round(2) }}</td>
    </tr>
{% endfor %}
```
1. **{% set tvaRates = {} %}** : Cela initialise une variable tvaRates comme un tableau associatif vide qui sera utilisé pour stocker les totaux par taux de TVA.
2. on boucle sur `order.orderLines`
3. **{% set key = 'tva_' ~ orderLine.tva %}** : Cela crée une clé key en concaténant la chaîne `'tva_'` avec la valeur du taux de TVA de la ligne de commande 
4. **{% if key in tvaRates|keys %}** : Cette condition vérifie si la clé `key` existe déjà dans le tableau tvaRates. Si la clé existe, cela signifie qu'il y a déjà une ligne avec le même taux de TVA dans le tableau.
5. **tvaRates|merge({(key): tvaRates[key]|merge([orderLine])})**:  la ligne de commande actuelle (orderLine) est fusionnée avec les lignes existantes qui ont le même taux de TVA. Cela permet d'ajouter la ligne de commande au total existant pour ce taux de TVA.
6. Si la clé n'existe pas dans le tableau tvaRates, cela signifie que c'est la première fois que ce taux de TVA est rencontré. 
7. **{% set tvaRates = tvaRates|merge({(key): [orderLine]}) %}** Dans ce cas, une nouvelle entrée est créée dans le tableau tvaRates avec la clé key et la valeur est un tableau contenant uniquement la ligne de commande actuelle. Cela initialise le total pour ce taux de TVA.

```twig
{# Manage for each tva rate #}
{% set totalAllTVA = {} %}
{% for key, orderLines in tvaRates %}

    {% set parts = key|split("_") %}
    {% set tvaRate = parts[1] %} 

    {% set tvaLinePrice = 0.0 %}
    {% for orderLine in orderLines %}
        {% if tvaRate == orderLine.tva %}
            {% set productTvaRate = orderLine.tva %}
            {% set sellingPrice = orderLine.price %}
            {% set sellingPriceWithTva = orderLine.priceWithTva %}
            {% set tvaAmount = sellingPriceWithTva - sellingPrice %}
            {% set tvaTotalLine = sellingPriceWithTva * orderLine.quantity %}

            {# Calculate tva line price #}
            {% if 0.0 == orderLine.tva %}
                {% set tvaLinePrice = 0.0 %}
            {% else %}
                {% if tvaRate == orderLine.tva %}
                    {% set tvaLinePrice = tvaLinePrice + (tvaTotalLine - (sellingPrice * orderLine.quantity)) %}
                {% endif %}
            {% endif %}

            {# Create array for totalAllTVA #}
            {% set key = 'tva_' ~ orderLine.tva %}
            {% set totalAllTVA = totalAllTVA|merge({(key): tvaLinePrice }) %}

            {# Calculate total HT for each orderLine #}
            {% set totalHT = totalHT + (sellingPrice * orderLine.quantity) %}
        {% endif %}
    {% endfor %}
{% endfor %}
```

1. **{% set totalAllTVA = {} %}** : Cela initialise une variable totalAllTVA comme un tableau associatif vide. Cette variable sera utilisée pour stocker les montants totaux pour chaque taux de TVA.
2. **{% for key, orderLines in tvaRates %}** : Cela commence une boucle for qui itère à travers chaque élément du tableau tvaRates. key est la clé du taux de TVA (par exemple, "tva_20"), et orderLines est un tableau contenant les lignes de commande associées à ce taux de TVA.

3. `{% set parts = key|split("_") %}` : Cela divise la clé key en deux parties en utilisant "_" comme délimiteur. La deuxième partie est extraite en tant que tvaRate, qui contient la valeur du taux de TVA (par exemple, "20").

4. **{% set tvaLinePrice = 0.0 %}** : Cela initialise une variable tvaLinePrice à zéro pour stocker le montant total de TVA pour ce taux de TVA.

5. Ensuite, il y a une boucle for imbriquée qui itère à travers les orderLines associées à ce taux de TVA.

6. **{% if tvaRate == orderLine.tva %}** : Cette condition vérifie si le taux de TVA de la ligne de commande actuelle (orderLine.tva) correspond au taux de TVA en cours de traitement (tvaRate).

7. Dans la section suivante, différentes opérations sont effectuées pour calculer les montants liés à la TVA :

- Les variables productTvaRate, sellingPrice, sellingPriceWithTva, tvaAmount, et tvaTotalLine sont calculées en fonction des données de la ligne de commande actuelle.
- Le montant total de TVA pour la ligne de commande actuelle (tvaLinePrice) est calculé en fonction du taux de TVA et des prix de vente.
- Un tableau totalAllTVA est mis à jour avec la clé correspondante au taux de TVA en cours de traitement et le montant total de TVA calculé.

8. {% set totalHT = totalHT + (sellingPrice * orderLine.quantity) %} : Le montant total hors taxe (totalHT) est également calculé pour chaque ligne de commande et mis à jour au fur et à mesure.

9. La boucle for externe continue de traiter les différentes clés de taux de TVA dans tvaRates.