# Tester un recaptchat


## Pour tester 

Il faut utiliser `?invisible=true` à la fin du lien de votre formulaire puis `remplir le formulaire` comme d'habitude et `cliquer sur le bouton submit`

Exemple :

    http://<nom_de_domaine>/inscription/4?invisible=true





## Test de la page de démonstration Google

Important
Suivez les étapes ci-dessous dans la fenêtre Incognito


#### avec le paramètre

Accédez à cette URL https://www.google.com/recaptcha/api2/demo?invisible=true (notez que l'url a un ?invisible=trueparamètre à la fin)

Vous ne devriez voir rien d'autre qu'un formulaire pré-rempli avec un bouton « soumettre » actif sans captcha « case à cocher », à la place, vous verrez le badge en bas à droite.

Cliquez sur le bouton « Envoyer » et vous devriez voir quelque chose comme ceci. C'est le point de contrôle de vérification.

entrez la description de l'image ici4. Sélectionnez l'image appropriée et la page devrait rediriger avec le message indiquant 

la réussite de la vérification... Hourra !

Mais que faire si vous ne voyez aucune image ?

Si vous ne voyez aucune image de vérification et que le formulaire est envoyé avec

Verification Success... Hooray!

alors soit le formulaire ne fonctionne pas (ce n'est généralement pas le cas), soit vous devez vider le cache de votre navigateur et réessayer.

#### sans le paramètre

Accédez à cette URL, https://www.google.com/recaptcha/api2/demo (notez, j'ai supprimé le ?invisible=trueparamètre de l'url)

Vous devriez voir le captcha de la bonne case à cocher 'ol robot' au-dessus du bouton 'Soumettre'.

entrez la description de l'image ici3. Vous pouvez également remarquer qu'il n'y aura pas de badge captcha en bas à droite.

Votre site web

Essayez-le dans la fenêtre de navigation privée

Tout comme la démo, vous devriez obtenir le même résultat sur votre site Web si vous utilisez un captcha invisible. (Ne vous inquiétez pas des paramètres d'URL)

Si votre page affiche le badge captcha en bas à droite, après avoir cliqué sur le bouton « soumettre », vous devriez voir la fenêtre d'image contextuelle.

Si vous n'obtenez aucune fenêtre contextuelle et que le formulaire est envoyé, il y a un problème avec votre captcha ou peut être le cache du navigateur.

Ne pas voir la case à cocher ... ?

Voici quelques notes de la page d'aide de reCaptcha - https://support.google.com/recaptcha#6223828

Si vous voyez ce défi reCAPTCHA, votre environnement de navigateur ne prend pas en charge le widget de case à cocher reCAPTCHA.

Vous pouvez prendre quelques mesures pour améliorer votre expérience :

Assurez-vous que votre navigateur est entièrement mis à jour (voir les exigences minimales du navigateur)

Vérifiez que JavaScript est activé dans votre navigateur

Essayez de désactiver les plugins qui pourraient entrer en conflit avec reCAPTCHA

Veuillez noter que certains sites peuvent avoir été intégrés de manière incorrecte avec reCAPTCHA - dans ce cas, veuillez contacter le webmaster du site.

### Formulaire de contact WordPress 7 utilisateurs

Vous n'avez pas besoin d'ajouter la [recaptcha]balise.

reCAPTCHA v3 n'a pas besoin d'un widget CAPTCHA (la case à cocher « Je ne suis pas un robot » utilisée dans reCAPTCHA v2) pour fonctionner, les balises de formulaire [recaptcha] ne sont donc plus nécessaires. Si des balises de formulaire [recaptcha] sont trouvées dans un modèle de formulaire, Contact Form 7 5.1 ou supérieur les ignore et les remplace par une chaîne vide.

https://contactform7.com/recaptcha/