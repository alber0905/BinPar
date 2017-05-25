import I18n from "../lang/lang";
import BinPar from "./fw";

let _getRandomString = () => {
	return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
};

export function getRandomCode (length) {
	if(!length){
		return _getRandomString();
	}
	let res = '';
	while (res.length < length){
		let rndStr = _getRandomString();
		let lRndStr = rndStr.length;
		let nCharMissed = length - res.length;
		if(nCharMissed < lRndStr){
			res += rndStr.substr(0,nCharMissed);
		}
		else{
			res += rndStr;
		}
	}
	return res;
}

const invalidChars = 'ÁÉÍÓÚáéíóú';
const searchChars = 'AEIOUaeiou';

export function cleanForSearch (str) {
	if(!str){
		return '';
	}
	str = str.toLowerCase();
	let res = '';
	for(let i = 0, l = str.length; i < l; i++){
		let c = str[i];
		let ind = invalidChars.indexOf(c);
		if(ind >= 0){
			res += searchChars.charAt(ind);
		}
		else{
			res += c;
		}
	}
	return res;
}

// export const SERVER_URL = 'http://192.168.1.63:3000/'; //FamiliaFacil
export const SERVER_URL = 'https://familiafacil.binpar.com/'; //Server
// export const SERVER_URL = 'http://192.168.1.42:3000/'; //BinParNewProd
// export const SERVER_URL = 'http://192.168.1.34:3000/'; // Casa
// export const SERVER_URL = 'http://10.100.102.9:3000/'; //BinParNewProd 4ª
// export const SERVER_URL = 'http://10.100.100.77:3000/'; //BINPAR
// export const SERVER_URL = 'http://10.0.1.19:3000/'; //BinParNewProd 4ª

export const FF_SERVER = 'https://staging.familiafacil.es';
export const LOCAL_URLS = {
	es: {
		GO: `${FF_SERVER}/api/user/go`	// ?userToken=<user-token>&url=<url>
	},
	en: {
		GO: `${FF_SERVER}/en/api/user/go`	// ?userToken=<user-token>&url=<url>
	}
};

export function loadConstantsForPicker(target, constName, options) {
	options = Object.assign({
		sortByCleanName: true,
		sortByValue: false,
		sortByIndex: false,
		valueProp: 'id',
		nameProp: 'name',
		defaultName: I18n.t('select_an_option'),
		defaultValue: null
	}, options);
	let key = `_${constName}`;
	let keyForPicker = `_${constName}_FOR_PICKER`;
	if(!target[key] || target[keyForPicker]._locale !== I18n.locale) {
		target[key] = BinPar.CONSTANTS[I18n.locale][constName];
		target[keyForPicker] = Object.keys(target[key]).map((elementKey)=>{
			let element = target[key][elementKey];
			if(element.index != null) {
				return {
					value: element[options.valueProp],
					name: element[options.nameProp],
					cleanName: cleanForSearch(element[options.nameProp]),
					index: element.index,
					toString: function() {
						return this.name;
					}
				};
			} else {
				return {
					value: element[options.valueProp],
					name: element[options.nameProp],
					cleanName: cleanForSearch(element[options.nameProp]),
					toString: function() {
						return this.name;
					}
				};
			}
		});
		if(constName === 'JOB_TYPE' || options.sortByIndex) {
			target[keyForPicker] = target[keyForPicker].sort((a, b) => {
				return a.index - b.index;
			});
		} else if(options.sortByCleanName){
			target[keyForPicker] = target[keyForPicker].sort((a, b) => {
				return a.cleanName > b.cleanName ? 1 : (a.cleanName < b.cleanName ? -1 : 0);
			});
		} else if(options.sortByValue) {
			target[keyForPicker] = target[keyForPicker].sort((a, b) => {
				return a.value > b.value ? 1 : (a.value < b.value ? -1 : 0);
			});
		}
		target[keyForPicker]._locale = I18n.locale;
		target[keyForPicker].unshift({value: options.defaultValue, name: options.defaultName, toString: function() { return this.name; }});
	}
}

export function getAgeFromDate(date, until = new Date()) {
	if (until > date) {
		return Math.round((until - date) / 31557600000);
	} else {
		return -1;
	}
}

export function pad(n) {
	return (n > 9 ? '' + n : '0' + n);
}

export function dateToAPIFormat(date) {
	if(!date) {
		return '';
	} else {
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	}
}

export function toTitleCase(str) {
	return str.split(' ').reduce((res, val)=>{
		return `${res}${val.charAt(0).toUpperCase()}${val.substr(1).toLowerCase()} `;
	}, '');
}

export function flattenArray(array) {
	if(!array) {
		return [];
	}
	return array.reduce((prev, curr) => {
		return prev.concat(curr);
	}, []);
}

export function processTextWithEmphasis(str, emphasisChar = '*') {
	let res = [];
	let strong = false;
	let lastCharWasStrong = false;
	let elementIndex = 0;
	for (let i = 0, l = str.length; i < l; i++) {
		let c = str[i];
		if(lastCharWasStrong && c === emphasisChar) {
			lastCharWasStrong = false;
			if(i === l - 1){
				break;
			}
			if(strong) {
				//switch to no strong
				strong = false;
				res[++elementIndex] = {
					strong,
					value: ''
				}
			} else {
				//switch to strong
				strong = true;
				res[++elementIndex] = {
					strong,
					value: ''
				}
			}
		} else if(c === emphasisChar) {
			lastCharWasStrong = true;
		} else {
			if(!res[elementIndex]) {
				res[elementIndex] = {
					strong,
					value: c
				};
			} else {
				res[elementIndex].value += c;
			}
		}
	}
	return res;
}

export default {
	getRandomCode: getRandomCode,
	cleanForSearch: cleanForSearch,
	SERVER_URL: SERVER_URL
}