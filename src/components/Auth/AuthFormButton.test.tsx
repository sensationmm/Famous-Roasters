import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { AuthFormButton } from '.'

describe('Auth form button custom renderer on auth component', () => {
  const snippet = () => (
    <form name="testAuthFormButton">
      <AuthFormButton ctaText="ctaText" />
    </form>
  )

  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>{snippet()}</MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
