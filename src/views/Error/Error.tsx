import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout, NavigationTheme, Typography, TypographySize, TypographyType } from 'src/components'

export const Error: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.error.title')}`
  }, [])

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex-grow flex items-center justify-center bg-brand-grey-whisper">
        <div>
          <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Large} className="text-center">
            {t('pages.error.title')}
          </Typography>
        </div>
      </main>
    </Layout>
  )
}
