import en from "./en/en.json";
import es from "./es/es.json";
import momentES from "./es/moment_es";
import I18n from "react-native-i18n";
import moment from "moment";

I18n.fallbacks = true;
I18n.translations = { en, es };
moment.defineLocale('es', momentES);
moment.locale(I18n.locale);

I18n.toggleLang = ()=>{
	if(I18n.locale == 'en'){
		I18n.locale = 'es';
		moment.locale(I18n.locale);
	}
	else{
		I18n.locale = 'en';
		moment.locale(I18n.locale);
	}
};

I18n.setLocale = (locale)=>{
	I18n.locale = locale;
	moment.locale(I18n.locale);
};

export default I18n;