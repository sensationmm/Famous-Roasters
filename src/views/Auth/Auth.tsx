import React from 'react'
import { Authenticator, AuthSignIn, Layout, NavigationTheme } from 'src/components'

interface AuthProps {
  key: string
}

export const Auth: React.FC<AuthProps> = ({ key }) => {
  const handleAuthStateChange = (state: string) => {
    console.log('state becomes =', state)
  }

  const innerContent = () => {
    switch (key) {
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
      <main className="flex-grow flex items-start justify-center bg-white my-8 mx-6 md:my-12 md:mx-0">
        <div className="w-full md:w-1/2">{innerContent()}</div>
      </main>
    </Layout>
  )
}
