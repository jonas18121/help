# Envoyer des fichiers en BDD avec ApiPlateform

Pour envoyer des fichiers en BDD avec ApiPlateform, on va utiliser le format `multipart/form-data` ,ce qui permet a la fois d'envoyer des données et des fichiers en mêmes temps.

On va permettre l'envoie d'image pour la table User   

## Configuration

1) On va dans le Fichier `User.php` et on va créer une `itemOpération personnalisé` 

Dans `User.php`

- On va dans `itemOpérations` après le "delete", on va rajouter "image" qui va représenter notre nouveau chemin pour envoyer des images

- Comme valeur pour `"method"`, il faut mettre `"POST"` car ça ne fonctionne pas avec `"PUT"`

- pour `"path"`, on definit le chemin qui servira a envoyer des images pour la table User

- Juste avec ce qu'on a mis ci dessus on peut aller tester dans `Postman`

- dans `Postman` il faut le réglé:

    - `/users/{id}/image`, on met notre chemin avec le verbe HTTP `POST`

    - Puis on va dans `Body` => `form-data` 

    - En `Key` , on selectionne `file` et dans ce champ on ecrit `file`

    - En `Value`, on peut cliquer sur `select file` pour choisir une image dans notre ordi

`ERREUR 1` - Si on click sur `Send`, on aura une `ERREUR` qui nous fera comprendre qu'il faut qu'on créer une controleur pour géré la requète

- Donc on cree un controleur qu'on va appeler `UserImageController` et on pourra le mettre dans notre `itemOpération personnalisé` 

    ` "controller"=UserImageController::class,` 

2) On cree le controleur UserImageController et on l'importe dans le fichier User.php

3) Il faut permettre a apiPlateform d'accepter les fichiers au format `multipart/form-data` car il ne l'accepte pas de base, donc aller dans `api_plateform.yaml`

4) `"deserialize"=false,` on va géré l'hydratation de l'entité manuellement donc on met deserialize sur false pour le désactiver

- En ligne de commande on 
    
    - crée une propriété `filePath` en string et oui pour nullable

    - crée une propriété `updatedAt` en dateTime et oui pour nullable

    - puis on fait la migration en bdd

5) Comme c'est des images qu'on va permettre, on install `VichUploaderBundle`

    > composer require vich/uploader-bundle

    pour excuter la reccette , on dit oui Y

6) On va dans `vich_uploader.yaml` et on fait le configuration qu'il faut

7) `use Vich\UploaderBundle\Mapping\Annotation as Vich;` on importe Vich

- On met l'annotation `@Vich\Uploadable` pour la class User pour dire qu'il contiendra des fichiers uploader

- Puis on cree manuellement un champs qui va accueillir le fichier uploader

- le champ sera `$file` de type `File` avec getter et setter

- On importe `File` `use Symfony\Component\HttpFoundation\File\File;`

- On met dans l'annotationde la propriété `$file` `@Vich\UploadableField(mapping="user_image", fileNameProperty="filePath")` pour lui dire qu'il va utiliser Vich,

    - `mapping="user_image"` c'est le mapping à utiliser

    - `fileNameProperty="filePath"`, on definit le champ qui servira de nom

Arriver jusque la tout est bon ça fonctionne, on va finnioller les choses maintenant

8) On cree manuellement une propriété ` $fileUrl;` de type `string` avec getter et setter, afin d'avoir le chemin de l'image

9) on cree un normalizer personnaliser, Aller dans `Serializer/UserImageNormalizer.php`

10) Ici on ajoute et configure `"openapi_context"` pour bien guider les utilisateurs de cette api pour qu'il comprennent que dans cette url `"/users/{id}/image"` on aura des données format multipart/form-data avec un file de type string et de format binary 

     "openapi_context"={
    *                  "requestBody"={
    *                      "content"={
    *                          "multipart/form-data"={
    *                              "schema"={
    *                                  "type"="object",
    *                                  "properties"={
    *                                      "file"={
    *                                          "type"="string",
    *                                          "format"="binary"
    *                                      }
    *                                  }
    *                              }
    *                          }
    *                      }
    *                  }
    *              }


Dans `User.php`

    <?php

    declare(strict_types=1);

    namespace App\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use App\Repository\UserRepository;
    use ApiPlatform\Core\Annotation\ApiResource;
    use Symfony\Component\Serializer\Annotation\Groups;
    use Symfony\Component\Security\Core\User\UserInterface;
    use App\Controller\UserImageController;
    use Vich\UploaderBundle\Mapping\Annotation as Vich;
    use Symfony\Component\HttpFoundation\File\File;

    /**
    * @ORM\Entity(repositoryClass=UserRepository::class)
    * @ApiResource(
    * 
    *      collectionOperations={
    *          "get"={
    *              "normalization_context"={"groups"={"user_read"}}
    *          },
    *          "post"
    *      },
    *      itemOperations={
    *          "get"={
    *              "normalization_context"={"groups"={"user_details_read"}}
    *          },
    *          "put",
    *          "patch",
    *          "delete",
    *          "image"={
    *              "normalization_context"={"groups"={"user_details_read"}},
    *              "method"="POST",
    *              "path"="/users/{id}/image",
    *              "controller"=UserImageController::class,
    *              "deserialize"=false,
    * 
    *              "openapi_context"={
    *                  "requestBody"={
    *                      "content"={
    *                          "multipart/form-data"={
    *                              "schema"={
    *                                  "type"="object",
    *                                  "properties"={
    *                                      "file"={
    *                                          "type"="string",
    *                                          "format"="binary"
    *                                      }
    *                                  }
    *                              }
    *                          }
    *                      }
    *                  }
    *              }
    *          } 
    *      }
    * )
    * 
    *
    * @Vich\Uploadable
    */
    class User implements UserInterface
    {
        /**
        * @ORM\Id
        * @ORM\GeneratedValue
        * @ORM\Column(type="integer")
        * @Groups({"user_read", "user_details_read"})
        */
        private int $id;

        /**
        * @ORM\Column(type="string", length=180, unique=true)
        * @Groups({"user_read", "user_details_read"})
        */
        private string $email;

        /**
        * @ORM\Column(type="json")
        */
        private array $roles = [];

        /**
        * @var string The hashed password
        * @ORM\Column(type="string")
        */
        private string $password;

        /**
        * @ORM\Column(type="string", length=255)
        * @Groups({"user_read", "user_details_read"})
        */
        private $pseudo;

        /**
        * @ORM\Column(type="string", length=255)
        * @Groups({"user_read", "user_details_read"})
        */
        private $phone;

        /**
        * @ORM\Column(type="datetime")
        * @Groups({"user_read", "user_details_read"})
        */
        private $dateCreatedAt;

        /**
        *
        * @var File|null
        * 
        * @Vich\UploadableField(mapping="user_image", fileNameProperty="filePath")
        */
        private $file;

        /**
        * @ORM\Column(type="string", length=255, nullable=true)
        * 
        * 
        */
        private $filePath;

        /**
        *
        * @var string|null
        * 
        * @Groups({"user_read", "user_details_read"})
        */
        private $fileUrl;

        /**
        * @ORM\Column(type="datetime", nullable=true)
        */
        private $updatedAt;

        public function getId(): ?int
        {
            return $this->id;
        }

        public function getEmail(): ?string
        {
            return $this->email;
        }

        public function setEmail(string $email): self
        {
            $this->email = $email;

            return $this;
        }

        /**
        * A visual identifier that represents this user.
        *
        * @see UserInterface
        */
        public function getUsername(): string
        {
            return (string) $this->email;
        }

        /**
        * @see UserInterface
        */
        public function getRoles(): array
        {
            $roles = $this->roles;
            // guarantee every user at least has ROLE_USER
            $roles[] = 'ROLE_USER';

            return array_unique($roles);
        }

        public function setRoles(array $roles): self
        {
            $this->roles = $roles;

            return $this;
        }

        /**
        * @see UserInterface
        */
        public function getPassword(): string
        {
            return $this->password;
        }

        public function setPassword(string $password): self
        {
            $this->password = $password;

            return $this;
        }

        /**
        * Returning a salt is only needed, if you are not using a modern
        * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
        *
        * @see UserInterface
        */
        public function getSalt(): ?string
        {
            return null;
        }

        /**
        * @see UserInterface
        */
        public function eraseCredentials()
        {
            // If you store any temporary, sensitive data on the user, clear it here
            // $this->plainPassword = null;
        }

        public function getPseudo(): ?string
        {
            return $this->pseudo;
        }

        public function setPseudo(string $pseudo): self
        {
            $this->pseudo = $pseudo;

            return $this;
        }

        public function getPhone(): ?string
        {
            return $this->phone;
        }

        public function setPhone(string $phone): self
        {
            $this->phone = $phone;

            return $this;
        }

        public function getDateCreatedAt(): ?\DateTimeInterface
        {
            return $this->dateCreatedAt;
        }

        public function setDateCreatedAt(\DateTimeInterface $dateCreatedAt): self
        {
            $this->dateCreatedAt = $dateCreatedAt;

            return $this;
        }

        public function getFilePath(): ?string
        {
            return $this->filePath;
        }

        public function setFilePath(?string $filePath): self
        {
            $this->filePath = $filePath;

            return $this;
        }

        /**
        * Get the value of file
        *
        * @return  File|null
        */ 
        public function getFile(): ?File
        {
            return $this->file;
        }

        /**
        * Set the value of file
        *
        * @param  File|null  $file
        *
        * @return  self
        */ 
        public function setFile(?File $file): User
        {
            $this->file = $file;

            return $this;
        }

        public function getUpdatedAt(): ?\DateTimeInterface
        {
            return $this->updatedAt;
        }

        public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
        {
            $this->updatedAt = $updatedAt;

            return $this;
        }

        /**
        * Get the value of fileUrl
        *
        * @return  string|null
        */ 
        public function getFileUrl()
        {
            return $this->fileUrl;
        }

        /**
        * Set the value of fileUrl
        *
        * @param  string|null  $fileUrl
        *
        * @return  self
        */ 
        public function setFileUrl($fileUrl)
        {
            $this->fileUrl = $fileUrl;

            return $this;
        }
    }




Dans `UserImageController.php`

- on crée une fonction `__invoke()` qui ce déclenche tout seul lorsqu'on appel la class UserImageController dans la custom operation nommé `image` qui est dans itemOperation de l'entité User

- On injecte `Request`

- `$user = $request->attributes->get('data');` on récupère l'utilisateur

- `$request->files->get('file') ` on recupère le fichier et on le met dans `$user->setFile()`

    `$user->setFile($request->files->get('file'));` 

- `$user->setUpdatedAt(new \DateTime());` c'est obliger de mettre une updated pour que `Vich` voit qu'on a modifier quelque chose, puis on retourne le user


Dans `UserImageController.php`


    namespace App\Controller;

    use App\Entity\User;
    use Symfony\Component\HttpFoundation\Request;

    class UserImageController {

        public function __invoke(Request $request)
        {
            $user = $request->attributes->get('data');

            if (! ($user instanceof User)) {
                throw new \RuntimeException('Un article est attendu ici');
            }
            
            $user->setFile($request->files->get('file'));

            $user->setUpdatedAt(new \DateTime());

            return $user;
        }

    }



Dans `api_plateform.yaml`

- On met les format que apiPlateform devra accepter

- `json: ['application/json']`, pour les données en Json

- `jsonld: ['application/ld+json']`, pour les données en Json avec plus d'info

- `html: ['text/html']` pour le html de la doc d'apiPlateform

- `multipart: ['multipart/form-data']`, pour les fichiers

Dans `api_plateform.yaml`

    api_platform:
        mapping:
            paths: ['%kernel.project_dir%/src/Entity']
        formats: 
            json: ['application/json']
            jsonld: ['application/ld+json']
            html: ['text/html']
            multipart: ['multipart/form-data']
        patch_formats:
            json: ['application/merge-patch+json']
        swagger:
            versions: [3]


Dans `vich_uploader.yaml`

- Notre mapping s'appellera `user_image`

- `uri_prefix:` l'url relative du dossier qui recevra les images pour la table user

- `upload_destination:` l'url absolue du dossier qui recevra les images pour la table user

- `namer:` pour renommé les images de manière unique

Dans `vich_uploader.yaml`

    vich_uploader:
        db_driver: orm

        mappings:
            user_image:
                uri_prefix: /images/users
                upload_destination: '%kernel.project_dir%/public/images/users'
                namer: Vich\UploaderBundle\Naming\SmartUniqueNamer



Dans `Serializer/UserImageNormalizer.php`

site : https://symfony.com/doc/current/serializer/custom_normalizer.html

- On implémente `ContextAwareNormalizerInterface` et `NormalizerAwareInterface`

- `private StorageInterface $storage` on cree la propriété $storage, on importe `StorageInterface` et on le met dans le constructeur, avec cette propriété, on pourra récupérer l'url du fichier

- Il y a 2 methode a ajouter lorsqu'on utilise `ContextAwareNormalizerInterface` : `supportsNormalization()` et `normalize()`

- pour `NormalizerAwareInterface` on va utiliser un Trait `use NormalizerAwareTrait;`

- `private const ALREADY_CALLED = 'AppUserImageNormalizerAlreadyCalled';` pour savoir si on a déjà appeler ce normalizer ou pas. afin d'éviter les boucle infinit

- `return !isset($context[self::ALREADY_CALLED]) && $data instanceof User;`, Si dans le context, on na pas encore cette valeur `self::ALREADY_CALLED` et que $data est une instance de User, on peut continuer la normalisation

- ` normalize()` pour mettre l'url dans $object->setFileUrl() de User  et mettre self::ALREADY_CALLED dans le contexte pour eviter le boucle infini


Cette erreur: veut dire de bien écrire les argument de ces function, par exemple enlever string a l'argument $format

    Compile Error: Declaration of App\Serializer\UserImageNormalizer::normalize($object, ?string $format = NULL, array $context = Array) must be compatible with Symfony\Component\Serializer\Normalizer\NormalizerInterface::normalize($object, $format = NULL, array $context = Array)

Dans `Serializer/UserImageNormalizer.php`

    <?php

    namespace App\Serializer;

    use App\Entity\User;
    use phpDocumentor\Reflection\Types\Context;
    use Vich\UploaderBundle\Storage\StorageInterface;
    use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
    use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
    use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;

    class UserImageNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
    {
        use NormalizerAwareTrait;

        /**
        * pour savoir si on a dèjà appeler ce normalizer ou pas
        */
        private const ALREADY_CALLED = 'AppUserImageNormalizerAlreadyCalled';

        private StorageInterface $storage;

        public function __construct(StorageInterface $storage)
        {
            $this->storage = $storage;
        }

        /**
        * étape 1
        * Si la valeur de self::ALREADY_CALLED n'est pas déjà dans le context et que $data est une instance de User
        * on peut continuer la normalisation
        *
        */
        public function supportsNormalization($data, $format = null, array $context = [])
        {
            return !isset($context[self::ALREADY_CALLED]) && $data instanceof User;
        }

        /**
        * étape 2
        * 
        * mettre l'url dans $object->setFileUrl() de User
        * et mettre self::ALREADY_CALLED dans le contexte pour eviter le boucle infini
        *
        * @param User $object
        */
        public function normalize($object, $format = null, array $context = [])
        {
            $object->setFileUrl($this->storage->resolveUri($object, 'file'));

            $context[self::ALREADY_CALLED] = true;

            return $this->normalizer->normalize($object, $format, $context);
        }
    }









