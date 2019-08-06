import { RouterState } from 'connected-react-router';
import { LocalizeState } from 'react-localize-redux';
import { ITaskState } from './task/task.def';

export interface IAppState {

    localize: LocalizeState;
    router: RouterState;
    task: ITaskState;

}
