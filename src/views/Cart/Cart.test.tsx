import { MockedProvider } from '@apollo/client/testing'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { CartMock } from 'src/_mocks'
import { CartContext } from 'src/components'
import { i18n } from 'src/config'

import { Cart } from '.'

describe('Cart view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/cart']}>
              <Cart />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
    expect(container).toMatchSnapshot()
  })

  it('The user can modify quantity on cart items', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/cart']}>
              <Cart />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    const button = await screen.findByTestId('quantity-plus')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
  })

  it('The user can remove an item', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/cart']}>
              <Cart />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    const button = await screen.findByTestId('button-cart-item-remove')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
  })
})
