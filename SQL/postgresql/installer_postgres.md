# Installer PostgreSQL

#### Étape 1 : Ajouter le dépôt PostgreSQL officiel

```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

#### Étape 2 : Importer la clé GPG

```bash
wget -qO- https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/pgdg.gpg > /dev/null
```

#### Étape 3 : Mettre à jour les paquets et installer PostgreSQL 17

```bash
sudo apt update
sudo apt install postgresql-17 postgresql-client-17 -y
```

#### Étape 4 (important) : Créer et démarrer le cluster PostgreSQL 17

Après installation, s’il n’y a pas de cluster actif :

```bash
sudo pg_createcluster 17 main
sudo pg_ctlcluster 17 main start
```

#### Étape 5 : Vérifier que PostgreSQL 17 fonctionne

```bash
pg_lsclusters
```

##### Retourne 

```bash
Ver Cluster Port Status Owner    Data directory              Log file
17  main    5432 online postgres /var/lib/postgresql/17/main /var/log/postgresql/postgresql-17-main.log
```

#### Étape 6 : Se connecter à PostgreSQL

```bash
sudo -u postgres psql
```

