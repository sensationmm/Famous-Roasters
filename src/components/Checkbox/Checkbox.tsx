import React from 'react'
import { Icon, IconName, IconSize, Typography, TypographySize, TypographyType } from 'src/components'

interface IconCheckboxProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  text: string
  small?: boolean
  selected: boolean
  toggleSelected: (selected: boolean) => void
  disabled?: boolean
  dataTestId?: string
}

export const Checkbox: React.FC<IconCheckboxProps> = ({
  text,
  selected,
  small = false,
  disabled = false,
  toggleSelected,
  dataTestId = 'checkbox',
}: IconCheckboxProps) => {
  return (
    <button
      className={`flex w-full flex-row items-start cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed`}
      data-testid={dataTestId}
      onClick={() => toggleSelected(!selected)}
      disabled={disabled}
    >
      <div>
        <Icon name={selected ? IconName.CheckboxChecked : IconName.CheckboxUnchecked} size={IconSize.md} />
      </div>
      <Typography
        as="div"
        type={TypographyType.Paragraph}
        size={small ? TypographySize.Tiny : TypographySize.Base}
        className="flex grow text-left pl-2"
      >
        {text}
      </Typography>
    </button>
  )
}
