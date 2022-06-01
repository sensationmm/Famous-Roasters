import React from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Typography, TypographySize, TypographyType } from 'src/components'

import { TasteFinderFieldHandlerProps } from '..'

export const YourName: React.FC<TasteFinderFieldHandlerProps> = ({
  currentData,
  updateData,
}: TasteFinderFieldHandlerProps) => {
  const { t } = useTranslation()

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ name: e.target.name, value: e.target.value })
  }

  const getCurrentFieldData = (fieldName: string) => currentData.find((e) => e.name === fieldName)?.value || ''

  return (
    <div className="flex-grow flex items-center justify-center bg-white">
      <div className="p-6">
        <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Base} className="flex font-syne">
          {t('pages.tasteFinder.steps.yourName.title')}
        </Typography>
        <Input
          name="name"
          labelText={t('pages.tasteFinder.steps.yourName.input.label')}
          className="mt-12 w-full"
          value={getCurrentFieldData('name')}
          onChange={(e) => handleDataChange(e)}
        />
      </div>
    </div>
  )
}
