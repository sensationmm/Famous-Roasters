import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { YourName } from '.'

global.alert = jest.fn()

describe('YourName step partial view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <YourName currentData={[]} updateData={() => null} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can type a name', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <YourName currentData={[]} updateData={(d) => alert(d)} />
      </I18nextProvider>,
    )
    const input = await screen.findByTestId('your-name-input')
    expect(input).toBeInTheDocument()
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'Flávio' } })
  })
})
