import { useQuery } from '@apollo/client/react/hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import PlayVideoIcon from 'src/assets/images/blog/play-video.svg'
import {
  ErrorPrompt,
  Layout,
  Loader,
  NavigationTheme,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { readTimeCalculator } from 'src/utils'

interface CategoryListProps {
  locale?: string
}

type StandardBlogPosts = {
  title: string
  postType: string
  tags: Array<string>
  content: { text: string }
  slug: string
  thumbnail: { url: string }
  updatedBy: { name: string }
}

export const BlogListByCategory: React.FC<CategoryListProps> = () => {
  const { category } = useParams()
  const { t } = useTranslation()
  const GET_BLOG_BY_CATEGORY_LIST = loader('src/graphql/queries/blogListByCategory.query.graphql')

  const { loading, error, data } = useQuery(GET_BLOG_BY_CATEGORY_LIST, {
    variables: {
      category: category,
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
  return (
    <>
      <Helmet>
        <title>{`${category} | ${t('brand.name')}`}</title>
      </Helmet>

      <Layout navigationTheme={NavigationTheme.Home}>
        <div className="flex-grow flex w-full flex-col">
          <div className="hero w-full bg-brand-grey-whisper">
            <div className="flex flex-col md:flex-row w-full h-full max-w-5xl mx-auto py-20">
              <div className="px-6 lg:w-2/3">
                <Typography
                  as="h1"
                  type={TypographyType.Heading}
                  size={TypographySize.Large}
                  className="text-[38px] lg:text-[80px] font-semibold font-syne mb-6"
                >
                  {category}
                </Typography>
                <Typography
                  as="p"
                  type={TypographyType.Paragraph}
                  size={TypographySize.Base}
                  className="lg:text-2xl lg:font-semibold"
                >
                  {data.category.summary}
                </Typography>
              </div>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-5xl mx-auto px-6 xl:px-8 md:my-8">
            {data.standardBlogPosts.length !== 0 ? (
              data.standardBlogPosts.map((blog: StandardBlogPosts) => {
                const { title, slug, postType, thumbnail, tags, updatedBy, content } = blog
                return (
                  <div
                    key={title}
                    className="p-4 border-b border-coreUI-border w-full hover:bg-coreUI-background-images"
                  >
                    <Link to={`${slug}`}>
                      <div className="relative h-52 grid content-center overflow-hidden mb-4">
                        {postType === 'video' && (
                          <div className="absolute flex justify-center items-center w-full h-full">
                            <img src={PlayVideoIcon} className="w-10 h-10" />
                          </div>
                        )}
                        <img src={thumbnail.url} className="w-full" />
                      </div>
                      <Typography
                        as="h2"
                        type={TypographyType.Heading}
                        size={TypographySize.Base}
                        className="font-syne mb-4"
                      >
                        {title}
                      </Typography>
                      <div className="text-coreUI-text-secondary">
                        {[...new Set([...data.category.tags, ...tags])].map((tag: string) => {
                          return (
                            <Typography as="span" type={TypographyType.Paragraph} size={TypographySize.Small} key={tag}>
                              #{tag}{' '}
                            </Typography>
                          )
                        })}
                      </div>
                      <div className="flex flex-col text-coreUI-text-tertiary mb-6">
                        {postType === 'article' ? (
                          <Typography size={TypographySize.Small} type={TypographyType.Paragraph}>
                            von {updatedBy.name} &middot; {readTimeCalculator(content.text)} min reading time
                          </Typography>
                        ) : (
                          <Typography size={TypographySize.Small} type={TypographyType.Paragraph}>
                            von {updatedBy.name}
                          </Typography>
                        )}
                      </div>

                      <Typography
                        as="span"
                        type={TypographyType.Label}
                        size={TypographySize.Small}
                        className="underline underline-offset-8"
                      >
                        {postType === 'video' ? t('pages.blog.goToVideo') : t('pages.blog.goToArticle')}
                      </Typography>
                    </Link>
                  </div>
                )
              })
            ) : (
              <Typography as="p" size={TypographySize.Base} type={TypographyType.Paragraph} className="my-6 md:my-0">
                {t('pages.blog.noPostsFound')}
              </Typography>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}
