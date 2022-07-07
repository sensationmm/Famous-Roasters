import Auth from '@aws-amplify/auth'
import { ForgotPassword } from 'aws-amplify-react'
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece'
import Form from 'rc-field-form'
import React from 'react'
import { Button, ButtonEmphasis, ButtonSize, Typography, TypographySize, TypographyType } from 'src/components'
import i18n from 'src/config/i18n'

import {
  AuthCognitoErrors,
  AuthFormAction,
  AuthFormButton,
  AuthFormCode,
  AuthFormDoublePassword,
  AuthFormItemInput,
} from '.'

interface ForgotPasswordParams {
  username: string
}

interface SetPasswordParams {
  username: string
  code: string
  password: string
}

export class AuthForgotPassword extends ForgotPassword {
  constructor(props: IAuthPieceProps) {
    super(props)
    this.state = { delivery: null }
    this._validAuthStates = ['forgotPassword', 'forgotPasswordError']
  }

  forgotPasswordUser = async (params: ForgotPasswordParams): Promise<void> => {
    await Auth.forgotPassword(params.username)
      .then((data) => {
        this.inputs.username = params.username
        this.setState({ delivery: data.CodeDeliveryDetails })
        this.changeState('forgotPassword', null)
        // message.success(i18n.t('auth.forgotPassword.emailSent'))
      })
      .catch((error) => {
        if (error.toString().indexOf('UserNotFoundException') !== -1) {
          this.changeState('forgotPasswordError', { errorCode: 'ForgotPasswordGenericException' })
        } else {
          this.changeState('forgotPasswordError', { errorCode: 'OtherErrorCode' })
        }
      })
  }

  setNewPasswordUser = async (params: SetPasswordParams): Promise<void> => {
    await Auth.forgotPasswordSubmit(params.username, params.code, params.password)
      .then(() => {
        this.changeState('signIn')
        this.setState({ delivery: null })
        // message.success(i18n.t('auth.forgotPassword.setNewPassword.success'), 10)
      })
      .catch((error) => {
        if (error.toString().indexOf('CodeMismatchException') !== -1) {
          this.changeState('forgotPasswordError', { errorCode: 'CodeMismatchException' })
        } else {
          this.changeState('forgotPasswordError', { errorCode: 'OtherErrorCode' })
        }
      })
  }

  renderSetNewPasswordResend(): JSX.Element {
    return (
      <AuthFormAction
        promptText={`${i18n.t('auth.forgotPassword.resend.prompt')} `}
        onClick={() => this.forgotPasswordUser({ username: this.inputs.username })}
        dataTestId="resend"
        ctaText={i18n.t('auth.forgotPassword.resend.action')}
      />
    )
  }

  renderSetNewPasswordInputs(): JSX.Element {
    return (
      <>
        <div className="w-full mt-8">
          <AuthFormItemInput
            name="username"
            label={i18n.t('auth.forgotPassword.username.label')}
            rules={[{ required: true, message: i18n.t('auth.forgotPassword.username.error.required') }]}
            type="email"
            placeholder={i18n.t('auth.forgotPassword.username.placeholder')}
            disabled={true}
            value={this.inputs.username}
            dataTestId="username"
          />
        </div>
        <div className="w-full mt-8">{this.renderSetNewPasswordResend()}</div>
        <div className="w-full mt-8">
          <AuthFormCode screenKey="forgotPassword.setNewPassword" onChange={this.handleInputChange} />
        </div>
        <div className="w-full mt-8">
          <AuthFormDoublePassword screenKey="forgotPassword.setNewPassword" onChange={this.handleInputChange} />
        </div>
      </>
    )
  }

  renderForgotPasswordInputs(): JSX.Element {
    return (
      <div className="w-full mt-8">
        <AuthFormItemInput
          name="username"
          label={i18n.t('auth.forgotPassword.username.label')}
          rules={[
            { required: true, message: i18n.t(`auth.forgotPassword.username.error.required`) },
            { type: 'email', message: i18n.t(`auth.forgotPassword.username.error.invalidFormat`) },
          ]}
          type="email"
          placeholder={i18n.t('auth.forgotPassword.username.placeholder')}
          onChange={this.handleInputChange}
          dataTestId="username"
        />
      </div>
    )
  }

  renderForgotPassword(disabled: boolean): JSX.Element {
    return (
      <>
        {this.renderForgotPasswordInputs()}
        <div className="mt-8">
          <AuthFormButton disabled={disabled} ctaText={i18n.t('auth.forgotPassword.cta')} />
        </div>
      </>
    )
  }

  renderSetNewPassword(): JSX.Element {
    return (
      <>
        {this.renderSetNewPasswordInputs()}
        <div className="mt-8">
          <AuthFormButton ctaText={i18n.t('auth.forgotPassword.setNewPassword.cta')} />
        </div>
      </>
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
    const showSetNewPassword = this.state.delivery
    return (
      <div className="my-4 mx-6 md:mx-0">
        <div className="flex w-full">
          <Typography type={TypographyType.Heading} size={TypographySize.Small}>
            {i18n.t<string>('auth.forgotPassword.title')}
          </Typography>
        </div>
        <div className="flex w-full mt-2">
          <Typography type={TypographyType.Paragraph} size={TypographySize.Small}>
            {i18n.t<string>('auth.forgotPassword.text')}
          </Typography>
        </div>
        <div className="mt-4">
          <AuthCognitoErrors errorCode={this.props.authData?.errorCode} />
        </div>
        <Form name="forgotPassword" onFinish={showSetNewPassword ? this.setNewPasswordUser : this.forgotPasswordUser}>
          {(_, form) => {
            const allTouched = showSetNewPassword ? true : form.isFieldTouched('username')
            const hasErrors = form.getFieldsError().filter((entry) => entry.errors.length > 0).length > 0
            return (
              <>
                {showSetNewPassword ? this.renderSetNewPassword() : this.renderForgotPassword(!allTouched || hasErrors)}
                <AuthFormAction
                  onClick={() => this.changeState('signIn')}
                  dataTestId="goToSignInLink"
                  ctaText={i18n.t('auth.forgotPassword.signIn.action')}
                  className="flex w-fit mt-6 mb-6 border-b cursor-pointer"
                />
              </>
            )
          }}
        </Form>
        {this.renderSignInFooterActions()}
      </div>
    )
  }
}

export default AuthForgotPassword
