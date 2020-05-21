import {TaskDispatchActions} from "../task.action";
import {TestScheduler} from "rxjs/testing";
import {epicMockDependencies, frames} from "../../../__testutils__/epic.tester";
import {AppState} from "../../app.state";
import {TaskEpics} from "../task.epic";
import {Task} from "../task.def";

describe('task.epic', () => {

    it('should create task', async () => {

        const _dateInstance = new Date('2019-05-14T11:01:58.135Z');

        jest.spyOn(global, 'Date')
            .mockImplementationOnce(() => _dateInstance as any);

        const task = 'this is a test';

        const testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });

        testScheduler.run(({hot, expectObservable}) => {

            const action$ = hot('-a', {
                a: TaskDispatchActions.createTask(task)
            });
            const state$: any = null;

            const output$ = TaskEpics.createTask(action$ as any, state$ as any, epicMockDependencies(testScheduler));

            expectObservable(output$).toBe(`-a`, {
                a: TaskDispatchActions.addTask({id: `${_dateInstance.getTime()}`, text: task}),
            });

        });

    });

    it('should create task', async () => {

        const _dateInstance = new Date('2019-05-14T11:01:58.135Z');

        jest.spyOn(global, 'Date')
            .mockImplementationOnce(() => _dateInstance as any);

        const id = 'test_id';
        const task: Task = {
            id,
            text: 'this is a test'
        };

        const testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });

        testScheduler.run(({hot, expectObservable}) => {

            const action$ = hot('-a', {
                a: TaskDispatchActions.completeTask(task.id)
            });
            const state$: AppState = null;

            const output$ = TaskEpics.markTaskComplete(action$ as any, state$ as any, epicMockDependencies(testScheduler));

            expectObservable(output$).toBe(`-a${frames(2999)}b`, {
                a: TaskDispatchActions.setTaskComplete(task.id),
                b: TaskDispatchActions.removeTask(task.id)
            });

        });

    });

});
