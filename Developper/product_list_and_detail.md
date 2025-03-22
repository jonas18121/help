# Liste produits VS détail

Dans une application web, afficher une liste de produits sous forme de tableau permet de structurer et présenter les informations de manière claire et accessible.<br> 
Voici pourquoi et quelles informations sont pertinentes :

### Pourquoi afficher des informations dans un tableau ?

1. **Lisibilité et organisation des données  :** Permet d'afficher plusieurs produits en parallèle avec des informations essentielles.

2. **Facilité de tri et de recherche :** L'utilisateur peut rapidement filtrer ou trier les produits selon différents critères (prix, stock, catégorie…).

3. **Aperçu rapide :** Donne une vue d’ensemble des produits disponibles et de leurs caractéristiques essentielles sans nécessiter de naviguer sur plusieurs pages.

4. **Optimisation de l'expérience utilisateur :** Permet une prise de décision rapide, par exemple, dans un système de gestion de stock ou un site e-commerce.

### Informations pertinentes à afficher dans la liste des produits :

- **ID du produit** (si besoin pour gestion ou référence interne)

- **Image** (facilite la reconnaissance visuelle)

- **Nom du produit**

- **Catégorie** (utile pour trier et filtrer)

- **Prix**

- **Quantité en stock** (important pour les acheteurs ou gestionnaires)

- **Statut** (disponible, en rupture de stock, en promotion, etc.)

- **Actions rapides** (boutons pour modifier, supprimer ou afficher plus de détails)

- **Disponibilité** (en stock/rupture)

- **Brève description ou caractéristiques principales**

### Différence avec la page détail d’un produit :

La page de liste offre un **aperçu global** et succinct des produits, tandis que la **page de détail** est dédiée à un produit spécifique et fournit **plus d’informations**, comme :

- **Description complète**

- **Plusieurs images en haute résolution**

- **Caractéristiques techniques détaillées** (dimensions, poids, couleur, etc.)

- **Avis des clients**

- **Options de personnalisation** (choix de taille, couleur…)

- **Bouton d'achat ou d'ajout au panier**

- **Produits similaires ou recommandations**

En résumé, la **liste de produits** est utile pour parcourir et comparer rapidement plusieurs produits, tandis que la **page détail** sert à prendre une décision d’achat ou obtenir des informations approfondies sur un produit en particulier.

### 1. Problèmes d'Expérience Utilisateur (UX)

- **Surcharge d'information (Information Overload) :** Trop de données affichées rendent la lecture difficile et fatiguent l’utilisateur.

- **Lisibilité réduite :** Un tableau trop dense oblige l’utilisateur à scroller horizontalement ou verticalement, ce qui nuit à l’ergonomie.

- **Difficulté à trouver une information clé :** 
- Avec trop de colonnes, l’utilisateur perd du temps à identifier ce qui est important.
-  Les utilisateurs peuvent passer plus de temps à analyser chaque produit, ralentissant ainsi le processus de sélection et potentiellement réduisant les conversions

- **Compatibilité mobile :** Sur les écrans petits, un tableau avec trop de colonnes devient illisible.

- **Risque d'erreurs :**  Avec autant d'informations à gérer, le risque d'erreurs dans la saisie ou l'affichage des données augmente

### 2. Problèmes de Performance

- **Temps de chargement plus long :** Charger une grande quantité de données pour chaque produit peut ralentir l’application.

- **Consommation de ressources élevée :** Plus de données signifie plus de requêtes serveur et une utilisation accrue de la mémoire et du CPU, impactant les performances.

- **Difficulté à maintenir une interface fluide :** Les opérations comme le tri et la pagination peuvent devenir lentes.

- **Surcharge d'informations :** Les utilisateurs peuvent se sentir submergés par la quantité d'informations, ce qui rend difficile la comparaison rapide des produits

### 3. Gestion et Maintenance du Code

- **Complexité accrue :** Gérer un tableau très détaillé rend le code plus complexe et plus difficile à maintenir.

- **Problèmes d’évolutivité :** Ajouter ou modifier des colonnes devient compliqué.

- **Design peu flexible :** Difficile d’adapter le tableau à différents écrans et résolutions sans créer des bugs d'affichage.

### Pour atténuer ces risques, il est recommandé de :

- Prioriser les informations essentielles : Afficher seulement les infos les plus utiles dans la liste et ajouter un bouton "Voir plus".

- Utiliser des colonnes dynamiques : Permettre à l’utilisateur de choisir quelles colonnes afficher.

- Pagination et lazy loading : Charger les informations au fur et à mesure pour améliorer la performance.

- Optimiser la mise en page pour une meilleure lisibilité et organisation des données.

- Considérer l'utilisation de filtres et de tris avancés pour aider les utilisateurs à naviguer dans la liste de produits

- Utiliser des techniques de design comme le "progressive disclosure" pour révéler plus d'informations sur demande. 
    - [Progressive Disclosure : Simplifier l’interface pour mieux guider l’utilisateur](https://lagrandeourse.design/blog/actualites/progressive-disclosure-simplifier-linterface-pour-mieux-guider-lutilisateur/)
    - [Wiki Progressive Disclosure ](https://en.wikipedia.org/wiki/Progressive_disclosure)
    - [Divulgation progressive](https://www.interaction-design.org/literature/book/the-glossary-of-human-computer-interaction/progressive-disclosure?srsltid=AfmBOorImbSESUkJ668yWXQo3EVmnkiPxOBE6gxl5hnoQkZOaryuCdOy)
    - [Divulgation progressive : 10 exemples à vérifier](https://medium.com/@Flowmapp/progressive-disclosure-10-great-examples-to-check-5e54c5e0b5b6)


## Lenteurs malgré l'utilisation de colonnes dynamiques,

Des lenteurs malgré l'utilisation de colonnes dynamiques ? <br>
Il faut analyser plusieurs facteurs pouvant impacter les performances. Voici les causes possibles et les solutions adaptées :

### 1. Trop de Données Chargées en Une Fois (Backend & Requêtes)

**Problème :**

- Si la liste charge **tous les produits en une seule requête**, cela peut provoquer un **temps de réponse long** et une surcharge du serveur.
- Si la requête récupère **toutes les colonnes même celles non affichées**, cela gaspille des ressources.

**Solutions :**

✅ **Pagination côté serveur** (Server-side pagination)
➡️ Charger seulement **un nombre limité de produits** par page (ex: 20 ou 50) au lieu de tout afficher d'un coup.

✅ **Requêtes optimisées (Lazy Loading)**
➡️ Ne charger que **les colonnes visibles** et récupérer les autres **à la demande.** (Ex : via des appels API asynchrones)

✅ **Mise en cache**
➡️ Mettre en cache les données les plus demandées pour éviter d’interroger la base de données trop souvent.

### 2. Mauvaise Performance de la Base de Données

**Problème :**

- Une base de données **non optimisée** peut ralentir les requêtes.
- Trop de **jointures complexes** ou d’**index manquants** ralentissent l’exécution.

**Solutions :**

✅ **Ajouter des index sur les colonnes souvent filtrées** (ex: ID, catégorie, prix).
✅ **Optimiser les requêtes SQL** (éviter `SELECT *`, privilégier les colonnes utiles).
✅ **Utiliser un cache type Redis** pour éviter des accès trop fréquents à la BDD.

### 3. Trop de Calculs ou de Transformations côté Frontend

**Problème :**

- Si les données récupérées sont lourdes et nécessitent trop de traitement en JavaScript, cela peut ralentir l'affichage.

**Solutions :**

✅ **Effectuer les calculs côté serveur plutôt que côté client** (ex: formatage de prix, tri).
✅ **Utiliser le Virtual Scrolling** (afficher uniquement les lignes visibles, pas tout le tableau en mémoire).
✅ **Éviter les re-renders inutiles** en optimisant React/Vue/Angular (ex: utiliser useMemo, useCallback).

### 4. Interface Trop Lourde (Trop de DOM & CSS)

**Problème :**

- Si chaque ligne du tableau contient **trop de composants interactifs (boutons, menus, images)**, cela surcharge le DOM.
- Les animations CSS ou JS mal optimisées peuvent ralentir le rendu.

**Solutions :**

✅ **Réduire le nombre d'éléments DOM rendus en même temps.*
✅ **Charger les images en lazy loading.**
✅ **Optimiser le CSS et limiter les recalculs de layout** (ex: éviter `position: absolute` excessif).

### 5. Problème de Réseau ou d’API Trop Lentes

**Problème :**

- Une API lente peut ralentir l'affichage, surtout si elle renvoie trop de données d’un coup.

**Solutions :**

✅ **Monitorer les temps de réponse de l’API avec des outils comme Postman, New Relic ou Datadog.**
✅ **Optimiser la compression des données** (ex: utiliser Gzip ou Brotli).
✅ **Utiliser HTTP/2 ou GraphQL pour réduire le nombre de requêtes.**

### Résumé des Solutions Clés à Tester


Problème	Solution
Trop de données chargées	Pagination côté serveur, Lazy Loading
Base de données lente	Indexation, Optimisation des requêtes
Trop de calculs en JS	Calculs côté serveur, Virtual Scrolling
Trop d'éléments DOM	Réduire les composants visibles, Lazy Loading des images
API lente	Compression des données, HTTP/2

| Problème                  | Solution                                                  |
| ------------------------- | --------------------------------------------------------- |
| Trop de données chargées  | Pagination côté serveur, Lazy Loading                     |
| Base de données lente     | Indexation, Optimisation des requêtes                     |
| Trop de calculs en JS     | Calculs côté serveur, Virtual Scrolling                   |
| Trop d'éléments DOM       | Réduire les composants visibles, Lazy Loading des images  |
| API lente                 | Compression des données, HTTP/2                           |

🔍 **Prochaine étape :** Faire un **profilage des performances** avec **Chrome DevTools, Lighthouse ou un APM (ex: New Relic, Datadog)** <br> 
pour voir **où se situent réellement les lenteurs.**

Source : 

- [Comment le nombre de colonnes affecte les performances](https://www.percona.com/blog/how-number-of-columns-affects-performance/)
- [Pourquoi votre site Web se charge-t-il lentement et comment pouvez-vous y remédier ?](https://contentsquare.com/blog/page-loads-slow/)
- [Optimisation des requêtes SQL : 15 techniques pour de meilleures performances](https://www.datacamp.com/blog/sql-query-optimization)
- [Bonnes pratiques pour les applications Web](https://docs.retool.com/apps/concepts/best-practices)
- [Optimisez la vitesse de votre application Web : techniques d'optimisation des performances](https://www.nilebits.com/blog/2023/10/boost-your-web-apps-speed-performance-optimization-techniques/)


## Application utilisant Symfony côté backend et DataTables en JavaScript côté frontend

L'application utilise Symfony côté backend et DataTables en JavaScript côté frontend, voici une approche détaillée pour optimiser les performances.

## Problèmes possibles & solutions adaptées à Symfony + DataTables

### 1. Trop de Données Chargées en Une Fois

**Problème :**

- Si DataTables charge **tous les produits en une seule requête AJAX**, cela entraîne des lenteurs.
- Symfony pourrait renvoyer **des milliers d’enregistrements** au lieu de les paginer.

**Solution : Utiliser la Pagination Côté Serveur avec DataTables et Symfony**
🔹 Active le mode **"server-side processing"** de DataTables pour charger les données progressivement.

✅ **Exemple d’implémentation dans Symfony avec une requête paginée :**
Dans ton **contrôleur Symfony** (ex: `ProductController.php`), utilise **Doctrine Paginator** pour ne récupérer que les lignes demandées.

```php
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ProductController
{
    public function listProducts(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $start = $request->query->getInt('start', 0);
        $length = $request->query->getInt('length', 10);
        $search = $request->query->get('search')['value'];

        $queryBuilder = $entityManager->getRepository(Product::class)->createQueryBuilder('p');

        if ($search) {
            $queryBuilder
                ->where('p.name LIKE :search')
                ->setParameter('search', '%' . $search . '%');
        }

        $queryBuilder->setFirstResult($start)->setMaxResults($length);

        $paginator = new Paginator($queryBuilder, true);
        $products = $paginator->getQuery()->getResult();

        return new JsonResponse([
            'data' => $products,
            'recordsTotal' => count($paginator),
            'recordsFiltered' => count($paginator),
        ]);
    }
}
```

✅ **Côté JavaScript (DataTables), activer le mode AJAX et Server-Side Processing :**

```js
$(document).ready(function () {
    $('#productTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: '/products/list', // URL de ton contrôleur Symfony
            type: 'GET',
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'category' },
            { data: 'price' },
            { data: 'stock' }
        ]
    });
});
```

✅ **Résultat :** Seules **les données nécessaires** sont envoyées et le chargement est plus rapide.

### 2. Base de Données Lente

**Problème :**

- Si la base de données **n’a pas d’index sur les colonnes souvent filtrées** (ex: `name`, `category`, `price`), cela ralentit les requêtes.

**Solutions :**

✅ **Ajouter des index sur les colonnes utilisées dans les requêtes**

```sql
CREATE INDEX idx_product_name ON product (name);
CREATE INDEX idx_product_category ON product (category);
```

✅ **Éviter les** `SELECT *` **dans tes requêtes Doctrine** et ne récupérer que les colonnes nécessaires.

### 3. Trop d’Objets Rendus dans le DOM (Problème Frontend)

**problème :**

- DataTables génère **un très grand nombre d’éléments HTML** si le tableau est mal configuré.

**Solutions :**

✅ **Limiter le nombre de lignes affichées par défaut**

```js
$('#productTable').DataTable({
    pageLength: 10, // Afficher seulement 10 lignes par défaut
});
```

✅ **Utiliser le "Deferred Rendering" pour accélérer l’affichage**

```js
$('#productTable').DataTable({
    deferRender: true,
});
```

✅ **Activer la mise en cache DOM pour éviter des re-renders inutiles**

```js
$('#productTable').DataTable({
    stateSave: true,
});
```

### 4. API Trop Lente ou Trop de Requêtes

**Problème :**

- Si Symfony ne met pas en cache les données fréquemment demandées, il exécute **trop de requêtes.**
- Si l’API envoie **trop d’informations** par ligne, cela alourdit la réponse.

**Solutions :**
✅ **Mettre en cache les résultats des requêtes fréquentes avec Symfony Cache** Dans `services.yaml` :

```yaml
cache:
    default_redis_provider: "redis://localhost"
```

Dans le contrôleur :

```php
use Symfony\Contracts\Cache\CacheInterface;

public function listProducts(CacheInterface $cache)
{
    $products = $cache->get('products_list', function () {
        return $this->productRepository->findAll();
    });

    return new JsonResponse($products);
}
```

✅ **Compresser la réponse JSON avec Symfony Dans**

`config/packages/framework.yaml :`

```yaml
framework:
    esi: true
    fragments: true
    php_errors:
        log: true
    response:
        gzip: true
```

### 5. Mauvaise Performance du JavaScript (Re-renders & Blocs HTML Lents)

**Problème :**

Si DataTables est **rechargé à chaque changement,** cela provoque des re-renders inutiles.

**Solutions :**

✅ **Au lieu de recharger tout DataTables, utilise AJAX pour rafraîchir uniquement les données :**

```js
$('#refreshButton').click(function () {
    $('#productTable').DataTable().ajax.reload();
});
```

### Conclusion : Quoi Tester en Priorité ?

| Problème                      | Solution Prioritaire                              |
| ----------------------------- | ------------------------------------------------- |
| Temps de chargement trop long | Activer Server-Side Processing dans DataTables    |
| Trop de requêtes SQL lentes   | Indexation des colonnes + Cache Redis             |
| Trop d’éléments HTML          | Deferred Rendering + Pagination limitée           |
| Re-renders inutiles           | Optimisation AJAX (reload sans reset)             |

👉 Prochaine étape : Active les logs Symfony & DataTables Debug pour voir où ça bloque exactement !

### Autres

Pour optimiser les performances d'une application Symfony utilisant DataTables en JavaScript pour afficher un tableau avec de nombreuses informations (plus de 20) pour chaque produit, voici les principales recommandations :

### Optimisation côté serveur

1. Utiliser le traitement côté serveur (server-side processing) de DataTables. Cela permet de ne charger que les données nécessaires à l'affichage courant, réduisant considérablement le temps de chargement initial.

2. Optimiser les requêtes de base de données :

    - Utiliser des index appropriés sur les colonnes fréquemment utilisées.

    - Implémenter le chargement eager (eager loading) pour éviter le problème N+1.

    - Optimiser les requêtes Doctrine en utilisant des jointures efficaces et des sous-requêtes optimisées.

3. Mettre en place un système de cache :

    - Utiliser le cache de requêtes et de résultats de Doctrine.

    - Implémenter le cache HTTP pour stocker les réponses côté client.

### Optimisation côté client

1. Utiliser l'option deferRender de DataTables pour différer le rendu des lignes non visibles.

2. Désactiver l'option orderClasses pour améliorer légèrement les performances.

3. Implémenter la pagination côté serveur pour limiter le nombre d'enregistrements récupérés à la fois.

### Autres optimisations

1. Optimiser les assets (minification du JavaScript et du CSS).

2. Utiliser un CDN pour servir les fichiers statiques et réduire la latence.

3. Envisager l'utilisation de HTTP/2 pour améliorer les performances de chargement.

4. Profiler régulièrement l'application pour identifier les goulots d'étranglement.

En mettant en œuvre ces optimisations, vous devriez constater une amélioration significative des performances de votre application Symfony utilisant DataTables, même avec un grand nombre d'informations à afficher pour chaque produit.

Source : 

- [Améliorer la vitesse de charge](https://datatables.net/forums/discussion/67593/improve-load-speed-with-some-specifics-requirements)
- [Optimiser les performances dans Symfony : trucs et astuces pour des applications plus rapides](https://pitangent.com/symfony-developer/optimizing-performance-symfony-tips-tricks-faster-applications/)
- [Améliorations des performances de Symfony : astuces et techniques](https://stackify.com/symfony-performance-improvements-tips-and-techniques/)
- [Optimisation des requêtes Doctrine pour des performances Symfony améliorées - Guides LoadForge](https://loadforge.com/guides/optimizing-doctrine-queries-for-symfony-performance)
- [Optimisation des performances des applications Symfony](https://clouddevs.com/symfony/optimizing-performance/)