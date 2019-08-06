import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const taskListStyles = (theme: Theme) =>
    createStyles({
        control: {
            width: '100%',
            margin: 0,
            padding: 0
        },
        fab: {
            boxShadow: theme.shadows[0]
        }
    });
