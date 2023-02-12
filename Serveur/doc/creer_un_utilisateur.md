# Créer un utilisateur dans un serveur web

## Créer un utilisateur et un groupe en même temps

[useradd](https://debian-facile.org/doc:systeme:useradd)

1. On crée un user2 depuis le super utilisateur root
```ps
sudo adduser user22222
```
**Retour** avec un nouveau mot de passe a créer pour le new user 
```ps
Adding user `user22222' ...
Adding new group `user22222' (1000) ...
Adding new user `user22222' (1000) with group `user22222' ...
Creating home directory `/home/user22222' ...
Copying files from `/etc/skel' ...
New password: 
Retype new password: 
passwd: password updated successfully
Changing the user information for user22222
Enter the new value, or press ENTER for the default
	Full Name []: 
	Room Number []: 
	Work Phone []: 
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] y
```

2. 1. Voir le new user 
```ps
id user22222
```
**Retour**
```ps
uid=1000(user22222) gid=1000(user22222) groups=1000(user22222)
```
2. 2. On peut aller voir avec cette commande si on trouve le new user2
```ps
cat /ect/passwd
```

3. Puis, on peut se connecter au seveur distant avec le new user2
 ```ps
ssh user22222@172.17.0.7
```

ça fonctionne !!!

4. On peut aussi se connecter au user 2 depuis le user 1 (et inversement) avec (facultative)
 ```ps
su - user22222
```

5. Ajouter un utilisateur au groupe sudo ou admin, 

Par exemple si l'user n'a pas le droit d'utiliser `sudo`, 
on le met dans le groupe sudo pour qu'il puisse utiliser `sudo`
```ps
adduser name_user sudo

adduser name_user admin
```

**option : on peut supprime un user d'un groupe**
- [Commande deluser](https://manpages.ubuntu.com/manpages/xenial/fr/man8/deluser.8.html)
```ps
deluser name_user name_group
```