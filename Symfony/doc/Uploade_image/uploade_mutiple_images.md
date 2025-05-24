# Téléchargement de multiples images ou de multiples fichiers


0) Installer `symfony/mime` pour reconnaitre le typage des mimes

```bash
composer require symfony/mime
```

## Avec les imgages qui sont enregistrer en JSON dans la BDD

### Entité Product.php

- Créer la propriété `images` il sera enregistrer en type `json` dans la BDD
- Créer le getter et le setter 

```php
// src/Entity/Product.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProductRepository;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    # ...codes

    #[ORM\Column(type: 'json')]
    private ?array $images = [];

    # ...codes
 
    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(array $images): void
    {
        $this->images = $images;
    }
}
```

### Form ProductType.php

- Créer un champs nommer `uploadImages` en `mapped == false` et `multiple == true`
- La contrainte avec `Count` permet de dire qu'on veut télécharger en même temps 5 images max 
- La contrainte avec `All`(comme un foreach) permet à `File` de traiter chaques images individuellement

```php
// src/Form/ProductType.php

namespace App\Form;

use App\Entity\Product;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\All;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Count;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class ProductType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            # ...codes

            ->add('uploadImages', FileType::class, [
                'label' => 'Images (JPG, PNG)',
                'mapped' => false,
                'multiple' => true,
                'required' => false,
                'constraints' => [
                    new Count([
                        'max' => 5,
                        'maxMessage' => 'Maximum 5 images autorisées.',
                    ]),
                    new All([
                        'constraints' => [
                            new File([
                                'maxSize' => '5M',
                                'mimeTypes' => ['image/jpeg', 'image/png'],
                                'mimeTypesMessage' => 'Formats autorisés : JPG, PNG uniquement.',
                            ])
                        ]
                    ])
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Product::class,
        ]);
    }
}
```

### Contrôleur ProductController.php

```php
// src/Controller/ProductController.php

namespace App\Controller\Frontend;

use App\Entity\User;
use DateTimeImmutable;
use App\Entity\Product;
use App\Form\ProductType;
use App\Manager\ProductManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

final class ProductController extends AbstractController
{
    # ...codes

    #[Route(
        'product/update/{id}', 
        name: 'app_product_update', 
        requirements: ["id" => "\d+"],
        methods: ["GET", "PUT"]
    )]
    public function update(
        Product $product,
        Request $request,
        ProductManager $productManager
    ): Response 
    {
        /** @var User|null */
        $user = $this->getUser();

        if (!$user) {
            return $this->redirectToRoute('app_home_page');
        }

        // voter
        $this->denyAccessUnlessGranted('edit', $product);

        $form = $this->createForm(ProductType::class, $product, ['method' => 'PUT']);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            /** @var UploadedFile $file */
            $imageFiles = $form->get('uploadImages')->getData();

            // Upload les images
            $filenames = [];
            foreach ($imageFiles as $key => $imageFile) { // boucle pour traiter chaques images

                $explodeFilename = explode('.', $imageFile->getClientOriginalName());
                $date = new DateTimeImmutable();

                $newFilename = $explodeFilename[0] . '_'  . $key . '_' . $date->format('Ymd_His_mmm') . '.' . $imageFile->getClientOriginalExtension();

                $moveIn = $this->getParameter('kernel.project_dir') . '/public/uploads/images/products';

                try {
                    $imageFile->move($moveIn, $newFilename);
                    $filenames[] = $newFilename;
                } 
                catch (FileException $e) {
                    throw new Exception("Erreur lors de l'upload.");
                }
            }

            $product->setImages($filenames);

            // methode personnaliser Permet de persit et de fush dans la BDD
            $productManager->update($product);

            // add flash
            $this->addFlash(
                'success',
                'Le produit a bien été modifié'
            );

            // Redirection
            return $this->redirectToRoute('app_product_list');
        }

        return $this->render('frontend/product/product_update.html.twig', [
            'formProduct' => $form->createView(),
        ]);
    }
}
```

###  Vue product_update.html.twig

- Utilise `'enctype': 'multipart/form-data'` depuis `form_start`
- Affiche le champ `uploadImages` de `formProduct`

```twig
{# templates/product_update.html.twig #}

{{ form_start(formProduct, { 'attr' : { 'class' : 'form', 'enctype': 'multipart/form-data'}, } ) }}
    <div class="container_form_block">

        <div class="container_form_element">
            <div>
                <label for="product_new_images" class="form_label">Télécharger jusqu'à images maximum</label>
                {{ form_widget(formProduct.uploadImages, {attr : {class : 'form_input' }} ) }}
            </div>
            <small class="error_input_small">{{ form_errors(formProduct.uploadImages) }}</small>
        </div>

        {% block formButton %}
            <button type="submit" class="btn">Valider</button>
        {% endblock formButton %}
    </div>
{{ form_end(formProduct) }}
```