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

2) On cree le controleur UserImageController

3) Il faut permettre a apiPlateform d'accepter les fichiers au format `multipart/form-data` car il ne l'accepte pas de base, donc aller dans `api_plateform.yaml`

- `"deserialize"=false,` on va géré l'hydratation de l'entité manuellement donc on met deserialize sur false pour le désactiver

Dans `User.php`

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
    *          } 
    *      }
    * )
    */




Dans `UserImageController.php`

- on crée une fonction `__invoke()` qui ce déclenche tout seul lorsqu'on appel la class UserImageController dans la custom operation nommé `image` qui est dans itemOperation de l'entité User

- On injecte `Request`

- `$user = $request->attributes->get('data');` on récupère l'utilisateur

- `$request->files->get('file') ` on recupère le fichier et on le met dans `$user->setFile()`

    `$user->setFile($request->files->get('file'));` 

- `$user->setUpdatedAt(new \DateTime());` c'est obliger de mettre une updated pour que doctrine voit qu'on a modifier quelque chose puis on retourne le user

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















Cette erreur:

    Compile Error: Declaration of App\Serializer\UserImageNormalizer::normalize($object, ?string $format = NULL, array $context = Array) must be compatible with Symfony\Component\Serializer\Normalizer\NormalizerInterface::normalize($object, $format = NULL, array $context = Array)
