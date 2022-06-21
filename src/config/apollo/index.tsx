import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

export const storeFrontClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Collection: {
          keyFields: ['id'],
        },
      },
    }),

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

export const famousRoastersClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      createHttpLink({
        uri: process.env.REACT_APP_FAMOUS_ROASTERS_GRAPHQL_ENDPOINT,
        fetch,
      }) as unknown as ApolloLink,
    ]),
  })
}
