import { ITask, TaskActions, TaskActionTypes } from './task.def';

export namespace TaskDispatchActions {

    /**
     * Adds a task
     *
     * @param {ITask} task
     */
    export const addTask = (task: ITask): TaskActions[typeof TaskActionTypes.ADD] => ({
        type: TaskActionTypes.ADD,
        task
    });

    /**
     * Sets the task as complete
     *
     * @param {ITask} id
     */
    export const setTaskComplete = (id: number): TaskActions[typeof TaskActionTypes.SET_TASK_COMPLETE] => ({
        type: TaskActionTypes.SET_TASK_COMPLETE,
        id
    });

    /**
     * Removes a task
     *
     * @param {number} id
     */
    export const removeTask = (id: number): TaskActions[typeof TaskActionTypes.REMOVE] => ({
        type: TaskActionTypes.REMOVE,
        id
    });

}
