import {Task, TaskActions, TaskActionTypes} from './task.def';

export namespace TaskDispatchActions {

    /**
     * Adds a task
     *
     * @param {Task} task
     */
    export const addTask = (task: Task): TaskActions[typeof TaskActionTypes.ADD] => ({
        type: TaskActionTypes.ADD,
        task
    });

    /**
     * Complete task
     *
     * @param {string} id
     */
    export const completeTask = (id: string): TaskActions[typeof TaskActionTypes.COMPLETE_TASK] => ({
        type: TaskActionTypes.COMPLETE_TASK,
        id
    });

    export const createTask = (task: string): TaskActions[typeof TaskActionTypes.CREATE_TASK] => ({
        type: TaskActionTypes.CREATE_TASK,
        task
    });

    /**
     * Sets the task as complete
     *
     * @param {Task} id
     */
    export const setTaskComplete = (id: string): TaskActions[typeof TaskActionTypes.SET_TASK_COMPLETE] => ({
        type: TaskActionTypes.SET_TASK_COMPLETE,
        id
    });

    /**
     * Removes a task
     *
     * @param {number} id
     */
    export const removeTask = (id: string): TaskActions[typeof TaskActionTypes.REMOVE] => ({
        type: TaskActionTypes.REMOVE,
        id
    });

}
