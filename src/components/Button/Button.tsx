import React from 'react'
import { Icon, IconName, IconSize } from 'src/components'

export enum Emphasis {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export enum Size {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  emphasis?: Emphasis
  size?: Size
  icon?: IconName
  hasArrow?: boolean
}

const getButtonClassNames = (emphasis: Emphasis, size: Size, hasArrow: boolean): Record<string, string> => {
  const classNames: string[] = ['relative', 'inline-flex', 'flex-row', 'items-center', 'rounded-full', 'border-2']
  const icon: string[] = []
  const arrow: string[] = []

  // size
  switch (size) {
    case Size.xs:
      classNames.push(hasArrow ? 'pl-2 pr-5' : 'px-3', 'py-2', 'text-xs', 'font-semibold')
      icon.push('mr-1')
      arrow.push('right-1')
      break
    case Size.sm:
      classNames.push(hasArrow ? 'pl-3 pr-6' : 'px-3', 'py-2', 'text-sm', 'font-semibold')
      icon.push('mr-1')
      arrow.push('right-2')
      break
    case Size.md:
      classNames.push(hasArrow ? 'pl-4 pr-8' : 'px-4', 'py-2', 'text-base', 'font-bold')
      icon.push('mr-2')
      arrow.push('right-2')
      break
    case Size.lg:
      classNames.push(hasArrow ? 'pl-4 pr-8' : 'px-4', 'py-2', 'text-md', 'font-bold')
      icon.push('mr-2')
      arrow.push('right-2')
      break
    case Size.xl:
      classNames.push(hasArrow ? 'pl-6 pr-10' : 'px-6', 'py-3', 'text-lg', 'font-bold')
      icon.push('mr-3')
      arrow.push('right-3')
      break
  }

  // emphasis
  switch (emphasis) {
    case Emphasis.Primary:
      classNames.push(
        'disabled:bg-brand-grey-whisper',
        'disabled:text-coreUI-text-secondary',
        'disabled:cursor-not-allowed',
        'text-brand-black',
        'bg-primary',
        'border-transparent',
        'hover:bg-brand-green-starship',
        'active:bg-primary',
      )
      break
    case Emphasis.Secondary:
      classNames.push(
        'text-white',
        'bg-brand-black',
        'border-transparent',
        'hover:bg-coreUI-text-secondary',
        'active:bg-brand-black',
      )
      break
    case Emphasis.Tertiary:
      classNames.push(
        'text-brand-black',
        'bg-white',
        'border-brand-black',
        'hover:border-coreUI-text-tertiary',
        'active:border-brand-black',
      )
      break
  }
  return { button: classNames.join(' '), icon: icon.join(' '), arrow: arrow.join(' ') }
}

export const Button: React.FC<ButtonProps> = ({
  emphasis = Emphasis.Primary,
  size = Size.md,
  icon,
  hasArrow = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const classes = getButtonClassNames(emphasis, size, hasArrow)
  return (
    <button className={className ? `${className} ${classes.button}` : classes.button} {...props} role="button">
      {icon && (
        <Icon
          name={icon}
          size={size !== Size.xs && size !== Size.sm ? IconSize.md : IconSize.pb}
          className={classes.icon}
        />
      )}
      {children}
      {hasArrow && (
        <Icon
          name={IconName.ChevronRight}
          size={size !== Size.xl ? IconSize.sm : IconSize.pb}
          className={`absolute ${classes.arrow}`}
        />
      )}
    </button>
  )
}
