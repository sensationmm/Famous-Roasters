import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographySize, TypographyType } from 'src/components'

type Scale = {
  value: number
  label: string
}
type RatingProps = {
  value: Scale['value']
  setValue: (val: Scale['value']) => void
}

export const Rating: React.FC<RatingProps> = ({ value, setValue }) => {
  const { t } = useTranslation()

  const scale: Array<Scale> = [
    { value: 1, label: t('pages.rate.scale.1') },
    { value: 2, label: t('pages.rate.scale.2') },
    { value: 3, label: t('pages.rate.scale.3') },
    { value: 4, label: t('pages.rate.scale.4') },
    { value: 5, label: t('pages.rate.scale.5') },
  ]

  return (
    <div>
      <div className="grid grid-cols-[repeat(5,_50px)] gap-6">
        {scale.map((item: Scale) => (
          <div
            key={`rating-${item.value}`}
            data-testid={`rating-${item.value}`}
            className="flex flex-col justify-center items-center"
            onClick={() => setValue(item.value)}
          >
            <Typography
              size={TypographySize.Tiny}
              type={TypographyType.Label}
              className="font-normal text-coreUI-text-secondary mb-3 flex flex-col justify-center h-6 text-center"
            >
              {item.label}
            </Typography>
            <button
              id={`rating-${item.value}`}
              className={`block w-11 h-11 rounded-full ${
                value === item.value ? 'bg-primary' : 'bg-coreUI-background-images'
              } font-bold cursor-pointer transition-all`}
            >
              {item.value}
            </button>
          </div>
        ))}
      </div>
      <Typography size={TypographySize.Tiny} className="block font-normal text-coreUI-text-secondary pt-4">
        {t('pages.rate.info')}
      </Typography>
    </div>
  )
}
