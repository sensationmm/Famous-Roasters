import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LogoBlack from 'src/assets/images/logo/60beans-black.svg'
import { Layout, NavigationTheme, Typography, TypographySize, TypographyType } from 'src/components'

export const Home: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.home.title')}`
  }, [])

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex-grow flex items-center justify-center bg-brand-grey-whisper">
        <div>
          <img src={LogoBlack} alt={t('brand.name')} className="h-16" />
          <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Large} className="text-center">
            {t('pages.home.title')}
          </Typography>
        </div>
      </main>
    </Layout>
  )
}
