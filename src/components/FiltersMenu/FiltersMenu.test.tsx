import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'

import { FiltersMenu } from '.'

global.alert = jest.fn()

describe('Filters Menu component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <FiltersMenu />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can expand, collapse and click on remove', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/catalogue']}>
          <FiltersMenu />
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
  })
})
