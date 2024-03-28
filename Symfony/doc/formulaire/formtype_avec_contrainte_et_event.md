# Formtype avec contrainte dans des groupes et event

```php

declare(strict_types=1);

namespace App\Form\Registration\Frontend;

use App\Entity\Exam;
use App\Entity\Registration;
use App\Entity\Session;
use App\Enum\DataEnum;
use App\Enum\ExamEnum;
use App\Enum\PaymentModeEnum;
use App\Form\User\Frontend\AddressType;
use App\Form\User\Frontend\UserType;
use App\Repository\ExamRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Valid;

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('cgAccepted', CheckboxType::class, [
                'required' => true,
                'label' => 'J\'accepte les conditions générales de l\'association',
                'constraints' => new IsTrue([
                    'message' => 'Cochez la case',
                    'groups' => 'registration',
                ]),
            ])
            ->add('recommendedLetter', CheckboxType::class, [
                'required' => true,
                'label' => 'Voulez vous une lettre recommandez ?',
                'constraints' => new IsTrue([
                    'message' => 'Cochez la case',
                    'groups' => 'registration',
                ]),
            ])
            ->add('paymentMode', ChoiceType::class, [
                'required' => true,
                'label' => 'Mode de paiement',
                'choices' => PaymentModeEnum::$list,
                'mapped' => false,
            ])
            ->add('session', EntityType::class, [
                'class' => Session::class,
                'label' => 'Session',
                'placeholder' => 'Choisir un examen d\'abord',
                'choices' => [],
                'constraints' => new NotBlank([
                    'groups' => 'registration',
                    'message' => 'Cette valeur ne doit pas être null',
                ]),
                'mapped' => false,
            ])
            ->add('exam', EntityType::class, [
                'multiple' => false,
                'expanded' => false,
                'label' => 'Choisir l\'examen à passer',
                'placeholder' => 'Choisir un examen',
                'class' => Exam::class,
                'label_html' => true,
                'required' => true,
                'query_builder' => function (ExamRepository $er) {
                    return $er->createQueryBuilder('e')
                        ->where('e.deleted_at IS NULL');
                },
                'choice_label' => function ($exam) {
                    return $exam->getName();
                },
                'constraints' => new NotBlank([
                    'groups' => 'registration',
                    'message' => 'Cette valeur ne doit pas être null',
                ]),
                'choice_attr' => function (?Exam $exam) {
                    return ['class' => $exam ? $exam->getSlug()  : '' ];
                }
            ])
            ->add('user',  UserType::class, [
                'required' => true,
                'label' => ' ',
                'constraints' => new Valid(),
            ])
            ->add('address', AddresType::class, [
                'required' => true,
                'label' => ' ',
                'constraints' => new Valid(),
            ])
            ->add('password', RepeatedType::class, [ // RepeatedType permet de répéter 2 fois un input
                'type' => PasswordType::class, // Ici on précise que les 2 inputs seront de type password
                'invalid_message' => 'Le mot de passe et le confirmation doivent être identique', // Le message sera sur le 1er input
                'required' => true,
                'first_options' => [ // Ici on configure le 1er input
                    'label' => 'Mot de passe',
                    'attr' => [
                        'placeholder' => '************'
                    ]
                ],
                'second_options' => [ // Ici on configure le 2èmes input
                    'label' => 'Confirmez votre mot de passe',
                    'attr' => [
                        'placeholder' => '************'
                    ]
                ],
                
            ])
        ;

        $formModifierExam = function (?FormInterface $form, Exam $exam = null) {
            if (null !== $form) {
                $form->add('session', EntityType::class, [
                    'class' => Session::class,
                    'choices' => null === $exam ? [] : $exam->getSessionsValid(),
                    'label' => 'Sélectionner une date d\'examen',
                    'required' => true,
                    'choice_label' => function ($session) {
                        return 'Session du '.$session->getExamDate()->format('d/m/Y');
                    },
                    'placeholder' => null === $exam ? 'Choisir un examen avant' : 'Choisir une session',
                    'group_by' => function ($choice, $key, $value) {
                        if (ExamEnum::PAPER_BASED === $choice->getExamType()) {
                            return 'Sur papier';
                        }

                        return 'Sur ordinateur';
                    },
                    'constraints' => new NotBlank([
                        'groups' => 'registration',
                        'message' => 'Cette valeur ne doit pas être null',
                    ]),
                    'mapped' => false,
                ]);
            }
        };

        // ajoute l'examen dans formModifierExam après submit
        $builder->get('exam')->addEventListener(
            FormEvents::PRE_SUBMIT,
            function (FormEvent $event) use ($formModifierExam) {
                /** @var Exam|null */
                $exam = $event->getForm()->getData();
                if (null !== $exam) {
                    $formModifierExam($event->getForm()->getParent(), $exam);
                }
            }
        );
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Registration::class,
        ]);
    }
}

```