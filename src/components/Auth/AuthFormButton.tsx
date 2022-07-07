import React from 'react'
import { Button, ButtonEmphasis, ButtonSize } from 'src/components/Button'

interface AuthFormButtonProps {
  ctaText: string
  disabled?: boolean
}

export const AuthFormButton: React.FC<AuthFormButtonProps> = ({ ctaText, disabled = false }: AuthFormButtonProps) => {
  return (
    <Button
      type="submit"
      emphasis={ButtonEmphasis.Primary}
      size={ButtonSize.lg}
      data-testid="submit"
      className="flex w-full justify-center"
      disabled={disabled}
    >
      {ctaText}
    </Button>
  )
}
