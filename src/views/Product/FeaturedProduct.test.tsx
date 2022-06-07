import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import {
  CatalogueMockSimilar,
  ProductMock,
  ProductMockError,
  ProductMockWithCustomMetadata,
  ProductMockWithCustomMetadataNoAroma,
} from 'src/_mocks'
import { CartContext } from 'src/components'
import { i18n } from 'src/config'

import { FeaturedProduct } from '.'

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

describe('Featured product view', () => {
  it('Renders correctly for a successful call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadata]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/featured/7655228866776']}>
              <FeaturedProduct />
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
        mocks={[ProductMockWithCustomMetadataNoAroma]}
        addTypename={false}
      >
        <CartContext.Provider value={{ cartId: 'gid://shopify/Cart/123456789', cartSize: 1 }}>
          <I18nextProvider i18n={i18n}>
            <MemoryRouter initialEntries={['/featured/7655228866776']}>
              <FeaturedProduct />
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
            <MemoryRouter initialEntries={['/featured/7655228866776']}>
              <FeaturedProduct />
            </MemoryRouter>
          </I18nextProvider>
        </CartContext.Provider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
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
            <MemoryRouter initialEntries={['/featured/7655228866776']}>
              <FeaturedProduct />
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
})
