import { MockedProvider } from '@apollo/client/testing'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import {
  CartAddLinesMock,
  CartMock,
  CatalogueMockAccessoriesYouMightLike,
  CatalogueMockRandom,
  CatalogueMockSimilar,
  ProductMock,
  ProductMockAccessory,
  ProductMockError,
  ProductMockWithCustomMetadata,
  ProductMockWithCustomMetadataNoAroma,
} from 'src/_mocks'
import { CartContext } from 'src/components'
import { CartProvider, Navigation, NavigationTheme } from 'src/components'
import { i18n } from 'src/config'

import { Product } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.history
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.history = { go: jest.fn() }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '7655228866776',
  }),
}))

jest.mock('src/components/Carousel/Carousel', () => ({
  Carousel: () => {
    return <div>Carousel here</div>
  },
}))

describe('Product view', () => {
  it('Renders correctly for a successful call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadata, CatalogueMockSimilar]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for a successful call without aroma', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataNoAroma, CatalogueMockSimilar]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for a successful call without custom metadata', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[ProductMock]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
  })

  it('The user can change the grind type', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[ProductMockWithCustomMetadata]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    const button = await screen.findAllByTestId('button-listbox')
    expect(button[0]).toBeInTheDocument()
    await waitFor(async () => {
      fireEvent.click(button[0])
      const option = screen.getByTestId('option-1')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
  })

  it('The user can change the package size', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[ProductMockWithCustomMetadata]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    const button = await screen.findAllByTestId('button-listbox')
    expect(button[1]).toBeInTheDocument()
    await waitFor(async () => {
      fireEvent.click(button[1])
      const option = screen.getByTestId('option-1')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
  })

  it('The user can change the quantity', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[ProductMockWithCustomMetadata]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    const button = await screen.findByTestId('quantity-plus')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
  })

  it('The user can add to cart a couple of times', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[ProductMockWithCustomMetadata]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    const buttons = await screen.findAllByTestId('addToCart')
    expect(buttons[0]).toBeInTheDocument()
    fireEvent.click(buttons[0])
    fireEvent.click(buttons[0])
  })

  it('Renders correctly for an error call on product', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[ProductMockError]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const buttonPrompt = await screen.findByTestId('button-prompt')
    expect(buttonPrompt).toBeInTheDocument()
    fireEvent.click(buttonPrompt)
  })

  it('Add to cart notification works', async () => {
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
              <Navigation theme={NavigationTheme.Shop} />
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
    await act(async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })
  })

  it('The user can scroll', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[ProductMockWithCustomMetadata]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/7655228866776']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    fireEvent.scroll(window, { target: { scrollY: 250 } })
    fireEvent.scroll(window, { target: { scrollY: 500 } })
    fireEvent.scroll(window, { target: { scrollY: 750 } })
    fireEvent.scroll(window, { target: { scrollY: 1000 } })
    const buttons = await screen.findAllByTestId('addToCart')
    expect(buttons[0]).toBeInTheDocument()
    fireEvent.click(buttons[0])
  })

  it('Renders correctly for a accessories', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockAccessory, CatalogueMockRandom, CatalogueMockAccessoriesYouMightLike]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/product/123456789']}>
              <Product />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })
})
