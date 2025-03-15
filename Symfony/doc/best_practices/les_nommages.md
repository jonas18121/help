<h1>5 grandes familles de cases</h1>

Source : [laconsole.dev](https://laconsole.dev/blog/cases-camel-pascal-snake-kebab-upper/)


<h3 id="-camelcase">🐫 camelCase</h3>
<p>La <code>camelCase</code> est utilisée afin de distinguer visuellement les <strong>mots</strong> constituant un élément en faisant usage de <strong>majuscules sur la première lettre de chaque mot, sauf le premier</strong>. Visuellement, cela s’apparente aux bosses d’un chameau.</p>
<p>Exemples : <code>student</code>, <code>getUsers()</code></p>
<aside class="callout"> <i class="callout-icon fa-lg fa-solid fa-lightbulb"></i> <div class="callout-content"> <p>Domaine d’utilisation principal : <strong>variables</strong> et <strong>fonctions</strong>.</p> </div> </aside>

<h3 id="-pascalcase">👨‍🔬 PascalCase</h3>
<p>La <code>PascalCase</code> est également utilisée afin de distinguer visuellement les <strong>mots</strong> constituant un élément en faisant usage de majuscules <strong>sur la première lettre de chaque mot, y compris le premier.</strong></p>
<p>En ce sens, certains nomment cette case : <code>UpperCamelCase</code>.</p>
<p>Son nom vient du langage de programmation « Pascal », développé dans les années 1970 par Niklaus Wirth, pour lequel la syntaxe faisait usage de cette case.</p>
<p>Bien que cette théorie soit la plus répandue, une autre estime que son origine provient de Blaise Pascal, un mathématicien, physicien et inventeur français, qui a également contribué à la naissance de l’informatique en développant une machine à calculer appelée la Pascaline” en 1642.</p>
<p>Exemples : <code>Product</code>, <code>AbstractManager</code></p>
<aside class="callout"> <i class="callout-icon fa-lg fa-solid fa-lightbulb"></i> <div class="callout-content"> <p>Domaine d’utilisation principal : <strong>classes</strong> en <strong>P</strong>rogrammation <strong>O</strong>rientée <strong>O</strong>bjet (<strong>POO</strong>).</p> </div> </aside>

<h3 id="-snake_case">🐍 snake_case</h3>
<p>La <code>snake_case</code> est utilisée afin de distinguer visuellement les <strong>mots</strong> constituant un élément en faisant usage de tirets du bas <code>_</code> (« underscore ») en guise de séparateur.</p>
<p>Son nom vient de la ressemblance visuelle entre les underscores utilisés pour séparer les mots dans cette convention avec celle d’un serpent.</p>
<p>Exemples : <code>active_page</code>, <code>show_errors()</code>, <code>legal_notice.html</code></p>
<aside class="callout"> <i class="callout-icon fa-lg fa-solid fa-lightbulb"></i> <div class="callout-content"> <p>Domaine d’utilisation principal : <strong>variables</strong>, <strong>fonctions</strong> et <strong>noms de fichiers</strong>.</p> </div> </aside>

<h3 id="-kebab-case">🥙 kebab-case</h3>
<p>La <code>kebab-case</code> est utilisée afin de distinguer visuellement les <strong>mots</strong> constituant un élément en faisant usage de tirets <code>-</code> en guise de séparateur.</p>
<p>Il n’y a pas de théorie ou d’origine clairement établie pour la <code>kebab-case</code>. Personnellement, j’y vois une ressemblance assez frappante entre les tirets et la broche du kebab… Mais ça c’est peut-être un biais cognitif dû à une consommation conséquente. 🤷‍♂️</p>
<p>Exemples : <code>package-lock.json</code>, <code>dev-web-differentes-cases</code>, <code>btn-primary</code></p>
<aside class="callout"> <i class="callout-icon fa-lg fa-solid fa-lightbulb"></i> <div class="callout-content"> <p>Domaine d’utilisation principal : <strong>noms de fichiers, slug d’URL,</strong> et <strong>attributs HTML</strong>.</p> </div> </aside>

<h3 id="-uppercase">🔠 UPPERCASE</h3>
<p>L’<code>UPPERCASE</code>, consiste à écrire l’élément <strong>tout en majuscules</strong>.</p>
<p>Si un élément est constitué de plusieurs mots, alors on séparera les mots par des tirets du bas <code>_</code> (« underscore »), à la manière d’une <code>snake_case</code>, mais <strong>en majuscule</strong>.</p>
<p>Exemples : <code>PI</code>, <code>VITESSE_MAX</code></p>
<aside class="callout"> <i class="callout-icon fa-lg fa-solid fa-lightbulb"></i> <div class="callout-content"> Domaine d’utilisation principal : <strong>constantes</strong>. </div> </aside>

<h2 id="les-différentes-cases-en-programmation--récapitulatif">Les différentes cases en programmation : récapitulatif</h2>
<p>Voici un tableau illustrant les différentes cases et leurs domaines d’utilisation respectifs :</p>
<div class="overflow-x-scroll"> <table class="lg:text-lg"> <thead><tr><th>Nom de la case</th><th>Variables</th><th>Constantes</th><th>Fonctions</th><th>Classes</th><th>Fichiers</th><th>Slugs d’URL</th></tr></thead><tbody><tr><td>camelCase</td><td>✅</td><td>❌</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td></tr><tr><td><code>PascalCase</code></td><td>❌</td><td>❌</td><td>❌</td><td>✅</td><td>❌</td><td>❌</td></tr><tr><td><code>snake_case</code></td><td>✅</td><td>❌</td><td>✅</td><td>❌</td><td>✅</td><td>❌</td></tr><tr><td><code>kebab-case</code></td><td>❌</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td><td>✅</td></tr><tr><td><code>UPPERCASE</code></td><td>❌</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td></tr></tbody> </table> </div>
<p>✅ Idéal ❌ Déconseillé</p>
<p>Ce tableau est donné à titre indicatif dans le but de vous guider dans le choix de la casse idéale pour votre développement web.</p>
<p>Notez toutefois que chaque système, entreprise, technologie ou langage peut dicter ses propres conventions de nommage pour les définitions de variables, fonctions, classes, nommer ses fichiers, etc.</p>
<p>Par exemple, en JavaScript, une constante peut être déclarée en <code>camelCase</code>, de la même manière que l’<code>UPPERCASE</code> est par habitude utilisée pour les fichiers bien particulier <code>📄 README.md</code>.</p>
<p>Veillez donc à prendre connaissance des particularités de l’environnement dans lequel vous développez.</p> </div> 

--- 

### Norme de nommage

- [Normes de codage Symfony](https://symfony.com/doc/current/contributing/code/standards.html)
- [Conventions Symfony](https://symfony.com/doc/current/contributing/code/conventions.html)

- **Noms de Variables**
	- En anglais : Evite de mettre des accents dans des moments de déconcentration
	- Camel case
	- Exemple : $storageSpace au lieu de $p_espace_de_stockage ou $PES

- **Noms de Constantes**
	- En anglais 
	- Screaming snake case
        - Exemple : const PRODUCT et PRODUCT_LIST

- **Noms de Méthodes**
	- En anglais
	- Camel case
	- Exemple : getProduct() au lieu de getProduit() 

- **Noms de Classes**
	- En anglais
	- Pascal case
	- Exemple : HomePageController au lieu de AccueilController 

- **Noms de Fichiers de code PHP**
	- En anglais
	- Pascal case
	- Exemple : ProductController.php 

- **Noms de Fichiers de code JS et CSS**
	- En anglais
	- Camel case
	- Exemple : productFunction.js

- **Noms de Fichiers de code Twig et yaml**
	- En anglais
	- snake case
	- Exemple : form_product.html.twig

- **Noms de Fichiers à télécharger (PDF, PNG, TXT, ect...)**
	- En anglais ou Français au choix
	- Snake case
	- Exemple : declaration_de_perte.pdf au lieu de "declaration de perte.pdf"

- **Commentaire**
	- En anglais ou Français au choix