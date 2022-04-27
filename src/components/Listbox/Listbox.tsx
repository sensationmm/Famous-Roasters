import { Listbox as HUIListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographySize } from 'src/components'

export interface ListBoxItem {
  name: string
}

interface ListboxProps {
  items: ListBoxItem[]
  translationPrefix: string
  value?: ListBoxItem
  onChange?: (active?: ListBoxItem) => void
  hasNoneItem?: boolean
}

export const Listbox: React.FC<ListboxProps> = ({
  items,
  translationPrefix,
  value,
  onChange,
  hasNoneItem = false,
  ...props
}: ListboxProps) => {
  const noneItem: ListBoxItem = { name: 'none' }

  const activeInitialValue = () => {
    if (value) {
      return value
    } else {
      if (hasNoneItem) {
        return noneItem
      }
    }
  }
  const [activeItem, setActiveItem] = useState<ListBoxItem>(activeInitialValue)
  const { t } = useTranslation()
  const options = hasNoneItem ? [...items, noneItem] : items

  const selectedOption = () => {
    if (hasNoneItem && activeItem && activeItem.name === noneItem.name) {
      return t(`${translationPrefix}.label`)
    } else {
      return t(`${translationPrefix}.options.${activeItem?.name}`)
    }
  }

  const onChangeHandler = (s: React.SetStateAction<ListBoxItem>) => {
    setActiveItem(s)
    onChange && onChange(s)
  }

  return (
    <div className="w-full relative" {...props}>
      <HUIListbox value={activeItem} onChange={onChangeHandler}>
        {({ open }) => (
          <>
            <HUIListbox.Button
              className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
              data-testid="button-listbox"
              id="button-listbox"
            >
              <Typography size={TypographySize.Small} className="block truncate">
                {activeItem ? selectedOption() : t(`${translationPrefix}.label`)}
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
                {options.map((option, idx) => (
                  <HUIListbox.Option
                    key={idx}
                    data-testid={`option-${idx}`}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-8 pr-4 ${
                        active ? 'bg-brand-grey-whisper' : 'bg-transparent'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected || activeItem?.name === option.name ? 'font-semibold' : 'font-normal'
                          }`}
                        >
                          {t(`${translationPrefix}.options.${option.name}`)}
                        </span>
                        {selected || activeItem?.name === option.name ? (
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
