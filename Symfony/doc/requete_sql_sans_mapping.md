# Requête SQL sans avoir besoin de faire du mapping

Site [symfonycasts](https://symfonycasts.com/screencast/doctrine-queries/raw-sql-queries)

## La connexion DBAL

L'objet le plus important dans Doctrine est... le gestionnaire d'entités ! Mais ce n'est qu'une marionnette pour le vrai responsable : la connexion ! Saisissez-le en obtenant le gestionnaire d'entité et en appelant getConnection(). 

```php
$connexion = $this->getEntityManager()->getConnection();

```

ou 

```php
$connexion = $this->_em()->getConnection();

```

ou 

```php
$connexion = $manager()->getConnection();

```

## Requête select

```php
$connexion = $this->_em()->getConnection();

$sql = "SELECT * FROM articles WHERE id = ?";
$stmt = $connexion->prepare($sql);
$stmt->bindValue(1, $id);
$stmt->execute();
```

```php
public function countNumberPrintedForCategory(Category $category)
{
    $connexion = $this->getEntityManager()->getConnection();

    $sql = 'SELECT * FROM fortune_cookie';
    $stmt = $connexion->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}
```

ou

```php
public function countNumberPrintedForCategory(Category $category)
{
    $connexion = $this->_em()->getConnection();

    $sql = 'SELECT * FROM fortune_cookie';
    $stmt = $connexion->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}
```

ou

```php
public function countNumberPrintedForCategory(Category $category, EntityManagerInterface $manager)
{
    $connexion = $manager->getConnection();

    $sql = 'SELECT * FROM fortune_cookie';
    $stmt = $connexion->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}
```

## Requête select avec paramètre

```php
public function countNumberPrintedForCategory(Category $category)
{
    $connexion = $this->getEntityManager()->getConnection();
    $sql = '
        SELECT SUM(fc.numberPrinted) as fortunesPrinted, AVG(fc.numberPrinted) as fortunesAverage, cat.name
        FROM fortune_cookie fc
        INNER JOIN category cat ON cat.id = fc.category_id
        WHERE fc.category_id = :category
        ';
    $stmt = $connexion->prepare($sql);
    $stmt->execute(array('category' => $category->getId()));
    return $stmt->fetchAll();
}
```

### Utiliser fetch() pour récupérer la première ligne

```php
public function countNumberPrintedForCategory(Category $category)
{
    $connexion = $this->getEntityManager()->getConnection();
    $sql = '
        SELECT SUM(fc.numberPrinted) as fortunesPrinted, AVG(fc.numberPrinted) as fortunesAverage, cat.name
        FROM fortune_cookie fc
        INNER JOIN category cat ON cat.id = fc.category_id
        WHERE fc.category_id = :category
        ';
    $stmt = $connexion->prepare($sql);
    $stmt->execute(array('category' => $category->getId()));
    return $stmt->fetch();
}
```

## Requête INSERT INTO

```php

public function createUser($lastname, $firstname, $phonenumber)
{
    $connexion = $this->_em()->getConnection();
    
    $sql = "INSERT INTO user (`lastname`, `firstname`, `phonenumber`) 
        VALUES ( :lastname, :firstname, :phonenumber)";

    $user = $connexion->prepare($sql);
    $user->execute([
        ':lastname' => $lastname,
        ':firstname' => $firstname, 
        ':phonenumber' => $phonenumber
    ]);
}
```

### Possibilité de mettre plusieurs requête SQL

Les requête ci-dessous permet de désactiver la vérification de clé étrangère.

Puis on supprime les données de la table user et oen même temps mettre l'auto-incrémentation à zéro.

Puis on résactive la vérification de clé étrangère.

```php
$sql = '
    SET FOREIGN_KEY_CHECKS=0; 
    TRUNCATE TABLE user; 
    SET FOREIGN_KEY_CHECKS=1;';

// code ...
```