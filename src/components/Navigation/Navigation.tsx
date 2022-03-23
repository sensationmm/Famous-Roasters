import { Dialog, Popover, Transition } from '@headlessui/react'
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const navigation = {
  pages: [{ key: 'catalogue', href: '/catalogue' }],
}

export const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="bg-white">
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

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.key} className="flow-root">
                    <Link to={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {t(`navigation.${page.key}`)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <div className="h-16 flex items-center justify-between">
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

            {/* Desktop menu */}
            <Popover.Group className="hidden xl:flex-1 xl:block xl:self-stretch">
              <div className="h-full flex space-x-8">
                {navigation.pages.map((page) => (
                  <Link key={page.key} to={page.href} className="flex items-center text-gray-700 hover:text-gray-800">
                    {t(`navigation.${page.key}`)}
                  </Link>
                ))}
              </div>
            </Popover.Group>

            {/* Logo */}
            <Link to="/" className="flex">
              <span className="sr-only">FR</span>
              <span className="font-syne text-3xl">
                <span>F</span>
                <span className="font-extrabold">R</span>
              </span>
            </Link>

            <div className="flex-1 flex items-center justify-end">
              {/* Cart */}
              <div className="ml-4 flow-root xl:ml-6">
                <Link to="/cart" className="group -m-2 p-2 flex items-center">
                  <ShoppingBagIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
