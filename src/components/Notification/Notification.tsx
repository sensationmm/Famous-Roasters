import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import React, { Fragment, useState } from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'

interface NotificationProps {
  heading: string
  body: string
}

export const Notification: React.FC<NotificationProps> = ({ heading, body }: NotificationProps) => {
  const [showNotification, setShowNotification] = useState(true)
  return (
    <>
      <div aria-live="assertive" className="fixed inset-0 flex py-20 py-10 pointer-events-none z-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-6 space-y-4 md:items-end">
          <Transition
            show={showNotification}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 md:translate-y-0 md:translate-x-2"
            enterTo="translate-y-0 opacity-100 md:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-positive" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <Typography as="p" type={TypographyType.Label} size={TypographySize.Small}>
                      {heading}
                    </Typography>
                    <Typography as="p" type={TypographyType.Paragraph} size={TypographySize.Small} className="mt-1">
                      {body}
                    </Typography>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      type="button"
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShowNotification(false)
                      }}
                      data-testid="notification-dismiss"
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
