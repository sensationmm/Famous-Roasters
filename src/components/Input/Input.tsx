import React, { Ref } from 'react'
import { Icon, IconName, IconSize, Typography, TypographySize } from 'src/components'

export enum Mode {
  normal = 'normal',
  dark = 'dark',
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string
  mode?: Mode
  icon?: IconName
  isSmall?: boolean
  classNameWrapper?: string
}

const getLabelTextClassNames = (mode: Mode): string => {
  const classNames: string[] = ['absolute', '-top-6', 'left-3', 'px-1']

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

const getInputClassNames = (mode: Mode, isSmall: InputProps['isSmall'], icon: boolean): string => {
  const classNames: string[] = ['border', 'rounded-full', 'focus:outline-0', 'focus:ring']
  if (!isSmall) {
    classNames.push('px-4', 'py-2')
  } else {
    classNames.push('px-3', 'py-1', 'text-sm')
  }
  if (icon) {
    classNames.push('pr-8')
  }

  // mode
  switch (mode) {
    case Mode.dark:
      classNames.push('bg-brand-black', 'border-white', 'text-white')
      break
    case Mode.normal:
    default:
      classNames.push('focus:ring-primary/30')
      break
  }

  return classNames.join(' ')
}

export const Input: React.FC<InputProps> = React.forwardRef(
  (
    { labelText, mode = Mode.normal, icon, isSmall = false, className, classNameWrapper, ...props }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => (
    <label className={`${classNameWrapper ? `${classNameWrapper} ` : ''}relative`}>
      <span className={getLabelTextClassNames(mode)}>
        <Typography size={TypographySize.Small}>{labelText}</Typography>
      </span>
      <input
        className={
          className
            ? `${className} ${getInputClassNames(mode, isSmall, icon !== undefined)}`
            : getInputClassNames(mode, isSmall, icon !== undefined)
        }
        {...props}
        ref={ref}
      />
      {icon && (
        <Icon
          name={icon}
          size={IconSize.sm}
          className="absolute right-3 top-[50%] translate-y-[-50%] stroke-coreUI-text-tertiary"
        />
      )}
    </label>
  ),
)

Input.displayName = 'Input'
