# Conteneur de modal avec CSS, Javascript et twig dans symfony

**Général**

```js
// public/asset/modal/container-modal.js

export class ContainerModal {

    /**
     * Close popup if we click or touch on document
     * 
     * @returns {void}
     */
    closePopupOnDocument() {
        $(document).on('click touch', function(event) {
            let popup = $('#container-modal');
            let openPopupButton = $('.open-popup');
            if (popup.is(':visible')) {
                if (!popup.is(event.target) && popup.has(event.target).length === 0 
                && !openPopupButton.is(event.target) && openPopupButton.has(event.target).length === 0) {
                    popup.hide();
                    $('body').removeClass('no-scroll');
                    $('.container-modal-back').hide();
                    console.log($('#container-modal').is(':visible'));
                }
            }
        });
    }

    /**
     * Close popup on click
     * 
     * @returns {void}
     */
    closePopupOnClick() {
        $('.close-popup').click(function() {
            $('body').removeClass('no-scroll');
            $('#container-modal').hide();
            $('.container-modal-back').hide();
            console.log($('.popin').is(':visible'));
        });
    }
    /**
     * Open popup on click
     * 
     * @returns {void}
     */
    openPopupOnClick() {
        $('.open-popup').click(function() {
            $('body').addClass('no-scroll');
            $('#container-modal').show();
            $('.container-modal-back').show();
            console.log($('.popin').is(':visible'));
        });
    }
}
```
**Général**
```js
// public/asset/modal/index.js

import { ContainerModal } from './container-modal';

// Container modal default
$(function() {
    const containerModal = new ContainerModal();
    containerModal.openPopupOnClick();
    containerModal.closePopupOnClick();
    containerModal.closePopupOnDocument();
});
```

**Spécifique**
```js
// backend/js/Pages/page-product/product.js

// JS spécifique
```

**Général**
```js
// webpack.config.js

  // spécifique
  .addEntry('backend/product', [
    './public/assets/backend/js/Pages/page-product/product.js',
    './public/assets/backend/sass/Pages/page-product/product.scss'
  ])
  
  // général
  .addEntry('backend/modal', [
    './public/assets/backend/js/tools/modal/index.js',
    './public/assets/backend/sass/tools/modal/index.scss'
  ])
```

**Général**

Le conteneur de modal
```twig
{# template/Modal/container-modal.html.twig #}

<div class="container-modal" id="container-modal" role="dialog">
  <div class="container-modal-dialog" role="document">
    <div class="container-modal-content">        
        {% block contentModalHeader %}{% endblock %}
        {% if block('contentModalHeader') is defined and block('contentModalHeader')|trim != ''
            and block('contentModalBody') is defined and block('contentModalBody')|trim != '' 
        %}
            <hr>
        {% endif %}

        {% block contentModalBody %}{% endblock %}

        {% if block('contentModalFooter') is defined and block('contentModalFooter')|trim != ''
            and block('contentModalBody') is defined and block('contentModalBody')|trim != ''
            or block('contentModalHeader') is defined and block('contentModalHeader')|trim != ''
            and block('contentModalFooter') is defined and block('contentModalFooter')|trim != '' 
        %}
            <hr>
        {% endif %}
        {% block contentModalFooter %}{% endblock %}
    </div>
  </div>
</div>
<div class="container-modal-back"></div>
```

**Spécifique**

Représente une modale spécifique qui va utiliser container-modal.html.twig
```twig
{# templates/Backend/Pages/product/Blocs/modal-date.html.twig #}

{% extends "../../../Modal/modal.html.twig" %}

{% block contentModalHeader %}
    <h2>Modifier la date de début et la durée</h2>
{% endblock %}
{% block contentModalBody %}
    <form id="modal-form-submit" method="post">
        <div>
            <label for="date">Date</label>
            <div class="divform">
                <input 
                    type="text" 
                    placeholder="JJ/MM/AAAA" 
                    name="date"
                    class="js-datepicker"
                    id="date"
                />
                <div id="date-error"></div>
            </div>
        </div>
        <div class="divform">
            <label for="startTime">Heure</label>
            <select id="startTime" name="startTime">
                <option value="09:00:00">9h00</option>
                <option value="09:30:00">9h30</option>
                <option value="10:00:00">10h00</option>
                <option value="10:30:00">10h30</option>
                <option value="11:00:00">11h00</option>
                <option value="11:30:00">11h30</option>
                <option value="14:00:00">14h00</option>
                <option value="14:30:00">14h30</option>
                <option value="15:00:00">15h00</option>
                <option value="15:30:00">15h30</option>
                <option value="16:00:00">16h00</option>
                <option value="16:30:00">16h30</option>
                <option value="17:00:00">17h00</option>
                <option value="17:30:00">17h30</option>
            </select>
        </div>
        <div class="divform">
            <label for="duration">Durée</label>
                <select id="duration" name="duration">
                <option value="00:30:00">30 minutes</option>
                <option value="01:00:00">1 heure</option>
                <option value="01:30:00">1 heure 30 minutes</option>
                <option value="02:00:00">2 heures</option>
            </select>
        </div>
{% endblock %}
{% block contentModalFooter %}
        <div>
            <button type="submit" class="btn valid">Valider</button>
        </div>
        <div>
            <span class="btn cancel close-popup">Annuler</span>
        </div>
    </form>
{% endblock %}
```

**Spécifique**

On include la modal spécifique `modal-date.html.twig` dans une page spécifique
```twig
{% block content %}
	{% block stylesheets %}
		{{ parent() }}
		{{ encore_entry_link_tags('backend/modal') }}
		{{ encore_entry_link_tags('backend/product') }}
	{% endblock %}

	{% block javascripts %}
		{{ parent() }}
		{{ encore_entry_script_tags('backend/modal') }}
		{{ encore_entry_script_tags('backend/product') }}
	{% endblock %}

	<div id="page-container" class="container-fluid" data-appointment-id="{{ appointment.getId() }}">
		{# code ... #}
	</div>
	
	{% include "Backend/Pages/product/Blocs/modal-date.html.twig" %}
{% endblock %}
```

**Général**
```css
/* public/asset/modal/index.scss */

.container-modal-back {
    display: none;
    background-color: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .no-scroll {
    overflow: hidden;
  }
  
  .open-btn {
      display: flex;
      justify-content: flex-start;
    }
  
  .open-button {
    background-color: #1c87c9;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.8;
    position: fixed;
  }
  
  #container-modal {
    display: none;
    position: fixed;
    left: 45%;
    top: 2%;
    transform: translate(-45%, 5%);
    z-index: 9;
    max-height: 90vh;
    overflow-y: auto;
    max-width: 90vw;
    overflow-x: auto;
    min-width: 350px;
  
    @media only screen and (max-width: 800px) 
    {
      min-width: 280px;
    }
  }
  
  .container-modal-content {
    border: 1px solid #666;
    border-radius: 10px;
  }
  
  .container-modal-content {
    padding: 20px;
    background-color: #fff;
  }
  
  .container-modal-content .divform {
    margin: 5px 0 22px 0;
  }
  
  .container-modal-content input[type="text"],
  .container-modal-content input[type="password"],
  .container-modal-content input[type="reset"],
  .container-modal-content input[type="radio"],
  .container-modal-content input[type="checkbox"],
  .container-modal-content input[type="button"],
  .container-modal-content input[type="file"],
  .container-modal-content input[type="image"],
  .container-modal-content input[type="color"],
  .container-modal-content input[type="date"],
  .container-modal-content input[type="datetime-local"],
  .container-modal-content input[type="email"],
  .container-modal-content input[type="month"],
  .container-modal-content input[type="number"],
  .container-modal-content input[type="url"],
  .container-modal-content input[type="week"],
  .container-modal-content input[type="search"],
  .container-modal-content input[type="tel"],
  .container-modal-content input[type="submit"],
  .container-modal-content select {
    width: 100%;
    padding: 10px;
    // margin: 5px 0 22px 0;
    border: none;
    background: #eee;
    border-radius: 5px;
  }
  
  .container-modal-content input[type="text"]:focus,
  .container-modal-content input[type="password"]:focus,
  .container-modal-content input[type="reset"]:focus,
  .container-modal-content input[type="radio"]:focus,
  .container-modal-content input[type="checkbox"]:focus,
  .container-modal-content input[type="button"]:focus,
  .container-modal-content input[type="file"]:focus,
  .container-modal-content input[type="image"]:focus,
  .container-modal-content input[type="color"]:focus,
  .container-modal-content input[type="date"]:focus,
  .container-modal-content input[type="datetime-local"]:focus,
  .container-modal-content input[type="email"]:focus,
  .container-modal-content input[type="month"]:focus,
  .container-modal-content input[type="number"]:focus,
  .container-modal-content input[type="url"]:focus,
  .container-modal-content input[type="week"]:focus,
  .container-modal-content input[type="search"]:focus,
  .container-modal-content input[type="tel"]:focus,
  .container-modal-content input[type="submit"]:focus,
  .container-modal-content select:focus {
    background-color: #ddd;
    outline: none;
  }
  
  .container-modal-content .btn {
    background-color: #28a745;
    color: #fff;
    padding: 12px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-bottom: 10px;
    opacity: 0.8;
  }
  
  .container-modal-content .cancel {
    background-color: #cc0000;
  }
  
  
  .container-modal-content .btn:hover,
  .open-button:hover {
    opacity: 1;
  }
```
**Spécifique**
```css
/* backend/js/Pages/page-product/product.scss */

/* CSS spécifique */
```