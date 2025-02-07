# Cómo convertir un vídeo a GIF usando ffmpeg

### Nunca más te vuelvas loco buscando cómo hacer un GIF de tu video favorito:
![balbalablalaablalbalb](https://github.com/BinPar/BinPar/blob/master/resources/balbalablalaablalbalb.gif)

## 1º - Creamos la paleta de colores

```
ffmpeg -y -ss 10 -t 3 -i <input_video> -vf fps=10,scale=372:-1:flags=lanczos,palettegen paleta.png
```

## 2º - Generar el GIF

```
ffmpeg -ss 10 -t 3 -i <input_video> -i <input_paleta> -filter_complex "fps=10,scale=372:-1:flags=lanczos[x];[x][1:v]paletteuse" output.gif
```

### Veamos algunos puntos claves de estos comandos
- **-ss ->** Nos indica el tiempo en segundos que queremos obviar.
- **-t ->** Nos indica la duración del output en segundos.
- **fps= ->** Los frames por segundo que queremos en nuestro GIF. Aumentar esto aumentará el tamaño del output considerablemente.
- **scale= ->** La escala (width x height) del output (del GIF, no de la paleta). Se indica con width:height e indicándole el valor -1 en cualquiera de los parámetros hará que se ajuste esa medida para mantener el aspect ratio.
