# A quoi sert CI /CD ?

**A quoi sert CI /CD**

L’intégration continue (CI) est un ensemble de pratiques utilisées en génie logiciel consistant à vérifier à chaque modification de code source que le résultat des modifications ne produit pas de régression dans l’application développée.

**C’est quoi l’intégration et le déploiement continu ?**

Dans le processus de développement d’une application, il y a toujours cette petite crainte lors de la mise en production. 

On se dit “est-ce que mon code ne va rien casser ?” ou alors, “est-ce que je suis sûr d’avoir tout bien tester ?”. 

Si déjà qu’individuellement, on n’est pas rassuré, alors pour le responsable d’une équipe de plusieurs de développeurs, c’est encore pire.

Pour diminuer ces craintes, on a tendances à écrire des tests de non régression, qu’on lance sur sa machine pour s’assurer que toute l’application fonctionne. 

Mais encore une fois, rien ne garanti que le développeur fasse bien ces tests avant la mise en production. 

À partir de là, ça devient primordial de mettre en place un processus automatique de test avant toute mise en production.

**Comment se matérialise le processus d’intégration continue ?**

**Le CI/CD fait par un humain.**

En général, le code source de l’application devrait se trouver dans un système de gestion de version (Git, Github, Gitlab…). 

À chaque fois qu’un développeur change le code source de l’application, il envoie ses modifications dans ce système (qu’on appelle le dépôt). 

C’est ensuite au tour de l’administrateur de lire ce code, lancer les tests, s’assurer que les conventions soient bien respectées et de décider de l’envoyer en production ou non. 

Là où c’est humainement possible de le faire pour un ou deux développeurs dans l’équipe, ça devient impossible si ce nombre augmente.

**Le CI/CD fait par un ordinateur.**

L’objectif de l’intégration/déploiement continu est de supprimer l’intermédiaire humain et d’automatiser chaque étapes avant mise en production.

Voir image : CI_CD_infinit.png

**Une boucle classique d’un processus en CI/CD**

Lorsqu’un développeur envoi sur le dépôt des modifications du code source, le processus se met en place et compile le code, le teste, et si tout se passe bien, crée une nouvelle version de l’application (passe de la v1 à la v2 par exemple) et met en production les modifications.

#### Alors, à quoi ça sert concrètement ?

**Un moyen de booster la vitesse de production de code.**

En tant que développeur, lorsque j’ai mis en place la CI/CD, j’ai tout de suite ressenti la différence avec l’ancien processus. 

Alors qu’avant, je lançais toute la suite de tests en local (qui prenaient plusieurs minutes), après je n’avais plus qu’à envoyer mon code sur le dépôt et je recevais une notifications une fois tout le processus terminé.

**Un moyen d’améliorer la réactivité et la résolution de bugs.**

Maintenant que la CI/CD est installée, à chaque fois qu’on va vouloir mettre en production, toute la batterie de tests sera lancée. 

Ça permet de donner plus confiance aux développeurs et à l’entreprise en général sur la qualité du code envoyé en production. 

De plus, vu que la vitesse de mise en production est décuplée, on va également pouvoir corriger les bugs beaucoup plus rapidement.