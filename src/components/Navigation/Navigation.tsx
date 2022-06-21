import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import LogoBlack from 'src/assets/images/logo/60beans-black.svg'
import {
  Button,
  ButtonEmphasis,
  ButtonSize,
  CartContext,
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
}

const navigationData: NavigationData = {
  pagesPrimary: [
    //  { key: 'tasteFinder', href: '/taste-finder' }
  ],
  pagesSecondary: [{ key: 'about', href: '//www.60beans.de/uber-uns' }],
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
      <div key={page.key} className="flow-root">
        <Link to={page.href} className="-m-2 p-2 block font-medium text-gray-900">
          {t(`pages.${page.key}.navigation`)}
        </Link>
      </div>
    ))

  const itemsInCart = () => (cartSize ? cartSize : 0)

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

              <div className="border-t border-coreUI-border py-6 px-4 space-y-6">
                {/*{renderMenuItemsMobile(navigationData.pagesPrimary)}
                <div className="border-t border-coreUI-border" />*/}
                {renderMenuItemsMobile(navigationData.pagesSecondary)}
                <div className="border-t border-coreUI-border" />
                {/*<div className="flow-root">
                  <Link to="/account" className="-m-2 p-2 block font-medium text-gray-900">
                    {t(`pages.account.navigation`)}
                  </Link>
                </div>*/}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8">
          <div className="h-16 mt-0.5 flex items-center justify-between border-b border-brand-grey-whisper">
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
              <div className="h-full flex space-x-8">
                {navigationData.pagesPrimary.map((page) => (
                  <Link key={page.key} to={page.href} className="flex items-center text-gray-700 hover:text-gray-800">
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
            <Link to="//www.60beans.de" className="flex h-full items-center pl-2 pr-2">
              <span className="sr-only">{t('brand.name')}</span>
              <img src={LogoBlack} alt={t('brand.name')} className="h-6" />
            </Link>

            <div className="flex-1 flow-root flex h-full items-center">
              <div className="flex-1 flex h-full items-center justify-end xl:flex-none">
                {/* Desktop menu secondary pages */}
                <div className="hidden h-full xl:flex space-x-8 justify-end">
                  {navigationData.pagesSecondary.map((page) => (
                    <Link key={page.key} to={page.href} className="flex items-center text-gray-700 hover:text-gray-800">
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

                {/* Account */}
                {/*<Link to="/account" className="hidden xl:block p-2 text-gray-400 hover:text-gray-500 xl:ml-6">
                  <span className="sr-only">{t(`pages.account.navigation`)}</span>
                  <UserIcon className="w-6 h-6" aria-hidden="true" />
                </Link>*/}

                {/* Cart */}
                <div className="ml-4 flow-root xl:ml-6">
                  {theme === NavigationTheme.Shop ? (
                    <>
                      <Link to="/cart" className="group -m-2 p-2 flex items-center">
                        <ShoppingBagIcon
                          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {itemsInCart()}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
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
                      emphasis={ButtonEmphasis.Secondary}
                      size={ButtonSize.sm}
                      onClick={() => navigate('/catalogue')}
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
