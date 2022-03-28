import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

export const apolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
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
