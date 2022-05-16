import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'

interface QuantitySelectProps {
  min: number
  max: number
  value?: number
  onChange?: (actualValue: number) => void
  className?: string | undefined
}

export const QuantitySelect: React.FC<QuantitySelectProps> = ({
  min,
  max,
  value = 1,
  onChange,
  className,
}: QuantitySelectProps) => {
  const [actualValue, setActualValue] = useState<number>(value)

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

  return (
    <div
      className={
        'inline-flex justify-between px-4 py-2 text-left bg-white rounded-full border border-coreUI-text-tertiary cursor-default ' +
        className
      }
      data-testid="quantity-select"
    >
      <button type="button" onClick={decrement} data-testid="quantity-minus">
        <MinusIcon className="w-5 h-5" />
      </button>
      <div data-testid="quantity-value">{actualValue}</div>
      <button type="button" onClick={increment} data-testid="quantity-plus">
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
