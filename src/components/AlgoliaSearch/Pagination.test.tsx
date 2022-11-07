import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-hooks-web'

import Pagination from './Pagination'

describe('Pagination component', () => {
  const snippet = () => (
    <InstantSearch
      indexName="products"
      searchClient={{
        async search() {
          return {
            results: [
              {
                hits: [
                  { id: 'result1' } as any,
                  { id: 'result2' } as any,
                  { id: 'result3' } as any,
                  { id: 'result4' } as any,
                  { id: 'result5' } as any,
                  { id: 'result6' } as any,
                  { id: 'result7' } as any,
                  { id: 'result8' } as any,
                  { id: 'result9' } as any,
                  { id: 'result10' } as any,
                ],
                page: 2,
                nbHits: 10,
                nbPages: 3,
                hitsPerPage: 3,
                processingTimeMS: 1,
                exhaustiveNbHits: true,
                query: '',
                params: '',
              },
            ],
          }
        },
      }}
    >
      <Pagination />
    </InstantSearch>
  )

  it('Renders correctly', async () => {
    const { container } = render(snippet())
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
