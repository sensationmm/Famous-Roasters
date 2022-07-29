import { loader } from 'graphql.macro'
const ORDERS = loader('src/graphql/queries/orders.query.graphql')

export const OrdersMock = {
  request: {
    query: ORDERS,
  },
  result: {
    data: {
      orders: [
        {
          id: '123456',
          shopifyId: '123456',
        },
        {
          id: '234567',
          shopifyId: '234567',
        },
        {
          id: '345678',
          shopifyId: '345678',
        },
      ],
    },
  },
}
