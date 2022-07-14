import React, { ChangeEventHandler } from 'react'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormFirstNameProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const AuthFormFirstName: React.FC<AuthFormFirstNameProps> = ({
  screenKey,
  onChange,
}: AuthFormFirstNameProps) => {
  return (
    <AuthFormItemInput
      name="firstName"
      label={i18n.t(`auth.${screenKey}.firstName.label`)}
      rules={[{ required: true, message: i18n.t(`auth.${screenKey}.firstName.error.required`) }]}
      placeholder={i18n.t(`auth.${screenKey}.firstName.placeholder`)}
      onChange={onChange}
      dataTestId="firstName"
    />
  )
}
