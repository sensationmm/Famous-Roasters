import { HubPayload } from '@aws-amplify/core'
import { Hub } from 'aws-amplify'
import { loader } from 'graphql.macro'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AuthConfirmSignUp,
  Authenticator,
  AuthForgotPassword,
  AuthSignIn,
  AuthSignUp,
  Layout,
  NavigationTheme,
} from 'src/components'
import { famousRoastersClient } from 'src/config'
const SIGN_UP = loader('src/graphql/queries/signUp.query.graphql')

interface AuthProps {
  authState: string
}

export const Auth: React.FC<AuthProps> = ({ authState }) => {
  Hub.listen('auth', ({ payload }) => {
    const client = famousRoastersClient()
    const { event } = payload as HubPayload
    if (event === 'autoSignIn') {
      const jwtToken = payload.data.signInUserSession.accessToken.jwtToken

      client
        .query({
          query: SIGN_UP,
          variables: {
            accessToken: jwtToken,
          },
        })
        .then(() => {
          window.localStorage.setItem('authToken', jwtToken)
          navigate('/profile')
        })
        .catch((e) => console.log('SIGN_UP', e))
    } else if (event === 'autoSignIn_failure') {
      navigate('/login')
    }
  })

  const navigate = useNavigate()
  const handleAuthStateChange = (state: string) => {
    switch (state) {
      case 'signUp':
      case 'signUpError':
        window.location.pathname !== '/register' && navigate('/register')
        break
      case 'confirmSignUp':
      case 'confirmSignUpError':
        window.location.pathname !== '/register-confirm' && navigate('/register-confirm')
        break
      case 'forgotPassword':
      case 'forgotPasswordError':
        window.location.pathname !== '/reset-password' && navigate('/reset-password')
        break
      case 'signedIn':
        navigate('/profile')
        break
      case 'signIn':
      case 'signInError':
      default:
        window.location.pathname !== '/login' && navigate('/login')
        break
    }
  }

  const innerContent = () => {
    switch (authState) {
      case 'signUp':
        return (
          <Authenticator hideDefault={true} authState="signUp" onStateChange={handleAuthStateChange}>
            <AuthSignUp />
          </Authenticator>
        )
      case 'forgotPassword':
        return (
          <Authenticator hideDefault={true} authState="signUp" onStateChange={handleAuthStateChange}>
            <AuthForgotPassword />
          </Authenticator>
        )
      case 'confirmSignUp':
        return (
          <Authenticator hideDefault={true} authState="signUp" onStateChange={handleAuthStateChange}>
            <AuthConfirmSignUp />
          </Authenticator>
        )
      case 'signIn':
      default:
        return (
          <Authenticator hideDefault={true} authState="signIn" onStateChange={handleAuthStateChange}>
            <AuthSignIn />
          </Authenticator>
        )
    }
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home} showFooter={false}>
      <main className="flex-grow flex items-start justify-center bg-white">
        <div className="w-full md:w-80 xl:w-auto xl:w-[32rem]">{innerContent()}</div>
      </main>
    </Layout>
  )
}
