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
    { key: 'catalogue', href: `/catalogue` },
    { key: 'tasteFinder', href: `/taste-finder` },
    {
      key: 'jobs',
      href: '//www.linkedin.com/jobs/search/?currentJobId=3196130257&f_C=86587560&geoId=92000000',
      target: '_blank',
    },
  ],
  [
    { key: 'about', href: `${domainShop}/uber-uns` },
    { key: 'ourRoasters', href: `${domainShop}/roesterei` },
    { key: 'blog', href: `/blog` },
    { key: 'forCoffeeRoasters', href: `${domainShop}/warum-60beans` },
  ],
  [
    { key: 'privacy', href: `${domainShop}/legal/datenschutz` },
    { key: 'imprint', href: `${domainShop}/legal/impressum` },
    { key: 'cookiePolicy', href: `${domainShop}/legal/cookie-policy` },
    { key: 'termsAndConditions', href: `${domainShop}/legal/agb` },
    { key: 'refund', href: `${domainShop}/legal/widerrufsrecht` },
  ],
]

export const Footer: React.FC = () => {
  const { t } = useTranslation()

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
        <a href="/">
          <span className="sr-only">{t('brand.name')}</span>
          <img src={LogoLight} alt={t('brand.name')} className="h-6" width="118px" height="24px" />
        </a>
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
                      <a href={href} target={target}>
                        {t(`pages.${key}.navigation`)}
                      </a>
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
                  <a href={href} target="_blank" title={`Go to ${id}`}>
                    <Icon name={icon} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mb-14">
          <TrustPilot />
        </div>
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
