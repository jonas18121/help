# LES BONNES ET MAUVAISES PRTATIQUES

## Les bonnes et les mauvaises pratiques de DevOps



Introduction

L'objectif principal de tout effort DevOps au sein d'une organisation est d'améliorer la création de valeur pour les clients et l'entreprise, et non de réduire les coûts, d'augmenter l'automatisation ou de tout piloter depuis la gestion de la configuration ; 

cela signifie que différentes organisations peuvent avoir besoin de structures d'équipe différentes pour qu'une collaboration efficace entre les développeurs et les opérations ait lieu.

La structure ou la topologie d'équipe DevOps qui conviendra à une organisation dépend de plusieurs facteurs :

L'ensemble de produits de l'organisation : moins de produits facilitent la collaboration, car il y aura moins de silos naturels, comme le prédit la loi de Conway.

L'étendue, la force et l'efficacité du leadership technique ; si Dev et Ops ont un objectif commun.

Qu'une organisation ait la capacité ou l'envie de changer son service des opérations informatiques du « matériel de stockage » et de la « configuration des serveurs » à un véritable alignement avec la chaîne de valeur, et que les fonctionnalités opérationnelles soient prises au sérieux par les équipes logicielles.

Si l'organisation a la capacité ou les compétences pour prendre la tête des préoccupations opérationnelles.

Bien sûr, il existe des variations sur les thèmes décrits ici ; les topologies et les types sont conçus comme un guide de référence ou une heuristique pour évaluer quels modèles pourraient être appropriés. En réalité, une combinaison de plus d'un modèle, ou un modèle se transformant en un autre, sera souvent la meilleure approche.

Alors, quelle structure d'équipe est la bonne pour que DevOps s'épanouisse ? De toute évidence, il n'y a pas de conformation magique ou de topologie d'équipe qui conviendra à chaque organisation. Cependant, il est utile de caractériser un petit nombre de modèles différents de structures d'équipe, dont certains conviennent mieux à certaines organisations que d'autres. En explorant les forces et les faiblesses de ces structures d'équipe (ou « topologies »), nous pouvons identifier la structure d'équipe qui pourrait fonctionner le mieux pour les pratiques DevOps dans nos propres organisations, en tenant compte de la loi de Conway.



La plupart de ces topologies DevOps ont déjà été décrites ailleurs ; en particulier, Lawrence Sweeney de CollabNet donne des détails utiles dans un commentaire sur le blog de Ben Kepes à propos de ce que je caractérise ici comme Anti-Type B (DevOps Team Silo) , Type 3 (Ops as IaaS) et Type 1 (Dev and Ops Collaboration ) . Les DevOpsGuys ont une liste de douze anti-modèles DevOps, et Jez Humble, Gene Kim, Damon Edwards (et bien d'autres) ont dit des choses similaires. J'ai ajouté ici trois « topologies » supplémentaires dont je n'ai pas beaucoup vu ou entendu parler ( Shared Ops , DevOps-as-a-Service et Temp DevOps Team ).



Anti-types DevOps

Il est utile de se pencher sur quelques mauvaises pratiques, ce que l'on pourrait appeler des « anti-types » (après l'omniprésent « anti-pattern »).



A : Dev vs Ops

B : Silo DevOps

C : Aucune opération nécessaire

D : Équipe d'outils

E : Administrateur système

F : Opérations intégrées

G : Dev vs DBA

Anti-Type A : silos de développement et d'opérations
Il s'agit de la division classique du « jetez-le par-dessus le mur » entre Dev et Ops. Cela signifie que les points d'histoire peuvent être revendiqués tôt (DONE signifie "fonctionnalité complète", mais ne fonctionne pas en production), et l'opérabilité du logiciel en souffre parce que les développeurs n'ont pas assez de contexte pour les fonctionnalités opérationnelles et les opérateurs n'ont pas le temps ou l'envie de s'engager Devs afin de résoudre les problèmes avant la mise en ligne du logiciel.

Nous savons probablement tous que cette topologie est mauvaise, mais je pense qu'il existe en fait des topologies pires ; au moins avec Anti-Type A (Dev et Ops Silos), nous savons qu'il y a un problème.




Anti-Type B : DevOps Team Silo
Le DevOps Team Silo (Anti-Type B) résulte généralement d'un gestionnaire ou d'un cadre décidant qu'ils "ont besoin d'un peu de cette chose DevOps" et démarrent une "équipe DevOps" (probablement pleine de personnes connues sous le nom de " DevOp "). Les membres de l'équipe DevOps forment rapidement un autre silo, gardant DevOps plus éloignés que jamais alors qu'ils défendent leur coin, leurs compétences et leur ensemble d'outils contre les « développeurs ignorants » et « dinosaur Ops ».

La seule situation où un silo DevOps distinct a vraiment du sens est lorsque l'équipe est temporaire, d'une durée inférieure à (disons) 12 ou 18 mois, dans le but exprès de rapprocher DevOps, et avec un mandat clair pour faire le DevOps équipe superflue après cette heure


Anti-Type C : les développeurs n'ont pas besoin d'opérations
Cette topologie est née d'une combinaison de naïveté et d'arrogance de la part des développeurs et des responsables du développement, en particulier lors du démarrage de nouveaux projets ou systèmes. En supposant que les opérations appartiennent désormais au passé (« nous avons le cloud maintenant, n'est-ce pas ?"), les développeurs sous-estiment énormément la complexité et l'importance des compétences et des activités opérationnelles, et pensent qu'ils peuvent s'en passer, ou simplement les couvrir dans les heures libres.

Une telle topologie DevOps Anti-Type C finira probablement par nécessiter une topologie de type 3 (Ops as IaaS) ou de type 4 (DevOps-as-a-Service) lorsque leur logiciel deviendra plus impliqué et que les activités opérationnelles commenceront à submerger le développement. ' (alias codage) temps. Si seulement ces équipes reconnaissaient l'importance des opérations en tant que discipline aussi importante et précieuse que le développement de logiciels, elles seraient en mesure d'éviter bien des douleurs et des erreurs opérationnelles inutiles (et assez basiques).


Anti-Type D : DevOps en tant qu'équipe d'outils
Afin de « devenir DevOps » sans perdre la vitesse actuelle des équipes de développement (lire la livraison des histoires fonctionnelles), une équipe DevOps est mise en place pour travailler sur les outils nécessaires aux pipelines de déploiement, à la gestion de la configuration, à la gestion de l'environnement, etc. travaillent de manière isolée et les équipes de développement continuent de leur lancer des applications « par-dessus le mur ».

Bien que les résultats de cette équipe dédiée puissent être bénéfiques en termes d'amélioration de la chaîne d'outils, son impact est limité. Le problème fondamental du manque d'implication et de collaboration des Ops précoces dans le cycle de vie du développement d'applications reste inchangé.


Anti-Type E : SysAdmin renommé
Cet anti-type est typique des organisations à faible maturité technique. Ils veulent améliorer leurs pratiques et réduire leurs coûts, mais ils ne voient pas l'informatique comme un moteur essentiel de l'entreprise. Parce que les succès de l'industrie avec DevOps sont maintenant évidents, ils veulent également « faire du DevOps ». Malheureusement, au lieu de réfléchir aux lacunes de la structure et des relations actuelles, ils empruntent la voie insaisissable en embauchant des « ingénieurs DevOps » pour leur(s) équipe(s) opérationnelle(s).

DevOps devient simplement une nouvelle image de marque du rôle précédemment connu sous le nom de SysAdmin, sans véritable changement culturel/organisationnel. Cet anti-type est de plus en plus répandu alors que des recruteurs sans scrupules prennent le train en marche à la recherche de candidats dotés de compétences en automatisation et en outillage. Malheureusement, ce sont les compétences en communication humaine qui peuvent faire prospérer DevOps dans une organisation.




Anti-Type F : Opérations intégrées dans l'équipe de développement
L'organisation ne souhaite pas conserver une équipe opérationnelle distincte, les équipes de développement assument donc la responsabilité de l'infrastructure, de la gestion des environnements, de la surveillance, etc. Cependant, le faire d'une manière axée sur un projet ou un produit signifie que ces éléments sont soumis à des contraintes de ressources et à des priorités qui conduisent à des approches médiocres et à des solutions incomplètes.

Dans cet anti-type, l'organisation montre un manque d'appréciation de l'importance et des compétences requises pour des opérations informatiques efficaces. En particulier, la valeur des opérations est diminuée car elle est considérée comme une gêne pour les développeurs (car les opérations sont gérées par un seul responsable d'équipe de développement avec d'autres priorités).




Anti-Type G : silos Dev et DBA
Il s'agit d'une forme d' Anti-Type A (Dev et Ops Silos) qui est prédominante dans les moyennes et grandes entreprises où plusieurs systèmes hérités dépendent du même ensemble de données de base. Parce que ces bases de données sont si vitales pour l'entreprise, une équipe DBA dédiée, souvent sous l'égide des opérations, est responsable de leur maintenance, de l'optimisation des performances et de la reprise après sinistre. C'est compréhensible. Le problème, c'est lorsque cette équipe devient le gardien de tout changement de base de données, devenant ainsi un obstacle aux déploiements petits et fréquents (un principe fondamental de DevOps et de la livraison continue).

De plus, tout comme Ops dans Anti-Type A , l'équipe DBA n'est pas impliquée tôt dans le développement de l'application, ainsi les problèmes de données (migrations, performances, etc.) se trouvent tard dans le cycle de livraison. Couplé à la surcharge de la prise en charge de plusieurs bases de données d'applications, le résultat final est une lutte contre les incendies constante et une pression croissante à fournir.


























Topologies d' équipe DevOps

En opposition aux anti-types, nous pouvons examiner certaines topologies dans lesquelles DevOps peut fonctionner.



1 : Dev+Ops



2 : Opérations partagées



3: Ops comme IaaS



4: DevOps-as-a-Service



5: Équipe temporaire DevOps



6 : Équipe DevOps



7 : Équipe SRE



8 : Conteneur



9 : Capacité de base de données





Type 1 : Collaboration entre les développeurs et les opérations


C'est la « terre promise » du DevOps : une collaboration fluide entre les équipes Dev et les équipes Ops, chacune se spécialisant là où c'est nécessaire, mais partageant aussi là où c'est nécessaire. Il existe probablement de nombreuses équipes de développement distinctes, chacune travaillant sur une pile de produits distincte ou semi-séparée.

J'ai l'impression que ce modèle de type 1 a besoin d'un changement organisationnel assez substantiel pour l'établir, et d'un bon degré de compétence plus haut dans l'équipe de gestion technique. Le développement et les opérations doivent avoir un objectif commun clairement exprimé et manifestement efficace (« Fournir des changements fiables et fréquents », ou autre). Les Ops doivent être à l'aise avec les développeurs et se familiariser avec le codage piloté par les tests et Git, et les développeurs doivent prendre les fonctionnalités opérationnelles au sérieux et rechercher des Ops pour qu'ils participent aux implémentations de journalisation, etc. du passé récent.


Aptitude de type 1 : une organisation avec un leadership technique fort.
Efficacité potentielle : ÉLEVÉE


Adéquation de type 2 : organisations avec un seul produit ou service Web principal.
Efficacité potentielle : ÉLEVÉE

Type 2 : responsabilités opérationnelles entièrement partagées
Lorsque les personnes chargées des opérations ont été intégrées dans les équipes de développement de produits, nous voyons une topologie de type 2. Il y a si peu de séparation entre Dev et Ops que tout le monde est fortement concentré sur un objectif commun ; c'est discutable une forme de Type 1 (Dev and Ops Collaboration) , mais il a quelques caractéristiques spéciales.

Des organisations telles que Netflix et Facebook avec effectivement un seul produit Web ont atteint cette topologie de type 2, mais je pense qu'elle n'est probablement pas très applicable en dehors d'un objectif de produit étroit, car les contraintes budgétaires et le changement de contexte généralement présents dans une organisation avec plusieurs les flux de produits forceront probablement Dev et Ops à s'éloigner (disons, retour à un modèle de type 1 ). Cette topologie peut également être appelée « NoOps », car il n'y a pas d'équipe d'opérations distincte ou visible (bien que les NoOps de Netflix puissent également être de type 3 (Ops comme IaaS) ).

Type 3 : Ops en tant qu'infrastructure en tant que service (plate-forme)
Pour les organisations avec un département IT Operations assez traditionnel qui ne peut pas ou ne changera pas rapidement [assez], et pour les organisations qui exécutent toutes leurs applications dans le cloud public (Amazon EC2, Rackspace, Azure, etc.), cela aide probablement à traiter les opérations en tant qu'équipe qui fournit simplement l'infrastructure élastique sur laquelle les applications sont déployées et exécutées ; l'équipe Ops interne est ainsi directement équivalente à Amazon EC2, ou Infrastructure-as-a-Service.

Une équipe (peut-être une équipe virtuelle) au sein de Dev agit alors comme une source d'expertise sur les fonctionnalités opérationnelles, les métriques, la surveillance, l'approvisionnement du serveur, etc., et effectue probablement la plupart des communications avec l'équipe IaaS. Cette équipe est toujours une équipe de développement, cependant, suivant des pratiques standard telles que TDD, CI, développement itératif, coaching, etc.

La topologie IaaS échange une certaine efficacité potentielle (perte de la collaboration directe avec les équipes opérationnelles) pour une mise en œuvre plus facile, en tirant éventuellement de la valeur plus rapidement qu'en essayant le type 1 (collaboration développement et opérations) qui pourrait être tenté à une date ultérieure.


Adéquation de type 3 : organisations avec plusieurs produits et services différents, avec un département Ops traditionnel, ou dont les applications s'exécutent entièrement dans le cloud public.
Efficacité potentielle : MOYENNE


Adaptabilité de type 4 : équipes ou organisations plus petites avec une expérience limitée des problèmes opérationnels.
Efficacité potentielle : MOYENNE

Type 4 : DevOps en tant que service externe
Certaines organisations, en particulier les plus petites, peuvent ne pas avoir les finances, l'expérience ou le personnel pour diriger les aspects opérationnels du logiciel qu'elles produisent. L'équipe de développement peut ensuite contacter un fournisseur de services comme Rackspace pour l'aider à créer des environnements de test et automatiser son infrastructure et sa surveillance, et les conseiller sur les types de fonctionnalités opérationnelles à mettre en œuvre pendant les cycles de développement logiciel.

Ce que l'on pourrait appeler DevOps-as-a-Service pourrait être un moyen utile et pragmatique pour une petite organisation ou une petite équipe de se renseigner sur l'automatisation, la surveillance et la gestion de la configuration, puis peut-être d'évoluer vers un type 3 (Ops as IaaS) ou même Modèle de type 1 (Dev and Ops Collaboration) à mesure qu'ils grandissent et embauchent plus de personnel axé sur les opérations.

Type 5 : Équipe DevOps avec une date d'expiration
L'équipe DevOps avec une date d'expiration (Type 5) ressemble sensiblement à l' Anti-Type B (DevOps Team Silo) , mais son intention et sa longévité sont assez différentes. Cette équipe temporaire a pour mission de rapprocher Dev et Ops, idéalement vers un modèle de Type 1 (Dev and Ops Collaboration) ou de Type 2 (Fully Shared Ops Responsibilities) , et à terme de se rendre obsolète.

Les membres de l'équipe temporaire vont « traduire » entre Dev-speak et Ops-speak, en introduisant des idées folles comme les stand-ups et les équipes Kanban pour les opérations, et en pensant aux détails sales comme les équilibreurs de charge, les cartes réseau de gestion et le déchargement SSL pour Dev équipes. Si suffisamment de personnes commencent à voir l'intérêt de réunir Dev et Ops, alors l'équipe temporaire a de réelles chances d'atteindre son objectif ; Surtout, la responsabilité à long terme des déploiements et des diagnostics de production ne doit pas être confiée à l'équipe temporaire, sinon elle deviendra probablement un DevOps Team Silo (Anti-Type B).


Adéquation de type 5 : en tant que précurseur de la topologie de type 1 , mais méfiez-vous du danger de l' anti-type B .
Efficacité potentielle : FAIBLE à ÉLEVÉE





Adaptabilité de type 6 : organisations avec une tendance à la séparation entre Dev et Ops. Attention au danger de l' Anti-Type B.
Efficacité potentielle : MOYENNE à ÉLEVÉE

Type 6 : Équipe DevOps
Au sein des organisations qui ont un grand écart entre DevOps et Ops (ou une tendance à un grand écart), il peut être efficace d'avoir une équipe DevOps « facilatrice » qui maintient les côtés Dev et Ops en conversation. Il s'agit d'une version de Type 5 (équipe DevOps avec une date d'expiration) mais où l'équipe DevOps existe de manière continue avec pour mission spécifique de faciliter la collaboration et la coopération entre les équipes Dev et Ops. Les membres de cette équipe sont parfois appelés 'DevOps Advocates', car ils contribuent à faire connaître les pratiques DevOps.

L'objectif d'une « équipe DevOps » devrait être de se mettre en faillite en activant le reste de l'organisation.


Type 7 : Équipe SRE (modèle Google)
DevOps recommande souvent que les équipes de développement rejoignent la rotation sur appel, mais ce n'est pas essentiel. En fait, certaines organisations (y compris Google) utilisent un modèle différent, avec un « passage » explicite du développement à l'équipe qui exécute le logiciel, l'équipe d'ingénierie de fiabilité du site (SRE). Dans ce modèle, les équipes de développement doivent fournir des preuves de test (logs, métriques, etc.) à l'équipe SRE montrant que leur logiciel est d'un niveau suffisamment bon pour être pris en charge par l'équipe SRE.

Surtout, l'équipe SRE peut rejeter un logiciel qui ne répond pas aux normes opérationnelles, en demandant aux développeurs d'améliorer le code avant qu'il ne soit mis en production. La collaboration entre Dev et SRE se fait autour de critères opérationnels mais une fois que l'équipe SRE est satisfaite du code, elle (et non l'équipe Dev) le supporte en Production.




Adéquation du type 7 : le type 7 ne convient qu'aux organisations ayant un degré élevé d'ingénierie et de maturité organisationnelle. Méfiez-vous d'un retour à l' Anti-Type A si l'équipe SRE/Ops reçoit l'ordre de déployer « JFDI ».
Efficacité potentielle : FAIBLE à ÉLEVÉE





Adéquation du type 8 : les conteneurs peuvent très bien fonctionner, mais méfiez - vous de l' Anti-Type A , où l'équipe des opérations est censée exécuter tout ce que le développeur lui lance.
Efficacité potentielle : MOYENNE à ÉLEVÉE

Type 8 : Collaboration axée sur les conteneurs
Les conteneurs suppriment le besoin de certains types de collaboration entre Dev et Ops en encapsulant les exigences de déploiement et d'exécution d'une application dans un conteneur. De cette façon, le conteneur agit comme une frontière entre les responsabilités des développeurs et des opérations. Avec une solide culture d'ingénierie, le modèle de collaboration axée sur les conteneurs fonctionne bien, mais si le développeur commence à ignorer les considérations opérationnelles, ce modèle peut basculer vers un « nous et eux » contradictoire.


Type 9 : Collaboration entre développeurs et DBA
Afin de combler le fossé Dev-DBA, certaines organisations ont expérimenté quelque chose comme le type 9, où une capacité de base de données de l'équipe DBA est complétée par une capacité de base de données (ou une spécialisation) de l'équipe de développement. Cela semble aider à traduire entre la vue centrée sur le développement des bases de données (comme des magasins de persistance essentiellement stupides pour les applications) et la vue centrée sur le DBA des bases de données (sources intelligentes et riches de valeur commerciale).


Convenance de type 9 : pour les organisations avec une ou plusieurs grandes bases de données centrales avec plusieurs applications connectées.
Efficacité potentielle : MOYENNE

