# Les permissions

[Les permissions](https://doc.ubuntu-fr.org/permissions)

## Voir les permissions

### Graphiquement

Avec [Nautilus (Ubuntu)](https://doc.ubuntu-fr.org/nautilus)

### En ligne de commande

Les droits des fichiers d'un répertoire peuvent être affichés par la commande

```ps
ls -l
```

Les droits d'accès apparaissent alors comme une liste de 10 symboles. :

```ps
drwxr-xr-x
```

Le premier symbole peut être « - », « d », soit « l », entres autres ([toutes les options sur la page permissions Unix sur wikipédia](https://fr.wikipedia.org/wiki/Permissions_UNIX#Norme_POSIX))). Il indique la nature du fichier :

- `-` : fichier classique
- d : répertoire
- l : lien symbolique
- c : périphérique de type caractère
- b : périphérique de type bloc
- p : pipe (FIFO) "tube" ou "tuyau" en anglais ou pipeline aussi en français
- s : socket

Suivent ensuite **3 groupes de 3 symboles chacun**, indiquant si le fichier (ou répertoire) est autorisé en lecture, écriture ou exécution.

Les 3 groupes correspondent, dans cet ordre, **aux droits du propriétaire**, **droits du groupe**, puis **droits du reste des utilisateurs**.

-------------------------------------------------------------------------------------------------------------------------------------------------

Une autre commande très pratique permet de visualiser d'un coup les droits (et les propriétaires) de tous les répertoires parents (voir chemins) d'une ressource spécifique :

```ps
namei -mo mon_chemin
```
retourne :
```ps
f: app/
 drwxrwxr-x jonas jonas mon_chemin
```

-------------------------------------------------------------------------------------------------------------------------------------------------

### Exemple
Reprenons l'exemple théorique précédent :
```ps
drwxr-xr-x
```

Il se traduit de la manière suivante :

- d : c'est un répertoire.
- rwx pour le 1er groupe de 3 symboles : son propriétaire peut lire, écrire et exécuter.
- r-x pour le 2e groupe de 3 symboles : le groupe peut uniquement lire et exécuter le fichier, sans pouvoir le modifier.
- r-x pour le 3ème groupe de 3 symboles : le reste du monde peut uniquement lire et exécuter le fichier, sans pouvoir le modifier.

En pratique, en exécutant la commande suivante :

```ps
ls -l
```

on obtient la liste du contenu du répertoire courant, par exemple :

```ps
drwxr-xr-x   6 cyrille cyrille     4096 2008-10-29 23:09 Bureau
drwxr-x---   2 cyrille cyrille     4096 2008-10-22 22:46 Documents
lrwxrwxrwx   1 cyrille cyrille       26 2008-09-22 22:30 Examples -> /usr/share/example-content
-rw-r--r--   1 cyrille cyrille  1544881 2008-10-18 15:37 forum.xcf
drwxr-xr-x   7 cyrille cyrille     4096 2008-09-23 18:16 Images
drwxr-xr-x   2 cyrille cyrille     4096 2008-09-22 22:45 Modèles
drwxr-xr-x 267 cyrille cyrille    20480 2008-10-27 22:17 Musique
drwxr-xr-x   2 cyrille cyrille     4096 2008-09-22 22:45 Public
drwxr-xr-x   2 cyrille cyrille     4096 2008-10-26 13:14 Vidéos
```

On retrouve dans la première colonne le groupe de 10 caractères permettant de connaître les droits pour chaque fichier.

Par exemple, pour le fichier forum.xcf, on a :

```ps
-rw-r--r--
```

 - Le 1er caractère est **-**,c'est un fichier.
 - Le premier groupe de 3 caractères est **rw-**, le propriétaire a le droit de lecture et écriture (mais pas d'exécution) sur le fichier.
 - Les 2 groupes suivants sont **r--**, Les utilisateurs du groupe et les autres n'ont que le droit de lecture (pas d'écriture, ni d'exécution) .

# Modifier les permissions

## Graphiquement
Dans Nautilus, il vous suffit de changer les valeurs des menus déroulants dans l'onglet permissions.

## En ligne de commande

Un fichier a un propriétaire et un groupe. Nous pouvons les changer.

### chown, pour changer le propriétaire

La commande chown (change owner, changer le propriétaire) permet de changer le propriétaire du fichier. 

Seuls le super-utilisateur ou le propriétaire actuel d'un fichier peut utiliser chown. 

La commande s'utilise de la façon suivante :
```ps
sudo chown toto fichier1
```

### chgrp, pour changer le groupe

La commande chgrp (pour change group) permet de changer le groupe auquel appartient le fichier. 

Tous les membres de ce groupe seront concernés par les permissions du groupe de la 2ème série de rwx. 

Encore une fois, seuls le super-utilisateur ou le propriétaire actuel d'un fichier peut utiliser chgrp (un membre du groupe ne peut pas changer le groupe propriétaire). 

La commande s'utilise de la façon suivante :
```ps
sudo chgrp mesPotes fichier2
```

Le fichier **fichier2** **appartient** maintenant au groupe **mesPotes**. 

Tous les membres du groupe mesPotes auront accès à ce fichier selon les permissions du groupe. 

*Quand l'utilisateur actuel n'est pas le propriétaire actuel du fichier, il sera nécessaire de faire précéder la commande par sudo, puisqu'elle devra être effectuée avec les droits d'administration.*

### chown, pour changer simultanément le propriétaire et le groupe

Pour changer à la fois le propriétaire et le groupe propriétaire, une syntaxe particulière de la commande chown peut être utilisée. 

Encore une fois, seuls le super-utilisateur ou le propriétaire actuel d'un fichier peut utiliser chown (un membre du groupe ne peut pas effectuer de changement de propriété). 

La commande s'utilise de la façon suivante :
```ps
chown nouveau_propriétaire:nouveau_groupe_propriétaire nom_du.fichier
```
*Quand l'utilisateur actuel n'est pas le propriétaire actuel du fichier, il sera nécessaire de faire précéder la commande par sudo, puisqu'elle devra être effectuée avec les droits d'administration.*


-------------------------------------------------------------------------------------------------------------------------------------------------

Imaginons le même fichier foo.txt **possédé par utilisateur1** et appartenant au **groupe propriétaire groupe1**. 

Le propriétaire (utilisateur1) doit devenir **utilisateur2** et la propriété de groupe de ce fichier doit passer au groupe **groupe2**. 

En étant connecté au compte utilisateur1, 

l'exécution de cette commande effectuera l'opération demandée :

```ps
chown utilisateur2:groupe2 foo.txt
```

### chmod, pour changer les droits

L'outil chmod (change mode, changer les permissions) permet de modifier les permissions sur un fichier. 

Il peut s'employer de deux façons : 

- soit en précisant les permissions de manière octale, à l'aide de chiffres1) ; 
- soit en ajoutant ou en retirant des permissions à une ou plusieurs catégories d'utilisateurs à l'aide des **symboles r w et x**, que nous avons présentés plus haut. 

Nous préférerons présenter cette seconde façon ("ajout ou retrait de permissions à l'aide des symboles"), car elle est probablement plus intuitive pour les néophytes. 

Sachez seulement que les deux méthodes sont équivalentes, c'est-à-dire qu'elles affectent toutes deux les permissions de la même manière.

#### En gérant chaque droit séparément

#### En gérant chaque droit séparément

De cette façon, on va choisir :

1) À qui s'applique le changement
- **u** (user, utilisateur) représente la catégorie **"propriétaire"** ;
- **g** (group, groupe) représente la catégorie **"groupe propriétaire"** ;
- **o** (others, autres) représente la catégorie **"reste du monde"** ;
- **a** (all, tous) représente l'ensemble des **trois catégories**.

2) La modification que l'on veut faire
- **+** : ajouter
- **-** : supprimer
- **=** : affectation

3) Le droit que l'on veut modifier
- **r** : read ⇒ lecture
- **w** : write ⇒ écriture
- **x** : execute ⇒ exécution
- **X** : eXecute ⇒ exécution, concerne uniquement les répertoires (qu'ils aient déjà une autorisation d'exécution ou pas) et les fichiers qui ont déjà une autorisation d'exécution pour l'une des catégories d'utilisateurs. Nous allons voir plus bas dans la partie des traitements récursifs l'intérêt du X.

Par exemple, la commande ci-dessous enlèvera le droit d'écriture pour les autres.

```ps
chmod o-w fichier3
```

La commande ci-dessous, ajoutera le droit d'exécution à tout le monde.

```ps
chmod a+x
```

-------------------------------------------------------------------------------------------------------------------------------------------------

On peut aussi combiner plusieurs actions en même temps :

- On ajoute la permission de lecture, d'écriture et d'exécution sur le fichier fichier3 pour le **propriétaire** ;
- On ajoute la permission de lecture et d'exécution au **groupe propriétaire**, on retire la permission d'écriture ;
- On ajoute la permission de lecture **aux autres**, on retire la permission d'écriture et d'exécution.

```ps
chmod u+rwx,g+rx-w,o+r-wx fichier3
```

-------------------------------------------------------------------------------------------------------------------------------------------------

#### En octal

En octal, chaque « groupement » de droits (pour user, group et other) sera représenté par un chiffre et à chaque droit correspond une valeur :

- **r** (read)      = 4
- **w** (write)     = 2
- **x** (execute)   = 1
- **-**             = 0

Par exemple,

- Pour **rwx**, on aura : 4 + 2 + 1 = 7
- Pour **rw-**, on aura : 4 + 2 + 0 = 6
- Pour **r--**, on aura : 4 + 0 + 0 = 4

Ce qui permet de faire toutes les combinaisons :

```ps
    0 : - - - (aucun droit)
    1 : - - x (exécution)
    2 : - w - (écriture)
    3 : - w x (écriture et exécution)
    4 : r - - (lecture seule)
    5 : r - x (lecture et exécution)
    6 : r w - (lecture et écriture)
    7 : r w x (lecture, écriture et exécution)
```

Regardons le répertoire Documents. Ses permissions sont :

En octal, on aura 750 :

```ps
   rwx                    r-x                         ---
 7(4+2+1)               5(4+0+1)                    0(0+0+0)

Propriétaire        Groupe propriétaire            Les autres
```

Pour mettre ces permissions sur le répertoire on taperait donc la commande :

```ps
chmod 750 Documents
```

### Récursivement

Pour chacune de ces commandes, on peut les lancer récursivement sur un répertoire. 

C'est à dire que l'action sera effectuée sur le répertoire désigné et sur tous les fichiers ou répertoires qu'il contient. 

Ceci se fait en ajoutant l'option -R 

**Attention! Un chmod -R mal employé peut rendre votre système définitivement inutilisable.**

[Voir chmod -R /](https://doc.ubuntu-fr.org/faq_forum#ubuntu_ne_boot_plus_apres_un_sudo_chmod_-r_sur)

Par exemple, la commande ci-dessous donnera tous les droits au propriétaire, les droits de lecture et exécution au groupe et aucuns droits aux autres:

```ps
chmod -R 750 monRépertoire 
```

-------------------------------------------------------------------------------------------------------------------------------------------------

### Exemple d'application traitant différemment les répertoires et les fichiers

En effet, si les **répertoires doivent obligatoirement avoir la permission x pour pouvoir être ouverts**, 

la permission **x est inutile pour les fichiers non exécutables** et peut être gênante pour les fichiers textes (txt, html…) 

car dans ce cas lorsqu'on les ouvre on aura à chaque fois un message demandant si on veut les ouvrir ou les lancer (comme exécutable). 

Bref le droit **x** est à réserver aux seuls fichiers qui sont vraiment des exécutables.

**Application 1** :

Soit un répertoire monrep, contenant des sous-répertoires et des fichiers. Les droits sont drwx—— (700) pour les répertoires et -rw——- (600) pour les fichiers.

On veut ajouter récursivement les mêmes droits (resp. rwx et rw) pour le groupe. C'est à dire qu'on veut aboutir à la situation suivante : drwxrwx— (770) pour les répertoires et -rw-rw—- (660) pour les fichiers.

- Si on lance chmod -R 770 monrep : les fichiers vont avoir les droits d'exécution → **mauvais** 

- Si on lance chmod -R 660 monrep : les répertoires n'auront plus les droits d'exécution → **catastrophique** 

- Si on lance chmod -R g+rwx monrep : les fichiers vont avoir les droits d'exécution → **mauvais** 

- Si on lance chmod -R g+rwX monrep : seuls les répertoires (et les fichiers déjà exécutables) auront les droits d'exécution → **bon** 


**Application 2** :

Imaginons que précédemment on ait lancé la commande chmod -R 770 monrep. La situation est la suivante : 
 - les droits sont drwxrwx— (770) pour les répertoires et -rwxrwx—- (770) pour les fichiers.

On désire supprimer les droits d'exécution uniquement sur les fichiers. C'est à dire qu'on veut aboutir à la situation suivante : 
 - drwxrwx— (770) pour les répertoires et -rw-rw—- (660) pour les fichiers.

Comme chmod s'applique à la fois aux fichiers et répertoires, nous allons jongler avec x et X. Il faut enlever x puis ajouter X.

Si on lance chmod -R u-x+X,g-x+X monrep cela n'aura aucun effet car X concerne à la fois les répertoires ET les fichiers qui ont un x quelque part. Donc si u-x enlève le premier x (ce qui donne -rw-rwx—), la suite +X va aussitôt remettre un x car il reste un x (celui du groupe !).

Donc il faut d'abord enlever tous les x : u-x,g-x avant de les remettre (sera fait uniquement pour les répertoires cette fois) ce qui donne finalement :

```ps
chmod -R u-x,g-x,u+X,g+X monrep
```

### Droits spéciaux

Les droits sont parfois spécifiés avec 4 chiffres, comme file_mode=0777. Ce premier chiffre ajouté devant peut permettre de définir : tapez en ligne de commande :
```ps
ls -l /usr/bin
```

Vous devez voir dans la liste des noms de fichiers sur fond rouge ou jaune et des droits du type ci-dessous ou s (special2)) vient remplacer le x
```ps
-rwsr-xr-x  1 root   root     155008 févr. 10  2014 sudo*
-rwxr-sr-x  1 root   ssh      284784 mai   12  2014 ssh-agent*
```

le bit Set-User-ID permet à un utilisateur d'exécuter le programme avec les droits du propriétaire, c'est ainsi que sudo nous permet d'exécuter des commandes en "root"

le bit Set-Group-ID idem que le User-ID mais par rapport au groupe

le bit restriction de suppression ou Sticky permet quant à lui de restreindre la suppression d'un fichier ou répertoire à son seul propriétaire. C'est le cas du répertoire /tmp :
```ps
ls -ld /t*/
drwxrwxrwt   2 root root  4096 nov.  28 13:17 tmp/
```

le *t* au lieu du x pour les autres utilisateurs nous informe que ce répertoire ne peut être supprimé que par l'utilisateur root Comme pour les autres permissions, vous pouvez cumuler les activations en additionnant le code pour chacun, ainsi pour activer le sticky bit et le GroupID sur votre script renomme_mes_photos.sh, vous réalisez un :
```ps
chmod 3777 renomme_mes_photos.sh
```