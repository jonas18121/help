# Afficher des messages addFalsh dans les twig

## Afficher tout type de message flash (success, warning, notice, danger)
```twig
{% for type, messages in app.session.flashbag.all() %}
    <div class="bm-messages">
        {% for message in messages %}
            <div class="bm-messages-{{ type }}" style="padding: 10px;text-align: center;">
                <p class="bm-message bm-{{ type }}" style="margin: 0px">{{ message|raw }}</p>
            </div>
        {% endfor %}
    </div>
{% endfor %}
```

ou le code ci-dessous, ideal si on utilise `form_themes: ['bootstrap_5_layout.html.twig'] ` dans le fichier `config/packages/twig.yaml`

```twig
{% for type, messages in app.flashes %}
    <div class="alert alert-{{ type }}">
        {{ messages|join('. ') }}
    </div>
{% endfor %}
```