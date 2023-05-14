Le AC1300 mini wireless MU-MIMO USB Adapter utilise un chipset Realtek RTL8812BU. Vous pouvez essayer les étapes suivantes pour installer le pilote correspondant sous Linux :

Ouvrez un terminal et installez les paquets nécessaires pour la compilation des modules de noyau :

```ps
sudo apt-get update
sudo apt-get install build-essential dkms git
```

Téléchargez le pilote à partir du dépôt GitHub :

```ps
git clone https://github.com/cilynx/rtl88x2bu.git
```
Changez le répertoire de travail vers le répertoire du pilote :

```ps
cd rtl88x2bu
```

Compilez le pilote en exécutant la commande suivante :

```ps
sudo make
```
Installez le pilote en exécutant la commande suivante :

```ps
sudo make install
```

Chargez le module de pilote nouvellement compilé en exécutant la commande suivante :

```ps
sudo modprobe 88x2bu
```

Cela devrait installer et charger le pilote pour votre adaptateur WiFi AC1300 mini wireless MU-MIMO USB Adapter sous Linux.