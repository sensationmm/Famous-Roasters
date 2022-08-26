import { Auth } from 'aws-amplify'
import React, { useEffect } from 'react'
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
import { useAuth } from 'src/config/cognito'

export const Account: React.FC = () => {
  const { t } = useTranslation()
  const [user] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.isValid) {
      navigate('/login')
    }
  }, [user])

  const signOut = async () => {
    await Auth.signOut()
    navigate('/login')
    window.location.reload()
    window.localStorage.removeItem('authToken')
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
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
                Logout
              </Button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
