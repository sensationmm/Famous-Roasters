import React from 'react'
import { Typography, TypographySize } from 'src/components'

export enum TagType {
  Aroma = 'aroma',
}

interface TagProps {
  value: string
  type?: TagType
}

const getTagClassNames = (value: string, type?: TagType): string => {
  const classNames: string[] = ['inline-flex', 'rounded-full', 'px-4', 'py-1']

  if (type && type === TagType.Aroma) {
    switch (value.toLowerCase()) {
      case 'experimentell & komplex':
        classNames.push('bg-tags-capeHoney')
        break
      case 'fruchtig & lebhaft':
        classNames.push('bg-tags-cottonCandy')
        break
      case 'floral & leicht':
        classNames.push('bg-tags-melrose')
        break
      case 'nussig & schokoladig':
        classNames.push('bg-tags-coldTurkey')
        break
      case 'würzig & kräftig':
        classNames.push('bg-tags-yourPink')
        break
      default:
        classNames.push('bg-brand-grey-bombay')
        break
    }
  } else {
    classNames.push('bg-brand-grey-bombay')
  }
  return classNames.join(' ')
}

export const Tag: React.FC<TagProps> = ({ value, type = undefined }) => {
  return (
    <div className={getTagClassNames(value, type)}>
      <Typography size={TypographySize.Tiny}>{value}</Typography>
    </div>
  )
}
