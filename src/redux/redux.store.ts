import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { localizeReducer } from 'react-localize-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { AppState } from './app.state';
import { taskStateTransform } from './task/task.def';
import { taskReducer } from './task/task.reducer';

export const browserHistory = createBrowserHistory();

export const rootEpic = combineEpics();

const epicMiddleware = createEpicMiddleware();

export const reducer = combineReducers<AppState>({
    localize: localizeReducer,
    router: connectRouter(browserHistory),
    task: taskReducer
});

const persistConfig: PersistConfig<AppState> = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage,
    transforms: [taskStateTransform],
    whitelist: ['task']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const reduxStore = createStore(
    persistedReducer,
    compose(
        applyMiddleware(
            epicMiddleware,
            routerMiddleware(browserHistory)
        )
    )
);

epicMiddleware.run(rootEpic);

export const persistor = persistStore(reduxStore);
