# Comment installer unity sur ubuntu 22.04 ?

## Il faut installer libssl1.1 d'abord

### Téléchargement manuel d’un paquet Debian

1) - Va sur un dépôt « archive » d’Ubuntu (anciennement Ubuntu 20.04 / 18.04) et repère la version de libssl1.1 qui correspond à ton architecture (ex : amd64). Exemples :
```bash
http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```

2) - Télécharge-le :
```bash
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```

3) - Installe-le manuellement :
```bash
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```

4) - Si des dépendances sont cassées :
```bash
sudo apt --fix-broken install
```

5) - Vérifie que tout fonctionne.

Risques : Installer des bibliothèques critiques (comme SSL) depuis des versions antérieures peut introduire des problèmes de sécurité ou de compatibilité.
```bash
dpkg -l | grep libssl1.1
```

6) - Tu peux maintenant lancer Unity Hub ou tout autre logiciel qui dépend de cette librairie.

## Installer Unity

1) - Ajouter la clé publique de signature pour le dépôt Unity :
```bash
wget -qO - https://hub.unity3d.com/linux/keys/public | gpg --dearmor | sudo tee /usr/share/keyrings/Unity_Technologies_ApS.gpg > /dev/null
```

Cette clé permet de vérifier que les paquets viennent bien de Unity.

2) - Ajouter le dépôt officiel Unity Hub :
```bash
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/Unity_Technologies_ApS.gpg] https://hub.unity3d.com/linux/repos/deb stable main" > /etc/apt/sources.list.d/unityhub.list'
```

Cela permet à apt de trouver le paquet unityhub.

3) - Mettre à jour le cache et installer Unity Hub :
```bash
sudo apt update
sudo apt install unityhub
```

4) - Lancer Unity Hub depuis le menu ou via :
```bash
unityhub
```

Puis connecte-toi avec ton compte Unity et installe une version de l’éditeur Unity via Hub.