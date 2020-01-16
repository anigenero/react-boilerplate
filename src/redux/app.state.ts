import { RouterState } from 'connected-react-router';
import { LocalizeState } from 'react-localize-redux';
import { TaskState } from './task/task.def';

export type AppState = {

    localize: LocalizeState;
    router: RouterState;
    task: TaskState;

};
