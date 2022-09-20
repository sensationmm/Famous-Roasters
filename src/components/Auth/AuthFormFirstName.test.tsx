import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import Form from 'rc-field-form'
import React from 'react'

import { AuthFormFirstName } from '.'

describe('First name fields group custom auth component', () => {
  const snippet = (value: string | undefined = undefined) => (
    <Form name="testAuthFormItemInput" method="POST">
      <AuthFormFirstName screenKey="signIn" onChange={() => null} value={value} />
    </Form>
  )

  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>{snippet()}</MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with given value', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>{snippet('test')}</MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })
})
