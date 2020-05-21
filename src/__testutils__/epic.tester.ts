import {TestScheduler} from 'rxjs/testing';

export const frames = (n: number, unit: string = '-'): string =>
    (n === 1) ? unit : unit + frames(n - 1, unit);

export const epicMockDependencies = (testScheduler: TestScheduler) => ({
    scheduler: testScheduler
});
