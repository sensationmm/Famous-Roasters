import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import { SignUp } from 'aws-amplify-react'
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece'
import Form, { FormInstance } from 'rc-field-form'
import React from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  AuthFooter,
  Button,
  ButtonEmphasis,
  ButtonSize,
  Icon,
  IconName,
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

export const socialSignInButtons = () => (
  <div className="grid grid-cols-2 gap-4">
    <Button
      emphasis={ButtonEmphasis.Tertiary}
      center
      onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
    >
      <Icon name={IconName.Google} />
    </Button>
    <Button emphasis={ButtonEmphasis.Tertiary} center disabled>
      <Icon name={IconName.Apple} />
    </Button>
  </div>
)

export class AuthSignUp extends SignUp {
  constructor(props: IAuthPieceProps) {
    super(props)
    this._validAuthStates = ['signUp', 'signUpError']
  }

  signUpUser = async (params: SignUpParams): Promise<void> => {
    const tasteFinderLocalStorage = localStorage.getItem('tasteFinder') || ''
    let savedAroma = ''
    if (tasteFinderLocalStorage !== '') {
      const tasteFinderJSON = JSON.parse(JSON.parse(tasteFinderLocalStorage))
      savedAroma = tasteFinderJSON.find((p: TasteFinderField) => p.name === 'aroma')?.value || ''
    }

    await Auth.signUp({
      username: params.email,
      password: params.password,
      attributes: {
        'custom:tos_consent': 'true',
        'custom:first_name': params.firstName,
        'custom:newsletter_signup': this.inputs['newsletterSignup'] || 'false',
        'custom:aroma': savedAroma,
      },
      autoSignIn: {
        enabled: true,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSignUpInputs(form: FormInstance<any>): JSX.Element {
    const searchParams = new URLSearchParams(window.location.search)
    return (
      <>
        <div className="w-full mt-6">
          <AuthFormFirstName
            screenKey="signUp"
            onChange={this.handleInputChange}
            value={searchParams.get('name') || ''}
          />
        </div>
        <div className="w-full mt-6">
          <AuthFormEmail screenKey="signUp" onChange={this.handleInputChange} value={searchParams.get('email') || ''} />
        </div>
        <div className="w-full mt-8">
          <AuthFormDoublePassword screenKey="signUp" onChange={this.handleInputChange} form={form} />
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
        className="flex w-fit float-left mt-6 mb-6 border-b cursor-pointer"
      />
    )
  }

  renderConfirmNewsletter(): JSX.Element {
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
      </>
    )
  }

  renderLegalConsent(): JSX.Element {
    return (
      <>
        <div className="mt-8">
          <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Tiny} className="font-normal">
            <Trans
              i18nKey="auth.signUp.confirmTos.consentLabel"
              components={[
                <Link to="//www.60beans.com/legal/agb" target="_blank" />,
                <Link to="//www.60beans.com/legal/datenschutz" target="_blank" />,
              ]}
            ></Trans>
          </Typography>
        </div>
      </>
    )
  }

  renderSignUpFooterActions(): JSX.Element {
    return (
      <div className="mt-8">
        <div className="flex">
          <div className="border-t border-brand-grey-whisper absolute w-full left-0" />
        </div>
        <Typography as="div" type={TypographyType.Heading} size={TypographySize.Tiny} className="mt-6 mb-6">
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
          <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Small}>
            {i18n.t<string>('auth.signUp.title')}
          </Typography>
        </div>
        <div className="mt-4">
          <Typography
            as="p"
            type={TypographyType.Label}
            size={TypographySize.Tiny}
            className="mb-2 uppercase font-normal text-coreUI-text-secondary"
          >
            {i18n.t<string>('auth.signUp.withSocial')}
          </Typography>
          {socialSignInButtons()}
        </div>
        <div className="mt-6 md:mt-10">
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
              const searchParams = new URLSearchParams(window.location.search)
              const allTouched =
                (form.isFieldTouched('email') || searchParams.get('email') !== '') &&
                form.isFieldTouched('password') &&
                form.isFieldTouched('passwordRepeat')
              const hasErrors = form.getFieldsError().filter((entry) => entry.errors.length > 0).length > 0
              return (
                <>
                  {this.renderSignUpInputs(form)}
                  {this.renderConfirmNewsletter()}
                  {this.renderSignUpButton(form.getFieldsValue(), !allTouched || hasErrors)}
                  {this.renderLegalConsent()}
                  {/* {this.renderSignUpMiddleActions()} */}
                  {this.renderSignUpFooterActions()}
                </>
              )
            }}
          </Form>
        </div>
        <div className="mt-8 mb-12">
          <AuthFooter />
        </div>
      </div>
    ) : (
      <></>
    )
  }
}

export default AuthSignUp
