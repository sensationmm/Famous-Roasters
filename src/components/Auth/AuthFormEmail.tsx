import React, { ChangeEventHandler } from 'react'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormEmailProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
  value?: string
}

export const AuthFormEmail: React.FC<AuthFormEmailProps> = ({ screenKey, onChange, value }: AuthFormEmailProps) => {
  return (
    <AuthFormItemInput
      name="email"
      label={i18n.t(`auth.${screenKey}.email.label`)}
      type="email"
      rules={[
        { required: true, message: i18n.t(`auth.${screenKey}.email.error.required`) },
        { type: 'email', message: i18n.t(`auth.${screenKey}.email.error.invalidFormat`) },
      ]}
      placeholder={i18n.t(`auth.${screenKey}.email.placeholder`)}
      onChange={onChange}
      dataTestId="email"
      value={value}
    />
  )
}
