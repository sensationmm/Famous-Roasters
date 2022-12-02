import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Form from 'rc-field-form'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { AuthFormDoublePassword } from '.'

describe('Email and double Password fields group custom auth component', () => {
  const snippet = () => (
    <Form name="testAuthFormItemInput" method="POST">
      {(_, form) => <AuthFormDoublePassword screenKey="signIn" onChange={() => null} form={form} />}
    </Form>
  )

  it('Renders correctly', async () => {
    const { container } = render(snippet())
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly with no form', async () => {
    const { container } = render(
      <Form name="testAuthFormItemInput" method="POST">
        <AuthFormDoublePassword screenKey="signIn" onChange={() => null} />
      </Form>,
    )
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Password is too short error', async () => {
    // needed as async validator throws a console warning on password too short
    jest.spyOn(console, 'warn').mockImplementation(jest.fn())
    const { container, getByTestId } = render(snippet())
    await act(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: '1234567' } })
      fireEvent.click(password)
      fireEvent.blur(password)
    })
    expect(container).toMatchSnapshot()
    jest.spyOn(console, 'warn').mockRestore()
  })

  it('Password is too long error', async () => {
    // needed as async validator throws a console warning on password too long
    jest.spyOn(console, 'warn').mockImplementation(jest.fn())
    const { container, getByTestId } = render(snippet())
    await act(() => {
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
      fireEvent.blur(password)
    })
    expect(container).toMatchSnapshot()
    jest.spyOn(console, 'warn').mockRestore()
  })

  it('Password must contain an uppercase error', async () => {
    const { container, getByTestId } = render(snippet())
    await act(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'abc1234@' } })
      fireEvent.click(password)
      fireEvent.blur(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password must contain a lowercase error', async () => {
    const { container, getByTestId } = render(snippet())
    await act(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'ABC1234@' } })
      fireEvent.click(password)
      fireEvent.blur(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password must contain a number error', async () => {
    const { container, getByTestId } = render(snippet())
    await act(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'AaAaAaA@' } })
      fireEvent.click(password)
      fireEvent.blur(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password must contain a special char error', async () => {
    const { container, getByTestId } = render(snippet())
    await act(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'Aa123456' } })
      fireEvent.click(password)
      fireEvent.blur(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Password cannot contain spaces error', async () => {
    const { container, getByTestId } = render(snippet())
    await act(() => {
      const password = getByTestId('password')
      expect(password).toBeInTheDocument()
      fireEvent.click(password)
      fireEvent.change(password, { target: { value: 'Aa 1234@' } })
      fireEvent.click(password)
      fireEvent.blur(password)
    })
    expect(container).toMatchSnapshot()
  })

  it('Matching passwords is valid', async () => {
    const { container, getByTestId } = render(snippet())
    await act(() => {
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
      fireEvent.blur(passwordRepeat)
    })
    expect(container).toMatchSnapshot()
  })

  it('Matching passwords is invalid', async () => {
    const { container, getByTestId } = render(snippet())
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    await act(() => {
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
      fireEvent.blur(passwordRepeat)
    })
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly for password view toggled', async () => {
    const { container } = render(snippet())
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    const toggle = await screen.findAllByTestId('password-view-toggle')
    expect(toggle[0]).toBeInTheDocument()
    await act(() => {
      fireEvent.click(toggle[0])
    })
    expect(container).toMatchSnapshot()
  })
})
