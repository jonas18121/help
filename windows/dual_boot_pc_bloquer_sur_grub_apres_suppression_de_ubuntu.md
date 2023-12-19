# Résoudre le PC bloqué sur la page Grub après suppression du Dual-Boot Linux

- [Comment désinstaller et supprimer Linux d’un Dual-Boot](https://www.malekal.com/comment-desinstaller-et-supprimer-linux-dual-boot/)

Lorsque vous supprimez la partition Linux et redémarrez le PC, le démarrage du PC reste bloqué sur la page Grub.
Cela vient du fait que le PC tente de démarrer sur l’entrée Linux, charge Grub mais que les données ne sont plus accessibles.

Pour résoudre cela, il suffit de placer Windows Boot Manager en premier dans l’ordre de démarrage :

Accédez au BIOS / Setup du PC : Comment accéder au BIOS d’un PC UEFI ou Legacy

Puis accédez au menu BIOS

Déplacez Windows Boot Manager avant l’entrée Linux

Puis allez dans le menu Save & Exit pour enregistrer les modifications du BIOS

Le PC doit démarrer directement sur Windows 10 ou Windows 11

A partir de là, supprimez l’entrée Linux avec Visual BCD Editor comme expliqué en début de tutoriel