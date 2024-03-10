# Changer de pour une connexion ssh

[Modifier le port SSH IONOS](https://www.ionos.fr/assistance/serveurs-et-cloud/premiers-pas/informations-importantes-sur-la-securite-de-votre-serveur/modifier-le-port-ssh/)

## Instructions pas-à-pas

Voici comment changer le port SSH :

1. Connectez-vous au serveur en tant qu'administrateur.

2. Ouvrez le fichier de configuration SSH sshd_config avec l'éditeur de texte vi :
```sh
sudo nano /etc/ssh/sshd_config
```

3. Recherchez l'entrée Port 22.

4. Remplacez le port 22 par un port entre 1024 et 65536.

---
### Attention

Veuillez noter

Assurez-vous que le port sélectionné n'est pas utilisé pour d'autres services. Vous pouvez le faire en utilisant la liste de ports suivante fournie par l'Internet Assigned Numbers Authority (IANA) :

https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml

Vous pouvez également afficher la liste des ports dans le fichier /etc/services.

---

5. Sauvegardez le fichier.

6. Redémarrez le service :

#### Ubuntu
```sh
service ssh restart
```

#### CentOS 7
```sh
systemctl restart sshd
```

Pour établir une connexion SSH après ce changement, entrez la commande suivante :
```sh
ssh root@IP-Adresse_du_Serveur -p NouveauPort
```

7. Si vous êtes sur Ionos, aller dans le chemin `Serveurs & Cloud > Réseau > Stratégies de pare-feu`

8. Cliquez sur votre pare-feu et ajoutez votre nouveau port