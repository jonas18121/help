# Serveur distant est rempli

ça génère une erreur : `Notice: fwrite(): write of 512 bytes failed with errno=28 No space left on device`


L'erreur `errno=28 No space left on device` signifie que votre serveur est à court d'espace disque. Voici comment résoudre ce problème :

### 1. Vérifier l’espace disque disponible

Connectez-vous à votre serveur en SSH et exécutez :

```bash
df -h
```
Cela vous montrera l’espace disque utilisé et disponible. Si / ou /var est plein, c'est probablement la cause du problème.

Exemple : 

```bash
Filesystem             Size  Used Avail Use% Mounted on
udev                   194M     0  194M   0% /dev
tmpfs                   43M  480K   43M   2% /run
/dev/mapper/vg00-lv01  7.4G  7.1G  3.6G  100% /
tmpfs                  213M     0  213M   0% /dev/shm
tmpfs                  5.0M     0  5.0M   0% /run/lock
/dev/vda1              462M   86M  348M  20% /boot
tmpfs                   43M     0   43M   0% /run/user/1000
```

### 2. Vérifier l’espace utilisé par les fichiers

Exécutez cette commande pour voir quels dossiers prennent le plus d’espace :

```bash
du -sh /* 2>/dev/null | sort -h
```

Vous pouvez affiner la recherche, par exemple sur le dossier /var:

```bash
du -sh /var/* 2>/dev/null | sort -h
```
Ou sur votre projet Symfony :

```bash
du -sh /chemin/de/votre/projet/*
```

### 3. Nettoyer l’espace disque

Voici quelques actions possibles :

a. Supprimer les logs Symfony

Si votre projet génère beaucoup de logs, videz-les :

```bash
rm -rf /chemin/de/votre/projet/var/log/*
```

b. Supprimer les anciens fichiers de cache

Symfony génère beaucoup de fichiers en cache :

```bash
rm -rf /chemin/de/votre/projet/var/cache/*
```

c. Vérifier les fichiers temporaires

Vérifiez /tmp et /var/tmp :

```bash
rm -rf /tmp/*
rm -rf /var/tmp/*
```

d. Nettoyer les paquets inutiles

Si votre serveur tourne sous Debian/Ubuntu :

```bash
apt autoremove -y
apt clean
```

4. Vérifier l’inode usage

Si votre disque n’est pas plein mais que vous avez cette erreur, le problème peut venir du nombre d’inodes utilisés :

```bash
df -i
```

Si vous avez 100% d’inodes utilisés, supprimez des fichiers inutiles (logs, caches, etc.).

5. Redémarrer les services

Après nettoyage, redémarrez les services nécessaires, comme PHP et Apache/Nginx :

```bash
systemctl restart php-fpm
systemctl restart apache2  # ou nginx
```







```bash
du -sh /* 2>/dev/null | sort -h

# Retourne
0	/bin
0	/dev
0	/initrd.img
0	/initrd.img.old
0	/lib
0	/lib32
0	/lib64
0	/libx32
0	/proc
0	/sbin
0	/sys
0	/vmlinuz
0	/vmlinuz.old
4.0K	/mnt
4.0K	/opt
4.0K	/root
4.0K	/srv
8.0K	/media
16K	/lost+found
24K	/tmp
464K	/run
5.8M	/etc
86M	/boot
436M	/home
2.2G	/usr
4.3G	/var
```

Le dossier /var est le plus gros (4.3G), suivi de /usr (2.2G). Comme le disque total fait 7.4G, cela explique pourquoi tu es à 100%.

### ✅ 1. Nettoyer /var (4.3G)

Le dossier /var contient généralement :


- Logs (/var/log)
- Cache des paquets (/var/cache)
- Fichiers temporaires (/var/tmp)
- Base de données (si utilisée, /var/lib)

🔥 Vider les logs
```bash
rm -rf /var/log/*.log
rm -rf /var/log/journal/*
journalctl --vacuum-time=3d  # Garde seulement 3 jours de logs
systemctl restart rsyslog
```

🗑 Nettoyer le cache des paquets
```bash
apt-get autoremove -y
apt-get clean
rm -rf /var/cache/apt/*
```

🚨 Vérifier les bases de données

Si tu utilises MySQL/MariaDB/PostgreSQL, leur stockage est souvent dans /var/lib.

Vérifie avec :

```bash
du -sh /var/lib/*
```

Si c’est MySQL, purge les logs binaires inutiles :

```bash
mysql -u root -p -e "PURGE BINARY LOGS BEFORE NOW()"
```

✅ 2. Nettoyer /usr (2.2G)

Vérifie les gros fichiers dans /usr :

```bash
du -sh /usr/* | sort -h
```

Ensuite, supprime les paquets inutiles :

```bash
apt-get autoremove -y
apt-get clean
```

✅ 3. Vérifier si /var/tmp ou /tmp contient des fichiers lourds
```bash
du -sh /var/tmp/*
du -sh /tmp/*
rm -rf /var/tmp/*
rm -rf /tmp/*
```

✅ 4. Vérifier l’utilisation des inodes (si encore plein après nettoyage)
```bash
df -i
```

Si 100% des inodes sont utilisés, supprime les petits fichiers en masse :

```bash
find /var -type f -print0 | xargs -0 rm -f
```

🔄 5. Redémarrer et Vérifier

Une fois tout nettoyé :

```bash
reboot
```

Puis après redémarrage :

```bash
df -h
```

et

```bash
du -sh /var /usr
```







### Erreur sudo: unable to resolve host server-vps-jonas-1: Name or service not known

```bash
sudo rm -rf /var/log/*.log
sudo: unable to resolve host server-vps-jonas-1: Name or service not known
```

L'erreur sudo: unable to resolve host server-vps-jonas-1: Name or service not known signifie que le système ne peut pas résoudre le nom d'hôte (server-vps-jonas-1). Cela peut être dû à un problème dans le fichier /etc/hosts.

🔍 1. Vérifier et Corriger /etc/hosts

Ouvre le fichier /etc/hosts avec un éditeur :

```bash
sudo nano /etc/hosts
```

Vérifie s'il contient bien une ligne associant 127.0.1.1 à ton nom d'hôte (server-vps-jonas-1). Si elle est absente ou incorrecte, ajoute ou corrige :


```pgsql
127.0.0.1   localhost
127.0.1.1   server-vps-jonas-1
```

Sauvegarde avec CTRL + X, Y, puis Enter.

Vérifie ensuite si le problème est réglé :


```bash
hostname
hostname -f
```

Si nécessaire, applique le changement immédiatement :

```bash
sudo systemctl restart systemd-logind
sudo hostnamectl set-hostname server-vps-jonas-1
```

✅ 2. Réessayer la suppression des logs

Après avoir corrigé /etc/hosts, exécute à nouveau :

```bash
sudo rm -rf /var/log/*.log
sudo journalctl --vacuum-time=3d
```

Vérifie ensuite l’espace disque libéré :

```bash
df -h
```





