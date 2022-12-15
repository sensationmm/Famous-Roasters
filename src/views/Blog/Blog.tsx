import { useQuery } from '@apollo/client/react/hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
  ErrorPrompt,
  Layout,
  Loader,
  NavigationTheme,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { formatBlogHtmlElement, parseHtmlSafely, readTimeCalculator } from 'src/utils'

interface BlogProps {
  locale?: string
}

export const Blog: React.FC<BlogProps> = ({ locale = 'de_de' }) => {
  const { t } = useTranslation()
  const { category, slug } = useParams()
  const GET_BLOG = loader('src/graphql/queries/blog.query.graphql')

  const { loading, error, data } = useQuery(GET_BLOG, {
    variables: {
      slug: slug,
      locale: locale,
    },
  })

  if (error) {
    return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  if (loading) {
    return (
      <div className="flex h-64 mb-32 justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (data) {
    const blogNotFound = data.standardBlogPosts.length === 0

    if (blogNotFound) return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <Helmet>
        <title>{data.standardBlogPosts[0].seoTitle}</title>
        <meta name="description" content={data.standardBlogPosts[0].seoMetaDescription} />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_DOMAIN_BLOG}/blog/${locale.split('_')[1]}/${category}/${slug}`}
        />
      </Helmet>
      <main className="flex-grow flex w-full flex-col">
        <div className="w-full max-w-[688px] mx-auto px-6 xl:px-8 mt-8 mb-16">
          {data.standardBlogPosts.length !== 0 ? (
            <>
              <Typography
                as="h1"
                type={TypographyType.Heading}
                size={TypographySize.Base}
                className="font-syne text-[32px] -tracking-[.02em]"
              >
                {data.standardBlogPosts[0].title}
              </Typography>

              <div className="flex items-center py-6 border-b border-coreUI-border">
                <div className="w-8 h-8 mr-3">
                  <img className="rounded-full" src={data.standardBlogPosts[0].createdBy.picture} />
                </div>
                <div className="flex flex-col text-coreUI-text-secondary">
                  <Typography size={TypographySize.Small} type={TypographyType.Paragraph}>
                    {data?.standardBlogPosts[0]?.createdBy.name}
                  </Typography>
                  <Typography size={TypographySize.Small} type={TypographyType.Paragraph}>
                    <span className="capitalize">{category}</span> &middot;{' '}
                    {readTimeCalculator(data.standardBlogPosts[0].content.text)} {t('pages.blog.minReadingTime')}
                  </Typography>
                </div>
              </div>

              <div
                className="mt-8"
                dangerouslySetInnerHTML={{
                  __html: parseHtmlSafely(data.standardBlogPosts[0].content.html, formatBlogHtmlElement),
                }}
              />
            </>
          ) : (
            <ErrorPrompt promptAction={() => history.go(0)} />
          )}
        </div>
      </main>
    </Layout>
  )
}
