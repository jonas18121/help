# Les LINQ en C# (Unity 3D)

[Apprendre le C# - Épisode 17 : Les LINQ (Unity 3D)](https://youtu.be/R1PWQUIKwK0?si=blkDjMMpflvSrF0J)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Bibliothèque du Namespace System.Collections.Generic](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0)
- [Github dotnet/runtime](https://github.com/dotnet/runtime)
- [Github dotnet/runtime/src/libraries/System.Collections/src/System/Collections/Generic](https://github.com/dotnet/runtime/tree/main/src/libraries/System.Collections/src/System/Collections/Generic)
- [Liste de touche du clavier via Keycode Unity](https://docs.unity3d.com/ScriptReference/KeyCode.html)

- [Doc Microsoft Language Integrated Query (LINQ)](https://learn.microsoft.com/fr-fr/dotnet/csharp/linq/)
- [Liste de méthodes pour LINQ](https://learn.microsoft.com/fr-fr/dotnet/api/system.linq.enumerable?view=net-6.0#methods)


## Qu’est-ce que LINQ ?

**LINQ** veut dire **Language Integrated Query**

👉 C’est un ensemble d’outils intégrés à C# qui permet de **chercher, filtrer, trier, et transformer** des données **comme si tu faisais une recherche dans une base de données**, mais directement dans ton code.

En gros, c’est comme une **loupe magique** pour manipuler facilement tes listes ou tableaux.

## Comment l’importer

Pour utiliser LINQ dans ton script Unity, tu dois ajouter cette ligne tout en haut :

```csharp
using System.Linq;
```

Sans ça, tu ne pourras pas utiliser les méthodes LINQ (`Where`, `Select`, `ToList`, etc.).

### Exemple de base

Imaginons que tu as une liste d’ennemis :

```csharp
using UnityEngine;
using System.Collections.Generic;
using System.Linq;

public class ExempleLINQ : MonoBehaviour
{
    void Start()
    {
        List<int> pointsDeVie = new List<int> { 50, 100, 25, 75, 150 };

        // 🧠 Récupérer tous les ennemis ayant plus de 70 PV
        var forts = pointsDeVie.Where(pv => pv > 70);

        foreach (var pv in forts)
        {
            Debug.Log("Ennemi fort avec " + pv + " PV");
        }
    }
}
```

Résultat dans la console Unity :

```bash
Ennemi fort avec 100 PV
Ennemi fort avec 75 PV
Ennemi fort avec 150 PV
```

## Exemples utiles en Unity

### Trouver un GameObject précis par nom

```csharp
var cible = FindObjectsOfType<GameObject>()
    .FirstOrDefault(obj => obj.name == "Boss");
```

### Trouver tous les ennemis avec un certain tag

```csharp
var ennemis = GameObject.FindGameObjectsWithTag("Enemy")
    .Where(e => e.GetComponent<Ennemi>().pointsDeVie > 50)
    .ToList();
```

### Trier les objets par distance du joueur

```csharp
var objets = GameObject.FindGameObjectsWithTag("Item")
    .OrderBy(o => Vector3.Distance(o.transform.position, transform.position))
    .ToList();
```

## Principales méthodes LINQ (les plus utiles)

| Méthode                        | Rôle                           | Exemple                           |
| ------------------------------ | ------------------------------ | --------------------------------- |
| `Where()`                      | Filtrer                        | `liste.Where(x => x > 5)`         |
| `Select()`                     | Transformer                    | `liste.Select(x => x * 2)`        |
| `OrderBy()`                    | Trier                          | `liste.OrderBy(x => x)`           |
| `OrderByDescending()`          | Trier inverse                  | `liste.OrderByDescending(x => x)` |
| `First()` / `FirstOrDefault()` | Prendre le premier             | `liste.First()`                   |
| `Any()`                        | Vérifie s’il existe un élément | `liste.Any(x => x > 10)`          |
| `Count()`                      | Compter les éléments           | `liste.Count(x => x > 0)`         |
| `ToList()`                     | Convertir en liste             | `query.ToList()`                  |
| `Distinct()`                   | Supprimer les doublons         | `liste.Distinct()`                |

## Comparaison avec une boucle normale

Sans LINQ :

```csharp
List<int> resultats = new List<int>();
foreach (int x in pointsDeVie)
{
    if (x > 70)
        resultats.Add(x);
}
```

Avec LINQ :

```csharp
var resultats = pointsDeVie.Where(x => x > 70).ToList();
```

Moins de code, plus lisible, et plus rapide à écrire.

## Bonnes pratiques

- LINQ est très pratique, mais **évite de l’utiliser dans** `Update()` (car chaque requête crée des objets temporaires).
- Utilise-le plutôt pour **initialiser ou traiter des données ponctuelles.**
- Pour les gros jeux, tu peux combiner LINQ avec `IEnumerable` et `yield` pour des traitements efficaces.

## Résumé

| Concept               | Explication bébé                                   | Exemple                                 |
| --------------------- | -------------------------------------------------- | --------------------------------------- |
| **LINQ**              | Une loupe magique 🔍 pour chercher dans tes listes | `.Where(x => x > 10)`                   |
| **using System.Linq** | C’est la porte magique qui active LINQ             | `using System.Linq;`                    |
| **Where()**           | Filtre les éléments                                | “Donne-moi seulement les ennemis forts” |
| **OrderBy()**         | Trie                                               | “Range-les du plus faible au plus fort” |
| **Select()**          | Transforme                                         | “Multiplie tous les scores par 2”       |
