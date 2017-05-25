import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from "react-native-fbsdk";

export function isLoggedIn() {
	return new Promise((resolve, reject) => {
		AccessToken.getCurrentAccessToken().then((data) => {
			if (data && data.getExpires() > new Date().getTime()) {
				resolve(data.accessToken.toString());
			} else {
				reject(false);
			}
		}).catch((err) => {
			console.warn('[FB AccessToken]', err);
			reject(false);
		});
	});
}

export function facebookLogin() {
	return new Promise((resolve, reject) => {
		isLoggedIn().then((token) => {
			getUserInfo().then((data) => {
				resolve(data);
			}).catch((err) => {
				reject(err);
			});
		}).catch(() => {
			LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
				if (result.isCancelled) {
					console.log('[FB Login] Cancelado por el usuario');
					reject(new Error('Cancelado por el usuario'));
				} else {
					getUserInfo().then((data) => {
						resolve(data);
					}).catch((err) => {
						reject(err);
					});
				}
			}).catch((err) => {
				console.warn('[FB Login]', err);
				reject(err);
			});
		});
	});
}

export function getUserInfo(fields = 'email,first_name,last_name') {
	return new Promise((resolve, reject) => {
		if (fields instanceof Array) {
			fields = fields.join(',');
		}
		if (typeof fields !== 'string') {
			return reject(new Error('El parámetro fields debe ser una string'));
		}
		let userInfoRequest = new GraphRequest(`/me?fields=${fields}`, null, (err, res) => {
			if (err) {
				console.warn('[FB GraphRequest]', err);
				reject(err);
			}
			else {
				resolve(res);
			}
		});
		new GraphRequestManager().addRequest(userInfoRequest).start();
	});
}