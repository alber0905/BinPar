## Crear los certificados

 1. Ir a [https://developer.apple.com/account/ios/identifier/bundle](https://developer.apple.com/account/ios/identifier/bundle)
 2. Si ya tenemos un app ID (si no lo tenemos lo creamos) creado pinchamos en él y le damos a Edit:
 ![certsList](https://github.com/BinPar/BinPar/blob/master/resources/certsList.png)
 3. Vamos a donde pone Push Notifications:
 ![editCert](https://github.com/BinPar/BinPar/blob/master/resources/editCert.png)
 4. Ahí crearemos dos certificados:
   - Entorno de desarrollo:
   ![devCert](https://github.com/BinPar/BinPar/blob/master/resources/devCert.png)
   - Entorno de producción:
   ![prodCert](https://github.com/BinPar/BinPar/blob/master/resources/prodCert.png)
 5. Seguimos los pasos que nos indican y al final tendremos dos certificados (aps.cer y aps_development.cer). A continuación veremos cómo transformarlos en .pem para usarlos en el servidor para enviar Push Notifications.

## Obtener los ".pem" para poder enviar las push desde el server

Con nuestros ".cer" ya creados los importamos al Llavero del Mac con doble click.

Deberían aparecer ahora en la zona de "Certificados" del Llavero con un nombre similar a `Apple Push Services`.
![clavePrivada](https://github.com/BinPar/BinPar/blob/master/resources/clavePrivada.png)
![clavePrivadaDev](https://github.com/BinPar/BinPar/blob/master/resources/clavePrivadaDev.png)
Con click derecho sobre la clave privada le damos a la opción de Exportar y la exportamos como .p12

Ahora, teniendo en un directorio el archivo del certificado original (aps.cer) y la clave privada (key.p12) ejecutamos lo siguiente en la terminal:

```
openssl x509 -in aps.cer -inform DER -outform PEM -out cert.pem
openssl pkcs12 -in key.p12 -out key.pem -nodes
```

Para probar el certificado de producción:
```
openssl s_client -connect gateway.push.apple.com:2195 -cert cert.pem -key key.pem
```
