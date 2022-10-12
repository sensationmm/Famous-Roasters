import { render, waitFor } from '@testing-library/react'
import algoliasearch from 'algoliasearch'
import { I18nextProvider } from 'react-i18next'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { BrowserRouter as Router } from 'react-router-dom'
import { i18n } from 'src/config'

import AccessoriesSearch from './AccessoriesSearch'

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || '',
  process.env.REACT_APP_ALGOLIA_API_KEY || '',
)

describe('AccessoriesSearch view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <InstantSearch indexName="products" searchClient={searchClient}>
            <AccessoriesSearch />
          </InstantSearch>
        </I18nextProvider>
      </Router>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
