import {getGraphQLEndpoint} from "../env.util";

describe('environment', () => {

    test('getGraphQLEndpoint', () => {

        const GRAPHQL_ENDPOINT = 'foobar';

        (global as any).environment = {
            graphqlEndpoint: GRAPHQL_ENDPOINT
        };

        expect(getGraphQLEndpoint()).toBe(GRAPHQL_ENDPOINT);

    });

});
