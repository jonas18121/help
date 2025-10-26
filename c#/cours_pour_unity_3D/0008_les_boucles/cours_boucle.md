# Les Boucles en C# (Unity 3D)

[Apprendre le C# - Épisode 7 : Les Boucles (Unity 3D)](https://youtu.be/6aWBFE-zRy4?si=omMOTUV6xikN_272)

- [Documentation Unity](https://docs.unity3d.com/Manual/index.html)
- [Consulter les classes dans Unity](https://github.com/Unity-Technologies/UnityCsReference/tree/master)
- [Code de la classe Degug](https://github.com/Unity-Technologies/UnityCsReference/tree/master/Runtime/Export/Debug)
- [Code de la classe Ray](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Geometry/Ray.cs)
- [Code de la classe Quaternion](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Quaternion.cs)
- [Code de la classe Collision](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/Managed/Collision.cs)
- [Code de la classe Physics](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Physics/ScriptBindings/Physics.bindings.cs)
- [Code de la classe Transform](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Transform/ScriptBindings/Transform.bindings.cs)
- [Code de la classe Input](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/InputLegacy/Input.bindings.cs)

## C’est quoi une boucle ?

Une boucle permet de répéter un bloc de code plusieurs fois, tant qu’une condition est vraie.
C’est comme dire à Unity :

- “Fais cette action encore et encore, jusqu’à ce que je te dise d’arrêter.”

💡 Exemple dans la vraie vie :

- “Tant qu’il reste des pommes dans le panier → je mange une pomme.”

## Dans Unity : pourquoi on en a besoin ?

Les boucles servent à :

- Répéter des actions (tirer plusieurs projectiles, générer des ennemis, etc.)

- Parcourir des listes ou tableaux (inventaire, ennemis à l’écran, etc.)

- Créer des comportements continus (comme une IA ou une animation logique)

## Les différents types de boucles en C#

Il existe **5 types principaux de boucles.**

### for

👉 Utilisée quand tu sais combien de fois tu veux répéter quelque chose.

Exemple simple :

```csharp
for (int i = 0; i < 5; i++)
{
    Debug.Log("Coucou numéro " + i);
}
```

Décomposition :

- `int i = 0` : on crée une variable `i` qui démarre à 0

- `i < 5` : la boucle continue tant que `i` est inférieur à 5

- `i++` : à chaque tour, on ajoute 1 à `i`

Résultat : la boucle s’exécute 5 fois (de 0 à 4)

Exemple Unity :

Créer 10 cubes automatiquement :


```csharp
for (int i = 0; i < 10; i++)
{
    GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
    cube.transform.position = new Vector3(i * 2, 0, 0);
}
```

Cela crée 10 cubes alignés sur l’axe X.

### foreach

👉 Sert à parcourir tous les éléments d’une collection (tableau, liste…).

Exemple :

```csharp
string[] fruits = { "pomme", "banane", "orange" };

foreach (string fruit in fruits)
{
    Debug.Log("J’aime les " + fruit);
}
```

Ici, pas besoin de compteur (i).

Unity va automatiquement passer sur chaque élément du tableau.

Exemple Unity :

Parcourir tous les objets avec un certain tag :


```csharp
foreach (GameObject ennemi in GameObject.FindGameObjectsWithTag("Enemy"))
{
    ennemi.GetComponent<Renderer>().material.color = Color.red;
}
```

Tous les ennemis deviennent rouges.

### while

👉 Sert à répéter une action tant qu’une condition est vraie.

Exemple :

```csharp
int compteur = 0;
while (compteur < 3)
{
    Debug.Log("Tour " + compteur);
    compteur++;
}
```

Tant que compteur < 3, la boucle tourne.
Quand compteur devient 3 → elle s’arrête.

Attention :

Si tu oublies d’incrémenter compteur, la condition sera toujours vraie → ton jeu plantera (boucle infinie ).

Exemple Unity :

Tu veux attendre qu’un joueur atteigne un certain score :


```csharp
while (score < 100)
{
    Debug.Log("Continue à jouer !");
}
```

Ne fais jamais ça dans Update() : ça bloquera tout ton jeu.

On utilisera plutôt des coroutines pour ce genre d’attente.

### do ... while

👉 Similaire à while, mais elle s’exécute au moins une fois avant de vérifier la condition.

Exemple :

```csharp
int nombre = 0;

do
{
    Debug.Log("Tour : " + nombre);
    nombre++;
}
while (nombre < 3);
```

Même si nombre ne respecte pas la condition au départ, le code s’exécute une fois.

### Boucles spéciales dans Unity

Unity a des boucles implicites que le moteur appelle automatiquement :

| Fonction        | Description    | Appelée...                             |
| --------------- | -------------- | -------------------------------------- |
| `Start()`       | Initialisation | Une seule fois au début                |
| `Update()`      | Logique du jeu | À **chaque frame**                     |
| `FixedUpdate()` | Physique       | À intervalles fixes (50x/s)            |
| `LateUpdate()`  | Caméra, suivis | Après `Update()`                       |
| `OnGUI()`       | Interface      | Plusieurs fois par frame (si utilisée) |


### Coroutine (boucle “temporelle”)

Une coroutine est une boucle spéciale qui s’exécute sur plusieurs frames.

```csharp
IEnumerator Clignoter()
{
    while (true)
    {
        rend.enabled = !rend.enabled;
        yield return new WaitForSeconds(1f); // attend 1 seconde
    }
}
```

Cette boucle tourne indéfiniment, mais sans bloquer le jeu.

On la démarre avec :

```csharp
StartCoroutine(Clignoter());
```

## Résumé complet

| Type        | Sert à                                            | Quand l’utiliser                           |
| ----------- | ------------------------------------------------- | ------------------------------------------ |
| `for`       | Répéter un nombre fixe de fois                    | Compteur connu (boucle de création, index) |
| `foreach`   | Parcourir une collection                          | Tableaux, listes, objets Unity             |
| `while`     | Répéter tant qu’une condition est vraie           | Boucles logiques simples                   |
| `do while`  | Pareil que `while` mais exécute au moins une fois | Cas spéciaux                               |
| `Coroutine` | Répéter dans le temps sans bloquer                | Effets, délais, animations                 |


## Résumé

💡 Une boucle, c’est comme dire à Unity :

“Refais cette action encore et encore, jusqu’à ce que je te dise stop.”

| Exemple     | Traduction                                |
| ----------- | ----------------------------------------- |
| `for`       | “Fais-le 10 fois.”                        |
| `foreach`   | “Fais-le pour chaque truc dans la boîte.” |
| `while`     | “Continue tant que ce n’est pas fini.”    |
| `do while`  | “Fais-le au moins une fois.”              |
| `Coroutine` | “Fais-le petit à petit dans le temps.”    |
