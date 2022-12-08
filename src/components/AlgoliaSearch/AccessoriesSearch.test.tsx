import { render, waitFor } from '@testing-library/react'
import algoliasearch from 'algoliasearch'
import { I18nextProvider } from 'react-i18next'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import * as ReactRouterDom from 'react-router-dom'
import { i18n } from 'src/config'

import AccessoriesSearch from './AccessoriesSearch'

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || 'UJO1LDXRBG',
  process.env.REACT_APP_ALGOLIA_API_KEY || 'ae9617f85b12371cbdfbe18d4c727fcc',
)

const mockReactRouterDom = ReactRouterDom as { useParams: () => { productType?: string } }
jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    productType: 'accessories',
  }),
}))

describe('AccessoriesSearch view', () => {
  it('Renders correctly for accessories', async () => {
    const { container } = render(
      <ReactRouterDom.BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <InstantSearch indexName="products" searchClient={searchClient}>
            <AccessoriesSearch getDescription={jest.fn()} />
          </InstantSearch>
        </I18nextProvider>
      </ReactRouterDom.BrowserRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for other', async () => {
    mockReactRouterDom.useParams = () => ({
      productType: 'gifts',
    })
    const { container } = render(
      <ReactRouterDom.BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <InstantSearch indexName="products" searchClient={searchClient}>
            <AccessoriesSearch getDescription={jest.fn()} />
          </InstantSearch>
        </I18nextProvider>
      </ReactRouterDom.BrowserRouter>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
