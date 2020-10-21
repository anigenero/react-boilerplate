import { IsNotEmpty } from 'class-validator';
import { AppLocale } from '../../assets/locale/generated';

export class TaskListValidation {

    @IsNotEmpty({
        message: AppLocale.task.validation.taskEmpty
    })
    public task: string;

}
