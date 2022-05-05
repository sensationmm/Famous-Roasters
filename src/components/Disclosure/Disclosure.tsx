import { Disclosure as HeadlessUIDisclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import React from 'react'

interface DisclosureProps extends React.HTMLAttributes<HTMLElement> {
  buttonChildren: React.ReactNode
  panelChildren: React.ReactNode
  defaultOpen?: boolean
}

export const Disclosure: React.FC<DisclosureProps> = ({
  buttonChildren,
  panelChildren,
  defaultOpen = false,
  className,
}: DisclosureProps) => {
  return (
    <div className={className ? `${className} mx-auto w-full py-4` : 'mx-auto w-full py-4'}>
      <HeadlessUIDisclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <HeadlessUIDisclosure.Button
              className="flex w-full justify-between py-2 text-left"
              data-testid="button-disclosure-toggle"
            >
              {buttonChildren}
              {open ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
            </HeadlessUIDisclosure.Button>
            <HeadlessUIDisclosure.Panel className="py-2">{panelChildren}</HeadlessUIDisclosure.Panel>
          </>
        )}
      </HeadlessUIDisclosure>
    </div>
  )
}
