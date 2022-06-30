import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { AuthFormEmail } from '.'

describe('Email fields group custom auth component', () => {
  const snippet = () => (
    <form name="testAuthFormItemInput">
      <AuthFormEmail screenKey="signIn" onChange={() => null} />
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
