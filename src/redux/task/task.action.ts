import { Task, TaskActions, TaskActionTypes } from './task.def';

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
     * Sets the task as complete
     *
     * @param {Task} id
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
