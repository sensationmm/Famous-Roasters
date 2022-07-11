import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Badge, Typography, TypographySize, TypographyType } from 'src/components'

interface FooterLink {
  key: string
  href: string
}

const footerLinks: FooterLink[] = [
  { key: 'catalogue', href: '/catalogue' },
  { key: 'tasteFinder', href: '/taste-finder' },
  { key: 'about', href: '//www.60beans.de/uber-uns' },
  { key: 'privacy', href: '//www.notion.so/Datenschutzhinweise-ad5b45261a964166a74883d2770e28ea' },
  { key: 'imprint', href: '//slender-petunia-c3c.notion.site/Imprint-33b18fd9e469471ab768eef8155da968' },
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

  return (
    <footer className="bg-brand-black text-base text-white py-10 z-30">
      <div className="w-full max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-start mx-auto px-8 xl:px-10">
        <div className="mb-2 md:mb-0 md:mr-2">
          <Badge />
        </div>
        <Typography as="div" type={TypographyType.Heading} size={TypographySize.Large} className="px-4">
          {t('footer.slogan.text')}
        </Typography>
      </div>
      <div className="w-full max-w-7xl mx-auto grid gap-2 gap-y-10 grid-cols-1 md:grid-cols-2 mx-auto px-12 xl:px-14">
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
                {t('footer.customerService.text') + ' ' + t('footer.customerService.howTo')}
              </Typography>
            </div>
            {/*<div className="mt-6">
              <Button type="button" emphasis={ButtonEmphasis.Tertiary} size={ButtonSize.lg}>
                {t('footer.customerService.cta')} <ChatAlt2Icon className="w-6 h-6 ml-2" />
              </Button>
            </div>*/}
          </div>
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
          </div>*/}
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto text-center mt-10 mx-auto px-12 xl:px-14">
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
