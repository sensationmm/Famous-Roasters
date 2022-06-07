import React from 'react'

export enum CircleType {
  Aroma = 'aroma',
}

interface CircleProps extends React.HTMLAttributes<HTMLElement> {
  value: string
  type?: CircleType
}

const getCircleClassNames = (value: string, type?: CircleType, className?: string): string => {
  const classNames: string[] = ['inline-flex', 'rounded-full', 'w-6', 'h-6', 'md:w-8', 'md:h-8', 'xl:w-12', 'xl:h-12']
  if (className) {
    classNames.push(className)
  }

  if (type && type === CircleType.Aroma) {
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

export const Circle: React.FC<CircleProps> = ({ value, type = undefined, style, className }) => {
  return <div className={getCircleClassNames(value, type, className)} style={style} />
}
