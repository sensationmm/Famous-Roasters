import Auth from '@aws-amplify/auth'
import { SignIn } from 'aws-amplify-react'
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece'
import Form from 'rc-field-form'
import React from 'react'
import {
  AuthCognitoErrors,
  AuthFooter,
  AuthFormAction,
  AuthFormButton,
  AuthFormEmail,
  AuthFormPassword,
  Badge,
  Button,
  ButtonEmphasis,
  ButtonSize,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import i18n from 'src/config/i18n'

interface SignInParams {
  email: string
  password: string
}

export class AuthSignIn extends SignIn {
  constructor(props: IAuthPieceProps) {
    super(props)
    this._validAuthStates = ['signIn', 'signInError']
  }

  signInUser = async (params: SignInParams): Promise<void> => {
    await Auth.signIn(params.email, params.password)
      .then(() => {
        this.changeState('signedIn', params.email)
        window.location.reload()
      })
      .catch((error) => {
        if (
          error.toString().indexOf('UserNotFoundException') !== -1 ||
          error.toString().indexOf('NotAuthorizedException') !== -1
        ) {
          this.changeState('signInError', { errorCode: 'LoginGenericException' })
        } else {
          this.changeState('signInError', { errorCode: 'OtherErrorCode' })
        }
      })
  }

  renderSignInInputs(): JSX.Element {
    return (
      <>
        <div className="w-full">
          <AuthFormEmail screenKey="signIn" onChange={this.handleInputChange} />
        </div>
        <div className="w-full mt-8">
          <AuthFormPassword screenKey="signIn" onChange={this.handleInputChange} />
        </div>
      </>
    )
  }

  renderSignInButton(disabled: boolean): JSX.Element {
    return <AuthFormButton ctaText={i18n.t<string>('auth.signIn.title')} disabled={disabled} />
  }

  renderSignInMiddleActions(): JSX.Element {
    return (
      <AuthFormAction
        onClick={() => this.changeState('forgotPassword')}
        dataTestId="forgotPasswordLink"
        ctaText={i18n.t<string>('auth.signIn.forgotPassword.action')}
        className="flex w-fit float-right mt-6 mb-6 border-b cursor-pointer"
      />
    )
  }

  renderSignInFooterActions(): JSX.Element {
    return (
      <div className="mt-10">
        <div className="flex">
          <div className="border-t border-brand-grey-whisper absolute w-full left-0" />
        </div>
        <Typography as="div" type={TypographyType.Heading} size={TypographySize.Tiny} className="mt-4 mb-4">
          {i18n.t<string>('auth.signIn.signUp.prompt')}
        </Typography>
        <Button
          type="button"
          emphasis={ButtonEmphasis.Tertiary}
          size={ButtonSize.lg}
          onClick={() => this.changeState('signUp')}
          data-testid="goToSignUpLink"
          className="flex w-full justify-center"
        >
          {i18n.t<string>('auth.signIn.signUp.action')}
        </Button>
      </div>
    )
  }

  render(): JSX.Element {
    return this.props.authState === 'signIn' || this.props.authState === 'signInError' ? (
      <div className="my-8 mx-6 md:my-12 md:mx-0">
        <div className="flex w-full justify-center">
          <Badge size={107} />
        </div>
        <div className="flex w-full justify-center mt-6">
          <Typography type={TypographyType.Heading} size={TypographySize.Small}>
            {i18n.t<string>('auth.welcome')}
          </Typography>
        </div>
        <div className="mt-12">
          <AuthCognitoErrors errorCode={this.props.authData?.errorCode} />
          <Form name="signIn" onFinish={this.signInUser} method="POST">
            {(_, form) => {
              const allTouched = form.isFieldTouched('email') && form.isFieldTouched('password')
              const hasErrors = form.getFieldsError().filter((entry) => entry.errors.length > 0).length > 0
              return (
                <>
                  {this.renderSignInInputs()}
                  {this.renderSignInMiddleActions()}
                  {this.renderSignInButton(!allTouched || hasErrors)}
                  {this.renderSignInFooterActions()}
                </>
              )
            }}
          </Form>
        </div>
        <div className="mt-12">
          <AuthFooter />
        </div>
      </div>
    ) : (
      <></>
    )
  }
}

export default AuthSignIn
