# Convention de commits

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [SemVer (Semantic Versioning 2.0.0)](https://semver.org/)
- [commitlint Github](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [commitlint rules](https://commitlint.js.org/reference/rules)
- [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)
- [git trailer convention](https://git-scm.com/docs/git-interpret-trailers)

## Résumé

La spécification Conventional Commits est une convention simple qui s'appuie sur les messages de commit. 

Elle fournit un ensemble de règles claires pour créer un historique de commits explicite, facilitant ainsi le développement d'outils automatisés. 

Cette convention est complémentaire à **SemVer** , car elle décrit les fonctionnalités, les correctifs et les changements cassants apportés dans les messages de commit.

Le message de commit doit être structuré comme suit :

```xml
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Le commit contient les éléments structurels suivants, afin de communiquer l'intention aux utilisateurs de votre bibliothèque :

1. **fix (correction)** : un commit de ce type `fix` corrige un bug dans votre code source (cela correspond au `PATCH` versionnage sémantique).

2. **feat** : un commit de ce type `feat` introduit une nouvelle fonctionnalité dans le code source (cela correspond au `MINOR` versionnage sémantique).

3. **BREAKING CHANGE (CHANGEMENT CASSANT)** : un commit comportant un pied de page `BREAKING CHANGE:` ou ajoutant un `!` après le type/scope (type/la portée) introduit un changement d’API cassant (correspondant à un changement cassant `MAJOR` dans le versionnage sémantique). <br>
Un **BREAKING CHANGE (CHANGEMENT CASSANT)**  peut faire partie de commits de tout type .

4. D'autres types que `fix:` et `feat:` sont autorisés, par exemple [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (basé sur la **convention Angular**) <br>
recommande `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, , `perf:`, `test:`, et d'autres.

5. D'autres pieds de page `BREAKING CHANGE: <description>` peuvent être fournis et suivre une convention similaire au format de bande-annonce git .

Les types supplémentaires ne sont pas imposés par la spécification des commits conventionnels et n'ont aucun effet implicite sur le versionnage sémantique (sauf s'ils incluent une modification majeure). Une portée peut être fournie au type d'un commit afin d'apporter des informations contextuelles supplémentaires ; elle est alors placée entre parenthèses, par exemple : `feat(parser): add ability to parse arrays`.

## Pourquoi utiliser des commits conventionnels ?

- Génération automatique des journaux de modifications.
- Détermination automatique d'une mise à jour sémantique de version (en fonction des types de commits intégrés).
- Communiquer la nature des changements aux coéquipiers, au public et aux autres parties prenantes.
- Déclenchement des processus de compilation et de publication.
- Faciliter la contribution à vos projets en permettant aux utilisateurs d'explorer un historique des commits plus structuré.

## Examples

#### Commit message with description and breaking change footer

```txt
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

#### Commit message with ! to draw attention to breaking change

```txt
feat!: send an email to the customer when a product is shipped
```

#### Commit message with scope and ! to draw attention to breaking change

```txt
feat(api)!: send an email to the customer when a product is shipped
```

#### Commit message with both ! and BREAKING CHANGE footer

```txt
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

#### Commit message with no body

```txt
docs: correct spelling of CHANGELOG
```

#### Commit message with scope

```txt
feat(lang): add Polish language
```

#### Commit message with multi-paragraph body and multiple footers

```txt
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

## Specification

Les mots clés **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** dans ce document doivent être interprétés comme décrit dans [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

1. Les commits DOIVENT (**MUST**) être préfixés par un type, qui consiste en un nom, `feat`, `fix`, etc., suivi de la portée FACULTATIVE, `!`, et du deux-points et de l'espace terminaux REQUIRED.

2. Le type `feat` DOIT (**MUST**) être utilisé lorsqu'un commit ajoute une nouvelle fonctionnalité à votre application ou bibliothèque.

3. Le type `fix` DOIT (**MUST**) être utilisé lorsqu'un commit représente la correction d'un bug dans votre application.

4. Une portée PEUT (**MAY**) être fournie après un type. Une portée DOIT (**MUST**) consister en un nom décrivant une section du code source, entouré de parenthèses, par exemple : `fix(parser):`

5. Une description DOIT (**MUST**) suivre immédiatement les deux-points et l'espace qui suivent le préfixe type/portée. Cette description est un bref résumé des modifications apportées au code, par exemple : correction d'un problème d'analyse de tableau lorsque la chaîne contenait plusieurs espaces.

6. Un corps de commit plus long PEUT (**MAY**) être fourni après la brève description, apportant des informations contextuelles supplémentaires sur les modifications du code. Ce corps DOIT (**MUST**) commencer par une ligne vide après la description.

7. Le corps d'une requête de validation est libre et peut contenir un nombre quelconque de paragraphes séparés par des sauts de ligne.

8. Un ou plusieurs pieds de page PEUVENT (**MAY**) être ajoutés sur une ligne vide après le corps du texte. Chaque pied de page DOIT (**MUST**) être composé d'un mot, suivi d'un séparateur (par exemple, une virgule `:<space>` ou un caractère de séparation) `<space>#`, puis d'une chaîne de caractères (inspiré de la convention des balises de fin de publication Git ).

9. Le jeton d'un pied de page DOIT (**MUST**) utiliser `-` des caractères d'espacement, par exemple : `Acked-by` (cela permet de différencier le pied de page d'un corps de texte composé de plusieurs paragraphes). Une exception est faite pour la virgule `BREAKING CHANGE`, qui PEUT également être utilisée comme jeton.

10. La valeur d'un pied de page PEUT (**MAY**) contenir des espaces et des sauts de ligne, et l'analyse DOIT (**MUST**) se terminer lorsque la prochaine paire jeton/séparateur de pied de page valide est observée.

11. Les modifications cassantes DOIVENT (**MUST**) être indiquées dans le préfixe type/portée d'un commit, ou sous forme d'entrée dans le pied de page.

12. Si elle est incluse en tant que pied de page, une modification majeure DOIT (**MUST**) être composée du texte en majuscules MODIFICATION MAJEURE, suivi de deux points, d'un espace et d'une description, par exemple : MODIFICATION MAJEURE : les variables d'environnement ont désormais la priorité sur les fichiers de configuration .

13. Si le préfixe type/scope inclut les changements cassants, ceux-ci DOIVENT (**MUST**) être indiqués par un `<br>` !immédiatement avant le `<br> :`. Si ` !<br>` est utilisé, ` BREAKING CHANGE:<br>` PEUT être omis de la section de pied de page, et la description du commit DOIT (**MUST**) être utilisée pour décrire le changement cassant.

14. D'autres types que `feat` et `fix` PEUVENT (**MAY**) être utilisés dans vos messages de commit, par exemple : docs : mise à jour de la documentation de référence.

15. Les unités d'information qui composent les engagements conventionnels ne doivent PAS (**MUST NOT**) être traitées comme sensibles à la casse par les implémenteurs, à l'exception de BREAKING CHANGE qui DOIT (**MUST**) être en majuscules.

16. L'abréviation BREAKING-CHANGE DOIT (**MUST**) être synonyme de BREAKING CHANGE lorsqu'elle est utilisée comme jeton dans un pied de page.