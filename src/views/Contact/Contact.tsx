import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout, NavigationTheme, Typography, TypographySize, TypographyType } from 'src/components'

export const Contact: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.contact.title')}`
  }, [])

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex-grow flex items-center justify-center bg-brand-grey-whisper">
        <div>
          <div className="font-syne flex justify-center text-4xl md:text-5xl xl:text-6xl">
            <h1>
              <span>Famous</span> <span className="font-bold">Roasters</span>
            </h1>
          </div>
          <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Large} className="text-center">
            {t('pages.contact.title')}
          </Typography>
        </div>
      </main>
    </Layout>
  )
}
