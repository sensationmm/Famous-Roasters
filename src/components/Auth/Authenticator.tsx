import { Authenticator as AmplifyAuthenticator } from 'aws-amplify-react'
import { IAuthenticatorProps } from 'aws-amplify-react/lib/Auth/Authenticator'
import React from 'react'

export interface AuthenticatorProps extends IAuthenticatorProps {
  children: React.ReactNode
}

export const Authenticator: React.FC<AuthenticatorProps> = ({ children, ...props }: AuthenticatorProps) => {
  return <AmplifyAuthenticator {...props}>{children}</AmplifyAuthenticator>
}
