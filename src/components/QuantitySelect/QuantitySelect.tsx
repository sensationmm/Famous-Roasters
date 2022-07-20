import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'

interface QuantitySelectProps {
  min: number
  max: number
  value?: number
  onChange?: (actualValue: number) => void
  label?: string
  className?: string
  disabled?: boolean
}

export const QuantitySelect: React.FC<QuantitySelectProps> = ({
  min,
  max,
  value = 1,
  onChange,
  label = undefined,
  className,
  disabled = false,
}: QuantitySelectProps) => {
  const [actualValue, setActualValue] = useState<number>(value)

  useEffect(() => {
    setActualValue(value)
  }, [value])

  const increment = () => {
    if (actualValue + 1 <= max) {
      setActualValue(actualValue + 1)
      onChange && onChange(actualValue + 1)
    }
  }
  const decrement = () => {
    if (actualValue - 1 >= min) {
      setActualValue(actualValue - 1)
      onChange && onChange(actualValue - 1)
    }
  }

  const classNames: string[] = [
    'inline-flex',
    'justify-between',
    'px-4',
    'py-2',
    'text-left',
    'bg-white',
    'rounded-full',
    'border',
    'border-coreUI-text-tertiary',
    'cursor-default',
  ]
  className && classNames.push(className)

  return (
    <>
      {label && (
        <Typography
          as="label"
          type={TypographyType.Paragraph}
          size={TypographySize.Tiny}
          className="flex text-coreUI-text-secondary uppercase mb-1"
        >
          {label}
        </Typography>
      )}
      <div className={classNames.join(' ')} data-testid="quantity-select">
        <button type="button" onClick={decrement} data-testid="quantity-minus" disabled={disabled}>
          <MinusIcon className="w-5 h-5" />
        </button>
        <div className={`px-3.5${disabled ? ' text-brand-grey-bombay' : ''}`} data-testid="quantity-value">
          {actualValue}
        </div>
        <button type="button" onClick={increment} data-testid="quantity-plus" disabled={disabled}>
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}
