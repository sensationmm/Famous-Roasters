import React, { Ref } from 'react'
import { Typography, TypographySize } from 'src/components'

export enum Mode {
  normal = 'normal',
  dark = 'dark',
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string
  mode?: Mode
}

const getLabelTextClassNames = (mode: Mode): string => {
  const classNames: string[] = ['absolute', '-top-6', 'left-3', 'px-2']

  // mode
  switch (mode) {
    case Mode.dark:
      classNames.push('bg-brand-black', 'text-white')
      break
    case Mode.normal:
    default:
      classNames.push('bg-white')
      break
  }

  return classNames.join(' ')
}

const getInputClassNames = (mode: Mode): string => {
  const classNames: string[] = ['border', 'rounded-full', 'px-4', 'py-2']

  // mode
  switch (mode) {
    case Mode.dark:
      classNames.push('bg-brand-black', 'border-white', 'text-white')
      break
    case Mode.normal:
    default:
      break
  }

  return classNames.join(' ')
}

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ labelText, mode = Mode.normal, className, ...props }: InputProps, ref: Ref<HTMLInputElement>) => (
    <label className="relative">
      <span className={getLabelTextClassNames(mode)}>
        <Typography size={TypographySize.Small}>{labelText}</Typography>
      </span>
      <input
        className={className ? `${className} ${getInputClassNames(mode)}` : getInputClassNames(mode)}
        {...props}
        ref={ref}
      />
    </label>
  ),
)

Input.displayName = 'Input'
