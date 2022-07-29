import React from 'react'
import { useParams } from 'react-router-dom'
import { Layout, NavigationTheme, Typography, TypographyType } from 'src/components'

export const ProfileSub: React.FC = () => {
  const { slug } = useParams()

  const getTitle = (value: string) => {
    let title = value.replaceAll('-', ' ')

    let titleArray = title.split(' ')
    titleArray = titleArray.map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    title = titleArray.join(' ')
    return title
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex flex-col flex-grow w-full items-start bg-white mt-4y">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8 text-center pt-4">
          <Typography as="h1" type={TypographyType.Heading}>
            {getTitle(slug as string)}
          </Typography>
          <br />
          <Typography>Coming Soon</Typography>
        </div>
      </main>
    </Layout>
  )
}
