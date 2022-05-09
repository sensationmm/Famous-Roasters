import { Dialog as HeadlessUIDialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import React, { Fragment, ReactNode, useState } from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'

interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  trigger: React.ReactElement
  title: string
  body: ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ trigger, title, body, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeDialog = () => setIsOpen(false)

  const openDialog = () => setIsOpen(true)

  const TriggerElement = ({ ...props }) => React.cloneElement(trigger, props)

  return (
    <div className={className}>
      <TriggerElement {...trigger.props} onClick={openDialog} data-testid="dialog-trigger" />

      <Transition appear show={isOpen} as={Fragment}>
        <HeadlessUIDialog as="div" className="relative z-10" onClose={closeDialog}>
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <HeadlessUIDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <button onClick={closeDialog} data-testid="dialog-dismiss">
                      <XIcon className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Typography as="h3" type={TypographyType.Label} size={TypographySize.Large}>
                      {title}
                    </Typography>
                  </div>
                  <div className="mt-4">{body}</div>
                </HeadlessUIDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessUIDialog>
      </Transition>
    </div>
  )
}
