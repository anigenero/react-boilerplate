import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './component/App/App';
import './google.analytics';
import { apolloClient } from './graphql/apollo.client';
import { browserHistory, persistor, reduxStore } from './redux/redux.store';
import { register } from './registerServiceWorker';
import { theme } from './theme';

register();

render((
    <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={browserHistory}>
                <ApolloProvider client={apolloClient}>
                    <LocalizeProvider store={reduxStore}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            <App/>
                        </ThemeProvider>
                    </LocalizeProvider>
                </ApolloProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
), document.getElementById('root'));
