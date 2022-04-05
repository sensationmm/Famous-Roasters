import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge, Button, ButtonColor, ButtonEmphasis, Typography, TypographySize, TypographyType } from 'src/components'

interface FooterLink {
  key: string
  href: string
}

const footerLinks: FooterLink[] = [
  { key: 'catalogue', href: '/catalogue' },
  { key: 'tasteFinder', href: '/taste-finder' },
  { key: 'ourRoasters', href: '/our-roasters' },
  { key: 'about', href: '/about' },
  { key: 'jobs', href: '/jobs' },
  { key: 'privacy', href: '/privacy' },
  { key: 'press', href: '/press' },
  { key: 'imprint', href: '/imprint' },
]

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-brand-black text-base text-white px-6 sm:px-6 xl:px-10 py-10">
      <div className="w-full text-center mb-10 flex justify-center items-center">
        <div className="mr-2">
          <Badge />
        </div>
        <Typography as="div" type={TypographyType.Heading} size={TypographySize.Large}>
          {t('footer.slogan.text')}
        </Typography>
      </div>
      <div className="max-w-7xl mx-auto grid gap-2 gap-y-10 grid-cols-1 md:grid-cols-2">
        <div className="order-2 md:order-1">
          {/* Links */}
          <ul>
            {footerLinks.map((footerItem: FooterLink, idx: number) => (
              <li key={footerItem.key} className={idx === 0 ? 'mt-0' : 'mt-6'}>
                <Link to={footerItem.href}>{t(`pages.${footerItem.key}.navigation`)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2">
          {/* Customer service */}
          <div>
            <div>
              <Typography type={TypographyType.Heading} size={TypographySize.Base} className="font-syne">
                {t('footer.customerService.title')}
              </Typography>
            </div>
            <div className="mt-6">
              <Typography type={TypographyType.Paragraph} size={TypographySize.Large}>
                {t('footer.customerService.text')}
              </Typography>
            </div>
            <div className="mt-6">
              <Button type="button" emphasis={ButtonEmphasis.Contained} color={ButtonColor.Secondary}>
                {t('footer.customerService.cta')}
              </Button>
            </div>
          </div>
          {/* Newsletter */}
          <div className="mt-12">
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
            <div className="mt-6">
              <input type="text" />
            </div>
            <div className="mt-6">
              <Button type="button" emphasis={ButtonEmphasis.Contained} color={ButtonColor.Secondary}>
                {t('footer.newsletter.cta')}
              </Button>
            </div>
            <div className="mt-4">
              <Typography type={TypographyType.Paragraph} className="text-brand-grey-bombay">
                {t('footer.newsletter.disclaimer')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center mt-10">
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
