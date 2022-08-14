# Implémenter un recaptcha dans un symfony


### Dans le controller qui vérifie un formulaire

    // recaptcha à conservé pour prendre exemple
    // Le recaptcha à été mis ici car, il permet de controler si c'est un robot ou pas , 
    // notamanent pour le paiment par virement qui envoie un mail de comfirmation même si c'est un robot
    // et ce serait pas normal. voilà pouquoi le recaptcha à été mis ici

        
    if (empty($request->get('g-recaptcha-response'))) {

        $this->addFlash('alert', $this->renderView('Frontend/Pages/Registration/message-alert.html.twig', ['success' => false, 'message' => 'Vous ête un robot' ]);

        return $this->redirectToRoute('frontend_registration_new');
    }
    else {
        
        $url= "https://www.google.com/recaptcha/api/siteverify?secret=le_code_secret_a_mettre_ici&response={$request->get('g-recaptcha-response')}";
        
        //on vérifie si curl est installé sur le serveur
        if(function_exists('curl_version')){
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($curl);
        }
        else{ 
            $response = file_get_contents($url);
        }

        if(empty($response) || is_null($response)){
            return $this->redirectToRoute('frontend_registration_new');
        }
        else {

            $data = json_decode((string) $response);

            if($data->success == true && $data->score  > 0.5){ 

                // ------------------------------------------------------------------ //
                // Ici le code pour l'envoyer en bdd les données si tout est ok       //
                // ------------------------------------------------------------------ //

            }
            else{

                $this->addFlash('alert', $this->renderView('Frontend/Pages/Registration/message-alert.html.twig', ['success' => false, 'message' => 'Vous ête un robot']));

                return $this->redirectToRoute('frontend_registration_new');
            }
        } 
    }


### Dans un fichier tiwg qui contient un formulaire


    {% block content %}
        <div class="inscription">
            <div class="inscription-exam">
                <h1 class='inscription-exam_title'>Inscription Examen</h1>

                {{ form_start(form, {'attr': {'id': 'examens_part_submit', 'class': '' }}) }}

                    <!-- code du formulaire -->

                    <!-- input du recaptcha -->
                    <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">

                    <div class="row mt-25 center-content">
                        <button type="submit" name="action">
                            S'inscrire
                        </button>
                    </div>

                {{ form_end(form) }}
            </div>
        </div>
    {% endblock %}


    {% block javascripts %}

        <script src="https://www.google.com/recaptcha/api.js?render=6LfZimgdAAAAAKBHbAyep31G2ors3EPK0Ye8az-X"></script>
        <script>
            grecaptcha.ready(function() {
                grecaptcha.execute('la_cle_recaptcha_du_site_a_mettre_ici', {action: 'submit'}).then(function(token) {
                    document.getElementById("g-recaptcha-response").value = token;
                });
            });
        </script>

    {% endblock %}