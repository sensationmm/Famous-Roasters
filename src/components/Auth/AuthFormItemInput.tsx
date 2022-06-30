import React, { ChangeEventHandler } from 'react'
import { Input } from 'src/components'

interface AuthFormItemInputProps {
  name: string
  label: string
  type?: string
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
  placeholder,
  onChange,
  disabled = false,
  value = undefined,
  dataTestId = undefined,
}: AuthFormItemInputProps) => {
  return (
    <Input
      name={name}
      labelText={label}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      value={value}
      data-testid={dataTestId}
      className="w-full"
    />
  )
}
