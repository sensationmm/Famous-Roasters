import Auth from '@aws-amplify/auth'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from 'src/config/i18n'
import LoadingContext from 'src/hooks/isLoading'

import { AuthSignIn } from '.'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({
    url: '/login',
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
window.location = new URL('https://www.60beans.com/login')

describe('SignIn custom auth component', () => {
  const snippet = (initialAuthState = 'signIn', initialAuthData = {}) => (
    <LoadingContext.Provider value={{ isLoading: false, setIsLoading: jest.fn }}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/login']}>
          <AuthSignIn authState={initialAuthState} authData={initialAuthData} />
        </MemoryRouter>
      </I18nextProvider>
    </LoadingContext.Provider>
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

  it('The user can log in', async () => {
    const mockSignIn = jest.spyOn(Auth, 'signIn')
    mockSignIn.mockResolvedValue({ data: true })
    const { getByTestId } = render(snippet())

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    expect(mockSignIn).resolves
  })

  it('The user login failing is catched for user not found', async () => {
    const mockSignIn2 = jest.spyOn(Auth, 'signIn')
    mockSignIn2.mockRejectedValue(new Error('UserNotFoundException: text'))
    const { getByTestId } = render(snippet())

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    await expect(mockSignIn2).rejects.toThrowError('UserNotFoundException')
  })

  it('The user login failing is catched for unauthorized', async () => {
    const mockSignIn3 = jest.spyOn(Auth, 'signIn')
    mockSignIn3.mockRejectedValue(new Error('NotAuthorizedException: text'))
    const { getByTestId } = render(snippet())

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    await expect(mockSignIn3).rejects.toThrowError('NotAuthorizedException')
  })

  it('The user login failing is catched for any other error', async () => {
    const mockSignIn4 = jest.spyOn(Auth, 'signIn')
    mockSignIn4.mockRejectedValue(new Error('OtherError'))
    const { getByTestId } = render(snippet())

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    const submitBtn = getByTestId('submit')
    expect(emailInput).toBeInTheDocument()
    fireEvent.click(emailInput)
    fireEvent.change(emailInput, { target: { value: 'user@60beans.com' } })
    expect(passwordInput).toBeInTheDocument()
    fireEvent.click(passwordInput)
    fireEvent.change(passwordInput, { target: { value: '123456AbC?' } })
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    })

    await expect(mockSignIn4).rejects.toThrowError('OtherError')
  })

  it('Shows incorrect user name or password error', async () => {
    const { getByTestId } = render(snippet('signInError', { errorCode: 'LoginGenericException' }))

    await waitFor(() => {
      const error = getByTestId('alertLoginGeneric')
      expect(error).toBeInTheDocument()
    })
  })

  it('Shows generic error', async () => {
    const { getByTestId } = render(snippet('signInError', { errorCode: 'OtherErrorCode' }))

    await waitFor(() => {
      const error = getByTestId('alertGeneric')
      expect(error).toBeInTheDocument()
    })
  })

  it('The user can navigate to forgot password', async () => {
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const forgotPasswordLink = getByTestId('forgotPasswordLink')
      expect(forgotPasswordLink).toBeInTheDocument()
      fireEvent.click(forgotPasswordLink)
    })
  })

  it('The user can navigate to register', async () => {
    const { getByTestId } = render(snippet())

    await waitFor(() => {
      const goToSignUpLink = getByTestId('goToSignUpLink')
      expect(goToSignUpLink).toBeInTheDocument()
      fireEvent.click(goToSignUpLink)
    })
  })
})
