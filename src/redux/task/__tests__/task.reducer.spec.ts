import {taskReducer} from "../task.reducer";
import {TaskDispatchActions} from "../task.action";
import {Task, TaskState} from "../task.def";

describe('task.reducer', () => {

    const _defaultState: TaskState = {
        tasks: []
    };

    it('should add task', () => {

        const id = `${new Date().getTime()}`;
        const task: Task = {
            id,
            text: ''
        };

        expect(taskReducer(_defaultState, TaskDispatchActions.addTask(task)))
            .toEqual({
                tasks: [task]
            });

    });

    it('should set task complete', () => {

        const id = 'test_id';
        const task: Task = {
            id,
            text: 'This is a test'
        };

        const state: TaskState = {
            tasks: [task]
        };

        expect(taskReducer(state, TaskDispatchActions.setTaskComplete(id)))
            .toEqual({
                tasks: [{
                    ...task,
                    complete: true
                }]
            });

    });

    it('should remove task', () => {

        const id = 'test_id';
        const task: Task = {
            id,
            text: 'This is a test'
        };

        const state: TaskState = {
            tasks: [task]
        };

        expect(taskReducer(state, TaskDispatchActions.removeTask(id)))
            .toEqual({
                tasks: []
            });

    });

});
