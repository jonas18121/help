import { FormCheckFunction } from '../../form/form-check-function';

const colorRed = '#dc3545';
const colorGreen = '#28a745';
const colorOrange = '#D07B21';

$(async function () {

    // $("form  #register_submit").prop('disabled', true);

    const formCheckFunction = new FormCheckFunction();

    await checkEmailWhileWriteIntoInput2(formCheckFunction);

    // $("form input").on("input change focusout", async function(event) {

    //     formCheckFunction.checkBeforeSubmit(
    //         formCheckFunction.isValidField(await isCheckField(formCheckFunction)), 
    //         event, 
    //         "#register_submit", 
    //         true
    //     );
    // });

    // async function updateFieldResults(inputElement) {
    //     const results = await isCheckField(formCheckFunction);
    //     formCheckFunction.checkBeforeSubmit(
    //         formCheckFunction.isValidField(results), 
    //         inputElement, 
    //         "#register_submit", 
    //         true
    //     );
    // }

    // // Écoutez les événements "input", "change" et "focusout" sur les champs du formulaire
    // $("form input").on("input change focusout", async function(event) {

    //     await updateFieldResults(event);
    // });
});

/**
 * à revoir
 * 
 * check un groupe de méthodes check 
 * 
 * Mettre toute les fonctions de check ici pour renvoyer une seul réponse
 * 
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * @return {array} resolve : réponse des méthodes check 
 */
async function isCheckField2(formCheckFunction) {

    // // Email
    checkEmailWhileWriteIntoInput(formCheckFunction, handleResult);
    checkEmailAfterSubmit(formCheckFunction, handleResult);
}

/**
 * à revoir
 * 
 * check un groupe de méthodes check 
 * 
 * Mettre toute les fonctions de check ici pour renvoyer une seul réponse
 * 
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * @return {array} resolve : réponse des méthodes check 
 */
async function isCheckField(formCheckFunction) {
    return await new Promise(async (resolve, reject) => {
        let results = [];
        const count = 6;

        // /**
        //  * callback utiliser dans les méthodes check 
        //  * qui permet de récupérer leurs reponse (boolean)
        //  * 
        //  * @param {array} result 
        //  */
        // function handleResult(result) {
        //     results.push(result);

        //     if (results.length >= 6) {
        //         resolve(results); // Renvoie les résultats dans un tableau
        //     }

        //     console.log(results);
        // }
        
        // // LastName
        // checkLastName(formCheckFunction, handleResult);
        
        // // FirstName
        // checkFirstName(formCheckFunction, handleResult);

        // // Password
        // checkIfSamePasswordWhileWriteIntoInput(formCheckFunction, handleResult);
        // checkIfSameComfirmPasswordWhileWriteIntoInput(formCheckFunction, handleResult);

        // // Email
        // checkEmailWhileWriteIntoInput(formCheckFunction, handleResult);
        // checkEmailAfterSubmit(formCheckFunction, handleResult);

        // FirstName
        // Fonction pour appeler checkFirstName avec une promesse
        async function checkFirstNameAsync() {
            return new Promise((resolve, reject) => {
                checkFirstName(formCheckFunction, resolve);
            });
        }
    
        // LastName
        // Fonction pour appeler checkLastName avec une promesse
        async function checkLastNameAsync() {
            return new Promise((resolve, reject) => {
                checkLastName(formCheckFunction, resolve);
            });
        }

        // Password
        // Fonction pour appeler checkIfSamePasswordWhileWriteIntoInput avec une promesse
        async function checkIfSamePasswordWhileWriteIntoInputAsync() {
            return new Promise((resolve, reject) => {
                checkIfSamePasswordWhileWriteIntoInput(formCheckFunction, resolve);
            });
        }

        // Fonction pour appeler checkIfSameComfirmPasswordWhileWriteIntoInput avec une promesse
        async function checkIfSameComfirmPasswordWhileWriteIntoInputAsync() {
            return new Promise((resolve, reject) => {
                checkIfSameComfirmPasswordWhileWriteIntoInput(formCheckFunction, resolve);
            });
        }

        // Email
        // Fonction pour appeler checkEmailWhileWriteIntoInput avec une promesse
        async function checkEmailWhileWriteIntoInputAsync() {
            return new Promise((resolve, reject) => {
                checkEmailWhileWriteIntoInput(formCheckFunction, resolve);
            });
        }

        // Fonction pour appeler checkEmailAfterSubmit avec une promesse
        async function checkEmailAfterSubmitAsync() {
            return new Promise((resolve, reject) => {
                checkEmailAfterSubmit(formCheckFunction, resolve);
            });
        }

        // desactiver le bouton submit et l'activer uniquement si tout les champs sont rempli

        // console.log(checkFirstNameAsync());

        // Appel les vérifications en parallèle
        const [
            // resultFirstName, 
            // resultLastName,
            // resultPassword,
            // resultConfirmPassword,
            resultEmailBeforeSubmit
            // resultEmailAfterSubmit
        ] = await Promise.all([
            // checkFirstNameAsync(),
            // checkLastNameAsync(),
            // checkIfSamePasswordWhileWriteIntoInputAsync(),
            // checkIfSameComfirmPasswordWhileWriteIntoInputAsync(),
            checkEmailWhileWriteIntoInputAsync()
            // checkEmailAfterSubmitAsync()
        ]);

        // const [
        //     resultFirstName, 
        //     resultLastName
        // ] = await Promise.all([
        //     checkFirstNameAsync(),
        //     checkLastNameAsync()
        // ]);

        // console.log(resultFirstName);

        // results.push(resultFirstName);
        // results.push(resultLastName);
        // results.push(resultPassword);
        // results.push(resultConfirmPassword);
        results.push(resultEmailBeforeSubmit);
        // results.push(resultEmailAfterSubmit);

        console.log(results);

        resolve(results);
    });
}

/**
 * check le prenom seulment
 * 
 * @param {*} formCheckFunction 
 * @returns 
 */
async function isCheckFirstName(formCheckFunction) {
    return await new Promise((resolve, reject) => {
        checkFirstName(formCheckFunction, resolve);
    });
}

/**
 * Vérifier Le prénom
 * 
 * Si le contenu de data est false,
 * checkBeforeSubmit désactivera le button submit, indépandament des autres méthodes
 * Donc si les autres méthodes sont true mais que cette méthode est false
 * alors, checkBeforeSubmit désactivera le button submit
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * 
 * @returns {void|boolean}
 */
function checkFirstName(formCheckFunction, callback) {
    $(document).on('input change focusout', '#registration_firstName', function (event) {
        let data = [];
        data.push(
            formCheckFunction.validInputLength(
                this,
                "#error_firstName",
                'Ce champ ne doit pas être vide',
                "Le prénom est trop court",
                "Trop de caractère",
                ""
            )
        );
    
        const isValid = formCheckFunction.isValidField(data);
        //   console.log(formCheckFunction.checkBeforeSubmit(isValid, event, "#register_submit"));
    
        if (isValid) {
            console.log('checkFirstName true'); // Appel du callback avec true en cas de succès
            callback(true); // Appel du callback avec true en cas de succès
        } else {
            console.log('checkFirstName false'); // Appel du callback avec false en cas d'échec
            callback(false); // Appel du callback avec false en cas d'échec
        }
    });
}

/**
 * Vérifier Le prénom
 * 
 * Si le contenu de data est false,
 * checkBeforeSubmit désactivera le button submit, indépandament des autres méthodes
 * Donc si les autres méthodes sont true mais que cette méthode est false
 * alors, checkBeforeSubmit désactivera le button submit
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * 
 * @returns {void|boolean}
 */
function checkFirstName2(formCheckFunction) {

    return new Promise(function(resolve, reject) {
        $(document).on('input change', '#registration_firstName', function (event) {
            let data = [];
            data.push(
                formCheckFunction.validInputLength(
                    this,
                    "#error_firstName",
                    'Ce champ ne doit pas être vide',
                    "Le prénom est trop court",
                    "Trop de caractère",
                    ""
                )
            );

            console.log(formCheckFunction.checkBeforeSubmit(formCheckFunction.isValidField(data), event, "#register_submit"));

            const isValid = formCheckFunction.checkBeforeSubmit(formCheckFunction.isValidField(data), event, "#register_submit");

            if (isValid) {
                resolve(true); // Renvoie true en cas de succès
            } else {
                reject(false); // Renvoie false en cas d'échec
            }
        });
    });
}

/**
 * Vérifier Le prénom
 * 
 * Si le contenu de data est false,
 * checkBeforeSubmit désactivera le button submit, indépandament des autres méthodes
 * Donc si les autres méthodes sont true mais que cette méthode est false
 * alors, checkBeforeSubmit désactivera le button submit
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * 
 * @returns {void|boolean}
 */
function checkLastName(formCheckFunction, callback) {
    $(document).on('input change focusout', '#registration_lastName', function (event) {
        let data = [];
        data.push(
            formCheckFunction.validInputLength(
                this,
                "#error_lastName",
                'Ce champ ne doit pas être vide',
                "Le nom est trop court",
                "Trop de caractère",
                ""
            )
        );

        // return formCheckFunction.checkBeforeSubmit(formCheckFunction.isValidField(data), event, "#register_submit");
        const isValid = formCheckFunction.isValidField(data);
    
        if (isValid) {
            console.log('checkLastName true')
            callback(true); // Appel du callback avec true en cas de succès
        } else {
            console.log('checkLastName false')
            callback(false); // Appel du callback avec false en cas d'échec
        }
    });
}

/**
 * Vérifier si le mot de passe de comfirmation est égale au premier mot de passe 
 * pendant que l'user écrit dans l'input
 * 
 * Si le contenu de data est false,
 * checkBeforeSubmit désactivera le button submit, indépandament des autres méthodes
 * Donc si les autres méthodes sont true mais que cette méthode est false
 * alors, checkBeforeSubmit désactivera le button submit
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * 
 * @returns {void|boolean}
 */
function checkIfSamePasswordWhileWriteIntoInput(formCheckFunction, callback) {

    $(document).on('input change focusout', '#registration_password', function (event) {
        let data = [];
        data.push(
            formCheckFunction.samePassword(
                this,
                "#registration_confirm_password",
                "#error_confirm_password",
                '',
                "Les deux passwords sont identique",
                "Les deux passwords ne sont pas identique",
                "Les deux passwords ne sont pas identique, il y a un caractère qui ne correspond pas",
                colorGreen,
                colorGreen,
                colorGreen,
                colorGreen,
                colorRed,
                colorRed,
                colorRed,
                colorRed
            )
        );

        // return formCheckFunction.checkBeforeSubmit(formCheckFunction.isValidField(data), event, "#register_submit");
        
        const isValid = formCheckFunction.isValidField(data);
    
        if (isValid) {
            console.log('checkIfSamePasswordWhileWriteIntoInput true')
            callback(true); // Appel du callback avec true en cas de succès
        } else {
            console.log('checkIfSamePasswordWhileWriteIntoInput false')
            callback(false); // Appel du callback avec false en cas d'échec
        }
    });
}

/**
 * Vérifier si le mot de passe de comfirmation est égale au premier mot de passe 
 * pendant que l'user écrit dans l'input
 * 
 * Si le contenu de data est false,
 * checkBeforeSubmit désactivera le button submit, indépandament des autres méthodes
 * Donc si les autres méthodes sont true mais que cette méthode est false
 * alors, checkBeforeSubmit désactivera le button submit
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * 
 * @returns {void|boolean}
 */
function checkIfSameComfirmPasswordWhileWriteIntoInput(formCheckFunction, callback) {

    $(document).on('change', '#registration_confirm_password', function (event) {
        let data = [];
        data.push(
            formCheckFunction.sameComfirmPassword(
                this,
                "#registration_password",
                "#error_confirm_password",
                '',
                "Les deux passwords sont identique",
                "Les deux passwords ne sont pas identique",
                "Les deux passwords ne sont pas identique, il y a un caractère qui ne correspond pas",
                colorGreen,
                colorGreen,
                colorGreen,
                colorGreen,
                colorRed,
                colorRed,
                colorRed,
                colorRed
            )
        );

        // return formCheckFunction.checkBeforeSubmit(formCheckFunction.isValidField(data), event, "#register_submit");
    
        const isValid = formCheckFunction.isValidField(data);
    
        if (isValid) {
            console.log('checkIfSameComfirmPasswordWhileWriteIntoInput true')
            callback(true); // Appel du callback avec true en cas de succès
        } else {
            console.log('checkIfSameComfirmPasswordWhileWriteIntoInput false')
            callback(false); // Appel du callback avec false en cas d'échec
        }
    });
}

/**
 * Vérifier si l'email dans le champ est valide pendant que l'user écrit dans l'input
 * 
 * Si le contenu de data est false,
 * checkBeforeSubmit désactivera le button submit, indépandament des autres méthodes
 * Donc si les autres méthodes sont true mais que cette méthode est false
 * alors, checkBeforeSubmit désactivera le button submit
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * @param {array} data
 * 
 * @returns {void|boolean}
 */
function checkEmailWhileWriteIntoInput(formCheckFunction, callback) {
    $(document).on('input change focusout', async function (event) {
        let data = [];
        data.push(
            await formCheckFunction.isEmailExist(
                '#registration_email', 
                '/registration/email/', 
                '#error_email',
                'Cette adresse email est déjà utilisé.', 
                colorOrange, 
                colorOrange
            )
        );

        // return await formCheckFunction.checkBeforeSubmitAsync(formCheckFunction.isValidField(data), event, "#register_submit");
	
        const isValid = formCheckFunction.isValidField(data);
    
        if (isValid) {
            console.log('checkEmailWhileWriteIntoInput true')
            callback(true); // Appel du callback avec true en cas de succès
        } else {
            console.log('checkEmailWhileWriteIntoInput false')
            callback(false); // Appel du callback avec false en cas d'échec
        }
    });
}

/**
 * Vérifier si l'email dans le champ est valide pendant que l'user écrit dans l'input
 * 
 * Si le contenu de data est false,
 * checkBeforeSubmit désactivera le button submit, indépandament des autres méthodes
 * Donc si les autres méthodes sont true mais que cette méthode est false
 * alors, checkBeforeSubmit désactivera le button submit
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * @param {array} data
 * 
 * @returns {void|boolean}
 */
function checkEmailWhileWriteIntoInput2(formCheckFunction) {
    $(document).on('input change focusout', async function (event) {
        let data = [];
        data.push(
            await formCheckFunction.isEmailExist(
                '#registration_email', 
                '/registration/email/', 
                '#error_email',
                'Cette adresse email est déjà utilisé.', 
                colorOrange, 
                colorOrange
            )
        );

        return formCheckFunction.checkBeforeSubmitAsync(formCheckFunction.isValidField(data), event, "#register_submit");
	
        // const isValid = formCheckFunction.isValidField(data);
    
        // if (isValid) {
        //     console.log('checkEmailWhileWriteIntoInput true')
        //     callback(true); // Appel du callback avec true en cas de succès
        // } else {
        //     console.log('checkEmailWhileWriteIntoInput false')
        //     callback(false); // Appel du callback avec false en cas d'échec
        // }
    });
}

/**
 * vérifier si l'email dans le champ est valide après le submit du formulaire
 * 
 * @param {FormCheckFunction} formCheckFunction 
 * 
 * @returns {void|boolean}
 */
function checkEmailAfterSubmit(formCheckFunction, callback) {
    $(document).on('submit', '#user-registration-form', async function (event) {
        event.preventDefault();

        // Supprimer le gestionnaire d'événement pour éviter une récursion infinie
        $(document).off('submit', '#user-registration-form');

        const formRegister = $('#user-registration-form');

		let data = [];
        await data.push(
            await formCheckFunction.isEmailExist(
                '#registration_email', 
                '/registration/email/', 
                '#error_email',
                'Cette email est déjà utilisé.', 
                colorRed, 
                colorOrange
            ) 
        );

		// return await formCheckFunction.checkAfterSubmitAsync(formCheckFunction.isValidField(data), event, formRegister, true);
	
        const isValid = formCheckFunction.isValidField(data);
    
        if (isValid) {
            callback(true); // Appel du callback avec true en cas de succès
        } else {
            callback(false); // Appel du callback avec false en cas d'échec
        }
    });
}