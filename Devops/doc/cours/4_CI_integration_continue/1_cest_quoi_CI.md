# C'est quoi Continuous Intégration - Continuous Delivery et Continuous Deployment

Voir le PDF ci+cd+cd.pdf



**CI (Continuons Integration)** = DEV + QA

- **DEV** = Le developpeur fait son code et ses tests (unitaires, fonctionnels) puis push sur gitlab ou github.

- **QA** = autres test que tests (unitaires, fonctionnels) exemple test fixcer et phpstan

**CD (Continuons Delivery)** = CI (Continuons Integration) + Staging

- **Staging** = deployer dans un environnement ISO prod (c-a-d qui est configurer comme la prod et sur le même serveur) afin de testeravant d'envoyer en prod

**CD (Continuons Deployment)** = CD (Continuons Delivery) + envoyer en prod 





----------------------------------------------------------------------------------------------

## Quelle est la différence entre Continuous Delivery et Continuous Deployment ?

### Quelle est la différence entre Continuous Delivery et Continuous Deployment ?

**Définition du Continuous Delivery**

Le continuous delivery (livraison continue) est une technique d’ingénierie informatique qui consiste à tester, préparer et déployer un changement de code. 

Une validation humaine finale sera à réaliser avant le déploiement final.

**Définition du Continuous Deployment**

Le continuous deployment (déploiement continu) est une technique d’ingénierie informatique similaire au continuous delivery ; mais ici le déploiement s’automatise sans validation en amont. 

Le système est capable de faire un rollback automatique si des erreurs bloquantes sont repérées.

**Continuous Delivery et Continuous Deployment**
Voici un schéma simplifié qui vous permettra de bien comprendre la nuance entre ces deux notions ; il permettra également de situer la notion d’intégration continue (continuous integration) au sein de ces deux techniques d’ingénierie.

voir image difference_cd_cd.png




continuous delivery et continuous deployment

### Différence entre Continuous Delivery et Continuous Deployment

La principale différence entre le continuous delivery et le déploiement continue se situe au moment de faire le déploiement en production. 

Souvent les acteurs qui font du déploiement continue mettent en place un analyseur d’erreur qui peut automatiquement prendre la décision de faire un rollback (pratique moins fréquente en livraison continue).

Pourquoi tout automatiser ?
Si cela se voit moins dans les petites structures, les mises en production peuvent prendre beaucoup de temps dans les grosses structures. 

Certaines parlent de mobiliser une équipe pendant plusieurs heures. Si cela à un coût considérable, c’est aussi un frein pour faire des mise en production régulières.

Il sera donc préférable d’automatiser la livraison de modification afin de pouvoir augmenter sa cadence de mise en production et de ne plus avoir besoin d’équipes pour faire cela. C’est à ce moment là que le continuous delivery ou le continuous deployment intervient.

Aujourd’hui il existe de nombreux tests (unitaires, fonctionnels, de qualité de code, de charges…) qui permettent d’assurer au maximum cette automatisation. 

Certains vont jusqu’à automatiser d’éventuels rollback en production basés sur les logs d’erreurs.

Pour ceux qui on connu ce type d’environnement, dans certaines entreprises qui ont encore aujourd’hui un lourd legacy, elles ont parfois des mises en production dangereuses par ses manipulations ; des erreurs peuvent vite arriver à cause la complexité de celles-ci. Automatiser va permettre d’éviter les erreurs humaines.

On en déduira ainsi deux objectifs principaux :

- Automatisation des livraisons avec un concept de déclencher tout le processus en un seul clic. Le risque d’erreur humaine que l’on pouvait avoir disparait.

- Livraisons fréquentes car l’automatisation permet de livrer en un seul clic. Ca s’adapte parfaitement aux équipes Agile.

### L’intégration continue pour renforcer nos déploiements
Comme vous le voyez sur le schéma voir image difference_cd_cd.png, il est obligatoire de faire de nombreux tests dans ces techniques d’ingénieries.

**Tests unitaires**
Ajoutez des tests unitaires sur chacune de vos fonctions sera une belle sécurité supplémentaire. L’ajout de TDD (Test Driven Development) apporte aussi la sécurité de ne pas oublier de faire les tests unitaires puisque l’idée est de les écrire avant d’écrire notre fonction

**Tests de scénarios**
Certains vont ajouter des tests de scénarios et la technique du BDD (Behavior Driver Development) pour tester des scénarios plus fonctionnels.

Ces deux types de tests sont des tests de non régression. Ils permettront de savoir à chaque tentative de déploiement si quelque chose d’ancien a été impacté.

Autres tests

D’autres tests sont aussi à faire comme les tests fonctionnels, les tests de charges, des tests de qualité de code…

Pour ceux qui veulent se tenter rapidement, vous pouvez faire des premiers tests avec Github. Des outils externes qui s’y connectent comme Sensionlab Insight, Scrutinizer, Travis, AWS vous permettront de le faire aisément.

### Un environnement unique pour le continuous delivery
Pour faire du bon continuous delivery, il faut également envisager d’avoir un seul environnement unique. Pour faire simple, il faut que votre environnement de développement, de tests et de production soient identiques.

Si il est très difficile de faire cela, des outils comme docker permettent d’être plus proche de cette philosophie qu’auparavant. Il vous sera indispensable d’aller vers ce type d’outils pour attaquer sérieusement ce type de techniques d’ingénierie.