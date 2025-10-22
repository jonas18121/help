Les fonctions en C# (Unity 3D)

[Apprendre le C# - Épisode 2 : Les fonctions (Unity 3D)](https://youtu.be/MXD_dljMIVY?si=QJyWR9VB4Klw0oRk)

[Documentation Unity](https://docs.unity3d.com/Manual/index.html)

Syntaxe d'une fonction :

```c#
void maFonction(int monInt) = "le nom";
```
- Le type = void
- Nom de la fonction = maFonction
- Le paramètre de la fonction = monInt

## Les fonctions classique (magiques) de Unity avec leurs spécificité

Unity appelle automatiquement certaines fonctions “magiques” (ou Unity event functions) selon le cycle de vie du jeu et des objets.

Voici une liste complète et claire des fonctions Unity les plus classiques, avec leur moment d’exécution et leur spécificité

### Cycle de vie principal d’un script Unity
| Méthode             | Quand elle est appelée                                     | Spécificité                                                                              |
| ------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **`Awake()`**       | Juste après la création du GameObject, **avant** `Start()` | Initialisation des variables ou références (même si l’objet est désactivé).              |
| **`OnEnable()`**    | Chaque fois que l’objet devient actif dans la scène        | Appelée à chaque activation (`gameObject.SetActive(true)` ou rechargement).              |
| **`Start()`**       | Une seule fois, juste avant la première frame d’exécution  | Initialisation qui dépend d’autres objets déjà activés.                                  |
| **`Update()`**      | À **chaque frame**                                         | Logique principale : mouvement, entrée clavier, IA, etc.                                 |
| **`LateUpdate()`**  | Après tous les `Update()`                                  | Idéal pour suivre des objets (ex : positionner une caméra après le mouvement du joueur). |
| **`FixedUpdate()`** | À intervalle fixe (lié à la physique)                      | Utilisé pour les calculs physiques (`Rigidbody`, forces…).                               |


### Cycle de vie de la physique

| Méthode                                     | Quand elle est appelée                          | Spécificité                                               |
| ------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------- |
| **`OnCollisionEnter(Collision collision)`** | Quand un objet entre en collision avec un autre | Nécessite des **Colliders** et au moins un **Rigidbody**. |
| **`OnCollisionStay(Collision collision)`**  | Tant que les objets restent en contact          | Appelée chaque frame de contact.                          |
| **`OnCollisionExit(Collision collision)`**  | Quand les objets ne se touchent plus            | Fin du contact physique.                                  |
| **`OnTriggerEnter(Collider other)`**        | Quand un objet entre dans un **Trigger**        | Nécessite un collider en mode “Is Trigger”.               |
| **`OnTriggerStay(Collider other)`**         | Tant qu’un objet reste dans le Trigger          | Appelée à chaque frame tant qu’il est dedans.             |
| **`OnTriggerExit(Collider other)`**         | Quand il quitte la zone Trigger                 | Fin de détection.                                         |

### Gestion des entrées utilisateur

| Méthode                                | Quand elle est appelée                          | Spécificité                           |
| -------------------------------------- | ----------------------------------------------- | ------------------------------------- |
| **`OnMouseDown()`**                    | Quand on clique sur l’objet avec un collider    | Fonctionne avec la caméra principale. |
| **`OnMouseUp()`**                      | Quand le clic est relâché                       | –                                     |
| **`OnMouseEnter()` / `OnMouseExit()`** | Quand le curseur entre ou sort du collider      | Utile pour le survol d’objets.        |
| **`OnMouseOver()`**                    | À chaque frame tant que la souris est au-dessus | –                                     |

### Cycle de rendu et caméra

| Méthode                | Quand elle est appelée                             | Spécificité                                   |
| ---------------------- | -------------------------------------------------- | --------------------------------------------- |
| **`OnPreCull()`**      | Avant que la caméra calcule ce qu’elle doit rendre | Peut servir à cacher/afficher des objets.     |
| **`OnPreRender()`**    | Avant le rendu d’une caméra                        | Juste avant que l’image soit dessinée.        |
| **`OnRenderObject()`** | Après le rendu de tous les objets                  | Permet de dessiner du code custom (GL, etc.). |
| **`OnPostRender()`**   | Après que la caméra a tout rendu                   | Idéal pour effets spéciaux ou HUD custom.     |

### Audio

| Méthode                                             | Quand elle est appelée                      | Spécificité                                                  |
| --------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| **`OnAudioFilterRead(float[] data, int channels)`** | Quand Unity lit ou génère des données audio | Utilisé pour le traitement ou la génération audio dynamique. |

### Cycle de désactivation / destruction

| Méthode           | Quand elle est appelée               | Spécificité                          |
| ----------------- | ------------------------------------ | ------------------------------------ |
| **`OnDisable()`** | Quand l’objet est désactivé          | Appelée avant de devenir inactif.    |
| **`OnDestroy()`** | Juste avant que l’objet soit détruit | Nettoyage ou sauvegarde des données. |

### Événements spéciaux (moins connus mais utiles)

| Méthode                                    | Quand elle est appelée                             | Spécificité                                       |
| ------------------------------------------ | -------------------------------------------------- | ------------------------------------------------- |
| **`Reset()`**                              | Quand tu cliques sur “Reset” dans l’inspecteur     | Sert à remettre les valeurs par défaut.           |
| **`OnDrawGizmos()`**                       | Dans l’éditeur, pour dessiner dans la vue de scène | Super utile pour déboguer visuellement.           |
| **`OnValidate()`**                         | Quand une valeur publique change dans l’inspecteur | Permet de réagir immédiatement aux modifications. |
| **`OnApplicationQuit()`**                  | Quand le jeu se ferme                              | Nettoyage final.                                  |
| **`OnApplicationPause(bool pauseStatus)`** | Quand le jeu passe en pause (mobile, par ex.)      | Utile pour gérer la sauvegarde.                   |
| **`OnApplicationFocus(bool focus)`**       | Quand la fenêtre gagne ou perd le focus            | Gérer pause/reprise selon l’état du focus.        |

### Ordre typique d’exécution (dans une scène Unity)


1) - Awake()

2) - OnEnable()

3) - Start()

4) - Update() (à chaque frame)

5) - LateUpdate() (à chaque frame)

6) - FixedUpdate() (selon la physique)

7) - OnDisable() (si désactivation)

8) - OnDestroy() (si destruction)

### Astuce

On peut voir et ajuster l’ordre d’exécution des scripts dans Unity :
Menu > Edit > Project Settings > Script Execution Order

## frame = image ?

### 🎞️ Définition simple

En Unity (et en général dans les jeux vidéo) :

Une frame = une image affichée à l’écran pendant une fraction de seconde.

Donc, si ton jeu tourne à 60 FPS (frames per second), cela veut dire que ton écran affiche 60 images par seconde.

### Différence entre le mot “frame” et “image”

| Terme                         | Signification                                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Image (au sens visuel)**    | Ce que tu vois à l’écran à un instant donné — une capture visuelle du jeu.                                                 |
| **Frame (au sens technique)** | L’**itération complète** de la boucle de jeu : toutes les mises à jour, calculs, rendus, etc., qui produisent cette image. |


Donc :

🎮 Une frame est le cycle de calcul + rendu qui produit une image.

### 🔄 Dans Unity, une frame correspond à :

1) - Appel de Update() : calcul de la logique de jeu

2) - Appel de LateUpdate() : ajustements finaux (ex : caméra)

3) - Calcul de la physique (FixedUpdate() peut avoir lieu aussi)

4) - Rendu graphique (dessin à l’écran)

**Tout ce processus s’exécute une fois par frame.**

📈 Exemple concret

Si ton jeu tourne à 30 FPS :

- Chaque frame dure environ 1 / 30 = 0,0333 seconde.

- Unity exécute tes fonctions Update(), LateUpdate(), etc. toutes les 0,033 secondes.

- À chaque frame, une nouvelle image est dessinée à l’écran.

### 🧠 En résumé :

| Mot       | Description simple                                       | Exemple                                  |
| --------- | -------------------------------------------------------- | ---------------------------------------- |
| **Frame** | Un cycle complet de mise à jour du jeu (calculs + rendu) | `Update()` s’exécute une fois par frame  |
| **Image** | Le résultat visuel affiché à l’écran pour cette frame    | Ce que tu vois dans le jeu à cet instant |
| **FPS**   | Nombre de frames par seconde                             | 60 FPS = 60 images/seconde               |


### 💡 Analogie simple :
Imagine un film 🎬

- Chaque image du film = une frame

- Et plus il y a d’images par seconde, plus le mouvement paraît fluide.