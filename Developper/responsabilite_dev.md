# Le rôle du développeur face aux demandes du client (propriétaire de l'application)

Lorsqu’un **propriétaire d’application** demande l’ajout de **plus de 20 informations** par produit dans un tableau, le développeur a **plusieurs responsabilités** qui vont au-delà de l'exécution technique.

### ✅ 1. Responsabilité technique : Exécuter tout en prévenant les risques

Le développeur doit **implémenter les fonctionnalités demandées**, mais **avec des bonnes pratiques pour éviter les problèmes** (performance, UX, maintenance).

- **Optimiser le backend et le frontend** pour limiter les ralentissements.
- **Utiliser la pagination, le lazy loading et le server-side processing** pour améliorer la vitesse d'affichage.
- **S’assurer que le design reste lisible et ergonomique** malgré le grand nombre d’informations.
- **Prévention des risques :** Le développeur a une responsabilité professionnelle de prévenir les risques liés aux choix techniques ou fonctionnels. Cela inclut :

    - Identifier les impacts potentiels sur la performance (temps de chargement, surcharge des serveurs).
    - Expliquer comment une surcharge d'informations peut nuire à l'expérience utilisateur.
    - Proposer des solutions alternatives pour répondre aux besoins tout en minimisant les risques.

- **Conseil et pédagogie :** Le développeur doit jouer un rôle consultatif en expliquant au propriétaire pourquoi certaines décisions pourraient être problématiques. Cela inclut :

    - Présenter des exemples concrets ou des données pour démontrer l'impact négatif (comme des ralentissements ou une baisse de satisfaction utilisateur).
    - Proposer des compromis, comme afficher uniquement les informations essentielles dans le tableau et déplacer les détails supplémentaires vers une page dédiée.

💡 **Le développeur ne doit pas se limiter à "exécuter", mais aussi anticiper les conséquences techniques.**

### 🚨 2. Travail de prévention : Alerter sur les risques

Un bon développeur **ne se contente pas d’exécuter aveuglément** : il **doit prévenir** les risques potentiels **au propriétaire** avant l’implémentation. <br>
car il est souvent le mieux placé pour anticiper les problèmes techniques et fonctionnels. Cela fait partie de son rôle d’expert technique.

Il peut :

- Expliquer **les problèmes de performances** (temps de chargement long, surconsommation du serveur).
- Mettre en avant **les risques pour l’expérience utilisateur** (difficulté de lecture, surcharge visuelle).
- Proposer des **alternatives techniques** plus efficaces (colonnes dynamiques, affichage en accordéon, boutons "voir plus").
- Il peut proposer des solutions comme l’utilisation de colonnes dynamiques conditionnelles ou un affichage progressif (lazy loading).


#### 📌 Exemple de communication avec le propriétaire :

"Si on affiche 20 colonnes en même temps, cela risque de ralentir l'affichage et de compliquer la lecture pour les utilisateurs. On peut plutôt afficher les infos essentielles et ajouter un bouton 'Voir plus' pour afficher les détails d’un produit sans alourdir la page."

### 🏆 3. Convaincre le propriétaire de réduire le nombre d’informations affichées

Le développeur **peut et doit essayer de convaincre** le propriétaire si la demande est **irréaliste ou contre-productive.**

Comment ?

- **Démontrer avec des chiffres :** Exemple, montrer qu’un tableau avec 10 colonnes charge en **500ms**, tandis qu’un avec 20 colonnes met **3 secondes.**
- **Faire des tests et montrer des preuves :** Comparer **deux versions du tableau** et lui faire voir la différence.
- Adopter une approche factuelle en s’appuyant sur des arguments techniques (performances) et UX (lisibilité, efficacité).
- Montrer comment une simplification pourrait améliorer les résultats (par exemple, une navigation plus fluide pourrait augmenter les conversions).
- **Proposer un compromis :** Plutôt qu’un tableau surchargé, suggérer une **page de détail** pour afficher les informations supplémentaires.

#### 📌 Si malgré tout le propriétaire insiste, alors le développeur doit tout de même optimiser au maximum l’affichage.


### 🎯 4. Adapter son rôle en fonction du contexte

Le rôle du développeur dépend aussi du contexte de travail :

| Situation                            | Rôle du développeur                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Petite entreprise / Startup          | Etre force de proposition, convaincre sur les bonnes pratiques.                                    |
| Grand projet avec une équipe UX / PO | Travailler en collaboration avec le Product Owner (PO) et l’UX designer pour trouver un compromis. |
| Freelance / Prestataire              | Alerter le client sur les risques, mais suivre ses choix s’il persiste.                            |

Le rôle du développeur va au-delà de la simple exécution technique. Il inclut :

1. **Expertise technique :** S'assurer que l'application reste performante et maintenable.

2. **Collaboration :** Travailler avec le propriétaire pour comprendre ses besoins réels et proposer des solutions adaptées.

3. **Responsabilité UX/UI :** Garantir que les choix faits ne compromettent pas l'expérience utilisateur.

4. **Communication proactive :** Expliquer clairement les conséquences potentielles des décisions prises et recommander des ajustements si nécessaire.

## Conclusion : Le développeur ne doit pas être un simple exécutant

✅ **OUI**, le développeur **doit prévenir les risques et convaincre** le propriétaire si une demande va à l’encontre de la performance ou de l’expérience utilisateur.

✅ **OUI**, il peut proposer **des solutions alternatives** plus efficaces.

❌ **NON**, il ne peut pas **imposer** son choix, mais il doit s’assurer que la meilleure solution possible est appliquée.

💡 **Un bon développeur, c’est quelqu’un qui exécute intelligemment, tout en anticipant et en proposant des solutions adaptées !** 🚀

En résumé, le développeur est un partenaire stratégique dans ce type de projet. Il doit équilibrer la satisfaction des demandes du propriétaire avec la responsabilité de garantir une application performante, intuitive et durable

Source :

- [Qu’est-ce que la gestion des exigences ?](https://www.ibm.com/fr-fr/topics/what-is-requirements-management?utm_source=chatgpt.com)
- [La responsabilité du développeur, c’est quoi ?](https://goldwin-avocats.com/fr/faq/la-responsabilite-du-developpeur-c-est-quoi/)
- [Développeur logiciel / Software Developer - Fiche métier](https://www.michaelpage.fr/advice/fiches-m%C3%A9tiers/les-m%C3%A9tiers-de-la-tech/fiche-m%C3%A9tier-d%C3%A9veloppeur-logiciel)
- [Dev Front VS Dev UI](https://blog.osmova.com/developpeur-dinterface-utilisateur-vs-developpeur-front-end/)