import { SchedulerLike } from 'rxjs';

export type EpicDependencies = {
    readonly scheduler: SchedulerLike;
};
