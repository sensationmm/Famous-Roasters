import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { CatalogueMock, CatalogueMockError } from 'src/_mocks'
import { i18n } from 'src/config'

import { Catalogue } from '.'

describe('Catalogue view', () => {
  it('Renders correctly for a successful call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[CatalogueMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <Catalogue />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for an error call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[CatalogueMockError]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <Catalogue />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
