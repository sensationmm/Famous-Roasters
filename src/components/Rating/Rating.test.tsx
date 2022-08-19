import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { Rating } from '.'

describe('Rating component', () => {
  it('Renders correctly', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n} data-testId="">
        <Rating value={5} setValue={jest.fn} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('fires change event', async () => {
    const mockSetValue = jest.fn()
    render(
      <I18nextProvider i18n={i18n} data-testId="">
        <Rating value={5} setValue={mockSetValue} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const button = await screen.findByTestId('rating-3')
    button.click()
    expect(mockSetValue).toHaveBeenCalledWith(3)
  })
})
