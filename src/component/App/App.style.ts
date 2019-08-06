import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const appStyles = (theme: Theme) =>
    createStyles({
        grow: {
            flex: 1
        },
        header: {
            boxShadow: theme.shadows[2]
        },
        title: {
            fontWeight: 'bold'
        },
    });
