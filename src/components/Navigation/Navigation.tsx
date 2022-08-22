import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import LogoLight from 'src/assets/images/logo/60beans-light.svg'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  CartContext,
  Icon,
  IconName,
  Notification,
  Typography,
  TypographySize,
  TypographyType,
} from 'src/components'

export enum NavigationTheme {
  Home = 'home',
  Shop = 'shop',
}

interface NavigationProps {
  theme: NavigationTheme
}

interface NavigationDataItem {
  key: string
  href: string
}

interface NavigationData {
  pagesPrimary: NavigationDataItem[]
  pagesSecondary: NavigationDataItem[]
  pagesMobile: NavigationDataItem[]
}

const domainShop = process.env.REACT_APP_DOMAIN_SHOP || '' // '//shop.60beans.de'
const domainBlog = process.env.REACT_APP_DOMAIN_BLOG || '' // '//blog.60beans.com'

const navigationData: NavigationData = {
  pagesPrimary: [
    { key: 'about', href: '//www.60beans.de/uber-uns' },
    { key: 'ourRoasters', href: '//www.60beans.de/roesterei' },
    { key: 'blog', href: domainBlog },
  ],
  pagesSecondary: [{ key: 'tasteFinder', href: `${domainShop}/taste-finder` }],
  pagesMobile: [{ key: 'profile', href: `${domainShop}/profile` }],
}

export const Navigation: React.FC<NavigationProps> = ({ theme }: NavigationProps) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { cartSize } = useContext(CartContext)
  const [actualCartSize, setActualCartSize] = useState<number>()
  const [showAddedToCart, setShowAddedToCart] = useState<boolean>(false)

  useEffect(() => {
    if (cartSize !== undefined) {
      if (actualCartSize === undefined) {
        setActualCartSize(cartSize)
      } else {
        if (cartSize > actualCartSize) {
          setActualCartSize(cartSize)
          setShowAddedToCart(true)
          setTimeout(() => {
            setShowAddedToCart(false)
          }, 3000)
        } else {
          setActualCartSize(cartSize)
        }
      }
    }
  }, [cartSize])

  const renderMenuItemsMobile = (data: NavigationDataItem[]) =>
    data.map((page) => (
      <div key={page.key} className="flow-root border-b border-coreUI-border py-6">
        <Link to={page.href} className="-m-2 p-2 block font-medium text-gray-900">
          {t(`pages.${page.key}.navigation`)}
        </Link>
      </div>
    ))

  const itemsInCart = () => (cartSize ? cartSize : 0)
  const CartItemsLabel = (size: number) => {
    if (size < 10) {
      return (
        <Typography
          as="div"
          type={TypographyType.Label}
          size={TypographySize.Tiny}
          className="absolute top-0 left-1 z-15 text-coreUI-text-primary"
        >
          {size}
        </Typography>
      )
    }
    return (
      <Typography
        as="div"
        type={TypographyType.Label}
        size={TypographySize.Tiny}
        className="absolute top-0 left-0.5 z-15 tracking-tightest text-coreUI-text-primary"
      >
        {size}
      </Typography>
    )
  }

  return (
    <div className="bg-white z-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 xl:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-5 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                  data-testid="button-close"
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-coreUI-border px-4">
                {renderMenuItemsMobile(navigationData.pagesPrimary)}
                {renderMenuItemsMobile(navigationData.pagesSecondary)}
                {renderMenuItemsMobile(navigationData.pagesMobile)}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-brand-black">
        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8">
          <div className="h-16 flex items-center justify-between border-b border-brand-black">
            <div className="flex-1 flex items-center xl:hidden">
              <button
                type="button"
                className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                onClick={() => setOpen(true)}
                data-testid="button-open"
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Desktop menu primary pages */}
            <div className="hidden xl:flex-1 xl:block xl:self-stretch">
              <div className="h-full flex space-x-10">
                {navigationData.pagesPrimary.map((page) => (
                  <Link
                    key={page.key}
                    to={page.href}
                    className="flex items-center text-white hover:text-coreUI-text-tertiary pb-1.5 duration-500"
                  >
                    <Typography
                      as="span"
                      type={TypographyType.Paragraph}
                      size={TypographySize.Small}
                      className="uppercase"
                    >
                      {t(`pages.${page.key}.navigation`)}
                    </Typography>
                  </Link>
                ))}
              </div>
            </div>

            {/* Logo */}
            <Link to="//www.60beans.com" className="flex h-full items-center pl-2 pr-2">
              <span className="sr-only">{t('brand.name')}</span>
              <img src={LogoLight} alt={t('brand.name')} className="h-6" />
            </Link>

            <div className="flex-1 flow-root flex h-full items-center">
              <div className="flex-1 flex h-full items-center justify-end xl:flex-none">
                {/* Desktop menu secondary pages */}
                <div className="hidden h-full xl:flex space-x-8 justify-end">
                  {navigationData.pagesSecondary.map((page) => (
                    <Link
                      key={page.key}
                      to={page.href}
                      className="flex items-center text-white hover:text-coreUI-text-tertiary pb-1.5 duration-500"
                    >
                      <Typography
                        as="span"
                        type={TypographyType.Paragraph}
                        size={TypographySize.Small}
                        className="uppercase"
                      >
                        {t(`pages.${page.key}.navigation`)}
                      </Typography>
                    </Link>
                  ))}
                </div>

                <Link to={`${domainShop}/profile`} className="hidden xl:block ml-10">
                  <Icon name={IconName.Profile} />
                </Link>

                {/* Cart */}
                <div className="ml-4 flow-root xl:ml-10">
                  {theme === NavigationTheme.Shop ? (
                    <>
                      <Link id="toCart" to="/cart" className="group -m-2 p-2 flex items-center">
                        <div className="static flex-shrink-0 relative">
                          <Icon name={IconName.Cart} aria-hidden="true" />
                          <span className="absolute top-3 left-4 h-4 w-4 z-10 bg-white rounded-full">
                            {CartItemsLabel(itemsInCart())}
                          </span>
                          <span className="sr-only">items in cart, view bag</span>
                        </div>
                      </Link>
                      {showAddedToCart && (
                        <Notification
                          heading={t('pages.cart.notification.add.heading')}
                          body={t('pages.cart.notification.add.body')}
                        />
                      )}
                    </>
                  ) : (
                    <Button
                      emphasis={ButtonEmphasis.Primary}
                      size={ButtonSize.sm}
                      onClick={() => navigate(`${domainShop}/catalogue`)}
                      data-testid="button-shop"
                    >
                      {t(`pages.catalogue.navigation`)}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
