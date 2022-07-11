import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/config/i18n'

import { AuthFormAction } from '.'

describe('Auth form action custom renderer on auth component', () => {
  const snippet = () => (
    <I18nextProvider i18n={i18n}>
      <form name="testAuthFormAction">
        <AuthFormAction promptText="promptText" onClick={() => null} dataTestId="testId" ctaText="ctaText" />
      </form>
    </I18nextProvider>
  )

  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>{snippet()}</MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
