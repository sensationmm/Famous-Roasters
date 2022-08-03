import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout, NavigationTheme } from 'src/components'

export const Blog: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.blog.title')}`
  }, [])

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex-grow flex items-center justify-center bg-brand-grey-whisper">**** BLOG ***</main>
    </Layout>
  )
}
