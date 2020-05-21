import {createTransform} from 'redux-persist';

export namespace TaskActionTypes {

    export const ADD = '@@task/add';
    export const COMPLETE_TASK = '@@task/complete';
    export const CREATE_TASK = '@@task/create';
    export const SET_TASK_COMPLETE = '@@task/set_complete';
    export const REMOVE = '@@task/remove';

}

// tslint:disable-next-line:interface-over-type-literal
export type TaskActions = {

    [TaskActionTypes.ADD]: {
        type: typeof TaskActionTypes.ADD;
        task: Task;
    };

    [TaskActionTypes.COMPLETE_TASK]: {
        type: typeof TaskActionTypes.COMPLETE_TASK;
        id: string;
    }

    [TaskActionTypes.CREATE_TASK]: {
        type: typeof TaskActionTypes.CREATE_TASK;
        task: string;
    };

    [TaskActionTypes.SET_TASK_COMPLETE]: {
        type: typeof TaskActionTypes.SET_TASK_COMPLETE;
        id: string;
    };

    [TaskActionTypes.REMOVE]: {
        type: typeof TaskActionTypes.REMOVE;
        id: string;
    };

};

export type Task = {

    id: string;

    complete?: boolean;
    text: string;

};

export type TaskState = {
    tasks: Task[];
};

export type TaskReducerAction =
    TaskActions[typeof TaskActionTypes.ADD] |
    TaskActions[typeof TaskActionTypes.REMOVE] |
    TaskActions[typeof TaskActionTypes.SET_TASK_COMPLETE];

export type TaskAction =
    TaskActions[typeof TaskActionTypes.COMPLETE_TASK] |
    TaskActions[typeof TaskActionTypes.CREATE_TASK] |
    TaskReducerAction;

export const taskStateTransform = createTransform(
    (inboundState: TaskState, key) => {
        if (key !== 'task') {
            return inboundState;
        } else {
            return {
                ...inboundState
            };
        }
    },
    (outboundState) => outboundState
);
