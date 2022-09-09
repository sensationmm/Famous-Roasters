import { fireEvent, render, waitFor } from '@testing-library/react'
import Form from 'rc-field-form'
import React from 'react'

import { AuthFormDoublePassword } from '.'

describe('Email and double Password fields group custom auth component', () => {
  const snippet = () => (
    <Form name="testAuthFormItemInput" method="POST">
      <AuthFormDoublePassword screenKey="signIn" onChange={() => null} />
    </Form>
  )

  it('Renders correctly', async () => {
    const { container } = render(snippet())
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Password is too short error', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: '1234567' } })
      fireEvent.click(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password is too long error', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, {
        target: {
          value:
            '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        },
      })
      fireEvent.click(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password must contain an uppercase error', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'abc1234@' } })
      fireEvent.click(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password must contain a lowercase error', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'ABC1234@' } })
      fireEvent.click(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password must contain a number error', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'AaAaAaA@' } })
      fireEvent.click(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password must contain a special char error', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'Aa123456' } })
      fireEvent.click(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password cannot contain spaces error', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'Aa 1234@' } })
      fireEvent.click(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Matching passwords is valid', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'Aa123qwertz@' } })
      fireEvent.click(password)
      const passwordRepeat = getByTestId('passwordRepeat')
      expect(passwordRepeat).toBeInTheDocument()
      fireEvent.click(passwordRepeat)
      fireEvent.change(passwordRepeat, { target: { value: 'Aa123qwertz@' } })
      fireEvent.click(passwordRepeat)
    })
    expect(container).toMatchSnapshot()
  })

  it('Matching passwords is invalid', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'Aa123qwertz@' } })
      fireEvent.click(password)
      const passwordRepeat = getByTestId('passwordRepeat')
      expect(passwordRepeat).toBeInTheDocument()
      fireEvent.click(passwordRepeat)
      fireEvent.change(passwordRepeat, { target: { value: 'notmatching' } })
      fireEvent.click(passwordRepeat)
    })
    expect(container).toMatchSnapshot()
  })
})
