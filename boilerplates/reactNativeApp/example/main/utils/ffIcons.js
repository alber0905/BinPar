import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../resources/icoConfig.json';

const FF_ICONS = createIconSetFromIcoMoon(icoMoonConfig);

export default FF_ICONS;

export const ICON_NAMES = {
	JOB_TYPES: {
		'1': 'Recurso-3',
		'2': 'Recurso-2',
		'3': 'Recurso-12',
		'4': 'Recurso-5',
		'5': 'Recurso-34',
		'6': 'Recurso-14',
		'7': 'Recurso-7',
		'9': 'Recurso-9',
		'11': 'Recurso-34',
		'12': 'Recurso-1',
		'13': 'Recurso-12',
		'14': 'Recurso-39',
		'15': 'Recurso-8',
		'16': 'Recurso-13',
		'17': 'Recurso-6',
		'18': 'Recurso-6'
	},
	SEARCH_GLASS: 'Recurso-38',
	CHAT: 'Recurso-212',
	PROFILE: 'Recurso-40',
	MY_DEMANDS: 'Recurso-18',
	MY_OFFERS: 'Recurso-24',
	S_SOC: 'Recurso-46'
};