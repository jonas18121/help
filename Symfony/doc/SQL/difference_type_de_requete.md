# Différents type de requêtes dans un repository

## Requête DQL avec createQueryBuilder

```php
public function findEtapeToPhase(Phases $phases, Operations $operations)
{
    return $this->createQueryBuilder('etape')
        ->select('DISTINCT etape.id')
        ->join('etape.phase', 'phase')
        ->join('etape.tyoOpeEtas', 'toe')
        ->join('toe.operation', 'operation')
        ->andWhere('phase.id = :phaseId')
        ->andWhere('operation.id = :operationId')
        ->setParameter('phaseId', $phases->getId_pha())
        ->setParameter('operationId', $operations->getId_ope())
        ->getQuery()
        ->getResult();
}
```

## Requête DQL avec createQuery

```php
public function findEtapeToPhase(Phases $phases, Operations $operations)
{
    $query = $entityManager->createQuery('
        SELECT DISTINCT eta
        FROM App\Entity\spo\Etapes eta
        JOIN App\Entity\spo\TyoOpeEta toe WITH eta.id = toe.etape
        JOIN App\Entity\spo\Phases pha WITH eta.phase = pha AND pha.id = :phaseId
        JOIN App\Entity\spo\Operations ope WITH toe.operation = ope AND ope.id = :operationId'
    );

    $query->setParameter('phaseId', $phases->getId_pha());
    $query->setParameter('operationId', $operations->getId_ope());
    return $query->getResult();
}
```

## Requête SQL avec getConnection

```php
public function findEtapeToPhase(Phases $phases, Operations $operations)
{
    $sql = '
        SELECT DISTINCT eta.*
        FROM im_spo_etapes eta
        JOIN im_spo_tyo_ope_eta toe ON eta.id_eta = toe.toe_id_eta 
        JOIN im_spo_phases pha ON eta.eta_id_pha = pha.id_pha AND pha.id_pha = :phaseId
        JOIN im_spo_operations ope ON toe.toe_id_ope = ope.id_ope AND ope.id_ope = :operationId'
    ;

    $stmt = $this->getEntityManager()->getConnection()->prepare($sql);
    $stmt->bindValue('phaseId', $phases->getId_pha());
    $stmt->bindValue('operationId', $operations->getId_ope());
    $stmt->execute();

    // Utiliser fetchMode pour retourner les résultats en tant qu'objets entité
    $stmt->setFetchMode(\PDO::FETCH_CLASS, App\Entity\spo\Etapes::class);

    return $stmt->fetchAll();
}
```