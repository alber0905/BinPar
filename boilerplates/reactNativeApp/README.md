# React Native boilerplate

## Pre-requisitos

 - NodeJS (v4.X.X)
 - Watchman: ```brew install watchman```
 - React Native CLI: ```npm install -g react-native-cli```
 - Xcode (Bajar de la App Store)
 
## Creación de un nuevo proyecto RN (React Native)
Con los pre-requisitos cumplidos deberíamos poder ejecutar lo siguiente y obtener nuestro primer proyecto RN.
```bash
react-native init AwesomeProject
cd AwesomeProject
react-native run-ios
```

## Iniciar el boilerplate
Para iniciar el boilerplate nos crearemos un nuevo proyecto de React Native con el nombre deseado (reordad que se crea en la ruta en la que me encuentro):
```bash
react-native init AwesomeProject
```
Posteriormente entraremos en el directorio del proyecto:
```bash
cd AwesomeProject
```
Ahora cogeremos la carpeta "main" de nuestro boilerplate y la pondremos en el raíz de nuestro nuevo proyecto obteniendo algo parecido a esto:
![awesomeProjectIni](https://github.com/BinPar/BinPar/blob/master/resources/awesomeProjectIni.png)

Modificar el archivo package.json para que quede similar a esto (puedes copiar lo necesario del package.json del boilerplate):

ANTES:
![package.json](https://github.com/BinPar/BinPar/blob/master/resources/packageJSONRNBefore.png)

DESPUÉS:
![package.json](https://github.com/BinPar/BinPar/blob/master/resources/packageJSONRNAfter.png)

A continuación ejecutaremos:
```bash
npm install
```

Ahora cambiaremos el nombre de nuestra clase del "index.js" de la carpeta "main" para que coincida con nuestro nombre de proyecto:
 
ANTES:
![index.js](https://github.com/BinPar/BinPar/blob/master/resources/indexRNBefore.png)

DESPUÉS:
![index.js](https://github.com/BinPar/BinPar/blob/master/resources/indexRNAfter.png)

Porteriormente editamos tanto el archivo "index.ios.js" como el "index.android.js" de la raíz para que se parezca a esto:

```javascript
import { AppRegistry } from 'react-native';
import AwesomeProject from './main/index';

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```
**Nota**: Es imprescindible que donde pone "AwesomeProject" ponga el nombre de vuestro proyecto

Por último editamos el .babelrc de la raíz para que quede así:

```
{
  "presets": ["react-native", "react-native-stage-0/decorator-support"]
}
```

Ejecutamos estos comandos:
```bash
npm install
react-native link
```

Y si hemos hecho todos los pasos bien deberíamos poder iniciar el proyecto con:
```bash
react-native run-ios
```

## Shortcuts en el simulador de iOS
 - Con Cmd + D abrimos el menú de debug de React Native, muy útil. Aquí se puede activar o desactivar el hot reload, etc.
 - Con Cmd + R reiniciamos la app en el simulador.
 - Cmd + Shift + H es equivalente a pulsar el botón físico de Home
 - Manteniendo Alt pulsado podemos hacer pinch en el simulador y otras cosas como si tuviéramos dos dedos en la pantalla.
 