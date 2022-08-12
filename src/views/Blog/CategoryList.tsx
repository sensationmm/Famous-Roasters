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

export const CategoryList: React.FC<BlogProps> = ({ locale }) => {
  const { slug } = useParams()
  const GET_BLOG = loader('src/graphql/queries/blog.query.graphql')

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex-grow flex w-full flex-col">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8 my-8 ">Category List</div>
      </main>
    </Layout>
  )
}
