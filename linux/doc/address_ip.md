# Choisir une adresse IP spécifique sur Ubuntu 18.04.


il existe plusieurs logiciels qui permettent de choisir une adresse IP spécifique sur Ubuntu 18.04. 

Voici deux options populaires :

1. NetworkManager : C'est l'outil de gestion réseau intégré à Ubuntu. Vous pouvez l'utiliser pour configurer une adresse IP statique sur votre interface réseau. Voici comment procéder :

    - Cliquez sur l'icône réseau dans la barre des tâches, puis sélectionnez "Edit Connections" (Modifier les connexions).
    - Sélectionnez votre connexion réseau active dans l'onglet "Wired" (Filaire) ou "Wi-Fi" selon votre type de connexion.
    - Cliquez sur le bouton "Edit" (Modifier), puis allez dans l'onglet "IPv4 Settings" (Paramètres IPv4).
    - Dans la section "Method" (Méthode), choisissez "Manual" (Manuel) dans le menu déroulant.
    - Cliquez sur le bouton "Add" (Ajouter) pour spécifier votre adresse IP, le masque de sous-réseau, la passerelle par défaut, et les serveurs DNS.
    - Une fois que vous avez configuré les paramètres souhaités, cliquez sur "Save" (Enregistrer) pour appliquer les modifications.

2. Netplan : Netplan est un outil de configuration réseau utilisé par défaut dans Ubuntu 18.04. Il utilise des fichiers de configuration YAML pour définir les paramètres réseau. 

    Voici comment utiliser Netplan pour configurer une adresse IP statique :

    - Ouvrez un éditeur de texte et créez un nouveau fichier YAML dans le répertoire "/etc/netplan/" avec une extension ".yaml", par exemple "01-static-ip.yaml".
    - Ajoutez les informations suivantes dans le fichier YAML pour configurer votre adresse IP statique :
```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0: (ou le nom de votre interface réseau)
      addresses:
        - 192.168.1.100/24 (remplacez par votre adresse IP et masque de sous-réseau)
      gateway4: 192.168.1.1 (remplacez par votre passerelle par défaut)
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4] (remplacez par vos serveurs DNS)
```
    - Enregistrez le fichier YAML, puis exécutez la commande suivante pour appliquer la configuration :

```sh
sudo netplan apply
```

Ces méthodes vous permettront de configurer manuellement une adresse IP statique sur Ubuntu 18.04. Assurez-vous de sauvegarder vos paramètres réseau d'origine au cas où vous souhaiteriez les restaurer ultérieurement.

----------------

### Exemple

Voici un exemple de configuration avec NetworkManager pour définir une adresse IP statique, un masque de sous-réseau, une passerelle par défaut et des serveurs DNS sur Ubuntu 18.04 :

1. Cliquez sur l'icône réseau dans la barre des tâches, puis sélectionnez "Edit Connections" (Modifier les connexions).

2. Dans la fenêtre qui s'ouvre, sélectionnez votre connexion réseau active (par exemple, "Wired Connection 1" pour une connexion filaire).

3. Cliquez sur le bouton "Edit" (Modifier) pour ouvrir la configuration de la connexion.

4. Allez dans l'onglet "IPv4 Settings" (Paramètres IPv4).

5. Dans la section "Method" (Méthode), choisissez "Manual" (Manuel) dans le menu déroulant.

6. Cliquez sur le bouton "Add" (Ajouter) pour ajouter une nouvelle adresse IP.

7. Dans la section "Address" (Adresse), saisissez l'adresse IP que vous souhaitez utiliser, suivie du masque de sous-réseau. Par exemple, "192.168.1.100/24".

8. Dans la section "Gateway" (Passerelle), saisissez l'adresse IP de la passerelle par défaut.

9. Dans la section "DNS Servers" (Serveurs DNS), saisissez les adresses IP des serveurs DNS que vous souhaitez utiliser, séparées par des virgules. Par exemple, "8.8.8.8, 8.8.4.4" pour utiliser les serveurs DNS de Google.

10. Cliquez sur "Save" (Enregistrer) pour appliquer les modifications.

Une fois que vous avez enregistré la configuration, votre connexion réseau utilisera l'adresse IP statique, le masque de sous-réseau, la passerelle par défaut et les serveurs DNS que vous avez spécifiés.

Assurez-vous de vérifier les paramètres de votre réseau et de les adapter en fonction de votre propre configuration réseau.