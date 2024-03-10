<?php

declare(strict_types=1);

/*
 * Copyright (C) EDGCo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

namespace Eshop\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Eshop\Entity\Product;
use App\Entity\SeedPage;
use App\Enum\PageStateEnum;
use Symfony\Component\HttpFoundation\InputBag;

/**
 * @extends ServiceEntityRepository<Product>
 *
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * @return Product[]
     */
    public function findAllPublishedProductWithSeedPage()
    {
        $query = $this->em()->createQuery(
            sprintf('SELECT p
            FROM %s p
            INNER JOIN p.page sp
            WHERE sp.state = :seedPageState
            AND p.deleted_at IS NULL
            ORDER BY p.id DESC', Product::class)
        )
            ->setParameter('pageState', PageStateEnum::PUBLISHED);

        /** @var Product[] $data */
        $data = $query->execute();

        if (empty($data)) {
            return [];
        }

        return $data;
    }


    public function searchOnFrontend(
        ?string $search,
        array $sort = ['pa.name' => 'ASC']
    ): array {
        $queryBuilder = $this->createQueryBuilder('p');

        $queryBuilder->join('p.page', 'pa');
        $queryBuilder->where('pa.state = :state')->setParameter('state', PageStateEnum::PUBLISHED);

        if (null !== $search && '' !== $search) {
            $queryBuilder
                ->andWhere('pa.name LIKE :search OR p.reference LIKE :search OR p.keywords LIKE :search');

            $queryBuilder->setParameter('search', '%' . $search . '%');
        }

        $preparedQuery = $queryBuilder;

        return (array) $preparedQuery->addOrderBy((string) array_key_first($sort), $sort[array_key_first($sort)])->getQuery()->getResult();
    }

    // BASE

    private function em(
        bool $refresh = false
    ): \Doctrine\ORM\EntityManagerInterface {
        if (true === $refresh && false === $this->_em->getConnection()->isConnected()) {
            $this->_em->getConnection()->close();
            $this->_em->getConnection()->connect();
        }

        return $this->_em;
    }
}
