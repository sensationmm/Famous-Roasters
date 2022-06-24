import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { CatalogueMocks, FilterAttributesMock } from 'src/_mocks'
import { i18n } from 'src/config'

import { FilterData } from '../index'
import { FiltersMenuMobile } from '.'

global.alert = jest.fn()

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = intersectionObserverMock

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.history
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.history = { go: jest.fn() }

describe('Filters Menu Mobile component', () => {
  const initialFilters: FilterData[] = [
    { key: 'beanType', isOpen: false, filterType: 'enum', filterValues: ['Arabica'] },
    { key: 'vendor', isOpen: false, filterType: 'enum', filterValues: ['Rösttatte', '60beans'] },
    { key: 'origin', isOpen: false, filterType: 'enum', filterValues: ['BR,CO'], i18nValues: true },
    { key: 'packageSize', isOpen: false, filterType: 'enum', filterValues: ['100g', '250g', '500g', '1kg'] },
  ]

  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <FiltersMenuMobile initialFilters={initialFilters} onUpdateFilters={() => alert('update!')} />
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can expand, collapse and click on remove', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <FiltersMenuMobile initialFilters={initialFilters} onUpdateFilters={() => alert('update!')} />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    const buttonOpen = await screen.findByTestId('button-filters-menu-open')
    expect(buttonOpen).toBeInTheDocument()
    fireEvent.click(buttonOpen)
    const buttonRemove = await screen.findByTestId('button-filters-menu-remove')
    expect(buttonRemove).toBeInTheDocument()
    fireEvent.click(buttonRemove)
    const buttonClose = await screen.findByTestId('button-filters-menu-close')
    expect(buttonClose).toBeInTheDocument()
    fireEvent.click(buttonClose)
    const buttonResults = await screen.findByTestId('button-filters-menu-results')
    expect(buttonResults).toBeInTheDocument()
    fireEvent.click(buttonResults)
  })

  it('Can transition to filter dialog', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <FiltersMenuMobile initialFilters={initialFilters} onUpdateFilters={() => alert('update!')} />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    const buttonOpen = await screen.findByTestId('button-filters-menu-open')
    expect(buttonOpen).toBeInTheDocument()
    fireEvent.click(buttonOpen)
    const buttonFilter = await screen.findByTestId('button-filter-mobile-packageSize')
    expect(buttonFilter).toBeInTheDocument()
    fireEvent.click(buttonFilter)
    const buttonFilterClose = await screen.findByTestId('button-filter-mobile-close')
    expect(buttonFilterClose).toBeInTheDocument()
    fireEvent.click(buttonFilterClose)
  })

  it('Can interact more intensively', async () => {
    render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/catalogue']}>
            <FiltersMenuMobile initialFilters={initialFilters} onUpdateFilters={() => alert('update!')} />
          </MemoryRouter>
        </I18nextProvider>
      </MockedProvider>,
    )
    const buttonOpen = await screen.findByTestId('button-filters-menu-open')
    expect(buttonOpen).toBeInTheDocument()
    fireEvent.click(buttonOpen)
    const buttonFilter = await screen.findByTestId('button-filter-mobile-packageSize')
    expect(buttonFilter).toBeInTheDocument()
    fireEvent.click(buttonFilter)
    const buttonFilterOption1 = await screen.findByTestId('button-filter-mobile-packageSize-option-1')
    expect(buttonFilterOption1).toBeInTheDocument()
    fireEvent.click(buttonFilterOption1)
    const buttonFilterOption2 = await screen.findByTestId('button-filter-mobile-packageSize-option-2')
    expect(buttonFilterOption2).toBeInTheDocument()
    fireEvent.click(buttonFilterOption2)
    const buttonFilterClose = await screen.findByTestId('button-filter-mobile-close')
    expect(buttonFilterClose).toBeInTheDocument()
    fireEvent.click(buttonFilterClose)
    const buttonRemove = await screen.findByTestId('button-filters-menu-remove')
    expect(buttonRemove).toBeInTheDocument()
    fireEvent.click(buttonRemove)
  })

  it('Renders with spacing items correctly', async () => {
    const { container } = render(
      <MockedProvider
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        mocks={[...CatalogueMocks, FilterAttributesMock]}
        addTypename={false}
      >
        <I18nextProvider i18n={i18n}>
          <FiltersMenuMobile
            initialFilters={initialFilters}
            onUpdateFilters={() => alert('update!')}
            hasSpacerAfterItem={[{ filterKey: 'beanType', filterValue: 'Arabica' }]}
          />
        </I18nextProvider>
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
