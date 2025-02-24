# Augmenter les max_connections

D'après ce que je sais, si vous souhaitez avoir ce paramètre de manière persistante pour vos bases de données MySQL, 

vous devez modifier le paramètre `max_connection` dans votre fichier de configuration MySQL. 

#### L'emplacement de ce fichier peut varier selon la version de MySQL depuis la racine du projet :

- /etc/my.cnf
- /etc/mysql/my.cnf
- /etc/mysql/mysql.conf.d/mysqld.cnf

#### Vous pouvez également déterminer où se trouve l'emplacement du fichier de configuration en exécutant `mysqld --help --verbose`. 

```bash
mysqld --help --verbose
```

Cette commande affichera quelque chose dans ce sens :

```bash
Default options are read from the following files in the given order:

/etc/my.cnf /usr/local/etc/my.cnf ~/.my.cnf
```

Dans le fichier de configuration `my.cnf`, vous voudrez trouver la section `[mysqld]`. 

Dans cette section, vous voudrez insérer/modifier la ligne en `max_connections = $defaultvalue`. 

Vous définiriez à la place de `$defaultvalue` la connexion maximale souhaitée.

#### L'utilisation de cette méthode nécessiterait que vous redémarriez votre serveur MySQL en exécutant la commande : /etc/init.d/mysql restart.

```bash
/etc/init.d/mysql restart
```

Si cela ne fonctionne pas, essayez d'exécuter : sudo systemctl restart mysqld

```bash
sudo systemctl restart mysqld
```

#### Si vous souhaitez augmenter temporairement le nombre maximum de connexions, vous devrez modifier une variable dans MySQL. 

Vous devriez pouvoir y parvenir en procédant comme suit :

Accédez à votre outil de ligne de commande MySQL

Commande:
```sql
show variables like "max_connections";
```

Cela renverra une sortie en tant que telle :

| Nom de variable |	Évaluer |
| --------------- | ------- |
| max_connections |	100     |


#### Si vous disposez des autorisations appropriées, modifiez la variable en exécutant la commande : 
```sql
set global max_connections = $DesiredValue;. 
```
Vous insérez la valeur maximale de connexions souhaitée à la place de `$DesiredValue`.

Les modifications utilisant cette méthode prendront effet immédiatement, mais seront réinitialisées aux valeurs par défaut une fois MySQL redémarré.

```html
La valeur maximale que vous pouvez définir max_connectionsest 100 000. 

La valeur minimale est 1, tandis que la valeur par défaut est 151. 

Gardez à l'esprit que la définition d'une valeur plus élevée peut affecter les performances 
```

#### Ressources additionnelles:

- [Manuel MySQL expliquant la variable max_connections](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_connections)
- [Post StackOverflow avec une excellente réponse sur la configuration de max_connections](https://stackoverflow.com/questions/22297773/how-to-increase-mysql-connectionsmax-connections)
- [Un autre article de StackOverflow concernant un problème de mise à jour de max_connections](https://stackoverflow.com/questions/39976756/the-max-connections-in-mysql-5-7/39977127)