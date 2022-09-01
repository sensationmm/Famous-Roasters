import Auth from '@aws-amplify/auth'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete window.location
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.location = new URL('https://www.60beans.com/register')
window.localStorage.setItem(
  'tasteFinder',
  JSON.stringify(
    '[{"name":"aroma","value":"experimentell & komplex"},{"name":"name","value":"Torrefattore"},{"name":"bitterness","value":"1"},{"name":"sweetness","value":"1"},{"name":"acidity","value":"1"},{"name":"body","value":"1"},{"name":"grindType","value":"FrenchPress"},{"name":"adventurous","value":"adventurous"},{"name":"shopifyProductIds","value":["7966736744714","7659871600856","7659907842264","7659906203864","7966820630794","7659905745112"]},    {"name":"recommendations","value": [{"shopifyId":"7966737858826","score":0.9814814814814815,"acidity":4,"bitterness":1,"sweetness":2,"body":3},{"shopifyId":"7966736875786","score":0.9567901234567902,"acidity":1,"bitterness":1,"sweetness":1,"body":1},{"shopifyId":"7966738678026","score":0.9351851851851852,"acidity":1,"bitterness":1,"sweetness":3,"body":4},{"shopifyId":"7966738448650","score":0.9320987654320988,"acidity":3,"bitterness":1,"sweetness":2,"body":6},{"shopifyId":"7659877466328","score":0.9074074074074074,"acidity":5,"bitterness":5,"sweetness":5,"body":5},{"shopifyId":"7659914723544","score":0.8950617283950617,"acidity":3,"bitterness":4,"sweetness":5,"body":6}]}]',
  ),
)

describe('SignUp custom auth component', () => {
  const snippet = (initialAuthState = 'signUp', initialAuthData = {}) => (
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={['/register']}>
        <AuthSignUp authState={initialAuthState} authData={initialAuthData} />
      </MemoryRouter>
    </I18nextProvider>
  )

  it('Renders correctly for an expected state', async () => {
    const { container } = render(snippet())
    expect(container).toMatchSnapshot()
  })

  it('Renders correctly (nothing) for an unexpected state', async () => {
    const { container } = render(snippet('other'))
    expect(container).toMatchSnapshot()
  })

  it.skip('Shows all required errors', async () => {
    const { getByTestId, getByText } = render(snippet())
    const submitBtn = getByTestId('submit')
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)
    await waitFor(() => expect(getByText(/Trage bitte deine E-mail-Adresse ein/)).toBeInTheDocument())
    await waitFor(() => expect(getByText(/Please input your password/)).toBeInTheDocument())
    await waitFor(() => expect(getByText(/Please repeat your password/)).toBeInTheDocument())
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

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const passwordRepeatInput = getByTestId('passwordRepeat')
    const newsletterCheckBox = getByTestId('newsletterSignup')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(passwordRepeatInput).toBeInTheDocument()
    fireEvent.click(passwordRepeatInput)
    fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
    expect(newsletterCheckBox).toBeInTheDocument
    fireEvent.click(newsletterCheckBox)
    fireEvent.change(newsletterCheckBox, { target: { value: true } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockSignUp).resolves
  })

  it('The user register failing because user exists is catched', async () => {
    const mockSignUp = jest.spyOn(Auth, 'signUp')
    mockSignUp.mockRejectedValue(new Error('UsernameExistsException: text'))
    const { getByTestId } = render(snippet())

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const passwordRepeatInput = getByTestId('passwordRepeat')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(passwordRepeatInput).toBeInTheDocument()
    fireEvent.click(passwordRepeatInput)
    fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockSignUp).resolves
  })

  it('The user register failing generic is catched', async () => {
    const mockSignUp = jest.spyOn(Auth, 'signUp')
    mockSignUp.mockRejectedValue(new Error('An error'))
    const { getByTestId } = render(snippet())

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const passwordRepeatInput = getByTestId('passwordRepeat')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(passwordRepeatInput).toBeInTheDocument()
    fireEvent.click(passwordRepeatInput)
    fireEvent.change(passwordRepeatInput, { target: { value: '123456AbC?' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockSignUp).resolves
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

  it.skip('The user can navigate to confirm signup', async () => {
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
