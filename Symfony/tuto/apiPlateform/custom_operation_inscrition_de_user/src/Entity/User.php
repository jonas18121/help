<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Controller\UserImageController;
use App\Controller\UserRegisterController;
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
 *          "post"={
 *              "method"="POST",
 *              "path"="/users",
 *              "controller"=UserRegisterController::class,
 *              "deserialize"=false,
 *          },
 *          
 *      },
 *      itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"user_details_read"}}
 *          },
 *          "put",
 *          "patch",
 *          "delete",
 *          "image"={
 *              "normalization_context"={"groups"={"user_image_read"}},
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
     * @Groups({"user_read", "user_details_read", "user_image_read"})
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user_read", "user_details_read", "user_image_read"})
     */
    private string $email;

    /**
     * @ORM\Column(type="json")
     */
    private array $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"user_image_read"})
     */
    private string $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "user_details_read", "user_image_read"})
     */
    private $pseudo;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "user_details_read", "user_image_read"})
     */
    private $phone;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"user_read", "user_details_read", "user_image_read"})
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
     */
    private $filePath;

    /**
     * @var string|null
     * 
     * @Groups({"user_read", "user_details_read", "user_image_read"})
     */
    private $fileUrl;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user_read", "user_details_read", "user_image_read"})
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
