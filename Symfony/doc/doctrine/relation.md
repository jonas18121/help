# Travail avec les associations (Working with Associations)

- [Working with Associations](https://www.doctrine-project.org/projects/doctrine-orm/en/3.2/reference/working-with-associations.html#:~:text=Associations%20between%20entities%20are%20represented,when%20calling%20EntityManager%23flush()%20.)

Voici un exemple, mais aller voir sur le lien ci-dessus

```php
class User
{
    // ..

    /** @return Collection<int, Comment> */
    public function getAuthoredComments(): Collection {
        return $this->commentsAuthored;
    }

    /** @return Collection<int, Comment> */
    public function getFavoriteComments(): Collection {
        return $this->favorites;
    }
}

class Comment
{
    // ...

    /** @return Collection<int, User> */
    public function getUserFavorites(): Collection {
        return $this->userFavorites;
    }

    public function setAuthor(User|null $author = null): void {
        $this->author = $author;
    }
}

// Many-to-Many
$user->getFavorites()->add($favoriteComment);
$favoriteComment->getUserFavorites()->add($user);

$em->flush();

// Many-To-One / One-To-Many Bidirectional
$newComment = new Comment();
$user->getAuthoredComments()->add($newComment);
$newComment->setAuthor($user);

$em->persist($newComment);
$em->flush();
```