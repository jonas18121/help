# Les Enums en C# (Unity 3D)

[Apprendre le C# - Épisode 14 : Les Enums (Unity 3D)](https://youtu.be/ctebtsMGq9k?si=_w20YN4tZAJOLL5g)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Bibliothèque du Namespace System.Collections.Generic](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0)
- [Github dotnet/runtime](https://github.com/dotnet/runtime)
- [Github dotnet/runtime/src/libraries/System.Collections/src/System/Collections/Generic](https://github.com/dotnet/runtime/tree/main/src/libraries/System.Collections/src/System/Collections/Generic)
- [Liste de touche du clavier via Keycode Unity](https://docs.unity3d.com/ScriptReference/KeyCode.html)

- [Documentation officielle Vector2](https://docs.unity3d.com/ScriptReference/Vector2.html)
- [GitHub / code source Vector2](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Vector2.cs)
- [GitHub / code source Vector2int](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Vector2Int.cs)
- [Documentation officielle Vector3](https://docs.unity3d.com/ScriptReference/Vector3-up.html)
- [GitHub / code source Vector3](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Vector3.cs)
- [GitHub / code source Vector3int](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Vector3Int.cs)
- [Documentation officielle Vector4](https://docs.unity3d.com/ScriptReference/Vector4.html)
- [GitHub / code source Vector4](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Vector4.cs)

## Qu’est-ce qu’un vecteur ?

En Unity, un **vecteur** est une **structure mathématique** qui représente :
- une **position** dans l’espace
- une **direction**
- une **distance**
- une **force**

Selon le nombre de dimensions, on a :

| Type      | Dimensions      | Exemple                                                |
| --------- | --------------- | ------------------------------------------------------ |
| `Vector2` | 2D (x, y)       | position d’un sprite sur un plan                       |
| `Vector3` | 3D (x, y, z)    | position dans la scène 3D                              |
| `Vector4` | 4D (x, y, z, w) | utilisé pour certaines opérations graphiques / shaders |


## Les composantes x, y, z

Un vecteur est composé de **composantes** :

```csharp
Vector3 position = new Vector3(1f, 2f, 3f);

float posX = position.x; // 1
float posY = position.y; // 2
float posZ = position.z; // 3
```

- **x** : horizontal (gauche-droite)

- **y** : vertical (haut-bas)

- **z** : profondeur (avant-arrière)

⚠️ En 2D, tu utilises souvent Vector2 : `x` et `y` seulement.

## Opérations classiques sur vecteurs

| Opération                      | Exemple                  | Résultat                                 |
| ------------------------------ | ------------------------ | ---------------------------------------- |
| Addition                       | `v1 + v2`                | Somme des composantes                    |
| Soustraction                   | `v1 - v2`                | Différence des composantes               |
| Multiplication par un scalaire | `v * 2`                  | Toutes les composantes multipliées par 2 |
| Magnitude (longueur)           | `v.magnitude`            | √(x² + y² + z²)                          |
| Normalisation                  | `v.normalized`           | Vecteur avec longueur 1, même direction  |
| Distance                       | `Vector3.Distance(a, b)` | Distance entre deux points               |
| Produit scalaire               | `Vector3.Dot(a, b)`      | mesure l’angle / projection              |
| Produit vectoriel              | `Vector3.Cross(a, b)`    | vecteur perpendiculaire à a et b         |

#### Exemple concret : déplacer un objet

```csharp
using UnityEngine;

public class Deplacement : MonoBehaviour
{
    void Update()
    {
        // Déplace l'objet vers la droite
        transform.position += new Vector3(1f, 0f, 0f) * Time.deltaTime * 5f;

        // Déplace l'objet vers l'avant
        transform.position += Vector3.forward * Time.deltaTime * 3f;
    }
}
```

- `Vector3.forward` = `(0, 0, 1)` Déplace l'objet vers l'avant
- `Vector3.right` = `(1, 0, 0)` Déplace l'objet vers la droite
- `Vector3.up` = `(0, 1, 0)` Déplace l'objet vers le haut

## Méthodes utiles de Vector3

| Méthode                                             | Description                                   |
| --------------------------------------------------- | --------------------------------------------- |
| `Vector3.Lerp(a, b, t)`                             | interpolation linéaire entre `a` et `b`       |
| `Vector3.MoveTowards(current, target, maxDistance)` | avance vers `target` d’une distance max       |
| `Vector3.Distance(a, b)`                            | distance entre deux vecteurs                  |
| `Vector3.Normalize(v)`                              | normalise le vecteur                          |
| `Vector3.SqrMagnitude`                              | longueur au carré (plus rapide que magnitude) |
| `Vector3.Angle(a, b)`                               | angle entre deux vecteurs en degrés           |
| `Vector3.Cross(a, b)`                               | produit vectoriel (vecteur perpendiculaire)   |
| `Vector3.Dot(a, b)`                                 | produit scalaire (mesure d’alignement)        |


## Vecteurs et Unity

- `transform.position` -> `Vector3`

- `transform.forward` -> direction avant du GameObject (`Vector3`)

- `transform.up` -> direction verticale

- `transform.right` -> direction horizontale

- Beaucoup de fonctions Unity utilisent `Vector3` pour positions, forces, raycasts, rotations.

# x, y, z, w

## Imagine un plan 2D (comme une feuille de papier)

- **x** = horizontal (gauche ↔ droite)

- **y** = vertical (haut ↕ bas)

💡 Exemple : tu dessines un point sur ta feuille :

```csharp
Vector2 point = new Vector2(3, 5);
```

- `point.x` = 3 → 3 cases à droite

- `point.y` = 5 → 5 cases vers le haut

Voilà ton point dans le plan 2D.

## Maintenant imagine un espace 3D (comme une boîte / chambre)

On ajoute une profondeur : z

- **x** = gauche/droite
- **y** = haut/bas
- **z** = avant/arrière (profondeur)

💡 Exemple : tu mets un cube dans la scène 3D :

```csharp
Vector3 cube = new Vector3(1, 2, 3);
```


- `cube.x = 1` -> 1 case à droite
- `cube.y = 2` -> 2 cases vers le haut
- `cube.z = 3` -> 3 cases vers l’avant (profondeur)

Dans Unity : `(0,0,0)` est souvent le **centre du monde.**

## Et le w dans Vector4 ?

- `w` = un “4ème chiffre magique” utilisé pour certaines maths avancées (shader, transformation, homogène)

- En général, pour la position d’un objet, tu utilises **Vector3**

- Vector4 sert surtout **pour la lumière, les couleurs RGBA, ou la 3D math complexe**

💡 Exemple :

```csharp
Vector4 couleur = new Vector4(1, 0.5f, 0, 1); // RGBA
// x = rouge, y = vert, z = bleu, w = alpha (opacité)
```

## Petite métaphore

Imagine que tu as une **boîte de cubes :**

- **x** -> combien de cubes à gauche/droite

- **y** -> combien de cubes en hauteur

- **z** -> combien de cubes en profondeur (vers toi / loin)

- **w** -> un cube secret que tu peux utiliser pour faire des effets spéciaux

Tu peux **placer un objet dans cette boîte** en donnant ses coordonnées `(x, y, z)`.

```csharp
using UnityEngine;

public class BabyCube : MonoBehaviour
{
    void Start()
    {
        // Déplacer le cube à 3 cases à droite, 2 en haut, 5 vers l'avant
        transform.position = new Vector3(3, 2, 5);

        // Afficher chaque coordonnée
        Debug.Log("x = " + transform.position.x);
        Debug.Log("y = " + transform.position.y);
        Debug.Log("z = " + transform.position.z);
    }
}
```

Résultat : ton cube apparaît **dans l’espace 3D exactement où tu veux.**