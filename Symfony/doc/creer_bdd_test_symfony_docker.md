# Pour créer une base de données pour l'environnement de test dans Symfony qui utilise Docker, vous pouvez suivre les étapes suivantes :


Créez un fichier de configuration de base de données pour l'environnement de test dans votre application Symfony :
yaml
Copy code
```yml
# config/packages/test/doctrine.yaml
doctrine:
    dbal:
        url: '%env(TEST_DATABASE_URL)%'
```

Configurez les paramètres d'environnement pour votre base de données de test dans un fichier .env.test :

```ps
TEST_DATABASE_URL=mysql://db_user:db_password@db_host:3306/db_name_test
```

Créez un conteneur Docker pour votre base de données de test :
```yaml
version: '3.7'

services:
  db_test:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: db_name_test
      MYSQL_USER: db_user
      MYSQL_PASSWORD: db_password
    ports:
      - 3306:3306
```

Démarrez le conteneur Docker :
```ps
docker-compose up -d db_test
```

Créez la base de données pour l'environnement de test en utilisant la commande suivante dans le terminal :

```bash
php bin/console doctrine:database:create --env=test
```

Vous devriez maintenant avoir une base de données de test fonctionnelle dans votre environnement Symfony avec Docker.