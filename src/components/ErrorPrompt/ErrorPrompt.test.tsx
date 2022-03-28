import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from 'src/config'

import { ErrorPrompt } from '.'

global.alert = jest.fn()

describe('Error prompt component', () => {
  it('Renders correctly without action', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ErrorPrompt />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with action', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ErrorPrompt promptAction={() => alert('hello world!')} />
      </I18nextProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
