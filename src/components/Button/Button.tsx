import React from 'react'

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
}

const getButtonClassNames = (emphasis: Emphasis, size: Size): string => {
  const classNames: string[] = ['inline-flex', 'items-center', 'rounded-full', 'border-2']

  // size
  switch (size) {
    case Size.xs:
      classNames.push('px-3', 'py-2', 'text-xs', 'font-semibold')
      break
    case Size.sm:
      classNames.push('px-3', 'py-2', 'text-sm', 'font-semibold')
      break
    case Size.md:
      classNames.push('px-4', 'py-2', 'text-base', 'font-bold')
      break
    case Size.lg:
      classNames.push('px-4', 'py-2', 'text-md', 'font-bold')
      break
    case Size.xl:
      classNames.push('px-6', 'py-3', 'text-lg', 'font-bold')
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
  return classNames.join(' ')
}

export const Button: React.FC<ButtonProps> = ({
  emphasis = Emphasis.Primary,
  size = Size.md,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={
        className ? `${className} ${getButtonClassNames(emphasis, size)}` : getButtonClassNames(emphasis, size)
      }
      {...props}
      role="button"
    >
      {children}
    </button>
  )
}
