import { useQuery } from '@apollo/client'
import { Collection } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorPrompt, Layout, Loader, Typography, TypographySize, TypographyType } from 'src/components'

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const query = loader('src/graphql/queries/products.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
  }, [])

  const { loading, error, data } = useQuery<Collection>(query)

  const showTestData = () => {
    if (loading) {
      return <Loader />
    } else {
      if (error) {
        return <ErrorPrompt promptAction={() => history.go(0)} />
      } else {
        const edges = data?.products.edges
        const productTitles = edges?.map((edge) => edge.node.title)
        return (
          <div className="text-center">
            <div className="text-center mb-4">Some product titles:</div>
            {productTitles?.map((title, i: number) => (
              <div key={`title-${i}`}>{title}</div>
            ))}
          </div>
        )
      }
    }
  }

  return (
    <Layout>
      <main className="flex-grow flex items-center justify-center bg-brand-grey-whisper">
        <div>
          <div className="font-syne flex justify-center text-4xl md:text-5xl xl:text-6xl">
            <h1>
              <span>Famous</span> <span className="font-bold">Roasters</span>
            </h1>
          </div>
          <Typography as="div" type={TypographyType.Paragraph} size={TypographySize.Large} className="text-center">
            {t('pages.catalogue.title')}
          </Typography>
          <div className="mt-8">{showTestData()}</div>
        </div>
      </main>
    </Layout>
  )
}
