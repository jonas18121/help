# Les GameObjects en C# (Unity 3D)

[Apprendre le C# - Épisode 4 : Les GameObjects (Unity 3D)](https://youtu.be/yLLRO7KqnX4?si=K8AV2NpR012pzucw)

[Documentation Unity](https://docs.unity3d.com/Manual/index.html)

## GameObject

[Documentation Unity de l'object GameObject](https://docs.unity3d.com/Manual/GameObjects.html)

Chaque objet du jeu est un GameObject , des personnages et objets de collection aux lumières,caméras
et des effets spéciaux. Cependant, un GameObject ne peut rien faire seul ; vous devez lui attribuer des propriétés avant qu'il puisse devenir un personnage, un environnement ou un effet spécial.

```csharp
public GameObject car;
```

## Qu’est-ce qu’un GameObject ?

Un GameObject est l’unité de base de tout ce qui existe dans une scène Unity.

C’est comme une “boîte vide” qui représente un objet dans ton jeu.

**Tout dans une scène Unity est un GameObject :**

- Le joueur
- La caméra
- Une lumière
- Un ennemi
- Un arbre
- Un cube 3D
- Même les objets invisibles servant de repère (ex : point de spawn)

## ⚙️ Structure d’un GameObject

Un GameObject tout seul ne fait rien.

Ce qui lui donne un comportement, ce sont ses composants (Components).

Exemple :

| Élément           | Type                   | Rôle                                           |
| ----------------- | ---------------------- | ---------------------------------------------- |
| **GameObject**    | Conteneur              | L’objet dans la scène                          |
| **Transform**     | Composant automatique  | Définit sa position, rotation, échelle         |
| **Mesh Renderer** | Composant visuel       | Affiche la forme 3D                            |
| **Collider**      | Composant physique     | Gère les collisions                            |
| **Rigidbody**     | Composant physique     | Donne de la gravité et du mouvement            |
| **Script**        | Composant personnalisé | Donne une logique (comme “déplacer le joueur”) |

## Imaginons que tu crées un cube dans Unity :

Menu > GameObject > 3D Object > Cube

**Unity crée automatiquement :**

- un GameObject nommé Cube
- un Transform
- un Mesh Filter
- un Mesh Renderer
- un Box Collider

Donc ce “cube” visible dans ta scène est un GameObject avec plusieurs composants.

## Exemple en code C#

Créer un GameObject depuis un script :

Ce script crée un cube invisible, mais qui existera bien dans la scène.

```csharp
using UnityEngine;

public class ExempleGameObject : MonoBehaviour
{
    void Start()
    {
        // Crée un nouveau GameObject vide
        GameObject monObjet = new GameObject("MonCube");

        // Ajoute-lui un cube visuel
        monObjet.AddComponent<MeshFilter>();
        monObjet.AddComponent<MeshRenderer>();

        // Ajoute un collider
        monObjet.AddComponent<BoxCollider>();

        // Change sa position
        monObjet.transform.position = new Vector3(0, 1, 0);
    }
}
```

Récupérer un GameObject existant :

Ici, tu manipules des GameObjects déjà présents dans ta scène Unity.


```csharp
public GameObject joueur;

void Start()
{
    // Trouve un GameObject dans la scène par son nom
    GameObject cameraPrincipale = GameObject.Find("Main Camera");

    // Affiche son nom dans la console
    Debug.Log("Nom de la caméra : " + cameraPrincipale.name);

    // Déplace le joueur
    joueur.transform.position = new Vector3(0, 2, 0);
}
```

### Autres usages pratiques

Activer / désactiver un GameObject

```csharp
joueur.SetActive(false); // désactive l'objet (invisible et inactif)
joueur.SetActive(true);  // le réactive
```

Supprimer un GameObject

```csharp
Destroy(joueur); // détruit le GameObject
```

### Créer un GameObject à partir d’un prefab

Instantiate sert à créer des copies d’un GameObject préconfiguré (par exemple un ennemi, une balle, un bonus…).

```csharp
public GameObject prefabEnnemi;

void Start()
{
    Instantiate(prefabEnnemi, new Vector3(0, 0, 0), Quaternion.identity);
}
```

## En résumé

| Élément           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| **GameObject**    | Boîte vide représentant un objet dans ta scène                    |
| **Component**     | Élément ajouté au GameObject pour lui donner des fonctionnalités  |
| **Transform**     | Composant toujours présent (position, rotation, échelle)          |
| **Prefab**        | Modèle enregistré d’un GameObject (pour le réutiliser facilement) |
| **Instantiate()** | Crée une copie d’un prefab                                        |
| **Destroy()**     | Supprime un GameObject de la scène                                |

## Image mentale simple :

- Un GameObject = une brique Lego.
- Les Components = les pièces que tu ajoutes dessus (roues, moteur, couleur...).

Sans composants, la brique est vide, mais c’est quand même un objet.