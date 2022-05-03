import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'

import { Navigation, NavigationTheme } from '.'

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = intersectionObserverMock

describe('Navigation component', () => {
  it('Renders correctly with shop theme', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <Navigation theme={NavigationTheme.Shop} />
        </MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with home theme', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/']}>
          <Navigation theme={NavigationTheme.Home} />
        </MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can expand and collapse mobile menu', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <Navigation theme={NavigationTheme.Shop} />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const buttonOpen = await screen.findByTestId('button-open')
    expect(buttonOpen).toBeInTheDocument()
    fireEvent.click(buttonOpen)
    const buttonClose = await screen.findByTestId('button-close')
    expect(buttonClose).toBeInTheDocument()
    fireEvent.click(buttonClose)
  })

  it('Can click on shop from the home theme', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <Navigation theme={NavigationTheme.Home} />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const buttonShop = await screen.findByTestId('button-shop')
    expect(buttonShop).toBeInTheDocument()
    fireEvent.click(buttonShop)
  })
})
