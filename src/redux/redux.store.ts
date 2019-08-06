import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { localizeReducer } from 'react-localize-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { IAppState } from './app.state';
import { taskStateTransform } from './task/task.def';
import { taskReducer } from './task/task.reducer';

export const browserHistory = createBrowserHistory();

export const rootEpic = combineEpics();

const epicMiddleware = createEpicMiddleware();

export const reducer = combineReducers<IAppState>({
    localize: localizeReducer,
    router: connectRouter(browserHistory),
    task: taskReducer
});

const persistConfig: PersistConfig = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage,
    transforms: [taskStateTransform],
    whitelist: ['task']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const reduxStore = createStore(
    persistedReducer,
    {},
    compose(
        applyMiddleware(
            epicMiddleware,
            routerMiddleware(browserHistory)
        )
    )
);

epicMiddleware.run(rootEpic);

export const persistor = persistStore(reduxStore);
