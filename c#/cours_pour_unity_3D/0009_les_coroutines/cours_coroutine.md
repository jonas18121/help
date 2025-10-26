# Les Coroutines en C# (Unity 3D)

[Apprendre le C# - Épisode 8 : Les Coroutines (Unity 3D)](https://youtu.be/1YnbTilK6js?si=Xt8jJ4aN7enwuQ1c)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Consulter les classes dans Unity](https://github.com/Unity-Technologies/UnityCsReference/tree/master)
- [Code de la classe Degug](https://github.com/Unity-Technologies/UnityCsReference/tree/master/Runtime/Export/Debug)
- [Code de la classe Ray](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Geometry/Ray.cs)
- [Code de la classe Quaternion](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Quaternion.cs)
- [Code de la classe Collision](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/Managed/Collision.cs)
- [Code de la classe Physics](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/ScriptBindings/Physics.bindings.cs)
- [Code de la classe Transform](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Transform/ScriptBindings/Transform.bindings.cs)
- [Code de la classe Input](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/InputLegacy/Input.bindings.cs)

## Qu’est-ce qu’une Coroutine ?

Une Coroutine est une fonction spéciale dans Unity qui te permet de faire une pause dans ton code — sans bloquer le jeu.

🧠 En clair :
- c’est une fonction que tu peux arrêter temporairement,
attendre un moment, puis reprendre plus tard.

C’est comme dire à Unity :

- “Fais ça maintenant… puis attends un peu… puis continue.”

### Sans coroutine : tout s’exécute d’un coup

```csharp
void Start()
{
    Debug.Log("Début");
    Attendre();
    Debug.Log("Fin");
}

void Attendre()
{
    System.Threading.Thread.Sleep(2000); // attend 2 secondes
}
```

Problème : le jeu se fige pendant 2 secondes ! (car Sleep() bloque tout le moteur Unity)

### Avec coroutine : tout continue à tourner

```csharp
IEnumerator Start()
{
    Debug.Log("Début");
    yield return new WaitForSeconds(2);
    Debug.Log("2 secondes plus tard");
}
```

Ici :

- Le jeu continue de tourner normalement

- Le yield return new WaitForSeconds(2) dit à Unity :

    - “Stop cette fonction pendant 2 secondes, mais continue le reste du jeu.”

## Le mot-clé magique : IEnumerator

En C#, une fonction qui retourne un IEnumerator permet d’utiliser le mot yield.

```csharp
IEnumerator MaCoroutine()
{
    // ton code ici
    yield return null;
}
```

“IEnumerator” signifie : “Je rends le contrôle au moteur Unity pendant un moment.”

Unity va alors “reprendre” la coroutine au moment du prochain yield.

## Comment lancer une coroutine

Tu ne peux pas l’appeler directement comme une fonction classique.

Tu dois la démarrer avec Unity via :

```csharp
StartCoroutine(NomDeLaCoroutine());
```

Exemple :

```csharp
void Start()
{
    StartCoroutine(AttendreEtAfficher());
}

IEnumerator AttendreEtAfficher()
{
    Debug.Log("Début");
    yield return new WaitForSeconds(3f);
    Debug.Log("3 secondes plus tard !");
}
```

## Les différents types d’attente possibles

| Instruction                                      | Description                                       |
| ------------------------------------------------ | ------------------------------------------------- |
| `yield return null;`                             | Attend **une frame** (le prochain Update)         |
| `yield return new WaitForSeconds(2);`            | Attend **2 secondes**                             |
| `yield return new WaitUntil(() => condition);`   | Attend **jusqu’à ce qu’une condition soit vraie** |
| `yield return new WaitWhile(() => condition);`   | Attend **tant qu’une condition est vraie**        |
| `yield return StartCoroutine(AutreCoroutine());` | Attend **qu’une autre coroutine se termine**      |

## Exemple concret dans Unity : faire clignoter un objet

```csharp
using UnityEngine;

public class Clignotant : MonoBehaviour
{
    private Renderer rend;

    void Start()
    {
        rend = GetComponent<Renderer>();
        StartCoroutine(Clignoter());
    }

    IEnumerator Clignoter()
    {
        while (true)
        {
            rend.enabled = !rend.enabled; // active/désactive le rendu
            yield return new WaitForSeconds(1f); // attend 1 seconde
        }
    }
}
```

Résultat : L’objet clignote toutes les secondes — sans bloquer le reste du jeu.

## Exemple : spawn d’ennemis à intervalle régulier

```csharp
using UnityEngine;

public class Spawner : MonoBehaviour
{
    public GameObject ennemiPrefab;
    public float intervalle = 2f;

    void Start()
    {
        StartCoroutine(SpawnerEnnemis());
    }

    IEnumerator SpawnerEnnemis()
    {
        while (true)
        {
            Instantiate(ennemiPrefab, transform.position, Quaternion.identity);
            yield return new WaitForSeconds(intervalle);
        }
    }
}
```

Cette coroutine crée un ennemi toutes les 2 secondes,
sans bloquer ton Update() ni ralentir ton jeu.

## Exemple : effet progressif (fade, montée de volume, etc.)

```csharp
IEnumerator FadeIn(AudioSource source, float duree)
{
    float temps = 0;
    while (temps < duree)
    {
        source.volume = temps / duree;
        temps += Time.deltaTime;
        yield return null; // attend une frame
    }
    source.volume = 1;
}
```

Ici, on augmente le volume progressivement sur duree secondes.

Si on faisait ça dans une simple boucle for, le volume passerait instantanément à 1 (en une seule frame !).

## Comment arrêter une coroutine
1. Avec sa référence :

```csharp
Coroutine maRoutine;

void Start()
{
    maRoutine = StartCoroutine(Clignoter());
}

void Update()
{
    if (Input.GetKeyDown(KeyCode.Space))
        StopCoroutine(maRoutine);
}
```

2. Ou en appelant son nom :

```csharp
StopCoroutine("Clignoter");
```

3. Ou toutes d’un coup :

```csharp
StopAllCoroutines();
```

### Pourquoi utiliser des coroutines (et pas des boucles classiques)

| Problème avec une boucle classique          | Avantage d’une Coroutine                         |
| ------------------------------------------- | ------------------------------------------------ |
| Bloque le jeu pendant qu’elle s’exécute     | Continue en parallèle du reste                   |
| Impossible d’attendre du temps sans bloquer | `WaitForSeconds()` gère ça naturellement         |
| Ne peut pas s’étaler sur plusieurs frames   | Peut durer plusieurs secondes, minutes ou frames |
| Moins lisible pour des suites d’actions     | Code clair et fluide (“attends → continue”)      |

## Comparaison concrète

### 🚫 Mauvais : bloquant
 
```csharp
void Start()
{
    for (int i = 0; i < 5; i++)
    {
        Debug.Log("Boom " + i);
        System.Threading.Thread.Sleep(1000); // ❌ bloque tout Unity
    }
}
```

Le jeu gèle pendant 5 secondes.

### ✅ Bon : non bloquant

```csharp
IEnumerator Start()
{
    for (int i = 0; i < 5; i++)
    {
        Debug.Log("Boom " + i);
        yield return new WaitForSeconds(1);
    }
}
```

Le jeu continue à tourner pendant que les “Boom” s’affichent.

## Schéma mental pour retenir

🧩 Une coroutine, c’est :

- comme une fonction qui peut faire des pauses

- pendant que le reste du jeu continue à vivre

💬 “Je fais quelque chose → j’attends → je reprends.”

## En résumé

| Mot                    | Ce que ça veut dire                           |
| ---------------------- | --------------------------------------------- |
| `IEnumerator`          | Type spécial qui permet de “faire des pauses” |
| `yield return`         | Moment où la coroutine s’interrompt           |
| `WaitForSeconds(x)`    | Attente d’un certain temps                    |
| `StartCoroutine()`     | Démarre une coroutine                         |
| `StopCoroutine()`      | L’arrête                                      |
| `yield return null`    | Attend une frame                              |
| `WaitUntil(condition)` | Attend jusqu’à ce que quelque chose soit vrai |
