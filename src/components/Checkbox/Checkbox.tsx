import React, { useEffect, useState } from 'react'
import { Icon, IconName, IconSize, Typography, TypographySize, TypographyType } from 'src/components'

interface IconCheckboxProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  text: string
  selected?: boolean
  toggleSelected?: (selected: boolean) => void
}

export const Checkbox: React.FC<IconCheckboxProps> = ({
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
      className={`flex w-full flex-row pl-0 py-4 items-center cursor-pointer`}
      data-testid="checkbox"
      onClick={(ev) => handleClick(ev)}
    >
      <div>
        <Icon name={isSelected ? IconName.CheckboxChecked : IconName.CheckboxUnchecked} size={IconSize.md} />
      </div>
      <Typography
        as="div"
        type={TypographyType.Paragraph}
        size={TypographySize.Base}
        className="flex grow text-left pl-2"
      >
        {text}
      </Typography>
    </button>
  )
}
