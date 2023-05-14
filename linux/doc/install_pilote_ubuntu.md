Pour Ubuntu 18.04, le pilote approprié pour la clé USB TP-Link AC1300 est le pilote "rtl8812au". Ce pilote open-source a été inclus dans le noyau Linux à partir de la version 4.11, qui est la version du noyau Linux utilisée par Ubuntu 18.04.

Si votre système n'a pas installé automatiquement le pilote rtl8812au, vous pouvez installer les pilotes en suivant les étapes ci-dessous :

Ouvrez un terminal en appuyant sur "Ctrl + Alt + T".

Tapez la commande suivante pour mettre à jour la liste des paquets :

sql
Copy code
sudo apt-get update
Tapez la commande suivante pour installer le paquet dkms qui est nécessaire pour compiler le pilote à partir des sources :

arduino
Copy code
sudo apt-get install dkms
Tapez la commande suivante pour télécharger les sources du pilote rtl8812au :

bash
Copy code
git clone https://github.com/gordboy/rtl8812au-5.6.4.2.git
Tapez la commande suivante pour installer le pilote à partir des sources :

bash
Copy code
sudo ./dkms-install.sh
Une fois l'installation terminée, redémarrez votre ordinateur pour que les modifications prennent effet.

Après le redémarrage, la clé USB TP-Link AC1300 devrait être détectée automatiquement par Ubuntu 18.04 et vous devriez être en mesure de vous connecter à votre réseau sans fil préféré.



--------------------------------------------------------------


Le pilote WiFi nécessaire dépend du modèle de votre carte WiFi. Pour déterminer le modèle de votre carte WiFi, vous pouvez utiliser la commande suivante dans le terminal :

perl
Copy code
lspci -nnk | grep 0280 -A3
Cette commande affichera les informations sur votre carte WiFi, y compris le nom du fabricant et le modèle de la carte. Vous pouvez ensuite rechercher le pilote correspondant sur le site Web du fabricant et suivre les instructions d'installation.

Si vous ne parvenez pas à identifier votre carte WiFi, vous pouvez également utiliser la commande suivante pour afficher la liste des périphériques réseau de votre système :

mathematica
Copy code
lshw -C network
Cette commande affichera une liste de tous les périphériques réseau de votre système, y compris les cartes WiFi et les cartes Ethernet. Vous pouvez ensuite identifier votre carte WiFi à partir de cette liste et rechercher le pilote correspondant sur le site Web du fabricant.


--------------------------------------------

Si vous avez réussi à installer le pilote "bcmwl-kernel-source" avec succès, vous pouvez maintenant redémarrer votre système pour que les modifications prennent effet.

Après le redémarrage, vous devriez être en mesure d'utiliser votre carte réseau sans fil Broadcom avec le nouveau pilote "wl". Si vous rencontrez toujours des problèmes avec votre carte réseau sans fil, vous pouvez essayer de désactiver le pilote "rtw_pci" en utilisant la commande suivante dans le terminal :

Copy code

sudo modprobe -r rtwpci

Cela désactivera le pilote "rtw_pci" et devrait permettre à votre système d'utiliser le nouveau pilote "wl" pour votre carte réseau sans fil Broadcom.

Si vous souhaitez réactiver le pilote "rtw_pci" à l'avenir, vous pouvez utiliser la commande suivante dans le terminal :

Copy code

sudo modprobe rtwpci

Cela réactivera le pilote "rtw_pci" et désactivera le pilote "wl".


-------------------------------------------

Le AC1300 mini wireless MU-MIMO USB Adapter utilise un chipset Realtek RTL8812BU. Vous pouvez essayer les étapes suivantes pour installer le pilote correspondant sous Linux :

Ouvrez un terminal et installez les paquets nécessaires pour la compilation des modules de noyau :

sql
Copy code
sudo apt-get update
sudo apt-get install build-essential dkms git
Téléchargez le pilote à partir du dépôt GitHub :

bash
Copy code
git clone https://github.com/cilynx/rtl88x2bu.git
Changez le répertoire de travail vers le répertoire du pilote :

bash
Copy code
cd rtl88x2bu
Compilez le pilote en exécutant la commande suivante :

go
Copy code
sudo make
Installez le pilote en exécutant la commande suivante :

go
Copy code
sudo make install
Chargez le module de pilote nouvellement compilé en exécutant la commande suivante :


sudo modprobe 88x2bu

Cela devrait installer et charger le pilote pour votre adaptateur WiFi AC1300 mini wireless MU-MIMO USB Adapter sous Linux.