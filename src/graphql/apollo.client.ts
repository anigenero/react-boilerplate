import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { getGraphQLEndpoint } from '../util/env.util';

const log = require('log4js2').getLogger('apollo');

/**
 * Creates the request link that points to the GraphQL endpoint
 *
 * @type {ApolloLink}
 */
const requestLink = createHttpLink({
    uri: getGraphQLEndpoint()
});

/**
 * Creates the context for the {HttpLink}. Use this to set headers (e.g. authentication)
 * and manipulate the outgoing request
 *
 * @type {ApolloLink}
 */
const httpLink: ApolloLink = setContext((_, {headers}) => ({
    headers: {
        ...headers,
        // 'authorization': `bearer ${getAuthorizationToken()}`,
    }
}));

/**
 * Handle any errors that come from GraphQL service
 *
 * @type {ApolloLink}
 */
const errorLink = onError(({operation, response, graphQLErrors, networkError}) => {
    if (graphQLErrors || networkError) {

        graphQLErrors.forEach(({message, locations, path}) => {
            log.error(message);
        });

    }
});

// assemble and export the client
export const apolloClient: ApolloClient<any> = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        httpLink,
        requestLink
    ]),
    cache: new InMemoryCache()
});
