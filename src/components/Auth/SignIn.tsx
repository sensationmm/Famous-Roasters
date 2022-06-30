import Auth from '@aws-amplify/auth'
import { SignIn } from 'aws-amplify-react'
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece'
import React from 'react'
import {
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

// import { AuthCognitoErrors, AuthFormAction, AuthFormButton } from '.'

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

  renderSignInButton(): JSX.Element {
    return (
      <Button
        type="submit"
        emphasis={ButtonEmphasis.Primary}
        size={ButtonSize.lg}
        data-testid="submit"
        className="flex w-full justify-center"
      >
        {i18n.t<string>('auth.signIn.title')}
      </Button>
    )
    // return <AuthFormButton ctaText={i18n.t('auth.signIn.title')} />
  }

  renderSignInMiddleActions(): JSX.Element {
    return (
      <div>SignInMiddleActions</div>
      /*<AuthFormAction
        promptText={`${i18n.t('auth.signIn.forgotPassword.prompt')} `}
        onClick={() => this.changeState('forgotPassword')}
        dataTestId="forgotPasswordLink"
        ctaText={i18n.t('auth.signIn.forgotPassword.action')}
      />*/
    )
  }

  renderSignInFooterActions(): JSX.Element {
    return (
      <div>SignInFooterActions</div>
      /*<AuthFormAction
        promptText={`${i18n.t('auth.signIn.signUp.prompt')} `}
        onClick={() => this.changeState('signUp')}
        dataTestId="goToSignUpLink"
        ctaText={i18n.t('auth.signIn.signUp.action')}
      />*/
    )
  }

  render(): JSX.Element {
    return this.props.authState === 'signIn' || this.props.authState === 'signInError' ? (
      <div>
        <div className="flex w-full justify-center">
          <Badge size={107} />
        </div>
        <div className="flex w-full justify-center mt-6">
          <Typography type={TypographyType.Heading} size={TypographySize.Small}>
            {i18n.t<string>('auth.welcome')}
          </Typography>
        </div>
        <div className="mt-12">
          {/*<AuthCognitoErrors errorCode={this.props.authData?.errorCode} />*/}
          <form name="signIn">
            {this.renderSignInInputs()}
            {this.renderSignInMiddleActions()}
            {this.renderSignInButton()}
            {this.renderSignInFooterActions()}
          </form>
        </div>
      </div>
    ) : (
      <></>
    )
  }
}

export default AuthSignIn
