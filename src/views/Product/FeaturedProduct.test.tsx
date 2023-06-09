import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import Router, { MemoryRouter } from 'react-router-dom'
import { ProductMock, ProductMockError, ProductMockWithCustomMetadata } from 'src/_mocks'
import { CartContext } from 'src/components'
import { i18n } from 'src/config'

import { FeaturedProduct } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.history
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.history = { go: jest.fn() }
window.localStorage.setItem(
  'tasteFinder',
  JSON.stringify(
    '[{"name":"aroma","value":"experimentell & komplex"},{"name":"name","value":"Torrefattore"},{"name":"bitterness","value":"1"},{"name":"sweetness","value":"1"},{"name":"acidity","value":"1"},{"name":"body","value":"1"},{"name":"grindType","value":"FrenchPress"},{"name":"adventurous","value":"adventurous"},{"name":"shopifyProductIds","value":["7966736744714","7659871600856","7659907842264","7659906203864","7966820630794","7659905745112"]},    {"name":"recommendations","value": [{"shopifyId":"7966737858826","score":0.9814814814814815,"acidity":4,"bitterness":1,"sweetness":2,"body":3},{"shopifyId":"7966736875786","score":0.9567901234567902,"acidity":1,"bitterness":1,"sweetness":1,"body":1},{"shopifyId":"7966738678026","score":0.9351851851851852,"acidity":1,"bitterness":1,"sweetness":3,"body":4},{"shopifyId":"7966738448650","score":0.9320987654320988,"acidity":3,"bitterness":1,"sweetness":2,"body":6},{"shopifyId":"7659877466328","score":0.9074074074074074,"acidity":5,"bitterness":5,"sweetness":5,"body":5},{"shopifyId":"7659914723544","score":0.8950617283950617,"acidity":3,"bitterness":4,"sweetness":5,"body":6}]}]',
  ),
)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '7655228866776',
  }),
}))

describe('Featured product view', () => {
  it('Renders correctly for a successful call with aroma experimental', async () => {
    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'experimentell & komplex',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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

  it('Renders correctly for a successful call with aroma floral', async () => {
    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'Floral & leicht',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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

  it('Renders correctly for a successful call with aroma fruits', async () => {
    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'Fruchtig & lebhaft',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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

  it('Renders correctly for a successful call with aroma chocolate', async () => {
    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'Nussig & schokoladig',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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

  it('Renders correctly for a successful call with aroma spicy', async () => {
    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'Würzig & kräftig',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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
    const ProductMockWithCustomMetadataWithoutAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: null,
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataWithoutAroma]}
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

  it('Renders correctly when user name is missing', async () => {
    window.localStorage.setItem(
      'tasteFinder',
      JSON.stringify(
        '[{"name":"bitterness","value":"1"},{"name":"sweetness","value":"1"},{"name":"acidity","value":"1"},{"name":"body","value":"1"},{"name":"grindType","value":"FrenchPress"},{"name":"adventurous","value":"adventurous"},{"name":"shopifyProductIds","value":["7966736744714","7659871600856","7659907842264","7659906203864","7966820630794","7659905745112"]},    {"name":"recommendations","value": [{"shopifyId":"7966737858826","score":0.9814814814814815,"acidity":4,"bitterness":1,"sweetness":2,"body":3},{"shopifyId":"7966736875786","score":0.9567901234567902,"acidity":1,"bitterness":1,"sweetness":1,"body":1},{"shopifyId":"7966738678026","score":0.9351851851851852,"acidity":1,"bitterness":1,"sweetness":3,"body":4},{"shopifyId":"7966738448650","score":0.9320987654320988,"acidity":3,"bitterness":1,"sweetness":2,"body":6},{"shopifyId":"7659877466328","score":0.9074074074074074,"acidity":5,"bitterness":5,"sweetness":5,"body":5},{"shopifyId":"7659914723544","score":0.8950617283950617,"acidity":3,"bitterness":4,"sweetness":5,"body":6}]}]',
      ),
    )
    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'experimentell & komplex',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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
    await waitFor(() => new Promise((res) => setTimeout(res, 700)))
    const buttonPrompt = await screen.findByTestId('button-prompt')
    expect(buttonPrompt).toBeInTheDocument()
    fireEvent.click(buttonPrompt)
  })

  it('fails gracefully if no id exists', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: undefined })
    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              ...ProductMockWithCustomMetadata.result.data.product.images,
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'experimentell & komplex',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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

  it('renders as expected if no taste finder data exists', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'espresso-raritaten-set' })
    window.localStorage.setItem('tasteFinder', JSON.stringify(''))

    const ProductMockWithCustomMetadataOtherAroma = {
      ...ProductMockWithCustomMetadata,
      result: {
        data: {
          product: {
            ...ProductMockWithCustomMetadata.result.data.product,
            images: {
              nodes: [
                {
                  id: '123123',
                  url: 'https://cdn.shopify.com/s/files/1/0632/7251/7848/products/ezgif-4-d921ab2e2b.png?v=1649246153',
                  originalSrc: '',
                  src: '',
                  transformedSrc: '',
                },
              ],
            },
            aroma: {
              value: 'experimentell & komplex',
            },
          },
        },
      },
    }
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[ProductMockWithCustomMetadataOtherAroma]}
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
})
