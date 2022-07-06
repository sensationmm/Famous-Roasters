import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  Layout,
  NavigationTheme,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'
import { useAuth } from 'src/config/cognito'
import i18n from 'src/config/i18n'

export const Profile: React.FC = () => {
  const [user] = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState<string>()

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.profile.title')}`
  }, [])

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserEmail(user.attributes.email)
      })
      .catch((err) => new Error(err))
  }, [user?.isValid])

  const signOut = async () => {
    await Auth.signOut().catch((err) => new Error(err))
    navigate('/')
    window.location.reload()
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex-grow flex items-center justify-center bg-brand-grey-whisper">
        <div>
          {user ? (
            <>
              <Typography as="p" type={TypographyType.Paragraph} size={TypographySize.Base} className="text-center">
                Logged in as {userEmail}
              </Typography>
              <Button
                type="button"
                emphasis={ButtonEmphasis.Primary}
                size={ButtonSize.lg}
                onClick={signOut}
                data-testid="signOut"
                className="flex w-full justify-center mt-8"
              >
                {i18n.t<string>('auth.signOut.action')}
              </Button>
            </>
          ) : (
            <>
              <Typography as="p" type={TypographyType.Paragraph} size={TypographySize.Base} className="text-center">
                Not logged in
              </Typography>
              <Button
                type="button"
                emphasis={ButtonEmphasis.Primary}
                size={ButtonSize.lg}
                onClick={() => navigate('/login')}
                data-testid="signOut"
                className="flex w-full justify-center mt-8"
              >
                {i18n.t<string>('auth.signIn.title')}
              </Button>
            </>
          )}
        </div>
      </main>
    </Layout>
  )
}
