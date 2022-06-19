# Controle de champ dans un formulaire

```javascript
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
```

```javascript
    /**
    * Controle de la longueur d'un input
    * input : id de l'input
    * inputError : id de la div pour affiché les message d'erreurs
    * messageError : message d'erreur
    * limit : nombre de numéro à ne pas dépassé
    * messageErrorSmall : message d'erreur, trop petit
    * messageErrorTall : message d'erreur, trop grand
    * messageSuccess : message de success
    */
    function validInputPostalCode(input, inputError, messageError, limit, messageErrorSmall = null, messageErrorTall = null, messageSuccess = null){
        let validInputError = $(`#${inputError}`);
        let validInput = $(`#${input}`);

        let isValid = false;

        if(validInput.val().length == limit){
            length = messageSuccess;
            color = "green";
            isValid = true;
        }
        else if(validInput.val() == ""){
            length = messageError;
            color = "red";
        }
        else if(validInput.val().length < limit){
            length = messageErrorSmall;
            color = "red";
        }
        else if(validInput.val().length > limit){
            length = messageErrorTall;
            color = "red";
        }
        validInputError.html(length).text();
        validInputError.css({ "color": `${color}`});

        return isValid;
    }
```

```javascript
    /**
    * Controle de la longueur d'un input
    * input : id de l'input
    * inputError : id de la div pour affiché les message d'erreurs
    * messageError : message d'erreur
    * messageErrorSmall : message d'erreur, trop petit
    * messageErrorTall : message d'erreur, trop grand
    * messageSuccess : message de success
    */
    function validInputLength(input, inputError, messageError, messageErrorSmall = null, messageErrorTall = null, messageSuccess = null){
        let validInputError = $(`#${inputError}`);
        let validInput = $(`#${input}`);

        let isValid = false;

        if(validInput.val().length >= 2 && validInput.val().length <= 255){
            length = messageSuccess;
            color = "green";
            isValid = true;
        }
        else if(validInput.val() == ""){
            length = messageError;
            color = "red";
        }
        else if(validInput.val().length < 2){
            length = messageErrorSmall;
            color = "red";
        }
        else if(validInput.val().length > 255){
            length = messageErrorTall;
            color = "red";
        }
        validInputError.html(length).text();
        validInputError.css({ "color": `${color}`});

        return isValid;
    }
```

```javascript
    /**
    * input : id de l'input
    * inputError : id de la div pour affiché les message d'erreurs
    * messageError : message d'erreur
    * messageSuccess : message de success
    */
    function validInput(input, inputError, messageError, messageSuccess = null){
        let validInputError = $(`#${inputError}`);
        let validInput = $(`#${input}`);

        let isValid = false;

        if(validInput.val() != "" && validInput.val() != undefined){
            length = messageSuccess;
            color = "green";
            isValid = true;
        }
        else if(validInput.val() == "" || validInput.val() == undefined){
            length = messageError;
            color = "red";
        }
        
        validInputError.html(length).text();
        validInputError.css({ "color": `${color}`});

        return isValid;
    }
```

```javascript
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
```

```javascript
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
        
        //                        param #1 = month,              param #2 = day,              param #3 = year,
        let dateInput = new Date(validInputArray['1'] + ' ' + validInputArray['0']  + ' ' + validInputArray['2']);

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
```

```javascript
    /**
    * Pour les input de type date
    * input : id de l'input
    * inputError : id de la div pour affiché les message d'erreurs
    * messageError : message d'erreur
    * messageSuccess : message de success
    */
    function validInputTel(input, inputError, messageError, messageErrorEmpty, messageSuccess = null){
        let validInputError = $(`#${inputError}`);
        let validInput = $(`#${input}`);
        let regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/

        let isValid = false;

        if(validInput.val() == ""){
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
```

```javascript
    //Contrôle du champ exam
    function validEmail(){
        let emailError = $('#email-error');
        let email = $('#registration_candidate_email');
        let regex = /^[a-zA-Z][a-zA-Z0-9._/-]{1,255}@[a-z]{4,150}\.[a-z]{2,3}$/;

        let isValid = false;

        if(email.val() == ""){
            length = "{{ seedDataManager.getSeedDataValue(constant('App\\Enum\\DataEnum::DATA_REGISTRATION_EMAIL_EMPTY_MESSAGE_ERREUR')) }}";
            color = "red";
        }
        else if(regex.test(email.val())){
            length = null;
            color = "green";
            isValid = true;
        }
        else if(!regex.test(email.val())){
            length = "{{ seedDataManager.getSeedDataValue(constant('App\\Enum\\DataEnum::DATA_REGISTRATION_EMAIL_FORMAT_MESSAGE_ERREUR')) }}";
            color = "red";
        }
        
        emailError.html(length).text();
        emailError.css({ "color": `${color}`});

        return isValid;
    }
```

### form from symfony

```javascript

    let isValidCgAccepted = validInputCheckbox(
        "registration_cgAccepted", 
        'cgAccepted-error', 
        "Cochez la case please"
    );
    let isValidRecommendeLetter = validInputCheckbox(
        "registration_recommendedLetter", 
        'recommendedLetter-error', 
        "Cochez la case please"
    );
    let isValidPhoneNumber = validInputTel(
        "registration_candidate_phonenumber", 
        "phonenumber-error", 
        "Le format est inccorrecte, format valide : 0701010101 ou 07 01 01 01 01 ou 07-01-01-01-01 ou +337-01-01-01-01", 
        "Cette valeur ne doit pas être vide."
    );
    let isValidBirthdate = validInputDateBirthdate(
        "registration_candidate_birthdate", 
        "birthdate-error", 
        "La date n'est pas correcte.", 
        "Cette valeur ne doit pas être vide.", 
        null,
        "La date est trop petite."
    );
    let isValidIdentityDateValidity = validInputDateIdentity(
        "registration_candidate_identityDateValidity", 
        "identityDateValidity-error", 
        "La date n'est pas correcte.", 
        "Cette valeur ne doit pas être vide.", 
        null,  
        "La date est trop petite."
    );
    let isValidCity = validInputLength(
        "registration_address_city", 
        "city-error", 
        "Cette valeur ne doit pas être vide.",
        "Trop petit.", 
        "Trop grand."
    );
    let isValidPostalCode = validInputPostalCode(
        "registration_address_postal", 
        "postalcode-error", 
        "Cette valeur ne doit pas être vide.",
        5,
        "Trop petit, il faut 5 caractères.", 
        "Trop grand, il faut 5 caractères."
    );
    let isValidAdress = validInputLength(
        "registration_address_addressLine1", 
        "address-error", 
        "Cette valeur ne doit pas être vide.",
        "Trop petit.", 
        "Trop grand."
    );
    let isValidFirstName = validInputLength(
        "registration_candidate_firstname", 
        "firstname-error", 
        "Cette valeur ne doit pas être vide.",
        "	Trop petit.", 
        "Trop grand."
    );
    let isValidLastName = validInputLength(
        "registration_candidate_lastname", 
        "lastname-error", 
        "Cette valeur ne doit pas être vide.",
        "Trop petit.", 
        "Trop grand."
    );
    let isValidIdentityCard = validInput(
        "registration_candidate_identityCard", 
        "identityCard-error", 
        "Insérez une copie de votre pièce d\'identité.	"
    );
    let isValidSession = validInput(
        "registration_session", 
        "session-error", 
        "Cette valeur ne doit pas être vide."
    );
    let isValidExamen = validInput(
        "registration_exam", 
        "exam-error", 
        "Choisissez un examen."
    );
    let isValidGender = validInput(
        "registration_candidate_gender", 
        "gender-error", 
        "Choisissez votre civilité."
    );
    let isValidEmail = validEmail();

    if(
        true == isValidLastName 
        && true == isValidIdentityCard
        && true == isValidSession
        && true == isValidExamen
        && true == isValidGender
        && true == isValidEmail
        && true == isValidPhoneNumber
        && true == isValidAdress
        && true == isValidCity
        && true == isValidPostalCode
        && true == isValidFirstName
        && true == isValidRecommendeLetter
        && true == isValidCgAccepted
        && true == isValidIdentityDateValidity
        && true == isValidBirthdate
    ){
        
        // provoque le submit du formulaire  "recaptcha-response"
        document.getElementById("form_submit").submit();
    }
```