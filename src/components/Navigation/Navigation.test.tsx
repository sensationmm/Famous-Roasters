import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'

import { Navigation } from '.'

describe('Navigation component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
        </MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Can expand and collapse mobile menu', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/']}>
          <Navigation />
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
})
