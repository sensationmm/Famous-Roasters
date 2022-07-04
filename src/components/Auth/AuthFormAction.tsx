import React from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'

interface AuthFormActionProps {
  promptText?: string
  onClick: React.MouseEventHandler<HTMLElement>
  dataTestId: string
  ctaText: string
  className?: string
}

export const AuthFormAction: React.FC<AuthFormActionProps> = ({
  promptText,
  onClick,
  dataTestId,
  ctaText,
  className,
}: AuthFormActionProps) => {
  return (
    <Typography as="div" type={TypographyType.Label} size={TypographySize.Tiny} className={className}>
      {promptText?.length && `${promptText}${' '}`}
      <a onClick={onClick} data-testid={dataTestId}>
        {ctaText}
      </a>
    </Typography>
  )
}
