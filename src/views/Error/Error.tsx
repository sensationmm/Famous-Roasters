import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import errorImage from 'src/assets/images/404/404-cup.webp'
import { Button, Layout, NavigationTheme, Typography, TypographySize, TypographyType } from 'src/components'

export const Error: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.error.navigation')}`
  }, [])

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <Helmet>
        <title>{`${t('pages.error.title')} - ${t('brand.name')}`}</title>
        <meta name="description" content={t('pages.error.title')} />
      </Helmet>
      <main className="mx-auto white xs:mt-12 xl:mt-24">
        <div className="grid h-fit mx-auto xs:grid-cols-1 w-[280px] mb-12 md:grid-cols-1 xl:grid-cols-2 w-2/3">
          <div className="mx-auto mb-0">
            <img src={errorImage} className="xs:w-[200px] sm:w-[300px] xl:w-[499px]" />
          </div>
          <div className="xl:pt-4">
            <Typography
              as="p"
              type={TypographyType.Heading}
              size={TypographySize.Small}
              className="text-center xs:mt-2 md:mt-1 xl:text-left"
            >
              {t('pages.error.title')}
            </Typography>
            <Typography
              as="p"
              type={TypographyType.Paragraph}
              size={TypographySize.Large}
              className="text-center mt-8 xl:text-left"
            >
              {t('pages.error.body')}
            </Typography>
            <p className="mt-8">
              <Button onClick={() => navigate('/catalogue')} fullWidth>
                {t('pages.orders.shopLink')}
              </Button>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  )
}
