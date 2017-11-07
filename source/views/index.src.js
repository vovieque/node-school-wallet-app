import React from 'react';
import {hydrate as reactHydrate, render} from 'react-dom';
import {hydrate as emotionHydrate} from 'emotion';
import {App} from '../client/components';
import {sendGetStatusCommand} from '../client/service-worker/client-utils';

const {ids, appData} = window.__data;

emotionHydrate(ids);
reactHydrate(<App data={appData} isOffline={false} />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
		.then((registration) => console.log('[Service Worker]: Registered', registration))
		.then(() => navigator.serviceWorker.ready)
		.then(() => {
			return sendGetStatusCommand()
				.then((statusInfo) => updateAppWithOnlineStatus(statusInfo.isOnline))
				.catch(console.log);
		});

	navigator.serviceWorker.addEventListener('message', (event) => {
		const statusInfo = event.data;
		updateAppWithOnlineStatus(statusInfo.isOnline);
	});
}

let isCurrentlyOnline = true;

function updateAppWithOnlineStatus(isOnline) {
	if (isCurrentlyOnline === isOnline) {
		return;
	}
	isCurrentlyOnline = isOnline;
	render(<App data={appData} isOffline={!isCurrentlyOnline} />, document.getElementById('root'));
}
