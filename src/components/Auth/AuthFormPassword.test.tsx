import { MockedProvider } from '@apollo/client/testing'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Form from 'rc-field-form'
import React from 'react'

import { AuthFormPassword } from '.'

describe('Password field group custom auth component', () => {
  const snippet = () => (
    <Form name="testAuthFormItemInput" method="POST">
      <AuthFormPassword screenKey="signIn" onChange={() => null} />
    </Form>
  )

  it('Renders correctly', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>{snippet()}</MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for password view toggled', async () => {
    const { container } = render(
      <MockedProvider defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>{snippet()}</MockedProvider>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const toggle = await screen.findByTestId('password-view-toggle')
    expect(toggle).toBeInTheDocument()
    await act(() => {
      fireEvent.click(toggle)
    })
    expect(container).toMatchSnapshot()
  })
})
