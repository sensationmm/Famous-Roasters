import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { Sweetness } from '.'

global.alert = jest.fn()

describe('Sweetness partial view', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Sweetness currentData={[]} updateData={() => null} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can change the state by clicking an image checkbox', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Sweetness currentData={[]} updateData={() => null} />
      </I18nextProvider>,
    )
    const imageCheckboxes = await screen.findAllByTestId('image-checkbox')
    expect(imageCheckboxes[0]).toBeInTheDocument()
    fireEvent.click(imageCheckboxes[0])
    fireEvent.click(imageCheckboxes[0])
  })
})
