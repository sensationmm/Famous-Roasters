import React, { ChangeEventHandler } from 'react'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormPasswordProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const AuthFormPassword: React.FC<AuthFormPasswordProps> = ({ screenKey, onChange }: AuthFormPasswordProps) => {
  return (
    <AuthFormItemInput
      name="password"
      label={i18n.t(`auth.${screenKey}.password.label`)}
      type="password"
      hasFeedback
      placeholder={i18n.t(`auth.${screenKey}.password.placeholder`)}
      onChange={onChange}
      dataTestId="password"
    />
  )
}
