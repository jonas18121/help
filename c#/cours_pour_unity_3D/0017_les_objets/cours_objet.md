# Les Objets en C# (Unity 3D)

[Apprendre le C# - Épisode 16 : Les Objets (Unity 3D)](https://youtu.be/R1PWQUIKwK0?si=blkDjMMpflvSrF0J)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Bibliothèque du Namespace System.Collections.Generic](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0)
- [Github dotnet/runtime](https://github.com/dotnet/runtime)
- [Github dotnet/runtime/src/libraries/System.Collections/src/System/Collections/Generic](https://github.com/dotnet/runtime/tree/main/src/libraries/System.Collections/src/System/Collections/Generic)
- [Liste de touche du clavier via Keycode Unity](https://docs.unity3d.com/ScriptReference/KeyCode.html)


## Qu’est-ce qu’un objet ?

Imagine que tu joues avec **des jouets dans ta chambre**

Chaque jouet a :

- un **nom**
- une **couleur**
- un **comportement** (ex : “roule”, “saute”, “fait du bruit”)

👉 En programmation, c’est pareil :

- un **objet** = une **chose** que ton jeu connaît (un joueur, un ennemi, une balle, etc.)
- il a des **données (variables)** et des **actions (fonctions)**

💡 En C#, ces objets viennent de **classes** (le modèle de fabrication).

## La classe = la moule / plan de construction

Imagine que tu es un fabricant de jouets :

Tu fais un **moule** 🧩 (la classe), et tu peux créer **plusieurs jouets identiques** (les objets).

```csharp
public class Jouet
{
    public string nom;
    public string couleur;

    public void Parler()
    {
        Debug.Log("Je suis un jouet qui parle !");
    }
}
```

Puis tu crées **des objets** à partir de cette classe :

```csharp
Jouet monJouet = new Jouet();
monJouet.nom = "Nounours";
monJouet.couleur = "Marron";
monJouet.Parler();
```

## L’encapsulation : protéger l’objet 🛡️

L’encapsulation, c’est quand tu **protèges les données internes** d’un objet pour éviter qu’on les modifie n’importe comment.

On utilise des mots-clés d’accès :

- `public` → visible partout
- `private` → visible uniquement à l’intérieur de la classe
- `protected` → visible dans la classe et ses enfants (on verra plus bas)

Exemple :

```csharp
public class Joueur
{
    private int pointsDeVie = 100;

    public void SubirDegats(int degats)
    {
        pointsDeVie -= degats;
        Debug.Log("PV restants : " + pointsDeVie);
    }
}
```

Ici :

- `pointsDeVie` est **privé** → on ne peut pas y toucher directement.
- On utilise une **fonction publique** pour le modifier proprement.

C’est comme un **jouet fragile** dans une vitrine : tu ne peux pas le toucher directement, tu dois demander au vendeur de t’aider

## L’héritage : les enfants apprennent des parents

Une classe peut **hériter** d’une autre pour **réutiliser** ses données et ses fonctions.

```csharp
public class Animal
{
    public void Manger()
    {
        Debug.Log("L'animal mange 🍽️");
    }
}

public class Chat : Animal
{
    public void Miauler()
    {
        Debug.Log("Miaou 🐱");
    }
}
```

Maintenant :

```csharp
Chat monChat = new Chat();
monChat.Manger();  // vient d’Animal
monChat.Miauler(); // vient de Chat
```

`Chat` hérite des **capacités de Animal**, et peut aussi **ajouter les siennes**.

Héritage = comme un enfant qui apprend les habitudes de ses parents.

## Le polymorphisme : plusieurs formes possibles

Le polymorphisme permet à des classes **différentes** de se **comporter différemment** tout en partageant le même type parent.

```csharp
public class Ennemi
{
    public virtual void Attaquer()
    {
        Debug.Log("L'ennemi attaque !");
    }
}

public class Gobelin : Ennemi
{
    public override void Attaquer()
    {
        Debug.Log("Le gobelin donne un coup d'épée !");
    }
}

public class Dragon : Ennemi
{
    public override void Attaquer()
    {
        Debug.Log("Le dragon crache du feu !");
    }
}
```

puis : 

```csharp
Ennemi ennemi = new Dragon();
ennemi.Attaquer(); // Affiche : "Le dragon crache du feu !"
```

Même fonction (Attaquer()), mais **comportement différent** selon l’objet.

## `[System.Serializable]` : rendre visible dans Unity 

C’est un **attribut spécial** que tu mets avant une classe pour que **Unity puisse la montrer dans l’inspecteur.**

Exemple :

```csharp
[System.Serializable]
public class Statistiques
{
    public int niveau;
    public float experience;
    public int pointsDeVie;
}

public class Joueur : MonoBehaviour
{
    public Statistiques stats = new Statistiques();
}
```

Dans l’**inspecteur Unity**, tu verras un **petit bloc** avec les champs `niveau`, `experience`, `pointsDeVie`.

C’est très pratique pour **structurer les données** sans avoir plusieurs variables séparées.

## En résumé

| Concept                   | Métaphore                        | Exemple Unity                                 |
| ------------------------- | -------------------------------- | --------------------------------------------- |
| **Classe**                | Moule / plan de fabrication      | `public class Joueur {}`                      |
| **Objet**                 | Jouet fabriqué à partir du moule | `new Joueur()`                                |
| **Encapsulation**         | Vitrine de protection            | `private` + méthodes publiques                |
| **Héritage**              | Enfant qui apprend des parents   | `class Chat : Animal`                         |
| **Polymorphisme**         | Plusieurs formes d’un même type  | `override`                                    |
| **[System.Serializable]** | Rend visible dans Unity          | Classes de données visibles dans l’inspecteur |

