import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { Welcome } from '.'

global.alert = jest.fn()

describe('Welcome step partial view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Welcome next={() => null} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can click on start', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Welcome next={() => alert('start!')} />
      </I18nextProvider>,
    )
    const startButton = await screen.findByTestId('button-start')
    expect(startButton).toBeInTheDocument()
    fireEvent.click(startButton)
  })
})
