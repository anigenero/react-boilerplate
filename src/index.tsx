import * as React from 'react';

import {render} from "react-dom";
import {ApolloProvider} from "react-apollo";
import {apolloClient} from "./graphql/apollo.client";
import {Provider} from "react-redux";
import reduxStore from "./redux/redux.store";
import App from "./component/App/App";
import {LocalizeProvider} from "react-localize-redux";

render((
    <ApolloProvider client={apolloClient}>
        <Provider store={reduxStore}>
            <LocalizeProvider>
                <App/>
            </LocalizeProvider>
        </Provider>
    </ApolloProvider>
), document.getElementById('root'));