

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