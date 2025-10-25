# Fonctions OnTrigger  en C# (Unity 3D)

[Apprendre le C# - Épisode 5 : Fonctions OnTrigger  (Unity 3D)](https://youtu.be/MXcriHBaKAg?si=KVnty8lassXtXo4J)

[Documentation Unity](https://docs.unity3d.com/Manual/index.html)

## 1. C’est quoi un Trigger ?

Dans Unity, un **Collider** (comme BoxCollider, SphereCollider, CapsuleCollider…) sert à **détecter les collisions physiques.**

Mais si tu veux **détecter** qu’un objet **entre dans une zone sans rebondir ou être bloqué,**
tu coches l’option 👉 “Is Trigger” dans le composant Collider.

En résumé :

- Collider normal → collision physique (les objets se bloquent)

- Collider “Is Trigger” → pas de collision physique, mais **détection d’événements**

## 2. Les fonctions “OnTrigger” (C#)

Unity appelle automatiquement certaines fonctions de ton script quand un Trigger est activé.

Elles sont toujours écrites avec cette forme précise (majuscules importantes 👇) :

| Fonction                           | Quand elle est appelée                     |
| ---------------------------------- | ------------------------------------------ |
| **OnTriggerEnter(Collider other)** | Quand un objet **entre** dans le trigger   |
| **OnTriggerStay(Collider other)**  | Tant qu’un objet **reste** dans le trigger |
| **OnTriggerExit(Collider other)**  | Quand un objet **sort** du trigger         |

### 3. Exemple complet : Détection d’un joueur

Étape 1 — Crée un “Trigger Zone”

1. Dans Unity : GameObject > 3D Object > Cube

2. Dans l’inspecteur, **coche “Is Trigger”** dans le composant Box Collider.

3. (Optionnel) Agrandis-le pour former une zone, par exemple Scale = (3, 1, 3).

💡 Tu viens de créer une zone de détection invisible.

## Étape 2 — Crée un script ZoneDeDetection.cs

Dans ton dossier Scripts, fais clic droit → Create > C# Script → nomme-le ZoneDeDetection.

Ouvre-le et mets ceci :

```csharp
using UnityEngine;

public class ZoneDeDetection : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("Quelqu’un est entré dans la zone : " + other.name);
    }

    private void OnTriggerStay(Collider other)
    {
        Debug.Log("L’objet " + other.name + " est encore dans la zone");
    }

    private void OnTriggerExit(Collider other)
    {
        Debug.Log(other.name + " est sorti de la zone !");
    }
}
```

## Étape 3 — Attache le script

1. Sélectionne ton Cube (la zone trigger) dans la hiérarchie.

2. Clique Add Component > cherche ton script ZoneDeDetection > ajoute-le.

## Étape 4 — Crée un objet qui entrera dans la zone

1. Crée une **sphère** : GameObject > 3D Object > Sphere.

2. Ajoute-lui un **Rigidbody** (dans Add Component → Rigidbody).
👉 Important : sans Rigidbody, les OnTrigger ne se déclenchent pas.

**Règle d’or Unity :**

Pour que **OnTrigger** fonctionne, **au moins un des deux objets** (celui avec le Collider ou celui qui entre dans le trigger) doit avoir un **Rigidbody.**

## Étape 5 — Teste !

- Appuie sur ▶️ Play.

- Déplace la sphère pour qu’elle entre dans la zone (ou laisse la gravité la faire tomber).

- Regarde la Console : tu verras s’afficher les messages :

```txt
Quelqu’un est entré dans la zone : Sphere
L’objet Sphere est encore dans la zone
Sphere est sorti de la zone !
```

## 6. À quoi sert le paramètre Collider other ?

Le paramètre other représente l’objet qui a traversé le trigger.
Tu peux l’utiliser pour vérifier qui est entré.

Exemple :

```csharp
private void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Player"))
    {
        Debug.Log("Le joueur est entré !");
    }
}
```
Ici, on ne réagit que si l’objet possède le tag “Player”.

## 7. Exemple concret — ramasser un objet

Imaginons un “ramassage de pièce” 🪙 :

```csharp
using UnityEngine;

public class Piece : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            Debug.Log("Le joueur a ramassé une pièce !");
            Destroy(gameObject); // Supprime la pièce
        }
    }
}
```
Résultat : quand le joueur touche la pièce, elle disparaît et affiche un message.

## 8. Résumé rapide pour ne pas oublier

| Élément                                             | Nécessaire pour OnTrigger |
| --------------------------------------------------- | ------------------------- |
| Collider avec “Is Trigger” activé                   | ✅                         |
| L’autre objet a un Collider normal                  | ✅                         |
| Au moins un des deux a un Rigidbody                 | ✅                         |
| Fonction `OnTriggerEnter/Stay/Exit(Collider other)` | ✅                         |
| Pas de fautes de majuscules !                       | ✅                         |



## 9. Bonus — visualiser la zone dans la scène

Tu peux ajouter ce petit bout de code pour dessiner la zone dans la vue “Scene” :

```csharp
private void OnDrawGizmos()
{
    Gizmos.color = Color.green;
    Gizmos.DrawWireCube(transform.position, transform.localScale);
}
```
Ça dessine un cube vert autour de ton trigger pour bien visualiser la zone.

## En résumé

Un **Trigger** est une **zone de détection invisible.**

Les fonctions `OnTriggerEnter`, `OnTriggerStay` et `OnTriggerExit` sont des **événements automatiques** que Unity appelle quand des objets **traversent cette zone.**

C’est parfait pour détecter un joueur, ramasser un objet, déclencher un piège, ou lancer une cinématique.