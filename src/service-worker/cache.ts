import { startsWith } from 'lodash';

declare var self: ServiceWorkerGlobalScope;

export const CACHE_NAME = 'root';

/**
 * Install the cache for the website. This is called on the 'install' event from the service worker
 *
 * @param {ExtendableEvent} event
 */
self.addEventListener('install', async (event: ExtendableEvent) => {

	event.waitUntil((async () => {

		// this 'cache.json' is generated in webpack compilation
		const result = await fetch('/cache.json');
		if (result.ok) {

			const json = await result.json();
			const cachedValues = Object.keys(json).map((key) => {

				const value = json[key];
				if (startsWith(value, './')) {
					return value.substring(2);
				} else {
					return value;
				}

			});

			const cache = await _getCache();
			await cache.addAll(cachedValues);

		}

	})());

});

/**
 * Handles a request for the cache. Attached to the 'fetch' event.
 * @param {FetchEvent} event
 */
self.addEventListener('fetch', (event: FetchEvent) => {

	const {request: {method, url}} = event;

	// we only want requests for our host
	if (method !== 'GET' || url.indexOf(location.hostname) < 0) {
		return;
	}

	// tslint:disable-next-line:only-arrow-functions space-before-function-paren
	event.respondWith(_getFromCache(event.request).then((content) => {
		if (content) {
			return _update(event.request).then((response) => _refresh(response));
		} else {
			return fetch(event.request);
		}
	}));

});

/**
 * Gets the cache
 * @private
 */
async function _getCache() {
	return caches.open(CACHE_NAME);
}

/**
 * Gets the specified request from the cache
 *
 * @param {Request} request
 */
async function _getFromCache(request: Request): Promise<Response> {
	return _getCache().then((cache) =>
		cache.match(request)
	);
}

/**
 * Updates the response from the request in the cache
 *
 * @param {Request} request
 */
async function _update(request: Request) {

	const cache = await _getCache();
	const response = await fetch(request);

	await cache.put(request, response.clone());

	return response;

}

/**
 * Refreshes the cache item with the ETag
 *
 * @param {Response} response
 */
async function _refresh(response: Response): Promise<Response> {

	(await self.clients.matchAll()).forEach((client: Client) =>
		client.postMessage(JSON.stringify({
			type: 'refresh',
			url: response.url,
			eTag: response.headers.get('ETag')
		}))
	);

	return response;

}
