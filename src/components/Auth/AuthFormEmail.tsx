import React, { ChangeEventHandler } from 'react'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormEmailProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const AuthFormEmail: React.FC<AuthFormEmailProps> = ({ screenKey, onChange }: AuthFormEmailProps) => {
  return (
    <AuthFormItemInput
      name="email"
      label={i18n.t(`auth.${screenKey}.email.label`)}
      type="email"
      hasFeedback
      placeholder={i18n.t(`auth.${screenKey}.email.placeholder`)}
      onChange={onChange}
      dataTestId="email"
    />
  )
}
