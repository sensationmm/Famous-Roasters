import { Field } from 'rc-field-form'
import { Meta, Rule } from 'rc-field-form/es/interface'
import React, { ChangeEventHandler, useState } from 'react'
import { Input, Typography, TypographySize } from 'src/components'

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
  hideErrors?: boolean
  validateTrigger?: 'onChange' | 'onBlur'
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
  hideErrors = false,
  validateTrigger = 'onBlur',
}: AuthFormItemInputProps) => {
  const [fieldErrors, setFieldErrors] = useState<string[]>([])
  const handleChange = (metaChange: Meta) => {
    const { errors, touched } = metaChange
    touched && setFieldErrors(errors)
  }
  return (
    <>
      <Field
        name={name}
        rules={rules}
        initialValue={value}
        onMetaChange={handleChange}
        validateTrigger={validateTrigger}
      >
        <Input
          labelText={label}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          value={value}
          data-testid={dataTestId}
          className={fieldErrors.length > 0 ? 'w-full border-negative' : 'w-full'}
        />
      </Field>
      {fieldErrors.length > 0 && hideErrors !== true && (
        <ul className="text-negative mt-2 mb-4">
          {fieldErrors.map((error, idx) => (
            <Typography as="li" size={TypographySize.Tiny} key={`${name}-error-${idx}`}>
              {error}
            </Typography>
          ))}
        </ul>
      )}
    </>
  )
}
