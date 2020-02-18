import { compose } from 'redux';

// tslint:disable:interface-name

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    }
}

declare let clients: any;
