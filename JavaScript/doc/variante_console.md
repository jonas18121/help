# Variante de console en Javascrpit

En JavaScript, l'objet console fournit plusieurs méthodes pour afficher des informations de débogage.

Les méthodes et propriétés mentionnées ci-dessous couvrent l'ensemble des fonctionnalités standard et non standard généralement disponibles dans l'objet console de JavaScript.

1. Standard et couramment utilisées :

- console.log()
- console.warn()
- console.info()
- console.error()
- console.debug()
- console.clear()
- console.assert()
- console.count()
- console.countReset()
- console.group()
- console.groupCollapsed()
- console.groupEnd()
- console.table()
- console.time()
- console.timeEnd()
- console.timeLog()
- console.trace()
- console.dir()
- console.dirxml()

2. Moins courantes ou spécifiques à certains environnements :

- console.profile()
- console.profileEnd()
- console.exception() (obsolète)
- console.markTimeline() (obsolète)
- console.timeline() (obsolète)
- console.timelineEnd() (obsolète)
- console.timeStamp()
- console.memory

### Voici une liste des principales variantes de méthodes de console disponibles :

1. `console.log()` : Affiche un message général.

```js
console.log('Message général');
```

2. `console.info()` : Affiche un message informatif (souvent similaire à console.log).

```js
console.info('Message informatif');
```

3. `console.warn()` : Affiche un message d'avertissement.

```js
console.warn('Message d\'avertissement');
```

4. `console.error()` : Affiche un message d'erreur.

```js
console.error('Message d\'erreur');
```

5. `console.debug()` : Affiche des messages de débogage (souvent similaire à console.log, mais parfois filtré en fonction des outils de développement).

```js
console.debug('Message de débogage');
```

6. `console.clear()` :  Efface la console.

```js
console.clear();
```

7. `console.assert()` : Affiche un message d'erreur si l'assertion est fausse.

```js
console.assert(1 === 2, 'L\'assertion est fausse');
```

8. `console.count()` : Affiche le nombre de fois où console.count a été appelé avec l'étiquette spécifiée.

```js
console.count('compteur');
console.count('compteur');
```

9. `console.countReset()` : Réinitialise le compteur pour l'étiquette spécifiée.

```js
console.countReset('compteur');
```

10. `console.group()` :  Crée un nouveau groupe dans la console, indentant tous les messages suivants.

```js
console.group('Groupe');
console.log('Message dans le groupe');
console.groupEnd();
```

11. `console.groupCollapsed()` :  Crée un groupe réduit dans la console.

```js
console.groupCollapsed('Groupe réduit');
console.log('Message dans le groupe réduit');
console.groupEnd();
```

12. `console.groupEnd()` : Termine le groupe actuel.

```js
console.groupEnd();
```

13. `console.table()` : Affiche des données sous forme de tableau.

```js
console.table([{ a: 1, b: 'Z' }, { a: 2, b: 'Y' }]);
```

14. `console.time()` : Démarre un chronomètre avec un nom donné.

```js
console.time('Chronomètre');
```

15. `console.timeEnd()` : Arrête le chronomètre et affiche le temps écoulé.

```js
console.timeEnd('Chronomètre');
```

16. `console.timeLog()` : Affiche le temps écoulé sans arrêter le chronomètre

```js
console.timeLog('Chronomètre');
```

17. `console.trace()` : Affiche une trace de la pile d'appels.

```js
console.trace('Trace de la pile');
```

18. `console.dir()` : Affiche une liste interactive des propriétés d'un objet JavaScript.

```js
console.dir(document.body);
```

19. `console.dirxml()` : Affiche une représentation arborescente interactive d'un élément XML/HTML.

```js
console.dirxml(document);
```

### En plus des méthodes déjà mentionnées, il existe quelques autres méthodes de console moins courantes ou spécifiques à certains environnements JavaScript 

20. `console.profile()` : Démarre l'enregistrement d'un profil de performance (supporté dans certains navigateurs comme Chrome).

```js
console.profile('Profiling Session');
```

21. `console.profileEnd()` : Arrête l'enregistrement du profil de performance.

```js
console.profileEnd('Profiling Session');
```

22. `console.exception()` : (Non standard et obsolète) Était utilisé pour enregistrer des exceptions.

```js
console.exception('Exception message');
```

23. `console.markTimeline()` : (Obsolète) Ajoutait une marque dans la ligne de temps de performance.

```js
console.markTimeline('Timeline marker');
```

24. `console.timeline()` : (Obsolète) Démarrait une nouvelle ligne de temps pour les événements enregistrés.

```js
console.timeline('Timeline label');
```

25. `console.timelineEnd()` : (Obsolète) Arrêtait la ligne de temps en cours.

```js
console.timelineEnd('Timeline label');
```

26. `console.timeStamp()` : Ajoute un horodatage dans la ligne de temps.

```js
console.timeStamp('Time stamp label');
```

2. `console.memory` : Une propriété (plutôt qu'une méthode) qui contient des informations sur l'utilisation de la mémoire (disponible uniquement dans certains environnements comme Chrome).

```js
console.log(console.memory);
```

Il est important de noter que certaines de ces méthodes et propriétés sont spécifiques à certains environnements de développement (comme Chrome DevTools) et peuvent ne pas être disponibles ou fonctionner différemment dans tous les navigateurs ou environnements JavaScript.