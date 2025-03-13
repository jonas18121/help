# Gérer les versions d'une dépendance dans un fichier compose.yml

Dans Composer, le gestionnaire de dépendances pour PHP, permet plusieurs façons de spécifier des versions de dépendances dans un fichier `composer.json`.<br>
Ces notations permettent de contrôler les versions acceptées et de gérer la compatibilité avec les nouvelles versions de manière flexible.

### 1. ">=1.2"

Cette notation indique que tu veux au minimum la version `1.2`.<br> 
Cela signifie que Composer installera la version `1.2` ou toute version ultérieure, quelle que soit la version majeure, mineure ou de patch.<br> 
Par exemple, si une version `2.0` est disponible, elle sera aussi installée.

Exemple d'utilisation :

```json
"psram-linter": ">=1.2"
```

**Avantage :** Permet de toujours avoir la version la plus récente, peu importe qu'elle change des fonctionnalités importantes (les versions majeures).

**Inconvénient :** Il n'y a pas de garantie sur la compatibilité si une nouvelle version majeure (par exemple, 2.0) introduit des changements cassants.

### 2. "^1.2"

Le caret `(^)` est l'une des manières les plus courantes de définir les versions. Cette notation garantit que tu obtiens au moins la version `1.2`, mais **toutes les versions mineures ou de patch supérieures seront également compatibles**, tant que la version majeure ne change pas. 
Cela permet de recevoir les mises à jour de sécurité et les nouvelles fonctionnalités tout en restant dans une version majeure compatible.

Exemple d'utilisation :

```json
"psram-linter": "^1.2"
```

**Avantage :** C’est flexible tout en garantissant que tu n'auras pas de changements incompatibles au niveau de la version majeure. C’est donc l’option la plus utilisée dans la majorité des projets modernes.

**Inconvénient :** Il peut y avoir des ajustements mineurs ou des ajouts de nouvelles fonctionnalités, mais pas de changements qui brisent la compatibilité.

### 3. "1.2.*"

La notation `"1.2.*"` indique que tu acceptes toutes les versions du type `1.2.x`, où x est un numéro de patch.<br>
Cela inclut toute version `1.2.x` (comme `1.2.1`, `1.2.2`, etc.), mais **pas de version supérieure** comme `1.3.0`. C'est donc plus restrictif que `^1.2`.

Exemple d'utilisation :

```json
"psram-linter": "1.2.*"
```

**Avantage :** Permet de s'assurer que seules les versions de patch de la `1.2` seront installées, sans risquer d'inclure une nouvelle version mineure.

**Inconvénient :** Moins flexible que `^1.2`, tu ne recevras pas de nouvelles fonctionnalités apportées par une version `1.3`.

### 4. "1.2.3"

Cela désigne une version exacte. Dans ce cas, Composer n'installera que la version `1.2.3` et rien d'autre.

Exemple d'utilisation :

```json
"psram-linter": "1.2.3"
```

**Avantage :** Utilisé pour des besoins très précis où seule une version particulière est compatible avec ton projet.

**Inconvénient :** Très restrictif et peu flexible. Si une mise à jour de sécurité ou une fonctionnalité est ajoutée à une version ultérieure, tu ne la recevras pas.

### 5. "<1.2" ou "<1.3"

Cela signifie que tu **acceptes toutes les versions inférieures à la version spécifiée**. Par exemple, `"^1.3"` ne sera pas accepté si tu utilises `"^1.2"` ou `"<1.2"`.<br> 
Cela te permet de spécifier un "plafond" de version et d'empêcher des mises à jour majeures qui briseraient la compatibilité.

Exemple d'utilisation :

```json
"psram-linter": "<1.2"
```

**Avantage :** Permet de verrouiller les versions inférieures à une certaine version, mais dans un environnement plus restrictif.

**Inconvénient :** Cela ne permet pas d’accepter des versions plus récentes, même si elles sont compatibles avec le projet.

### 6. "~1.2" (Tilde)

La tilde `(~)` est une autre manière de spécifier des versions, et elle est plus restrictive que le caret `(^)`. La notation `"~1.2"` signifie "accepter toutes les versions à partir de `1.2.0`, mais pas `"1.3.0"`. Cela permet d'installer des versions de patch ou mineures qui ne dépassent pas `1.3.0`.

Exemple d'utilisation :

```json
"psram-linter": "~1.2"
```

**Avantage :** Permet des mises à jour vers des versions mineures ou de patch, mais empêche le passage à une nouvelle version majeure.

**Inconvénient :** Ne permet pas de passer à une version majeure supérieure, même si elle est compatible.

### 7. "1.2.3 || 1.3.*"

Cela permet de spécifier **plusieurs contraintes** de versions. Dans ce cas, tu acceptes soit la version exacte `1.2.3`, soit toutes les versions `1.3.x` (c’est-à-dire des versions mineures de `1.3`).

Exemple d'utilisation :

```json
"psram-linter": "1.2.3 || 1.3.*"
```

**Avantage :** Cela permet une plus grande flexibilité en permettant plusieurs versions à choisir.

**Inconvénient :** Ça peut rendre un peu plus complexe la gestion des versions, surtout dans un projet avec plusieurs dépendances.

### 8. "dev-master" (ou toute autre branche)

Si tu veux spécifier une version de **développement** en cours, tu peux indiquer une branche comme dev-master, ou dev-main, pour obtenir la dernière version sur cette branche.

Exemple d'utilisation :

```json
"psram-linter": "dev-master"
```

**Avantage :** Permet de travailler avec la dernière version de développement d'une dépendance avant qu'une nouvelle version stable ne soit publiée.

**Inconvénient :** C’est très risqué, car tu peux avoir des versions instables qui ne sont pas prêtes pour la production.


### Résumé des différentes notations :

| Notation      | Exemple      | Signification                                                                     |
| ------------- | ------------ | --------------------------------------------------------------------------------- |
| ">=1.2"       | ">=1.2"      | Toute version `1.2` ou supérieure, y compris des versions majeures (comme `2.0`). |
| "^1.2"        | "^1.2"       | Toute version compatible avec `1.2` et qui reste dans la même version majeure.    |
| "1.2.*"       | "1.2.*"      | Toutes les versions de la forme `1.2.x`, mais pas de `1.3.0` ou plus.             |
| "1.2.3"       | "1.2.3"      | Version exacte `1.2.3.`                                                           |
| "<1.2"        | "<1.2"       | Toute version inférieure à `1.2`.                                                 |
| "~1.2"        | "~1.2"       | Version 1.2 et toutes les versions mineures et de patch, mais pas 1.3.0.          |
| `"1.2.3       |              | `1.3.*"`                                                                          |
| "dev-master"  | "dev-master" | La dernière version de la branche master (pour un développement en cours).        |


Chaque notation a ses avantages et ses inconvénients selon le niveau de contrôle et la flexibilité que tu souhaites avoir dans ton projet. En règle générale, pour les projets stables, `^1.2` et `~1.2` sont les options les plus courantes et les plus sûres.