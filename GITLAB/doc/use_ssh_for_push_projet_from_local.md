# Depuis le local, utiliser le SSH pour pusher un projet vers gitlab

1. Creez vos clé privé et public via ce lien `linux/doc/generer_des_cles_ssh.md` et donner aux clé un nom, exemple : id_gitlab et id_gitlab.pub

2. Ouvrez le dossier .ssh et vérifier si les fichiers id_gitlab et id_gitlab.pub existes

3. Ouvrez le fichier id_gitlab.pub et copiez tout le texte de celui-ci.

4. Accédez à [User setting > SSH Keys](https://gitlab.com/-/profile/keys) de votre profil gitlab 

5. Cliquez sur le bouton `Add new key`

6. Collez le contenu du fichier id_gitlab.pub dans le champ de texte "Key".

7. Cliquez maintenant sur le champ "Titre" ci-dessous. Il sera automatiquement rempli.

8. Cliquez ensuite sur "Add key"

9. Depuis le terminal en local faite :
```bash
git add .

git commit -m "test"

git push origin my_branch
```

Bravo, ça fonctionne !!!