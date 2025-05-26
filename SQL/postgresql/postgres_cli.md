# Utilisation de PostgreSQL en ligne de commande

#### Entrer dans le container de postgresql : 
```bash
docker exec -i name_container /bin/bash
```

#### Entrer dans BDD précise qu'on a créer dans postgresql : 
```bash
PGPASSWORD=postgres psql --username postgres name_bdd
```

#### Voir la liste des bdd disponible :
```bash
\l
```

#### Afficher la liste des utilisateurs :
```bash
SELECT usename FROM pg_user;
```

#### Sortir du prompt de postgres :
```bash
\q
```

#### Créer une BDD
```bash
CREATE DATABASE test_jonas;
```

#### Switch vers une autres BDD
```bash
\c name_bdd;

# exemple :
\c test_bdd;
```


#### Supprimer une BDD (Avant de le supprimer, switchez vers une autre BDD)
```bash
\c name_bdd_2
DROP DATABASE IF EXISTS name_bdd_1;

# exemple :
\c table_user
DROP DATABASE IF EXISTS table_caregory;
```


#### Voir la liste des tables présent dans la BDD
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
## Exporter

#### Exporter toute la base de données dans un fichier SQL :
```bash
pg_dump -U name_user -d name_bdd -f name_file_export.sql
```

- Remplacez `name_user` par le nom de l'utilisateur PostgreSQL ayant les autorisations nécessaires pour accéder à la base de données que vous souhaitez exporter.

- Remplacez `name_bdd` par le nom de la base de données que vous souhaitez exporter.

- Remplacez `name_file_export.sql` par le nom du fichier dans lequel vous souhaitez exporter la base de données. Ce fichier contiendra les instructions SQL nécessaires pour restaurer la base de données.

#### Exporter une table spécifique dans un fichier SQL :
```bash
pg_dump -U name_user  -d name_bdd -t name_table -f name_file_export.sql
```

- Remplacez `name_table` par le nom de la table spécifique que vous souhaitez exporter.

## Importer un fichier sql

#### Étape 1 : Vérifier que la base existe

```bash
sudo -u postgres createdb nom_de_la_base
```

#### Étape 2 : Importer le fichier SQL

##### Méthode 1 : depuis le terminal

```bash
sudo -u postgres psql -d nom_de_la_base -f /chemin/vers/mon_script.sql
```

##### Méthode 2 : depuis l’intérieur de psql

Connecte-toi à PostgreSQL :

```bash
sudo -u postgres psql -d nom_de_la_base
```

Dans le prompt psql, tape :

```bash
\i /chemin/vers/mon_script.sql
```

#### Vérification

Après l'import, tu peux voir les tables créées :

```bash
\dt
```

## Creer une base de données

#### Étape 1 : Entrer dans psql

```bash
sudo -u postgres psql
```

#### Étape 2 : Créer la base de données

```bash
CREATE DATABASE nom_de_la_base;
```

#### Étape 3 (optionnel) : Créer un utilisateur et lui donner les droits

```bash
CREATE USER monuser WITH PASSWORD 'monmotdepasse';
```

Puis donner tous les droits sur la base :

```bash
GRANT ALL PRIVILEGES ON DATABASE testdb TO monuser;
```

#### Étape 4 : Se connecter à la nouvelle base

```bash
\c nom_de_la_base;
```

Ou depuis le terminal :

```bash
psql -U monuser -d testdb -h localhost -p 5432
```