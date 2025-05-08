"use strict";

import { FormCheckClass } from '../../form/formCheckClass';

const colorRed = '#dc3545';
const colorGreen = '#28a745';
const colorOrange = '#D07B21';

$(async function () {

    // $("form  #register_submit").prop('disabled', true);

    const formCheckClass = new FormCheckClass();

    await checkEmailWhileWriteIntoInput2(formCheckClass);

    // $("form input").on("input change focusout", async function(event) {

    //     formCheckClass.checkBeforeSubmit(
    //         formCheckClass.isValidField(await isCheckField(formCheckClass)), 
    //         event, 
    //         "#register_submit", 
    //         true
    //     );
    // });

    // async function updateFieldResults(inputElement) {
    //     const results = await isCheckField(formCheckClass);
    //     formCheckClass.checkBeforeSubmit(
    //         formCheckClass.isValidField(results), 
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
 * @param {FormCheckClass} formCheckClass 
 * @return {array} resolve : réponse des méthodes check 
 */
async function isCheckField2(formCheckClass) {

    // // Email
    checkEmailWhileWriteIntoInput(formCheckClass, handleResult);
    checkEmailAfterSubmit(formCheckClass, handleResult);
}

/**
 * à revoir
 * 
 * check un groupe de méthodes check 
 * 
 * Mettre toute les fonctions de check ici pour renvoyer une seul réponse
 * 
 * 
 * @param {FormCheckClass} formCheckClass 
 * @return {array} resolve : réponse des méthodes check 
 */
async function isCheckField(formCheckClass) {
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
        // checkLastName(formCheckClass, handleResult);
        
        // // FirstName
        // checkFirstName(formCheckClass, handleResult);

        // // Password
        // checkIfSamePasswordWhileWriteIntoInput(formCheckClass, handleResult);
        // checkIfSameComfirmPasswordWhileWriteIntoInput(formCheckClass, handleResult);

        // // Email
        // checkEmailWhileWriteIntoInput(formCheckClass, handleResult);
        // checkEmailAfterSubmit(formCheckClass, handleResult);

        // FirstName
        // Fonction pour appeler checkFirstName avec une promesse
        async function checkFirstNameAsync() {
            return new Promise((resolve, reject) => {
                checkFirstName(formCheckClass, resolve);
            });
        }
    
        // LastName
        // Fonction pour appeler checkLastName avec une promesse
        async function checkLastNameAsync() {
            return new Promise((resolve, reject) => {
                checkLastName(formCheckClass, resolve);
            });
        }

        // Password
        // Fonction pour appeler checkIfSamePasswordWhileWriteIntoInput avec une promesse
        async function checkIfSamePasswordWhileWriteIntoInputAsync() {
            return new Promise((resolve, reject) => {
                checkIfSamePasswordWhileWriteIntoInput(formCheckClass, resolve);
            });
        }

        // Fonction pour appeler checkIfSameComfirmPasswordWhileWriteIntoInput avec une promesse
        async function checkIfSameComfirmPasswordWhileWriteIntoInputAsync() {
            return new Promise((resolve, reject) => {
                checkIfSameComfirmPasswordWhileWriteIntoInput(formCheckClass, resolve);
            });
        }

        // Email
        // Fonction pour appeler checkEmailWhileWriteIntoInput avec une promesse
        async function checkEmailWhileWriteIntoInputAsync() {
            return new Promise((resolve, reject) => {
                checkEmailWhileWriteIntoInput(formCheckClass, resolve);
            });
        }

        // Fonction pour appeler checkEmailAfterSubmit avec une promesse
        async function checkEmailAfterSubmitAsync() {
            return new Promise((resolve, reject) => {
                checkEmailAfterSubmit(formCheckClass, resolve);
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
 * @param {*} formCheckClass 
 * @returns 
 */
async function isCheckFirstName(formCheckClass) {
    return await new Promise((resolve, reject) => {
        checkFirstName(formCheckClass, resolve);
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
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void|boolean}
 */
function checkFirstName(formCheckClass, callback) {
    $(document).on('input change focusout', '#registration_firstName', function (event) {
        let data = [];
        data.push(
            formCheckClass.validInputLength(
                this,
                "#error_firstName",
                'Ce champ ne doit pas être vide',
                "Le prénom est trop court",
                "Trop de caractère",
                ""
            )
        );
    
        const isValid = formCheckClass.isValidField(data);
        //   console.log(formCheckClass.checkBeforeSubmit(isValid, event, "#register_submit"));
    
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
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void|boolean}
 */
function checkFirstName2(formCheckClass) {

    return new Promise(function(resolve, reject) {
        $(document).on('input change', '#registration_firstName', function (event) {
            let data = [];
            data.push(
                formCheckClass.validInputLength(
                    this,
                    "#error_firstName",
                    'Ce champ ne doit pas être vide',
                    "Le prénom est trop court",
                    "Trop de caractère",
                    ""
                )
            );

            console.log(formCheckClass.checkBeforeSubmit(formCheckClass.isValidField(data), event, "#register_submit"));

            const isValid = formCheckClass.checkBeforeSubmit(formCheckClass.isValidField(data), event, "#register_submit");

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
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void|boolean}
 */
function checkLastName(formCheckClass, callback) {
    $(document).on('input change focusout', '#registration_lastName', function (event) {
        let data = [];
        data.push(
            formCheckClass.validInputLength(
                this,
                "#error_lastName",
                'Ce champ ne doit pas être vide',
                "Le nom est trop court",
                "Trop de caractère",
                ""
            )
        );

        // return formCheckClass.checkBeforeSubmit(formCheckClass.isValidField(data), event, "#register_submit");
        const isValid = formCheckClass.isValidField(data);
    
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
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void|boolean}
 */
function checkIfSamePasswordWhileWriteIntoInput(formCheckClass, callback) {

    $(document).on('input change focusout', '#registration_password', function (event) {
        let data = [];
        data.push(
            formCheckClass.samePassword(
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

        // return formCheckClass.checkBeforeSubmit(formCheckClass.isValidField(data), event, "#register_submit");
        
        const isValid = formCheckClass.isValidField(data);
    
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
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void|boolean}
 */
function checkIfSameComfirmPasswordWhileWriteIntoInput(formCheckClass, callback) {

    $(document).on('change', '#registration_confirm_password', function (event) {
        let data = [];
        data.push(
            formCheckClass.sameComfirmPassword(
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

        // return formCheckClass.checkBeforeSubmit(formCheckClass.isValidField(data), event, "#register_submit");
    
        const isValid = formCheckClass.isValidField(data);
    
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
 * @param {FormCheckClass} formCheckClass 
 * @param {array} data
 * 
 * @returns {void|boolean}
 */
function checkEmailWhileWriteIntoInput(formCheckClass, callback) {
    $(document).on('input change focusout', async function (event) {
        let data = [];
        data.push(
            await formCheckClass.isEmailExist(
                '#registration_email', 
                '/registration/email/', 
                '#error_email',
                'Cette adresse email est déjà utilisé.', 
                colorOrange, 
                colorOrange
            )
        );

        // return await formCheckClass.checkBeforeSubmitAsync(formCheckClass.isValidField(data), event, "#register_submit");
	
        const isValid = formCheckClass.isValidField(data);
    
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
 * @param {FormCheckClass} formCheckClass 
 * @param {array} data
 * 
 * @returns {void|boolean}
 */
function checkEmailWhileWriteIntoInput2(formCheckClass) {
    $(document).on('input change focusout', async function (event) {
        let data = [];
        data.push(
            await formCheckClass.isEmailExist(
                '#registration_email', 
                '/registration/email/', 
                '#error_email',
                'Cette adresse email est déjà utilisé.', 
                colorOrange, 
                colorOrange
            )
        );

        return formCheckClass.checkBeforeSubmitAsync(formCheckClass.isValidField(data), event, "#register_submit");
	
        // const isValid = formCheckClass.isValidField(data);
    
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
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void|boolean}
 */
function checkEmailAfterSubmit(formCheckClass, callback) {
    $(document).on('submit', '#user-registration-form', async function (event) {
        event.preventDefault();

        // Supprimer le gestionnaire d'événement pour éviter une récursion infinie
        $(document).off('submit', '#user-registration-form');

        const formRegister = $('#user-registration-form');

		let data = [];
        await data.push(
            await formCheckClass.isEmailExist(
                '#registration_email', 
                '/registration/email/', 
                '#error_email',
                'Cette email est déjà utilisé.', 
                colorRed, 
                colorOrange
            ) 
        );

		// return await formCheckClass.checkAfterSubmitAsync(formCheckClass.isValidField(data), event, formRegister, true);
	
        const isValid = formCheckClass.isValidField(data);
    
        if (isValid) {
            callback(true); // Appel du callback avec true en cas de succès
        } else {
            callback(false); // Appel du callback avec false en cas d'échec
        }
    });
}