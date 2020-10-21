import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { ValidatorProvider } from 'react-class-validator';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './component/App/App';
import { browserHistory, persistor, reduxStore } from './redux/redux.store';
import { registerServiceWorker } from './register.sw';
import { theme } from './theme/theme';

void registerServiceWorker().catch(() => {
    // do nothing
});

render((
    <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={browserHistory}>
                <LocalizeProvider store={reduxStore}>
                    <ValidatorProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            <App/>
                        </ThemeProvider>
                    </ValidatorProvider>
                </LocalizeProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
), document.getElementById('root'));
