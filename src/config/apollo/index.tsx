import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { fromUnixTime, isFuture } from 'date-fns/esm'
import jwtDecode, { JwtPayload } from 'jwt-decode'

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

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_FAMOUS_ROASTERS_GRAPHQL_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken')
  // return the headers to the context so httpLink can read them

  const tokenValid = token && isFuture(fromUnixTime((jwtDecode(token) as JwtPayload)?.exp as number))

  return {
    headers: {
      ...headers,
      authorization: tokenValid ? `Bearer ${token}` : '',
    },
  }
})

export const famousRoastersClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
}

export const hygraphClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.REACT_APP_HYGRAPH_CONTENT_GRAPHQL_ENDPOINT,
  })
}
