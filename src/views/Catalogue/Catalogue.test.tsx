import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { CatalogueMockError, CatalogueMockMissingData,CatalogueMocks } from 'src/_mocks'
import { i18n } from 'src/config'

import { Catalogue } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.history
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.history = { go: jest.fn() }

describe('Catalogue view', () => {
  it('Renders correctly for a successful call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={CatalogueMocks}
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

  it('The user can navigate across tabs', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={CatalogueMocks}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <Catalogue />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    const tabForYou = await screen.findByTestId('tab-forYou')
    const tabDiscover = await screen.findByTestId('tab-discover')
    expect(tabForYou).toBeInTheDocument()
    expect(tabDiscover).toBeInTheDocument()
    fireEvent.click(tabForYou)
    fireEvent.click(tabDiscover)
  })

  it('The user can use sorting', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={CatalogueMocks}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <Catalogue />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(async () => {
      const button = await screen.findByTestId('button-listbox')
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-0')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(async () => {
      const button = await screen.findByTestId('button-listbox')
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-1')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(async () => {
      const button = await screen.findByTestId('button-listbox')
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-2')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(async () => {
      const button = await screen.findByTestId('button-listbox')
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-3')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
  })

  it('The user can use pagination', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={CatalogueMocks}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <Catalogue />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(async () => {
      const button = await screen.findByTestId('pagination-next')
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
    await waitFor(async () => {
      const button = await screen.findByTestId('pagination-previous')
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
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
    const buttonPrompt = await screen.findByTestId('button-prompt')
    expect(buttonPrompt).toBeInTheDocument()
    fireEvent.click(buttonPrompt)
  })

  it('Renders correctly for a successful call with missing data', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[CatalogueMockMissingData]}
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
