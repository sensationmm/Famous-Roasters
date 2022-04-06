import { Listbox as HUIListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import React, { Fragment, useState } from 'react'
import { Typography, TypographySize } from 'src/components'

export interface ListBoxItem {
  name: string
}

interface ListboxProps {
  items: ListBoxItem[]
  label: string
  value?: ListBoxItem
}

export const Listbox: React.FC<ListboxProps> = ({ items, label, value, ...props }: ListboxProps) => {
  const [selected, setSelected] = useState(value)

  return (
    <div className="w-72 relative" {...props}>
      <HUIListbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <HUIListbox.Button className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default">
              <Typography size={TypographySize.Small} className="block truncate">
                {selected ? selected.name : label}
              </Typography>
              {open ? (
                <ChevronUpIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              )}
            </HUIListbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HUIListbox.Options className="absolute w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 border border-coreUI-background-images focus:outline-none">
                {items.map((item, idx) => (
                  <HUIListbox.Option
                    key={idx}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-8 pr-4 ${
                        active ? 'bg-brand-grey-whisper' : 'bg-transparent'
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {item.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                            <CheckIcon className="w-5 h-5 text-brand-green-club" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </HUIListbox.Option>
                ))}
              </HUIListbox.Options>
            </Transition>
          </>
        )}
      </HUIListbox>
    </div>
  )
}
