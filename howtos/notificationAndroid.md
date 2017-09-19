# Configurar Google Cloud Messaging para Android

## Crear proyecto en la Consola de Desarrolladores

 1. Ir a https://console.developers.google.com/projectselector/apis/api?organizationId=409896854918
 2. En el cuadro que sale le daremos a Crear y seguimos los pasos.

Con esto tenemos ya el proyecto creado para nuestra aplicación.

## Crear la configuración para las notificaciones

 1. Ir a https://developers.google.com/mobile/add?platform=android&cntapi=signin&cnturl=https:%2F%2Fdevelopers.google.com%2Fidentity%2Fsign-in%2Fandroid%2Fsign-in%3Fconfigured%3Dtrue&cntlbl=Continue%20Adding%20Sign-In
 2. Seleccionamos el nombre del proyecto.
 3. En "Android package name" ponemos el nombre del paquete con el que compilamos la app (i.e.: com.binpar.familiafacil).
 4. Avanzamos a la siguiente pantalla y seleccionamos la opción de Cloud Messaging.
 5. Al avanzar nos dará un `API key` y un `Sender ID` que será los que tenemos que usar para configurar nuestros proyectos.

## Configuración servidor push
A día de hoy estamos usando un npm que se llama [push-notification](https://www.npmjs.com/package/push-notification).
La configuración de la parte de Android sería la correspondiente a `gcm: ` y quedaría así:
```js
    ...
    gcm: {
        apiKey: 'API key obtenido arriba'
    }
    ...
```

## Configuración Push Notifications en React Native
Haciendo uso de la librería de push [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) sólo tendremos que especificar el Sender ID obtenido arriba en el lugar donde nos lo pide al hacer el configure de la librería.

Un ejemplo:
```js
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    this._registerToken = token.token;
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    console.log(notification);
    if (notification.foreground) {
      // código cuando pulsamos una notificación con la app en primer plano
    }
    else {
      // código cuando pulsamos una notificación con la app en segundo plano o cerrada
    }
  },

  // ANDROID ONLY: (optional) GCM Sender ID.
  senderID: 'Sender ID obtenido arriba',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
    * IOS ONLY: (optional) default: true
    * - Specified if permissions will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true
});
```