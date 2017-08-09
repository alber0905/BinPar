#¡DEPRECATED!
Consultar esto en su lugar: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md)

## Full stack JavaScript: Pautas de programación

Usar ES2015 como comenté un día en Discord, ES2015 nos brinda muchas ventajas y mucho ahorro de código que, en ocasiones, puede parecer que “ensucia”, pero al contrario de lo que parece, bien usado, lo aclara. A veces menos es más.

Mantener los “temporary my ass” al mínimo. Si vamos a hacer algo vamos a hacerlo bien, aunque sea “temporal”. Todos sabemos que los temporales vienen para quedarse muchas veces.

Nombrar las variables apropiadamente para que el que venga detrás no confunda churras con merinas (si a las churras las llamas merinas, ten por seguro que el que venga detrás va a meter la gamba hasta el fondo). Los nombres de variables graciosos molan, pero no ayudan a mantener el código y hay clientes que pueden ver esos nombres, por lo que “esteProyectoSucksHard” no es un nombre aceptable.

Los comentarios en el código, normalmente, no son necesarios si has hecho bien el punto de arriba, no obstante, si crees que es necesario un comentario para aclarar una funcionalidad ponlo, no suelen sobrar.

Evitar los fragmentos de código comentados, sobre todo algunos que se ven por ahí que son monstruosos. Tenemos GitHub que es un fantástico control de versiones que nos permite volver atrás o coger un código anterior sin tener que mantenerlo comentado.

Hacer caso a WebStorm… casi siempre. Esto es, por ejemplo, si os marca en amarillo el final de una línea de código, es posible que te hayas olvidado el punto y coma.

Hablando de puntos y comas… aunque JavaScript trague con todo… No es aceptable un código que no contenga apropiadamente colocados en su sitio los puntos y comas.

Retornos de carro innecesarios, SUPRIMIR. Esto es super importante, el código ha de estar cerquita lo uno de lo otro, no dejar más de una línea en blanco por favor. Por mucho que creáis que el espacio da mejor visibilidad es todo lo contrario… Esto me lleva a otro punto.

Los componentes / clases / funciones tienen que ser lo más pequeños posible. Esto quiere decir que si tienes un componente de 2000 líneas posiblemente se podía haber dividido en… 20 componentes aproximadamente. A no ser que estéis completamente seguros de que algo es indivisible, divididlo.

Debuggers: PROHIBIDOS en cualquier commit. Podéis usarlos en local (ya sabéis que no lo recomiendo pues ralentiza mucho los desarrollos) pero nunca hacer commit con uno o desarrollaré una herramienta que no os permita commitear algo con debuggers (guiño, guiño).

console.logs de la vida: Aquí quiero probar algo que leí en algún lugar de buenas prácticas del desarrollo en fullstack JavaScript y es que los console.logs importantes que no son necesarios en producción pero si lo son para un correcto debug del código no deben ser eliminados sino comentados, para que el que venga detrás los vea y se aproveche de ellos. Por supuesto, loggeamos TODOS los errores. Los console.logs que consideréis poco importantes podéis eliminarlos.

Si hay un error en la consola se soluciona (si es posible) y no se deja para luego. El rojo en la consola no mola nada.

Lo mismo con los warnings.

En BinPar NO SE USAN ESPACIOS para indentar el código. Obligatorio tabulaciones. (Aquí no se admiten sugerencias)

Nunca te conformes solo con un “funciona”. Hace tiempo que ese tren pasó por esta estación. No son aceptables códigos que solo “funcionen”, tienen que ser eficientes. Esto es importante, MUY importante, buscamos calidad, con la calidad viene sola la cantidad (en este caso). Esto no es una carrera, si, hay que cumplir tiempos pero hay que hacerlo bien.

Los corchetes en ifs, fors, whiles, funciones, whatevers tendrán la siguiente forma:
if (<condición>) {
<aquí va un TAB>insertar código de alta calidad aquí
}

() => {
<aquí va un TAB>insertar código de alta calidad aquí
}
Esto otro es para .NET y otros lenguajes:
if (<condición>)
{
   código no tan awesome
}
Nótese la diferencia en los corchetes.

En cuanto a las arrow functions de ES2015, la notación sin paréntesis y/o sin corchetes queda descartada por no ser suficientemente clara en ciertas ocasiones. Ejemplo:
<button onClick={a => a+1} ></button>
En este caso parece muy claro todo, pero vamos a ver otro:
promise.then(
   a => this.setState({counter: this.state.counter + a}), err => console.log(err)
);
En este ya es más complicado ver la coma de en medio para saber que hay dos parámetros que son dos funciones. Los hay más complicados.

Los nombres de los módulos (instanciables) / componentes / clases se deben nombrar siguiendo el estilo UpperCamelCase (la primera con mayúscula). Si el archivo sólo contiene esta clase (que es lo correcto) se llamará igual que la clase más la extensión del tipo de archivo.

Las instancias de objectos y variables normales se nombrarán siguiendo el estilo lowerCamelCase (la primera en minúscula).

Si una variable es constante la declararemos con “const” para que no pueda ser modificada y asegurarnos de que permanece, como su nombre indica, constante.

Las constantes las nombraremos con todo en mayúsculas y las palabras separadas por barra baja ( _ ) Ejemplo: const MAGIC_NUMBER = 0.1546;
Ejemplo 2 (con export):
export const COLORS = {
   WHITE: 'rgb(255, 255, 255)',
   WHITE_DARK: 'rgb(247, 249, 250)',
   MAIN_BLUE: 'rgb(0, 154, 221)',
   MAIN_BLUE_TRANS: 'rgba(0, 154, 221, 0.4)',
   DARK_BLUE: 'rgb(57, 81, 133)',
   FB_BLUE: 'rgb(57, 81, 133)',
   DARK: 'rgb(74, 74, 74)',
   GREY: 'rgb(109, 110, 112)',
   GREY_LIGHT: 'rgba(155, 155, 155, 0.4)',
   RED: 'rgb(208, 2, 27)',
   MAIN_GREEN: 'rgb(126, 211, 33)',
   NOTIF_GREEN: 'rgb(78, 206, 0)',
   ORANGE: 'rgb(245, 166, 35)',
   TRANSPARENT: 'rgba(0,0,0,0)'
};
Usar los módulos de ES2015 (export, import) para separar nuestro código es una muy buena práctica.

Antes de subir a producción: testing, testing, testing. Es lo único que te evitará una cagada en producción. Aunque el cambio haya sido el más leve y nada pueda fallar, compruébalo dos veces para quedarte tranquilo. (yo mismo peco aquí de optimista y si el cambio es nimio tiendo a no probarlo y es un GRAN error, creedme)

Suscripciones de Meteor: la clave aquí es suscribirse únicamente a lo estrictamente necesario en cada componente. Y lo estrictamente necesario es exactamente  eso, si sólo necesito los 10 primeros usuarios que empiezan por “alb” y además sólo los quiero para usar el campo “name” entonces la query del Meteor.publish devolverá el cursor de la query que use el filtro “alb” haga un limit a 10 y solo obtenga el campo “name” (AVISO: siempre que hay un limit en mongo debemos establecer un sort por algún campo también). Esto tiene variantes si necesito ordenar por otro campo, etc. Pero creo que se entiende la intención.

Cuando una subscripción no es necesaria se elimina para aliviar la carga del servidor.

Uso de GitHub. Esta es una de las cosas más importantes para que un proyecto en el que trabajan varias personas llegue a buen puerto, y más todavía si hay interacción del cliente. Cualquier problema, error, bug, mejora, etc se debe dejar plasmada en una Issue de GitHub debidamente etiquetada y documentada con explicaciones, imágenes y GIFs si hace falta. La utilización del tablero de Projects del GitHub es muy útil también para organizar sprints.

A raíz del buen uso de GitHub, crearé la etiqueta techReview para que podáis marcar y documentar los temas que tenga que revisar con vosotros (Ver primera parte de este email para recordar el protocolo).
