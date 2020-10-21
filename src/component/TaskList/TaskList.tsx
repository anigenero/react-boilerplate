import { StandardProps } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { isEmpty } from 'lodash';
import React, { FunctionComponent, HTMLAttributes, useState } from 'react';
import { useValidation } from 'react-class-validator';
import { Translate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppLocale } from '../../assets/locale/generated';
import { AppState } from '../../redux/app.state';
import { TaskDispatchActions } from '../../redux/task/task.action';
import { Task } from '../../redux/task/task.def';
import { helperText } from '../../util/message.util';
import { TaskListCssKey, taskListStyles } from './TaskList.style';
import { TaskListValidation } from './TaskList.validation';

type TaskListComponentProps =
    StandardProps<HTMLAttributes<HTMLDivElement>, TaskListCssKey> &
    {
        edit: boolean;
    };

type SelectorProps = {
    tasks: Task[];
};

const useStyles = makeStyles(taskListStyles);

export const TaskList: FunctionComponent<TaskListComponentProps> = ({edit, ...props}) => {

    const classes = useStyles(props);

    const [text, setText] = useState('');

    const [validate, validationErrors] = useValidation(TaskListValidation);

    const dispatch = useDispatch();
    const selector = useSelector<AppState, SelectorProps>(
        ({task: {tasks = []}}) => ({
            tasks
        })
    );

    return (
        <>

            <List>
                {selector.tasks.map((task, index) => (
                    <ListItem key={index}>

                        <ListItemText primary={task.text}/>

                        {!edit && (
                            <ListItemIcon>
                                <IconButton size="small" color={!task.complete ? 'default' : 'primary'}
                                            className={classes.fab}
                                            onClick={() => dispatch(TaskDispatchActions.completeTask(task.id))}>
                                    <CheckIcon/>
                                </IconButton>
                            </ListItemIcon>
                        )}

                        {edit && (
                            <ListItemIcon>
                                <IconButton size="small" className={classes.fab}
                                            onClick={() => dispatch(TaskDispatchActions.removeTask(task.id))}>
                                    <CloseIcon/>
                                </IconButton>
                            </ListItemIcon>
                        )}

                    </ListItem>
                ))}
            </List>

            <Toolbar>

                <form onSubmit={async (evt) => {

                    evt.preventDefault();

                    if (await validate({task: text})) {
                        dispatch(TaskDispatchActions.createTask(text));
                        setText('');
                    }

                }} style={{display: 'flex', flex: 1}}>

                    <TextField label={<Translate id={AppLocale.task.placeholder}/>} name="task"
                               value={text} onChange={({target: {value}}) => setText(value)}
                               required classes={{root: classes.control}}
                               helperText={helperText(validationErrors.task)}
                               error={!isEmpty(validationErrors.task)}/>

                    <Button disabled={isEmpty(text)} type="submit">
                        <Translate id={AppLocale.task.submit}/>
                    </Button>

                </form>

            </Toolbar>

        </>
    );

};
