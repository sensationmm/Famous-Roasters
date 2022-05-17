import { MockedProvider } from '@apollo/client/testing'
import { act, render } from '@testing-library/react'
import React from 'react'
import { CartMock } from 'src/_mocks'

import { CartProvider } from '.'

describe('Cart provider component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock]}
        addTypename={false}
      >
        <CartProvider>
          <span />
        </CartProvider>
      </MockedProvider>,
    )
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with persistent cartId', async () => {
    window.localStorage.setItem('cartId', '"gid://shopify/Cart/123456789"')
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock]}
        addTypename={false}
      >
        <CartProvider>
          <span />
        </CartProvider>
      </MockedProvider>,
    )
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
    expect(container).toMatchSnapshot()
    window.localStorage.removeItem('cartId')
  })
})
