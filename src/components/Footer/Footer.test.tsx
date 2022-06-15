import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from 'src/config'

import { Footer } from '.'

describe('Footer component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it.skip('The user can submit email for newsletter subscription', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      </I18nextProvider>,
    )
    const emailInput = await screen.findByTestId('newsletter-email')
    const emailSubmit = await screen.findByTestId('newsletter-submit')
    expect(emailInput).toBeInTheDocument()
    expect(emailSubmit).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'max.mustermann@email.com' } })
    fireEvent.click(emailSubmit)
  })
})
