import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LogoLight from 'src/assets/images/logo/60beans-light.svg'
import { Icon, IconName, Typography, TypographyType } from 'src/components'

import { TrustPilot } from './TrustPilot'

interface FooterLink {
  key: string
  href: string
  target?: string
}

interface SocialMediaLink {
  id: string
  href: string
  icon: string
}

const domainShop = process.env.REACT_APP_DOMAIN_SHOP
const domainBlog = process.env.REACT_APP_DOMAIN_BLOG

const footerLinks: FooterLink[][] = [
  [
    { key: 'catalogue', href: `${domainShop}/catalogue` },
    { key: 'tasteFinder', href: `${domainShop}/taste-finder` },
    {
      key: 'jobs',
      href: '//www.linkedin.com/jobs/search/?currentJobId=3196130257&f_C=86587560&geoId=92000000',
      target: '_blank',
    },
  ],
  [
    { key: 'about', href: '//www.60beans.com/uber-uns' },
    { key: 'ourRoasters', href: '//www.60beans.com/roesterei' },
    { key: 'blog', href: `${domainBlog}` },
    { key: 'forCoffeeRoasters', href: '//www.60beans.com/warum-60beans' },
  ],
  [
    { key: 'privacy', href: '//www.60beans.com/legal/datenschutz' },
    { key: 'imprint', href: '//www.60beans.com/legal/impressum' },
    { key: 'cookiePolicy', href: '//www.60beans.com/legal/cookie-policy' },
    { key: 'termsAndConditions', href: '//www.60beans.com/legal/agb' },
    { key: 'refund', href: '//www.60beans.com/legal/widerrufsrecht' },
  ],
]

/*type FormValues = {
  email: string
}*/

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  /*const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data: FieldValues) => {
    console.log('user wants to register with email', data.email)
  }*/

  const socialMediaLinks: SocialMediaLink[] = [
    {
      id: 'facebook',
      href: '//www.facebook.com/60beans.shop',
      icon: IconName.Facebook,
    },
    {
      id: 'instagram',
      href: '//www.instagram.com/60beans/',
      icon: IconName.Instagram,
    },
    {
      id: 'linkedIn',
      href: '//www.linkedin.com/company/86587560/',
      icon: IconName.LinkedIn,
    },
  ]

  return (
    <footer className="bg-brand-black text-base text-white px-5 lg:px-10 py-12 lg:py-20 z-30">
      <div className="w-full max-w-7xl mx-auto mb-8 md:mb-12 lg:mb-16 flex flex-col md:flex-row md:items-center justify-start">
        <Link to="//www.60beans.com">
          <span className="sr-only">{t('brand.name')}</span>
          <img src={LogoLight} alt={t('brand.name')} className="h-6" width="118px" height="24px" />
        </Link>
      </div>
      <div className="w-full max-w-7xl mx-auto flex flex-col xl:flex-row justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 grow">
          {/* Links */}
          {footerLinks.map((footerLinkSet: FooterLink[], index: number) => {
            return (
              <ul className="mb-14" key={index}>
                {footerLinkSet.map((footerItem: FooterLink) => {
                  const { key, href, target = '_self' } = footerItem
                  return (
                    <li key={key} className="mb-4">
                      <Link to={href} target={target}>
                        {t(`pages.${key}.navigation`)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
        <div className="mb-16 xl:px-20">
          <Typography as="p" className="mb-4">
            Follow us
          </Typography>
          <ul className="flex text-brand-grey-whisper">
            {socialMediaLinks.map((socialMediaLink: SocialMediaLink) => {
              const { id, href, icon } = socialMediaLink
              return (
                <li key={id} className="mr-3 hover:text-brand-grey-bombay">
                  <Link to={href} target="_blank">
                    <Icon name={icon} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mb-14">
          <TrustPilot />
        </div>
        {/* PLEASE NOTE: this is old code, needs to be refactored to match new stying if turned on */}
        {/* <div className="order-1 md:order-2"> */}
        {/* Customer service */}
        {/* Newsletter */}
        {/*<div className="mt-12">
            <div>
              <Typography type={TypographyType.Heading} size={TypographySize.Base} className="font-syne">
                {t('footer.newsletter.title')}
              </Typography>
            </div>
            <div className="mt-6">
              <Typography type={TypographyType.Paragraph} size={TypographySize.Large}>
                {t('footer.newsletter.text')}
              </Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-6">
                <Input
                  type="text"
                  mode={InputMode.dark}
                  labelText={t('footer.newsletter.inputLabel')}
                  placeholder={t('footer.newsletter.inputPlaceholder')}
                  className="w-72"
                  data-testid="newsletter-email"
                  {...register('email')}
                />
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  emphasis={ButtonEmphasis.Tertiary}
                  size={ButtonSize.lg}
                  data-testid="newsletter-submit"
                >
                  {t('footer.newsletter.cta')}
                </Button>
              </div>
            </form>
            <div className="mt-4">
              <Typography type={TypographyType.Paragraph} className="text-brand-grey-bombay">
                {t('footer.newsletter.disclaimer')}
              </Typography>
            </div>
          </div>
        </div> */}
      </div>

      <div className="w-full max-w-7xl mx-auto text-center px-2 mb-1 xl:px-10">
        <Typography type={TypographyType.Paragraph} className="text-center">
          {t('brand.copyright', { year: new Date().getFullYear() })}
        </Typography>
        <br />
        <Typography type={TypographyType.Paragraph} className="text-center">
          {t('brand.withLove')}
        </Typography>
      </div>
    </footer>
  )
}
