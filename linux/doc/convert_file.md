# Convertir des fichiers

**FFmpeg** est exclusivement conçu pour traiter les fichiers multimédias (vidéo, audio, images et sous-titres).

### Ce que FFmpeg PEUT convertir

**FFmpeg** prend en charge une liste immense de formats multimédias (plus de 400 codecs et conteneurs). Vous pouvez convertir :

- **Des vidéos :** MP4, MKV, AVI, MOV, WebM, FLV, WMV, etc.De l'audio : MP3, WAV, AAC, FLAC, OGG, M4A, etc.
- **Des images :** Extraire des images d'une vidéo en JPG ou PNG, ou créer un GIF animé à partir d'une vidéo.
- **Des sous-titres :** Convertir ou intégrer des fichiers SRT, ASS, VTT.

### Ce que FFmpeg NE PEUT PAS convertir

**FFmpeg** est totalement impuissant face aux fichiers qui ne contiennent pas de flux audio, vidéo ou image. Il ne peut pas convertir :

- **Des documents texte ou bureaux :** Impossible de convertir un PDF en Word (.docx), ou un fichier Excel.
- **Des fichiers compressés :** Il ne gère pas les archives comme les fichiers .zip ou .rar.
- **Du code ou des exécutables :** Impossible de convertir un fichier .exe, .dmg ou un script de programmation.
- **Des fichiers protégés (DRM) :** FFmpeg ne peut pas convertir les fichiers audio ou vidéo verrouillés par des protections contre la copie (comme certains fichiers téléchargés sur des plateformes de streaming protégées).

## Exemple d'utilisation

1) Installer ffmpeg

```ps
sudo apt-get install ffmpeg
```

2) Nous pouvons voir quels formats sont acceptables en tapant :

```ps
ffmpeg -formats 
```

Ou

```ps
 ffmpeg -codecs
 ```

 3) Accédez au répertoire contenant vos fichiers audio à l'aide de la cdcommande. Si vous avez besoin d'aide pour trouver le répertoire, utilisez la lscommande.

```ps
$ ls
backup.log         Desktop    examples.desktop  Music     snap
branches-tutorial  Documents  flick             Pictures  Templates
SumDocument        Downloads  mozilla.pdf       Public    Videos
```

4) Supposons que mes fichiers se trouvent dans le Desktopdossier. Je taperais alors :

```ps
cd Desktop
```

5) On peut avec la commande ci-dessous, l'exemple avec le fichier `show.m4a` converti en mp3 avec le nom `newFileName.mp3`:

```ps
ffmpeg -i show.m4a newFileName.mp3
```

## autre exemples pratiques de conversion

### Convertir une vidéo en un autre format (par exemple, AVI en MP4) :
```ps
ffmpeg -i video.avi video.mp4
```

### Changer rapidement de conteneur sans ré-encoder (très rapide car il copie les flux à l'identique) :
```ps
ffmpeg -i video.mkv -c copy video.mp4
```

### Extraire l'audio d'une vidéo en MP3 :
```ps
ffmpeg -i video.mp4 -vn audio.mp3
```

### Compresser une vidéo en modifiant la qualité (le paramètre -crf contrôle la qualité, une valeur de 23 est un bon compromis) :
```ps
fmpeg -i video.mp4 -crf 23 video_compressee.mp4
```

## Source

- https://www.howtoforge.com/tutorial/ffmpeg-audio-conversion/
- [FFmpeg - convertir des fichiers média](https://www.youtube.com/watch?v=gIZzxPgilCA&t=15s)