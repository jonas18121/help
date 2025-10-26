# Les Array en C# (Unity 3D)

[Apprendre le C# - Épisode 9 : Les Array (Unity 3D)](https://youtu.be/fDe954epghs?si=A-cHaTfiJjeUW4sA)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Consulter les classes dans Unity](https://github.com/Unity-Technologies/UnityCsReference/tree/master)
- [Code de la classe Degug](https://github.com/Unity-Technologies/UnityCsReference/tree/master/Runtime/Export/Debug)
- [Code de la classe Ray](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Geometry/Ray.cs)
- [Code de la classe Quaternion](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Quaternion.cs)
- [Code de la classe Collision](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/Managed/Collision.cs)
- [Code de la classe Physics](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/ScriptBindings/Physics.bindings.cs)
- [Code de la classe Transform](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Transform/ScriptBindings/Transform.bindings.cs)
- [Code de la classe Input](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/InputLegacy/Input.bindings.cs)

## Qu’est-ce qu’un array (ou tableau) ?

Les arrays servent à stocker plusieurs valeurs dans une seule variable.
C’est comme une boîte à plusieurs compartiments où tu ranges plusieurs objets du même type.

Un array est une collection de variables du même type (ex: plusieurs nombres, plusieurs GameObjects, plusieurs strings…).

Exemple concret :

💬 Si tu veux stocker les noms de 3 joueurs :

```csharp
string joueur1 = "Léo";
string joueur2 = "Mila";
string joueur3 = "Noah";
```
C’est possible… mais pas pratique

Avec un array, tu peux tout mettre dans une seule variable :

```csharp
string[] joueurs = { "Léo", "Mila", "Noah" };
```

## Syntaxe d’un array en C#

Voici la forme générale :

```csharp
type[] nomDuTableau = new type[taille];
```

| Élément  | Description                                                |
| -------- | ---------------------------------------------------------- |
| `type`   | le type des valeurs (int, float, string, GameObject, etc.) |
| `[]`     | indique qu’on parle d’un **tableau**                       |
| `new`    | crée un nouvel espace mémoire                              |
| `taille` | le nombre d’éléments dans le tableau                       |

Tableau de nombres :

```csharp
int[] scores = new int[3];   // un tableau de 3 cases
scores[0] = 100;
scores[1] = 200;
scores[2] = 300;
```

Chaque élément est repéré par un index (ou “numéro de case”)

- Le premier élément a toujours l’index 0

- Donc pour 3 éléments → les index sont 0, 1 et 2

## Lire et modifier un élément

```csharp
int[] scores = { 10, 20, 30 };

Debug.Log(scores[0]); // affiche 10
scores[1] = 99;       // change le 20 en 99
Debug.Log(scores[1]); // affiche 99
```

## Array dans Unity

Les arrays sont **super utiles dans Unity** pour stocker :

- plusieurs ennemis,
- plusieurs points de spawn,
- plusieurs sons,
- plusieurs objets à activer/désactiver, etc.

### Exemple 1 : allumer plusieurs lumières

```csharp
using UnityEngine;

public class AllumerLumières : MonoBehaviour
{
    public Light[] lumières; // assigné dans l’inspecteur

    void Start()
    {
        for (int i = 0; i < lumières.Length; i++)
        {
            lumières[i].enabled = true;
        }
    }
}
```

Ici :

- lumières.Length : donne le nombre d’éléments dans le tableau
- lumières[i] : accède à chaque lumière une par une

### Exemple 2 : faire apparaître plusieurs ennemis

```csharp
using UnityEngine;

public class SpawnEnnemis : MonoBehaviour
{
    public GameObject[] ennemis; // tableau de prefabs

    void Start()
    {
        for (int i = 0; i < ennemis.Length; i++)
        {
            Instantiate(ennemis[i], new Vector3(i * 2, 0, 0), Quaternion.identity);
        }
    }
}
```

Chaque prefab d’ennemi est instancié à un endroit différent.

## Quelques propriétés utiles

| Propriété / Méthode           | Description                                 |
| ----------------------------- | ------------------------------------------- |
| `array.Length`                | nombre total d’éléments                     |
| `array[i]`                    | élément à l’index *i*                       |
| `foreach`                     | boucle simplifiée pour parcourir un tableau |
| `System.Array.Sort(array)`    | trie les éléments                           |
| `System.Array.Reverse(array)` | inverse l’ordre                             |

## Boucle foreach avec un array

Très pratique pour parcourir tout un tableau sans compteur :

```csharp
string[] fruits = { "pomme", "banane", "orange" };

foreach (string fruit in fruits)
{
    Debug.Log("J’aime les " + fruit);
}
```

Pas besoin d’écrire for (int i = 0; i < fruits.Length; i++).

## Attention à la taille fixe !

**Un array classique en C# a une taille fixe :**

- **Une fois créé, tu ne peux pas ajouter ou retirer d’élément.**

Exemple :

```csharp
int[] scores = new int[3];
scores[0] = 10;
scores[1] = 20;
scores[2] = 30;

// Impossible de faire scores[3] = 40 ! ❌
```

**Si tu veux pouvoir ajouter / supprimer des éléments dynamiquement,**
**il faut utiliser une List** (List<T>)` **au lieu d’un array.**

## Différence entre Array et List

| Différence                 | `Array`                               | `List<T>`                                   |
| -------------------------- | ------------------------------------- | ------------------------------------------- |
| Taille                     | Fixe                                  | Dynamique                                   |
| Rapidité                   | Un peu plus rapide                    | Légèrement plus lent                        |
| Facilité d’ajout / retrait | Difficile                             | Très simple (`Add()`, `Remove()`)           |
| Usage Unity                | Données fixes (ex: 4 points de spawn) | Collections variables (ex: ennemis vivants) |

## En résumé

Imagine une boîte à compartiments :

- Chaque case a un numéro (0, 1, 2, …)
- Tu peux y ranger des objets du même type
- Tu peux ouvrir une case avec son numéro (index)

| Exemple                      | Signification                                 |
| ---------------------------- | --------------------------------------------- |
| `int[] scores = new int[3];` | Crée un tableau avec 3 cases pour des nombres |
| `scores[0] = 10;`            | Met 10 dans la première case                  |
| `scores[1] = 20;`            | Met 20 dans la deuxième case                  |
| `Debug.Log(scores[2]);`      | Affiche la valeur de la troisième case        |
| `scores.Length`              | Donne le nombre total de cases                |
