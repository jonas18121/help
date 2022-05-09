

### Compter le nombre d'inscrit dans une session


    {% for session in sessions %}
            {% set count_registration_paid = 0 %} // Création de la variable

            {% for registration in session.registrations %}
                {% if registration.paymentStatus == 'payé' %}
                    {% set count_registration_paid = count_registration_paid + 1 %} // On fait + 1 a chaque fois qu'il y a une inscription payé
                {% endif %}
            {% endfor %}
            
            {{ count_registration_paid }} // On affiche le nombre d'inscrit
    {% endfor %}

### Implémenter des metadata dans des pages dynamique dans twig 

#### Page Layout de base

On met le block metaData qui recevra les métadonnés des diférentes pages dynamique

Dans `app/templates/Frontend/Layout/base.html.twig`

    {% if app.environment == 'prod' %}
    {% endif %}

    <meta charset="UTF-8">

    {% block metaData %}{% endblock %}

    <title>{% block title %}{{ project_name }}{% endblock %} - {{ project_name }}</title>

    <link rel="icon" type="image/x-icon" href="/assets/shared/images/favicon.ico"/>


#### Pages dynamique

Dans le fichier qui permettre d'avoir les différentes pages, on met le bloc metaData avec les balises meta qu'on veut

Dans `app/templates/Frontend/Pages/Exam/exam-details.html.twig`

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

### Enlevé les espaces au début + '&nbsp ;' dans une variable qui contient des balises html

    {% if project.recommendation %}
        {% set recommendation = project.recommendation|striptags|replace({'&nbsp;' : null})|trim() %}
        {% if recommendation is not null and recommendation is not empty %}

            <div class="card-description">
                <p>{{ recommendation }}</p>
            </div>
        {% endif %}
    {% endif %}

### afficher une date au format et avec les mots en français 

1. Intaller `twig/intl-extra` dans Symfony

    > composer require twig/intl-extra

2. Utiliser le filtre `|format_datetime` dans Twig

```Twig

{% for child in products %}
    <div>
        <span class="author">{{ child.name }}</span> 
        <span class="time">{{ child.createdAt|format_datetime(locale='fr',pattern="EEEE dd MMMM YYYY") }}</span>
    </div>
{% endfor %}

```

#### Rendu

The_Author lundi 09 mai 2022