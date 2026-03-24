# Téléchargement d'images ou de fichiers


### Debuger pour voir les différents paramêtre présent dans Symfony
```bash
php bin/console debug:container --parameters

php bin/console debug:container --parameters | grep dir

php bin/console vich:mapping:debug 

php bin/console vich:mapping:debug-class 
```

## Cas 1 : Téléchargement d'images ou de fichiers sans utiliser de bundle


### Entity recipe.php

- Cratéation de la propriété $thumbnail 

```php

class Recipe
{
    # D'autres code ...

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $thumbnail = null;

    # D'autres code ...

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): static
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }
}
```

### Classe FormType recipeType.php

- Ajout de `thumbnailFile` mapped sur false

```php
class RecipeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {        
        $builder
            # D'autres code ...

            ->add('thumbnailFile', FileType::class, [
                'mapped' => false,
                'constraints' => [
                    new Image()
                ]
            ])
            
            # D'autres code ...
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Recipe::class,
        ]);
    }
}
```

### Controller recipeController.php

- Le code ci-dessous va permettre de télécharger l'image, avec un nouveau nom 
- On peut mettre ce code dans un manager et l'appeler dans le controller
- Ici on n'a pas gérer la suppréssion du fichier si on veut télécharger un autres a sa place
- Ici on n'a pas gérer la suppréssion du fichier si on le recipe qui lui appartient
```php
# Obtenir la valeur du champ thumbnailFile
/** @var UploadedFile $file */
$file = $form->get('thumbnailFile')->getData();

# séparer le nom et l'extention du fichier
$explodeFilename = explode('.', $file->getClientOriginalName());

# Obtenire la date du jour
$date = new DateTimeImmutable();

# Réécrire le nom du fichier avec la date/heure de téléchargement
$filename = $explodeFilename[0] . $date->format('Ymd_His') . '.' . $file->getClientOriginalExtension();

# Identification du répertoire dans lequel on veut mettre le fichier
$moveIn = $this->getParameter('kernel.project_dir') . '/public/images/recipes';

# Mettre le fichier dans le répertoire
$file->move($moveIn, $filename);

# Associer le nom du fichier à l'obet recipe
$recipe->setThumbnail($filename);

# Date de modification et flush
$recipe->setUpdatedAt($date);
$entityManager->flush();
```


```php
class RecipeController extends AbstractController
{
    #[Route('/admin/recettes/{id}/edit', name: 'app_admin_recipe_edit', methods: ['GET', 'POST'], requirements: [ 'id' => Requirement::DIGITS ])]
    public function edit(
        Request $request, 
        EntityManagerInterface $entityManager,
        Recipe $recipe
    ): Response
    {
        $form = $this->createForm(RecipeType::class, $recipe);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {

            /** @var UploadedFile $file */
            $file = $form->get('thumbnailFile')->getData();

            $explodeFilename = explode('.', $file->getClientOriginalName());

            $date = new DateTimeImmutable();

            $filename = $explodeFilename[0] . $date->format('Ymd_His') . '.' . $file->getClientOriginalExtension();

            $moveIn = $this->getParameter('kernel.project_dir') . '/public/images/recipes';
            $file->move($moveIn, $filename);
            $recipe->setThumbnail($filename);

            $recipe->setUpdatedAt($date);
            $entityManager->flush();

            $this->addFlash('success', 'La recette a bien été modifié');
            return $this->redirectToRoute('app_admin_recipe_index');
        }

        return $this->render('admin/recipe/edit.html.twig', [
            'recipe' => $recipe,
            'form' => $form
        ]);
    }
}
```

### Vue recipe/edit.twig

- On peut afficher le fichier comme ceci : `<img src="/images/recipes/{{ recipe.thumbnail }}" alt="{{ recipe.thumbnail }}">`

```twig
{% extends 'admin/admin_base.html.twig' %}

{% block title %}Modifier la recette {{ recipe.title }}{% endblock %}

{% block body %}
    <h1>Modifier {{ recipe.title }}</h1>

    <p>
        <img src="/images/recipes/{{ recipe.thumbnail }}" alt="{{ recipe.thumbnail }}">
    </p>

    {{ form_start(form) }}
        <div class="d-flex">
            {{ form_row(form.title) }}
            {{ form_row(form.duration) }}
        </div>
        {{ form_row(form.slug) }}
        {{ form_row(form.category) }}
        {{ form_row(form.text) }}
    {{ form_end(form) }}
{% endblock %}
```

## Cas 2 : Téléchargement d'images ou de fichiers avec le bundle VichUploaderBundle

- [Voir la doc GitHub de VichUploaderBundle](https://github.com/dustin10/VichUploaderBundle/blob/master/docs/installation.md)
- [VichUploaderBundle sur packagist.org](https://packagist.org/packages/vich/uploader-bundle)
- [Utilisation de VichUploaderBundle](https://github.com/dustin10/VichUploaderBundle/blob/master/docs/usage.md)
- Il y a aussi une petite doc dans [help/Symfony/cli_symfony.md](https://github.com/jonas18121/help/blob/master/Symfony/doc/cli_symfony.md#upload-un-fichier-dont-une-image-upload-image)

### On installe VichUploaderBundle via composer 
```ps
composer require vich/uploader-bundle
```

#### si utilise les attributs Symfony au lieux des annotations avec PHP8

- On aura une erreur comme ceci : **The child config "db_driver" under "vich_uploader" must be configured.**

- Il faudra modifier le fichier `config/packages/vich_uploader.yaml`

Avant :

```yaml
vich_uploader:
    db_driver: orm
```

Après :

```yaml
vich_uploader:
    metadata:
        type: attribute
```

- ensuite faire les commandes suivantes :

```ps
# Suppression de vich/uploader-bundle
composer remove vich/uploader-bundle

# Ré-installation de vich/uploader-bundle
composer require vich/uploader-bundle
```

### Encore dans vich_uploader.yaml

- Mettre le mappings avec prefix, destination et le namer

- un mappings c'est dire à vich_uploader, ce qu'il doit faire avec les images/fichiers, 
- on lui dit , ou il doit stocké les images/fichiers, comment les nommées 

- uri_prefix: c'est le chemin dans lequel on veut aller, on a mis la constantes app.path.images qu'on a créer dans services.yaml.

- upload_destination: c'est l'endroit ou on va stockée les images/fichiers 

- la constante %kernel.project_dir% , permet d'accéder à la racine du projet

- namer: Vich\UploaderBundler\Naming\UniqidNamer, sert à renommer les images/fichiers de façon unique

```yaml
vich_uploader:
    metadata:
        type: attribute

    mappings:
       recipes:
           uri_prefix: /images/recipes
           upload_destination: '%kernel.project_dir%/public/images/recipes'
           namer: Vich\UploaderBundle\Naming\SmartUniqueNamer

           inject_on_load: false
           delete_on_update: true
           delete_on_remove: true
```

Toutes les options sont répertoriées ci-dessous :

- `delete_on_remove`: par défaut `true`, le fichier doit-il être supprimé lorsque l'entité est supprimée ;
- `delete_on_update`: par défaut `true`, le fichier doit-il être supprimé lorsqu'un nouveau fichier est téléchargé ;
- `inject_on_load`: par défaut `false`, le fichier doit être injecté dans l'entité téléchargeable lorsqu'il est chargé à partir du magasin de données. L'objet sera une instance de Symfony\Component\HttpFoundation\File\File.

### Entity Recipe.php

- Ajout manuellement de `$thumbnailFile` avec ses Getters, Setters et l'attribut `#[Vich\UploadableField()]`
- Ajout de `#[Vich\Uploadable]` au dessus de `class Recipe`

- Dans `UploadableField`
    - On ajoute à l'attribut `mapping` le nom du mapping que l'on a configuré dans le fichier `vich_uploader.yaml`
    - `fileNameProperty` permet de savoir dans quel propriété on veut sauvegarder le nom du fichier

```php
namespace App\Entity;

use App\Repository\RecipeRepository;
use App\Validator\BanWord;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Entity\File as EmbeddedFile;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
#[UniqueEntity('title')]
#[UniqueEntity('slug')]
#[Vich\Uploadable]
class Recipe
{
    # D'autres code ...

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $thumbnail = null;

    #[Vich\UploadableField(mapping: 'recipes', fileNameProperty: 'thumbnail')]
    #[Assert\Image()]
    private ?File $thumbnailFile = null;

    # D'autres code ...

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): static
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }

    /**
     * Get the value of thumbnailFile
     * 
     */ 
    public function getThumbnailFile(): ?File
    {
        return $this->thumbnailFile;
    }

    /**
     * Set the value of thumbnailFile
     *
     */ 
    public function setThumbnailFile(File $thumbnailFile): self
    {
        $this->thumbnailFile = $thumbnailFile;

        return $this;
    }
}
```


### Classe FormType recipeType.php

- Ajout de `thumbnailFile`

```php
class RecipeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {        
        $builder
            # D'autres code ...

            ->add('thumbnailFile', FileType::class)
            
            # D'autres code ...
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Recipe::class,
        ]);
    }
}
```

### Vue recipe/edit.twig

- On peut afficher le fichier comme ceci : `<img src="{{ vich_uploader_asset(recipe, 'thumbnailFile') }}" alt="{{ recipe.thumbnail }}">`
- Dans `vich_uploader_asset`
    - On lui passe l'objet `recipe`
    - Ainsi que la propriété de l'objet `recipe` nommé `thumbnailFile`

```twig
{% extends 'admin/admin_base.html.twig' %}

{% block title %}Modifier la recette {{ recipe.title }}{% endblock %}

{% block body %}
    <h1>Modifier {{ recipe.title }}</h1>

    <p>
                {# <img src="/images/recipes/{{ recipe.thumbnail }}" alt="{{ recipe.thumbnail }}"> #}
                <img src="{{ vich_uploader_asset(recipe, 'thumbnailFile') }}" alt="{{ recipe.thumbnail }}">
    </p>

    {{ form_start(form) }}
        <div class="d-flex">
            {{ form_row(form.title) }}
            {{ form_row(form.duration) }}
        </div>
        {{ form_row(form.slug) }}
        {{ form_row(form.category) }}
        {{ form_row(form.text) }}
    {{ form_end(form) }}
{% endblock %}
```

### Controller recipeController.php


```php
class RecipeController extends AbstractController
{
    #[Route('/admin/recettes/{id}/edit', name: 'app_admin_recipe_edit', methods: ['GET', 'POST'], requirements: [ 'id' => Requirement::DIGITS ])]
    public function edit(
        Request $request, 
        EntityManagerInterface $entityManager,
        Recipe $recipe
    ): Response
    {
        $form = $this->createForm(RecipeType::class, $recipe);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', 'La recette a bien été modifié');
            return $this->redirectToRoute('app_admin_recipe_index');
        }

        return $this->render('admin/recipe/edit.html.twig', [
            'recipe' => $recipe,
            'form' => $form
        ]);
    }
}
```

- Si on veut récupérer de l'image dans un controller 
    - infection de dépandence de `UploaderHelper $uploaderHelper` 
    - Utlisation de `$uploaderHelper->asset($recipe, 'thumbnailFile')`
    - $recipe = objet, thumbnailFile = propriété de l'objet

```php
    #[Route('/admin/recettes/{id}/edit', name: 'app_admin_recipe_edit', methods: ['GET', 'POST'], requirements: [ 'id' => Requirement::DIGITS ])]
    public function edit(
        Request $request, 
        EntityManagerInterface $entityManager,
        Recipe $recipe,
        UploaderHelper $uploaderHelper
    ): Response
    {
        dd($uploaderHelper->asset($recipe, 'thumbnailFile'));

        $form = $this->createForm(RecipeType::class, $recipe);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            
            $entityManager->flush();

            $this->addFlash('success', 'La recette a bien été modifié');
            return $this->redirectToRoute('app_admin_recipe_index');
        }

        return $this->render('admin/recipe/edit.html.twig', [
            'recipe' => $recipe,
            'form' => $form
        ]);
    }
```