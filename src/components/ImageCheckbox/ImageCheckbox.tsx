import React, { useEffect, useState } from 'react'
import { Icon, IconName, IconSize, Typography, TypographySize, TypographyType } from 'src/components'

interface ImageCheckboxProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  imageSrc: string
  text?: string
  selected?: boolean
  toggleSelected?: (selected: boolean) => void
}

export const ImageCheckbox: React.FC<ImageCheckboxProps> = ({
  imageSrc,
  text,
  selected = false,
  toggleSelected,
  className,
}: ImageCheckboxProps) => {
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
    <button className={`w-64 h-80 mt-8 relative cursor-pointer ${className}`} onClick={(ev) => handleClick(ev)}>
      <div className="w-64 h-64 top-0 absolute rounded-full bg-brand-grey-whisper" />
      <img src={imageSrc} alt="" className="absolute -top-8" />
      {isSelected && <Icon name={IconName.Selected} size={IconSize.lg} className="absolute right-2 bottom-28" />}
      {text && (
        <Typography
          as="div"
          type={TypographyType.Heading}
          size={TypographySize.Small}
          className="absolute h-24 font-syne font-normal text-center bottom-4"
        >
          {text}
        </Typography>
      )}
    </button>
  )
}
