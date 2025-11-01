# Les Enums en C# (Unity 3D)

[Apprendre le C# - Épisode 15 : Les Enums (Unity 3D)](https://youtu.be/ndquRg3xI_4?si=n8fbcAfFfCM4faTX)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Bibliothèque du Namespace System.Collections.Generic](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0)
- [Github dotnet/runtime](https://github.com/dotnet/runtime)
- [Github dotnet/runtime/src/libraries/System.Collections/src/System/Collections/Generic](https://github.com/dotnet/runtime/tree/main/src/libraries/System.Collections/src/System/Collections/Generic)
- [Liste de touche du clavier via Keycode Unity](https://docs.unity3d.com/ScriptReference/KeyCode.html)


## Qu’est-ce qu’un Singleton ?

Un **Singleton est un objet dont il n’existe qu’une seule instance** dans tout le programme.

C’est comme **le roi du royaume** : il n’y a qu’un seul roi, et tout le monde peut le retrouver facilement.

En Unity, on l’utilise souvent pour des **managers globaux** :

- `GameManager` → contrôle le jeu
- `AudioManager` → gère la musique et les sons
- `UIManager` → gère les menus

Le but : **tout le monde peut accéder à cette instance** sans la recréer.

### Exemple

```csharp
using UnityEngine;

public class Player : MonoBehaviour
{
    void Start()
    {
        // Appel du singleton GameManager
        GameManager.Instance.JouerSonVictoire();
    }
}
```

- Tu n’as **jamais besoin de chercher le GameObject** dans la scène.
- Tu es sûr qu’il n’y a **qu’une seule instance** active.

## Avantages

1. **Accessible partout** via `ClassName.Instance`
2. **Une seule instance**, donc plus simple pour gérer des données globales
3. Permet de **ne pas recréer plusieurs fois** un manager inutilement

## Inconvénients (à connaître)

1. Peut devenir un **anti-pattern** si utilisé partout → rend le code **difficile à tester**
2. Trop de singletons → dépendances cachées entre classes
3. Pas très flexible pour des projets très grands

Règle : n’utilise un singleton que pour des **managers globaux vraiment uniques** (ex : AudioManager, GameManager).


### Variante “plus propre” en C#

```csharp
public class GameManager : MonoBehaviour
{
    private static GameManager _instance;
    public static GameManager Instance => _instance;

    void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(this.gameObject);
        }
        else
        {
            _instance = this;
            DontDestroyOnLoad(this.gameObject);
        }
    }
}
```

- Ici on **cache la variable** et on utilise une **propriété publique** pour accéder à l’instance.
- Plus “propre” pour le code et la maintenance.

## Métaphore

- **Singleton = roi unique du royaume** 👑
- **Tout le monde sait comment le trouver** → pas besoin de chercher dans tous les villages (scènes).
- **Si un deuxième roi apparaît** → on le renvoie 😅 (destroy)