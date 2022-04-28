import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import {
  CatalogueMockError,
  CatalogueMockMissingData,
  CatalogueMocks,
  CatalogueMocksPagination,
  CatalogueMocksPaginationWrongBackwards,
  CatalogueMocksPaginationWrongForwards,
  FilterAttributesMock,
} from 'src/_mocks'
import { i18n } from 'src/config'

import { Catalogue } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.history
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.history = { go: jest.fn() }

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = intersectionObserverMock

describe('Catalogue view', () => {
  it('Renders correctly for a successful call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
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
        mocks={[...CatalogueMocks, FilterAttributesMock]}
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

  it('The user can use pagination', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocksPagination, FilterAttributesMock]}
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
      const next = await screen.findByTestId('pagination-next')
      expect(next).toBeInTheDocument()
      expect(next).not.toHaveAttribute('disabled')
      fireEvent.click(next)
    })

    await waitFor(async () => {
      const prev = await screen.findByTestId('pagination-previous')
      expect(prev).toBeInTheDocument()
      expect(prev).not.toHaveAttribute('disabled')
      fireEvent.click(prev)
    })
  })

  it('The user can not use pagination forwards', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocksPaginationWrongForwards, FilterAttributesMock]}
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
      const next = await screen.findByTestId('pagination-next')
      expect(next).toBeInTheDocument()
      expect(next).not.toHaveAttribute('disabled')
      fireEvent.click(next)
    })

    await waitFor(async () => {
      const prev = await screen.findByTestId('pagination-previous')
      expect(prev).toBeInTheDocument()
      expect(prev).toHaveAttribute('disabled')
      fireEvent.click(prev)
    })
  })

  it('The user can not use pagination backwards', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocksPaginationWrongBackwards, FilterAttributesMock]}
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
      const next = await screen.findByTestId('pagination-next')
      expect(next).toBeInTheDocument()
      expect(next).not.toHaveAttribute('disabled')
      fireEvent.click(next)
    })

    await waitFor(async () => {
      const prev = await screen.findByTestId('pagination-previous')
      expect(prev).toBeInTheDocument()
      expect(prev).not.toHaveAttribute('disabled')
      fireEvent.click(prev)
    })
  })

  it('The user can use sorting', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
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
      const button = await screen.findAllByTestId('button-listbox')
      expect(button[4]).toBeInTheDocument()
      fireEvent.click(button[4])
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-0')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(async () => {
      const button = await screen.findAllByTestId('button-listbox')
      expect(button[4]).toBeInTheDocument()
      fireEvent.click(button[4])
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-1')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(async () => {
      const button = await screen.findAllByTestId('button-listbox')
      expect(button[4]).toBeInTheDocument()
      fireEvent.click(button[4])
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-2')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
    await waitFor(async () => {
      const button = await screen.findAllByTestId('button-listbox')
      expect(button[4]).toBeInTheDocument()
      fireEvent.click(button[4])
    })
    await waitFor(() => {
      const option = screen.getByTestId('option-3')
      expect(option).toBeInTheDocument()
      fireEvent.click(option)
    })
  })

  it('The user can use filtering', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
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
      const buttonOpen = await screen.findByTestId('button-filters-menu-open')
      expect(buttonOpen).toBeInTheDocument()
      fireEvent.click(buttonOpen)
    })
    await waitFor(async () => {
      const buttonFilter = await screen.findByTestId('button-filter-mobile-vendor')
      expect(buttonFilter).toBeInTheDocument()
      fireEvent.click(buttonFilter)
    })
    await waitFor(async () => {
      const buttonFilterOption1 = await screen.findByTestId('button-filter-mobile-vendor-option-0')
      expect(buttonFilterOption1).toBeInTheDocument()
      fireEvent.click(buttonFilterOption1)
    })
    await waitFor(async () => {
      const buttonFilterOption1 = await screen.findByTestId('button-filter-mobile-vendor-option-1')
      expect(buttonFilterOption1).toBeInTheDocument()
      fireEvent.click(buttonFilterOption1)
    })
    await waitFor(async () => {
      const buttonFilterClose = await screen.findByTestId('button-filter-mobile-close')
      expect(buttonFilterClose).toBeInTheDocument()
      fireEvent.click(buttonFilterClose)
    })
    await waitFor(async () => {
      const buttonResults = await screen.findByTestId('button-filters-menu-results')
      expect(buttonResults).toBeInTheDocument()
      fireEvent.click(buttonResults)
    })
  })

  it('Renders correctly for an error call', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[CatalogueMockError, FilterAttributesMock]}
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

  it.skip('Renders correctly for a successful call with missing data', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[CatalogueMockMissingData, FilterAttributesMock]}
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
