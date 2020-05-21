/**
 * Gets the Google Analytics ID
 */
export const getGoogleAnalyticsId = (): string => process.env.GOOGLE_ANALYTICS_ID;

/**
 * Returns the GraphQL endpoint
 * @returns {string}
 */
export const getGraphQLEndpoint = (): string => process.env.GRAPHQL_ENDPOINT;
