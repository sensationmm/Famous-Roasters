import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'

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

describe('Filters Menu Mobile component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <FiltersMenuMobile />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can expand, collapse and click on remove', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FiltersMenuMobile />
        </MemoryRouter>
      </I18nextProvider>,
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
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FiltersMenuMobile />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const buttonOpen = await screen.findByTestId('button-filters-menu-open')
    expect(buttonOpen).toBeInTheDocument()
    fireEvent.click(buttonOpen)
    const buttonFilter = await screen.findByTestId('button-filter-mobile-pricePerKg')
    expect(buttonFilter).toBeInTheDocument()
    fireEvent.click(buttonFilter)
    const buttonFilterClose = await screen.findByTestId('button-filter-mobile-close')
    expect(buttonFilterClose).toBeInTheDocument()
    fireEvent.click(buttonFilterClose)
  })
})
