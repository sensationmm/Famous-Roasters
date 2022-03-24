import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from 'src/components'

export const Error: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.error.title')}`
  }, [])

  return (
    <Layout>
      <main className="flex-grow flex items-center justify-center bg-brand-grey-whisper">
        <div>
          <div className="font-syne flex justify-center text-4xl md:text-5xl xl:text-6xl">
            <h1>
              <span>Famous</span> <span className="font-bold">Roasters</span>
            </h1>
          </div>
          <div className="text-center">{t('pages.error.title')}</div>
        </div>
      </main>
    </Layout>
  )
}
