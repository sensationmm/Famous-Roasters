import { useQuery } from '@apollo/client'
import { Product as ProductType } from '@shopify/hydrogen/dist/esnext/storefront-api-types'
import { loader } from 'graphql.macro'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ErrorPrompt, Layout, Loader, Typography, TypographySize, TypographyType } from 'src/components'

import { getAPIProductId } from '../../utils'

interface ProductMeta {
  value: string
}

interface ProductCustom {
  bean_type: ProductMeta
}

interface ProductQuery {
  product: ProductType & ProductCustom
}

export const Product: React.FC = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const GET_PRODUCT = loader('src/graphql/queries/product.query.graphql')

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.product.title')}`
  }, [])

  if (!id) return null

  const { loading, error, data } = useQuery<ProductQuery>(GET_PRODUCT, {
    variables: {
      id: getAPIProductId(id),
    },
  })

  const { title, featuredImage, vendor, bean_type } = data?.product || {}

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error || !featuredImage) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  const renderProductMainBlock = () => {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Images */}
        <div className="border border-dashed border-brand-grey-bombay">
          <img src={featuredImage.url} alt={title} className="w-full" />
        </div>
        <div>
          {/* Vendor and bean_type */}
          <div>
            <Typography
              type={TypographyType.Paragraph}
              size={TypographySize.Small}
              className="text-coreUI-text-secondary"
            >
              {bean_type ? `${vendor} | ${bean_type.value}` : vendor}
            </Typography>
          </div>
          {/* Title */}
          <div>
            <Typography type={TypographyType.Heading} size={TypographySize.Small}>
              {title}
            </Typography>
          </div>
          {/* Tags */}
          <div className="mt-4 border border-dashed border-brand-grey-bombay">
            <em>Tags placeholder</em>
          </div>
          {/* Taste */}
          <div className="mt-4 border border-dashed border-brand-grey-bombay">
            <em>Taste placeholder</em>
          </div>
          {/* Buy section */}
          <div className="mt-4 border border-dashed border-brand-grey-bombay">
            <em>Buy section placeholder</em>
          </div>
        </div>
      </div>
    )
  }

  const renderProductCollapsableBlocks = () => {
    return (
      <div className="mt-4 border border-dashed border-brand-grey-bombay">
        {/* Get to know the coffee block */}
        <div>
          <em>Get to know the coffee placeholder</em>
        </div>
        {/* Meet the roaster block */}
        <div>
          <em>Meet the roaster placeholder</em>
        </div>
        {/* Learn to brew the coffee block */}
        <div>
          <em>Learn to brew the coffee placeholder</em>
        </div>
        {/* Find similar block */}
        <div>
          <em>Find similar placeholder</em>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <main className="flex flex-grow w-full items-start justify-center bg-white mt-4 mb-4">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8">
          {renderProductMainBlock()}
          {renderProductCollapsableBlocks()}
        </div>
      </main>
    </Layout>
  )
}
