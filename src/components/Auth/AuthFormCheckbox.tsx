import { Field } from 'rc-field-form'
import React, { useState } from 'react'
import { Checkbox } from 'src/components'
import i18n from 'src/config/i18n'

interface AuthFormCheckboxProps {
  screenKey: string
  name: string
  dataTestId?: string
  required?: boolean
  /* Required because onChange function comes from aws-amplify-react */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  onChange: (evt: any) => void
}

export const AuthFormCheckbox: React.FC<AuthFormCheckboxProps> = ({
  screenKey,
  name,
  dataTestId = undefined,
  required = false,
  onChange,
}: AuthFormCheckboxProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const handleChange = (val: boolean) => {
    val &&
      onChange({
        target: { name: name, type: 'checkbox', checked: val },
      })
    setIsSelected(val)
  }

  return (
    <Field
      name={name}
      rules={[
        {
          type: 'string',
          validator: () => {
            return new Promise<void>((resolve, reject) => {
              if (!required || isSelected) {
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
        toggleSelected={handleChange}
      />
    </Field>
  )
}
