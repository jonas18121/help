# [Résolu] Problème second écran, dual boot Windows 10 / Ubuntu 18.04 , driver Nvidia

Lien : https://forum.ubuntu-fr.org/viewtopic.php?pid=22265826#p22265826



- Dans `logiciels et mises à jour` -> `logiciels Ubuntu` -> `Télécharger depuis` mettre l'option `Serveurs pour la France`, 

- Puis dans `Pilotes additionnels`, cochez la case `Utilisation de NVIDIA driver metapackage depuis nvidia-driver-440(propriétaire et testé)` ou `Utilisation de NVIDIA driver metapackage depuis nvidia-driver-510(propriétaire et testé)`

En tous cas utilisez le driver qui contient `(propriétaire et testé)`

---------------------------------------------------------------------------------------

J'avais déjà essayé avec cette case cochée auparavant mais avec l'option "serveurs pour l'Allemagne". 

Le fait de remettre "serveur pour la France" puis de choisir l'option "Utilisation de X.Org X server - Nouveau display driver disponible depuis xserver-xorg--video-nouveau(libre)", 

puis de revenir sur l'option "Utilisation de NVIDIA driver metapackage depuis nvidia-driver-440(propriétaire et testé)". A résolu mon problème (ne me demandez pas comment).

# [Résolu] Problème second écran, dual boot Windows 10 / Ubuntu 22.04 , driver Nvidia (GeForce GTX 1650)

```bash
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 550.xx    Driver Version: 550.xx    CUDA Version: ...            |
| GPU  Name        Persistence-M| Bus-Id ...  |
| 0    GeForce GTX 1650 Ti ...                                   |
+-----------------------------------------------------------------------------+
```

## On suppose qu'on est sur un PC avec un GPU Intel (modesetting) actif et un GPU NVIDIA inactif

0. On vérifie sur quel GPU on est, et on va rester sur le GPU de intel

```bash
prime-select query

## Retourne on-demand = GPU intel
on-demand 

## Retourne nvidia = GPU 
nvidia
```

pour ce placer sur le GPU intel, il faut faire la commende suivante
```bash
sudo prime-select on-demand
```

1. Si faire la commande suivante ne retourne rien, ça veut dire que le pilote NVIDIA n’est pas actif.

```bash
lsmod | grep nvidia
```

2. Faire la commande suivante retourne une erreur fatale, signifie que le pilote NVIDIA n’est pas compilé pour ton noyau actuel (6.8.0-85-generic).

Autrement dit : le pilote n’est pas installé (ou a été cassé après une mise à jour du noyau Ubuntu).

```bash
sudo modprobe nvidia

## Retourne

modprobe: FATAL: Module nvidia not found in directory /lib/modules/6.8.0-85-generic
```

### Solution — Réinstaller le pilote NVIDIA pour ton noyau actuel

3. Vérifie la version de ton noyau :

```bash
uname -r
```

(elle doit bien être 6.8.0-85-generic, juste pour confirmation)

4. Installe le pilote recommandé

On va forcer la réinstallation propre et compiler les modules pour ton noyau actuel :

```bash
sudo apt update
sudo apt install --reinstall nvidia-driver-550 nvidia-dkms-550
```

Cela va :

- recompiler le module `nvidia.ko` pour ton noyau `6.8.0-85`,
- installer les dépendances (`nvidia-drm`, `nvidia-modeset`, etc.),
- et préparer tout pour que `modprobe nvidia` fonctionne ensuite.

5. Une fois l’installation terminée :, on redémarre

```bash
sudo reboot
```

6. Après redémarrage, vérifie :

```bash
nvidia-smi
xrandr --listproviders
```

Si tout s’est bien passé, tu devrais voir :

```bash
Provider 0: modesetting
Provider 1: NVIDIA-G0

## ou quelque chose qui ressemble a ci-dessous

Providers: number : 2
Provider 0: id: 0x44 cap: 0x9, Source Output, Sink Offload crtcs: 3 outputs: 3 associated providers: 1 name:modesetting
Provider 1: id: 0x1f3 cap: 0x2, Sink Output crtcs: 4 outputs: 3 associated providers: 1 name:NVIDIA-G0
```

et nvidia-smi te montrera ta GeForce GTX 1650 Ti.