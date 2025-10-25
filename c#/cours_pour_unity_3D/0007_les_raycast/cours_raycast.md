# Les Rayscasts en C# (Unity 3D)

[Apprendre le C# - Épisode 6 : Les Rayscasts (Unity 3D)](https://youtu.be/Wf0eB_ygGp0?si=u_JDwDbIiOoR37jg)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Consulter les classes dans Unity](https://github.com/Unity-Technologies/UnityCsReference/tree/master)
- [Code de la classe Degug](https://github.com/Unity-Technologies/UnityCsReference/tree/master/Runtime/Export/Debug)
- [Code de la classe Ray](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Geometry/Ray.cs)
- [Code de la classe Quaternion](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Quaternion.cs)
- [Code de la classe Collision](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/Managed/Collision.cs)
- [Code de la classe Physics](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/ScriptBindings/Physics.bindings.cs)
- [Code de la classe Transform](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Transform/ScriptBindings/Transform.bindings.cs)
- [Code de la classe Input](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/InputLegacy/Input.bindings.cs)

## Qu’est-ce qu’un Raycast ?

Un **Raycast** (ou “lancer de rayon”) est une **ligne invisible** que Unity projette dans une direction, à partir d’un point, pour voir **ce qu’elle touche.**

🧠 Imagine : tu pointes un laser depuis ta main → s’il touche un mur, tu peux savoir :

- ce qu’il a touché (le nom de l’objet)
- à quelle distance
- où exactement dans l’espace

C’est **comme un petit radar** que tu envoies depuis un point.

## À quoi ça sert ?

Quelques exemples concrets :

- 🔫 Tirer sur des ennemis (jeu de tir)
- 👀 Vérifier si le joueur regarde un objet
-🚶‍♂️ Détecter un mur devant un personnage
- 🧱 Empêcher de traverser une paroi invisible
- 🖱️ Savoir sur quoi le joueur clique avec la souris (dans un jeu 3D)

## Comment ça marche (principe de base)

La fonction principale est :

```csharp
Physics.Raycast()
```

Elle “lance” un rayon depuis un point, dans une direction, et te dit **s’il a touché quelque chose.**

## Exemple simple de Raycast

On va faire un script qui tire un rayon depuis la caméra vers l’avant, et affiche ce qu’il touche.

### Étape 1 — Créer un script

Dans Assets/Scripts/, crée un script appelé **RaycastTest.cs**

```csharp
using UnityEngine;

public class RaycastTest : MonoBehaviour
{
    void Update()
    {
        // Lancer un rayon depuis la position de la caméra, vers l'avant
        Ray ray = new Ray(transform.position, transform.forward);

        // Pour stocker les infos de collision
        RaycastHit hit;

        // Distance maximale : 100 unités
        if (Physics.Raycast(ray, out hit, 100f))
        {
            Debug.Log("Le rayon a touché : " + hit.collider.name);
        }
    }
}
```

### Étape 2 — Attache le script à la caméra

1. Sélectionne **Main Camera** dans la hiérarchie.
2. Clique **Add Component** > cherche RaycastTest.
3. Lance le jeu et regarde la **Console.**

Chaque frame, le script envoie un rayon vers l’avant de la caméra.
S’il touche un objet, Unity affiche son nom.

## Visualiser le rayon dans la scène

Pour bien comprendre, ajoute ceci à ton script :

```csharp
void Update()
{
    Ray ray = new Ray(transform.position, transform.forward);
    RaycastHit hit;

    // Dessine le rayon en rouge dans la vue "Scene"
    Debug.DrawRay(ray.origin, ray.direction * 100f, Color.red);

    if (Physics.Raycast(ray, out hit, 100f))
    {
        Debug.Log("Touché : " + hit.collider.name + " à une distance de " + hit.distance);
    }
}
```
Dans la **vue Scene** (pas la vue Game), tu verras un **trait rouge** partant de la caméra.

## Exemple : tirer un rayon quand on clique

```csharp
using UnityEngine;

public class RaycastClick : MonoBehaviour
{
    void Update()
    {
        if (Input.GetMouseButtonDown(0)) // Clic gauche
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit))
            {
                Debug.Log("Tu as cliqué sur : " + hit.collider.name);

                // Exemple : change la couleur de l'objet touché
                hit.collider.GetComponent<Renderer>().material.color = Color.red;
            }
        }
    }
}
```

Ici, le rayon part depuis la position du curseur sur l’écran, vers la scène 3D.
C’est parfait pour des jeux de tir, des systèmes de clics, ou de sélection d’objets.

## Exemple plus complet : tir avec impact

```csharp
using UnityEngine;

public class RaycastShoot : MonoBehaviour
{
    public float distance = 50f;
    public GameObject effetImpact;

    void Update()
    {
        if (Input.GetButtonDown("Fire1"))
        {
            Ray ray = new Ray(transform.position, transform.forward);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit, distance))
            {
                Debug.Log("Touché : " + hit.collider.name);

                // Crée un effet visuel à l'impact
                if (effetImpact != null)
                    Instantiate(effetImpact, hit.point, Quaternion.LookRotation(hit.normal));
            }
        }
    }
}
```

Ici :

- On tire un rayon quand on clique.
- S’il touche quelque chose > on affiche le nom et on crée un effet (effetImpact = prefab de particules, par exemple).

## Le paramètre RaycastHit

C’est une **structure** (un petit ensemble de données) qui contient plein d’infos sur ce que le rayon a touché :

| Propriété       | Description                                       |
| --------------- | ------------------------------------------------- |
| `hit.collider`  | Le collider touché                                |
| `hit.point`     | Position exacte du point d’impact                 |
| `hit.normal`    | La direction perpendiculaire à la surface         |
| `hit.distance`  | Distance entre l’origine du rayon et l’impact     |
| `hit.transform` | Le GameObject touché (`hit.transform.gameObject`) |

## Autres variantes utiles

- Physics.Raycast(origin, direction) — version la plus simple
- Physics.Raycast(origin, direction, out hit, distance) — avec infos sur la collision
- Physics.RaycastAll() — détecte tous les objets sur le trajet du rayon
- Physics.RaycastNonAlloc() — version optimisée pour la performance (moins utilisée au début)

## Récapitulatif

| Étape                    | Action                                             |
| ------------------------ | -------------------------------------------------- |
| 🔦 **Raycast**           | Un rayon invisible envoyé dans une direction       |
| 📍 **Détection**         | S’il touche quelque chose, Unity renvoie les infos |
| 🧱 **Nécessite**         | Des objets avec un **Collider**                    |
| 👁️ **Debug.DrawRay**    | Permet de le visualiser dans la vue “Scene”        |
| 🖱️ **ScreenPointToRay** | Lance un rayon depuis la souris (clic)             |

## Exemple concret de jeu

Imaginons un jeu de tir :

- Le joueur clique → un rayon part depuis son arme vers l’avant.
- S’il touche un “Enemy”, on affiche un effet et on lui enlève de la vie.
- S’il touche un mur, on affiche juste un impact visuel.

C’est **grâce aux Raycasts** que le tir est instantané, sans balle physique.

## Petit résumé

🧠 Un **Raycast**, c’est comme un **laser invisible** que tu tires depuis un point dans une direction.

Unity te dit si ce laser a touché quelque chose, et où.

C’est simple, rapide et super utile dans plein de cas !