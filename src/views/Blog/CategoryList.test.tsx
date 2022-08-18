import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { BlogCategoryListMock, BlogCategoryListMockError } from 'src/_mocks'
import { i18n } from 'src/config'

import { CategoryList } from '.'

describe('Blog Category List View', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[BlogCategoryListMock, BlogCategoryListMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <CategoryList />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('handles error', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[BlogCategoryListMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <CategoryList />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })
})
