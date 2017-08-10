# Cómo configurar en WebStorm el ESLint para JavaScript

## Pero antes, ¿qué es ESLint?
ESLint, para los que no estéis familiarizados con el término, es una utilidad que nos permite analizar
el código en busca de errores potenciales, tanto funcionales como de formato.

## Y... ¿para qué queremos esto?
Bien, nos va a servir para que todos escribamos el código de la misma manera y podamos tener unas
reglas fijas, no opinables, en las que basarnos. El programa nos dará errores y warnings en las
cosas que puedan suponer un problema funcional o que están mal formateadas permitiéndonos arreglarlas
en el momento gracias a las sugerencias que nos ofrece.

**¡WARNING!**
No está permitido hacer push a GitHub si existe algún error en el código del proyecto.

Esta nueva herramienta se empezará a usar en **proyectos nuevos**, es decir, que no se usará en proyectos
"finalizados" ni en los que están "en desarrollo".

## Vale pero... ¿Quién ha decidido qué es lo que está bien?
ESLint tiene por defecto algunas reglas básicas de código JavaScript, pero nuestra mayor fuente de
inspiración es **Airbnb** en concreto esto: https://github.com/airbnb/javascript

Los desarrolladores fullstack de Airbnb tienen a sus espaldas muchas horas de vuelo y han ido formando
unas reglas básicas de cómo escribir JavaScript que se parecen en gran medida a lo que en BinPar
consideramos un código limpio y además extiende en muchos aspectos nuestra visión.

Si queréis leer el por qué de las decisiones y los estilos que se aplican os recomiendo esto:  
https://github.com/airbnb/javascript/blob/master/README.md

Ahí explica todo lo que contempla y por qué tiene que ser así.

## Entendido. ¿Ahora qué?
Pues ahora, vamos a **configurar** lo necesario para que WebStorm se convierta en el chivato perfecto

**¡NOTA!** Es necesario Node v6.11 o superior.

### 1 - Instalar ESLint
Primero tenemos que instalar ESLint y la configuración de Airbnb. Nos situaremos en la raíz del proyecto
y ejecutaremos lo siguiente:
```bash
npm install --save-dev eslint eslint-config-airbnb
```
Después instalamos las dependencias para ES6:
```bash
npm install --save-dev eslint-plugin-jsx-a11y@^2.0.0 eslint-plugin-react eslint-plugin-import babel-eslint
```

A continuación tenemos que instalar las peerDependencies de ESLint que los usuarios de **Mac/Linux** podrán
hacer de la siguiente forma:
```bash
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```
Los usuarios de **Windows** tendrán que ejecutar lo siguiente:
```bash
npm info "eslint-config-airbnb@latest" peerDependencies
```
Y a continuación instalar con `sudo npm install --save-dev <nombre_dependencia>` cada una de las dependencias.

### 2 - Crear archivo de configuración
Con un editor de texto crearemos el siguiente archivo:
```
{
  "extends": "airbnb"
}
```
Guardaremos el archivo como **.eslintrc** en la raíz del proyecto al que queramos aplicar ESLint, a la misma altura del package.json.

### 3 - Configurar WebStorm
Vamos a las Preferencias (WebStorm => Preferences... ó CMD + ,).

**¡NOTA!** Si tenemos un proyecto abierto la activación de ESLint sólo se realizará para este proyecto
lo cual nos permite tener la nueva y guay validación en los proyectos nuevos y la validación
normal y aburrida en los antiguos. Si eres un temerario puedes cerrar todos los proyectos de WebStorm
y en la ventana que sale de WebStorm cuando no tienes ningún proyecto abierto darle a Configuración, 
esto aplicará la configuración para todos los proyectos por defecto.
 
Estando en la pantalla de preferencias buscamos en el buscador **eslint**:
![eslint config](https://github.com/BinPar/BinPar/blob/master/resources/eslint.png)
Activamos el check y aplicamos.

Además tenemos que situar la linea del viewport que nos indica el tamaño máximo de línea en 100
caracteres porque es lo que tiene configurador Airbnb, ponemos en el buscado **margin**:
![marginLineViewport](https://github.com/BinPar/BinPar/blob/master/resources/marginLineViewport.png)
Y aplicamos.

Después configuramos el indentado de la siguiente forma:
![indentConfig](https://github.com/BinPar/BinPar/blob/master/resources/indentConfig.png)
Si, son espacios, vamos a usar un indentado de 2 espacios que es lo que está usando todo el mundo en
el mundo del desarrollo de Google, npm, NodeJS, etc...

Y por último vamos a desactivar un warning de WebStorm para que no nos vuelva locos, buscamos por 
**unneeded comma**:
![unneededComma](https://github.com/BinPar/BinPar/blob/master/resources/unneededComma.png)
Y aplicamos y pinchamos OK.

Con esto deberíamos tener todo lo necesario para empezar a ver un nuevo mundo de errores y al final
de todo un mundo de código limpio y fácil de entender.