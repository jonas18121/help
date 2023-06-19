<?php

declare(strict_types=1);

/*
 * Copyright (C) EDGCo - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

namespace Controller\Frontend;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    /**
     * @Route("/recherche" , name="frontend_search_index")
     */
    public function index(
        Request $request,
        ProductRepository $productRepository
    ): Response {
        $query = $request->query->get('q', null);
        if (!\is_string($query)) {
            $query = null;
        }

        $sort = $request->query->get('s', null);
        if (!\is_string($sort)) {
            $sort = 'alphabetic';
        }

        $sortOrderBy = ['pa.name' => 'ASC'];
        if ('alphabetic' === $sort) {
            $sortOrderBy = ['pa.name' => 'ASC'];
        } elseif ('newer' === $sort) {
            $sortOrderBy = ['p.created_at' => 'DESC'];
        } elseif ('older' === $sort) {
            $sortOrderBy = ['p.created_at' => 'ASC'];
        } elseif ('cheaper' === $sort) {
            $sortOrderBy = ['p.price' => 'ASC'];
        } elseif ('expensive' === $sort) {
            $sortOrderBy = ['p.price' => 'DESC'];
        } else {
            $sort = 'alphabetic';
        }

        $viewParameters = [];
        $viewParameters['products'] = $productRepository->searchOnFrontend($query, $sortOrderBy);
        $viewParameters['count'] = \count($viewParameters['products']);
        $viewParameters['query'] = $query;
        $viewParameters['sort'] = $sort;

        return $this->render('Frontend/Pages/page-search-products/page-search-products.html.twig', $viewParameters);
    }
}
