import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getGraphQLEndpoint } from '../util/config.util';
import { getLogger } from '../util/log.util';

const _log = getLogger('apollo');

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
const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors || networkError) {

        graphQLErrors.forEach(({message}) => {

            _log.error(message);

            // TODO: do something with the errors

        });

    }
});

// assemble and export the client
export const apolloClient: ApolloClient<any> = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        errorLink,
        httpLink,
        requestLink
    ]),
    defaultOptions: {}
});
