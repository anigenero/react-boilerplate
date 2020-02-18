import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

export type AppCssKey =
    'grow' |
    'header' |
    'title';

export const appStyles =
    (theme: Theme): StyleRules<{}, AppCssKey> =>
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
