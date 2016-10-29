# Burradas varias y cómo arreglarlas

### Burrada
``` javascript
validarEmail(valor) {
	let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!expr.test(valor)){
		return false;
	} else {
		return true;
	}
}
```
### Solución
``` javascript
validarEmail(valor) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valor);
}
``` 