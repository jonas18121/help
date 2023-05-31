
### Recherche des données par années et/ou par mois puis exclus les données qui ont été créer dans le mois en cours
```php
    public function findFromYearAndMonth(int $year, ?int $month = null): array
    {
        if (null !== $month && 0 <= $month) {
            $search = $year . '-' . $month . '-01';

            $query = "
                SELECT * FROM app_order_invoice
                WHERE Year(created_at) = YEAR(:search)
                AND MONTH(created_at) = MONTH(:search)
                AND CONCAT(YEAR(created_at), LPAD(MONTH(created_at), 2, '0')) <> CONCAT(YEAR(CURRENT_DATE), LPAD(MONTH(CURRENT_DATE), 2, '0'))
                ORDER BY created_at DESC
            ";
        } else {
            $search = $year . '-01-01';

            $query = "
                SELECT * FROM app_order_invoice
                WHERE Year(created_at) = YEAR(:search)
                AND CONCAT(YEAR(created_at), LPAD(MONTH(created_at), 2, '0')) <> CONCAT(YEAR(CURRENT_DATE), LPAD(MONTH(CURRENT_DATE), 2, '0'))
                ORDER BY created_at DESC
            ";
        }

        $connection = $this->getEntityManager()->getConnection();
        $params = [
            'search' => $search,
        ];
        $statement = $connection->prepare($query);
        $statement->execute($params);

        return $statement->fetchAll();
    }
```

Nous avons ajouté une condition supplémentaire pour exclure les enregistrements du mois en cours. 

La condition `CONCAT(YEAR(created_at), LPAD(MONTH(created_at), 2, '0')) <> CONCAT(YEAR(CURRENT_DATE), LPAD(MONTH(CURRENT_DATE), 2, '0'))` compare une concaténation de l'année et du mois de `created_at` avec une concaténation de l'année et du mois actuels `(CURRENT_DATE)`. 

Si les concaténations sont différentes, cela signifie que les enregistrements ne sont pas du mois en cours, et ils seront inclus dans le résultat de la requête.

Si les concaténations sont pareil, cela signifie que les enregistrements sont pareil que celui du mois en cours, et ils seront `exclus` dans le résultat de la requête.

Year(created_at) = YEAR(:search) : on recherche uniquement l'années

MONTH(created_at) = MONTH(:search) : on recherche uniquement le mois