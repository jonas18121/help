# FormType avec contrainte

Exemple : 

```php 


declare(strict_types=1);

namespace App\Form\Candidate\Frontend;

use App\Entity\Candidate;
use App\Enum\DataEnum;
use App\Manager\DataManager;
use App\Repository\DataRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class CandidateType extends AbstractType
{
    private $dataRepository;

    private $dataManager;

    public function __construct(DataRepository $dataRepository, DataManager $dataManager)
    {
        $this->dataRepository = $dataRepository;
        $this->dataManager = $dataManager;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $dataOptions = $this->dataRepository->findOneBy(['dev_key' => '1']);
        $choicesElements = null == $dataOptions ? [] : explode(',', (string) $dataOptions->getValue());
        $choices = ['Civilité' => ''];
        if (\count($choicesElements) > 0) {
            foreach ($choicesElements as $key => $value) {
                $choices[$value] = $value;
            }
        }

        $builder
            ->add('gender', ChoiceType::class, [
                'required' => true,
                'label' => 'Genre du candidat',
                'choices' => $choices,
                'constraints' => new NotBlank(['message' => 'Choisissez votre civilité.']),
            ])
            ->add('lastname', TextType::class, [
                'required' => true,
                'label' => 'Nom du candidat',
                'attr' => ['class' => 'text'],
                'constraints' => [
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                    new Length([
                        'min' => 2,
                        'minMessage' => 'Le nombre de caractères est trop petit.',
                        'max' => 255,
                        'maxMessage' => 'Le nombre de caractères est trop grand.',
                    ]),
                ],
            ])
            ->add('firstname', TextType::class, [
                'required' => true,
                'label' => 'Prénom du candidat',
                'attr' => ['class' => 'text'],
                'constraints' => [
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                    new Length([
                        'min' => 2,
                        'minMessage' => 'Le nombre de caractères est trop petit.',
                        'max' => 255,
                        'maxMessage' => 'Le nombre de caractères est trop grand.',
                    ]),
                ],
            ])
            ->add('email', EmailType::class, [
                'required' => true,
                'label' => 'Email de contact',
                'attr' => ['class' => 'text'],
                'constraints' => [
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                    new Email(),
                    new Regex([
                        'pattern' => '/^[a-zA-Z][a-zA-Z0-9._\/-]{1,255}@[a-z]{4,15}\.[a-z]{2,3}$/',
                        'message' => 'Le format est incorrecte, format au minimum valide : xx@xxxx.xx.',
                    ]),
                ],
            ])
            ->add('birthdate', DateType::class, [
                'format' => 'dd/MM/yyyy',
                'attr' => ['class' => 'date',
                    'placeholder' => 'JJ/MM/AAAA', ],
                'html5' => false,
                'widget' => 'single_text',
                'required' => true,
                'label' => 'Date de naissance',
                'constraints' => [
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                    new Callback(function ($date, $context) {
                        $regex = '/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/';

                        if ($date) {
                            $dateFormatInput = date_format($date, 'd/m/Y');
                            $checkDate = preg_match($regex, $dateFormatInput);

                            $yearFormatInput = (int) date_format($date, 'Y');
                            $yearCurrent = date('Y');

                            if (true == $checkDate) {
                                if ($yearCurrent - 100 > $yearFormatInput) {
                                    $context->addViolation('La date est trop petite.');
                                }
                            } else {
                                $context->addViolation('Le format de la date est incorrecte');
                            }
                        }
                    }),
                ],
            ])
            ->add('phonenumber', TelType::class, [
                'required' => true,
                'label' => 'Téléphone de contact',
                'attr' => ['class' => 'text'],
                'constraints' => [
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                    new Regex([
                        'pattern' => '/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/',
                        'message' => 'Le format est inccorrecte, format valide : 0701010101 ou 07 01 01 01 01 ou 07-01-01-01-01 ou +337-01-01-01-01'),
                    ]),
                ],
            ])
            ->add('Otherclass', OtherClassType::class, [
                'required' => true,
                'label' => ' ',
                'constraints' => new Valid(),
            ])
            ->add('recommendedLetter', CheckboxType::class, [
                'required' => true,
                'label' => 'Voulez vous un lettre recommander ?',
                'constraints' => new IsTrue(['message' => 'Cochez la case pour avaoir une lettre recommander']),
            ])
            ->add('postalcode', TextType::class, [
                'required' => true,
                'label' => 'Code postal',
                'attr' => ['class' => 'text'],
                'constraints' => [
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                    new Length([
                        'min' => 5,
                        'minMessage' => 'Le nombre de caractères est trop petit.',
                        'max' => 5,
                        'maxMessage' => 'Le nombre de caractères est trop grand.',
                    ]),
                ],
            ])
            ->add('identityCard', FileType::class, [
                'required' => false,
                'mapped' => false,
                'label' => 'Pièce d\'identité',
                'constraints' => [
                    new File([
                        'maxSize' => '5M',
                        'mimeTypes' => [
                            'application/pdf',
                            'application/x-pdf',
                            'image/png',
                            'image/jpg',
                            'image/jpeg',
                        ],
                        'mimeTypesMessage' => 'Veuillez choisir un fichier image PDF, JPG, JPEG ou PNG',
                    ]),
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                ],
            ])
            ->add('identityDateValidity', DateType::class, [
                'format' => 'dd/MM/yyyy',
                'attr' => ['class' => 'date', 'placeholder' => 'JJ/MM/AAAA'],
                'html5' => false,
                'widget' => 'single_text',
                'required' => true,
                'label' => 'Fin de validité de la pièce d\'identité',
                'constraints' => [
                    new NotBlank(['message' => 'Cette valeur ne doit pas être vide.']),
                    new Callback(function ($date, $context) {
                        $regex = '/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/';

                        if ($date) {
                            $dateFormatInput = date_format($date, 'd/m/Y');
                            $checkDate = preg_match($regex, $dateFormatInput);

                            $dateFormatInputTest = date_format($date, 'Y/m/d');
                            $dateCurrent = date('Y/m/d');

                            if (true == $checkDate) {
                                if ($dateCurrent >= $dateFormatInputTest) {
                                    $context->addViolation('La date est trop petite.');
                                }
                            } else {
                                $context->addViolation('Le format de la date est incorrecte');
                            }
                        }
                    }),
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Candidate::class,
            'csrf_protection' => false,
        ]);
    }
}
```
