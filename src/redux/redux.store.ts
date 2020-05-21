import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {localizeReducer} from 'react-localize-redux';
import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {PersistConfig, persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import {asyncScheduler} from 'rxjs';
import {AppState} from './app.state';
import {EpicDependencies} from './epic.def';
import {taskStateTransform} from './task/task.def';
import {TaskEpics} from './task/task.epic';
import {taskReducer} from './task/task.reducer';

export const browserHistory = createBrowserHistory();

export const rootEpic = combineEpics(
    TaskEpics.createTask,
    TaskEpics.markTaskComplete
);

const epicMiddleware =
    createEpicMiddleware<Action, Action, AppState, EpicDependencies>({
        dependencies: {
            scheduler: asyncScheduler
        }
    });

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

let reducerCompose = compose;
if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    reducerCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export const reduxStore = createStore(
    persistedReducer,
    reducerCompose(
        applyMiddleware(
            epicMiddleware,
            routerMiddleware(browserHistory)
        )
    )
);

epicMiddleware.run(rootEpic);

export const persistor = persistStore(reduxStore);
