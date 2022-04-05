import { ChatAlt2Icon } from '@heroicons/react/solid'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Badge,
  Button,
  ButtonEmphasis,
  ButtonSize,
  Input,
  InputMode,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

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

type FormValues = {
  email: string
}

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data: FieldValues) => {
    console.log('user wants to register with email', data.email)
  }

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
              <Button type="button" emphasis={ButtonEmphasis.Tertiary} size={ButtonSize.lg}>
                {t('footer.customerService.cta')} <ChatAlt2Icon className="w-6 h-6 ml-2" />
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
