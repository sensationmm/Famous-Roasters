import React, { ChangeEventHandler, useState } from 'react'
import { Icon, IconName } from 'src/components'
import i18n from 'src/config/i18n'

import { AuthFormItemInput } from '.'

interface AuthFormPasswordProps {
  screenKey: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const AuthFormPassword: React.FC<AuthFormPasswordProps> = ({ screenKey, onChange }: AuthFormPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <AuthFormItemInput
      name="password"
      label={i18n.t(`auth.${screenKey}.password.label`)}
      type={!showPassword ? 'password' : 'text'}
      rules={[{ required: true, message: i18n.t(`auth.${screenKey}.password.error.required`) }]}
      hasFeedback
      placeholder={i18n.t(`auth.${screenKey}.password.placeholder`)}
      onChange={onChange}
      dataTestId="password"
      icon={
        <div
          data-testid="password-view-toggle"
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? IconName.PasswordHide : IconName.PasswordShow}
            className="text-coreUI-text-secondary"
          />
        </div>
      }
    />
  )
}
