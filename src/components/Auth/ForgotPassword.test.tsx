import Auth from '@aws-amplify/auth'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from 'src/config/i18n'

import { AuthForgotPassword } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({
    url: '/reset-password',
  }),
}))

jest.mock('@aws-amplify/ui-react', () => ({
  ...jest.requireActual('@aws-amplify/ui-react'),
  AmplifyAuthenticator: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.location
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.location = new URL('https://www.60beans.com/reset-password')

describe('ForgotPassword custom auth component', () => {
  const snippet = (initialAuthState = 'forgotPassword', initialAuthData = {}) => (
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={['/reset-password']}>
        <AuthForgotPassword authState={initialAuthState} authData={initialAuthData} />
      </MemoryRouter>
    </I18nextProvider>
  )

  it('Renders correctly for an expected state', async () => {
    const { container } = render(snippet())
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly (nothing) for an unexpected state', async () => {
    const { container } = render(snippet('other'))
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can reset his password', async () => {
    const mockForgotPassword = jest.spyOn(Auth, 'forgotPassword')
    mockForgotPassword.mockResolvedValue({ CodeDeliveryDetails: 'something' })
    const mockForgotPasswordSubmit = jest.spyOn(Auth, 'forgotPasswordSubmit')
    mockForgotPasswordSubmit.mockResolvedValue('')
    const { getByTestId } = render(snippet())

    const usernameInput = getByTestId('username')
    const submitBtn = getByTestId('submit')
    expect(usernameInput).toBeInTheDocument()
    fireEvent.click(usernameInput)
    fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockForgotPassword).resolves

    const emailInput = getByTestId('username')
    const codeInput = getByTestId('code')
    const passwordInput = getByTestId('password')
    const passwordRepeatInput = getByTestId('passwordRepeat')
    const submitBtn2 = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(codeInput).toBeInTheDocument()
    fireEvent.click(codeInput)
    fireEvent.change(codeInput, { target: { value: '123456' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(passwordRepeatInput).toBeInTheDocument()
    fireEvent.click(passwordRepeatInput)
    fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
    expect(submitBtn2).toBeInTheDocument()
    fireEvent.click(submitBtn2)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockForgotPasswordSubmit).resolves

    mockForgotPassword.mockReset()
    mockForgotPasswordSubmit.mockReset()
  })

  it('The user can request a new reset code', async () => {
    const mockForgotPassword = jest.spyOn(Auth, 'forgotPassword')
    mockForgotPassword.mockResolvedValue({ CodeDeliveryDetails: 'something' })
    const { getByTestId } = render(snippet())

    const usernameInput = getByTestId('username')
    const submitBtn = getByTestId('submit')
    expect(usernameInput).toBeInTheDocument()
    fireEvent.click(usernameInput)
    fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    const emailInput = getByTestId('username')
    const resendLink = getByTestId('resend')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(resendLink).toBeInTheDocument()
    fireEvent.click(resendLink)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockForgotPassword).resolves
    mockForgotPassword.mockReset()
  })

  it('The user reset failing for a not existing user is catched', async () => {
    const mockSignIn2 = jest.spyOn(Auth, 'forgotPassword')
    mockSignIn2.mockRejectedValue(new Error('UserNotFoundException: text'))
    const { getByTestId } = render(snippet())

    const emailInput = getByTestId('username')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    await expect(mockSignIn2).rejects.toThrowError('UserNotFoundException')
  })

  it('The user reset failing for any other reason is catched', async () => {
    const mockForgotPassword = jest.spyOn(Auth, 'forgotPassword')
    mockForgotPassword.mockRejectedValue(new Error('An error'))
    const { getByTestId } = render(snippet())

    const usernameInput = getByTestId('username')
    const submitBtn = getByTestId('submit')
    expect(usernameInput).toBeInTheDocument()
    fireEvent.click(usernameInput)
    fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockForgotPassword).resolves
    mockForgotPassword.mockReset()
  })

  it('The user reset failing when setting the password with an invalid code is catched', async () => {
    const mockForgotPassword = jest.spyOn(Auth, 'forgotPassword')
    mockForgotPassword.mockResolvedValue({ CodeDeliveryDetails: 'something' })
    const mockForgotPasswordSubmit = jest.spyOn(Auth, 'forgotPasswordSubmit')
    mockForgotPasswordSubmit.mockRejectedValue(new Error('CodeMismatchException: text'))
    const { getByTestId } = render(snippet())

    const usernameInput = getByTestId('username')
    const submitBtn = getByTestId('submit')
    expect(usernameInput).toBeInTheDocument()
    fireEvent.click(usernameInput)
    fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    const emailInput = getByTestId('username')
    const codeInput = getByTestId('code')
    const passwordInput = getByTestId('password')
    const passwordRepeatInput = getByTestId('passwordRepeat')
    const submitBtn2 = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(codeInput).toBeInTheDocument()
    fireEvent.click(codeInput)
    fireEvent.change(codeInput, { target: { value: '123456' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(passwordRepeatInput).toBeInTheDocument()
    fireEvent.click(passwordRepeatInput)
    fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
    expect(submitBtn2).toBeInTheDocument()
    fireEvent.click(submitBtn2)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockForgotPassword).resolves
    expect(mockForgotPasswordSubmit).resolves
    mockForgotPassword.mockReset()
    mockForgotPasswordSubmit.mockReset()
  })

  it('The user reset failing for wrong code format shows error', async () => {
    const mockForgotPassword = jest.spyOn(Auth, 'forgotPassword')
    mockForgotPassword.mockResolvedValue({ CodeDeliveryDetails: 'something' })
    const { getByTestId } = render(snippet())

    const usernameInput = getByTestId('username')
    const submitBtn = getByTestId('submit')
    expect(usernameInput).toBeInTheDocument()
    fireEvent.click(usernameInput)
    fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    const emailInput = getByTestId('username')
    const codeInput = getByTestId('code')
    const passwordInput = getByTestId('password')
    const passwordRepeatInput = getByTestId('passwordRepeat')
    const submitBtn2 = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(codeInput).toBeInTheDocument()
    fireEvent.click(codeInput)
    fireEvent.change(codeInput, { target: { value: 'abc' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(passwordRepeatInput).toBeInTheDocument()
    fireEvent.click(passwordRepeatInput)
    fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
    expect(submitBtn2).toBeInTheDocument()
    fireEvent.click(submitBtn2)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockForgotPassword).resolves
    mockForgotPassword.mockReset()
  })

  it('The user reset failing when setting the password for any other reason is catched', async () => {
    const mockForgotPassword = jest.spyOn(Auth, 'forgotPassword')
    mockForgotPassword.mockResolvedValue({ CodeDeliveryDetails: 'something' })
    const mockForgotPasswordSubmit = jest.spyOn(Auth, 'forgotPasswordSubmit')
    mockForgotPasswordSubmit.mockRejectedValue(new Error('An error'))
    const { getByTestId } = render(snippet())

    const usernameInput = getByTestId('username')
    const submitBtn = getByTestId('submit')
    expect(usernameInput).toBeInTheDocument()
    fireEvent.click(usernameInput)
    fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    const emailInput = getByTestId('username')
    const codeInput = getByTestId('code')
    const passwordInput = getByTestId('password')
    const passwordRepeatInput = getByTestId('passwordRepeat')
    const submitBtn2 = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(codeInput).toBeInTheDocument()
    fireEvent.click(codeInput)
    fireEvent.change(codeInput, { target: { value: '123456' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(passwordRepeatInput).toBeInTheDocument()
    fireEvent.click(passwordRepeatInput)
    fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
    expect(submitBtn2).toBeInTheDocument()
    fireEvent.click(submitBtn2)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockForgotPassword).resolves
    expect(mockForgotPasswordSubmit).resolves
    mockForgotPassword.mockReset()
    mockForgotPasswordSubmit.mockReset()
  })

  it('Shows incorrect email error', async () => {
    const { getByTestId } = render(snippet('forgotPasswordError', { errorCode: 'ForgotPasswordGenericException' }))

    await waitFor(() => {
      const error = getByTestId('alertForgotPasswordGeneric')
      expect(error).toBeInTheDocument()
    })
  })

  it('Shows incorrect code error', async () => {
    const { getByTestId } = render(snippet('forgotPasswordError', { errorCode: 'CodeMismatchException' }))

    await waitFor(() => {
      const error = getByTestId('alertInvalidCode')
      expect(error).toBeInTheDocument()
    })
  })

  it('Shows generic error', async () => {
    const { getByTestId } = render(snippet('forgotPasswordError', { errorCode: 'OtherErrorCode' }))

    await waitFor(() => {
      const error = getByTestId('alertGeneric')
      expect(error).toBeInTheDocument()
    })
  })

  it('The user can navigate to login', async () => {
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const goToSignInLink = getByTestId('goToSignInLink')
      expect(goToSignInLink).toBeInTheDocument()
      fireEvent.click(goToSignInLink)
    })
  })
})
