# Exemple de UploadService


#### UploadService

```php
declare(strict_types=1);

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Upload - Service.
 */
class UploadService
{
    /**
     * Renomme et envoie le fichier dans le répertoire indiquer
     */
    public function uploadFile(UploadedFile $file, string $pathToMoveIn): array
    {
        # séparer le nom et l'extention du fichier
        $explodeFilename = explode('.', $file->getClientOriginalName());

        # Obtenir la date du jour
        $date = new \DateTimeImmutable();

        # Réécrire le nom du fichier avec la date/heure de téléchargement
        $newFilename = $explodeFilename[0] . '_' . $date->format('Ymd_His') . '.' . $file->getClientOriginalExtension();

        # Identification du répertoire dans lequel on veut mettre le fichier
        $moveIn = $pathToMoveIn;

        try {
            # Mettre le fichier dans le répertoire
            $file->move($moveIn, $newFilename);
        } finally {
            restore_error_handler();
        }

        return [$newFilename, $file->getClientOriginalName()];
    }

    /**
     * Supprime la date du nom réel du fichier enregistrer dans le serveur
     */
    public function removeDateInFileName(string $path): string
    {
        $originalName = basename($path);

        // Nettoyage du nom
        $name = pathinfo($originalName, PATHINFO_FILENAME);
        $ext  = pathinfo($originalName, PATHINFO_EXTENSION);

        // Supprime la date du nom réel du fichier
        $name = preg_replace('/[ _]\d{8}_\d{6}/', '', $name);

        return $ext ? $name . '.' . $ext : $name;
    }
}
```

#### Dans un Controller

```php
/**
 * @Route("/download/fichier/{fileNameCompletExtension}",
 *     name="download_manual",
 *     requirements={"fileNameComplet": "[^/]+"}
 * )
 *
 * Permet à un utilisateur de téléchager vers son dossier PC de download,
 * si le nom du fichier contient une date, on enlève la date avec removeDateInFileName()
 * Le fichier télécharger n'aura pas de date sur le PC de l'utilisateur
 * 
 * Ex: exemple_20260324_111213.pdf se transforme en exemple.pdf 
 * 
 * Pas de dump(), dd(), echo, le moindre dump() ou espace avant le return ;
 * Sinon ça va casser le binaire.
 */
public function downloadManual(
    string $fileNameCompletExtension
): BinaryFileResponse
{
    // Construit le chemin complet du fichier (dossier de stockage hors /public)
    $path = $this->getParameter('kernel.project_dir') . DIRECTORY_SEPARATOR  . "upload" . DIRECTORY_SEPARATOR . $fileNameCompletExtension;

    if (!is_file($path)) {
        throw new NotFoundHttpException("Fichier physique non trouvé : " . $fileNameCompletExtension);
    }

    $file = new File($path);
    return $this->file($file, $this->uploadService->removeDateInFileName($path));
}
```