import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { TestScheduler } from 'rxjs/testing';

export const frames = (n: number, unit: string = '-'): string =>
    (n === 1) ? unit : unit + frames(n - 1, unit);

export const epicMockServices = (testScheduler: TestScheduler) => ({
    scheduler: testScheduler
});

export function createTestAction$FromMarbles<A extends Action>(testScheduler: TestScheduler, marbles: string, values?: any) {
    return new ActionsObservable<A>(testScheduler.createHotObservable(marbles, values));
}
