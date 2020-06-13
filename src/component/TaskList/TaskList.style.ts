import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

export type TaskListCssKey =
    'control' |
    'fab';

export const taskListStyles =
    (theme: Theme): StyleRules<EmptyRecord, TaskListCssKey> =>
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
