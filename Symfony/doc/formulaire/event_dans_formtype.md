# Comprendre les events dans le FormType

### Dans le FormType pour créer des slugs automatiquement

Ici on va créer le slug à partir du titre de la recette après que l'utilisateur appuie sur le bouton submit

1. Création de l'évènement avec PRE_SUBMIT `->addEventListener(FormEvents::PRE_SUBMIT, $autoSlug);`
    - [Doc Form Events](https://symfony.com/doc/current/form/events.html)
    - [The FormEvents::PRE_SUBMIT Event](https://symfony.com/doc/current/form/events.html#a-the-formevents-pre-submit-event)
    - Lorsque l'utilisateur appuie sur le bouton submit, `FormEvents::PRE_SUBMIT` va permettre de modifier les données de la demande, avant de soumettre rééllement les données au formulaire
2. Créer des slugs automatiquement
    - [The String Component](https://symfony.com/doc/current/components/string.html) intallation pour creer des slugs
    - Utilisation de [Slugger (use Symfony\Component\String\Slugger\AsciiSlugger;)](https://symfony.com/doc/current/components/string.html#slugger) pour creer des slugs

```php
# RecipeType.php

namespace App\Form;

use App\Entity\Recipe;
use Doctrine\DBAL\Types\TextType;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Event\PreSubmitEvent;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\String\Slugger\AsciiSlugger;

class RecipeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        /**
         * Créer un slug automatiquement avant de submit
         */
        $autoSlug = function (PreSubmitEvent $event): void 
        {
            $data = $event->getData();

            if(empty($data['slug'])) {
                $slugger = new AsciiSlugger();
                $data['slug'] = strtolower($slugger->slug($data['title']));
                $event->setData($data);
            }
        };
        
        $builder
            ->add('title')
            ->add('slug', TextType::class, [
                'require' => false
            ])
            ->add('text')
            ->add('duration')
            ->add('save', SubmitType::class, [
                'label' => 'Envoyer'
            ])
            ->addEventListener(FormEvents::PRE_SUBMIT, $autoSlug)
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

### Dans le FormType ajouter la date automatiquement

Ici on va ajouter la date de création et de mise à jour après que l'utilisateur appuie sur le bouton submit

1. Création de l'évènement avec PRE_SUBMIT `->addEventListener(FormEvents::POST_SUBMIT, $attachTimestamps);`
    - [Doc Form Events](https://symfony.com/doc/current/form/events.html)
    - [The FormEvents::POST_SUBMIT Event](https://symfony.com/doc/current/form/events.html#c-the-formevents-post-submit-event)
    - Lorsque l'utilisateur appuie sur le bouton submit, `FormEvents::POST_SUBMIT` va permettre de modifier les données de la demande, après avoir soumis rééllement les données au formulaire

```php
# RecipeType.php

namespace App\Form;

use App\Entity\Recipe;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Event\PreSubmitEvent;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Event\PostSubmitEvent;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class RecipeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        /**
         * Créer un slug automatiquement avant de submit
         */
        $autoSlug = function (PreSubmitEvent $event): void 
        {
            $data = $event->getData();

            if(empty($data['slug'])) {
                $slugger = new AsciiSlugger();
                $data['slug'] = strtolower($slugger->slug($data['title']));
                $event->setData($data);
            }
        };

        /**
         * Ajouter la date automatiquement
         */
        $attachTimestamps = function (PostSubmitEvent $event): void 
        {
            $data = $event->getData();

            if(!($data instanceof Recipe)) {
                return;
            }

            $data->setUpdatedAt(new \DateTimeImmutable());

            if(null === $data->getId()) {
                $data->setCreatedAt(new \DateTimeImmutable());
            }
        };
        
        $builder
            ->add('title')
            ->add('slug', TextType::class, [
                'required' => false
            ])
            ->add('text')
            ->add('duration')
            ->add('save', SubmitType::class, [
                'label' => 'Envoyer'
            ])
            ->addEventListener(FormEvents::PRE_SUBMIT, $autoSlug)
            ->addEventListener(FormEvents::POST_SUBMIT, $attachTimestamps)
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

