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
	cleanForSearch: cleanForSearch
}