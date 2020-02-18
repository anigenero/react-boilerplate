import { StandardProps, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import EditIcon from '@material-ui/icons/Edit';
import React, { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import englishTranslations from '../../assets/locale/en-US.json';
import { AppLocale } from '../../assets/locale/generated';
import { TaskList } from '../TaskList/TaskList';
import { AppCssKey, appStyles } from './App.style';

type AppComponentProps =
    StandardProps<HTMLAttributes<HTMLDivElement>, AppCssKey> &
    LocalizeContextProps;

const useClasses = makeStyles(appStyles);

export const App: FunctionComponent<AppComponentProps> =
    ({initialize, addTranslationForLanguage, ...props}) => {

        const classes = useClasses(props);

        const [edit, setEdit] = useState(false);

        useEffect(() => {

            initialize({
                languages: [{
                    code: 'en-US',
                    name: 'English (US)'
                }],
                options: {
                    defaultLanguage: 'en-US',
                    renderInnerHtml: false,
                    renderToStaticMarkup: false
                }
            });

            addTranslationForLanguage(englishTranslations, 'en-US');

        }, []);

        return (
            <>

                <AppBar position="sticky" className={classes.header}>
                    <Toolbar>

                        <Typography variant="h6" color="secondary" className={classes.title}>
                            <Translate id={AppLocale.app.longName}/>
                        </Typography>

                        <div className={classes.grow}/>

                        <IconButton color={edit ? 'secondary' : 'default'} onClick={() => setEdit(!edit)}>
                            <EditIcon/>
                        </IconButton>

                    </Toolbar>
                </AppBar>

                <TaskList edit={edit}/>

            </>
        );

    };

export default withLocalize(App);
