import React from 'react'

export enum Emphasis {
  Contained = 'contained',
  Outlined = 'outlined',
  Text = 'text',
}

export enum Size {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export enum Color {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  emphasis?: Emphasis
  size?: Size
  color?: Color
}

const getButtonClassNames = (emphasis: Emphasis, size: Size, color: Color): string => {
  const classNames: string[] = ['inline-flex', 'items-center']

  // size
  switch (size) {
    case Size.sm:
      classNames.push('px-4', 'py-2', 'text-sm')
      break
    case Size.md:
      classNames.push('px-4', 'py-2', 'text-base')
      break
    case Size.lg:
      classNames.push('px-6', 'py-3', 'text-lg')
      break
  }

  // emphasis
  switch (emphasis) {
    case Emphasis.Contained:
      color === Color.Primary
        ? classNames.push('text-white', 'bg-brand-black')
        : classNames.push('text-black', 'bg-brand-green-club')
      classNames.push('rounded-full')
      break
    case Emphasis.Outlined:
      classNames.push('text-brand-black', 'bg-transparent', 'border-2', 'border-brand-black')
      classNames.push('rounded-full')
      break
    case Emphasis.Text:
      classNames.push('text-current', 'underline')
      break
  }
  return classNames.join(' ')
}

export const Button: React.FC<ButtonProps> = ({
  emphasis = Emphasis.Contained,
  color = Color.Primary,
  size = Size.md,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={
        className
          ? `${className} ${getButtonClassNames(emphasis, size, color)}`
          : getButtonClassNames(emphasis, size, color)
      }
      {...props}
      role="button"
    >
      {children}
    </button>
  )
}
