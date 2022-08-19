import { Dialog, Transition } from '@headlessui/react'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import React, { Fragment, ReactNode, useState } from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'

interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  trigger: React.ReactElement
  title?: string
  body: ReactNode
  closeButton?: (onclick: () => void) => React.ReactElement
  showCloseButton?: boolean
}

export const Drawer: React.FC<DialogProps> = ({
  trigger,
  title,
  body,
  className,
  closeButton,
  showCloseButton = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeDrawer = () => setIsOpen(false)

  const openDrawer = () => setIsOpen(true)

  const TriggerElement = ({ ...props }) => React.cloneElement(trigger, props)

  return (
    <div className={className}>
      <TriggerElement {...trigger.props} onClick={openDrawer} data-testid="drawer-trigger" />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40" onClose={closeDrawer}>
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
            <div className="relative w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <>
                <div className="min-h-[90vh]">
                  <div className="px-5 mt-0.5 py-4 flex justify-between border-b border-coreUI-background-images">
                    <button
                      type="button"
                      className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                      onClick={closeDrawer}
                      data-testid="drawer-dismiss"
                    >
                      <span className="sr-only">close</span>
                      <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {title && (
                      <Typography
                        type={TypographyType.Paragraph}
                        size={TypographySize.Large}
                        className="text-coreUI-text-secondary py-0.5"
                      >
                        {title}
                      </Typography>
                    )}
                    <span />
                  </div>
                  {body}
                </div>
                {closeButton && showCloseButton && <div className="px-5">{closeButton(closeDrawer)}</div>}
              </>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
