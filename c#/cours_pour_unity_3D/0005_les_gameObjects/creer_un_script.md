# Comment créer un script C# dans Unity, où le placer, comment l’ouvrir et comment l’attacher à un GameObject ?

## Étape 0 — Prérequis

Assure-toi d’avoir :

Unity Hub installé et connecté (tu l’as déjà fait ✅)

Un projet Unity ouvert (si pas encore : ouvre Unity Hub → Projects → New Project → choisis 3D ou 2D, donne un nom, clique Create).

## 1) Ouvre la fenêtre Project

Dans l’éditeur Unity, regarde en bas (ou dans Window > General > Project).

C’est ici que se trouvent tous les fichiers de ton projet (dossier Assets).

## 2) Créer une organisation simple dans Assets (très important pour rester propre)

Dans la fenêtre Project, fais un clic droit sur Assets.

Sélectionne Create > Folder.

Nomme le dossier Scripts.

Tu peux aussi créer Prefabs, Scenes, Materials, Textures de la même façon.
→ Résultat : Assets/Scripts, etc.

Pourquoi ? Parce que garder les fichiers bien rangés évite la panique quand le projet grandit.

## 3) Créer un script C# (pas à la main sur le disque — fais-le depuis Unity)

Ouvre le dossier Scripts (double-clic).

Clic droit dans la zone vide du dossier → Create > C# Script.

Nom du fichier : Spawner (écris Spawner puis Enter).

Important : le nom du script doit correspondre au nom de la classe C# à l’intérieur (respecte la casse).

Tu viens de créer un fichier Spawner.cs dans Assets/Scripts/Spawner.cs.

## 4) Ouvrir le script dans l’éditeur de code

Double-clic sur Spawner.cs dans la fenêtre Project.

Unity ouvrira ton éditeur par défaut (Visual Studio Code, Visual Studio, Rider...).

Si Unity ne sait pas quel éditeur utiliser : Edit > Preferences > External Tools → choisis ton éditeur.

## 5) Que contient le script par défaut ?

Unity génère automatiquement quelque chose comme :

```csharp
using UnityEngine;

public class Spawner : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
```

- MonoBehaviour : base pour tous les scripts qui doivent être attachés à des GameObjects.

- Start() : appelé une fois au début.

- Update() : appelé à chaque frame.

## 6) Exemple simple : faire apparaître un prefab au démarrage

Remplace le contenu par ce code (copier-coller) :

```csharp
using UnityEngine;

public class Spawner : MonoBehaviour
{
    public GameObject prefab;          // glisser le prefab ici dans l'inspecteur
    public Vector3 spawnPosition = new Vector3(0, 1, 0);

    void Start()
    {
        // instancie une copie du prefab à la position spawnPosition
        if (prefab != null)
        {
            Instantiate(prefab, spawnPosition, Quaternion.identity);
        }
        else
        {
            Debug.LogWarning("Prefab non assigné dans l'inspecteur !");
        }
    }
}
```

## 7) Créer un prefab simple (si tu n’en as pas)

1. Dans la scène, GameObject > 3D Object > Cube. Le cube apparaît dans la Hiérarchie.

2. Personnalise si tu veux (scale, couleur...).

3. Dans la fenêtre Project, ouvre le dossier Prefabs.

4. Glisse le Cube depuis la Hierarchy vers Assets/Prefabs.

-  Le cube devient un prefab (icône bleue).

## 8) Attacher le script à un GameObject

1. Crée un GameObject vide → GameObject > Create Empty. Renomme-le SpawnManager.

2. Sélectionne SpawnManager dans la Hierarchy.

3. Dans l’Inspector, clique Add Component → tape Spawner → sélectionne ton script.

4. Tu verras maintenant les champs publics Prefab et Spawn Position dans l’inspector du SpawnManager.

## 9) Lier le prefab dans l’inspecteur

- Dans SpawnManager (sélectionné), fais glisser le prefab (Assets/Prefabs/Cube) dans le champ Prefab du composant Spawner.

## 10) Lancer la scène

- Appuie sur ▶️ (Play) en haut de l’éditeur.

- Tu verras qu’à l’exécution, une copie du prefab apparaît à la position spawnPosition.

## 11) Conseils pour débutant

- Nom des fichiers = nom des classes : si le fichier s’appelle Spawner.cs, la classe publique à l’intérieur doit s’appeler Spawner.

- Fais souvent Save et reviens dans Unity pour voir les changements (Unity compile automatiquement).

- Regarde la console (Window → General → Console) pour les erreurs de compilation (rouge) ou les messages Debug.Log.

- Utilise public pour exposer dans l’inspector, private pour cacher. Tu peux aussi utiliser [SerializeField] private GameObject prefab; pour garder la variable privée mais visible dans l’inspector.

- Si Unity n’a pas recompilé : sauvegarde le script puis retourne dans Unity et attends quelques secondes.

## 12) En cas d’erreur commune (très fréquente)

- Erreur : The type or namespace name 'Spawner' could not be found
→ Vérifie que le nom de la classe à l’intérieur du fichier correspond exactement au nom du fichier (sensible à la casse).

- Erreur : CS0106 ou autre compilation red : ouvre la Console et lis l’erreur — copie-la si tu veux que je t’aide.