import { Listbox as HUIListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'

import { Typography, TypographySize, TypographyType } from '../Typography'

export interface SelectItem {
  label: string
  value: string
}

interface SingleSelectProps {
  items: SelectItem[]
  value: SelectItem
  onChange: (value: SelectItem) => void
  big?: boolean
}

const SingleSelect = ({ items, value, onChange, big }: SingleSelectProps) => {
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

    return big ? (
      <HUIListbox.Button
        className="inline-flex justify-between py-2 pr-1 border-b-2 border-brand-black text-left bg-white cursor-default"
        data-testid="button-listbox"
      >
        <Typography type={TypographyType.Heading} size={TypographySize.Tiny} className={classNames.join(' ')}>
          {value.label}
        </Typography>
        {renderIcon()}
      </HUIListbox.Button>
    ) : (
      <HUIListbox.Button
        className={`inline-flex justify-between w-full text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default px-4 py-2`}
        data-testid="button-listbox"
      >
        <Typography size={TypographySize.Base} className={`${classNames.join(' ')}`}>
          {value.label}
        </Typography>
        {renderIcon()}
      </HUIListbox.Button>
    )
  }

  return (
    <div className={'w-auto min-w-fit max-w-xs relative'}>
      <HUIListbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="grid grid-cols-2 items-end"></div>
            {renderButton(open)}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HUIListbox.Options className="absolute z-10 min-w-full mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 border border-coreUI-background-images focus:outline-none">
                {items.map((option, idx) => (
                  <HUIListbox.Option
                    key={option.value}
                    data-testid={`option-${idx}`}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-8 pr-4 ${
                        active ? 'bg-brand-grey-whisper' : 'bg-transparent'
                      }`
                    }
                    value={option}
                  >
                    {() => {
                      const isSelected = option.value === value.value
                      return (
                        <>
                          <span
                            className={`block truncate flex align-middle ${
                              isSelected ? 'font-semibold' : 'font-normal'
                            } `}
                          >
                            {option.label}
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
                ))}
              </HUIListbox.Options>
            </Transition>
          </>
        )}
      </HUIListbox>
    </div>
  )
}

export default SingleSelect
