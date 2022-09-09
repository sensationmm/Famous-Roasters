import { FormInstance } from 'rc-field-form'
import React, { ChangeEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, IconName, Typography, TypographySize, TypographyType } from 'src/components'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormDoublePasswordProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: FormInstance<any>
}

export const AuthFormDoublePassword: React.FC<AuthFormDoublePasswordProps> = ({
  screenKey,
  onChange,
  form,
}: AuthFormDoublePasswordProps) => {
  const { t } = useTranslation()

  const passwordRules = [
    i18n.t(`auth.${screenKey}.password.error.minLength`),
    i18n.t(`auth.${screenKey}.password.error.mustContainUpperLowercase`),
    i18n.t(`auth.${screenKey}.password.error.mustContainNumber`),
    i18n.t(`auth.${screenKey}.password.error.mustContainSpecial`),
    i18n.t(`auth.${screenKey}.password.error.noSpaces`),
  ]

  const passwordValue = form?.getFieldValue('password') || ''
  const passwordErrors = form?.getFieldError('password') || []

  return (
    <>
      <div>
        <AuthFormItemInput
          name="password"
          label={i18n.t(`auth.${screenKey}.password.label`)}
          rules={[
            { required: true, message: i18n.t(`auth.${screenKey}.password.error.required`) },
            { min: 8, message: passwordRules[0] },
            { max: 20, message: passwordRules[0] },
            () => ({
              validator(_, value) {
                const lowercase = /(?=([a-z]+){1})/
                if (!value || value.match(lowercase)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(passwordRules[1]))
              },
            }),
            () => ({
              validator(_, value) {
                const uppercase = /(?=([A-Z]+){1})/
                if (!value || value.match(uppercase)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(passwordRules[1]))
              },
            }),
            () => ({
              validator(_, value) {
                const numbers = /(?=(\d+){1})/
                if (!value || value.match(numbers)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(passwordRules[2]))
              },
            }),
            () => ({
              validator(_, value) {
                // eslint-disable-next-line no-useless-escape
                const special = /(?=([\^$*.\[\]{}\(\)?\-"!@#%&\/,><\’:;|_~`]+){1})/
                if (!value || value.match(special)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(passwordRules[3]))
              },
            }),
            () => ({
              validator(_, value) {
                // eslint-disable-next-line no-useless-escape
                const space = /\s/g
                if (!value || !value.match(space)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(passwordRules[4]))
              },
            }),
          ]}
          type="password"
          hasFeedback
          placeholder={i18n.t(`auth.${screenKey}.password.placeholder`)}
          onChange={onChange}
          dataTestId="password"
          hideErrors
          validateTrigger="onChange"
        />
      </div>
      <div className="mt-8">
        <AuthFormItemInput
          name="passwordRepeat"
          label={i18n.t(`auth.${screenKey}.passwordRepeat.label`)}
          rules={[
            {
              required: true,
              message: i18n.t(`auth.${screenKey}.passwordRepeat.error.required`),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(i18n.t(`auth.${screenKey}.passwordRepeat.error.matchError`)))
              },
            }),
          ]}
          type="password"
          hasFeedback
          placeholder={i18n.t(`auth.${screenKey}.passwordRepeat.placeholder`)}
          onChange={onChange}
          dataTestId="passwordRepeat"
        />
      </div>
      {form && (
        <div className="mt-4 p-4 pb-1 bg-brand-grey-whisper rounded-md">
          <Typography type={TypographyType.Label} size={TypographySize.Small} className="block pb-4">
            {t('auth.signUp.password.rules')}
          </Typography>
          {passwordRules.map((err, count) => {
            const color =
              passwordErrors?.indexOf(err) > -1 || passwordValue === '' ? 'fill-coreUI-text-tertiary' : 'fill-positive'
            return (
              <div className="flex mb-4" key={`rule-${count}`}>
                <Icon name={IconName.Check} className={`mr-2 ${color} shrink-0`} />
                <Typography type={TypographyType.Paragraph} size={TypographySize.Small}>
                  {err}
                </Typography>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
