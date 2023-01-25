# Redimenssionné la partion Ubuntu en dual boot avec Windows

1. Prendre une clé USB(live), c-a-d qui continet une [image ISO de Ubuntu](https://www.ubuntu-fr.org/download/)
2. Puis (1 choix à faire parmi 2):
    - Soit depuis Windows, on utilise [Rufus](https://rufus.ie/fr/) pour démarrer la clé USB(live) déjà branché au PC.
    - Soit, on redémarre directement le PC avec la clé USB(live) déjà branché au PC.
3. Lorsque le PC est redémarrer, choisir **Try Ubuntu**.
4. Puis installer Gparted.
```ps
sudo apt install gparted
```
5. Lancer Gparted.
```ps
gparted
```
6. Dans Gparted, on peut redimmensionner les partions.
7. Puis toujours dans Gparted, valider les opérations pour qu'elles s'excécute.
8. Lorsque les opérations sont terminée, éteindre le PC.
9. Enlever la clé USB(live).
10. Démarrer le PC et vérifier que tout est bon.