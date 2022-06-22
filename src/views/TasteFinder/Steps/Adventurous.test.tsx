import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { Adventurous } from '.'

global.alert = jest.fn()

describe('Adventurous partial view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Adventurous currentData={[]} updateData={() => null} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can change the state by clicking an icon checkbox', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Adventurous currentData={[]} updateData={() => null} />
      </I18nextProvider>,
    )
    const iconCheckboxes = await screen.findAllByTestId('icon-checkbox')
    expect(iconCheckboxes[0]).toBeInTheDocument()
    fireEvent.click(iconCheckboxes[0])
    fireEvent.click(iconCheckboxes[0])
  })
})
