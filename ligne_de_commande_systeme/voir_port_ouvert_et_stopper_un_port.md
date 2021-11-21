# Voir quels sont les ports ouverts avec la commande netstat

1. Ouvrez l’invite de commande en mode administrateur. Pour cela, faire un clic droit sur le menu Démarrer puis choisir Invite de commande (admin).

2. Tapez la commande `netstat -abn`. 

    > netstat -abn

    - L’argument -a pour afficher toutes les connexions et tous les ports d’écoute. 
    
    - L’argument -b pour afficher l’exécutable utilisant le port d’écoute. 
    
    - L’argument -n pour afficher les adresses et le port au format numérique.


# Stopper un port

1. Tapez la commande `netstat  -ano  |  findstr + le_munero_du_port` 

    > netstat  -ano  |  findstr  < le_munero_du_port >

    exemple

    > netstat  -ano  |  findstr  8080

ça retournera des information sur ce port, la dernière information sera un nombre de 4 ou 5 chiffres environ

exemple de retour

    TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       9044
    TCP    [::]:8080              [::]:0                 LISTENING       9044

2. pour stopper le port 8080, on va Tapé la commande  `taskkill  /F  /PID  + le_numero_de_la_dernière_information_recu`

    > taskkill  /F  /PID  < le_numero_de_la_dernière_information_recu >

    exmple

    > taskkill  /F  /PID  9044

si ça c'est bien passé on aura un message de succès

exemple

Opération réussie : le processus avec PID 9044 a été terminé.


# LINUX

Le package net-toolspeut ne pas être installé sur votre système par défaut, vous devez donc l'installer manuellement.

Le forfait comprend également utilisties supplémentaires comme une arp, ifconfig, netstat, rarp, nameifet route.

    > sudo apt-get install net-tools

### Voir quels sont les ports ouverts avec la commande netstat

    > sudo netstat -ltnp | grep -w <nom_du_port>

    ou 

    > sudo netstat -an | grep ':80'

    ou 

    > sudo netstat -lpn | grep 80

        exemple 

        > netstat -ltnp | grep -w ':8080'
    
exemple de retour 

    tcp6       0      0 :::80                   :::*                    LISTEN      912/apache2 

### sotpper le port

    > sudo kill 912 
