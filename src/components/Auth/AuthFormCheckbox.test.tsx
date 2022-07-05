import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { AuthFormCheckbox } from '.'

describe('Auth form checkbox custom auth component', () => {
  const snippet = () => (
    <form name="testAuthFormItemInput">
      <AuthFormCheckbox screenKey="signUp" name="tos" />
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
