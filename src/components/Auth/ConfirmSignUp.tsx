import Auth from '@aws-amplify/auth'
import { ConfirmSignUp } from 'aws-amplify-react'
import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece'
import Form from 'rc-field-form'
import React from 'react'
import { Button, ButtonEmphasis, ButtonSize, Typography, TypographySize, TypographyType } from 'src/components'
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
      <>
        <div className="w-full mt-8">
          <AuthFormItemInput
            name="username"
            label={i18n.t('auth.confirmSignUp.username.label')}
            rules={[{ required: true, message: i18n.t('auth.confirmSignUp.username.error.required') }]}
            type="email"
            placeholder={i18n.t('auth.confirmSignUp.username.placeholder')}
            onChange={this.handleInputChange}
            dataTestId="username"
          />
        </div>
        <div className="w-full mt-8">
          <AuthFormCode screenKey="confirmSignUp" onChange={this.handleInputChange} />
        </div>
      </>
    )
  }

  renderConfirmSignUpButton(disabled: boolean): JSX.Element {
    return (
      <div className="w-full mt-8">
        <AuthFormButton disabled={disabled} ctaText={i18n.t('auth.confirmSignUp.cta')} />
      </div>
    )
  }

  renderConfirmSignUpMiddleActions(): JSX.Element {
    return (
      <div className="w-full mt-8">
        <Typography type={TypographyType.Paragraph} size={TypographySize.Tiny}>
          {i18n.t<string>('auth.confirmSignUp.resend.prompt')}
        </Typography>
        <AuthFormAction
          onClick={this.resendSignUpUser}
          dataTestId="resend"
          ctaText={i18n.t('auth.confirmSignUp.resend.action')}
          className="flex w-fit border-b cursor-pointer"
        />
      </div>
    )
  }

  renderConfirmSignUpFooterActions(): JSX.Element {
    return (
      <div className="mt-10">
        <div className="flex">
          <div className="border-t border-brand-grey-whisper absolute w-full left-0" />
        </div>
        <Typography as="div" type={TypographyType.Heading} size={TypographySize.Tiny} className="mt-4 mb-4">
          {i18n.t<string>('auth.confirmSignUp.signIn.prompt')}
        </Typography>
        <Button
          type="button"
          emphasis={ButtonEmphasis.Tertiary}
          size={ButtonSize.lg}
          onClick={() => this.changeState('signIn')}
          data-testid="goToSignInLink"
          className="flex w-full justify-center"
        >
          {i18n.t<string>('auth.confirmSignUp.signIn.action')}
        </Button>
      </div>
    )
  }

  render(): JSX.Element {
    return (
      <div className="my-4 mx-6 md:mx-0">
        <div className="flex w-full">
          <Typography type={TypographyType.Heading} size={TypographySize.Small}>
            {i18n.t<string>('auth.confirmSignUp.title')}
          </Typography>
        </div>
        <div className="flex w-full">
          <Typography type={TypographyType.Paragraph} size={TypographySize.Base}>
            {i18n.t<string>('auth.confirmSignUp.subtitle')}
          </Typography>
        </div>
        <div className="flex w-full mt-2">
          <Typography type={TypographyType.Paragraph} size={TypographySize.Small}>
            {i18n.t<string>('auth.confirmSignUp.text')}
          </Typography>
        </div>
        <div className="mt-4">
          <AuthCognitoErrors errorCode={this.props.authData?.errorCode} />
        </div>
        <Form name="confirmSignUp" onFinish={this.confirmSignUpUser}>
          {(_, form) => {
            const allTouched = form.isFieldTouched('username') && form.isFieldTouched('code')
            const hasErrors = form.getFieldsError().filter((entry) => entry.errors.length > 0).length > 0
            return (
              <>
                {this.renderConfirmSignUpInputs()}
                {this.renderConfirmSignUpButton(!allTouched || hasErrors)}
                {this.renderConfirmSignUpMiddleActions()}
                {this.renderConfirmSignUpFooterActions()}
              </>
            )
          }}
        </Form>
      </div>
    )
  }
}

export default AuthConfirmSignUp
