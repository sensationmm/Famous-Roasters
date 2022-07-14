import { Field } from 'rc-field-form'
import React, { useState } from 'react'
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
  const [isSelected, setIsSelected] = useState<boolean>(false)

  return (
    <Field
      name={name}
      rules={[
        {
          type: 'string',
          validator: () => {
            return new Promise<void>((resolve, reject) => {
              if (isSelected) {
                resolve()
              } else {
                reject(i18n.t(`auth.${screenKey}.error.required`))
              }
            })
          },
        },
      ]}
    >
      <Checkbox
        dataTestId={dataTestId}
        name={name}
        small={true}
        text={i18n.t<string>(`auth.${screenKey}.label`)}
        selected={isSelected}
        toggleSelected={setIsSelected}
      />
    </Field>
  )
}
