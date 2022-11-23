import { Rocketchat } from '@rocket.chat/sdk';
import { isSsl } from '../methods/helpers/url';
//EF::3
class Sdk {
	private sdk: typeof Rocketchat;
	private code: any;

	private initializeSdk(server: string): typeof Rocketchat {
		// The app can't reconnect if reopen interval is 5s while in development
		return new Rocketchat({ host: server, protocol: 'ddp', useSsl: isSsl(server), reopen: __DEV__ ? 20000 : 5000 });
	}

	// TODO: We need to stop returning the SDK after all methods are dehydrated
	initialize(server: string) {
		this.code = null;
		this.sdk = this.initializeSdk(server);
		return this.sdk;
	}

	get current() {
		return  this.sdk;
	}

	/**
	 * TODO: evaluate the need for assigning "null" to this.sdk
	 * I'm returning "null" because we need to remove both instances of this.sdk here and on rocketchat.js
	 */
	disconnect() {
		if (this.sdk) {
			this.sdk.disconnect();
			this.sdk = null;
		}
		return null;
	}

	methodCall(...args: any[]): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await this.current.methodCall(...args, this.code || '');
				return resolve(result);
			} catch (e: any) {
                reject(e);
			}
		});
	}

	subscribe(...args: any[]) {
		return this.current.subscribe(...args);
	}

	subscribeRaw(...args: any[]) {
		return this.current.subscribeRaw(...args);
	}

	subscribeRoom(...args: any[]) {
		return this.current.subscribeRoom(...args);
	}

	unsubscribe(subscription: any[]) {
		return this.current.unsubscribe(subscription);
	}

	onStreamData(...args: any[]) {
		return this.current.onStreamData(...args);
	}
}

const sdk = new Sdk();

export default sdk;
