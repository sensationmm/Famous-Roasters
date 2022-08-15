import { useQuery } from '@apollo/client/react/hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from 'src/assets/images/blog/Kalle_Rösterei_12.png'
import {
  ErrorPrompt,
  Layout,
  Loader,
  NavigationTheme,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

interface CategoryListProps {
  locale: string
}

export const CategoryList: React.FC<CategoryListProps> = () => {
  const GET_BLOG_CATEGORYLIST = loader('src/graphql/queries/blogCategoryListDetails.query.graphql')

  const { loading, error, data } = useQuery(GET_BLOG_CATEGORYLIST)

  if (error) {
    console.log(error)
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
    console.log(data)
    const noCategoryListFound = data.categoryList.length === 0

    if (noCategoryListFound) return <ErrorPrompt promptAction={() => history.go(0)} />
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <div className="flex-grow flex w-full flex-col">
        <div className="hero w-full h-[624px] md:h-[428px] xl:h-[624px] bg-brand-grey-whisper">
          <div className="flex flex-col md:flex-row w-full h-full max-w-5xl mx-auto pt-20">
            <div className="px-6 md:w-1/2">
              <Typography
                as="h1"
                type={TypographyType.Heading}
                size={TypographySize.Large}
                className="text-[38px] xl:text-[80px] font-semibold font-syne mb-6"
              >
                Unsere Blog
              </Typography>
              <Typography
                as="p"
                type={TypographyType.Paragraph}
                size={TypographySize.Base}
                className="xl:text-2xl xl:font-semibold mb-8"
              >
                Entdecke mit uns die Welt des Specialty Coffee. Die besten Zubereitungsmethoden, spannende Geschichten
                aus der Kaffeeszene als auch die neuesten Trends findest du in unserem Blog.
              </Typography>
            </div>
            <div className="md:px-6 md:w-1/2 h-full grid justify-items-end content-center md:content-end md:pb-12 overflow-hidden justify-content-center align-items-center">
              <img src={heroImage} className="w-full md:w-auto" />
            </div>
          </div>
        </div>
        <div className="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-5xl mx-auto px-6 xl:px-8 md:my-8">
          {data.categoryList.map((category: { name: string; summary: string; tags: Array<string> }) => {
            return (
              <div key={category.name} className="py-6 border-b border-coreUI-border w-full">
                <Typography as="h4" type={TypographyType.Heading} size={TypographySize.Base} className="font-syne mb-4">
                  {category.name}
                </Typography>
                <div className="text-coreUI-text-secondary mb-6">
                  {category.tags.map((tag) => {
                    return (
                      <Typography as="span" type={TypographyType.Paragraph} size={TypographySize.Small} key={tag}>
                        #{tag}{' '}
                      </Typography>
                    )
                  })}
                </div>

                <Link to={`${category.name}`} className="underline underline-offset-8">
                  <Typography as="span" type={TypographyType.Label} size={TypographySize.Small}>
                    Mehr Erfahren
                  </Typography>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
