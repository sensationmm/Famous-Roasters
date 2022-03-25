import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

export const apolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message: errorMessage, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${errorMessage}, Location: ${locations}, Path: ${path}`)
      })

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      createHttpLink({
        uri: process.env.REACT_APP_SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT,
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          Accept: 'application/graphql',
        },
        fetch,
      }) as unknown as ApolloLink,
    ]),
  })
}
