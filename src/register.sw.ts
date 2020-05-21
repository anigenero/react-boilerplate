const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.ts.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const _registerValidSW = (swUrl: string) =>
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        // do nothing
                    }
                };
            };
        }).catch(() => {
            // do nothing
        });

const _checkValidServiceWorker = (swUrl: string) =>
    fetch(swUrl)
        .then((response) => {
            // Ensure service worker exists, and that we really are getting a JS file.
            if (
                response.status === 404 ||
                !response.headers.get('content-type').includes('javascript')
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                return _registerValidSW(swUrl);
            }
        }).catch(() => {
            // do nothing
        });

export const register = () => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {

        // The URL constructor is available in all Browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from What our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            if (!isLocalhost) {
                // Is not local host. Just register service worker
                _registerValidSW(swUrl);
            } else {
                // This is running on localhost. Lets check if a service worker still exists or not.
                _checkValidServiceWorker(swUrl);
            }
        });
    }
};

export const unregister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
};
