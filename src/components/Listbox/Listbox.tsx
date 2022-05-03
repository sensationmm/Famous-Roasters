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
  multiple?: boolean
  translationPrefix: string
  value?: ListBoxItem[] | undefined
  onChange?: (active?: ListBoxItem[]) => void
  hasNoneItem?: boolean
  hasTranslatedValues?: boolean
}

export const Listbox: React.FC<ListboxProps> = ({
  items,
  multiple = false,
  translationPrefix,
  value = undefined,
  onChange,
  hasNoneItem = false,
  hasTranslatedValues = true,
  ...props
}: ListboxProps) => {
  const noneItem: ListBoxItem = { name: 'none' }

  const activeInitialValue = (): ListBoxItem[] => {
    if (multiple) {
      if (value) {
        return value
      }
      return hasNoneItem ? [noneItem] : []
    } else {
      if (value) {
        return value
      }
      return hasNoneItem ? [noneItem] : []
    }
  }
  const [activeItems, setActiveItems] = useState<ListBoxItem[]>(activeInitialValue())
  const { t } = useTranslation()
  const options = hasNoneItem ? [...items, noneItem] : items

  const selectedOption = () => {
    if (multiple) {
      return t(`${translationPrefix}.label`)
    } else {
      if (hasNoneItem && activeItems[0] && activeItems[0]?.name === noneItem.name) {
        return t(`${translationPrefix}.label`)
      }
      return hasTranslatedValues ? t(`${translationPrefix}.options.${activeItems[0]?.name}`) : activeItems[0].name
    }
  }

  const onChangeHandler = (s: ListBoxItem | ListBoxItem[]) => {
    if (Array.isArray(s)) {
      const last = s[s.length - 1]
      const isRemove = s.findIndex((x) => x.name === last.name) !== s.length - 1
      const next = isRemove ? s.filter((x) => x.name !== last.name) : s
      setActiveItems(next)
      onChange && onChange(next)
    } else {
      setActiveItems([s])
      onChange && onChange([s])
    }
  }

  return (
    <div className="w-full relative" {...props}>
      <HUIListbox value={activeItems} onChange={onChangeHandler} multiple={multiple}>
        {({ open }) => (
          <>
            <HUIListbox.Button
              className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
              data-testid="button-listbox"
            >
              <Typography size={TypographySize.Small} className="block truncate">
                {selectedOption()}
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
              <HUIListbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 border border-coreUI-background-images focus:outline-none">
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
                            selected || activeItems?.find((activeItem) => activeItem.name === option.name)
                              ? 'font-semibold'
                              : 'font-normal'
                          }`}
                        >
                          {hasTranslatedValues ? t(`${translationPrefix}.options.${option.name}`) : option.name}
                        </span>
                        {selected || activeItems?.find((activeItem) => activeItem.name === option.name) ? (
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
