import { MockedProvider } from '@apollo/client/testing'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import {
  CartAddLinesMock,
  CartCreateMock,
  CartLinesRemoveMock,
  CartLinesRemoveMock2,
  CartLinesUpdateMock,
  CartMock,
  ProductMockWithCustomMetadata,
} from 'src/_mocks'
import { i18n } from 'src/config'
import { Cart } from 'src/views'
import { Product } from 'src/views'

import { CartProvider } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '7655228866776',
  }),
}))

describe('Cart provider component', () => {
  afterEach(() => {
    window.localStorage.removeItem('cartId')
  })

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
  })

  it.skip('Handles modify quantity on cart', async () => {
    window.localStorage.setItem('cartId', '"gid://shopify/Cart/123456789"')
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock, CartMock, CartMock, CartLinesUpdateMock]}
        addTypename={false}
      >
        <CartProvider>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/cart']}>
              <Cart />
            </MemoryRouter>
          </I18nextProvider>
        </CartProvider>
      </MockedProvider>,
    )
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
    const buttons = await screen.findAllByTestId('quantity-plus')
    expect(buttons[0]).toBeInTheDocument()
    fireEvent.click(buttons[0])
  })

  it.skip('Handles remove item on cart', async () => {
    window.localStorage.setItem('cartId', '"gid://shopify/Cart/123456789"')
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock, CartMock, CartMock, CartLinesRemoveMock, CartLinesRemoveMock2]}
        addTypename={false}
      >
        <CartProvider>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/cart']}>
              <Cart />
            </MemoryRouter>
          </I18nextProvider>
        </CartProvider>
      </MockedProvider>,
    )
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
    const buttons = await screen.findAllByTestId('button-cart-item-remove')
    expect(buttons[0]).toBeInTheDocument()
    fireEvent.click(buttons[0])
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
    expect(buttons[1]).toBeInTheDocument()
    fireEvent.click(buttons[1])
  })

  it('Handles add product on pdp with existing cart', async () => {
    window.localStorage.setItem('cartId', '"gid://shopify/Cart/123456789"')
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CartMock, ProductMockWithCustomMetadata, CartAddLinesMock]}
        addTypename={false}
      >
        <CartProvider>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartProvider>
      </MockedProvider>,
    )
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
    const buttons = await screen.findAllByTestId('addToCart')
    expect(buttons[0]).toBeInTheDocument()
    fireEvent.click(buttons[0])
  })

  it('Handles add product on pdp with empty cart', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadata, CartCreateMock]}
        addTypename={false}
      >
        <CartProvider>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartProvider>
      </MockedProvider>,
    )
    const buttons = await screen.findAllByTestId('addToCart')
    expect(buttons[0]).toBeInTheDocument()
    fireEvent.click(buttons[0])
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
  })
})
