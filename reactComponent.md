# [Draft] Estructura de un componente React
 - Siempre se usará la notación de ECMAScript 6/2015 + ECMAScript 7 (statics), es decir, **siempre usaremos clases para crear nuestros componentes.**
 - Por norma general, cada componente (clase) será considerado un módulo cuyo default export es la propia clase.
 - El constructor siempre será la primera función **NO ESTÁTICA** del componente y el render siempre será la última función de este.

``` javascript 1.8
import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    
    render() {
    
    }
}
```
 - Las propiedades y funciones **estáticas** (static) irán por encima del constructor.
 - Denominaremos las funciones y propiedades privadas con un guión bajo (_) precediendo al nombre de la propiedad o función.
 - Las funciones y propiedades privadas deberían estar juntas y aparecer por encima de las públicas (aplicable tanto para estáticas como para no estáticas).
 
``` javascript 1.8
import React from 'react';

export default class Input extends React.Component {

    static _count = 0;
    
    static _incCount() {
        Input._count++;
    }
    
    static propTypes = {
        value: Reacy.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    
    _renderItems() {
        ...código...
    }
    
    getValue() {
        return this.state.value;
    }
    
    render() {
        ...código render...
    }
}
```
 - Las funciones del ciclo de vida de React irán justo después del constructor.
 - Las que no sean necesarias no deberían aparecer.
 - Estas funciones deberían estar ordenadas en el orden en el que ocurren (https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)
 

``` javascript 1.8
import React from 'react';

export default class Input extends React.Component {

    static _count = 0;
    
    static _incCount() {
        Input._count++;
    }
    
    static propTypes = {
        value: Reacy.PropTypes.string
    };
    
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    
    componentWillMount() {
        ...código...
    }
    
    componentDidMount() {
        ...código...
    }
    
    componentWillReceiveProps() {
        ...código...
    }
    
    componentWillUnmount() {
        ...código...
    }
    
    _renderItems() {
        ...código...
    }
    
    getValue() {
        return this.state.value;
    }
    
    render() {
        ...código render...
    }
}
```