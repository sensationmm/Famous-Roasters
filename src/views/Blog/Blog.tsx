import { useQuery } from '@apollo/client/react/hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Helmet } from 'react-helmet'
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
import { parseHtmlSafely, readTimeCalculator } from 'src/utils'

interface BlogProps {
  locale: string
}

export const Blog: React.FC<BlogProps> = ({ locale }) => {
  const { slug } = useParams()
  const GET_BLOG = loader('src/graphql/queries/blog.query.graphql')

  const blogCategory = locale === 'de_de' ? 'Kaffeewissen' : 'Coffee knowledge' // HACK: temporarily hardcoded this to get the category until we have something in the CMS schema

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
    const blogNotFound = data.brewingMethods.length === 0

    if (blogNotFound) return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex-grow flex w-full flex-col">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8 my-8 ">
          {data.brewingMethods.length !== 0 ? (
            <>
              <Helmet>
                <title>{data.brewingMethods[0].seoTitle}</title>
                <meta name="description" content={data.brewingMethods[0].seoMetaDescription} />
              </Helmet>

              <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Base} className="font-syne">
                {data.brewingMethods[0].title}
              </Typography>

              <div className="flex items-center py-6 border-b border-coreUI-border">
                <div className="w-8 h-8 mr-3">
                  <img className="rounded-full" src={data.brewingMethods[0].createdBy.picture} />
                </div>
                <div className="flex flex-col text-coreUI-text-secondary">
                  <Typography size={TypographySize.Small} type={TypographyType.Paragraph}>
                    {data?.brewingMethods[0]?.createdBy.name}
                  </Typography>
                  <Typography size={TypographySize.Small} type={TypographyType.Paragraph}>
                    {blogCategory} &middot; {readTimeCalculator(data.brewingMethods[0].content.text)} min read
                  </Typography>
                </div>
              </div>

              <div
                className="mt-8"
                dangerouslySetInnerHTML={{
                  __html: parseHtmlSafely(data.brewingMethods[0].content.html),
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
