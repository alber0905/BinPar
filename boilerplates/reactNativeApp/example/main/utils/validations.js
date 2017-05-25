import I18n from "../lang/lang";
import {flattenArray} from "./misc";

//CONSTS
const _emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REG_EXP_NIE = /^[XYZ]?\d{5,8}[A-Z]$/;

//METHODS
const isNumeric = (val) => {
	if(!val) {
		return {
			OK: true,
			error: I18n.t('number_validation_error')
		};
	}
	let stringVal = val && val.toString();
	return {
		OK: !(val instanceof Array) && ((stringVal - parseFloat(stringVal) + 1) >= 0),
		error: I18n.t('number_validation_error')
	}
};
const isValidDate = (value) => {
	return {
		OK: Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime()),
		error: I18n.t('this_is_not_a_valid_date')
	};
};

/**
 * 
 * 	VALIDATIONS
 * 
 * @params:
 * 	value - Valor a validar
 * 	data - Objecto con los datos del formulario
 * @output:
 * 	Object: 
 * 		OK: Bool - Define si es válido o no
 * 		error: String - Mensaje de error a mostrar	
 */
export default {
	isRequired: (val) => {
		let type = ({}).toString.call(val);
		if(type === '[object Number]'){
			return {
				OK: val != null,
				error: I18n.t('required_field')
			};
		}
		else {
			return {
				OK: !!val,
				error: I18n.t('required_field')
			};
		}
	},
	isEmail: (val) => {
		return {
			OK: !val || _emailRegExp.test(val),
			error: I18n.t('email_address_validation_error')
		};
	},
	isNumeric,
	isPhone: (value) => {
		return {
			OK: !value || value.length === 9,
			error: I18n.t('phone_number_validation_error')
		}
	},
	shouldMatchElement: function(val, data) {
		let inputs = this;
		if(inputs.exportDataKeyToMatch){
			return {
				OK: val === data[inputs.exportDataKeyToMatch],
				error: inputs.errorMessage || I18n.t('value_should_match_element')
			}
		}
		else{
			return {
				OK: false,
				error: 'Must bind a object with property "exportDataKeyToMatch"'
			};
		}
	},
	isNIEValid(dni) {
		let res = {OK: false, error: I18n.t('error_validation_nie')};
		if(!dni) {
			return res;
		}
		let numero, _let, letra;
		dni = dni.toUpperCase();
		if(REG_EXP_NIE.test(dni) === true){
			numero = dni.substr(0,dni.length-1);
			numero = numero.replace('X', '0');
			numero = numero.replace('Y', '1');
			numero = numero.replace('Z', '2');
			_let = dni.substr(dni.length-1, 1);
			numero = numero % 23;
			letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
			letra = letra.substring(numero, numero + 1);
			res.OK = (letra == _let);
			return res;
		}
		else {
			return res;
		}
	},
	oneProvinceAtLeast(value) {
		let valid = false;
		if(value && value.length) {
			let innerVal = value[0].value || value[0].id;
			if(innerVal !== null && innerVal !== -1) {
				valid = true;
			}
		}
		return {
			OK: valid,
			error: I18n.t('error_one_province_at_least')
		};
	},
	radioRequired(value) {
		return {
			OK: value !== -1,
			error: I18n.t('error_should_select_one')
		};
	},
	checkButtonsRequired(value) {
		let valid = value && flattenArray(value).some((val)=>{
			return val.checked;
		});
		return {
			OK: valid,
			error: I18n.t('error_should_select_at_least_one')
		};
	},
	textAreaRequired(value) {
		return {
			OK: !!value,
			error: I18n.t('required_field')
		};
	},
	mainImageRequired(value) {
		return {
			OK: !!value.mainImage && (!!value.mainImage.uri || !!value.mainImage._base64),
			error: I18n.t('main_image_required')
		};
	},
	addressRequired(value) {
		return {
			OK: !!value.formattedAddress,
			error: I18n.t('address_required')
		};
	},
	postalCodeRequired(value) {
		return {
			OK: !!value.postalCode,
			error: I18n.t('postal_code_required')
		}
	},
	shouldBeLowerThanElement(value, data) {
		let options = this;
		if(options.exportDataKeyOtherElement){
			if(!options.errorMessage) {
				console.warn(`It's strongly recommended set a "errorMessage" property in the binded options`);
			}
			if(!data[options.exportDataKeyOtherElement]) {
				return {
					OK: true,
					error: ''
				};
			}
			return {
				OK: value < data[options.exportDataKeyOtherElement],
				error: options.errorMessage || I18n.t('value_should_be_lower_than')
			}
		}
		else{
			return {
				OK: false,
				error: 'Must bind a object with property "exportDataKeyOtherElement"'
			};
		}
	},
	shouldBeGreaterThanElement(value, data) {
		let options = this;
		if(options.exportDataKeyOtherElement){
			if(!options.errorMessage) {
				console.warn(`It's strongly recommended set a "errorMessage" property in the binded options`);
			}
			return {
				OK: value > data[options.exportDataKeyOtherElement],
				error: options.errorMessage || I18n.t('value_should_be_greater_than')
			}
		}
		else{
			return {
				OK: false,
				error: 'Must bind a object with property "exportDataKeyOtherElement"'
			};
		}
	},
	dateShouldBeLowerThanToday(value) {
		return {
			OK: value < new Date(),
			error: I18n.t('date_should_be_lower_than_today')
		}
	},
	positiveNumber(value) {
		let isNum = isNumeric(value);
		if(!isNum.OK) {
			return isNum;
		}
		return {
			OK: value > 0,
			error: I18n.t('number_must_be_greather_than_zero')
		}
	},
	isValidDate,
	atLeastEighteenYears(value) {
		let isValidaDate = isValidDate(value);
		if(!isValidaDate.OK) {
			return isValidaDate;
		}
		return {
			OK: new Date().getTime() - value.getTime() > 567993600000,
			error: I18n.t('must_be_over_18_years')
		}
	},
	passwordAtLeastSixChars(value) {
		if(value) {
			return {
				OK: value.length > 5,
				error: I18n.t('password_at_least_six_chars')
			};
		} else {
			return {
				OK: false,
				error: I18n.t('password_at_least_six_chars')
			};
		}
	}
}