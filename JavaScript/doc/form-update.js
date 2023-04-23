$(function() {
    let inputPriceBase = $('#input_id_product_update_price');
    let valueInputPriceBase = $('#input_id_product_update_price').val();

    let inputTVA = $('#input_id_product_update_tva');
    let valueInputTVA = $('#input_id_product_update_tva').val();

    let tvaFormat = changeTvaFormat(valueInputTVA);
    displayTvaAfterPageReload(valueInputPriceBase, tvaFormat);

    // Modify the small label, when the base price input changes value
    inputPriceBase.on('input', e => {
        let valueInputPriceBase = $('#input_id_product_update_price').val();
        let valueInputTVA = $('#input_id_product_update_tva').val();

        let tvaFormat = changeTvaFormat(valueInputTVA);
        displayTvaAfterChangeIntoInput(valueInputPriceBase, valueInputPriceBase, tvaFormat);
    });

    // Modify the small label, when the TVA input changes value
    inputTVA.on('input', e => {
        let valueInputPriceBase = $('#input_id_product_update_price').val();
        let valueInputTVA = $('#input_id_product_update_tva').val();

        let tvaFormat = changeTvaFormat(valueInputTVA);
        displayTvaAfterChangeIntoInput(valueInputTVA, valueInputPriceBase, tvaFormat);
    });

    /**
     * @param {string} valueInputTVA The string
     * @returns {string} tvaFormat
     */
    function changeTvaFormat(valueInputTVA) 
    {    
        // cut the sring at point
        let tvaSplit = valueInputTVA.split('.');
        let tvaFormat = '';
        if (tvaSplit[0].length > 0 && tvaSplit[0].length < 2) {
            tvaFormat = '0'+tvaSplit[0];

            // If decimal tvaSplit[1] exit, we add the decimal, else add decimal '.00'
            if (tvaSplit[1]!== undefined && tvaSplit[1] !== '' && tvaSplit[1] !== 'NaN') {
                tvaFormat += '.'+tvaSplit[1];
            }
            else {
                tvaFormat += '.00';
            }
        }
        else {
            if (valueInputTVA !== '') {
                tvaFormat = valueInputTVA;
            }
            else {
                tvaFormat += '00';
            }
        }

        return tvaFormat;
    }

    /**
     * @param {string} input 
     * @param {string} valueInputPriceBase
     * @param {string} tvaFormat
     * 
     * @returns {void} 
     */
    function displayTvaAfterChangeIntoInput(input, valueInputPriceBase, tvaFormat) 
    {    
        let labelSmall = $('.price-tva');
        let priceWithTVA = '';
        let TVA = '';

        if (input !== undefined && input !== '' && input !== 'NaN') {
            TVA = (1 + tvaFormat) / 100;
            if (TVA !== undefined && TVA !== '' && TVA !== 'NaN') {
                priceWithTVA = valueInputPriceBase * TVA;

                // Convert Number into string with 3 decimale
                let tvaThreeDecimal = priceWithTVA.toFixed(3).toString();

                if (tvaThreeDecimal) {
                    // get last decimal
                    let lastDecimal = tvaThreeDecimal.charAt(tvaThreeDecimal.length - 1);
                    if (parseInt(lastDecimal) >= 5) {
                        // multiply by 100 to round a higher integer with Math.ceil() then divide by 100
                        priceWithTVA = Math.ceil(priceWithTVA * 100) / 100;
                    }
                }
                priceWithTVA = priceWithTVA.toFixed(2);
            }
            else {
                priceWithTVA = valueInputPriceBase;
            }
        }
        else{
            priceWithTVA = valueInputPriceBase;
        }        

        if (priceWithTVA == '' || priceWithTVA == undefined || priceWithTVA == 'NaN' ) {
            labelSmall.text('');
        }
        else {
            labelSmall.text(' avec la TVA : ' + priceWithTVA + ' €');
            labelSmall.css("color", "green");
        }
    }

    /**
     * @param {string} valueInputPriceBase
     * @param {string} tvaFormat
     * 
     * @returns {void} 
     */
    function displayTvaAfterPageReload(valueInputPriceBase, tvaFormat) 
    {    
        let labelSmall = $('.price-tva');
        let priceWithTVA = '';
        let TVA = '';

        TVA = (1 + tvaFormat) / 100;

        if (TVA !== undefined && TVA !== '' && TVA !== 'NaN') {
            priceWithTVA = valueInputPriceBase * TVA;
    
            // Convert Number into string with 3 decimale
            let tvaThreeDecimal = priceWithTVA.toFixed(3).toString();
    
            if (tvaThreeDecimal) {
                // get last decimal
                let lastDecimal = tvaThreeDecimal.charAt(tvaThreeDecimal.length - 1);
                if (parseInt(lastDecimal) >= 5) {
                    // multiply by 100 to round a higher integer with Math.ceil() then divide by 100
                    priceWithTVA = Math.ceil(priceWithTVA * 100) / 100;
                }
            }
            
            priceWithTVA = priceWithTVA.toFixed(2);
        }
        else {
            priceWithTVA = valueInputPriceBase;
        }
    
        labelSmall.text(' avec la TVA : ' + priceWithTVA + ' €');
        labelSmall.css("color", "green");
    }
});