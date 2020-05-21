import {Reducer} from 'react';
import {TaskState, TaskReducerAction, TaskActionTypes, Task} from './task.def';

const _defaultState: TaskState = {
    tasks: [{
        id: `${new Date().getTime()}`,
        text: 'Add a task or mark me as complete',
        complete: false
    }]
};

const _getTaskIndex = (id: string, stack: Task[]) => {

    const count = stack.length;
    for (let i = 0; i < count; i++) {
        if (stack[i].id === id) {
            return i;
        }
    }

    return -1;

};

export const taskReducer: Reducer<TaskState, TaskReducerAction> = (state, action) => {

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

            const index = _getTaskIndex(action.id, state.tasks);

            return {
                tasks: [
                    ...state.tasks.slice(0, index),
                    ...state.tasks.slice(index + 1)
                ]
            };
        }

        case TaskActionTypes.SET_TASK_COMPLETE: {

            const index = _getTaskIndex(action.id, state.tasks);

            return {
                tasks: [
                    ...state.tasks.slice(0, index),
                    {
                        ...state.tasks[index],
                        complete: true
                    },
                    ...state.tasks.slice(index + 1)
                ]
            };

        }

        default: {
            return state || _defaultState;
        }

    }

};
