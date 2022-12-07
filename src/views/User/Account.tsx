import { Auth } from 'aws-amplify'
import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  Layout,
  NavigationTheme,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import LoadingContext from 'src/hooks/isLoading'

export const Account: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setIsLoading } = useContext(LoadingContext)

  useEffect(() => {
    Auth.currentAuthenticatedUser().catch(() => navigate('/login'))
  }, [])

  const signOut = async () => {
    setIsLoading(true)
    await Auth.signOut()
    setIsLoading(false)
    navigate('/login')
    window.localStorage.removeItem('authToken')
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <Helmet>
        <title>
          {t('brand.name')} | {t('pages.account.title')}
        </title>
        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_SHOP}/account`} />
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="flex flex-col flex-grow w-full items-start bg-white mt-4y">
        <div className="w-full max-w-7xl mx-auto px-6 xl:px-8 py-8">
          <div className="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-[1fr_2fr]">
            <div>
              <Typography as="h1" type={TypographyType.Heading} size={TypographySize.Small} className="mb-4">
                {t('pages.account.title')}
              </Typography>
              <Typography as="p" type={TypographyType.Paragraph} className="mb-4">
                {t('pages.account.intro')}
              </Typography>
            </div>
            <div className="flex justify-end items-center">
              <Button
                data-testid="account-logout"
                emphasis={ButtonEmphasis.Tertiary}
                fullWidth
                className="!mx-0"
                onClick={signOut}
              >
                {t('pages.account.cta')}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
