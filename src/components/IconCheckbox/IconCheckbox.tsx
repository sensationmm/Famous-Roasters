import React, { useEffect, useState } from 'react'
import { Icon, IconName, IconSize, Typography, TypographySize, TypographyType } from 'src/components'

interface IconCheckboxProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  iconName: IconName | null
  text?: string
  selected?: boolean
  toggleSelected?: (selected: boolean) => void
}

export const IconCheckbox: React.FC<IconCheckboxProps> = ({
  iconName,
  text,
  selected = false,
  toggleSelected,
}: IconCheckboxProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected)

  useEffect(() => {
    setIsSelected(selected)
  }, [selected])

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault()
    setIsSelected(!isSelected)
    toggleSelected && toggleSelected(!isSelected)
  }

  return (
    <button
      className={`flex w-full flex-row pl-6 py-4 items-center cursor-pointer`}
      data-testid="icon-checkbox"
      onClick={(ev) => handleClick(ev)}
    >
      <div>
        <Icon name={isSelected ? IconName.RadioChecked : IconName.Radio} size={IconSize.md} />
      </div>
      {iconName && (
        <div className="flex w-16 h-16 ml-4 mr-4 rounded-full bg-brand-grey-whisper items-center justify-center">
          <Icon name={iconName} size={IconSize.lg} />
        </div>
      )}
      <Typography as="div" type={TypographyType.Label} size={TypographySize.Base} className="flex grow">
        {text}
      </Typography>
    </button>
  )
}
