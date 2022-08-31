import { Dialog as HeadlessUIDialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import React, { Fragment, ReactNode, useState } from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'

interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  trigger: React.ReactElement
  title?: string
  overline?: string
  body: ReactNode
  closeButton?: (onclick: () => void) => void
  showCloseButton?: boolean
  unmount?: boolean
}

export const Dialog: React.FC<DialogProps> = ({
  trigger,
  title,
  overline,
  body,
  className,
  closeButton,
  showCloseButton = false,
  unmount = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeDialog = () => setIsOpen(false)

  const openDialog = () => setIsOpen(true)

  const TriggerElement = ({ ...props }) => React.cloneElement(trigger, props)

  return (
    <div className={className}>
      <TriggerElement {...trigger.props} onClick={openDialog} data-testid="dialog-trigger" />

      <Transition appear show={isOpen} as={Fragment} unmount={unmount}>
        <HeadlessUIDialog as="div" className="relative z-10" onClose={closeDialog} unmount={unmount}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-brand-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-40">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessUIDialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <>
                    <div className="flex justify-between justify-end">
                      <span />
                      {overline ? (
                        <Typography
                          type={TypographyType.Paragraph}
                          size={TypographySize.Large}
                          className="text-coreUI-text-secondary"
                        >
                          {overline}
                        </Typography>
                      ) : (
                        <span />
                      )}
                      <button onClick={closeDialog} data-testid="dialog-dismiss">
                        <XIcon className="w-6 h-6" />
                      </button>
                    </div>
                    {title && (
                      <div className="flex justify-center mt-6">
                        <Typography as="h3" type={TypographyType.Heading} size={TypographySize.Small}>
                          {title}
                        </Typography>
                      </div>
                    )}
                    <div className="mt-4">{body}</div>
                    {closeButton && showCloseButton && closeButton(closeDialog)}
                  </>
                </HeadlessUIDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessUIDialog>
      </Transition>
    </div>
  )
}
