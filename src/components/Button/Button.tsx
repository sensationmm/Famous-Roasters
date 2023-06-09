import React from 'react'
import { Icon, IconName, IconSize, Loader } from 'src/components'

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
  center?: boolean
  arrowOverride?: IconName
  disabled?: boolean
  fullWidth?: boolean
  showLoading?: boolean
}

const getButtonClassNames = (
  emphasis: Emphasis,
  size: Size,
  hasArrow: boolean,
  center: boolean,
  disabled: boolean,
  fullWidth: boolean,
): Record<string, string> => {
  const classNames: string[] = ['relative', 'inline-flex', 'flex-row', 'items-center', 'rounded-full', 'border-2']
  if (center || fullWidth) {
    classNames.push('justify-center')
  }
  const icon: string[] = []
  const arrow: string[] = []
  const loader: string[] = []

  // size
  switch (size) {
    case Size.xs:
      classNames.push(hasArrow ? 'pl-3 pr-8' : 'px-3', 'py-2', 'text-xs', 'font-semibold')
      icon.push('mr-2')
      arrow.push('right-2')
      loader.push('py-2')
      loader.push('h-[16px]')
      break
    case Size.sm:
      classNames.push(hasArrow ? 'pl-3 pr-8' : 'px-3', 'py-2', 'text-sm', 'font-semibold')
      icon.push('mr-2')
      arrow.push('right-2')
      loader.push('py-2')
      loader.push('h-[20px]')
      break
    case Size.md:
      classNames.push(hasArrow ? 'pl-4 pr-8' : 'px-4', 'py-2', 'text-base', 'font-bold')
      icon.push('mr-4')
      arrow.push('right-2')
      loader.push('h-[24px]')
      break
    case Size.lg:
      classNames.push(hasArrow ? 'pl-4 pr-8' : 'px-4', 'py-2', 'text-md', 'font-bold')
      icon.push('mr-4')
      arrow.push('right-2')
      loader.push('h-[24px]')
      break
    case Size.xl:
      classNames.push(hasArrow ? 'pl-6 pr-10' : 'px-6', 'py-3', 'text-lg', 'font-bold')
      icon.push('mr-6')
      arrow.push('right-3')
      loader.push('py-2')
      loader.push('h-[28px]')
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
      icon.push('fill-brand-black', 'text-brand-black', 'stroke-brand-black')
      arrow.push('fill-brand-black', 'text-brand-black', 'stroke-brand-black')
      break
    case Emphasis.Secondary:
      classNames.push(
        'text-white',
        'bg-brand-black',
        'border-transparent',
        'hover:bg-coreUI-text-secondary',
        'active:bg-brand-black',
      )
      icon.push('!fill-white', '!text-white', '!stroke-white')
      arrow.push('!fill-white', '!text-white', '!stroke-white')
      break
    case Emphasis.Tertiary:
      classNames.push(
        'text-brand-black',
        'bg-white',
        'border-brand-black',
        'hover:border-coreUI-text-tertiary',
        'active:border-brand-black',
      )
      icon.push('fill-brand-black', 'text-brand-black', 'stroke-brand-black')
      arrow.push('fill-brand-black', 'text-brand-black', 'stroke-brand-black')
      break
  }
  if (disabled) {
    classNames.push(
      'pointer-events-none',
      'bg-coreUI-background-images',
      '!border-coreUI-background-images',
      'text-coreUI-text-secondary',
    )
    icon.push('pointer-events-none')
    arrow.push('pointer-events-none')
  }
  if (fullWidth) {
    classNames.push('w-full md:max-w-xs md:mx-auto')
  }
  return { button: classNames.join(' '), icon: icon.join(' '), arrow: arrow.join(' '), loader: loader.join(' ') }
}

export const Button: React.FC<ButtonProps> = ({
  emphasis = Emphasis.Primary,
  size = Size.md,
  icon,
  hasArrow = false,
  center = false,
  children,
  className,
  arrowOverride,
  disabled = false,
  fullWidth = false,
  showLoading = false,
  ...props
}: ButtonProps) => {
  const classes = getButtonClassNames(emphasis, size, hasArrow, center, disabled, fullWidth)
  return (
    <button
      className={className ? `${className} ${classes.button}` : classes.button}
      {...props}
      disabled={disabled || showLoading}
      role="button"
    >
      {!showLoading ? (
        <>
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
              name={arrowOverride || IconName.ChevronRight}
              size={size !== Size.xl ? IconSize.sm : IconSize.pb}
              className={`absolute ${classes.arrow}`}
            />
          )}
        </>
      ) : (
        <div id="loader" className={`flex items-center justify-center ${classes.loader}`}>
          <Loader isSmall />
        </div>
      )}
    </button>
  )
}
