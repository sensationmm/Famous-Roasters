import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { BlogMock, BlogMockError } from 'src/_mocks'
import { i18n } from 'src/config'

import { Blog } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    slug: 'frenchpress',
    category: 'Kaffeewissen',
  }),
}))
describe('Blog View', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[BlogMock, BlogMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <Blog locale="de_de" />
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
        mocks={[BlogMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <Blog />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })
})
