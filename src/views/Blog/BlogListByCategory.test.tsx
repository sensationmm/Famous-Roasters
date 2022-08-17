import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { BlogListByCategoryEmptyMock, BlogListByCategoryMock, BlogListByCategoryMockError } from 'src/_mocks'
import { i18n } from 'src/config'

import { BlogListByCategory } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.history
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.history = { go: jest.fn() }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
}))

describe('Blog Category List View', () => {
  it('Renders correctly when results found', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[BlogListByCategoryMock, BlogListByCategoryMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <BlogListByCategory />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly when no results found', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[BlogListByCategoryEmptyMock, BlogListByCategoryMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <BlogListByCategory />
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
        mocks={[BlogListByCategoryMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <BlogListByCategory />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })
})
