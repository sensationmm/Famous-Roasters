import React from 'react'
import { Icon, IconName, IconSize, Typography, TypographySize } from 'src/components'

interface ErrorProps {
  children: JSX.Element | Array<JSX.Element | string> | string
  className?: string
  dataTestId?: string
}

export const ErrorBox: React.FC<ErrorProps> = ({ children, className, dataTestId }) => {
  return (
    <div
      className={`${className ? className : ''} flex bg-brand-grey-whisper p-4 mb-8 rounded`}
      data-testid={dataTestId}
    >
      <Icon name={IconName.Cross} size={IconSize.sm} className={`mt-1 mr-3 fill-negative shrink-0`} />
      <Typography size={TypographySize.Small}>{children}</Typography>
    </div>
  )
}
