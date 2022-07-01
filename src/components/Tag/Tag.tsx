import React from 'react'
import { Typography, TypographySize } from 'src/components'

export enum TagType {
  Aroma = 'aroma',
  Decaf = 'decaf',
  TasteFinder = 'finder',
}

interface TagProps extends React.HTMLAttributes<HTMLElement> {
  value: string
  type?: TagType
  small?: boolean
}

const getTagClassNames = (value: string, type?: TagType, small?: boolean, className?: string): string => {
  const classNames: string[] = ['inline-flex', 'rounded-full']

  if (small) {
    classNames.push('px-2', 'py-0.5')
  } else {
    classNames.push('px-3', 'py-1')
  }

  if (className) className.split(' ').forEach((c) => classNames.push(c))

  if (type) {
    switch (type) {
      case TagType.Aroma:
        {
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
        }
        break
      case TagType.TasteFinder:
        classNames.push('bg-brand-blue text-tags-jacksonsBlue')
        break
      case TagType.Decaf:
        classNames.push('bg-tags-santasGray text-white border border-white')
        break
    }
  } else {
    classNames.push('bg-brand-grey-bombay')
  }

  return classNames.join(' ')
}

export const TagSwatch: React.FC<TagProps> = ({ value, type = undefined, small = false, className, ...props }) => {
  return (
    <span
      className={`${getTagClassNames(value, type, small, className)} w-6 h-6 px-0 py-0 rounded-3xl mr-3`}
      {...props}
    />
  )
}

export const Tag: React.FC<TagProps> = ({ value, type = undefined, small = false, className, ...props }) => {
  return (
    <div className={getTagClassNames(value, type, small, className)} {...props}>
      <Typography size={TypographySize.Tiny}>{value}</Typography>
    </div>
  )
}
