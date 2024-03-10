# Installer Ubuntu en dual boot avec windows 10 et Installer une version récente Ubuntu

## Installer Ubuntu en dual boot avec windows 10

- [Installer ubuntu en dual boot avec windows 10 [FR]](https://www.youtube.com/watch?v=zU1ofuogSXQ&list=PLT53YLBLESro8Z3s9AIRRBYGdrlq18HbC&index=1)

1. Télécharger l'image ISO d'Ubuntu : 

- [Dernière version d'Ubuntu sur ubuntu.com](https://ubuntu.com/download/desktop)

2. (Facultative à cette étape) créer une partition pour Ubuntu

Ce n'est pas obliger de faire cette étapte tout de suite 

Mais on peut créer une partition pour Ubuntu en allant dans `Crée et formater des partitions de disque dur` depuis la `Panneau de configuration`

`Panneau de configuration > Crée et formater des partitions de disque dur > Gestions des disques`

Une fois qu'on est dessus on enlève quelques Gigas à windows 

Exemple : 140Go que on laisse en `Non alloué`


3. Télécharger Rufus

- [Rufus](https://rufus.ie/fr/)

Selon le PC ce sera rufus-4.3.exe ou autre chose

4. Lorsque Rufus est installer, lancez le et remplissez les inputs

- Dans l'input `Périphérique` : Choisir la clé USB de minimum 8Go que vos avez prévu pour mettre l'image ISO d'Ubuntu dedans

- Dans l'input `Type de démarrage` : Choisir `image disque ou ISO`

- Dans l'input `SELECTION` : Choisir l'image ISO d'Ubuntu que vos avez téléchargé à l'étape 1. 
    Exemple : ubuntu-22.04.2.0-desktop-amd64

- Vérifiez si votre BIOS pour savoir s'il est `UEFI` ou `BIOS hérité (LEGAGY)`, pour savir cela cherchez `Information système` dans la recherche en bas de Windows
    Vous verrez `Mode BIOS` avec le resultat en face

- Si le BIOS est `UEFI` choisir `GPT` dans l'input `Schéma de partition` sinon choisir `MBR` 

- Dans l'input `Nom de volume` : on laisse le nom par défaut

- On laisse les autres input par défaut

- Puis on clique sur `Demarrer`

- Si une popup s'affiche, cliquez sur `Ecrire en mode Image ISO (Recommandé)` si vous installé Ubuntu 
    sinon si vous installer Kali ou autres chose, cliquez sur `Ecrire en mode Image DD` 

- Si une popup ATTENTION s'affiche, cliquez sur OK

5. On redemarre le PC et on clique sur F10 (pour PC HP) pour accéder au BIOS du PC

6. Dans Le BIOS :

- On va dans `Boot Option` en utilisant les flèches droite gauche du clavier

- Puis on va mettre `Clé USB` en premier avec F5 ou F6 dans `Hard Disk Drive Priority` pour qu' au redémarrage, le PC Boot directement sur la Clé USB

- Puis on va vers l'onglet exit et on clique sur `enregistre et exit` avec F10 ou ENTRER

- Le PC démarre sur la Clé USB

- (Installer GNU GRUB si vous ne l'avez pas)

7. Lorsque le GRUB  s'affiche selectionner `Try or Install Ubuntu`

8. On arrive dans ubuntu

9. Clique sur `French` puis `Install Ubuntu`

10. selectionner le français si on le demande encore

11. Lorsque la popup `Type d'installation` s'affiche, 

- selectionner `Installer Ubuntu à coté de Windows Boot Manager` et clique le bouton `installer maintenant`

- Si vous avez fait l'étape 2, ` clique sur autres chose` puis continuer et choisir `espace libre` qui contient le nombre de Gigas que vous avez alloué a l'étape 2
    - lorsque `espace libre`  est selectionner, clique sur le signe `plus +` qui est en bas 
    - Dans l'input `Point de montage` choisir le slash `/` et clique sur ok 
    - et enfin clique le bouton `installer maintenant`

11. Nouvelle popup `Faut il appliquer les changements sur le disque` et clique sur continuer, 

12. (Facultative) choisir que vous vouler connecter votre wifi

13. Lorsque la popup `TMise à jour et autres logiciels` s'affiche, 

- Choisir `Installation normale`

- Les autres chexbox ne sont pas obligatoire

14. Selectionner Paris et clique sur continuer

15. Puis mettre nom et password

16. Redemarrer, enlever la clé USB et clique sur ENTRER, on ira sur ubuntu

17. On redemarre le PC et on clique sur F10 (pour PC HP) pour accéder au BIOS du PC

- On va dans `Boot Option` en utilisant les flèches droite gauche du clavier

- Puis on va mettre `Demarrage SE` (ou quelque chose comme ça) en premier avec F5 ou F6 dans `Hard Disk Drive Priority` , on valide avec F10

- Puis on va vers l'onglet exit et on clique sur `enregistre et exit` avec F10 ou ENTRER

Bravo !!!

## Installer une version récente Ubuntu lorsqu'il qu'il y a déjà un ubuntu installer

Faire pareil que les instruction ci-dessus avec un petit changement pour l'étape 11 qui est ci-dessous

11. Lorsque la popup `Type d'installation` s'affiche, 

- selectionner `Supprimer Ubuntu et remplacer` et clique le bouton `installer maintenant`

- Si vous avez fait l'étape 2, ` clique sur autres chose` puis continuer et choisir `espace libre` qui contient le nombre de Gigas que vous avez alloué a l'étape 2
    - lorsque `espace libre`  est selectionner, clique sur le signe `plus +` qui est en bas 
    - Dans l'input `Point de montage` choisir le slash `/` et clique sur ok 
    - et enfin clique le bouton `installer maintenant`
