import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { CatalogueMockSimilar } from 'src/_mocks'
import { i18n } from 'src/config'

import { FindSimilar } from '.'

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

describe('Find similar partial view', () => {
  it('Renders correctly for a successful call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CatalogueMockSimilar]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/product/7655228866776']}>
            <FindSimilar aroma="experimentell & komplex" productId="7655228866776" />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for a successful call not excluding', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'network-only' } }}
        mocks={[CatalogueMockSimilar]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/product/7655228866776']}>
            <FindSimilar aroma="experimentell & komplex" productId="12345678" />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 500)))
    expect(container).toMatchSnapshot()
  })
})
