//import Meteor from 'react-native-meteor';
//import { SERVER_URL } from './misc';

class FW {

	constructor(){
		this._ready = false;
		this._settingup = false;
		this._readyResolvers = [];
		this._readyRejecters = [];
		this.DB = {};
		this.setup();
	}

	setup() {
		return new Promise((resolve, reject)=> {
			try {
				//conexión a meteor
				/*Meteor.connect(`${SERVER_URL.replace('http', 'ws')}websocket`);
				Meteor.ddp.on('connected', () => {
					console.log('Meteor connected! Calling setupBinParAPI');
					if(!this._ready && !this._settingup) {
						this._settingup = true;
						Meteor.call("setupBinParAPI", (e, API) => {
							if (e) {
								console.log("Error setting up BinParAPI :", e);
								if (this._readyRejecters.length) {
									let rejecter;
									while (rejecter = this._readyRejecters.shift()) {
										rejecter(e);
									}
								}
								return reject(e);
							}

							for (let i = 0, l = API.methods.length; i < l; i++) {
								let [dbName, method] = API.methods[i].split('.');
								if (dbName && method) {
									if (!this.DB[dbName]) {
										this.DB[dbName] = {};
									}
									if (this.DB[dbName][method]) {
										console.warn(`Duplicated method in collection ${dbName}: ${method}`);
									} else {
										this.DB[dbName][method] = function (...params) {
											return Meteor.call(API.methods[i], ...params);
										}
									}
								}
							}

							for (let i = 0, l = API.publications.length; i < l; i++) {
								let [dbName, publication] = API.publications[i].split('.');
								if (dbName && publication) {
									if (!this.DB[dbName]) {
										this.DB[dbName] = {};
									}
									if (this.DB[dbName][publication]) {
										console.warn(`Duplicated subscription in collection ${dbName}: ${publication}`);
									} else {
										this.DB[dbName][publication] = function (...params) {
											return Meteor.subscribe(publication, ...params);
										}
									}
								}
							}

							for (let i = 0, l = API.queries.length; i < l; i++) {
								let [dbName, query] = API.queries[i].split('.');
								if (dbName && query) {
									if (!this.DB[dbName]) {
										this.DB[dbName] = {};
									}
									if (this.DB[dbName][query]) {
										console.warn(`Duplicated subscription in collection ${dbName}: ${query}`);
									} else {
										let _this = this;
										this.DB[dbName][query] = function (...params) {
											let subs = Meteor.subscribe(query, ...params);
											subs.query = _this.DB[dbName]["query_" + query].bind(_this.DB[dbName], Meteor.userId(), ...params);
											return subs;
										}
									}
								}
							}

							this.DB.constants.getConstantsObject((err, res) => {
								if (err || !res) {
									console.log("Error getting constants:", err);
									if (this._readyRejecters.length) {
										let rejecter;
										while (rejecter = this._readyRejecters.shift()) {
											rejecter(err);
										}
									}
									return reject(err);
								}
								else {
									BinPar.CONSTANTS = res;

									this._settingup = false;
									this._ready = true;
									if (this._readyResolvers.length) {
										let resolver;
										while (resolver = this._readyResolvers.shift()) {
											resolver(true);
										}
									}
									this._readyRejecters = [];
									return resolve(true);
								}
							});
						});
					} else {
						console.log('[BinPar FW] You are calling setup when the framework is already up or the setup progress is still running');
					}
				});*/
				this._settingup = false;
				this._ready = true;
				if (this._readyResolvers.length) {
					let resolver;
					while (resolver = this._readyResolvers.shift()) {
						resolver(true);
					}
				}
				this._readyRejecters = [];
				return resolve(true);
			}
			catch (err) {
				this._settingup = false;
				if(err.message !== 'Cannot read property \'on\' of undefined') {
					console.log("Error setting up BinParAPI :", err);
					if (this._readyRejecters.length) {
						let rejecter;
						while (rejecter = this._readyRejecters.shift()) {
							rejecter(err);
						}
					}
				}
				reject(err);
			}
		});
	}

	getMeteorUser() {
		return Meteor.user();
	}

	isReady(){
		return this._ready;
	}

	whenReady(){
		return new Promise((resolve, reject)=>{
			if(this._ready) {
				return resolve(true);
			}
			this._readyResolvers.push(resolve);
			this._readyRejecters.push(reject);
		});
	}
}

const BinPar = new FW();

export default BinPar;