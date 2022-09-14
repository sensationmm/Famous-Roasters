import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import * as instantsearch from 'react-instantsearch-hooks-web'
import { i18n } from 'src/config'

import Stats from './Stats'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.history
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.history = { go: jest.fn() }

const mockInstantSearch = instantsearch as { useInstantSearch: () => { results: { nbHits: number | undefined } } }
jest.mock('react-instantsearch-hooks-web', () => ({
  __esModule: true,
  ...jest.requireActual('react-instantsearch-hooks-web'),
  useInstantSearch: () => ({
    results: {
      nbHits: 1000,
    },
  }),
}))

describe('Stats component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Stats />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for zero results', async () => {
    mockInstantSearch.useInstantSearch = () => ({
      results: {
        nbHits: 0,
      },
    })
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Stats />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Handles failure', async () => {
    mockInstantSearch.useInstantSearch = () => ({
      results: {
        nbHits: undefined,
      },
    })
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Stats />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
