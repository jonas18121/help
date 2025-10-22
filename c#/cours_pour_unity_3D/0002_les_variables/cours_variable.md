Les variables et typages en C# (Unity 3D)

[Apprendre le C# - Épisode 1 : Les variables (Unity 3D)](https://youtu.be/RAZjcibFE1A?si=heBY9Z8meGlvIIS9)

[Documentation Unity](https://docs.unity3d.com/Manual/index.html)

Syntaxe d'une variable :

```c#
public string leNom = "le nom";
```

- Modificateur d'accès il en existe d'autre, mais on utilise surtout (public et private)
- Type de la variable exemple (string, int, bool, float)
- Pour le nom de la variable, on utilise une convention de nommage lowerCamelCase sans caractères spéciaux et sans accent

Particularité des variable float, il fauf mettre un f a la fin

```c#
public float experience = 4.21f;
```

#### Typage GameObject

[Documentation Unity de l'object GameObject](https://docs.unity3d.com/Manual/GameObjects.html)

Chaque objet du jeu est un GameObject , des personnages et objets de collection aux lumières,caméras
et des effets spéciaux. Cependant, un GameObject ne peut rien faire seul ; vous devez lui attribuer des propriétés avant qu'il puisse devenir un personnage, un environnement ou un effet spécial.

```csharp
public GameObject car;
```

Voici une liste variée de types de variables en C# qu'on peut utiliser dans Unity, avec des exemples concrets :

```csharp
using UnityEngine;

public class ExempleVariables : MonoBehaviour
{
    // 🔢 Types de base
    public int score = 100;                     // Nombre entier
    public float vitesse = 4.5f;                // Nombre à virgule flottante
    public double precision = 0.9999;           // Plus grande précision que float
    public bool estActif = true;                // Booléen (vrai / faux)
    public char lettre = 'A';                   // Caractère unique
    public string nomDuJoueur = "PlayerOne";    // Chaîne de caractères

    // 🧩 Types Unity spécifiques
    public GameObject joueur;                   // Référence à un objet de la scène
    public Transform pointDeSpawn;              // Position, rotation, échelle
    public Rigidbody corpsRigide;               // Composant de physique
    public Collider zoneDeContact;              // Collision
    public Camera cameraPrincipale;             // Caméra
    public AudioSource musique;                 // Source audio

    // 🎨 Types Unity de math / couleur
    public Vector3 positionInitiale = new Vector3(0, 1, 0); // Vecteur 3D
    public Vector2 direction = new Vector2(1, 0);            // Vecteur 2D
    public Quaternion rotation = Quaternion.identity;        // Rotation
    public Color couleur = Color.red;                        // Couleur Unity
    public Color32 couleur32 = new Color32(255, 128, 0, 255);// Version 8 bits par canal

    // 📦 Collections
    public int[] tableauDeScores = { 10, 20, 30 };           // Tableau
    public string[] noms = { "Alice", "Bob", "Charlie" };    // Tableau de strings
    public List<GameObject> ennemis;                         // Liste dynamique d’objets
    public Dictionary<string, int> inventaire;                // Dictionnaire (clé-valeur)

    // 🕹️ Types personnalisés et autres
    public Animation animationPersonnage;                    // Référence à une animation
    public Material materiau;                                // Matériau pour rendu
    public Sprite icone;                                     // Sprite 2D
    public Texture texture;                                  // Texture 3D/2D
    public Light lumiere;                                    // Lumière Unity

    // 🧠 Exemple de structure personnalisée 
    // Cet attribut dit à Unity que cette structure peut être affichée et modifiée dans l’inspecteur (le panneau à droite dans l’éditeur).
    // Sans ce tag, Unity ne pourrait pas afficher les champs internes (niveau, experience, etc.) dans l’inspecteur.
    [System.Serializable] 
    public struct Statistiques // on crée une structure appelée Statistiques.
    {
        public int niveau;
        public float experience;
        public int pointsDeVie;
    }

    // on crée une instance de cette structure.
    public Statistiques statsJoueur = new Statistiques { niveau = 1, experience = 0f, pointsDeVie = 100 };
}
```

