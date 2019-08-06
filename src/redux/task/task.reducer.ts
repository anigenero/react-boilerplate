import { Reducer } from 'react';
import { ITaskState, TaskAction, TaskActionTypes } from './task.def';

const _defaultState: ITaskState = {
    tasks: [{
        text: 'Add a task or mark me as complete',
        complete: false
    }]
};

export const taskReducer: Reducer<ITaskState, TaskAction> = (state, action) => {

    switch (action.type) {

        case TaskActionTypes.ADD: {
            return {
                tasks: [
                    ...state.tasks,
                    action.task
                ]
            };
        }

        case TaskActionTypes.REMOVE: {
            return {
                tasks: [
                    ...state.tasks.slice(0, action.id),
                    ...state.tasks.slice(action.id + 1)
                ]
            };
        }

        case TaskActionTypes.SET_TASK_COMPLETE: {
            return {
                tasks: [
                    ...state.tasks.slice(0, action.id),
                    {...state.tasks[action.id], complete: true},
                    ...state.tasks.slice(action.id + 1)
                ]
            };
        }

        default: {
            return state || _defaultState;
        }

    }

};
