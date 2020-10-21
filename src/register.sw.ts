const _SW_URL = '/service-worker.js';
const _IS_LOCALHOST = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const registerValidSW = async (swUrl: string): Promise<ServiceWorkerRegistration> => {

    const registration = await navigator.serviceWorker.register(swUrl);

    registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
                // do nothing
            }
        };
    };

    return registration;

};

const checkValidServiceWorker = async (swUrl: string): Promise<ServiceWorkerRegistration> => {

    const response = await fetch(swUrl);

    if (response.status === 404 || !response.headers.get('content-type').includes('javascript')) {
        await navigator.serviceWorker.ready.then((registration) => {
            void registration.unregister().then(() => {
                window.location.reload();
            });
        });
    } else {
        return registerValidSW(swUrl);
    }

};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {

    if ('serviceWorker' in navigator) {

        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

        // must be the same origin
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        return new Promise<ServiceWorkerRegistration>((resolve) => {
            window.addEventListener('load', () => {
                if (!_IS_LOCALHOST) {
                    resolve(registerValidSW(_SW_URL));
                } else {
                    resolve(checkValidServiceWorker(_SW_URL));
                }
            });
        });

    } else {
        return null;
    }

};

export const getPushManagerSubscription = async (): Promise<PushSubscription> => {
    if ('serviceWorker' in navigator) {
        return (await navigator.serviceWorker.ready).pushManager.getSubscription();
    } else {
        return null;
    }
};

export const getSubscription = async (): Promise<ServiceWorkerRegistration> => {

    const registration = await navigator.serviceWorker.getRegistration(_SW_URL);
    if (registration) {
        return registration;
    } else {
        return registerServiceWorker();
    }

};

export const unregister = (): Promise<void | ServiceWorkerRegistration> => {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.ready.then((registration) => {
            void registration.unregister();
        });
    }
};
