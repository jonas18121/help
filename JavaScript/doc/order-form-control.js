"use strict";

import '../../translations.js'
import  '../../../../../../lib/seed-bundle/public/assets/backend/js/translations.js';
import Translator from '../../../../../../vendor/willdurand/js-translation-bundle/Resources/public/js/translator.min.js';

// on submit
$(function () {
    // get form
    const form = $('#order_create');
    
    // event on submit
    form.on('submit', e => {
        let isValid = false;
        let data = [];

        data.push(isValidUser());
        data.push(isValidAddresse());
        data.push(
            isDisabledSelectAddresse(
                "#order_create_invoiceAddresses",
                "#invoiceAddresses-error",
                Translator.trans("Créer une adresse pour ce nouveau client", {}, "javascript")
            )
        );
        data.push(
            isDisabledSelectAddresse(
                "#order_create_shippingAddresses",
                "#shippingAddresses-error",
                Translator.trans("Créer une adresse pour ce nouveau client", {}, "javascript")
            )
        );
        
        isValid = isValidField(data);

        // if isValid is false change color of the element after submit
        if (isValid == false) {
            e.preventDefault(); // stop submit

            // back to top
            $('html,body').animate({scrollTop: 0}, 'slow');
        }
    })
});

// Others

/**
 * Check if address exists
 * 
 *  @returns {boolean}
 */
function isValidAddresse() {
    if ($("#formCreateAddress").is(":visible")) {
        let data = [];

        let isValidAddresseLine1 = validInputLength(
            "#order_create_invoiceAddress_addressLine1", 
            "#addressLine1-error", 
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Minimun 2 caractères", {}, "javascript"), 
            Translator.trans("Maximun 255 caractères", {}, "javascript")
        );

        let isValidZipCote = validInputZipCode(
            "#order_create_invoiceAddress_zipcode", 
            "#zipcode-error", 
            5,
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Saisissez uniquement 5 chiffres", {}, "javascript")
        );

        let isValidCity = validInputLength(
            "#order_create_invoiceAddress_city", 
            "#city-error", 
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Minimun 2 caractères", {}, "javascript"), 
            Translator.trans("Maximun 255 caractères", {}, "javascript")
        );

        data.push(isValidAddresseLine1);
        data.push(isValidZipCote);
        data.push(isValidCity);

        return isValidField(data);
    }
    else {
        return validInputSelect(
            "#order_create_invoiceAddresses option:selected",
            "#invoiceAddresses-error",
            Translator.trans("Aucune adresse de facture est selectionner", {}, "javascript")
        )
    }
}

/**
 * Check if user exists
 * 
 * @returns {boolean}
 */
function isValidUser() {
    if ($("#formCreateUser").is(":visible")) {

        let data = [];

        let isValidLastname = validInputLength(
            "#order_create_user_lastname", 
            "#lastname-error", 
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Minimun 2 caractères", {}, "javascript"), 
            Translator.trans("Maximun 255 caractères", {}, "javascript")
        );

        let isValidFirstname = validInputLength(
            "#order_create_user_firstname", 
            "#firstname-error", 
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Minimun 2 caractères", {}, "javascript"), 
            Translator.trans("Maximun 255 caractères", {}, "javascript")
        );

        let isValidUsername = validInputLength(
            "#order_create_user_username", 
            "#username-error", 
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Minimun 2 caractères", {}, "javascript"), 
            Translator.trans("Maximun 255 caractères", {}, "javascript")
        );

        let isValidPassword = validInputLength(
            "#order_create_user_password", 
            "#password-error", 
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Minimun 2 caractères", {}, "javascript"), 
            Translator.trans("Maximun 255 caractères", {}, "javascript")
        );

        let isValidEmail = validEmail(
            "#order_create_user_email", 
            "#email-error", 
            Translator.trans("Ce champ est vide", {}, "javascript"),
            Translator.trans("Le format est invalid, format minimum autoriser x@xxx.xx", {}, "javascript")
        );

        let isValidPhonenumber = validInputPhonenumber(
            "#order_create_user_phonenumber", 
            "#phonenumber-error", 
            Translator.trans("Le format est invalid", {}, "javascript"), 
            Translator.trans("Ce champ est vide", {}, "javascript")
        )

        data.push(isValidLastname);
        data.push(isValidFirstname);
        data.push(isValidUsername);
        data.push(isValidPassword);
        data.push(isValidEmail);
        data.push(isValidPhonenumber);

        return isValidField(data);
        
    } else {
        // control users select
        return validInputSelect(
            "#order_create_users option:selected", 
            "#users-error", 
            Translator.trans("Aucun utilisateur selectionner", {}, "javascript")
        );
    }
}

// Control form

/**
 * Checking the length of an input field's value
 * 
 * @param {string} input : input id
 * @param {string} tagError : id of the div to display the error message
 * @param {int} limit : number of characters not to be exceeded
 * @param {string} messageErrorEmpty : error message, the field is empty
 * @param {string} messageSuccess : success message
 * 
 * @returns {boolean}
 */
function validInputZipCode(input, tagError, limit, messageErrorEmpty, messageErrorFormat, messageSuccess = null){
    let color, message = null;
    let validInputError = $(tagError);
    let validInput = $(input);
    let regex = new RegExp("^[0-9]{" + limit + "}$");

    let isValid = false;

    if(validInput.val() == ""){
        message = messageErrorEmpty;
        color = "red";
    }
    else if(!regex.test(validInput.val())){
        message = messageErrorFormat;
        color = "red";
    }
    else {
        message = messageSuccess;
        color = "green";
        isValid = true;
    }

    validInputError.html(message).text();
    validInputError.css({ "color": `${color}`});

    return isValid;
}

/**
 * Checks if the select field of the address is disabled
 * 
 * @param {string} input : input id
 * @param {string} tagError : id of the div to display the error message
 * @param {string} messageError : error message
 * 
 * @returns {boolean}
 */
function isDisabledSelectAddresse(input, tagError, messageError) {
    let color, message = null;
    let isValid = true;

    if ($("#formCreateUser").is(":visible")) {
        const adresseInput = $(input);
        let validInputError = $(tagError);    

        if (adresseInput.prop('disabled') && !$("#formCreateAddress").is(":visible")) {
            message = messageError;
            color = "red";
            isValid = false;
        }

        validInputError.html(message).text();
        validInputError.css({ "color": `${color}`});

        return isValid;
    }

    return isValid;
}

/**
 * Checks if the select field is disabled
 * 
 * @param {string} input : input id
 * @param {string} tagError : id of the div to display the error message
 * @param {string} messageErrorEmpty : error message, the field is empty
 * @param {string} messageSuccess : success message
 * 
 * @returns {boolean}
 */
function validInputSelect(input, tagError, messageErrorEmpty, messageSuccess = null){
    let color, message = null;
    let validInputError = $(tagError);
    let validInput = $(input);

    let isValid = false;

    if(validInput.val() != "" && validInput.val() != undefined){
        message = messageSuccess;
        color = "green";
        isValid = true;
    }
    else if(validInput.val() == "" || validInput.val() == undefined){
        message = messageErrorEmpty;
        color = "red";
    }

    validInputError.html(message).text();
    validInputError.css({ "color": `${color}`});

    return isValid;
}

/**
 * checks the length of an input
 * 
 * @param {string} input : input id
 * @param {string} tagError : id of the div to display the error message
 * @param {string} messageErrorEmpty : error message, the field is empty
 * @param {string} messageErrorSmall : error message, the number of characters is too small
 * @param {string} messageErrorTall : error message, the number of characters is too large
 * @param {string} messageSuccess : success message
 * 
 * @returns {boolean}
 */
function validInputLength(input, tagError, messageErrorEmpty, messageErrorSmall = null, messageErrorTall = null, messageSuccess = null){
    let color, message = null;
    let validInputError = $(tagError);
    let validInput = $(input);

    let isValid = false;

    if(validInput.val().length >= 2 && validInput.val().length <= 255){
        message = messageSuccess;
        color = "green";
        isValid = true;
    }
    else if(validInput.val() == ""){
        message = messageErrorEmpty;
        color = "red";
    }
    else if(validInput.val().length < 2){
        message = messageErrorSmall;
        color = "red";
    }
    else if(validInput.val().length > 255){
        message = messageErrorTall;
        color = "red";
    }
    validInputError.html(message).text();
    validInputError.css({ "color": `${color}`});

    return isValid;
}

function isValidField(data) {
    for (let index = 0; index < data.length; index++) {
        if(false == data[index]){
            return false;
        }
    }

    return true;
}

/**
 * check if the email is correct
 * 
 * @param {string} input : input id
 * @param {string} tagError : id of the div to display the error message
 * @param {string} messageErrorEmpty : error message, the field is empty
 * @param {string} messageErrorFormat : error message, the format is not correct
 * @param {string} messageSuccess : success message
 * 
 * @returns {boolean}
 */
function validEmail(input, tagError, messageErrorEmpty, messageErrorFormat, messageSuccess = null){
    let color, message = null;
    let emailError = $(tagError);
    let email = $(input);
    let regex = /^[a-zA-Z][a-zA-Z0-9._/-]{1,255}@[a-z]{3,150}\.[a-z]{2,3}$/;

    let isValid = false;

    if(email.val() == ""){
        message = messageErrorEmpty;
        color = "red";
    }
    else if(regex.test(email.val())){
        message = messageSuccess;
        color = "green";
        isValid = true;
    }
    else if(!regex.test(email.val())){
        message = messageErrorFormat;
        color = "red";
    }
    
    emailError.html(message).text();
    emailError.css({ "color": `${color}`});

    return isValid;
}

/**
 * check if the phone number is correct
 * 
 * @param {string} input : input id
 * @param {string} tagError : id of the div to display the error message
 * @param {string} messageErrorFormat : error message, the format is not correct
 * @param {string} messageErrorEmpty : error message, the field is empty
 * @param {string} messageSuccess : success message
 * 
 * @returns {boolean}
 */
function validInputPhonenumber(input, tagError, messageErrorFormat, messageErrorEmpty, messageSuccess = null){
    let color, message = null;
    let validInputError = $(tagError);
    let validInput = $(input);
    let regex = /^(?:(?:\+|00)33|0)\s*[12345679](?:[\s.-]*\d{2}){4}$/

    let isValid = false;

    if(validInput.val() == ""){
        message = messageErrorEmpty;
        color = "red";
    }
    else if(regex.test(validInput.val())){
        message = messageSuccess;
        color = "green";
        isValid = true;
    }
    else if(!regex.test(validInput.val())){
        message = messageErrorFormat;
        color = "red";
    }
    
    validInputError.html(message).text();
    validInputError.css({ "color": `${color}`});

    return isValid;
}

// autres

/**
* Pour les input de type date
* input : id de l'input
* inputError : id de la div pour affiché les message d'erreurs
* messageError : message d'erreur
* messageSuccess : message de success
* messageErrorDateSmall : message d'erreur si la date saisie dans l'input est plus petit que la date du jour 
*/
function validInputDateBirthdate(input, inputError, messageError, messageErrorEmpty, messageSuccess = null, messageErrorDateSmall = null){
    let validInputError = $(`#${inputError}`);
    let validInput = $(`#${input}`);
    let regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    let isValid = false;

    let dateCurrent = new Date();
    let dateInput = new Date(validInput.val());

    if (dateCurrent.getFullYear()-100 > dateInput.getFullYear()){
        length = messageErrorDateSmall;
        color = "red";
    }
    else if(validInput.val() == ""){
        length = messageErrorEmpty;
        color = "red";
    }
    else if(regex.test(validInput.val())){
        length = messageSuccess;
        color = "green";
        isValid = true;
    }
    else if(!regex.test(validInput.val())){
        length = messageError;
        color = "red";
    }
              
    validInputError.html(length).text();
    validInputError.css({ "color": `${color}`});

    return isValid;
}

/**
* Pour les input de type date
* input : id de l'input
* inputError : id de la div pour affiché les message d'erreurs
* messageError : message d'erreur
* messageSuccess : message de success
* messageErrorDateSmall : message d'erreur si la date saisie dans l'input est plus petit que la date du jour 
*/
function validInputDateIdentity(input, inputError, messageError, messageErrorEmpty, messageSuccess = null, messageErrorDateSmall = null){
    let validInputError = $(`#${inputError}`);
    let validInput = $(`#${input}`);
    let regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    let isValid = false;

    // Date current
    let dateCurrent = new Date();
    let dateCurrentDate = dateCurrent.getDate();
    dateCurrentDate = dateCurrentDate.toString();
    if(dateCurrentDate.length < 2){
        dateCurrentDate = 0 + '' + dateCurrentDate;
    }

    let dateCurrentMonth = dateCurrent.getMonth()+1;
    dateCurrentMonth = dateCurrentMonth.toString();
    if(dateCurrentMonth.length < 2){
        dateCurrentMonth = 0 + '' + dateCurrentMonth;
    }
    dateCurrent = parseInt(dateCurrent.getFullYear() + '' + dateCurrentMonth + '' + dateCurrentDate);
    //////////////////////////////////////// End date current //////////////////////////////////////////////////////

    // Date of input
    validInputArray = validInput.val().split('/');
    
    //                  param #1 = month,              param #2 = day,              param #3 = year,
    let retrievedDate = validInputArray['1'] + '/' + validInputArray['0']  + '/' + validInputArray['2']

    let dateInput = new Date(retrievedDate);

    let dateInputDate = dateInput.getDate();
    dateInputDate = dateInputDate.toString();
    if(dateInputDate.length < 2){
        dateInputDate = 0 + '' + dateInputDate;
    }

    let dateInputMonth = dateInput.getMonth()+1;
    dateInputMonth = dateInputMonth.toString();
    if(dateInputMonth.length < 2){
        dateInputMonth = 0 + '' + dateInputMonth;
    }
    dateInput = parseInt(dateInput.getFullYear() + '' + dateInputMonth + '' + dateInputDate);
    ////////////////////////////////////// End date of input ////////////////////////////////////////////////////////

    // Compare date
    if(dateCurrent >= dateInput){
        length = messageErrorDateSmall;
        color = "red";
    }
    else if(validInput == "" || isNaN(dateInput)){
        length = messageErrorEmpty;
        color = "red";
    }
    else if(regex.test(validInput.val())){
        length = messageSuccess;
        color = "green";
        isValid = true;
    }
    else if(!regex.test(validInput.val())){
        length = messageError;
        color = "red";
    }    

    validInputError.html(length).text();
    validInputError.css({ "color": `${color}`});

    return isValid;
}

/**
* Controle de la longueur d'un input
* input : id de l'input
* inputError : id de la div pour affiché les message d'erreurs
* messageError : message d'erreur
* messageSuccess : message de success
*/
function validInputCheckbox(input, inputError, messageError, messageSuccess = null){
    let validInputError = $(`#${inputError}`);
    let validInput = $(`#${input}`);

    let isValid = false;

    if(validInput.prop('checked') == true){
        length = messageSuccess;
        color = "green";
        isValid = true;
    }
    else {
        length = messageError;
        color = "red";
    }
    validInputError.html(length).text();
    validInputError.css({ "color": `${color}`});

    return isValid;
}