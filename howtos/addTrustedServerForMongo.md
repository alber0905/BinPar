# Cómo hacer para que mongodb esté disponible entre servidores

## Configurar mongo
Lo primero que debemos hacer es configurar mongo para que escuche en 0.0.0.0 y el puerto que queramos (por defecto lo pondremos en el 27017)

## Evitar que todo el mundo pueda acceder
Mediante la configuración de unas reglas a través de `iptables` evitaremos que todo el mundo pueda acceder a nuestro servidor.

### DROP de todas las conexiones al puerto de mongo
La primera regla que meteremos es que se haga DROP de todas las conexiones al puerto en el que escucha mongodb, pero únicamente las que vengan por la interfaz de red por la que entre el tráfico externo.
```bash
iptables -I FORWARD -i <interfaz_de_red> -p tcp --destination-port <puerto_de_mongo> -j DROP
```
La siguiente regla permite el acceso a la IP del servidor que nosotros queramos.
```bash
iptables -I FORWARD -i <interfaz_de_red> -s <ip_servidor_externo> -p tcp --destination-port <puerto> -m state --state NEW,ESTABLISHED -j ACCEPT
```

Se deberán añadir una regla de este tipo por cada servidor externo que queramos que tenga conexión a la base de datos de mongo.

## ¿Cómo veo qué reglas hay creadas?
Con el siguiente comando
```bash
iptables -L -n -v
```
se pueden ver todas las reglas que hay creadas, y nos fijaremos en concreto en las que hay en la parte de FORWARD

![iptables FORWARD](https://github.com/BinPar/BinPar/blob/master/resources/iptablesForward.png)