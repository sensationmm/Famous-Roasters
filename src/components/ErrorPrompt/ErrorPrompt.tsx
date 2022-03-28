import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from 'src/components'

interface ErrorPromptProps extends React.HTMLAttributes<HTMLElement> {
  promptAction?: () => void
}

export const ErrorPrompt: React.FC<ErrorPromptProps> = ({ promptAction }: ErrorPromptProps) => {
  const { t } = useTranslation()
  return (
    <div className="p-4 border border-coreUI-border bg-white">
      <Typography as="div" className="text-center">
        {t('error.generic.text')}
      </Typography>
      {promptAction && (
        <div className="mt-4 flex justify-center">
          <Button onClick={promptAction}>{t('error.generic.actions.retry')}</Button>
        </div>
      )}
    </div>
  )
}
