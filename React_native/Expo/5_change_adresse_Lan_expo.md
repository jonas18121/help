# Modifier la valeur par défaut adresse IP du LAN de Expo sur windows

par exemple on veut changer cette adresse ip `exp://192.168.56.1:19000` en cette nouvelle adresse ip `exp://174.112.40.1:19000`.

- On va dans les variables d'environnement, s'il n'exite pas encore creer une variable d'environnement nommé `REACT_NATIVE_PACKAGER_HOSTNAME` et donnez lui comme valeur la nouvelle adresse ip `174.112.40.1`

- si `REACT_NATIVE_PACKAGER_HOSTNAME` existe déjà dans vos variables d'environnement lui donner comme valeur la nouvelle adresse ip `174.112.40.1`

- Puis ouvrez un powerShell en mode administrateur et executez cette commande avec la nouvelle adresse ip

    > set REACT_NATIVE_PACKAGER_HOSTNAME=174.112.40.1

- et enfin redémarrez votre ordinateur sans connexion à internet, vous remettrez la connexion à internet après le redémarrage

- en faisant expo start , vous verrez que la nouvelle adresse ip est `exp://174.112.40.1:19000`

Bravo !!!