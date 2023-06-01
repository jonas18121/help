////// Generic Function ////// 

export class FormCheckFunction {

    constructor() {
        
    }

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
    validInputZipCode(input, tagError, limit, messageErrorEmpty, messageErrorFormat, messageSuccess = null){
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
     * Checks if the select field is disabled
     * 
     * @param {string} input : input id
     * @param {string} tagError : id of the div to display the error message
     * @param {string} messageErrorEmpty : error message, the field is empty
     * @param {string} messageSuccess : success message
     * 
     * @returns {boolean}
     */
    validInputSelect(input, tagError, messageErrorEmpty, messageSuccess = null){
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
    validInputLength(input, tagError, messageErrorEmpty, messageErrorSmall = null, messageErrorTall = null, messageSuccess = null){
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

    /**
     * checks if the boolean false exist
     * 
     * @param {boolean[]} data : array of boolean
     * 
     * @returns {boolean}
     */
    isValidField(data) {
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
    validEmail(input, tagError, messageErrorEmpty, messageErrorFormat, messageSuccess = null){
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
    validInputPhonenumber(input, tagError, messageErrorFormat, messageErrorEmpty, messageSuccess = null){
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

    /**
     * check if isValid is correct on submit
     * 
     * @param {boolean} isValid
     * @param {event} event
     * 
     * @returns {void}
     */
    checkOnSubmit(isValid, event){
        if (isValid == false) {
            event.preventDefault(); // stop submit
            $('html,body').animate({scrollTop: 0}, 'slow'); // back to top
        }
    }
}