import {Epic, ofType} from 'redux-observable';
import {of, merge} from 'rxjs';
import {delay, mergeMap, switchMap} from 'rxjs/operators';
import {AppState} from '../app.state';
import {EpicDependencies} from '../epic.def';
import {TaskDispatchActions} from './task.action';
import {TaskAction, TaskActions, TaskActionTypes} from './task.def';

export namespace TaskEpics {

    export const createTask: Epic<TaskAction, TaskAction, AppState, EpicDependencies> =
        (action$) =>
            action$.pipe(
                ofType(TaskActionTypes.CREATE_TASK),
                switchMap(({task}: TaskActions[typeof TaskActionTypes.CREATE_TASK]) =>
                    of(TaskDispatchActions.addTask({
                        id: `${new Date().getTime()}`,
                        text: task
                    }))
                )
            );

    export const markTaskComplete: Epic<TaskAction, TaskAction, AppState, EpicDependencies> =
        (action$, _state$, {scheduler}) =>
            action$.pipe(
                ofType(TaskActionTypes.COMPLETE_TASK),
                mergeMap(({id}: TaskActions[typeof TaskActionTypes.COMPLETE_TASK]) =>
                    merge(
                        of(TaskDispatchActions.setTaskComplete(id)),
                        of(null).pipe(
                            delay(3000, scheduler),
                            mergeMap(() => of(TaskDispatchActions.removeTask(id)))
                        )
                    )
                )
            );


}
