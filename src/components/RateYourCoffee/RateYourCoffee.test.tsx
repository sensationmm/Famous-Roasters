import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { OrderMock } from 'src/_mocks'
import { i18n } from 'src/config'

import { RateYourCoffee } from '.'

jest.mock('src/config', () => ({
  ...jest.requireActual('src/config'),
  storeFrontClient: () => ({
    query: () => Promise.resolve({ id: 'asdasd' }),
  }),
}))

describe('RateYourCoffee component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }} mocks={[]} addTypename={false}>
        <I18nextProvider i18n={i18n} data-testId="">
          <RateYourCoffee
            productOrderTile={{
              productId: OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node.product.id,
              node: OrderMock.result.data.orders.edges[0].node.lineItems.edges[0].node,
            }}
          />
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
