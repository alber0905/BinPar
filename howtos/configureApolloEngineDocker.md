# How to configure Apollo Engine (Docker)

1. Creamos en /opt una carpeta llamada `apollo-engine`:
  ```bash
  mkdir /opt/apollo-engine
  ```
2. Creamos dentro de la carpeta apollo-engine un archivo llamado `engine-config.json`
  ```bash
  nano engine-config.json
  ```
3. Contenido del `engine-config.json`
  ```json
  {
    "apiKey": "API_KEY_APOLLO_ENGINE",
    "origins": [{
      "http": {
        "url": "http://IP_RED_DOCKER:PUERTO_API_GRAPHQL/RUTA_GRAPHQL"
      }
    }],
    "frontends": [{
      "port": PUERTO_ESCUCHA_GRAPHQL,
      "endpoints": ["/RUTA_GRAPHQL"]
    }],
   "stores":[
      {
         "name":"embeddedCache",
         "inMemory":{
            "cacheSize":10485760
         }
      }
   ],
   "sessionAuth":{
      "store":"embeddedCache",
      "header":"authorization"
   },
   "queryCache":{
      "publicFullQueryStore":"embeddedCache",
      "privateFullQueryStore":"embeddedCache"
   }
  }
  ```

  Ejemplo:
  ```json
  {
    "apiKey": "service:TestService:xxxxxxxxxxxxxxxxx",
    "origins": [{
      "http": {
        "url": "http://172.17.0.1:3002/graphql"
      }
    }],
    "frontends": [{
      "port": 3004,
      "endpoints": ["/graphql"]
    }],
   "stores":[
      {
         "name":"embeddedCache",
         "inMemory":{
            "cacheSize":10485760
         }
      }
   ],
   "sessionAuth":{
      "store":"embeddedCache",
      "header":"authorization"
   },
   "queryCache":{
      "publicFullQueryStore":"embeddedCache",
      "privateFullQueryStore":"embeddedCache"
   }
  }
  ```
  En este caso el front de nuestra web deberá realizar las peticiones al endpoint que apunte al puerto 3004 y Apollo Engine hará de proxy y enviará a nuestro API en 3002 todo el tráfico de GraphQL.

4. Ejecutar el docker del Apollo Engine escuchando en el puerto correcto:
  ```bash
  ENGINE_PORT=3004 # Siguiendo con el ejemplo escucharemos el puerto 3004
  docker run -d --env "ENGINE_CONFIG=$(cat engine-config.json)" -p "${ENGINE_PORT}:${ENGINE_PORT}" --name apollo-engine gcr.io/mdg-public/engine:1.1
  ```

**NOTA:** Asegurarse que nginx está enrutando el tráfico del dominio del API al nuevo puerto.

That's all folks!
