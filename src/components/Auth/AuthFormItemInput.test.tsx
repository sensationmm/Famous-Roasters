import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import Form from 'rc-field-form'
import React from 'react'

import { AuthFormItemInput } from '.'

describe('ConfirmSignUp custom auth component', () => {
  const snippet = (type?: string) => (
    <Form name="testAuthFormItemInput" method="POST">
      <AuthFormItemInput name="itemName" label="itemLabel" type={type} rules={[]} placeholder="itemPlaceHolder" />
    </Form>
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
