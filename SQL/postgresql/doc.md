# Utilisation de PostgreSQL en ligne de commande

### Entrer dans le container de postgresql : 
```bash
docker exec -i name_container /bin/bash
```

### Entrer dans BDD précise qu'on a créer dans postgresql : 
```bash
PGPASSWORD=postgres psql --username postgres name_bdd
```

### Voir la liste des bdd disponible :
```bash
\l
```

### Afficher la liste des utilisateurs :
```bash
SELECT usename FROM pg_user;
```

### Sortir du prompt de postgres :
```bash
\q
```

### Sortir du prompt de postgres :
```bash
\q
```

### Créer une BDD
```bash
CREATE DATABASE test_jonas;
```

### Switch vers une autres BDD
```bash
\c name_bdd;

# exemple :
\c test_bdd;
```


### Supprimer une BDD (Avant de le supprimer, switchez vers une autre BDD)
```bash
\c name_bdd_2
DROP DATABASE IF EXISTS name_bdd_1;

# exemple :
\c table_user
DROP DATABASE IF EXISTS table_caregory;
```


### Voir la liste des tables présent dans la BDD
```sql
select * from pg_catalog.pg_tables where schemaname='public';
```

```bash
# ou

# Voir la liste des tables présent dans la BDD

\d

# Appuyer sur la touche espace pour voir plus de table lorsque c'est écrit --- more ---

# Appuyer sur la touche q pour quitter
q
```

### Exporter toute la base de données dans un fichier SQL :
```bash
pg_dump -U name_user -d name_bdd -f name_file_export.sql
```

- Remplacez `name_user` par le nom de l'utilisateur PostgreSQL ayant les autorisations nécessaires pour accéder à la base de données que vous souhaitez exporter.

- Remplacez `name_bdd` par le nom de la base de données que vous souhaitez exporter.

- Remplacez `name_file_export.sql` par le nom du fichier dans lequel vous souhaitez exporter la base de données. Ce fichier contiendra les instructions SQL nécessaires pour restaurer la base de données.

### Exporter une table spécifique dans un fichier SQL :
```bash
pg_dump -U name_user  -d name_bdd -t name_table -f name_file_export.sql
```

- Remplacez `name_table` par le nom de la table spécifique que vous souhaitez exporter.