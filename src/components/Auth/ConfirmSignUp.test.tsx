import Auth from '@aws-amplify/auth'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from 'src/config/i18n'

import { AuthConfirmSignUp } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({
    url: '/register-confirm',
  }),
}))

jest.mock('@aws-amplify/ui-react', () => ({
  ...jest.requireActual('@aws-amplify/ui-react'),
  AmplifyAuthenticator: jest.fn(),
}))

describe('ConfirmSignUp custom auth component', () => {
  const snippet = (initialAuthState = 'confirmSignUp', initialAuthData = {}) => (
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <AuthConfirmSignUp authState={initialAuthState} authData={initialAuthData} />
      </I18nextProvider>
    </MemoryRouter>
  )

  it('Renders correctly', async () => {
    const { container } = render(snippet())
    await waitFor(() => new Promise((res) => setTimeout(res, 0)))
    expect(container).toMatchSnapshot()
  })

  it('The user can confirm registration', async () => {
    const mockConfirmSignUp = jest.spyOn(Auth, 'confirmSignUp')
    mockConfirmSignUp.mockResolvedValue('')
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const codeInput = getByTestId('code')
      const submitBtn = getByTestId('submit')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(codeInput).toBeInTheDocument()
      fireEvent.click(codeInput)
      fireEvent.change(codeInput, { target: { value: '123456' } })
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockConfirmSignUp).toHaveBeenCalled()
  })

  it('The user confirmation failing for user not found is catched', async () => {
    const mockConfirmSignUp = jest.spyOn(Auth, 'confirmSignUp')
    mockConfirmSignUp.mockRejectedValue(new Error('UserNotFoundException: text'))
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const codeInput = getByTestId('code')
      const submitBtn = getByTestId('submit')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(codeInput).toBeInTheDocument()
      fireEvent.click(codeInput)
      fireEvent.change(codeInput, { target: { value: '123456' } })
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockConfirmSignUp).toHaveBeenCalled()
  })

  it('The user confirmation failing for wrong code format shows error', async () => {
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const codeInput = getByTestId('code')
      const submitBtn = getByTestId('submit')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(codeInput).toBeInTheDocument()
      fireEvent.click(codeInput)
      fireEvent.change(codeInput, { target: { value: 'abc' } })
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
  })

  it('The user confirmation failing for wrong code is catched', async () => {
    const mockConfirmSignUp = jest.spyOn(Auth, 'confirmSignUp')
    mockConfirmSignUp.mockRejectedValue(new Error('CodeMismatchException: text'))
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const codeInput = getByTestId('code')
      const submitBtn = getByTestId('submit')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(codeInput).toBeInTheDocument()
      fireEvent.click(codeInput)
      fireEvent.change(codeInput, { target: { value: '123456' } })
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockConfirmSignUp).toHaveBeenCalled()
  })

  it('The user confirmation failing for invalid parameter is catched', async () => {
    const mockConfirmSignUp = jest.spyOn(Auth, 'confirmSignUp')
    mockConfirmSignUp.mockRejectedValue(new Error('InvalidParameterException: text'))
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const codeInput = getByTestId('code')
      const submitBtn = getByTestId('submit')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(codeInput).toBeInTheDocument()
      fireEvent.click(codeInput)
      fireEvent.change(codeInput, { target: { value: '123456' } })
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockConfirmSignUp).toHaveBeenCalled()
  })

  it('The user confirmation generic failing is catched', async () => {
    const mockConfirmSignUp = jest.spyOn(Auth, 'confirmSignUp')
    mockConfirmSignUp.mockRejectedValue(new Error('An error'))
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const codeInput = getByTestId('code')
      const submitBtn = getByTestId('submit')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(codeInput).toBeInTheDocument()
      fireEvent.click(codeInput)
      fireEvent.change(codeInput, { target: { value: '123456' } })
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockConfirmSignUp).toHaveBeenCalled()
  })

  it('The user can request a new registration code', async () => {
    const mockResendSignUp = jest.spyOn(Auth, 'resendSignUp')
    mockResendSignUp.mockResolvedValue('')
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const resendLink = getByTestId('resend')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(resendLink).toBeInTheDocument()
      fireEvent.click(resendLink)
    })
    expect(mockResendSignUp).toHaveBeenCalled()
  })

  it('The new registration code request failing is catched', async () => {
    const mockResendSignUp = jest.spyOn(Auth, 'resendSignUp')
    mockResendSignUp.mockRejectedValue(new Error('An error'))
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const usernameInput = getByTestId('username')
      const resendLink = getByTestId('resend')
      expect(usernameInput).toBeInTheDocument()
      fireEvent.click(usernameInput)
      fireEvent.change(usernameInput, { target: { value: 'user@60beans.com' } })
      expect(resendLink).toBeInTheDocument()
      fireEvent.click(resendLink)
    })
    expect(mockResendSignUp).toHaveBeenCalled()
  })

  it('Shows user not found error', async () => {
    const { getByTestId } = render(snippet('confirmSignUpError', { errorCode: 'ConfirmUserNotFoundException' }))

    await waitFor(() => {
      const error = getByTestId('alertConfirmUserNotFound')
      expect(error).toBeInTheDocument()
    })
  })

  it('Shows wrong code error', async () => {
    const { getByTestId } = render(snippet('confirmSignUpError', { errorCode: 'CodeMismatchException' }))

    await waitFor(() => {
      const error = getByTestId('alertInvalidCode')
      expect(error).toBeInTheDocument()
    })
  })

  it('Shows invalid parameter error', async () => {
    const { getByTestId } = render(snippet('confirmSignUpError', { errorCode: 'ConfirmUserInvalidParameterException' }))

    await waitFor(() => {
      const error = getByTestId('alertRegisterInvalidParam')
      expect(error).toBeInTheDocument()
    })
  })

  it('Shows generic error', async () => {
    const { getByTestId } = render(snippet('confirmSignUpError', { errorCode: 'OtherErrorCode' }))

    await waitFor(() => {
      const error = getByTestId('alertGeneric')
      expect(error).toBeInTheDocument()
    })
  })

  it('The new registration code request with missing email is handled', async () => {
    const { getByTestId, container } = render(snippet())

    await waitFor(() => {
      const resendLink = getByTestId('resend')
      expect(resendLink).toBeInTheDocument()
      fireEvent.click(resendLink)
    })
    expect(container).toMatchSnapshot()
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
