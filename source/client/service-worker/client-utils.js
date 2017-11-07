/* eslint-disable no-undef,no-console,import/prefer-default-export */

export function sendGetStatusCommand() {
	if (!navigator.serviceWorker.controller) {
		return Promise.reject(new Error('serviceWorker.controller is not created yet!'));
	}

	return new Promise((resolve, reject) => {
		const channel = new MessageChannel();
		channel.port1.onmessage = (event) => {
			if (event.data.error) {
				reject(event.data.error);
			} else {
				resolve(event.data);
			}
		};

		const command = {
			type: 'getStatus'
		};
		navigator.serviceWorker.controller.postMessage(command, [channel.port2]);
	});
}
