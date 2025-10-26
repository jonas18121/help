# Les Lists en C# (Unity 3D)

[Apprendre le C# - Épisode 10 : Les Lists (Unity 3D)](https://youtu.be/SMNVSW4iaEE?si=CBZq94EOonT_koi_)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Bibliothèque du Namespace System.Collections.Generic](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0)
- [Github dotnet/runtime](https://github.com/dotnet/runtime)
- [Github dotnet/runtime/src/libraries/System.Collections/src/System/Collections/Generic](https://github.com/dotnet/runtime/tree/main/src/libraries/System.Collections/src/System/Collections/Generic)

## Qu’est-ce qu’une List<T> ?

Une **List** (ou **liste générique**) est une **collection dynamique** d’éléments.

Contrairement aux **arrays**, sa taille **peut changer à tout moment** (ajouter, retirer, trier, vider, etc.).

## Import nécessaire

Avant de pouvoir utiliser une List, tu dois importer la **bibliothèque des collections génériques :**

```csharp
using System.Collections.Generic;
```

Cette librairie contient plusieurs structures comme :

- `List<T>`
- `Dictionary<TKey, TValue>`
- `Queue<T> (file)`
- `Stack<T> (pile)`

`T` = “Type générique” → tu peux mettre n’importe quel type dedans (`int`, `string`, `GameObject`, etc.)

## Syntaxe de base

```csharp
List<type> nomDeLaListe = new List<type>();
```

Exemple :

```csharp
List<int> scores = new List<int>();
List<string> noms = new List<string>();
List<GameObject> ennemis = new List<GameObject>();
```

## Manipulation d’une List

Une List possède **plein de méthodes pratiques** pour gérer son contenu.

### ➕ Ajouter un élément

```csharp
scores.Add(100);
noms.Add("Alex");
```

### ➕ Ajouter plusieurs d’un coup

```csharp
scores.AddRange(new int[] { 200, 300, 400 });
```

### 🧾 Lire un élément

```csharp
Debug.Log(scores[0]);
```

### ✏️ Modifier un élément

```csharp
scores[1] = 999;
```

### ❌ Supprimer un élément

```csharp
scores.Remove(300);   // supprime la valeur 300
scores.RemoveAt(0);   // supprime l’élément à l’index 0
```

### 🔍 Vérifier si un élément existe

```csharp
if (scores.Contains(999))
    Debug.Log("Score trouvé !");
```

### 🔢 Compter le nombre d’éléments

```csharp
Debug.Log(scores.Count);
```

### 🧹 Vider la liste

```csharp
scores.Clear();
```

## Exemple concret dans Unity

Script : gestion d’ennemis dynamiques

```csharp
using System.Collections.Generic;
using UnityEngine;

public class GestionEnnemis : MonoBehaviour
{
    public GameObject prefabEnnemi;
    private List<GameObject> ennemis = new List<GameObject>();

    void Update()
    {
        // Appuyer sur E pour créer un ennemi
        if (Input.GetKeyDown(KeyCode.E))
        {
            GameObject nouveau = Instantiate(prefabEnnemi, Random.insideUnitSphere * 5, Quaternion.identity);
            ennemis.Add(nouveau);
            Debug.Log("Nombre d’ennemis : " + ennemis.Count);
        }

        // Appuyer sur R pour supprimer le dernier ennemi
        if (Input.GetKeyDown(KeyCode.R) && ennemis.Count > 0)
        {
            Destroy(ennemis[ennemis.Count - 1]);
            ennemis.RemoveAt(ennemis.Count - 1);
        }
    }
}
```

Résultat :

- Tu peux créer et détruire des ennemis **en temps réel** sans te soucier de la taille du tableau.
- Impossible à faire avec un array car il est **figé** après création.

## Les principales propriétés / méthodes

| Méthode / Propriété    | Description                            |
| ---------------------- | -------------------------------------- |
| `Add(item)`            | Ajoute un élément                      |
| `AddRange(collection)` | Ajoute plusieurs éléments              |
| `Insert(index, item)`  | Insère à un index précis               |
| `Remove(item)`         | Supprime un élément (par valeur)       |
| `RemoveAt(index)`      | Supprime par position                  |
| `Clear()`              | Vide la liste                          |
| `Count`                | Nombre d’éléments actuels              |
| `Contains(item)`       | Vérifie si un élément est présent      |
| `IndexOf(item)`        | Renvoie l’index de l’élément           |
| `Sort()`               | Trie la liste (si le type est triable) |
| `Reverse()`            | Inverse l’ordre                        |
| `ToArray()`            | Convertit la liste en tableau          |


## Comparaison complète : Array vs List<T>

| Critère              | `Array`                                           | `List<T>`                                              |
| -------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| 🧱 Définition        | Collection fixe d’éléments                        | Collection dynamique d’éléments                        |
| 📏 Taille            | Fixe (définie à la création)                      | Changeable (ajout/suppression)                         |
| 🧩 Type              | `int[]`, `string[]`, etc.                         | `List<int>`, `List<string>`, etc.                      |
| 🔄 Ajout / retrait   | Impossible directement                            | Méthodes `.Add()`, `.Remove()`, etc.                   |
| 🔢 Compter           | `array.Length`                                    | `list.Count`                                           |
| 🚀 Performance brute | Légèrement plus rapide (moins de gestion mémoire) | Un peu plus lente, mais négligeable                    |
| 🧠 Simplicité        | Simple mais rigide                                | Plus pratique et moderne                               |
| 🎮 Usage Unity       | Données fixes (4 points de spawn, couleurs)       | Collections variables (ennemis, objets ramassés, etc.) |

Règle simple :

- Si tu connais à l’avance le nombre d’éléments -> Array
- Si la quantité change en cours de jeu -> List

## Parcourir une List

Comme un tableau !

### Avec for :

```csharp
for (int i = 0; i < scores.Count; i++)
{
    Debug.Log("Score " + i + " : " + scores[i]);
}
```

### Avec foreach :

```csharp
foreach (int score in scores)
{
    Debug.Log("Score : " + score);
}
```

## Conversion entre List et Array

Tu peux passer de l’un à l’autre facilement :

```csharp
int[] tableau = { 1, 2, 3 };
List<int> liste = new List<int>(tableau); // array -> list

int[] nouveauTableau = liste.ToArray();   // list -> array
```

## Récupération de masse (Unity)

Tu peux utiliser des List pour récupérer plusieurs objets dans ta scène :

### Exemples pratiques :

**Récupérer tous les objets d’un tag :**

```csharp
GameObject[] ennemisArray = GameObject.FindGameObjectsWithTag("Enemy");
List<GameObject> ennemis = new List<GameObject>(ennemisArray);
```

**Filtrer certains objets :**

```csharp
List<GameObject> ennemisActifs = new List<GameObject>();

foreach (GameObject ennemi in ennemis)
{
    if (ennemi.activeInHierarchy)
        ennemisActifs.Add(ennemi);
}
```

Avantage :

Tu peux **filtrer**, **ajouter** ou **supprimer** facilement, contrairement à un tableau fixe.

## En résumé

| Concept                             | Image simple                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| `Array`                             | Une boîte à cases **figée** : tu décides à l’avance combien il y en a         |
| `List`                              | Une boîte **élastique** : tu peux ajouter ou enlever des cases pendant le jeu |
| `using System.Collections.Generic;` | Le mot magique pour débloquer les List                                        |
| `.Add()` / `.Remove()`              | Pour gérer ce qu’il y a dans la boîte                                         |
| `.Count`                            | Pour savoir combien il y a de choses dedans                                   |
