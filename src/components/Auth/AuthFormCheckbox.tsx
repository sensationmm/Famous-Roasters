import { Field } from 'rc-field-form'
import React from 'react'
import { Checkbox } from 'src/components'
import i18n from 'src/config/i18n'

interface AuthFormCheckboxProps {
  screenKey: string
  name: string
  dataTestId?: string
}

export const AuthFormCheckbox: React.FC<AuthFormCheckboxProps> = ({
  screenKey,
  name,
  dataTestId = undefined,
}: AuthFormCheckboxProps) => {
  return (
    <Field
      name={name}
      rules={[
        {
          required: true,
          type: 'boolean',
          message: i18n.t(`auth.${screenKey}.error.required`),
        },
      ]}
    >
      <Checkbox dataTestId={dataTestId} name={name} small={true} text={i18n.t<string>(`auth.${screenKey}.label`)} />
    </Field>
  )
}
