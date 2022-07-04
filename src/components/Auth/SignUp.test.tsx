import Auth from '@aws-amplify/auth'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from 'src/config/i18n'

import { AuthSignUp } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({
    url: '/register',
  }),
}))

jest.mock('@aws-amplify/ui-react', () => ({
  ...jest.requireActual('@aws-amplify/ui-react'),
  AmplifyAuthenticator: jest.fn(),
}))

describe('SignUp custom auth component', () => {
  const snippet = (initialAuthState = 'signUp', initialAuthData = {}) => (
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <AuthSignUp authState={initialAuthState} authData={initialAuthData} />
      </I18nextProvider>
    </MemoryRouter>
  )

  it('Renders correctly for an expected state', async () => {
    const { container } = render(snippet())
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly (nothing) for an unexpected state', async () => {
    const { container } = render(snippet('other'))
    expect(container).toMatchSnapshot()
  })

  it('Shows all required errors', async () => {
    const { getByTestId, getByText } = render(snippet())
    const submitBtn = getByTestId('submit')
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)
    await waitFor(() => expect(getByText(/Please input your email/)).toBeInTheDocument())
    await waitFor(() => expect(getByText(/Please input your password/)).toBeInTheDocument())
    await waitFor(() => expect(getByText(/Please repeat your password/)).toBeInTheDocument())
    await waitFor(() => expect(getByText(/You need to tick the check box/)).toBeInTheDocument())
  })

  it('The user can register', async () => {
    const mockSignUp = jest.spyOn(Auth, 'signUp')
    const res = {
      user: new CognitoUser({
        Username: 'myuser',
        Pool: new CognitoUserPool({
          UserPoolId: 'eu-central-1_ucPXImCME',
          ClientId: 'dasdasd',
        }),
      }),
      userConfirmed: false,
      userSub: '',
      codeDeliveryDetails: {
        AttributeName: '',
        DeliveryMedium: '',
        Destination: '',
      },
    }
    mockSignUp.mockResolvedValue(res)
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const emailInput = getByTestId('email')
      const passwordInput = getByTestId('password')
      const passwordRepeatInput = getByTestId('passwordRepeat')
      const acceptTos = getByTestId('confirmTos')
      const submitBtn = getByTestId('submit')
      expect(emailInput).toBeInTheDocument()
      fireEvent.click(emailInput)
      fireEvent.change(emailInput, { target: { value: 'user@mallcule.com' } })
      expect(passwordInput).toBeInTheDocument()
      fireEvent.click(passwordInput)
      fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
      expect(passwordRepeatInput).toBeInTheDocument()
      fireEvent.click(passwordRepeatInput)
      fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
      expect(acceptTos).toBeInTheDocument()
      fireEvent.click(acceptTos)
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockSignUp).toHaveBeenCalled()
  })

  it('The user register failing because user exists is catched', async () => {
    const mockSignUp = jest.spyOn(Auth, 'signUp')
    mockSignUp.mockRejectedValue(new Error('UsernameExistsException: text'))
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const emailInput = getByTestId('email')
      const passwordInput = getByTestId('password')
      const passwordRepeatInput = getByTestId('passwordRepeat')
      const acceptTos = getByTestId('confirmTos')
      const submitBtn = getByTestId('submit')
      expect(emailInput).toBeInTheDocument()
      fireEvent.click(emailInput)
      fireEvent.change(emailInput, { target: { value: 'user@mallcule.com' } })
      expect(passwordInput).toBeInTheDocument()
      fireEvent.click(passwordInput)
      fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
      expect(passwordRepeatInput).toBeInTheDocument()
      fireEvent.click(passwordRepeatInput)
      fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
      expect(acceptTos).toBeInTheDocument()
      fireEvent.click(acceptTos)
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockSignUp).toHaveBeenCalled()
  })

  it('The user register failing generic is catched', async () => {
    const mockSignUp = jest.spyOn(Auth, 'signUp')
    mockSignUp.mockRejectedValue(new Error('An error'))
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const emailInput = getByTestId('email')
      const passwordInput = getByTestId('password')
      const passwordRepeatInput = getByTestId('passwordRepeat')
      const acceptTos = getByTestId('confirmTos')
      const submitBtn = getByTestId('submit')
      expect(emailInput).toBeInTheDocument()
      fireEvent.click(emailInput)
      fireEvent.change(emailInput, { target: { value: 'user@mallcule.com' } })
      expect(passwordInput).toBeInTheDocument()
      fireEvent.click(passwordInput)
      fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
      expect(passwordRepeatInput).toBeInTheDocument()
      fireEvent.click(passwordRepeatInput)
      fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
      expect(acceptTos).toBeInTheDocument()
      fireEvent.click(acceptTos)
      expect(submitBtn).toBeInTheDocument()
      fireEvent.click(submitBtn)
    })
    expect(mockSignUp).toHaveBeenCalled()
  })

  it('Shows incorrect user name or password error', async () => {
    const { getByTestId } = render(snippet('signUpError', { errorCode: 'RegisterGenericException' }))

    await waitFor(() => {
      const error = getByTestId('alertRegisterGeneric')
      expect(error).toBeInTheDocument()
    })
  })

  it('Shows generic error', async () => {
    const { getByTestId } = render(snippet('signUpError', { errorCode: 'OtherErrorCode' }))

    await waitFor(() => {
      const error = getByTestId('alertGeneric')
      expect(error).toBeInTheDocument()
    })
  })

  it('The user can navigate to confirm signup', async () => {
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const confirmSignUpLink = getByTestId('confirmSignUpLink')
      expect(confirmSignUpLink).toBeInTheDocument()
      fireEvent.click(confirmSignUpLink)
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
