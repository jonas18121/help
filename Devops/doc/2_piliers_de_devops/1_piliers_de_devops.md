# Les piliers de DevOps

## 5 piliers de DevOps CALMS

- Culture
- Automatisation
- Lean
- Mesure
- Share

### Culture

Le DevOps est avant tout une histoire de `culture` et de `collaboration entre les développeurs et les opérations.`

Mettre en place des processus pour réduire le Time-to-Market, n'est pas suffisant, la culture compte pour plus de la moitié des DevOps.

Il faut une volonté des développeurs et des opérations de travailler ensemble.

Le DevOps résout en premier lieu des problèmes humains, des problèmes de communication et des problèmes de responsabilité entre équipes.

Collaboration avec les dev, les ops, les designers, les chefs de projet et autres pour délivrer un produit de qualité.

La communication peut venir via les afterworks, des sortie d'équipe, invité tous le monde dans les dailytmeeting, etc...

Pollinisation croisée = communication entre equipe et résolution de problème rapidement.

Tous ça renforce le sentiment de travailler en équipe et pas chacuns de leurs côtés.

### Automatisation

Le principal avantages du DevOps est de faire de la livraison continu, c'est pour cela qu'il faut automatiser pour atteindre cette objectif.

Cela au DevOps de faire plus de livraison et de qualité.

#### Premier avantage de l'automatisation est de déployer plus fréquement (CI/CD).

L'exemple d'Amazon qui fait 17 déploiements en production par minute utilise l'automatisation pour faire cela.

Comparer a d'autres entreprises dites traditionnelles qui font 2 ou 3 déploiements en production par années, c'est totalement différent de Amazon.

Autres exemple : Youtube, Instagram, Facebook et Snapchat. Ils ont plusieurs nouvelles fonctionnalités par années car ils font plusieurs déploiements en production par mois.

On le voit avec les shorts (vidéo courte) de youtube, Les réels (vidéo courte) de Instagram et Facebook, pour rester compétitif face à Snapchat.

Dans l'Automatisation, on fait du test,du déploiement, ce sera juste beacoup plus rapide que si on faisait ça manuellement.

#### Deuxième avantage de l'automatisation est la configuration des deploiement automatiquement.

Dans les entreprises dites traditionnelles, les développeurs redigent souvent un manuel de déploiement qui peut être partager sur Drive par exemple.

Avec cette façon de faire, il facile de se tromper lors de déploiement d'une application en ayant oublié une étape, ou l'exécution d'un script ou autres. 

En plus l'erreur est humaine.

C'est ce genre de situation qui va faire que les entreprises dites traditionnelles vont faire 2 ou 3 déploiements en production par années, de peur de cassé quelques chose en production. C'est pour cela aussi qu'ils vont faire le déploiement le soir ou le week end (truc de merde), pour reduire le stress si quelques chose en production .

#### Troisième avantage de l'automatisation est de créer des environnements à la demande.

Avec le DevOps la création d'un environnement de test ou autres ce fait à la demande en quelques minutes.

Si on en n'à plus besoin on peut détruire l'environnement, en utilisant des infrastructures en tant que code (infrastructure as code)(IaC).

voir [définition ici](https://learn.microsoft.com/fr-fr/devops/deliver/what-is-infrastructure-as-code)

#### Quatrième avantage de l'automatisation est de tester plus fréquemment

Dont test ISO prod , qui est la préprod.

c-a-d que le prerod est sur le même envirennement et serveur que la prod.

Afin que l'on puisse voir en preprod les bugs qui pourrais avoir en productin et les corriger avant une mise en production.

### Lean

Lean ou Lean Management, vient de l'industrie automobile, Toyota en 1990 a utilisé le Lean pour éviter le gaspillage.

Les 7 types de gaspillages que Toyota à définit :

- La surproduction
- L'attente
- Le transport
- Les étapes inutiles
- les stocks
- Les mouvements inutiles
- Les corrections/retouches

En DevOps, on va utiliser le type de gaspillage `Les étapes inutiles`.

S'il y a des étapes inutiles lors des procedures de CI/CD on les enlève, on gagnera du temps.

Afin d'éviter des procedures long et couteux pour le client.

#### Le Value Stream Map (VSM)

C'est un outil du Lean Management, qui permet de connaitre les processus prenant du temps et n'apportant pas de valeur ajoutée