# Les Enums en C# (Unity 3D)

[Apprendre le C# - Épisode 14 : Les Enums (Unity 3D)](https://youtu.be/ndquRg3xI_4?si=n8fbcAfFfCM4faTX)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Bibliothèque du Namespace System.Collections.Generic](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0)
- [Github dotnet/runtime](https://github.com/dotnet/runtime)
- [Github dotnet/runtime/src/libraries/System.Collections/src/System/Collections/Generic](https://github.com/dotnet/runtime/tree/main/src/libraries/System.Collections/src/System/Collections/Generic)
- [Liste de touche du clavier via Keycode Unity](https://docs.unity3d.com/ScriptReference/KeyCode.html)


## Qu’est-ce qu’un enum ?

Un **enum** (ou énumération) est un **type de variable spécial** qui permet de **donner des noms à des valeurs entières.**

Au lieu d’écrire des nombres magiques dans ton code, tu donnes un **nom clair et lisible** à chaque valeur.

Exemple simple :

```csharp
public enum Direction
{
    Haut,    // 0
    Bas,     // 1
    Gauche,  // 2
    Droite   // 3
}
```

- Ici Direction est un **type** (comme `int` ou `float`).
- Les valeurs par défaut commencent à **0** et augmentent automatiquement.
- On peut maintenant créer une variable de type `Direction` :

```csharp
Direction monDeplacement = Direction.Haut;

if (monDeplacement == Direction.Haut)
{
    Debug.Log("Je vais vers le haut !");
}
```

## Pourquoi utiliser un enum ?

- **Lisibilité :** ton code devient beaucoup plus clair.

    Au lieu de if (direction == 0), tu écris if (direction == Direction.Haut)

- **Sécurité :** tu ne peux pas mettre n’importe quelle valeur.

    Si monDeplacement est de type Direction, tu ne peux pas lui mettre 42.

- **Maintenance facile :** ajouter une nouvelle direction est simple.

- **Refactorisation simplifiée :** si tu changes le nom de Haut en Up, toutes les références sont mises à jour.

## Personnaliser les valeurs

Tu peux donner des valeurs entières spécifiques :

```csharp
public enum Direction
{
    Haut = 10,
    Bas = 20,
    Gauche = 30,
    Droite = 40
}
```

- Maintenant `Direction.Haut` vaut `10` au lieu de `0`.
- C’est utile si tu dois interfacer avec des données externes ou des fichiers.

## Utilisation dans Unity

Exemple : gestion d’ennemis

```csharp
public enum TypeEnnemi
{
    Gobelin,
    Troll,
    Dragon
}

public class Ennemi : MonoBehaviour
{
    public TypeEnnemi type;

    void Start()
    {
        if (type == TypeEnnemi.Dragon)
        {
            Debug.Log("Attention, un dragon !");
        }
    }
}
```

- Dans l’inspecteur Unity, tu verras un **menu déroulant** pour choisir le type d’ennemi.
- Pratique pour **éviter les erreurs de frappe** ou les “magic numbers”.

## Enum vs Constantes

- **Constantes** (const int) : tu dois retenir la valeur exacte
- **Enum** : tu utilises un **nom lisible**
- En général, pour des **catégories ou états fixes**, préférez **enum**.

```csharp
// Constantes
const int HAUT = 0;
const int BAS = 1;

// Enum
enum Direction { Haut, Bas, Gauche, Droite }
```

Enum = plus sûr et plus clair.

## Bonnes pratiques

- Utilise enums pour **états, types ou catégories fixes.**

- Ne pas utiliser pour **valeurs numériques qui changent ou sont continues** (ex : vitesse).

- Tu peux **combiner avec switch** :

```csharp
switch(monDeplacement)
{
    case Direction.Haut:
        Debug.Log("Haut !");
        break;
    case Direction.Bas:
        Debug.Log("Bas !");
        break;
    case Direction.Gauche:
        Debug.Log("Gauche !");
        break;
    case Direction.Droite:
        Debug.Log("Droite !");
        break;
}
```