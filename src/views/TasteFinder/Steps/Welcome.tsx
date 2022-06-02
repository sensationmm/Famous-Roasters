import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React from 'react'
import { useTranslation } from 'react-i18next'
import welcome from 'src/assets/images/tasteFinder/welcome.webp'
import { Button, ButtonEmphasis, ButtonSize, Typography, TypographySize, TypographyType } from 'src/components'

interface WelcomeProps {
  next: () => void
}

export const Welcome: React.FC<WelcomeProps> = ({ next }: WelcomeProps) => {
  const { t } = useTranslation()

  const handleNext = () => {
    next()
  }

  return (
    <div className="block min-h-screen md:grid md:grid-cols-3 md:grid-rows-1">
      <div className="flex items-center justify-center py-24 mt-6 relative md:justify-start md:order-2 md:py-8 md:mt-0">
        <img src={welcome} alt={t('pages.tasteFinder.title')} className="absolute top-16 md:top-auto md:-ml-16" />
      </div>
      <div className="flex col-span-2 items-center justify-center pt-12 pb-72 bg-brand-black text-white md:order-1 md:py-8">
        <div className="flex flex-col items-center md:order-1">
          <Typography
            as="h1"
            type={TypographyType.Heading}
            size={TypographySize.Base}
            className="flex w-80 mt-24 font-syne md:mt-0"
          >
            {t('pages.tasteFinder.steps.welcome.title')}
          </Typography>
          <div className="flex w-80 mt-4">
            <ArrowNarrowRightIcon className="w-12 h-6 mr-4" aria-hidden="true" />
            <Typography as="p">{t('pages.tasteFinder.steps.welcome.text')}</Typography>
          </div>
          <div className="flex w-80 mt-8">
            <Button
              type="button"
              emphasis={ButtonEmphasis.Primary}
              size={ButtonSize.md}
              className="flex w-full justify-center"
              onClick={handleNext}
              data-testid="button-start"
            >
              {t('pages.tasteFinder.steps.welcome.cta')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
