import React, { ChangeEventHandler } from 'react'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormCodeProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const AuthFormCode: React.FC<AuthFormCodeProps> = ({ screenKey, onChange }: AuthFormCodeProps) => {
  return (
    <AuthFormItemInput
      name="code"
      label={i18n.t(`auth.${screenKey}.code.label`)}
      rules={[
        { required: true, message: i18n.t(`auth.${screenKey}.code.error.required`) },
        () => ({
          validator(_, value) {
            // eslint-disable-next-line no-useless-escape
            const format = /^\d{6}$/
            if (!value || value.match(format)) {
              return Promise.resolve()
            }
            return Promise.reject(new Error(i18n.t(`auth.${screenKey}.code.error.format`)))
          },
        }),
      ]}
      type="text"
      placeholder={i18n.t(`auth.${screenKey}.code.placeholder`)}
      onChange={onChange}
      dataTestId="code"
    />
  )
}
