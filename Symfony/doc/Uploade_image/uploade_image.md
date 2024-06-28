# Téléchargement d'images ou de fichiers


### Debuger pour voir les différents paramêtre présent dans Symfony
```bash
php bin/console debug:container --parameters

php bin/console debug:container --parameters | grep dir
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

- On peut afficher le fichier comme ceci : `<img src="/images/recipes/{{ recipe.thumbnail }}" alt="{{ recipe.thumbnail }}"`

```twig
{% extends 'admin/admin_base.html.twig' %}

{% block title %}Modifier la recette {{ recipe.title }}{% endblock %}

{% block body %}
    <h1>Modifier {{ recipe.title }}</h1>

    <p>
        <img src="/images/recipes/{{ recipe.thumbnail }}" alt="{{ recipe.thumbnail }}"
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