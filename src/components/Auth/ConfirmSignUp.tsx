import Auth from '@aws-amplify/auth'
import { ConfirmSignUp } from 'aws-amplify-react'
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece'
import Form from 'rc-field-form'
import React from 'react'
import { Typography } from 'src/components'
import i18n from 'src/config/i18n'

import { AuthCognitoErrors, AuthFormAction, AuthFormButton, AuthFormCode, AuthFormItemInput } from '.'

interface ConfirmSignUpParams {
  username: string
  code: string
}

export class AuthConfirmSignUp extends ConfirmSignUp {
  constructor(props: IAuthPieceProps) {
    super(props)
    this._validAuthStates = ['confirmSignUp', 'confirmSignUpError']
  }

  confirmSignUpUser = async (params: ConfirmSignUpParams): Promise<void> => {
    await Auth.confirmSignUp(params.username, params.code)
      .then(() => {
        this.changeState('signIn', params.username)
        //message.success(i18n.t('auth.confirmSignUp.success'), 10)
      })
      .catch((error) => {
        if (error.toString().indexOf('UserNotFoundException') !== -1) {
          this.changeState('confirmSignUpError', { errorCode: 'ConfirmUserNotFoundException' })
        } else {
          if (error.toString().indexOf('CodeMismatchException') !== -1) {
            this.changeState('confirmSignUpError', { errorCode: 'CodeMismatchException' })
          } else {
            if (error.toString().indexOf('InvalidParameterException') !== -1) {
              this.changeState('confirmSignUpError', { errorCode: 'ConfirmUserInvalidParameterException' })
            } else {
              this.changeState('confirmSignUpError', { errorCode: 'OtherErrorCode' })
            }
          }
        }
      })
  }

  resendSignUpUser = async (): Promise<void> => {
    const email = this.inputs['']
    if (!email) {
      //message.error(i18n.t('error.generic'))
    } else {
      await Auth.resendSignUp(email)
        .then(() => console.log('TODO')) //message.success(i18n.t('auth.confirmSignUp.emailSent')))
        .catch(() => {
          console.log('TODO err')
          // message.error(i18n.t('error.generic'))
        })
    }
  }

  renderConfirmSignUpInputs(): JSX.Element {
    return (
      <div>
        <AuthFormItemInput
          name="username"
          label={i18n.t('auth.confirmSignUp.username.label')}
          rules={[{ required: true, message: i18n.t('auth.confirmSignUp.username.error.required') }]}
          type="email"
          placeholder={i18n.t('auth.confirmSignUp.username.placeholder')}
          onChange={this.handleInputChange}
          dataTestId="username"
        />
        <AuthFormCode screenKey="confirmSignUp" onChange={this.handleInputChange} />
      </div>
    )
  }

  renderConfirmSignUpButton(): JSX.Element {
    return <AuthFormButton ctaText={i18n.t('auth.confirmSignUp.cta')} />
  }

  renderConfirmSignUpMiddleActions(): JSX.Element {
    return (
      <AuthFormAction
        promptText={`${i18n.t('auth.confirmSignUp.resend.prompt')} `}
        onClick={this.resendSignUpUser}
        dataTestId="resend"
        ctaText={i18n.t('auth.confirmSignUp.resend.action')}
      />
    )
  }

  renderConfirmSignUpFooterActions(): JSX.Element {
    return (
      <AuthFormAction
        promptText={`${i18n.t('auth.confirmSignUp.signIn.prompt')} `}
        onClick={() => this.changeState('signIn')}
        dataTestId="goToSignInLink"
        ctaText={i18n.t('auth.confirmSignUp.signIn.action')}
      />
    )
  }

  render(): JSX.Element {
    return (
      <div className="auth-container">
        <Typography>{i18n.t<string>('auth.confirmSignUp.title')}</Typography>
        <Typography>{i18n.t<string>('auth.confirmSignUp.text')}</Typography>
        <div className="form-container">
          <AuthCognitoErrors errorCode={this.props.authData?.errorCode} />
          <Form name="confirmSignUp" onFinish={this.confirmSignUpUser}>
            {this.renderConfirmSignUpInputs()}
            {this.renderConfirmSignUpMiddleActions()}
            {this.renderConfirmSignUpButton()}
            {this.renderConfirmSignUpFooterActions()}
          </Form>
        </div>
      </div>
    )
  }
}

export default AuthConfirmSignUp
