import React from 'react'
import { ErrorBox } from 'src/components'
import i18n from 'src/config/i18n'

interface AuthCognitoErrorsProps {
  errorCode?: string
}

export const AuthCognitoErrors: React.FC<AuthCognitoErrorsProps> = ({ errorCode }: AuthCognitoErrorsProps) => {
  if (errorCode) {
    switch (errorCode) {
      case 'LoginGenericException':
        return (
          <ErrorBox dataTestId="alertLoginGeneric">
            {i18n.t<string>('auth.cognito.errors.loginGeneric.prompt')}{' '}
            <a href="/register" className="border-b">
              {i18n.t<string>('auth.cognito.errors.loginGeneric.ctaText')}.
            </a>
          </ErrorBox>
        )
      case 'ForgotPasswordGenericException':
        return (
          <ErrorBox dataTestId="alertForgotPasswordGeneric">
            {i18n.t<string>('auth.cognito.errors.forgotPasswordGeneric.prompt')}{' '}
            <a href="/register" className="border-b">
              {i18n.t<string>('auth.cognito.errors.forgotPasswordGeneric.ctaText')}.
            </a>
          </ErrorBox>
        )
      case 'RegisterGenericException':
        return (
          <ErrorBox dataTestId="alertRegisterGeneric">
            {i18n.t<string>('auth.cognito.errors.registerGeneric.prompt')}{' '}
            <a href="/login" className="border-b">
              {i18n.t<string>('auth.cognito.errors.registerGeneric.ctaText')}.
            </a>
          </ErrorBox>
        )
      case 'ConfirmUserNotFoundException':
        return (
          <ErrorBox dataTestId="alertConfirmUserNotFound">
            {i18n.t<string>('auth.cognito.errors.confirmUserNotFound.prompt')}{' '}
            <a href="/register" className="border-b">
              {i18n.t<string>('auth.cognito.errors.confirmUserNotFound.ctaText')}.
            </a>
          </ErrorBox>
        )
      case 'ConfirmUserInvalidParameterException':
        return (
          <ErrorBox dataTestId="alertRegisterInvalidParam">
            {i18n.t<string>('auth.cognito.errors.confirmUserInvalidParameter.prompt')}{' '}
            <a href="/login" className="border-b">
              {i18n.t<string>('auth.cognito.errors.confirmUserInvalidParameter.ctaText')}.
            </a>
          </ErrorBox>
        )
      case 'UserNotFoundException':
      case 'UsernameExistsException':
      case 'NotAuthorizedException':
        return (
          <ErrorBox dataTestId="alertIncorrectUserNameOrPassword">
            {i18n.t<string>('auth.cognito.errors.incorrectUserNameOrPassword')}
          </ErrorBox>
        )
      case 'CodeMismatchException':
        return <ErrorBox dataTestId="alertInvalidCode">{i18n.t<string>('auth.cognito.errors.invalidCode')}</ErrorBox>
      default:
        return <ErrorBox dataTestId="alertGeneric">{i18n.t<string>('auth.cognito.errors.generic')}</ErrorBox>
    }
  } else return <></>
}
