
### Utiliser as dans la methodes select()

- Utiliser `c as category` au lieu de juste`c` va permettre de retourner un array avec une clé nommé `category` au lieu d'une clé nommé `0` (indice d'un array)

```php
public function findAllWithCount(): array
{
    return $this->createQueryBuilder('c')
        ->select('c as category', 'COUNT(c.id) as total')
        ->leftJoin('c.recipes', 'r')
        ->groupBy('c.id')    
        ->getQuery()
        ->getResult()
    ;
}
```