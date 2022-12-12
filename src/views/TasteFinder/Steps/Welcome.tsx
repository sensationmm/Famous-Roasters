import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React from 'react'
import { useTranslation } from 'react-i18next'
import welcome from 'src/assets/images/tasteFinder/welcome.webp'
import { Button, ButtonEmphasis, ButtonSize, Typography, TypographySize, TypographyType } from 'src/components'
import { dataLayerEvent } from 'src/utils'

interface WelcomeProps {
  next: () => void
}

export const Welcome: React.FC<WelcomeProps> = ({ next }: WelcomeProps) => {
  const { t } = useTranslation()

  const handleNext = () => {
    dataLayerEvent(
      {
        step: 0,
        value: 'started',
      },
      'tasteFinderStep',
    )
    next()
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-1" style={{ height: 'calc(100vh - 66px)' }}>
      <div className="flex items-center justify-center py-24 mt-4 relative md:justify-start md:order-2 md:py-8 md:mt-0">
        <img
          src={welcome}
          alt={t('pages.tasteFinder.title')}
          className="absolute top-16 max-h-64 md:top-auto md:max-h-96 md:-left-16 xl:max-h-96 xl:-left-32"
        />
      </div>
      <div className="grid items-center justify-center pt-10 pb-44 bg-brand-black text-white md:order-1 md:py-8 md:grid-cols-10 md:col-span-2 xl:grid-cols-5">
        <div className="flex flex-col col-items-center md:col-start-2 md:col-end-7 md:order-1 xl:col-start-2 xl:col-end-4">
          <Typography
            as="h1"
            type={TypographyType.Heading}
            size={TypographySize.Base}
            className="flex w-80 mt-32 font-syne md:mt-0"
          >
            {t('pages.tasteFinder.steps.welcome.title')}
          </Typography>
          <div className="flex w-80 mt-4">
            <ArrowNarrowRightIcon className="w-12 h-6 mr-4" aria-hidden="true" />
            <Typography as="p">{t('pages.tasteFinder.steps.welcome.text')}</Typography>
          </div>
          <div className="flex w-80 mt-8 xl:mt-24">
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
