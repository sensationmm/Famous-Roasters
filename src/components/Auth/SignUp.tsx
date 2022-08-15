import Auth from '@aws-amplify/auth'
import { SignUp } from 'aws-amplify-react'
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece'
import Form from 'rc-field-form'
import React from 'react'
import {
  AuthFooter,
  Button,
  ButtonEmphasis,
  ButtonSize,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import i18n from 'src/config/i18n'
import { TasteFinderField } from 'src/views/TasteFinder'

import {
  AuthCognitoErrors,
  AuthFormAction,
  AuthFormButton,
  AuthFormCheckbox,
  AuthFormDoublePassword,
  AuthFormEmail,
  AuthFormFirstName,
} from '.'

interface SignUpParams {
  email: string
  password: string
  firstName: string
  userConfirmed: boolean
  newsletterSignup: boolean
}

export class AuthSignUp extends SignUp {
  constructor(props: IAuthPieceProps) {
    super(props)
    this._validAuthStates = ['signUp', 'signUpError']
  }

  signUpUser = async (params: SignUpParams): Promise<void> => {
    const tasteFinderLocalStorage = localStorage.getItem('tasteFinder') || ''
    const tasteFinderJSON = JSON.parse(JSON.parse(tasteFinderLocalStorage))
    const savedAroma = tasteFinderJSON.find((p: TasteFinderField) => p.name === 'aroma').value
    await Auth.signUp({
      username: params.email,
      password: params.password,
      attributes: {
        'custom:tos_consent': this.inputs['confirmTos'],
        'custom:first_name': params.firstName,
        'custom:newsletter_signup': this.inputs['newsletterSignup'] || 'false',
        'custom:aroma': savedAroma || '',
      },
    })
      .then(() => this.changeState('confirmSignUp', { username: params.email }))
      .catch((error) => {
        if (error.toString().indexOf('UsernameExistsException') !== -1) {
          this.changeState('signUpError', { errorCode: 'RegisterGenericException' })
        } else {
          this.changeState('signUpError', { errorCode: 'OtherErrorCode' })
        }
      })
  }

  renderSignUpInputs(): JSX.Element {
    return (
      <>
        <div className="w-full mt-6">
          <AuthFormFirstName screenKey="signUp" onChange={this.handleInputChange} />
        </div>
        <div className="w-full mt-6">
          <AuthFormEmail screenKey="signUp" onChange={this.handleInputChange} />
        </div>
        <div className="w-full mt-8">
          <AuthFormDoublePassword screenKey="signUp" onChange={this.handleInputChange} />
        </div>
      </>
    )
  }

  renderSignUpButton(fields: SignUpParams, disabled: boolean): JSX.Element {
    return (
      <div className="mt-8">
        <AuthFormButton
          ctaText={`${i18n.t<string>('auth.signUp.cta')}`}
          disabled={disabled}
          onClick={() => this.signUpUser(fields)}
        />
      </div>
    )
  }

  renderSignUpMiddleActions(): JSX.Element {
    return (
      <AuthFormAction
        onClick={() => this.changeState('confirmSignUp')}
        dataTestId="confirmSignUpLink"
        ctaText={i18n.t<string>('auth.signUp.confirmSignUp.action')}
        className="flex w-fit float-right mt-6 mb-6 border-b cursor-pointer"
      />
    )
  }

  renderConfirmTos(): JSX.Element {
    return (
      <>
        <div className="mt-8">
          <AuthFormCheckbox
            dataTestId="newsletterSignup"
            screenKey="signUp.newsletterSignup"
            name="newsletterSignup"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mt-8">
          <AuthFormCheckbox
            dataTestId="confirmTos"
            screenKey="signUp.confirmTos"
            name="confirmTos"
            onChange={this.handleInputChange}
            required
          />
        </div>
      </>
    )
  }

  renderSignUpFooterActions(): JSX.Element {
    return (
      <div className="mt-16">
        <div className="flex">
          <div className="border-t border-brand-grey-whisper absolute w-full left-0" />
        </div>
        <Typography as="div" type={TypographyType.Heading} size={TypographySize.Tiny} className="mt-4 mb-4">
          {i18n.t<string>('auth.signUp.signIn.prompt')}
        </Typography>
        <Button
          type="button"
          emphasis={ButtonEmphasis.Tertiary}
          size={ButtonSize.lg}
          onClick={() => this.changeState('signIn')}
          data-testid="goToSignInLink"
          className="flex w-full justify-center"
        >
          {i18n.t<string>('auth.signUp.signIn.action')}
        </Button>
      </div>
    )
  }

  render(): JSX.Element {
    return this.props.authState === 'signUp' || this.props.authState === 'signUpError' ? (
      <div className="my-4 mx-6 md:mx-0">
        <div className="flex w-full">
          <Typography type={TypographyType.Heading} size={TypographySize.Small}>
            {i18n.t<string>('auth.signUp.title')}
          </Typography>
        </div>
        <div className="mt-12">
          <div className="flex">
            <div className="border-t border-brand-grey-whisper absolute w-full left-0" />
          </div>
          <div className="w-full mt-4">
            <Typography
              as="div"
              type={TypographyType.Label}
              size={TypographySize.Tiny}
              className="uppercase font-normal text-coreUI-text-secondary"
            >
              {i18n.t<string>('auth.signUp.withEmail')}
            </Typography>
          </div>
          <div className="mt-4">
            <AuthCognitoErrors errorCode={this.props.authData?.errorCode} />
          </div>
          <Form name="signUp" method="POST">
            {(_, form) => {
              const allTouched =
                form.isFieldTouched('email') && form.isFieldTouched('password') && form.isFieldTouched('passwordRepeat')
              const hasErrors =
                form.getFieldsError().filter((entry) => entry.errors.length > 0).length > 0 ||
                'confirmTos' in this.inputs === false ||
                this.inputs['confirmTos'] !== 'true'

              return (
                <>
                  {this.renderSignUpInputs()}
                  {this.renderConfirmTos()}
                  {this.renderSignUpButton(form.getFieldsValue(), !allTouched || hasErrors)}
                  {this.renderSignUpMiddleActions()}
                  {this.renderSignUpFooterActions()}
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

export default AuthSignUp
