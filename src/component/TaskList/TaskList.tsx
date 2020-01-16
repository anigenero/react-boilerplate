import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
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
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AppLocale } from '../../assets/locale/generated';
import { AppState } from '../../redux/app.state';
import { TaskDispatchActions } from '../../redux/task/task.action';
import { Task } from '../../redux/task/task.def';
import { taskListStyles } from './TaskList.style';

const useStyles = makeStyles(taskListStyles);

export const TaskList: FunctionComponent<{ edit: boolean }> = ({edit}) => {

    const classes = useStyles({});

    const [text, setText] = useState('');

    const dispatch = useDispatch();
    const props = useSelector<AppState, { tasks: Task[] }>(({task: {tasks = []}}) => ({
        tasks
    }));

    return (
        <>
            <List>
                {props.tasks.map((task, index) => (
                    <ListItem key={index}>

                        <ListItemText primary={task.text}/>

                        {!edit && (
                            <ListItemIcon>
                                <IconButton size="small" color={!task.complete ? 'default' : 'primary'} className={classes.fab}
                                            onClick={() => dispatch(TaskDispatchActions.setTaskComplete(index))}>
                                    <CheckIcon/>
                                </IconButton>
                            </ListItemIcon>
                        )}

                        {edit && (
                            <ListItemIcon>
                                <IconButton size="small" className={classes.fab}
                                            onClick={() => dispatch(TaskDispatchActions.removeTask(index))}>
                                    <CloseIcon/>
                                </IconButton>
                            </ListItemIcon>
                        )}

                    </ListItem>
                ))}
            </List>

            <Toolbar>

                <form onSubmit={(evt) => {

                    evt.preventDefault();

                    dispatch(TaskDispatchActions.addTask({text, complete: false}));
                    setText('');

                }} style={{display: 'flex', flex: 1}}>

                    <TextField label={<Translate id={AppLocale.task.placeholder}/>} name="task"
                               value={text} onChange={({target: {value}}) => setText(value)}
                               required classes={{root: classes.control}}/>

                    <Button disabled={isEmpty(text)} type="submit">
                        <Translate id={AppLocale.task.submit}/>
                    </Button>

                </form>

            </Toolbar>

        </>
    );

};
