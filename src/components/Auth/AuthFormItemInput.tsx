import { Field } from 'rc-field-form'
import { Rule } from 'rc-field-form/es/interface'
import React, { ChangeEventHandler } from 'react'
import { Input } from 'src/components'

interface AuthFormItemInputProps {
  name: string
  label: string
  type?: string
  rules: Rule[]
  hasFeedback?: boolean
  placeholder: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  value?: string
  dataTestId?: string
}

export const AuthFormItemInput: React.FC<AuthFormItemInputProps> = ({
  name,
  label,
  type = 'text',
  rules,
  placeholder,
  onChange,
  disabled = false,
  value = '',
  dataTestId = undefined,
}: AuthFormItemInputProps) => {
  return (
    <Field name={name} rules={rules} initialValue={value}>
      <Input
        labelText={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        data-testid={dataTestId}
        className="w-full"
      />
    </Field>
  )
}
