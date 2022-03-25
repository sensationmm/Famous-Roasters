import { useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout, Typography, TypographySize, TypographyType } from 'src/components'

export const Catalogue: React.FC = () => {
  const { t } = useTranslation()
  const query = loader('src/graphql/queries/products.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.catalogue.title')}`
  }, [])

  const { loading, error, data } = useQuery(query)

  // TODO: define typing
  // TODO: make sure this works with SSR if we go for that
  // TODO: handle states nicely
  // TODO: add env vars to GH actions

  const showTestData = () => {
    if (loading) {
      return <span>Loading</span>
    } else {
      if (error) {
        return <span>Error</span>
      } else {
        const edges = data.products.edges
        const productTitles = edges.map((edge: { node: { title: string } }) => edge.node.title)
        return (
          <div className="text-center mt-8">
            <div className="text-center mb-4">Some product titles:</div>
            {productTitles.map((title: string, i: number) => (
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
          <div>{showTestData()}</div>
        </div>
      </main>
    </Layout>
  )
}
