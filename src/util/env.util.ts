/**
 * Gets the environment. We use this as a function because webpack will superimpose
 * the JSON object over every "environment" instance in the code
 *
 * @returns {IEnvironment}
 * @private
 */
const _getEnvironment = (): IEnvironment => environment;

/**
 * Returns the GraphQL endpoint
 * @returns {string}
 */
export const getGraphQLEndpoint = (): string => _getEnvironment().graphqlEndpoint;