import '../../translations.js'
import  '../../../../../../lib/bundle/public/assets/backend/js/translations.js';
import Translator from '../../../../../../vendor/willdurand/js-translation-bundle/Resources/public/js/translator.min.js';
import { FormCheckFunction } from '../../form/form-check-function.js';

// on submit
$(function () {

    const formCheckFunction = new FormCheckFunction();
    const form = $('#order_invoice_search'); // get form
    
    // event on submit
    form.on('submit', event => {
        let data = [];

        data.push(
            formCheckFunction.validInputSelect(
                "#order_invoice_search_years", 
                "#years-error", 
                Translator.trans("backend.js.order.create.check.error.field_empty", {}, "javascript")
            )
        );
        
        formCheckFunction.checkOnSubmit(formCheckFunction.isValidField(data), event);
    })
});

// Others


