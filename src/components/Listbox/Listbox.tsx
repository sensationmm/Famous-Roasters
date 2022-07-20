import { Listbox as HUIListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographySize, TypographyType } from 'src/components'

export interface ListBoxItem {
  name: string
  disabled?: boolean
}

interface ListboxProps {
  items: ListBoxItem[]
  multiple?: boolean
  translationPrefix: string
  value?: ListBoxItem[]
  onChange?: (active?: ListBoxItem[]) => void
  hasNoneItem?: boolean
  hasTranslatedValues?: boolean
  label?: string
  addOn?: React.ReactNode
  resetOnNoneClick?: boolean
  big?: boolean
  hasSpacerAfterItem?: string[]
  swatches?: JSX.Element[]
  itemDisabledMsg?: string
}

export const Listbox: React.FC<ListboxProps> = ({
  items,
  multiple = false,
  translationPrefix,
  value = undefined,
  onChange,
  hasNoneItem = false,
  hasTranslatedValues = true,
  label = undefined,
  addOn = undefined,
  resetOnNoneClick = false,
  big = false,
  hasSpacerAfterItem = undefined,
  swatches = undefined,
  itemDisabledMsg = 'Unavailable',
  ...props
}: ListboxProps) => {
  const noneItem: ListBoxItem = { name: 'none' }

  const activeInitialValue = (): ListBoxItem[] => {
    if (resetOnNoneClick && value?.length === 0) return [noneItem]
    if (value) {
      return value
    }
    return hasNoneItem ? [noneItem] : []
  }

  const [activeItems, setActiveItems] = useState<ListBoxItem[]>(activeInitialValue())
  const { t } = useTranslation()
  const options = hasNoneItem ? [...items, noneItem] : items

  useEffect(() => {
    if (activeItems && value) {
      setActiveItems(value)
    }
  }, [value])

  const selectedOption = () => {
    if (multiple) {
      const appliedFiltersCount = activeItems.length
      return appliedFiltersCount
        ? t(`${translationPrefix}.label`) + ` (${appliedFiltersCount})`
        : t(`${translationPrefix}.label`)
    }
    if (hasNoneItem && activeItems[0] && activeItems[0]?.name === noneItem.name) {
      return t(`${translationPrefix}.label`)
    }
    if (hasTranslatedValues && activeItems[0]) {
      return t(`${translationPrefix}.values.${activeItems[0]?.name}`)
    }
    if (activeItems[0]) {
      return activeItems[0].name
    }
    return t(`${translationPrefix}.label`)
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

  const renderOptionalLabel = () =>
    label && (
      <Typography
        as="label"
        type={TypographyType.Paragraph}
        size={TypographySize.Tiny}
        className="flex text-coreUI-text-secondary uppercase mb-1"
      >
        {label}
      </Typography>
    )

  const renderOptionalAddOn = () => addOn !== undefined && addOn

  const renderButton = (open: boolean) => {
    const renderIcon = () => {
      if (big) {
        if (open) {
          return <ChevronUpIcon className="-mr-1 ml-2 h-6 w-6 self-center" aria-hidden="true" />
        }
        return <ChevronDownIcon className="-mr-1 ml-2 h-6 w-6 self-center" aria-hidden="true" />
      } else {
        if (open) {
          return <ChevronUpIcon className="-mr-1 ml-2 h-6 w-6" aria-hidden="true" />
        }
        return <ChevronDownIcon className="-mr-1 ml-2 h-6 w-6" aria-hidden="true" />
      }
    }

    const classNames = ['block', 'truncate']
    if (items.find((i) => i.name === activeItems[0]?.name)?.disabled) {
      classNames.push('text-brand-grey-bombay')
    }

    return big ? (
      <HUIListbox.Button
        className="inline-flex justify-between py-2 pr-1 border-b-2 border-brand-black text-left bg-white cursor-default"
        data-testid="button-listbox"
      >
        <Typography type={TypographyType.Heading} size={TypographySize.Tiny} className={classNames.join(' ')}>
          {selectedOption()}
        </Typography>
        {renderIcon()}
      </HUIListbox.Button>
    ) : (
      <HUIListbox.Button
        className="inline-flex justify-between w-full px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default"
        data-testid="button-listbox"
      >
        <Typography size={TypographySize.Base} className={classNames.join(' ')}>
          {selectedOption()}
        </Typography>
        {renderIcon()}
      </HUIListbox.Button>
    )
  }

  const renderOptionText = (option: ListBoxItem) => {
    if (hasTranslatedValues || (resetOnNoneClick && option === noneItem)) {
      return t(`${translationPrefix}.values.${option.name}`)
    }
    return option.name
  }

  return (
    <div className={big ? 'w-auto min-w-fit max-w-xs relative' : 'w-full relative'} {...props}>
      <HUIListbox value={activeItems} onChange={onChangeHandler} multiple={multiple}>
        {({ open }) => (
          <>
            <div className="grid grid-cols-2 items-end">
              <div>{renderOptionalLabel()}</div>
              <div className="justify-self-end">{renderOptionalAddOn()}</div>
            </div>
            {renderButton(open)}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HUIListbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 border border-coreUI-background-images focus:outline-none">
                {options.map((option, idx) => (
                  <div key={idx}>
                    <HUIListbox.Option
                      data-testid={`option-${idx}`}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-8 pr-4 ${
                          active ? 'bg-brand-grey-whisper' : 'bg-transparent'
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => {
                        const isSelected =
                          selected ||
                          activeItems?.find((activeItem) => activeItem.name === option.name && !option.disabled)

                        return (
                          <>
                            <span
                              className={`block truncate flex align-middle ${
                                isSelected ? 'font-semibold' : 'font-normal'
                              } ${option.disabled && 'text-brand-grey-bombay'}`}
                            >
                              {swatches && swatches.length > 0 && swatches[idx]}
                              {renderOptionText(option)}

                              {option.disabled && (
                                <span className="inline pl-2 text-xs leading-6 text-negative font-normal">
                                  {itemDisabledMsg}
                                </span>
                              )}
                            </span>
                            {isSelected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                                <CheckIcon className="w-5 h-5 text-brand-green-club" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )
                      }}
                    </HUIListbox.Option>
                    {hasSpacerAfterItem && hasSpacerAfterItem.indexOf(option.name) !== -1 && (
                      <li className="select-none relative py-2 pl-8 pr-4 bg-transparent">--</li>
                    )}
                  </div>
                ))}
              </HUIListbox.Options>
            </Transition>
          </>
        )}
      </HUIListbox>
    </div>
  )
}
