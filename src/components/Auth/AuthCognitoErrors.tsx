import React from 'react'
import { Typography, TypographySize } from 'src/components'
import i18n from 'src/config/i18n'

interface AuthCognitoErrorsProps {
  errorCode?: string
}

export const AuthCognitoErrors: React.FC<AuthCognitoErrorsProps> = ({ errorCode }: AuthCognitoErrorsProps) => {
  if (errorCode) {
    switch (errorCode) {
      case 'LoginGenericException':
        return (
          <div className="bg-brand-grey-whisper p-4 mb-8" data-testid="alertLoginGeneric">
            <Typography size={TypographySize.Small}>
              {i18n.t<string>('auth.cognito.errors.loginGeneric.prompt')}{' '}
              <a href="/register" className="border-b">
                {i18n.t<string>('auth.cognito.errors.loginGeneric.ctaText')}.
              </a>
            </Typography>
          </div>
        )
      case 'ForgotPasswordGenericException':
        return (
          <div className="border-negative p-4" data-testid="alertForgotPasswordGeneric">
            <Typography size={TypographySize.Small}>
              {i18n.t<string>('auth.cognito.errors.forgotPasswordGeneric.prompt')}{' '}
              <a href="/register" className="border-b">
                {i18n.t<string>('auth.cognito.errors.forgotPasswordGeneric.ctaText')}.
              </a>
            </Typography>
          </div>
        )
      case 'RegisterGenericException':
        return (
          <div className="border-negative p-4" data-testid="alertRegisterGeneric">
            <Typography size={TypographySize.Small}>
              {i18n.t<string>('auth.cognito.errors.registerGeneric.prompt')}{' '}
              <a href="/login" className="border-b">
                {i18n.t<string>('auth.cognito.errors.registerGeneric.ctaText')}.
              </a>
            </Typography>
          </div>
        )
      case 'ConfirmUserNotFoundException':
        return (
          <div className="border-negative p-4" data-testid="alertConfirmUserNotFound">
            <Typography size={TypographySize.Small}>
              {i18n.t<string>('auth.cognito.errors.confirmUserNotFound.prompt')}{' '}
              <a href="/register" className="border-b">
                {i18n.t<string>('auth.cognito.errors.confirmUserNotFound.ctaText')}.
              </a>
            </Typography>
          </div>
        )
      case 'ConfirmUserInvalidParameterException':
        return (
          <div className="border-negative p-4" data-testid="alertRegisterInvalidParam">
            <Typography size={TypographySize.Small}>
              {i18n.t<string>('auth.cognito.errors.confirmUserInvalidParameter.prompt')}{' '}
              <a href="/login" className="border-b">
                {i18n.t<string>('auth.cognito.errors.confirmUserInvalidParameter.ctaText')}.
              </a>
            </Typography>
          </div>
        )
      case 'UserNotFoundException':
      case 'UsernameExistsException':
      case 'NotAuthorizedException':
        return (
          <div className="border-negative p-4" data-testid="alertIncorrectUserNameOrPassword">
            <Typography size={TypographySize.Small}>
              {i18n.t<string>('auth.cognito.errors.incorrectUserNameOrPassword')}
            </Typography>
          </div>
        )
      case 'CodeMismatchException':
        return (
          <div className="border-negative p-4" data-testid="alertInvalidCode">
            <Typography size={TypographySize.Small}>{i18n.t<string>('auth.cognito.errors.invalidCode')}</Typography>
          </div>
        )
      default:
        return (
          <div className="border-negative p-4" data-testid="alertGeneric">
            <Typography size={TypographySize.Small}>{i18n.t<string>('auth.cognito.errors.generic')}</Typography>
          </div>
        )
    }
  } else return <></>
}
