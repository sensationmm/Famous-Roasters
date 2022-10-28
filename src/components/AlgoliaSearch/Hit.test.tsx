import { render, waitFor } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProductMockData } from 'src/_mocks'
import { i18n } from 'src/config'

import Hit from './Hit'

describe('Hit component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Hit
            hit={{
              ...ProductMockData,
              image: 'https://example.com/image',
              product_image: 'https://example.com/product-image',
              inventory_quantity: 25,
              variants_inventory_count: 10,
              vendor: '19grams',
              variants_min_price: 5,
              variants_max_price: 10,
              variants_count: 10,
              inventory_management: 'shopify',
              meta: {
                my_fields: {
                  decaf: false,
                  origin: ['BR', 'CO'],
                  coffee_type: 'Filter',
                  price_per_kg: 10,
                },
              },
            }}
          />
        </I18nextProvider>
      </Router>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for decaf', async () => {
    const { container } = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Hit
            hit={{
              ...ProductMockData,
              image: 'https://example.com/image',
              product_image: 'https://example.com/product-image',
              inventory_quantity: 25,
              variants_inventory_count: 10,
              vendor: '19grams',
              variants_min_price: 5,
              variants_max_price: 10,
              variants_count: 10,
              inventory_management: 'shopify',
              meta: {
                my_fields: {
                  decaf: true,
                  origin: ['BR', 'CO'],
                  coffee_type: 'Filter',
                  price_per_kg: 10,
                },
              },
            }}
          />
        </I18nextProvider>
      </Router>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for out of stock', async () => {
    const { container } = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Hit
            hit={{
              ...ProductMockData,
              image: 'https://example.com/image',
              product_image: 'https://example.com/product-image',
              inventory_quantity: 0,
              variants_inventory_count: 0,
              vendor: '19grams',
              variants_min_price: 5,
              variants_max_price: 10,
              variants_count: 10,
              inventory_management: 'shopify',
              meta: {
                my_fields: {
                  decaf: false,
                  origin: ['BR', 'CO'],
                  coffee_type: 'Filter',
                  price_per_kg: 10,
                },
              },
            }}
          />
        </I18nextProvider>
      </Router>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
