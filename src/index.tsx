import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import App from './component/App/App';
import { apolloClient } from './graphql/apollo.client';
import { browserHistory, reduxStore } from './redux/redux.store';
import { register } from './registerServiceWorker';

register();

render((
    <Provider store={reduxStore}>
        <ConnectedRouter history={browserHistory}>
            <ApolloProvider client={apolloClient}>
                <LocalizeProvider store={reduxStore}>
                    <App/>
                </LocalizeProvider>
            </ApolloProvider>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
