# Comment afficher un `<select>` (« childSelect ») uniquement lorsque l’utilisateur a choisi une valeur non vide dans un autre `<select>` (« parentSelect ») 

## 2 Manières de faire cela, 

- Soit en ayant le 2èmes champs afficher au début du formulaire des avec valeurs vide 
- Soit en ayant le 2èmes champs qui n'ait pas afficher au début du formulaire  

Dans le fichier `user_update.html.twig`

- Le select **situation** dépend de ce qu'on choisit dans le select **gender**
- Le select **typeOfContract** n'apparait pas à l'affichage du formulaire si on n'a pas encore choisit la valeur `employe` dans le select **professional**  
- Le select **typeOfContract** apparait et dépend de ce qu'on choisit dans le select **professional**
- Balise script avec type `module` pour accepter que des fichiers JS puisse être importer dans dans fichiers JS

```twig
{# user_update.html.twig #}

{% block javascripts %}
    {{ parent() }}
    <script type="module" src="/js/frontend/user/user.js"></script>
{% endblock %}

{% block body %}
    {# autres codes ... #}

    <div class="container_form_element">
        <div>
            <label for="user_gender" class="form_label">Genre</label>
            {{ form_widget(formUser.gender, {attr : {class : 'form_input' }} ) }}
        </div>
        <small class="error_input_small">{{ form_errors(formUser.gender) }}</small>
    </div>

    <div class="container_form_element">
        <div id="container_user_situation">
            <label for="user_situation" class="form_label">Situation familiale</label>
            {{ form_widget(formUser.situation, {attr : {class : 'form_input' }} ) }}
        </div>
        <small class="error_input_small">{{ form_errors(formUser.situation) }}</small>
    </div>

    <div class="container_form_element">
        <div id="container_user_professional">
            <label for="user_professional" class="form_label">Situation professionnel</label>
            {{ form_widget(formUser.professional, {attr : {class : 'form_input' }} ) }}
        </div>
        <small class="error_input_small">{{ form_errors(formUser.professional) }}</small>
    </div>

    {% if formUser.typeOfContract is defined %}
        <div class="container_form_element">
            <div id="container_user_typeOfContract">
                <label for="user_typeOfContract" class="form_label">Type de contrat</label>
                {{ form_widget(formUser.typeOfContract, {attr : {class : 'form_input' }} ) }}
            </div>
            <small class="error_input_small">{{ form_errors(formUser.typeOfContract) }}</small>
        </div>
        {% else %}
        <div class="container_form_element">
            <div id="container_user_typeOfContract"></div>
        </div>
    {% endif %}
{% endblock body %}
```

Dans le fichier `user.js`

- Fichier d'execution JS

- On importe `userClass.js`, on utilise sa classe pour appelé ses méthodes **getSituations()** et **getTypeOfContract**

```js
// user.js

"use strict";

import { UserClass } from './userClass.js';

const userClass = new UserClass();

// Permet d'obtenir une liste de situation dans un champ de selection
document.addEventListener('DOMContentLoaded', function () {
    // Références aux éléments
    const gender = document.getElementById('user_gender');
    const situation = document.getElementById('user_situation');

    userClass.getSituations(gender, situation);
});

// Permet d'obtenir une liste de Type de contrat dans un champ de selection
document.addEventListener('DOMContentLoaded', function () {
    // Références aux éléments
    const professional = document.getElementById('user_professional');
    const typeOfContract = document.getElementById('user_typeOfContract');

    userClass.getTypeOfContract(professional, typeOfContract);
});
```

Dans le fichier `userClass.js`

- Fichier de définition JS

- Dans la méthode **getSituations**
    - On ajoute un écouteur sur le select **gender**
    - **selectedGender** récupère le **gender** qui a été selectionné
    - On vide d'abord l'ancien contenu du champ select **situation**
    - On appel une méthode du controler en requète Ajax avec **fetch()** via le path
    - **Object.entries(data)** Transforme un objet JavaScript en tableau de paires `[clé, valeur]`
    - **.forEach(([label, value]) => { ... })** Pour chaque entrée du tableau `[clé, valeur]`, on exécute le code ci-dessous
    - **document.createElement('option');** Crée un élément HTML `<option>` vide.
    - **option.value = value;** Définit la valeur que cette option va soumettre dans le formulaire.
    - **option.textContent = label;** Définit le texte visible par l’utilisateur dans la liste déroulante.
    - **situation.appendChild(option);** Ajoute cette option au `<select>` HTML du champ select **situation**.

- Dans la méthode **getTypeOfContract**
    - On ajoute un écouteur sur le select **professional**
    - **selectedProfessional** récupère le **professional** qui a été selectionné
    - On récupère la balise qui contient l'id **container_user_typeOfContract**
    - On vide d'abord l'ancien contenu du champ select **typeOfContract**, au cas ou s'il existe déjà
    - Si la valeur **employe** est sélectionnée en valeur de Situation professionnel, on peut rentrer dans la condition `if (selectedProfessional && EMPLOYE === selectedProfessional) {`
    - On passe à la création du label de **typeOfContract**
    - On passe à la création du select de **typeOfContract**
    - On appel une méthode du controler en requète Ajax avec **fetch()** via le path
    - **Object.entries(data)** Transforme un objet JavaScript en tableau de paires `[clé, valeur]`
    - **.forEach(([label, value]) => { ... })** Pour chaque entrée du tableau `[clé, valeur]`, on exécute le code ci-dessous
    - **document.createElement('option');** Crée un élément HTML `<option>` vide.
    - **option.value = value;** Définit la valeur que cette option va soumettre dans le formulaire.
    - **option.textContent = label;** Définit le texte visible par l’utilisateur dans la liste déroulante.
    - **situation.appendChild(option);** Ajoute cette option au `<select>` HTML du champ select **typeOfContract**.

```js
// userClass.js

"use strict";

export class UserClass {
    
    constructor() {
        
    }

    /**
     * Permet d'obtenir une liste de situation dans un champ de selection
     * 
     * @param {String} gender 
     * @param {String} situation 
     * 
     * @returns {void}
     */
    getSituations(gender, situation) 
    {
        // Écouteur sur le select gender
        gender.addEventListener('change', function() {
            const selectedGender = this.value;   
            
            // Si un genre est sélectionnée, on continu dans le if
            if (selectedGender) {
                // On vide d'abord l'ancien contenu
                situation.innerHTML = '';

                // Ajax appel le controler
                fetch(`/user/ajax/get/situations?gender=${selectedGender}`)
                .then(response => response.json())
                .then(data => {
                    Object.entries(data).forEach(([label, value]) => {
                        const option = document.createElement('option');
                        option.value = value;
                        option.textContent = label;
                        situation.appendChild(option); // Fournit les options dans le HTML
                    });
                });
            } 
        });
    }

    /**
     * Permet d'obtenir une liste de type de contrat dans un champ de selection
     * 
     * @param {String} professional 
     * 
     * @returns {void}
     */
    getTypeOfContract(professional) 
    {
        const EMPLOYE = 'employe';

        // Écouteur sur le select professional
        professional.addEventListener('change', function() {
            const selectedProfessional = this.value;   
            const containerTypeOfContract = document.getElementById('container_user_typeOfContract');

            // Réinitialise le contenu du container
            containerTypeOfContract.innerHTML = '';

            // Si employe est sélectionnée en valeur de Situation professionnel, on continu dans le if
            if (selectedProfessional && EMPLOYE === selectedProfessional) {
                // Création du label
                const label = document.createElement("label");
                label.setAttribute("for", "user_typeOfContract");
                label.classList.add("form_label");
                label.textContent = "Type de contrat";

                // Création du select
                const typeOfContract = document.createElement("select");
                typeOfContract.name = "user[typeOfContract]";
                typeOfContract.id = "user_typeOfContract";
                typeOfContract.classList.add("form_input");

                // Ajax appel le controler
                fetch(`/user/ajax/get/typeOfContract?professional=${selectedProfessional}`)
                .then(response => response.json())
                .then(data => {
                    Object.entries(data).forEach(([label, value]) => {
                        const option = document.createElement('option');
                        option.value = value;
                        option.textContent = label;
                        typeOfContract.appendChild(option); // Fournit les options dans le HTML
                    });
                });

                // Insertion dans le DOM
                containerTypeOfContract.append(label);
                containerTypeOfContract.appendChild(typeOfContract); 
            } 
        });
    }
}
```

Dans le fichier `UserAccountController.php`

- Rien de particulier dans la méthode **update()**
- **ajaxGetSituations** est la méthode qui est appelé en ajax
    - **$request->query->get('gender')** récupère le **gender** qui à été sélectionné
    - Dans **JsonResponse($situations[$gender] ?? []);** on récupère la liste de **situation** en fonction du **gender** sélectionné et on retourne en Json
    - La table **$situations** peut être remplacer par une appel à la BDD

- **ajaxGetTypeOfContracts** est la méthode qui est appelé en ajax
    - **$request->query->get('professional')** récupère le **professional** qui à été sélectionné
    - Dans **JsonResponse($situations[$professional] ?? []);** on récupère la liste de **typeOfContracts** en fonction du **professional** sélectionné et on retourne en Json
    - La table **$typeOfContracts** peut être remplacer par une appel à la BDD

```php
// UserAccountController.php

namespace App\Controller\Frontend;

use App\Entity\User;
use App\Form\UserType;
use App\Manager\UserManager;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class UserAccountController extends AbstractController
{
    #[Route(
        'user/update', 
        name: 'app_user_update', 
        methods: ["GET", "PUT"]
    )]
    public function update(
        Request $request,
        UserManager $userManager
    ): Response 
    {
        /** @var User|null */
        $user = $this->getUser();

        if (!$user) {
            return $this->redirectToRoute('app_home_page');
        }

        $form = $this->createForm(
            UserType::class, 
            $user, 
            [
                'method' => 'PUT',
                'window_user' => 'frontend'
            ]
        );

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userManager->update($user);

            // add flash
            $this->addFlash(
                'success',
                'Votre compte a bien été modifié'
            );

            // Redirection
            return $this->redirectToRoute('app_user_detail', ['id' => $user->getId()]);
        }

        return $this->render('frontend/user/user_update.html.twig', [
            'formUser' => $form->createView(),
        ]);
    }

    // autres codes ...

    /* ======================== Partie AJAX ======================== */ 

    #[Route(
        'user/ajax/get/situations', 
        name: 'app_user_ajax_get_situations'
    )]
    public function ajaxGetSituations(
        Request $request
    ): JsonResponse
    {
        $gender = $request->query->get('gender');

        $situations = [
            'non_selection' => [
                'Choisir un genre avant de choisir une situation' => '',
            ],

            'homme' => [
                'Célibataire' => 'celibataire',
                'Concubinage' => 'concubinage',
                'pacsé' => 'pacse',
                'Marié' => 'marie',
            ],

            'femme' => [
                'Mariée' => 'marie',
                'pacsée' => 'pacse',
                'Concubinage' => 'concubinage',
                'Célibataire' => 'celibataire',
            ],

            'non_binaire' => [
                'Polyamour' => 'polyamour',
                'Célibataire' => 'celibataire',
                'Concubinage' => 'concubinage',
                'pacsé' => 'pacse',
                'Marié' => 'marie',
            ],
        ];

        return new JsonResponse($situations[$gender] ?? []);
    }

    #[Route(
        'user/ajax/get/typeOfContract', 
        name: 'app_user_ajax_get_type_of_contract'
    )]
    public function ajaxGetTypeOfContracts(
        Request $request
    ): JsonResponse
    {
        /** @var string $professional */
        $professional = $request->query->get('professional');

        /** @var array $typeOfContracts */
        $typeOfContracts = [
            'non_selection' => [
                'Choisir un genre avant de choisir une situation' => '',
            ],

            'employe' => [
                'CDI' => 'cdi',
                'CDD' => 'cdd',
                'Interim' => 'interim'
            ],
        ];

        return new JsonResponse($typeOfContracts[$professional] ?? []);
    }
}
```

Dans le fichier `UserType.php`

- Dans **getSituationFamily**
    - On définit `gender` et `situation` (`situation` avec **choices** vide par défaut) dans le formulaire du user
    - Dans **$formUpdateGender** 
        - On permet a symfony de connaitre la liste de valeur dans le **choices** du champ select `situation`
        - La variable **$situations** peut être remplacer par une appel à la BDD
    - Le code qui contient **FormEvents::PRE_SET_DATA** permet d'ajouter la lise de `situation` dans le champ select `situation` après le chargement de la page, si un gender à été choisit,
    - Le code qui contient  **FormEvents::PRE_SUBMIT,** permet d'ajouter la lise de `situation` dans le champ select `situation` après le clique sur submit (et donc avant event submit)
    - Ces 2 events sont là pour que symfony puisse accepter le choix lors de la validation, sinon il y aura une erreur select invalide, comme les options du champ select `situation` sont changés dynamiquement

- Dans **getTypeOfContract**
    - On définit `professional` dans le formulaire du user
    - `typeOfContracts` n'apparaitg pas dans le premier affichage du formulaire si on n'a pas choisit la valeur `employe` dans `professional` précedement
    - Dans **$formUpdateProfessional** 
        - On permet a symfony de connaitre la liste de valeur dans le **choices** du champ select `typeOfContracts`
        - La variable **$typeOfContracts** peut être remplacer par une appel à la BDD
    - Le code qui contient **FormEvents::PRE_SET_DATA** permet d'ajouter la lise de `typeOfContracts` dans le champ select `typeOfContracts` après le chargement de la page, si un gender à été choisit,
    - Le code qui contient  **FormEvents::PRE_SUBMIT,** permet d'ajouter la lise de `typeOfContracts` dans le champ select `typeOfContracts` après le clique sur submit (et donc avant event submit)
    - Ces 2 events sont là pour que symfony puisse accepter le choix lors de la validation, sinon il y aura une erreur select invalide, comme les options du champ select `typeOfContracts` sont changés dynamiquement

```php
// UserType.php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        // ===== Champs de base ===== //
        $builder
            ->add('email')
            ->add('firstName')
            ->add('lastName')
            ->add('phoneNumber')
        ;

        // ===== Champs password ===== //
        if (
            array_key_exists('use_password',$options) 
            && isset($options['use_password']) 
            && 'use_password' === $options['use_password']
        ) {
            $builder->add('password');
        }

        // ===== Champs spécifique à la partie Frontend ===== //

        if (
            array_key_exists('window_user',$options) 
            && isset($options['window_user']) 
            && 'frontend' === $options['window_user']
        ) {
            /** @var FormBuilderInterface $builder */
            $builder = $this->getSituationFamily($builder);

            /** @var FormBuilderInterface $builder */
            $builder = $this->getTypeOfContract($builder);
        }

        // ===== Champs spécifique à la partie Backend ===== //
        if (
            array_key_exists('window_user',$options) 
            && isset($options['window_user']) 
            && 'backend' === $options['window_user']
        ) {
            $builder->add('isVerified', CheckboxType::class);
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'window_user' => null,
            'use_password' => null
        ]);
    }

    // ============ Custom Methode ============ //

    /**
     * Affiche le champ select situation familiale en fonction du choix du champ select genre
     */
    public function getSituationFamily(FormBuilderInterface $builder): FormBuilderInterface
    {
        $builder
            ->add('gender', ChoiceType::class, [
                'choices' => [
                    'Sélectionner un genre' => 'non_selection',
                    'Homme' => 'homme',
                    'Femme' => 'femme',
                    'Non binaire' => 'non_binaire',
                ],
                'required' => false
            ])
            ->add('situation', ChoiceType::class, [
                'placeholder' => 'Sélectionner une situation',
                'choices' => [],
                'required' => false
            ])
        ;

        // Permet à Symfony de connaitre les options du champ select situation qui ont été modifier dynamiquement
        // Car si Symfony ne les connaient pas, il ne va pas les considérer comme valide
        $formUpdateGender = function (FormEvent $event) : void {
            /** @var string $choiceGender */
            $choiceGender = $event->getData();
            /** @var FormInterface $form */
            $form = $event->getForm()->getParent();

            if (
                null !== $choiceGender 
                && 'non_selection' !== $choiceGender
            ) {
                $situations = [
                    'Choisir un genre avant de choisir une situation' => '',
                    'Polyamour' => 'polyamour',
                    'Célibataire' => 'celibataire',
                    'Concubinage' => 'concubinage',
                    'pacsé' => 'pacse',
                    'Marié' => 'marie',
                ];

                $form->add('situation', ChoiceType::class, [
                    'choices' => $situations,
                    'required' => false
                ]);
            }
        };

        // Ajoute la liste de situation dans le champ select situation après le chargement de la page, si un gender à été choisit,
        // afin de lister les options dans le selecteur situation, 
        // pour que symfony puisse accepter le choix lors de la validation
        $builder->get('gender')->addEventListener(
            FormEvents::PRE_SET_DATA,
            function (FormEvent $event) use ($formUpdateGender) {
                /** @var string|null $gender */
                $gender = $event->getData();
                if (null !== $gender) {
                    $formUpdateGender($event);
                }
            }
        );

        // Ajoute la liste de situation dans le champ select situation après le clique sur submit,
        // afin de lister les options dans le selecteur situation, 
        // pour que symfony puisse accepter le choix lors de la validation
        $builder->get('gender')->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) use ($formUpdateGender) {
                /** @var string|null $gender */
                $gender = $event->getForm()->getData();
                if (null !== $gender) {
                    $formUpdateGender($event);
                }
            }
        );

        return $builder;
    }

    /**
     * Affiche le champ select Type de contrat en fonction du choix du champ select Situation professionnel
     * 
     * Select Situation professionnel (Employé, Chômage, Retraité) et Type de contrat (CDI, CDD, Interim)
     * Le select Type de contrat s'affiche uniquement si la valeur de la Situation professionel est Employé
     */
    public function getTypeOfContract(FormBuilderInterface $builder): FormBuilderInterface
    {
        $builder
            ->add('professional', ChoiceType::class, [
                'choices' => [
                    'Sélectionner un genre' => 'non_selection',
                    'Employé' => 'employe',
                    'Chômeur' => 'chomeur',
                    'Retraité' => 'retraite',
                    'Autres' => 'autres',
                ],
                'required' => false
            ])
        ;

        // Permet à Symfony de connaitre les options du champ select "Type de contrat" qui ont été modifier dynamiquement
        // Car si Symfony ne les connaient pas, il ne va pas les considérer comme valide
        $formUpdateProfessional = function (FormEvent $event) {
            /** @var string $choiceProfessional */
            $choiceProfessional = $event->getData();
            /** @var FormInterface $form */
            $form = $event->getForm()->getParent();

            if (
                null !== $choiceProfessional 
                && 'non_selection' !== $choiceProfessional
            ) {
                $typeOfContracts = [
                    'Choisir un genre avant de choisir une situation' => '',
                    'Interim' => 'interim',
                    'CDI' => 'cdi',
                    'CDD' => 'cdd'
                ];

                $form->add('typeOfContract', ChoiceType::class, [
                    'choices' => $typeOfContracts,
                    'required' => false
                ]);
            }
        };

        // Ajoute la liste de "Type de contrat" dans le champ select typeOfContract après le chargement de la page, si un gender à été choisit,
        // afin de lister les options dans le selecteur typeOfContract, 
        // pour que symfony puisse accepter le choix lors de la validation
        $builder->get('professional')->addEventListener(
            FormEvents::POST_SET_DATA,
            function (FormEvent $event) use ($formUpdateProfessional) {
                /** @var string|null $professional */
                $professional = $event->getData();

                if (
                    null !== $professional
                    && 'employe' === $professional
                ) {
                    $formUpdateProfessional($event);
                }
            }
        );

        // Ajoute la liste de "Type de contrat" dans le champ select typeOfContract après le clique sur submit,
        // afin de lister les options dans le selecteur typeOfContract, 
        // pour que symfony puisse accepter le choix lors de la validation
        $builder->get('professional')->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) use ($formUpdateProfessional) {
                /** @var string|null professional */
                $professional = $event->getData();
                
                if (
                    null !== $professional
                    && 'employe' === $professional
                ) {
                    $formUpdateProfessional($event);
                }
            }
        );

        return $builder;
    }
}
```