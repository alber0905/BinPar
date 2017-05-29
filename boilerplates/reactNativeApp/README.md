# React Native boilerplate

## Pre-requisitos

 - NodeJS (v4.X.X)
 - Watchman: ```brew install watchman```
 - React Native CLI: ```npm install -g react-native-cli```
 - Xcode (Bajar de la App Store)
 
## Creación de un nuevo proyecto RN (React Native)
Con los pre-requisitos cumplidos deberíamos poder ejecutar lo siguiente y crear nuestro primer proyecto RN.

**Nota**: El proyecto se creará en la ruta de la terminal en la que nos encontremos.
```bash
react-native init AwesomeProject
cd AwesomeProject
```

## Iniciar el boilerplate
Lo primero que haremos será clonar el repositorio donde se encuentra el boilerplate (recordad situaros en vuestra carpeta de proyectos, para este ejemplo la carpeta estará en la ruta ~/Proyectos/):
```bash
git clone https://github.com/BinPar/react-native-boilerplate.git
```
Ahora tendremos una carpeta llamada react-native-boilerplate (en la ruta ~/Proyectos/react-native-boilerplate) que dentro tendrá una carpeta **main** (~/Proyectos/react-native-boilerplate/main) que será la que nos interesa por el momento.

Si antes no creaste un nuevo proyecto hazlo ahora:
```bash
react-native init AwesomeProject
```

Vamos a copiar esa carpeta a nuestro nuevo proyecto (~/Proyectos/AwesomeProject/):
```bash
cp -R ~/Proyectos/react-native-boilerplate/main ~/Proyectos/AwesomeProject/
cd ~/Proyectos/AwesomeProject
```

Ahora vamos a instalar algunos módulos de RN necesarios y algún otro npm que sea requerido:
```bash
npm install --save @expo/ex-navigation babel-preset-react-native-stage-0 react-native-blur react-native-i18n react-native-vector-icons
```

Ahora cambiaremos el nombre de nuestra clase del "index.js" de la carpeta "main" para que coincida con nuestro nombre de proyecto:
 
ANTES:
![index.js](https://github.com/BinPar/BinPar/blob/master/resources/indexRNBefore.png)

DESPUÉS:
![index.js](https://github.com/BinPar/BinPar/blob/master/resources/indexRNAfter.png)

Porteriormente editamos tanto el archivo "index.ios.js" como el "index.android.js" de la raíz sustituyendo su contenido por lo siguiente (recordad que AwesomeProject es nuestro nombre de proyecto):

```javascript
import { AppRegistry } from 'react-native';
import AwesomeProject from './main/index';

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```
**Nota**: Es imprescindible que donde pone "AwesomeProject" ponga el nombre de vuestro proyecto

Por último editamos el .babelrc de la raíz para que quede así:

```json
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
 