import React, { ChangeEventHandler } from 'react'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormDoublePasswordProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const AuthFormDoublePassword: React.FC<AuthFormDoublePasswordProps> = ({
  screenKey,
  onChange,
}: AuthFormDoublePasswordProps) => {
  return (
    <>
      <div>
        <AuthFormItemInput
          name="password"
          label={i18n.t(`auth.${screenKey}.password.label`)}
          rules={[
            { required: true, message: i18n.t(`auth.${screenKey}.password.error.required`) },
            { min: 8, message: i18n.t(`auth.${screenKey}.password.error.minLength`) },
            { max: 98, message: i18n.t(`auth.${screenKey}.password.error.maxLength`) },
            () => ({
              validator(_, value) {
                const lowercase = /(?=([a-z]+){1})/
                if (!value || value.match(lowercase)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(i18n.t(`auth.${screenKey}.password.error.mustContainLowercase`)))
              },
            }),
            () => ({
              validator(_, value) {
                const uppercase = /(?=([A-Z]+){1})/
                if (!value || value.match(uppercase)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(i18n.t(`auth.${screenKey}.password.error.mustContainUppercase`)))
              },
            }),
            () => ({
              validator(_, value) {
                const numbers = /(?=(\d+){1})/
                if (!value || value.match(numbers)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(i18n.t(`auth.${screenKey}.password.error.mustContainNumber`)))
              },
            }),
            () => ({
              validator(_, value) {
                // eslint-disable-next-line no-useless-escape
                const special = /(?=([\^$*.\[\]{}\(\)?\-"!@#%&\/,><\’:;|_~`]+){1})/
                if (!value || value.match(special)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(i18n.t(`auth.${screenKey}.password.error.mustContainSpecial`)))
              },
            }),
            () => ({
              validator(_, value) {
                // eslint-disable-next-line no-useless-escape
                const space = /\s/g
                if (!value || !value.match(space)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(i18n.t(`auth.${screenKey}.password.error.noSpaces`)))
              },
            }),
          ]}
          type="password"
          hasFeedback
          placeholder={i18n.t(`auth.${screenKey}.password.placeholder`)}
          onChange={onChange}
          dataTestId="password"
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
    </>
  )
}
