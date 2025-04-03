# Vérifier si un email existe dans la BDD avec Ajax et Async/Await

Dans le registration.html.twig 

- L'id du formulaire est `user-registration-form`
- On ce concentre sur l'input email
- L'id de l'input email est `registration_email`
- L'id pour afficher les message d'erreur est `error_email`

```twig
{# registration.html.twig #}

{% extends "base.html.twig" %}

{% block title 'Inscription' %}

{% block stylesheets %}
    {{ parent() }}
    {#{{ encore_entry_link_tags('app') }}#}
{% endblock %}

{% block javascripts %}
    {{ parent() }}
    {#{{ encore_entry_script_tags('app') }}#}
    {{ encore_entry_script_tags('frontend/page-register') }}
    {{ encore_entry_script_tags('frontend/page-register-check') }}
{% endblock %}

{% block body %}

<div class="container">

    <h1 class="">S'inscrire</h1>

    <div class="container_form">

        {{ form_start(formRegistration, { 'attr' : { class: 'form', id: 'user-registration-form' }} ) }}

            {# ... code #}

            <div class="div_form">
                <label for="inputEmail" class="form_label">{{ form_label(formRegistration.email) }}</label>
                <div>
                    {{ form_widget(formRegistration.email, {attr : {class : 'form_input' }} ) }}
                </div>
                <small class="error_input_small" id="error_email">{{ form_errors(formRegistration.email) }} </small>
            </div>

           {# ... code #}

            <div class="form_action">
                <a href="{{ path('app_login')}}">Vous avez un compte ? Connectez-vous</a> 
            </div>

            <button type="submit" class="btn">S'incrire</button>

        {{ form_end(formRegistration) }}
    </div>
</div>
{% endblock body %}
```

Dans securityController.php

- On ce concentre sur la méthode `isEmailExist()`
- `/registration/email/{email}` : est le chemin qui nous permettra d'exécuter la méthode `isEmailExist()` depuis JS/AJAX exemple : `/registration/email/1`
- `if (null !== $userRepository->isEmailExist($email)) {` : On verifie cette methode trouve l'email dans la BDD ou pas
- `return new JsonResponse(['result' => 'error', 'data' => ['isEmailExist' => true]]);` : S'il trouve l'email dans la BDD, il retourne true
- `return new JsonResponse(['result' => 'success', 'data' => ['isEmailExist' => false]]);` : Sinon il retourne false


```php
// securityController.php

namespace App\Controller;

use App\Entity\User;
use App\Manager\UserManager;
use App\Form\RegistrationType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends AbstractController
{
    /**
     *@Route("/registration", name="app_registration")
     */
    public function register(Request $request, UserManager $userManager, UserPasswordEncoderInterface $encoder): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('storage_space_all');
        }

        $user = new User();

        $form = $this->createForm(RegistrationType::class, $user);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            return $userManager->register($user, $encoder);
        }

        return $this->render('security/registration.html.twig', [
            'formRegistration' => $form->createView(),
        ]);
    }

    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('storage_space_all');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        // throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    // TOOLS

    /**
     *@Route("/registration/email/{email}", name="app_registration_user_exist")
     */
    public function isEmailExist(string $email, UserRepository $userRepository): JsonResponse
    {
        if (null !== $userRepository->isEmailExist($email)) {
            return new JsonResponse(['result' => 'error', 'data' => ['isEmailExist' => true]]);
        }

        return new JsonResponse(['result' => 'success', 'data' => ['isEmailExist' => false]]);
    }
}
```

Dans userRepository.php

- La methode `isEmailExist` permet de verifier si l'email qui est en paramètre existe dans le BDD ou pas

```php
// userRepository.php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function isEmailExist(string $email)
    {
        return $this->createQueryBuilder('u')
            ->select('u')
            ->andWhere('u.email = :val')
            ->setParameter('val', $email)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
```

Dans page-register-check.js

- On importe `FormCheckClass`, puis on l'instance
- Puis on appel `checkEmailWhileWriteIntoInput(formCheckClass);` et `checkEmailAfterSubmit(formCheckClass);`

- Dans `checkEmailWhileWriteIntoInput(ormCheckClass);` (vérifier si l'email dans le champ est valide pendant que l'user écrit dans l'input)
    - `$(document).on('input', async function (event) {`
        - `$(document)` : Cela sélectionne l'élément racine du DOM, le document HTML. L'événement "input" sera surveillé sur tout le document.
        - `on()` : de jQuery pour attacher un gestionnaire d'événement à l'événement "input" sur le document. Cela signifie que chaque fois qu'un élément du DOM reçoit un événement "input", ce gestionnaire d'événement sera déclenché. L'événement "input" se produit généralement lorsque l'utilisateur entre des données dans un champ de formulaire ou modifie le contenu d'un élément éditable
        - `async function (event)` : Le code est défini comme asynchrone, ce qui signifie que la fonction gère de manière asynchrone les actions qui peuvent nécessiter du temps, comme des opérations réseau, des requêtes AJAX, etc.
    - `await formCheckClass.isEmailExist(` : methode qui contient de l'AJAX dedans, `await` permet d'attendre que la requête AJAX retourne une réponse.

- Dans `checkEmailAfterSubmit(formCheckClass);` (vérifier si l'email dans le champ est valide après le submit du formulaire)
    - `$(document).on('submit', '#user-registration-form', async function (event) {`
        - `$(document)` : Cela sélectionne l'élément racine du DOM, le document HTML. L'événement "input" sera surveillé sur tout le document.
        - `on('submit', '#user-registration-form', async function (event) {` : Il s'agit de la méthode .on() de jQuery, qui est utilisée pour attacher un gestionnaire d'événement à un ou plusieurs éléments du DOM. Dans cet exemple, l'événement est "submit", ce qui signifie que le gestionnaire sera déclenché lorsque le formulaire est soumis.
            - `submit` : L'événement que vous souhaitez surveiller, dans ce cas, c'est l'événement de soumission d'un formulaire.
            - `#user-registration-form` : Le sélecteur CSS qui spécifie quel formulaire déclenchera cet événement. Dans cet exemple, il s'agit de l'élément de formulaire avec l'ID user-registration-form. Le gestionnaire sera exécuté lorsque ce formulaire est soumis.
            - `async function (event) {` : C'est la fonction de rappel (callback function) qui sera exécutée lorsque l'événement de soumission se produit. Cette fonction de rappel est déclarée comme asynchrone en utilisant le mot-clé async, ce qui signifie que vous pouvez utiliser await à l'intérieur de cette fonction pour gérer des opérations asynchrones.
        - `event.preventDefault();` : Stopper le submit
        - `$(document).off('submit', '#user-registration-form');` Supprimer le gestionnaire d'événement sumbit pour éviter une récursion infinie, comme dans la méthode `checkOnSubmitAsync` on submit avec `form.submit();` sinon ça fera une boucle infinie
            - `.off()` de jQuery pour désactiver un gestionnaire d'événement spécifique.
            - `submit`: C'est le type de l'événement que vous souhaitez désactiver. Dans ce cas, c'est l'événement de soumission de formulaire.
            - `#user-registration-form`: C'est le sélecteur CSS qui spécifie à quel élément vous souhaitez désactiver le gestionnaire d'événement. Plus précisément, c'est l'élément de formulaire avec l'ID user-registration-form auquel vous souhaitez supprimer le gestionnaire d'événement.
        - Pour chaque `await` devant les méthodes qui suis, on attend que la méthode AJAX `isEmailExist()` retourne une réponse


```js
// page-register-check.js

import { FormCheckClass } from '../../form/formCheckClass';

const colorRed = '#dc3545';
const colorGreen = '#28a745';
const colorOrange = '#D07B21';

$(function () {
    const formCheckClass = new FormCheckClass();
    checkEmailWhileWriteIntoInput(formCheckClass);
    checkEmailAfterSubmit(formCheckClass);
});

/**
 *  vérifier si l'email dans le champ est valide pendant que l'user écrit dans l'input
 * 
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void}
 */
function checkEmailWhileWriteIntoInput(formCheckClass) {
    $(document).on('input', async function (event) {
        await formCheckClass.isEmailExist(
            '#registration_email', 
            '/registration/email/', 
            'Cette adresse email est déjà utilisé.', 
            colorOrange, 
            colorOrange
        );
	});
}

/**
 * vérifier si l'email dans le champ est valide après le submit du formulaire
 * 
 * @param {FormCheckClass} formCheckClass 
 * 
 * @returns {void}
 */
function checkEmailAfterSubmit(formCheckClass) {
    $(document).on('submit', '#user-registration-form', async function (event) {
        event.preventDefault();

        // Supprimer le gestionnaire d'événement sumbit pour éviter une récursion infinie
        $(document).off('submit', '#user-registration-form');

        const formRegister = $('#user-registration-form');

		let data = [];
        await data.push(
            await formCheckClass.isEmailExist(
                '#registration_email', 
                '/registration/email/', 
                'Cette email est déjà utilisé.', 
                colorRed, 
                colorOrange
            ) 
        );

		await formCheckClass.checkOnSubmitAsync(formCheckClass.isValidField(data), event, formRegister);
	});
}
```
Dans form-check-function.js

- `findEmailExist` : Requête AJAX qui va retourner une réponse avec une promise qui va permettre d'attendre la réponse (resolve ou reject).
- `isEmailExist` : Méthode qui appel `findEmailExist` et attend sa réponse avec `async/await`

```js
// form-check-function.js

export class FormCheckClass {

    constructor() {
        
    }

    /**
     * @param {string} input : input id
     * @param {string} partUrl : part of the url
     * @param {string} messageError : error message, the field is empty
     * @param {string} temporaryColor : temporary color
     * @param {string} permanentColor : permanent color
     * 
     *  @returns {string}
     */
    async isEmailExist(input, partUrl, messageError, temporaryColor, permanentColor) {
        try {
            const isValid = await this.findEmailExist(input, partUrl, messageError, temporaryColor, permanentColor);
            console.log(isValid); // Obtenez la nouvelle valeur de isValid ici
            return isValid;
        } catch (error) {
            alert('Une erreur s\'est produite : ' + error);
            console.error('Une erreur s\'est produite : ' + error);
            throw error;
        }
    }

    /**
     * @param {string} input : input id
     * @param {string} partUrl : part of the url
     * @param {string} tagError : tag error
     * @param {string} messageError : error message, the field is empty
     * @param {string} temporaryColor : temporary color
     * @param {string} permanentColor : permanent color
     * 
     *  @returns {Promise}
     */
    async findEmailExist(input, partUrl, tagError, messageError, temporaryColor, permanentColor) 
    {
        return new Promise(function(resolve, reject) {
            let email = $(input).val();
            let isValid = false;
            
            if (email !== 'undefined' && email !== undefined && email !== 0 && email !== '') {

                let baseUrl = window.location.origin;
                $.ajax({
                    type: 'GET',
                    url: baseUrl + partUrl + email,
                    success: function (response) {

                        if (response.result == 'success') {
                            $(tagError).text('');

                            isValid = true;
                        } 
                        else {
                            $(tagError).text(messageError)
                            .css('color', temporaryColor)
                            .delay(50000)
                            .queue(function (next) {
                                $(this).css('color', permanentColor);
                                next();
                            });

                            isValid = false;
                        }

                        resolve(isValid);
                    },
                    error: function (xhr, textStatus, error) {
                        alert('Error : ' + xhr.statusText + '.');
                        reject(error);
                        // Use toastr
                        // toastr.error(
                        // 	Translator.trans('js.error_occured', {}, 'javascript') + ' : ' + xhr.statusText + '.',
                        // );
                    },
                    complete: function (data) {
                        // Nothing
                    },
                });
            } 
            else {
                resolve(isValid); // Si l'email est vide, résolvez la promesse avec la valeur actuelle de isValid (false).
            } 
        });       
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
        if (isValid === false) {
            event.preventDefault(); // stop submit
            $('html,body').animate({scrollTop: 0}, 'slow'); // back to top
        }
    }

    /**
     * check if isValid is correct on submit on async
     * 
     * @param {boolean} isValid
     * @param {event} event
     * 
     * @returns {void}
     */
    async checkOnSubmitAsync(isValid, event, form){
        if (isValid === false) {
            event.preventDefault(); // stop submit
            $('html,body').animate({scrollTop: 0}, 'slow'); // back to top
        } else {
            form.submit();
        }
    }

    /**
    * Pour les input de type date
    * input : id de l'input
    * inputError : id de la div pour affiché les message d'erreurs
    * messageError : message d'erreur
    * messageSuccess : message de success
    * messageErrorDateSmall : message d'erreur si la date saisie dans l'input est plus petit que la date du jour 
    */
    validInputDateBirthdate(input, inputError, messageError, messageErrorEmpty, messageSuccess = null, messageErrorDateSmall = null){
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
    validInputDateIdentity(input, inputError, messageError, messageErrorEmpty, messageSuccess = null, messageErrorDateSmall = null){
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
     * Empty value of Input
     * 
     * @param {string[]} elementsInput 
     * 
     * @returns {void} 
     */
    emptyInput(elementsInput) {
        for (let index = 0; index < elementsInput.length; index++) {
            $(elementsInput[index]).val('');
        }
    }

    /**
     * Reset value of select to first option
     * 
     * @param {string[]} elementsSelect 
     * 
     * @returns {void} 
     */
    resetSelect(elementsSelect) {
        for (let index = 0; index < elementsSelect.length; index++) {
            $(elementsSelect[index]).val($(elementsSelect[index] + ' option:first').val());
        }
    }
}
```