import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

import { AuthFormItemInput } from '.'

describe('ConfirmSignUp custom auth component', () => {
  const snippet = (type?: string) => (
    <form name="testAuthFormItemInput">
      <AuthFormItemInput name="itemName" label="itemLabel" type={type} rules={[]} placeholder="itemPlaceHolder" />
    </form>
  )

  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>
        {snippet('password')}
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for non given type', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>
        {snippet(undefined)}
      </MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
