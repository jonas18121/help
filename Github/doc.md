# Pour créer un jeton GitHub OAuth, suivez ces étapes :

1. **Connectez-vous à votre compte GitHub :** Assurez-vous d'être connecté à votre compte GitHub où vous souhaitez générer le jeton.

2. **Accédez à vos paramètres personnels :** Cliquez sur votre photo de profil en haut à droite de la page GitHub, puis sélectionnez "Settings" (Paramètres) dans le menu déroulant.

3. **Accédez à la section "Developer settings" :** Sur la page des paramètres, dans la barre latérale de gauche, cliquez sur "Developer settings".

4. **Accédez à la section "Personal access tokens" :** Dans la section "Access tokens" (Jetons d'accès), cliquez sur "Generate token" (Générer le jeton).

5. **Remplissez les détails du jeton :** Vous serez redirigé vers une page où vous pourrez remplir les détails du jeton. Assurez-vous de donner un nom significatif au jeton et de sélectionner les permissions appropriées en fonction de ce que vous avez besoin de faire avec Composer.

6. **Générez le jeton :** En bas de la page, cliquez sur le bouton "Generate token" (Générer le jeton).

7. **Copiez le jeton :** Après la génération, GitHub affichera le jeton. Copiez-le immédiatement et assurez-vous de le stocker en lieu sûr. Notez que vous ne pourrez plus le voir.

8. Une fois que vous avez votre jeton, vous pouvez l'utiliser lors de l'authentification avec Composer
Vous pouvez l'ajouter manuellement en utilisant "

```bash
composer config --global --auth github-oauth.github.com <your_token>
```