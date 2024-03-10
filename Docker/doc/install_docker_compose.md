# Installer Docker-compose sous Linux

- Installation dans linux : https://www.nicelydev.com/docker/installer-docker-compose#h2_1


1) Télécharger docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2) Changer les autorisations

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

3) Créer un lien symbolique

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

4) Vérifier

```bash
docker-compose -v
```

Si le terminal affiche un numéro de version, c'est que tout c'est bien passé.

Par exemple ce qui suit.

docker-compose version 1.29.2, build 5becea4c

Bravo !!!