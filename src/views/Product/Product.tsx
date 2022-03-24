import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Layout } from 'src/components'

export const Product: React.FC = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.product.title')}`
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
          <div className="text-center">
            {t('pages.product.title')} (product id = {id})
          </div>
        </div>
      </main>
    </Layout>
  )
}
