# [Résolu] Problème second écran, dual boot Windows 10 / Ubuntu 18.04 , driver Nvidia

Lien : https://forum.ubuntu-fr.org/viewtopic.php?pid=22265826#p22265826



- Dans `logiciels et mises à jour` -> `logiciels Ubuntu` -> `Télécharger depuis` mettre l'option `Serveurs pour la France`, 

- Puis dans `Pilotes additionnels`, cochez la case `Utilisation de NVIDIA driver metapackage depuis nvidia-driver-440(propriétaire et testé)` ou `Utilisation de NVIDIA driver metapackage depuis nvidia-driver-510(propriétaire et testé)`

En tous cas utilisez le driver qui contient (propriétaire et testé)

---------------------------------------------------------------------------------------

J'avais déjà essayé avec cette case cochée auparavant mais avec l'option "serveurs pour l'Allemagne". 

Le fait de remettre "serveur pour la France" puis de choisir l'option "Utilisation de X.Org X server - Nouveau display driver disponible depuis xserver-xorg--video-nouveau(libre)", 

puis de revenir sur l'option "Utilisation de NVIDIA driver metapackage depuis nvidia-driver-440(propriétaire et testé)". A résolu mon problème (ne me demandez pas comment).