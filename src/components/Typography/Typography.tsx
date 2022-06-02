import React from 'react'

export enum Type {
  Heading = 'heading',
  Label = 'label',
  Paragraph = 'paragraph',
}

export enum Size {
  Large = 'lg',
  Base = 'pb',
  Small = 'sm',
  Tiny = 'xs',
}

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label'
  type?: Type
  size?: Size
}

const getTypographyClassNames = (type: Type, size: Size): string => {
  const classNames: string[] = []
  switch (type) {
    case Type.Heading:
      switch (size) {
        case Size.Large:
          classNames.push('text-5xl', 'leading-none')
          break
        case Size.Small:
          classNames.push('text-2xl', 'leading-8', 'font-semibold')
          break
        case Size.Tiny:
          classNames.push('text-xl', 'leading-7', 'font-semibold')
          break
        case Size.Base:
        default:
          classNames.push('text-3xl', 'leading-10', 'font-semibold', 'tracking-tight')
          break
      }
      break
    case Type.Label:
      switch (size) {
        case Size.Large:
          classNames.push('text-lg', 'leading-7', 'font-semibold')
          break
        case Size.Small:
          classNames.push('text-sm', 'leading-5', 'font-semibold')
          break
        case Size.Tiny:
          classNames.push('text-xs', 'leading-4', 'font-semibold')
          break
        case Size.Base:
        default:
          classNames.push('text-base', 'leading-6', 'font-semibold')
          break
      }
      break
    case Type.Paragraph:
    default:
      switch (size) {
        case Size.Large:
          classNames.push('text-lg', 'leading-7')
          break
        case Size.Small:
          classNames.push('text-sm', 'leading-5')
          break
        case Size.Tiny:
          classNames.push('text-xs', 'leading-4')
          break
        case Size.Base:
        default:
          classNames.push('text-base', 'leading-6')
          break
      }
      break
  }
  return classNames.join(' ')
}

export const Typography: React.FC<TypographyProps> = ({
  as = 'span',
  type = Type.Paragraph,
  size = Size.Base,
  className,
  children,
  style,
}: TypographyProps) => {
  const Element = ({ ...props }) => React.createElement(as, props, children)
  return (
    <Element
      className={
        className ? `${className} ${getTypographyClassNames(type, size)}` : getTypographyClassNames(type, size)
      }
      style={style}
    >
      {children}
    </Element>
  )
}
