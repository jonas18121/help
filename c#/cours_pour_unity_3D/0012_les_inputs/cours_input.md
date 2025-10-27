# Les Anciens Inputs en C# (Unity 3D)

[Apprendre le C# - Épisode 11 : Les Inputs (Unity 3D)](https://youtu.be/ddsVOqx2yW0?si=fjB5XryiBetjOdQq)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Bibliothèque du Namespace System.Collections.Generic](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0)
- [Github dotnet/runtime](https://github.com/dotnet/runtime)
- [Github dotnet/runtime/src/libraries/System.Collections/src/System/Collections/Generic](https://github.com/dotnet/runtime/tree/main/src/libraries/System.Collections/src/System/Collections/Generic)
- [Liste de touche du clavier via Keycode Unity](https://docs.unity3d.com/ScriptReference/KeyCode.html)
- [Ancien Input](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Input/Private/Input.cs)
- [Nouveau InputSystem](https://github.com/Unity-Technologies/InputSystem)

## Ce qu’est la classe Ancien Input (UnityEngine.Input)

la classe Input de Unity (souvent nommée UnityEngine.Input) est l’un des points de base pour capturer les entrées de l’utilisateur (clavier, souris, touches, axes, etc.).

- Input fait partie du namespace UnityEngine (donc tu n’as pas besoin d’un using spécial pour y accéder au-delà de using UnityEngine).

- C’est une classe **statique** dans le sens où on ne l’instancie jamais : on appelle directement ses méthodes / propriétés.

- Elle fait partie de l’“ancien système” d’entrées de Unity, aussi appelé **Input Manager / Legacy Input System.** Unity recommande dans beaucoup de cas d’utiliser son **nouveau système d’Input** (Input System package), mais `Input` reste largement utilisé, surtout pour des projets simples ou existants.

- Le code source de cette implémentation “legacy / classique” est accessible dans le dépôt **UnityCsReference** sur GitHub, dans le dossier `Modules/Input/Private/Input.cs`

## Où voir le code source

- **GitHub – UnityCsReference :** ce dépôt contient les références du code C# que Unity expose ou utilise. La partie Input se trouve ici :
https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Input/Private/Input.cs

- **Nouveau système d’input Unity :** le package moderne est open source et se trouve dans le dépôt **Unity-Technologies/InputSystem** sur GitHub.

- Le dépôt du nouveau système permet de voir comment Unity gère des concepts plus modernes (actions, périphériques, etc.).

## Méthodes clés et propriétés de Input

Voici les fonctions / propriétés les plus courantes que tu utiliseras avec Input. Ce n’est pas toute la classe, mais ce sont les plus utiles :

| Méthode / Propriété                    | Type de retour / paramètres | Que fait-elle / quand l’utiliser                                                                                   |
| -------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Input.GetKey(KeyCode key)`            | bool                        | Renvoie `true` tant que la touche `key` est **maintenue**.                                                         |
| `Input.GetKeyDown(KeyCode key)`        | bool                        | Renvoie `true` **exactement au moment** où la touche `key` est **pressée** (transition non-pression → pression).   |
| `Input.GetKeyUp(KeyCode key)`          | bool                        | Renvoie `true` **au moment où la touche est relâchée** (pression → non-pression).                                  |
| `Input.GetButton(string name)`         | bool                        | Renvoie `true` tant qu’un “bouton” virtuel (défini dans les settings Input Manager) est maintenu.                  |
| `Input.GetButtonDown(string name)`     | bool                        | Renvoie `true` au moment où le bouton est pressé.                                                                  |
| `Input.GetButtonUp(string name)`       | bool                        | Renvoie `true` au moment où le bouton est relâché.                                                                 |
| `Input.GetAxis(string name)`           | float                       | Renvoie une valeur flottante entre –1 et +1 selon le mouvement de l’“axe” (ex : “Horizontal”, “Vertical”, souris). |
| `Input.GetAxisRaw(string name)`        | float                       | Même chose que `GetAxis`, mais sans interpolation lissée — plus “brut”.                                            |
| `Input.mousePosition`                  | `Vector3`                   | Donne la position de la souris en pixels dans l’écran (coordonnées d’écran).                                       |
| `Input.mousePresent`                   | bool                        | `true` si une souris est connectée / présente.                                                                     |
| `Input.GetMouseButton(int button)`     | bool                        | Similaire à GetKey, pour boutons de souris (0 = gauche, 1 = droite, 2 = milieux)                                   |
| `Input.GetMouseButtonDown(int button)` | bool                        | `true` au frame où le bouton de souris est pressé.                                                                 |
| `Input.GetMouseButtonUp(int button)`   | bool                        | `true` au frame où le bouton de souris est relâché.                                                                |
| `Input.touchCount`                     | int                         | Nombre de touches (touches d’écran) actuellement en contact (utile pour mobile).                                   |
| `Input.GetTouch(int index)`            | `Touch`                     | Donne les données de la touche à l’index donné (position, phase, etc.).                                            |
| `Input.acceleration`                   | `Vector3`                   | Données d’accélération (accéléromètre) sur mobile.                                                                 |
| `Input.gyro`                           | `Gyroscope`                 | Accès au gyroscope du dispositif mobile (si disponible).                                                           |
| `Input.compass`                        | `Compass`                   | Accès à la boussole du dispositif (si disponible).                                                                 |
| `Input.location`                       | `LocationService`           | Accès aux services de localisation (GPS) sur mobile.                                                               |

## Notes sur certaines méthodes

- `GetKey` / `GetKeyDown` / `GetKeyUp` utilisent l’énumération `KeyCode` (par exemple `KeyCode.Space` pour la barre espace).

- Pour les boutons nommés (Input Manager), tu dois définir les “Axes / Buttons” dans **Edit > Project Settings > Input** (les noms doivent correspondre aux chaînes que tu utilises dans les scripts).

- `GetAxis` peut être utilisé pour des joystick, ou pour transformer “W/S / flèches haut bas” en une valeur flottante (ex : “Vertical”).

- Toute méthode `Down` ou `Up` ne renvoie `true` qu’au **frame** où l’événement se produit.

- `Input.mousePosition` est très utile pour convertir la position du curseur en coordonnées du monde (avec `Camera.ScreenPointToRay`, `Camera.ScreenToWorldPoint`, etc.).

## Comparaison “Input Class” vs “New Input System”

L’ancienne classe `Input` est simple et directe, mais elle a des limitations :

- Peu flexible pour gérer différentes plateformes, rebindings de touches, manettes multiples, etc.

- Toutes les entrées sont “pull-based” : tu dois dans `Update()` vérifier avec `Input.GetKey...` etc.

- Intégration limitée pour les jeux plus complexes ou multi-plateformes.

Le **nouveau système d’Input** (Input System package) est plus moderne, basé sur des **actions**, des **contrôleurs**, des **bindings**, etc.

Il offre des fonctionnalités comme rebinding à la volée, support natif multi-plateforme, gestion des périphériques multiples, etc.

## Exemple simple d’usage de Input dans un script

```csharp
using UnityEngine;

public class ExempleInput : MonoBehaviour
{
    void Update()
    {
        // si on appuie sur la barre espace
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Debug.Log("Espace pressé");
        }

        // si on maintient la touche W
        if (Input.GetKey(KeyCode.W))
        {
            transform.position += Vector3.forward * Time.deltaTime * 5f;
        }

        // clic gauche de la souris
        if (Input.GetMouseButtonDown(0))
        {
            Debug.Log("Clic souris gauche");
        }

        // mouvement horizontal (clavier ou joystick)
        float h = Input.GetAxis("Horizontal");
        if (Mathf.Abs(h) > 0.1f)
        {
            transform.position += Vector3.right * h * Time.deltaTime * 3f;
        }

        // position de la souris
        Vector3 posSouris = Input.mousePosition;
        Debug.Log("Souris : " + posSouris);
    }
}
```

# Nouveau inputSystem

## Qu’est-ce que le New Input System

Le **Nouveau Input System** (ou **Unity Input System**) est un **package officiel Unity** qui remplace l’ancien UnityEngine.Input.

👉 Il permet de gérer **toutes les entrées** :

- clavier 🖱️
- souris 🕹️
- manettes 🎮
- écrans tactiles 📱
- VR / AR controllers 🥽
    ...et même plusieurs joueurs en même temps.

Il a été conçu pour être :

- **plus propre** (plus d’énormes if (Input.GetKey...))

- **plus extensible** (support de nouveaux périphériques)

- **plus configurable** (sans modifier le code)

- et **plus structuré** (avec un système d’“actions” réutilisables)

## Différence avec l’ancien système

| Ancien système (`Input`)                        | Nouveau système (`Input System`)                    |
| ----------------------------------------------- | --------------------------------------------------- |
| Tu vérifies les touches à chaque `Update()`     | Tu reçois des **événements** (ex : “jump pressed”)  |
| Tu codes directement les touches dans le script | Tu définis des **actions configurables**            |
| Un seul joueur à la fois                        | Multi-joueur et multi-device supportés              |
| Peu flexible (dur à étendre)                    | Modulaire et compatible avec toutes les plateformes |
| Code en dur : `Input.GetKey(KeyCode.Space)`     | Liaison : “Jump” → Espace / bouton A / tap écran    |

## Installation et activation

### Étape 1️⃣ — Ouvre le Package Manager

`Window > Package Manager`

- Cherche **Input System**
- Installe le package officiel **(by Unity Technologies)**

### Étape 2️⃣ — Active le nouveau système

Unity te demandera :

“Do you want to enable the new Input System and restart the editor?”

👉 Clique **Yes**, Unity redémarrera.

## Les concepts clés

Le **nouveau Input System** est basé sur 3 niveaux :

**① Actions**

Des “événements” d’entrée abstraits :

Exemples :

- Move
- Jump
- Shoot
- Look

Ce ne sont pas des touches, mais des **intents (intentions).**

**② Bindings**

Les **liaisons** entre une action et une entrée réelle :

- `Jump` -> `Espace` (clavier)

- `Jump` -> `Button South` (manette Xbox)

- `Move` -> `WASD`, ou stick gauche, ou joystick

Une seule “action” peut avoir **plusieurs bindings** (super pratique pour multiplateforme).

**③ Action Maps**

Des “groupes d’actions”.

Exemples :

- Player (Move, Jump, Attack)
- UI (Navigate, Submit, Cancel)
- Vehicle (Accelerate, Brake)

Tu peux activer / désactiver une carte complète selon le contexte :

```csharp
playerControls.Player.Enable();
playerControls.UI.Disable();
```

## Exemple concret (clavier + souris)

### Étape 1️⃣ — Crée un Input Actions Asset

Dans ton projet : 

`Assets > Create > Input Actions`

Renomme-le par exemple `PlayerControls.inputactions`

Double-clique dessus → ça ouvre l’éditeur visuel du Input System.

- Ajoute une Action Map appelée Player
- Ajoute une Action appelée Move
    - Type : Value
    - Control Type : Vector2
    - Binding : ajoute WASD ou “2D Vector Composite”

- Ajoute une **Action** appelée Jump
    - Type : Button
    - Binding : Space

Sauvegarde ✅

### Étape 2️⃣ — Génère la classe C#

Dans l’inspecteur, clique sur :

**Generate C# Class**

Unity crée automatiquement un script, par exemple :

`PlayerControls.cs`

### Étape 3️⃣ — Utilise-le dans ton code

```csharp
using UnityEngine;
using UnityEngine.InputSystem; // ⚠️ important !

public class PlayerMovement : MonoBehaviour
{
    private PlayerControls controls;
    private Vector2 moveInput;

    void Awake()
    {
        controls = new PlayerControls();

        // Quand on bouge
        controls.Player.Move.performed += ctx => moveInput = ctx.ReadValue<Vector2>();
        controls.Player.Move.canceled += ctx => moveInput = Vector2.zero;

        // Quand on saute
        controls.Player.Jump.performed += ctx => Jump();
    }

    void OnEnable() => controls.Player.Enable();
    void OnDisable() => controls.Player.Disable();

    void Update()
    {
        Vector3 move = new Vector3(moveInput.x, 0, moveInput.y);
        transform.Translate(move * 5f * Time.deltaTime);
    }

    void Jump()
    {
        Debug.Log("Saut !");
    }
}
```

## Gérer les manettes et autres périphériques

Tu peux ajouter des bindings supplémentaires :

- Move → Stick gauche
- Jump → Bouton A
- Shoot → Bouton RT

Et tout fonctionne **automatiquement**, sans modifier le script !

Tu peux aussi brancher plusieurs manettes et gérer plusieurs joueurs via le composant PlayerInput.

## Bonus : composant PlayerInput (facile)

Unity fournit un composant pratique :

`Add Component > Player Input`

Il te permet de :

- connecter ton `Input Actions` directement
- choisir un comportement (“Send Messages”, “Invoke Unity Events”, “Broadcast Messages”)
- gérer les événements comme `OnMove`, `OnJump`, etc. sans écrire le code à la main

## Liens utiles

| Ressource                                           | Lien                                                                                                                                                           |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📘 Documentation officielle Unity Input System      | [https://docs.unity3d.com/Packages/com.unity.inputsystem@1.7/manual/index.html](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.7/manual/index.html) |
| 💾 Code source GitHub (officiel Unity Technologies) | [https://github.com/Unity-Technologies/InputSystem](https://github.com/Unity-Technologies/InputSystem)                                                         |
| 🧠 Tutoriel Unity Learn                             | [https://learn.unity.com/project/new-input-system](https://learn.unity.com/project/new-input-system)                                                           |

## En résumé

| Ancien système (`Input`)   | Nouveau (`Input System`)       |
| -------------------------- | ------------------------------ |
| Simple mais limité         | Moderne, modulaire, extensible |
| `GetKey(KeyCode.Space)`    | “Jump” Action liée à “Space”   |
| Code tout en dur           | Configurable visuellement      |
| Une seule entrée à la fois | Multi-device, multi-joueur     |
| Pas d’événements           | Basé sur des callbacks         |
