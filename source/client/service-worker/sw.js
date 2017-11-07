/* eslint-disable */
importScripts('/sw-cache-polyfill.js');

// fields
const cacheName = 'offline v1.0';

let isOnline = true;


// events
self.addEventListener('install', function (event) {
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
	event.waitUntil(Promise.all([
		self.clients.claim(),
		removeObsoleteCache()
	]));
});

self.addEventListener('fetch', event => {
	event.respondWith(
		fetchRequestOrGetFromCache(event.request)
	);
});

self.addEventListener('message', event => {
	event.waitUntil(
		dispatchCommand(event)
	);
});


// functions
function fetchRequestOrGetFromCache(request) {
	return fetch(request)
		.then(response => {
			return changeOnlineStatus(true)
				.then(() => {
					if (request.method !== "GET") {
						return response;
					}

					return caches.open(cacheName)
						.then(cache => {
							cache.put(request, response.clone())
							return response;
						});
				});
		})
		.catch(error => {
			return changeOnlineStatus(false)
				.then(() => caches.open(cacheName))
				.then(cache => cache.match(request));
		});
}

function removeObsoleteCache() {
	return caches.keys()
		.then(keys => {
			const keysToDelete = keys.filter(key => key !== cacheName);
			const promistes = keysToDelete.map(key => caches.delete(key));
			return Promise.all(promistes);
		});
};

function dispatchCommand(event) {
	const command = event.data;
	switch (command.type) {
		case 'getStatus':
			const ports = event.ports;
			if (ports.length > 0) {
				const statusInfo = {
					isOnline
				};
				ports[0].postMessage(statusInfo);
			}
			return Promise.resolve();
			break;
		default:
			return Promise.resolve();
			break;
	}
}

function changeOnlineStatus(value) {
	if (isOnline !== value) {
		isOnline = value;
		console.log('[SW] Online status changed: ', value);
		const statusInfo = {
			isOnline
		};
		return broadcastClients(statusInfo);
	}

	return Promise.resolve();
}

function broadcastClients(message) {
	return clients.matchAll()
		.then(clients => {
			for (let client of clients) {
				client.postMessage(message);
			}
		});
}