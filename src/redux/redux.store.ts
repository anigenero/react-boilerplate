import {throttle} from 'lodash';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {retrieveLocalValue, storeLocalValue} from '../util/store.util';
import {IAppState} from './app.state';

const _STATE_KEY = 'state';

/**
 * Loads the state from the local storage
 *
 * @private
 * @returns {IAppState}
 */
const _loadState = (): IAppState => {

    try {

        const stateJson = retrieveLocalValue(_STATE_KEY);
        if (stateJson === null) {
            return undefined;
        }

        return JSON.parse(stateJson);

    } catch (err) {
        return undefined;
    }

};

/**
 * Saves the state to the local storage
 *
 * @private
 * @param {IAppState} state
 */
const _saveState = (state: IAppState) => {

    try {
        const stateJson = JSON.stringify(state);
        storeLocalValue(_STATE_KEY, stateJson);
    } catch (err) {
        // do nothing
    }

};

export const rootEpic = combineEpics();

const epicMiddleware = createEpicMiddleware();
export const reducer = combineReducers<IAppState>({
});

const persistedState = _loadState();
const reduxStore = createStore(
    reducer,
    persistedState,
    applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

// saves the state to local storage every 1 second
reduxStore.subscribe(throttle(() => {

    const state = reduxStore.getState();
    _saveState({
        ...state
    });

}, 1000));

export default reduxStore;
